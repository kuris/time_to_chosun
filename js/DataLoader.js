// ══════════════════════════════
//  js/DataLoader.js
//  Google Sheets CSV 데이터를 가져오고 파싱
// ══════════════════════════════

export class DataLoader {
  constructor(sheetId, gid = '0') {
    this.csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
  }

  async loadScenarios() {
    try {
      const response = await fetch(this.csvUrl);
      if (!response.ok) throw new Error('구글 시트 데이터를 가져오는데 실패했습니다.');
      
      const csvText = await response.text();
      return this.parseCSV(csvText);
    } catch (err) {
      console.error('DataLoader Error:', err);
      return null;
    }
  }

  parseCSV(text) {
    const lines = text.split(/\r?\n/);
    if (lines.length < 2) return {};

    // 헤더 추출
    const headers = this.splitCSVLine(lines[0]);
    const newspapers = {};

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      
      const values = this.splitCSVLine(lines[i]);
      const row = {};
      headers.forEach((h, idx) => {
        row[h] = values[idx] || '';
      });

      if (!row.ID) continue;

      // 데이터 매핑 및 역직렬화 (JSON)
      newspapers[row.ID] = {
        masthead: row.Masthead,
        date:     row.Date,
        issue:    row.Issue,
        headline: row.Headline,
        sub:      row.Subtitle,
        col1:     row.Col1,
        col2:     row.Col2,
        memo:     row.Memo,
        clues:    this.safeParseJSON(row.Clues, []),
        location: row.Location,
        eventStory: row.Story,
        mysteryInsight: row.Insight,
        choices:  this.safeParseJSON(row.Choices, []),
        solveHeadline: row.SolveHeadline,
        solveEnding:   row.SolveEnding,
        landing: {
          year: row.LandingYear,
          date: row.LandingDate,
          msg:  row.LandingMsg
        },
        isGeneric: row.isGeneric === 'true',
        category: row.Category
      };
    }

    return newspapers;
  }

  // 간단한 CSV 라인 파서 (따옴표 내 쉼표 처리)
  splitCSVLine(line) {
    const result = [];
    let start = 0;
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      if (line[i] === '"') {
        inQuotes = !inQuotes;
      } else if (line[i] === ',' && !inQuotes) {
        result.push(this.cleanValue(line.substring(start, i)));
        start = i + 1;
      }
    }
    result.push(this.cleanValue(line.substring(start)));
    return result;
  }

  cleanValue(val) {
    val = val.trim();
    if (val.startsWith('"') && val.endsWith('"')) {
      val = val.substring(1, val.length - 1).replace(/""/g, '"');
    }
    return val;
  }

  safeParseJSON(str, fallback) {
    if (!str || str.trim() === '') return fallback;
    try {
      // 엑셀에서 복사 시 따옴표 중첩 문제가 있을 수 있음
      return JSON.parse(str);
    } catch (e) {
      console.warn('JSON 파싱 실패:', str, e);
      return fallback;
    }
  }
}
