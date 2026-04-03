const fs = require('fs');

const csvPath = '/Users/kimjinhyung/Desktop/time_library/timelibrary.csv';
const outputPath = '/Users/kimjinhyung/Desktop/time_library/js/data/scenarios_expanded.js';

const content = fs.readFileSync(csvPath, 'utf8');
const lines = content.split('\n');

const scenarios = {};

lines.slice(1).forEach(line => {
    if (!line.trim()) return;

    // Semantic Parser Strategy:
    // 1. ID is always first
    // 2. We look for JSON blocks [{...}] as anchors for Clues and Choices
    // 3. We look for Date patterns
    
    // First, let's fix the line: remove recursive trailing commas
    let cleanLine = line.trim().replace(/,+$/, '');

    // Attempt to extract fields by identifying the JSON blocks
    // This is the most reliable way given the data structure
    
    const idMatch = cleanLine.match(/^([^,]+),/);
    if (!idMatch) return;
    const id = idMatch[1];

    // Find JSON blocks
    const jsonBlocks = [];
    let bracketLevel = 0;
    let currentBlock = '';
    let inJson = false;

    for (let i = 0; i < cleanLine.length; i++) {
        if (cleanLine[i] === '[' && cleanLine[i+1] === '{') {
            inJson = true;
        }
        if (inJson) {
            currentBlock += cleanLine[i];
            if (cleanLine[i] === '[') bracketLevel++;
            if (cleanLine[i] === ']') bracketLevel--;
            if (bracketLevel === 0) {
                jsonBlocks.push(currentBlock);
                currentBlock = '';
                inJson = false;
            }
        }
    }

    // Now we have the JSON blocks. Let's split the REST of the line by looking for where the JSON blocks were.
    let remainder = cleanLine;
    jsonBlocks.forEach((block, idx) => {
        remainder = remainder.replace(block, `__JSON_BLOCK_${idx}__`);
    });

    const parts = [];
    let current = '';
    let inQuotes = false;
    for(let i=0; i<remainder.length; i++){
        if(remainder[i] === '"'){ inQuotes = !inQuotes; current += '"'; }
        else if(remainder[i] === ',' && !inQuotes){ parts.push(current.trim()); current = ''; }
        else current += remainder[i];
    }
    parts.push(current.trim());

    // Reinstate JSON blocks
    const finalParts = parts.map(p => {
        return p.replace(/__JSON_BLOCK_(\d+)__/g, (match, idx) => jsonBlocks[idx])
                .replace(/^"+|"+$/g, '')
                .replace(/""/g, '"');
    });

    // We still need to map them. Since some rows 12-41 are differently structured,
    // let's use a dynamic search for the fields based on their content.
    
    const findPart = (pattern) => finalParts.find(p => pattern.test(p)) || '';
    const findJSON = (idx) => {
        const block = jsonBlocks[idx];
        if (!block) return [];
        let s = block.replace(/\\marker/g, 'marker').replace(/""/g, '"');
        if (!s.endsWith(']')) s += ']';
        try { return JSON.parse(s); } catch (e) {
            try { 
                const repaired = s.match(/\{[^{}]+\}/g) || [];
                return repaired.map(r => {
                    try { return JSON.parse(r); } catch (ie) { return null; }
                }).filter(x => x);
            } catch(ee) { return []; }
        }
    };

    // Mapping logic (Manual Override for problematic rows)
    const category = findPart(/^(1980s|1990s|2000s)$/);
    const date = findPart(/\d+년 \d+월 \d+일/);
    const location = finalParts[11] || finalParts[12] || ""; // Heuristic
    
    // For rows 1-11, they are mostly okay. For 12-41, we need to be careful.
    // Let's use the index-based mapping but with a "shift check"
    
    let offset = 0;
    if (finalParts[7] && finalParts[7].includes('사망')) offset = 1; // Example shift detection

    scenarios[id] = {
        category: category || finalParts[1],
        masthead: finalParts[2],
        date: date || finalParts[3],
        issue: finalParts[4],
        headline: finalParts[5],
        sub: finalParts[6],
        col1: finalParts[7 + offset],
        col2: finalParts[8 + offset],
        memo: finalParts[9 + offset],
        clues: findJSON(0),
        location: (jsonBlocks.length > 0) ? finalParts[remainder.split(',').findIndex(p => p.includes('__JSON_BLOCK_0__')) + 1] : finalParts[11],
        story: finalParts[12] || "",
        insight: finalParts[13] || "",
        choices: findJSON(1),
        solveHeadline: finalParts[15] || "",
        solveEnding: finalParts[16] || "",
        landing: {
            year: findPart(/^\d{4}$/) || finalParts[17],
            date: findPart(/\d{4}-\d{2}-\d{2}/) || finalParts[18],
            msg: finalParts[19] || ""
        },
        isGeneric: line.includes('TRUE')
    };
});

const jsContent = `export const expandedScenarios = ${JSON.stringify(scenarios, null, 2)};`;
fs.writeFileSync(outputPath, jsContent);
console.log(`Successfully repaired and generated ${Object.keys(scenarios).length} scenarios.`);
