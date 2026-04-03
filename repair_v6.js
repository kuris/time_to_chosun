
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
    if (!str || str === '[]' || str === '') return null;
    let cleaned = str.trim();
    
    // Remove wrapping quotes if present
    if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
        cleaned = cleaned.substring(1, cleaned.length - 1);
    }

    let prev;
    do {
        prev = cleaned;
        cleaned = cleaned.replace(/""/g, '"');
    } while (cleaned !== prev);

    cleaned = cleaned.replace(/([{,])\s*([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');
    cleaned = cleaned.replace(/\\"/g, '"');

    if (!cleaned.startsWith('[') && !cleaned.startsWith('{')) return null;

    try {
        const p = JSON.parse(cleaned);
        return (Array.isArray(p) && p.length === 0) ? null : p;
    } catch (e) {
        // More aggressive object extraction
        try {
            const matches = cleaned.match(/\{[^{}]+\}/g);
            if (matches) {
                const recovered = matches.map(m => {
                    try { 
                        let objStr = m.trim();
                        // Fix common corruption in keys
                        objStr = objStr.replace(/([{,])\s*([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');
                        return JSON.parse(objStr); 
                    } catch(e2) { return null; }
                }).filter(x => x !== null);
                return recovered.length > 0 ? recovered : null;
            }
        } catch (e3) {}
        return null;
    }
}

const lines = fs.readFileSync(csvPath, 'utf8').split(/\r?\n/);
const newspapers = {};

for (let i = 1; i < lines.length; i++) {
    const r = parseCSVLine(lines[i]);
    if (r.length < 10) continue;

    const id = r[0];
    if (!id || id === 'ID') continue;

    const metadata = r.slice(10);
    
    let clues = [];
    let choices = [];
    let texts = [];

    metadata.forEach(m => {
        const parsed = cleanJSON(m);
        if (parsed) {
            if (Array.isArray(parsed)) {
                // Heuristic: clues have 'marker', choices have 'text'
                const first = parsed[0];
                if (first && (first.marker || first.id)) {
                    if (clues.length === 0) clues = parsed;
                } else if (first && (first.text || first.label)) {
                    if (choices.length === 0) choices = parsed;
                } else {
                    // Ambiguous array
                    if (clues.length === 0) clues = parsed;
                    else if (choices.length === 0) choices = parsed;
                }
            }
        } else if (m !== '[]' && m !== '') {
            texts.push(m);
        }
    });

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
        location: texts[0] || '알 수 없는 장소',
        eventStory: texts[1] || '조사를 시작합니다.',
        mysteryInsight: texts[2] || '',
        choices: choices,
        solveHeadline: texts[3] || r[15] || '해결된 사건',
        solveEnding: texts[4] || r[16] || '조사를 마쳤습니다.',
        landing: {
            year: r[17] || '',
            date: r[18] || r[3] || '',
            msg: r[19] || (texts[5] || '착륙 중...')
        },
        isGeneric: id === 'choi1980' || id === 'imf1997' ? false : true
    };
}

const jsContent = `export const expandedScenarios = ${JSON.stringify(newspapers, null, 2)};`;
fs.writeFileSync(outputPath, jsContent);
console.log('✅ Re-repaired with enhanced heuristic alignment. (v6)');
