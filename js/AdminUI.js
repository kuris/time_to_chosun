// ══════════════════════════════
//  js/AdminUI.js
//  시나리오 제작기 — 데이터 입력 및 코드 생성
// ══════════════════════════════

export class AdminUI {
  constructor(libraryUI) {
    this.libraryUI = libraryUI;
    this.clueCount = 0;
    this.choiceCount = 0;

    // 전역 노출
    window.adminUI = this;

    this.init();
  }

  init() {
    // 초기 로드 시 기본 행 추가
    this.addClueRow();
    this.addChoiceRow();
  }

  // ─────────────────────────────
  //  동적 행 관리
  // ─────────────────────────────
  addClueRow() {
    this.clueCount++;
    const container = document.getElementById('ad-clue-list');
    const div = document.createElement('div');
    div.className = 'admin-dynamic-row clue-row';
    div.id = `ad-clue-row-${this.clueCount}`;
    div.innerHTML = `
      <input type="text" class="ad-c-marker" placeholder="[마커]">
      <input type="text" class="ad-c-id" placeholder="id">
      <input type="text" class="ad-c-label" placeholder="라벨">
      <input type="text" class="ad-c-desc" placeholder="설명" style="flex:2">
      <button type="button" class="admin-del-btn" onclick="this.parentElement.remove()">×</button>
    `;
    container.appendChild(div);
  }

  addChoiceRow() {
    this.choiceCount++;
    const container = document.getElementById('ad-choice-list');
    const div = document.createElement('div');
    div.className = 'admin-dynamic-row choice-row';
    div.id = `ad-choice-row-${this.choiceCount}`;
    div.innerHTML = `
      <div class="choice-inputs">
        <div class="choice-top">
          <input type="text" class="ad-ch-text" placeholder="선택지 텍스트" style="flex:2">
          <input type="text" class="ad-ch-effect" placeholder="stamina:-10|mental:20">
          <button type="button" class="admin-del-btn" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
        <textarea class="ad-ch-result" rows="1" placeholder="결과 스토리에 출력될 텍스트"></textarea>
        <div class="choice-clue-option">
          <label>단서 부여(선택)</label>
          <input type="text" class="ad-ch-clue-id" placeholder="id">
          <input type="text" class="ad-ch-clue-label" placeholder="라벨">
          <input type="text" class="ad-ch-clue-desc" placeholder="설명">
        </div>
      </div>
    `;
    container.appendChild(div);
  }

  // ─────────────────────────────
  //  데이터 수집 및 코드 생성
  // ─────────────────────────────
  generateCode() {
    const getVal = (id) => document.getElementById(id).value.trim();

    const id = getVal('ad-id') || 'sample_key';
    const clues = Array.from(document.querySelectorAll('.clue-row')).map(row => ({
      marker: row.querySelector('.ad-c-marker').value.trim(),
      id:     row.querySelector('.ad-c-id').value.trim(),
      label:  row.querySelector('.ad-c-label').value.trim(),
      desc:   row.querySelector('.ad-c-desc').value.trim(),
    })).filter(c => c.id);

    const choices = Array.from(document.querySelectorAll('.choice-row')).map(row => {
      const clueId = row.querySelector('.ad-ch-clue-id').value.trim();
      const choice = {
        text:   row.querySelector('.ad-ch-text').value.trim(),
        result: row.querySelector('.ad-ch-result').value.trim(),
        effect: row.querySelector('.ad-ch-effect').value.trim(),
      };
      if (clueId) {
        choice.clue = {
          id:    clueId,
          label: row.querySelector('.ad-ch-clue-label').value.trim(),
          desc:  row.querySelector('.ad-ch-clue-desc').value.trim(),
        };
      }
      return choice;
    }).filter(c => c.text);

    const obj = {
      [id]: {
        masthead: getVal('ad-masthead'),
        date:     getVal('ad-date'),
        issue:    getVal('ad-issue'),
        headline: getVal('ad-headline'),
        sub:      getVal('ad-sub'),
        col1:     getVal('ad-col1'),
        col2:     getVal('ad-col2'),
        memo:     getVal('ad-memo'),
        clues:    clues,
        isGeneric: true,
        location:     getVal('ad-land-year') + ' — ' + getVal('ad-land-date'),
        eventStory:   getVal('ad-eventStory'),
        mysteryInsight: getVal('ad-insight'),
        choices:      choices,
        solveHeadline: getVal('ad-solveHeadline'),
        solveEnding:   getVal('ad-solveEnding'),
        landing: {
          year: getVal('ad-land-year'),
          date: getVal('ad-land-date'),
          msg:  getVal('ad-land-msg'),
        }
      }
    };

    // 들여쓰기 포함한 예쁜 출력
    let code = JSON.stringify(obj, null, 2);
    const finalCode = `// 이 내용을 scenarios_custom.js 등에 복사해서 붙여넣으세요.\nexport const scenarios_new = ${code};`;

    // ── CSV Row 생성 (구글 시트용) ──
    const csvRow = this.toCSVRow(id, obj[id]);

    const out = document.getElementById('admin-code-output');
    out.textContent = `### [CSV Row for Google Sheet] ###\n${csvRow}\n\n### [JavaScript Code Copy] ###\n${finalCode}`;
    document.getElementById('admin-code-wrap').classList.add('visible');
  }

  // 객체를 CSV 한 줄로 변환 (따옴표 처리 포함)
  toCSVRow(id, data) {
    const fields = [
      id,
      data.category || '2000s',
      data.masthead,
      data.date,
      data.issue,
      data.headline,
      data.sub,
      data.col1,
      data.col2,
      data.memo,
      JSON.stringify(data.clues),
      data.location,
      data.eventStory,
      data.mysteryInsight,
      JSON.stringify(data.choices),
      data.solveHeadline,
      data.solveEnding,
      data.landing.year,
      data.landing.date,
      data.landing.msg,
      'true' // isGeneric
    ];

    return fields.map(f => {
      let s = String(f || '').replace(/"/g, '""'); // 따옴표 이스케이프
      return `"${s}"`;
    }).join(',');
  }

  copyToClipboard() {
    const text = document.getElementById('admin-code-output').textContent;
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.querySelector('.admin-copy-btn');
      const old = btn.textContent;
      btn.textContent = 'COPIED!';
      setTimeout(() => btn.textContent = old, 1500);
    });
  }
}
