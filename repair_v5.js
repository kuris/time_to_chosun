
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
        const matches = cleaned.match(/\{[^{}]+\}/g);
        if (matches) {
            const recovered = matches.map(m => {
                try { return JSON.parse(m); } catch(e2) { return null; }
            }).filter(x => x !== null);
            return recovered.length > 0 ? recovered : null;
        }
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

    // --- Heuristic Re-alignment ---
    const metadata = r.slice(10); // Clues, Location, Story, Insight, Choices, SolveHeadline, SolveEnding, LandYear, LandDate, LandMsg, isGeneric...
    
    let clues = [];
    let choices = [];
    let texts = [];
    let others = [];

    // Identify JSON arrays vs Text
    metadata.forEach(m => {
        const parsed = cleanJSON(m);
        if (parsed) {
            if (clues.length === 0) clues = parsed;
            else if (choices.length === 0) choices = parsed;
        } else if (m !== '[]' && m !== '') {
            texts.push(m);
        }
    });

    // Special case for solve fields and landing
    // Usually the last few fields are SolveHeadline, SolveEnding, Year, Date, Msg, isGeneric
    // We'll take them from the end of the 'texts' array or the original 'r' indices if they are stable.
    
    const isGeneric = r[20] ? r[20].toUpperCase() === 'TRUE' : true;

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
            year: r[17],
            date: r[18],
            msg: r[19] || (texts[5] || '착륙 중...')
        },
        isGeneric: id === 'choi1980' || id === 'imf1997' ? false : true
    };
}

const jsContent = `export const expandedScenarios = ${JSON.stringify(newspapers, null, 2)};`;
fs.writeFileSync(outputPath, jsContent);
console.log('✅ Re-repaired with heuristic alignment. (v5)');
