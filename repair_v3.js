
const fs = require('fs');

const csvPath = './timelibrary.csv';
const outputPath = './js/data/scenarios_expanded.js';

function parseCSV(text) {
    const rows = [];
    let currentRow = [];
    let currentCell = '';
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const next = text[i + 1];

        if (inQuotes) {
            if (char === '"' && next === '"') {
                currentCell += '"';
                i++;
            } else if (char === '"') {
                inQuotes = false;
            } else {
                currentCell += char;
            }
        } else {
            if (char === '"') {
                inQuotes = true;
            } else if (char === ',') {
                currentRow.push(currentCell.trim());
                currentCell = '';
            } else if (char === '\n' || char === '\r') {
                currentRow.push(currentCell.trim());
                if (currentRow.length > 1) rows.push(currentRow);
                currentRow = [];
                currentCell = '';
                if (char === '\r' && next === '\n') i++;
            } else {
                currentCell += char;
            }
        }
    }
    if (currentCell || currentRow.length > 0) {
        currentRow.push(currentCell.trim());
        if (currentRow.length > 1) rows.push(currentRow);
    }
    return rows;
}

function fixBrokenJSON(str) {
    if (!str || str === '[]' || str === '') return [];
    
    let cleaned = str.trim();
    
    // 1. 기초 청소 (따옴표 정규화)
    // "m-arker" -> "marker"
    // {marker: -> {"marker":
    cleaned = cleaned.replace(/\{\\?marker/g, '{"marker"');
    cleaned = cleaned.replace(/\\?id/g, '"id"');
    cleaned = cleaned.replace(/\\?label/g, '"label"');
    cleaned = cleaned.replace(/\\?desc/g, '"desc"');
    cleaned = cleaned.replace(/\\?text/g, '"text"');
    cleaned = cleaned.replace(/\\?result/g, '"result"');
    cleaned = cleaned.replace(/\\?effect/g, '"effect"');
    cleaned = cleaned.replace(/\\?clue/g, '"clue"');

    // 2. 콜론 뒤의 따옴표 처리
    // :""[내용]"" -> :"[내용]"
    cleaned = cleaned.replace(/:\s*""+/g, ':"');
    cleaned = cleaned.replace(/""+\s*,/g, '",');
    cleaned = cleaned.replace(/""+\s*\}/g, '"}');

    // 3. 중첩 객체의 따옴표 처리
    cleaned = cleaned.replace(/""+/g, '"');

    // 4. 배열 밸런싱
    if (!cleaned.startsWith('[')) cleaned = '[' + cleaned;
    if (!cleaned.endsWith(']')) cleaned = cleaned + ']';

    try {
        return JSON.parse(cleaned);
    } catch (e) {
        // 최후의 수단: 콤마로 분리된 객체들을 개별적으로 잡아냄
        try {
            const matches = cleaned.match(/\{[^{}]+\}/g);
            if (matches) {
                return matches.map(m => {
                    try { return JSON.parse(m); } catch(e2) { return null; }
                }).filter(x => x !== null);
            }
        } catch (e3) {}
        console.warn('Failed to parse JSON segment:', cleaned.substring(0, 50));
        return [];
    }
}

const rawData = fs.readFileSync(csvPath, 'utf8');
const rows = parseCSV(rawData);

const newspapers = {};
const headers = rows[0];

for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    if (r.length < 15) continue;

    const id = r[0];
    if (!id || id === 'ID') continue;

    const clues = fixBrokenJSON(r[10]);
    const choices = fixBrokenJSON(r[14]);

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
        isGeneric: true // 기본적으로 모두 Generic으로 설정하여 버그 방지
    };

    // 예외: 이미 전용 시나리오가 있는 ID들은 isGeneric을 false로 유지
    if (['choi1980', 'imf1997'].includes(id)) {
        newspapers[id].isGeneric = false;
    }
}

const jsContent = `export const expandedScenarios = ${JSON.stringify(newspapers, null, 2)};`;
fs.writeFileSync(outputPath, jsContent);
console.log('✅ Successfully repaired scenarios with correct field names and recovered JSON.');
