const fs = require('fs');

const csvPath = '/Users/kimjinhyung/Desktop/time_library/timelibrary.csv';
const outputPath = '/Users/kimjinhyung/Desktop/time_library/js/data/scenarios_expanded.js';

const content = fs.readFileSync(csvPath, 'utf8');
const lines = content.split('\n');

const scenarios = {};

// Skip header
for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // We need a VERY specialized parser for this broken CSV
    // Simple split won't work because of the unquoted commas in JSON
    // But we know the ID is the first column.
    
    // Attempt to parse using a state machine
    const parts = [];
    let current = '';
    let inQuotes = false;
    for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (char === '"') {
            inQuotes = !inQuotes;
            current += char;
        } else if (char === ',' && !inQuotes) {
            parts.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    parts.push(current);

    // Clean up quotes
    const cleanParts = parts.map(p => {
        let s = p.trim();
        if (s.startsWith('"') && s.endsWith('"')) {
            s = s.substring(1, s.length - 1);
        }
        return s.replace(/""/g, '"');
    });

    const id = cleanParts[0];
    if (!id || id === 'ID') continue;

    // Helper to clean and parse JSON
    const superCleanJSON = (str) => {
        if (!str) return [];
        let s = str.trim();
        // Remove backslashes
        s = s.replace(/\\/g, '');
        // Replace multiple quotes with single
        s = s.replace(/"{2,}/g, '"');
        if (s.startsWith('"')) s = s.substring(1);
        if (s.endsWith('"')) s = s.substring(0, s.length - 1);

        try {
            return JSON.parse(s);
        } catch (e) {
            // Brute force repair: find all { }
            const matches = s.match(/\{[^{}]+\}/g);
            if (matches) {
                return matches.map(m => {
                    try {
                        let obj = m.trim();
                        if (!obj.endsWith('}')) obj += '}';
                        // One more clean for the inside
                        obj = obj.replace(/"+/g, '"').replace(/"([^"]+)":/g, '"$1":');
                        return JSON.parse(obj);
                    } catch (ie) { return null; }
                }).filter(x => x !== null);
            }
            return [];
        }
    };

    // Mapping based on the CSV structure we saw
    scenarios[id] = {
        masthead: cleanParts[2],
        date:     cleanParts[3],
        issue:    cleanParts[4],
        headline: cleanParts[5],
        sub:      cleanParts[6],
        col1:     cleanParts[7],
        col2:     cleanParts[8],
        memo:     cleanParts[9],
        clues:    superCleanJSON(cleanParts[10]),
        location: cleanParts[11],
        story:    cleanParts[12],
        insight:  cleanParts[13],
        choices:  superCleanJSON(cleanParts[14]),
        solveHeadline: cleanParts[15],
        solveEnding:   cleanParts[16],
        landing: {
            year: cleanParts[17],
            date: cleanParts[18],
            msg:  cleanParts[19]
        },
        isGeneric: cleanParts[20] === 'TRUE',
        category: cleanParts[1]
    };
}

const jsContent = `// ══════════════════════════════
//  js/data/scenarios_expanded.js
//  Recovered and expanded scenarios from CSV
// ══════════════════════════════

export const expandedScenarios = ${JSON.stringify(scenarios, null, 2)};
`;

fs.writeFileSync(outputPath, jsContent);
console.log('Successfully generated js/data/scenarios_expanded.js with ' + Object.keys(scenarios).length + ' scenarios.');
