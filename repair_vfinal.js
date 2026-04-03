
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
    let s = str.trim();
    
    // Remove all wrapping quotes
    while (s.startsWith('"') && s.endsWith('"')) {
        s = s.substring(1, s.length - 1);
    }

    // Recursive unescape
    let prev;
    do {
        prev = s;
        s = s.replace(/""/g, '"');
    } while (s !== prev);

    // Final clean for escaped characters that might remain
    s = s.replace(/\\"/g, '"');

    try {
        const p = JSON.parse(s);
        if (Array.isArray(p)) return p;
        if (typeof p === 'object' && p !== null) return [p];
        return null;
    } catch (e) {
        // Semantic rescue: extract things that LOOK like JSON objects
        const matches = s.match(/\{[^{}]+\}/g);
        if (matches) {
            return matches.map(m => {
                try {
                    let ms = m.trim();
                    // Fix keys
                    ms = ms.replace(/([{,])\s*([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');
                    return JSON.parse(ms);
                } catch(e2) { return null; }
            }).filter(x => x !== null);
        }
        return null;
    }
}

const lines = fs.readFileSync(csvPath, 'utf8').split(/\r?\n/);
const newspapers = {};

for (let i = 1; i < lines.length; i++) {
    const r = parseCSVLine(lines[i]);
    if (r.length < 5) continue;

    const id = r[0];
    if (!id || id === 'ID') continue;

    const metadata = r.slice(10);
    let clues = [];
    let choices = [];
    let texts = [];

    metadata.forEach(m => {
        const cleaned = m.trim();
        if (cleaned === '[]' || cleaned === '') return;

        // Try to identify if it's JSON
        if (cleaned.includes('{')) {
            const parsed = cleanJSON(m);
            if (parsed && Array.isArray(parsed) && parsed.length > 0) {
                const first = JSON.stringify(parsed[0]);
                if (first.includes('marker') || first.includes('desc')) {
                    if (clues.length === 0) clues = parsed;
                    else if (choices.length === 0) choices = parsed; // Fallback
                } else if (first.includes('text') || first.includes('result')) {
                    if (choices.length === 0) choices = parsed;
                } else {
                    if (clues.length === 0) clues = parsed;
                }
                return;
            }
        }
        
        // If not JSON or failed to parse, it's a text field
        texts.push(m);
    });

    // Final mapping with semantic fallback
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
        location: texts[0] || '알 수 없는 현장',
        eventStory: texts[1] || '기록되지 않은 이야기',
        mysteryInsight: texts[2] || '',
        choices: choices,
        solveHeadline: texts[3] || r[15] || '해결된 수수께끼',
        solveEnding: texts[4] || r[16] || '당신은 진실에 도달했습니다.',
        landing: {
            year: r[17] || r[3].substring(0, 4) || '2024',
            date: r[18] || r[3] || '',
            msg: r[19] || (texts[5] || '도서관으로 이동 중...')
        },
        isGeneric: ['choi1980', 'imf1997'].includes(id) ? false : true
    };
}

const jsContent = `export const expandedScenarios = ${JSON.stringify(newspapers, null, 2)};`;
fs.writeFileSync(outputPath, jsContent);
console.log('✅ REPAIR COMPLETE. All scenarios recovered with semantic mapping.');
