const fs = require('fs');
const path = require('path');

// Import the data we just recovered
// We need to read it as a string and parse or just use the object if I had it.
// Since I'm in a new execution, I'll read the JS file I just wrote.
const jsFile = fs.readFileSync('/Users/kimjinhyung/Desktop/time_library/js/data/scenarios_expanded.js', 'utf8');
const jsonStr = jsFile.match(/export const expandedScenarios = ([\s\S]+);/)[1];
const scenarios = JSON.parse(jsonStr);

const headers = [
    'ID', 'Category', 'Masthead', 'Date', 'Issue', 'Headline', 'Subtitle', 
    'Col1', 'Col2', 'Memo', 'Clues', 'Location', 'Story', 'Insight', 
    'Choices', 'SolveHeadline', 'SolveEnding', 'LandingYear', 'LandingDate', 
    'LandingMsg', 'isGeneric'
];

const escapeCSV = (val) => {
    if (val === undefined || val === null) return '';
    let str = typeof val === 'object' ? JSON.stringify(val) : String(val);
    // Escape double quotes by doubling them
    str = str.replace(/"/g, '""');
    // Wrap in double quotes
    return `"${str}"`;
};

const rows = [];
rows.push(headers.join(','));

for (const id in scenarios) {
    const s = scenarios[id];
    const row = [
        id,
        s.category,
        s.masthead,
        s.date,
        s.issue,
        s.headline,
        s.sub,
        s.col1,
        s.col2,
        s.memo,
        s.clues,
        s.location,
        s.story,
        s.insight,
        s.choices,
        s.solveHeadline,
        s.solveEnding,
        s.landing.year,
        s.landing.date,
        s.landing.msg,
        s.isGeneric ? 'TRUE' : 'FALSE'
    ];
    rows.push(row.map(escapeCSV).join(','));
}

fs.writeFileSync('/Users/kimjinhyung/Desktop/time_library/cleaned_timelibrary.csv', rows.join('\n'));
console.log('Successfully generated cleaned_timelibrary.csv');
