
const fs = require('fs');

const csvPath = './timelibrary.csv';
const outputPath = './js/data/scenarios_expanded.js';

function parseCSVLine(line) {
    const result = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            if (inQuotes && line[i+1] === '"') {
                cur += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            result.push(cur.trim());
            cur = '';
        } else {
            cur += char;
        }
    }
    result.push(cur.trim());
    return result;
}

function cleanJSON(str) {
    if (!str || str === '[]' || str === '') return [];
    let cleaned = str.trim();
    
    // Recursive unescape
    let prev;
    do {
        prev = cleaned;
        cleaned = cleaned.replace(/""/g, '"');
    } while (cleaned !== prev);

    // Fix missing quotes on keys if necessary (e.g. {marker: -> {"marker":)
    cleaned = cleaned.replace(/([{,])\s*([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');
    
    // Fix weird backslashes
    cleaned = cleaned.replace(/\\"/g, '"');

    try {
        return JSON.parse(cleaned);
    } catch (e) {
        // Fallback: match all { ... } objects
        const matches = cleaned.match(/\{[^{}]+\}/g);
        if (matches) {
            return matches.map(m => {
                try { return JSON.parse(m); } catch(e2) { return null; }
            }).filter(x => x !== null);
        }
        return [];
    }
}

const lines = fs.readFileSync(csvPath, 'utf8').split(/\r?\n/);
const newspapers = {};

for (let i = 1; i < lines.length; i++) {
    const r = parseCSVLine(lines[i]);
    if (r.length < 15) continue;

    const id = r[0];
    if (!id || id === 'ID') continue;

    const clues = cleanJSON(r[10]);
    const choices = cleanJSON(r[14]);

    newspapers[id] = {
        category: r[1],
        masthead: r[2],
        date: r[3],
        issue: r[4],
        headline: r[5],
        sub: r[6],
        col1: r[7],
        col2: r[8],
        memo: r[9],
        clues: clues,
        location: r[11],
        eventStory: r[12],
        mysteryInsight: r[13],
        choices: choices,
        solveHeadline: r[15],
        solveEnding: r[16],
        landing: {
            year: r[17],
            date: r[18],
            msg: r[19]
        },
        isGeneric: true
    };

    if (['choi1980', 'imf1997'].includes(id)) {
        newspapers[id].isGeneric = false;
    }
}

const jsContent = `export const expandedScenarios = ${JSON.stringify(newspapers, null, 2)};`;
fs.writeFileSync(outputPath, jsContent);
console.log('✅ Re-repaired with CSV line parser and recursive JSON cleaning.');
