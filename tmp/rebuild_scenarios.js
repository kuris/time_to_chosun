const fs = require('fs');
const path = require('path');

const csvPath = path.resolve(__dirname, '../cleaned_timelibrary.csv');
const outputPath = path.resolve(__dirname, '../js/data/scenarios_expanded.js');

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
        currentRow.push(currentCell);
        currentCell = '';
      } else if (char === '\r' || char === '\n') {
        currentRow.push(currentCell);
        if (currentRow.some(c => c !== '')) rows.push(currentRow);
        currentRow = [];
        currentCell = '';
        if (char === '\r' && next === '\n') i++;
      } else {
        currentCell += char;
      }
    }
  }
  if (currentCell || currentRow.length > 0) {
    currentRow.push(currentCell);
    if (currentRow.some(c => c !== '')) rows.push(currentRow);
  }
  return rows;
}

function safeParseJSON(str, fallback) {
  if (str === undefined || str === null || String(str).trim() === '') return fallback;
  let cleaned = String(str).trim();
  // CSV 내부에 더블 인용을 다루기
  cleaned = cleaned.replace(/\\"/g, '"').replace(/""/g, '"');

  const tryParse = (s) => {
    try { return JSON.parse(s); } catch (_) { return null; }
  };

  let parsed = tryParse(cleaned);
  if (parsed !== null) return parsed;

  // brackets around array/object normalize
  if (!cleaned.startsWith('[') && !cleaned.startsWith('{')) {
    const alt = cleaned.replace(/^\[\s*/,'').replace(/\s*\]$/,'');
    parsed = tryParse(alt);
    if (parsed !== null) return parsed;
  }

  // extract valid JSON objects from the string
  const objMatches = cleaned.match(/\{[^\{\}]*\}/g);
  if (objMatches) {
    const list = objMatches.map(m => tryParse(m)).filter(x => x !== null);
    if (list.length > 0) return list;
  }

  return fallback;
}

const raw = fs.readFileSync(csvPath, 'utf8');
const rows = parseCSV(raw);
if (!Array.isArray(rows) || rows.length < 2) {
  throw new Error('CSV data load failed: ' + csvPath);
}

const headers = rows[0].map(h => h.trim().replace(/^"|"$/g, ''));
const scenarios = {};

for (let i = 1; i < rows.length; i++) {
  const rowValues = rows[i];
  if (!rowValues || rowValues.length === 0) continue;

  const row = headers.reduce((acc, key, idx) => {
    acc[key] = rowValues[idx] !== undefined ? rowValues[idx] : '';
    return acc;
  }, {});

  const id = (row.ID || row.id || '').trim();
  if (!id) continue;

  scenarios[id] = {
    category: row.Category || '2000s',
    masthead: row.Masthead || '',
    date: row.Date || '',
    issue: row.Issue || '',
    headline: row.Headline || '',
    sub: row.Subtitle || '',
    col1: row.Col1 || '',
    col2: row.Col2 || '',
    memo: row.Memo || '',
    clues: safeParseJSON(row.Clues, []),
    location: row.Location || '',
    eventStory: row.Story || '',
    mysteryInsight: row.Insight || '',
    choices: safeParseJSON(row.Choices, []),
    solveHeadline: row.SolveHeadline || '',
    solveEnding: row.SolveEnding || '',
    landing: {
      year: row.LandingYear || '',
      date: row.LandingDate || '',
      msg: row.LandingMsg || ''
    },
    isGeneric: String(row.isGeneric || row.isgeneric || '').toLowerCase() === 'true'
  };
}

fs.writeFileSync(outputPath, `export const expandedScenarios = ${JSON.stringify(scenarios, null, 2)};\n`, 'utf8');
console.log('[rebuild_scenarios] done:', Object.keys(scenarios).length, 'scenarios');
