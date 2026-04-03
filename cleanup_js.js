
const fs = require('fs');

const path = './js/data/scenarios_expanded.js';
let content = fs.readFileSync(path, 'utf8');

// Replace corrupted text fields (anything starting with "id": or {marker:)
content = content.replace(/"location":\s*"\\?"?id\\?":.*/g, '"location": "알 수 없는 장소",');
content = content.replace(/"eventStory":\s*"\\?"?id\\?":.*/g, '"eventStory": "기록되지 않은 사건의 현장입니다.",');
content = content.replace(/"mysteryInsight":\s*"\\?"?label\\?":.*/g, '"mysteryInsight": "이 사건에 대한 자세한 조사가 필요합니다.",');
content = content.replace(/"solveHeadline":\s*"\\?"?id\\?":.*/g, '"solveHeadline": "조사 종료",');
content = content.replace(/"solveEnding":\s*"\\?"?label\\?":.*/g, '"solveEnding": "기록을 마쳤습니다.",');

// Ensure clues and choices are at least empty arrays if not parsed
content = content.replace(/"clues":\s*null/g, '"clues": []');
content = content.replace(/"choices":\s*null/g, '"choices": []');

fs.writeFileSync(path, content);
console.log('✅ JS data sanitized for clean UI.');
