// ══════════════════════════════
//  LibraryUI.js
//  화면 전환, 신문 렌더링, 조사 엔진
// ══════════════════════════════

export class LibraryUI {
  constructor(engine, audio, newspapers, stories) {
    this.engine     = engine;
    this.audio      = audio;
    this.newspapers = newspapers;  // 전체 시나리오 데이터
    this.stories    = stories;     // 하드코딩 스토리 맵 { key: fn }

    this.engine.ui  = this; // 스토리 내부에서 solveCase 등을 호출할 수 있도록 참조 주입
    this._npCluesFound = [];

    // 체력 0 → 도서관 귀환
    this.engine._onStaminaDepleted = () => this.backToLibrary();

    // 전역 노출 (HTML onclick 속성에서 호출)
    window.openRecord     = (k) => this.openRecord(k);
    window.enterEra       = (k) => this.enterEra(k);
    window.backToLibrary  = ()  => this.backToLibrary();
    window.findClueInNp   = (id, label, desc) => this.findClueInNp(id, label, desc);
    window.toggleCluePanel = () => this.toggleCluePanel();
    window.showClueContext = (id) => this.showClueContext(id);
    window.jumpToContext   = (id) => this.jumpToContext(id);

    // 고지도 타겟 초기화
    this._initJoseonMap();
  }

  // ── 조선 고지도 초기화 (Leaflet 제거) ──
  _initJoseonMap() {
    // Leaflet 의존성 제거됨. 고지도는 CSS 배경 및 Seal 마커로 연출.
  }

  // ─────────────────────────────
  //  화면 전환
  // ─────────────────────────────
  showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const el = document.getElementById('screen-' + id);
    if (el) el.classList.add('active');
  }

  flashTransition(cb) {
    const f = document.getElementById('flash');
    f.classList.remove('go');
    void f.offsetWidth;
    f.classList.add('go');
    setTimeout(() => { f.classList.remove('go'); if (cb) cb(); }, 800);
  }

  landingTransition(year, date, msg, location, cb) {
    const ov = document.getElementById('landing-overlay');
    document.getElementById('landing-year').textContent = year;
    document.getElementById('landing-date').textContent = date;
    document.getElementById('landing-msg').textContent  = msg;

    // 조선 고지도 표식(인장) 좌표 매핑
    this._updateJoseonTarget(location);

    const elements = ['landing-year', 'landing-date', 'landing-msg'];
    elements.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.style.animation = 'none';
      void el.offsetWidth;
      el.style.animation = '';
    });

    ov.classList.add('active');
    
    // 이펙트 사운드 (향후 테마에 맞는 효과음으로 교체 가능)
    this.audio.play('siren');

    // 애니메이션 시퀀스 완료 후 종료 (4.5초)
    setTimeout(() => { 
      ov.classList.remove('active'); 
      const seal = document.getElementById('map-target-seal');
      if(seal) seal.classList.remove('active');
      if (cb) cb(); 
    }, 5500); 
  }

  // ── 홀로그램 부조 지도 연출 (단종편 전용) ──
  hologramTransition(cb) {
    const ov = document.getElementById('hologram-overlay');
    if (!ov) { if (cb) cb(); return; }

    // 초기화
    ov.classList.remove('phase-scenic', 'phase-sync', 'phase-info');
    ov.classList.add('active');
    
    // 🔊 진입 사이렌 효과음
    this.audio.play('siren'); 

    // [1단계] 현장 식별 (0.8s ~ 2.8s)
    setTimeout(() => {
      ov.classList.add('phase-scenic');
    }, 800);

    // [2단계] 시간 동기화 및 홀로그램 전개 (2.8s ~ 5.5s)
    setTimeout(() => {
      ov.classList.remove('phase-scenic');
      ov.classList.add('phase-sync');
      this.audio.play('paper'); // 치직거리는 느낌의 대용 사운드
    }, 2800);

    // [3단계] 데이터 오버레이 (3.8s ~ 6.0s)
    setTimeout(() => {
      ov.classList.add('phase-info');
    }, 3800);

    // [종료] (5.0s 후 실제 게임 화면으로)
    setTimeout(() => {
      ov.classList.remove('active', 'phase-scenic', 'phase-sync', 'phase-info');
      if (cb) cb();
    }, 5000);
  }

  _updateJoseonTarget(locationStr) {
    const coordsMap = {
      '한성': { x: 50, y: 40 },
      '한양': { x: 50, y: 40 },
      '평양': { x: 40, y: 25 },
      '개성': { x: 45, y: 35 },
      '강화': { x: 42, y: 40 },
      '수원': { x: 50, y: 45 },
      '전주': { x: 45, y: 65 },
      '나주': { x: 40, y: 80 },
      '동래': { x: 65, y: 80 },
      '부산': { x: 65, y: 80 },
      '진도': { x: 35, y: 85 },
      '제주': { x: 40, y: 98 },
      '경주': { x: 65, y: 65 },
      '함흥': { x: 60, y: 20 },
    };

    let target = { x: 50, y: 50 }; // 기본값
    for (const [key, t] of Object.entries(coordsMap)) {
      if (locationStr && locationStr.includes(key)) {
        target = t;
        break;
      }
    }

    // 인장(Seal) 생성 및 배치
    let seal = document.getElementById('map-target-seal');
    if (!seal) {
      seal = document.createElement('div');
      seal.id = 'map-target-seal';
      seal.className = 'joseon-target-seal';
      const container = document.getElementById('map-joseon-container');
      if (container) container.appendChild(seal);
    }
    
    if (seal) {
      seal.classList.remove('active');
      seal.style.left = target.x + '%';
      seal.style.top  = target.y + '%';
      setTimeout(() => seal.classList.add('active'), 500);
    }
  }

  backToLibrary() {
    this.audio.play('click');
    document.getElementById('game-clues').classList.add('disabled');
    this.flashTransition(() => this.showScreen('library'));
  }

  // ─────────────────────────────
  //  신문 읽기
  // ─────────────────────────────
  openRecord(key) {
    const np = this.newspapers[key];
    if (!np) return;
    this._currentRecordKey = key; // 내부 추적용 전역 변수 (통일)
    this._npCluesFound = [];

    // UI 초기화 (수사 구역 숨김 및 헤더 설정)
    document.getElementById('field-notes-area').classList.remove('active');
    document.getElementById('game-stats').classList.remove('active');
    
    const totalNeeded = (np.clues || []).length + (np.choices || []).filter(ch => ch.clue).length;
    document.getElementById('game-era-badge').textContent = '──';
    document.getElementById('game-location').textContent  = '도서관 내부 — 기록 보관소';
    document.getElementById('game-clues').textContent     = `단서 ${this._npCluesFound.length}/${totalNeeded}`;
    document.getElementById('game-clues').classList.add('disabled'); // 신문 읽기 단계에선 비활성

    const overlay = document.getElementById('clue-panel-overlay');
    const closeBtn = document.querySelector('.clue-panel-close');
    
    // 사이드바 활성화 및 미스터리 바 표시 (모바일에선 닫힌 채로 시작)
    if (window.innerWidth > 768) {
      document.querySelector('.clue-panel').classList.add('active');
      if (overlay) overlay.classList.remove('active');
      if (closeBtn) closeBtn.style.display = 'none';
    } else {
      document.querySelector('.clue-panel').classList.remove('active');
      if (overlay) overlay.classList.remove('active');
      if (closeBtn) closeBtn.style.display = 'block';
    }
    document.getElementById('clue-list').innerHTML = '';
    this.engine.resetMysteryBar(totalNeeded);
    this.engine.renderStats();

    // 복구 시 이미 찾은 기록 단서가 있다면 표시
    this._npCluesFound.forEach(id => {
      const c = (np.clues || []).find(x => x.id === id);
      if (c) this.engine.addClueToPanel(c.label, c.desc, false);
    });
    
    this.engine.updateMysteryProgress();

    let col1 = np.col1 || '';
    let col2 = np.col2 || '';

    // 클릭 가능한 단서 마커 치환
    (np.clues || []).forEach((c, idx) => {
      if (!c.marker) return;
      const isFound = this.engine.state.cluesFound.includes(c.id);
      const foundClass = isFound ? ' found' : '';
      // 튜토리얼 유도를 위해 처음 단서 수집 전 첫 단서 표기
      const pulseClass = (np.isTutorial && this.engine.state.cluesFound.length === 0 && idx === 0) ? ' tutorial-pulse' : '';
      
      const tag  = `<span class="clue${foundClass}${pulseClass}" data-clue="${c.id}" onclick="findClueInRecord('${c.id}')">${c.marker.replace(/\[|\]/g, '')}</span>`;
      // 모든 발생 지점에 대해 전역 치환 (RegExp 활용)
      const safeMarker = c.marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
      col1 = col1.replace(new RegExp(safeMarker, 'g'), tag);
      col2 = col2.replace(new RegExp(safeMarker, 'g'), tag);
    });

    let html = `
      <div class="np-masthead">
        <div class="np-masthead-name">${np.masthead}</div>
        <div class="np-masthead-info"><span>${np.date}</span><span>${np.issue}</span></div>
      </div>
      <div class="np-main-headline">${np.headline}</div>
      <div class="np-sub-headline">${np.sub}</div>
    `;

    // 🌟 Multi-POV 시나리오의 경우 선택 가능한 시선 미리보기 추가
    if (np.isMultiPOV && np.povs) {
      const solvedData = this.engine.state.solved[key] || {};
      const completion = solvedData.povCompletion || {};

      html += `
        <div class="np-pov-preview">
          <div class="np-pov-preview-title">── 기록될 네 개의 시선 ──</div>
          <div class="np-pov-preview-grid">
            ${Object.entries(np.povs).map(([id, p]) => {
              const isSolved = completion[id];
              return `
                <div class="np-pov-preview-item ${isSolved ? 'solved' : ''}">
                  <div class="np-pov-preview-role" ${isSolved ? 'style="color:#90b890;"' : ''}>${p.role}</div>
                  <div class="np-pov-preview-name" ${isSolved ? 'style="color:#a0cfa0;"' : ''}>${p.name}</div>
                  <div class="np-pov-preview-tag">${isSolved ? '✓ 조사 완료' : '조사 가능' }</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    html += `
      <div class="np-columns">
        <div><div class="np-col-title">${np.col1_title || ''}</div><div class="np-col-body">${col1}</div></div>
        <div><div class="np-col-title">${np.col2_title || ''}</div><div class="np-col-body">${col2}</div></div>
      </div>
    `;
    if (np.memo) html += `<div class="np-memo">${np.memo}</div>`;
    if (np.torn) html += `<div class="np-torn">${np.torn}</div>`;

    const solved = this.engine.state.solved[key];
    html += `<div class="np-action-row">
      <button class="np-btn" onclick="backToLibrary()">← 사고(史庫) 선반으로</button>`;
    if (np.enterLabel && !solved) {
      html += `<button class="np-btn primary" onclick="enterEra('${key}')">${np.enterLabel} →</button>`;
    } else if (solved) {
      html += `<button class="np-btn" onclick="enterEra('${key}')" style="color:#90b890; border-color:rgba(144,184,144,0.4);">🔍 다시 수사하기 (재수사)</button>`;
    } else {
      // enterLabel 없는 generic 케이스도 진입 가능하게
      html += `<button class="np-btn primary" onclick="enterEra('${key}')">기록 속으로 들어간다 →</button>`;
    }
    html += `</div>
    <div style="font-size:9px; color:#a67c00; margin-top:20px; text-align:center; opacity:0.8;">
      💡 기록 본문의 <span style="border-bottom:1px solid #c8a96e; background:rgba(200,169,110,0.1);">키워드</span>를 클릭하여 단서를 미리 수집할 수 있습니다.
    </div>`;

    document.getElementById('newspaper-content').innerHTML = html;
    this.audio.play('paper');
    this.flashTransition(() => this.showScreen('newspaper'));
  }

  findClueInRecord(id) {
    const np = this.newspapers[this._currentRecordKey];
    if (!np) return;

    // 단서 데이터 찾기 (신문 markers or choices)
    let clueData = (np.clues || []).find(c => c.id === id);
    if (!clueData) {
      clueData = (np.choices || []).find(ch => ch.clue && ch.clue.id === id)?.clue;
    }
    if (!clueData) return;

    const { label, desc } = clueData;
    const el = document.querySelector(`[data-clue="${id}"]`);
    if (el) el.classList.add('found');

    // 1. 임시 수집 (신문 읽기 단계)
    if (!this._npCluesFound.includes(id)) {
      this._npCluesFound.push(id);
    }

    // 2. 수령 즉시 반영 (이미 수사 중이거나 신문 읽는 중)
    if (this.engine.state.currentKey) {
      const added = this.engine.addClue(id, label, desc);
      if (added) {
        this.audio.play('clue');
        // 수사 중이라면 즉시 해결 가능 여부 확인 및 UI 갱신
        if (this.engine.state.cluesFound.length >= this.engine.state.totalClues) {
          this._showInvestigationChoices(this.engine.state.currentKey);
        }
      }
    } else {
      // 신문만 보던 중일 때도 패널에 이름과 설명 표시
      const alreadyInList = Array.from(document.querySelectorAll('.clue-item-title'))
                            .some(el => el.textContent === label);
      if (!alreadyInList) {
        this.engine.addClueToPanel(label, desc, true);
        this.audio.play('clue');
      }
      // 상부 카운트 및 미스터리 바 업데이트
      const np = this.newspapers[this._currentRecordKey];
      const totalNeeded = (np.clues || []).length + (np.choices || []).filter(ch => ch.clue).length;
      document.getElementById('game-clues').textContent = `단서 ${this._npCluesFound.length}/${totalNeeded}`;
      
      const pct = Math.round((this._npCluesFound.length / totalNeeded) * 100);
      document.getElementById('mystery-fill').style.width = pct + '%';
      document.getElementById('mystery-pct').textContent  = pct + '%';
    }
  }

  // ─────────────────────────────
  //  시대 진입
  // ─────────────────────────────
  enterEra(key) {
    const np = this.newspapers[key];
    if (!np) return;

    // 0. Multi-POV인 경우 전용 선택 화면으로
    if (np.isMultiPOV && !this._currentPOV) {
      this.showPOVSelection(key);
      return;
    }

    const isSameCase = (this.engine.state.currentKey === key);
    let isResuming   = false;

    if (isSameCase) {
      // 1. 현재 활성화된 수사 세션과 동일한 경우: 무조건 수사 재개
      isResuming = true;
      // 신문에서 새로 클릭해서 찾은 단서들을 병합
      this._npCluesFound.forEach(id => {
        if (!this.engine.state.cluesFound.includes(id)) {
          const c = (np.clues || []).find(x => x.id === id);
          if (c) this.engine.addClue(c.id, c.label, c.desc);
        }
      });
    } else {
      // 2. 새 사건 진입 또는 해결된 건 재수사: 초기화
      this.engine.resetForCase(key);
      this.engine.state.cluesFound = [...this._npCluesFound];
    }

    // 단서 합산 (신문 단서 + 조사/스토리 단서)
    const npClueCount    = (np.clues || []).length;
    const choiceClueCount = (np.choices || []).filter(ch => ch.clue).length;
    const storyClueCount  = np.storyClueCount || (np.isGeneric === false ? 6 : 0);

    this.engine.state.totalClues = npClueCount + choiceClueCount + storyClueCount;
    this._npCluesFound = [];

    // 자동저장 시점 (수사 개시)
    this.engine.saveState();

    // 연출 데이터 추출 (객체형 landing 또는 평탄화된 landYear/landDate 모두 지원)
    const lYear = (np.landing && np.landing.year) || np.landYear || "";
    const lDate = (np.landing && np.landing.date) || np.landDate || "";
    let lMsg    = (np.landing && np.landing.msg)  || np.landMsg  || "";

    // POV 전용 메시지 반영
    if (this._currentPOV && np.povs && np.povs[this._currentPOV]) {
      lMsg = np.povs[this._currentPOV].landMsg || lMsg;
      // 스탯 라벨 업데이트
      this.engine.updateStatLabels(np.povs[this._currentPOV].stats);
    }

    const transitionFn = (['suyang', 'sayuksin', 'kimjil', 'historian', 'hanmyunghoe', 'eomheungdo'].includes(this._currentPOV)) 
                        ? (cb) => this.hologramTransition(cb) 
                        : (cb) => this.landingTransition(lYear, lDate, lMsg, np.location, cb);

    transitionFn(() => {
      this.showScreen('newspaper'); 
      document.getElementById('field-notes-area').classList.add('active');
      document.getElementById('game-stats').classList.add('active');
      
      // 신문 속으로 들어온 시점에서만 단서체크 가능
      document.getElementById('game-clues').classList.remove('disabled');

      // 모바일에서는 시대 진입 시 자동으로 단서창을 열지 않음
      if (window.innerWidth > 768) {
        document.querySelector('.clue-panel').classList.add('active');
      }

      if (isResuming) {
        this.engine.log('system', '⏳ 이전에 중단된 지점에서 수사를 재개합니다...');
      } else {
        this.engine.clearEl('game-log');
        this.engine.clearEl('clue-list');
        this.engine.resetMysteryBar();
      }
      
      this.engine.clearEl('game-choices');
      this.engine.renderStats();

      // 세션 유지 시에도 단서 패널에 표시되지 않은 단서들(병합된 것 등)을 다시 그려줌
      if (isResuming) {
        this.engine.clearEl('clue-list');
        (np.clues || []).forEach(c => {
          if (this.engine.state.cluesFound.includes(c.id)) {
            this.engine.addClueToPanel(c.label, c.desc, false);
          }
        });
        // 스토리/선택지 단서들도 포함
        this.engine.state.cluesFound.forEach(id => {
          const skip = (np.clues || []).some(cc => cc.id === id);
          if (!skip) {
             const from2 = (np.choices || []).find(ch => ch.clue && ch.clue.id === id)?.clue;
             if (from2) this.engine.addClueToPanel(from2.label, from2.desc, false);
          }
        });
        this.engine.updateMysteryProgress();
      }

      this.engine.clearScenes(); // 새 시작 시 씬 레지스트리 초기화

      if (np.isGeneric === false && this.stories[key]) {
        // 하드코딩 스토리 (엔진과 현재 시점 이름을 전달)
        this.stories[key](this.engine, this._currentPOV);

        // 만약 중단된 씬이 있다면 해당 지점으로 점프
        if (isResuming && this.engine.state.currentScene) {
          const sceneFn = this.engine.getScene(this.engine.state.currentScene);
          if (sceneFn) {
            this.engine.clearQueue(); // story function이 내부적으로 호출한 start() 로그 등 삭제
            this.engine.log('system', '⏳ 시간의 파편을 연결하여 이전 지점으로 도약합니다...');
            sceneFn();
          }
        }
      } else {
        // 범용 케이스 (isResuming 전달)
        this._startGenericCase(key, isResuming);
      }
    });
  }

  // ─────────────────────────────
  //  범용 조사 엔진
  // ─────────────────────────────
  _startGenericCase(key, isResuming = false) {
    const np = this.newspapers[key];
    const lDate = (np.landing && np.landing.date) || np.landDate || np.date || "";
    
    this.engine.setEraBadge(lDate);
    this.engine.setLocation('📍 ' + (np.location || '서울'));

    if (!isResuming) {
      this.engine.log('time', `[ ${lDate} ${np.time || '오전'} ]`);
      this.engine.log('story', np.eventStory || (np.sub || '본격적인 수사를 시작합니다.'));
      if (np.mysteryInsight) this.engine.log('mystery', np.mysteryInsight);
      
      if (np.isTutorial) {
        this.engine.log('tutorial', '사서의 조언: 스크롤을 올려 본문의 파란 단어들을 클릭해 단서를 더 수집해 보십시오. 단서를 얻어야 특정 선택지가 열리기도 합니다.');
      } else {
        this.engine.log('system', 'TIP: 기록 본문의 강조된 키워드들도 수집해야 하는 단서입니다.');
      }
      this.engine.logD();
    }

    this._showInvestigationChoices(key);
  }

  _showInvestigationChoices(key) {
    const np = this.newspapers[key];
    const choices = (np.choices || [])
      .map((c, idx) => ({ ...c, originalIdx: idx }))
      .filter(c => !this.engine.state.usedChoices.includes(c.originalIdx))
      .map(c => ({
        label:  '▶ ' + c.text,
        action: () => this._processChoice(key, c.originalIdx),
      }));

    if (choices.length > 0) {
      if (np.isTutorial && this.engine.state.usedChoices.length === 0) {
        this.engine.log('tutorial', '사서의 조언: 하단의 ▷ 모양 행동 선택지를 누르면 수사관으로서의 기력(스탯) 등 자원을 소모하며, 다음 사건의 국면으로 진행됩니다. 자원 관리에 유의하십시오.');
      }
      this.engine.showChoices(choices);
    } else {
      const isSolveReady = this.engine.state.cluesFound.length >= this.engine.state.totalClues;
      if (isSolveReady) {
        this.engine.log('good', '모든 단서를 확보했습니다. 이제 진실을 기록할 수 있습니다.');
        this.engine.showChoices([{
          label:  '▶ 도서관으로 돌아가 기록한다',
          isKey:  true,
          action: () => {
            const np = this.newspapers[key];
            const labels = this.engine.state.cluesFound.map(id => {
              const from1 = (np.clues || []).find(cc => cc.id === id);
              const from2 = (np.choices || []).find(ch => ch.clue && ch.clue.id === id)?.clue;
              return (from1 || from2)?.label || '미상의 단서';
            });
            this.solveCase(key, np.solveHeadline, labels, np.solveEnding);
          },
        }]);
      } else {
        this.engine.showChoices([{
          label:  '▶ 도서관으로 돌아가 신문을 다시 확인한다',
          action: () => this.backToLibrary(),
        }]);
      }
    }
  }

  _processChoice(key, choiceIdx) {
    const np = this.newspapers[key];
    const c  = np.choices[choiceIdx];

    if (!this.engine.state.usedChoices.includes(choiceIdx)) {
      this.engine.state.usedChoices.push(choiceIdx);
    }

    this.engine.log('story', c.result);
    this.engine.applyEffects(c.effect);

    if (c.clue) {
      const found = this.engine.addClue(c.clue.id, c.clue.label, c.clue.desc, 'generic', choiceIdx);
      if (found) {
        this.engine.log('clue', '🔑 단서 발견 — ' + c.clue.label);
        this.engine.saveState(); // 자동저장 시점 (단서 획득)
      }
    }

    this.engine.logD();
    const totalNeeded = this.engine.state.totalClues;
    if (this.engine.state.cluesFound.length >= totalNeeded) {
      this.engine.log('good', '모든 단서를 확보했습니다. 진실의 윤곽이 드러납니다.');
      this.engine.showChoices([{
        label:  '▶ 도서관으로 돌아가 기록한다',
        isKey:  true,
        action: () => {
          const labels = this.engine.state.cluesFound.map(id => {
            const from1 = (np.clues || []).find(cc => cc.id === id);
            const from2 = (np.choices || []).find(ch => ch.clue && ch.clue.id === id)?.clue;
            return (from1 || from2)?.label || '미상의 단서';
          });
          this.solveCase(key, np.solveHeadline, labels, np.solveEnding);
        },
      }]);
    } else {
      this.engine.log('system', '아직 밝혀지지 않은 진실이 더 남아있는 것 같습니다...');
      this.engine.log('system', 'TIP: 기록 본문에서 강조된 키워드들을 모두 수집했는지 확인해보세요.');
      
      // 단서 버튼 강조 효과 (박동)
      const clueBtn = document.getElementById('game-clues');
      if (clueBtn) clueBtn.classList.add('clue-pulse');
      
      this._showInvestigationChoices(key); // 배경 설명 없이 선택지만 다시 출력
    }
  }

  // ─────────────────────────────
  //  사건 해결
  // ─────────────────────────────
  solveCase(key, headline, clueLabels, ending) {
    this.engine.state.solved[key] = {
      solved: true,
      count:  this.engine.state.cluesFound.length,
      total:  this.engine.state.totalClues,
      povCompletion: { ...(this.engine.state.solved[key]?.povCompletion || {}) }
    };
    
    let isAllComplete = false;
    if (this._currentPOV) {
      let povsInfo = this.engine.state.solved[key].povCompletion;
      povsInfo[this._currentPOV] = true;
      if (this.newspapers[key].isMultiPOV && this.newspapers[key].povs) {
        if (Object.keys(povsInfo).length >= Object.keys(this.newspapers[key].povs).length) {
          isAllComplete = true;
        }
      }
    }

    this.engine.state.currentKey  = null; 
    this._currentPOV = null; // POV 종료
    this.engine.saveState(); 
    this.audio.play('solve');

    const item   = document.getElementById('np-item-' + key);
    if (item) item.classList.add('solved');
    
    // 즉시 UI 업데이트 반영
    this.updateSolvedUI();

    const isJoseon = document.body.classList.contains('theme-joseon');
    const np  = this.newspapers[key];
    let html  = `
      <div class="np-masthead">
        <div class="np-masthead-name">${np.masthead}</div>
        <div class="np-masthead-info"><span>${np.date}</span><span>${np.issue}</span></div>
      </div>
      <div class="solved-stamp-wrap"><span class="solved-stamp">${isJoseon ? '' : 'SOLVED'}</span></div>
      <div class="solved-headline">${headline}</div>
      <div class="solved-clues"><div class="solved-clue-title">수집한 단서 (클릭하여 맥락 확인)</div>
        ${this.engine.state.cluesFound.map(id => {
          const ctx = this.engine.state.clueContexts[id];
          const label = ctx ? ctx.label : '알 수 없는 단서';
          return `<div class="solved-clue-item clickable" onclick="showClueContext('${id}')">🔑 ${label}</div>`;
        }).join('')}
      </div>
      <div class="solved-ending">${ending}</div>
      ${isAllComplete ? `
      <div class="hidden-ending-reveal" style="margin-top:30px; padding:25px; border:1px solid #cfa0a0; background:rgba(207,160,160,0.1); border-radius:6px; animation: fadeIn 3s ease;">
        <div style="color:#cfa0a0; font-size:18px; font-weight:bold; margin-bottom:15px; letter-spacing:1px; border-bottom:1px solid rgba(207,160,160,0.3); padding-bottom:10px;">✨ 숨겨진 기록 해제 : 안개 속 나룻배</div>
        <div style="color:#dcdcdc; font-size:15px; line-height:1.7; text-align:justify;">
          단종의 비극을 둘러싼 여섯 개의 파편화된 진실이 마침내 하나로 연결되었습니다.<br><br>
          <span style="font-style:italic; color:#fff; display:block; margin: 15px 0; border-left:3px solid #cfa0a0; padding-left:15px;">
            "그날 밤, 동을산을 넘은 엄홍도의 등 뒤로 짙은 안개가 깔렸네. 관군들은 산을 샅샅이 뒤졌으나 사람 발자국 하나 찾지 못했지. 그런데 서강 하류에 사는 어부의 전언은 조금 달랐어. 달빛이 가려진 깊은 밤, 웬 거구가 곤룡포를 입은 소년을 나룻배에 태워 하류로, 하류로 떠내려갔다는 게야..."
          </span>
          당신은 역사의 잔혹한 패자의 기록 대신, 조선 백성들의 '희망'이라는 문장을 발견했습니다. 수양대군의 피 묻은 왕좌 너머 어딘가에서, 그는 어쩌면 아주 평온하고 자유로운 생을 살았을지도 모릅니다.
        </div>
      </div>
      ` : ''}
    `;

    document.getElementById('solved-content').innerHTML = html;
    this.flashTransition(() => this.showScreen('solved'));
  }

  // ─────────────────────────────
  //  로드된 데이터 UI 반영
  // ─────────────────────────────
  // ─────── 세션 복구 ───────
  restoreSession() {
    const key = this.engine.state.currentKey;
    if (!key) return;

    // 1. 해당 신문 열기
    this.openRecord(key);

    // 2. 수사 영역 활성화
    const area = document.querySelector('.field-notes-area');
    if (area) area.classList.add('active');

    // 3. 로그 복구
    const log = document.getElementById('game-log');
    if (log && this.engine.state._tempLogHTML) {
      log.innerHTML = this.engine.state._tempLogHTML;
      delete this.engine.state._tempLogHTML;
      this.engine._scrollLog();
    }

    // 4. 단서 패널 및 미스터리 바 동기화
    this.engine.updateMysteryProgress();
    this.engine.renderStats();

    // 5. 시각적 보정 (신문 본문에서 이미 찾은 단서들 하이라이트)
    this.engine.state.cluesFound.forEach(id => {
      const elements = document.querySelectorAll(`[data-clue="${id}"]`);
      elements.forEach(el => el.classList.add('found'));
    });

    console.log('🔄 Session restored for:', key);
  }

  // 단서 패널 토글 (모바일용)
  toggleCluePanel() {
    const clueBtn = document.getElementById('game-clues');
    if (clueBtn && clueBtn.classList.contains('disabled')) {
      // 비활성 상태면 동작 무시 (또는 안내)
      this.audio.play('click'); // 클릭 피드백은 주되 열진 않음
      return;
    }

    const panel = document.querySelector('.clue-panel');
    const overlay = document.getElementById('clue-panel-overlay');
    panel.classList.toggle('active');
    if (overlay) overlay.classList.toggle('active');
    this.audio.play('click');
  }

  // 해결 목록 UI 업데이트
  updateSolvedUI() {
    Object.keys(this.engine.state.solved || {}).forEach(key => {
      const record = this.engine.state.solved[key];
      const isSolved = typeof record === 'object' ? record.solved : !!record;
      
      if (isSolved) {
        const item   = document.getElementById('np-item-' + key);
        const status = document.getElementById('np-status-' + key);
        if (item) item.classList.add('solved');
        
        if (status) {
          if (typeof record === 'object' && record.povCompletion) {
            // POV 기반 (Multi-POV)
            const np = this.newspapers[key];
            const completedCount = Object.keys(record.povCompletion).length;
            const totalPovs = np.povs ? Object.keys(np.povs).length : 4;
            
            let dotsHtml = '<div class="pov-completion-dots">';
            for(let i=0; i<totalPovs; i++) {
              const isDone = i < completedCount;
              dotsHtml += `<span class="dot ${isDone ? 'filled' : ''}"></span>`;
            }
            dotsHtml += '</div>';
            
            status.innerHTML = `
              <div style="display:flex; flex-direction:column; align-items:flex-end; gap:4px;">
                <span style="color:#b22222; font-size:11px; font-weight:bold;">${completedCount}/${totalPovs} POV</span>
                ${dotsHtml}
              </div>
            `;
          } else if (typeof record === 'object' && record.total) {
            // 일반 조사형
            status.innerHTML = `<span style="color:#b22222">✓ 해결됨</span> <span style="font-size:11px; color:#b22222; font-weight:bold;">(${record.count}/${record.total})</span>`;
          } else {
            status.textContent = '✓ 해결됨';
          }
        }
      }
    });
  }

  // ─────────────────────────────
  //  단서 재열람 (Context Re-view)
  // ─────────────────────────────
  showClueContext(clueId) {
    const ctx = this.engine.state.clueContexts[clueId];
    if (!ctx) return;

    document.getElementById('context-clue-title').textContent = ctx.label;
    document.getElementById('context-clue-desc').textContent  = ctx.desc;
    
    const body = document.getElementById('context-log-body');
    body.innerHTML = ctx.text.map(line => `
      <div class="log-line ${line.type}" style="font-size:13px; margin-bottom:4px; opacity:0.8;">${line.msg}</div>
    `).join('');

    const modal = document.getElementById('context-modal');
    modal.classList.add('active');

    const jumpBtn = document.getElementById('btn-jump-context');
    if (ctx.scene) {
      jumpBtn.style.display = 'block';
      jumpBtn.onclick = () => this.jumpToContext(clueId);
    } else {
      jumpBtn.style.display = 'none';
    }
  }

  jumpToContext(clueId) {
    const ctx = this.engine.state.clueContexts[clueId];
    if (!ctx) return;

    const key = this.engine.state.currentKey || Object.keys(this.newspapers).find(k => this.engine.state.solved[k]);
    if (!key) return;

    this.audio.play('click');
    document.getElementById('context-modal').classList.remove('active');

    // 시간 도약 시각 효과 시작
    document.body.classList.add('time-glitch-active');

    // 수사 재시작
    this.enterEra(key);

    // 랜딩 애니메이션 이후 점프 수행을 위한 훅
    // (약 2.4초 정도 소요되므로 setTimeout으로 타이밍을 맞춤)
    setTimeout(() => {
      // 시간 도약 시각 효과 종료
      document.body.classList.remove('time-glitch-active');

      if (ctx.scene === 'generic') {
        this._processChoice(key, ctx.choiceIdx);
      } else {
        const sceneFn = this.engine.getScene(ctx.scene);
        if (typeof sceneFn === 'function') {
          this.engine.logD();
          this.engine.log('system', '⏳ 시간의 파편을 통해 과거의 특정 시점으로 도약했습니다.');
          sceneFn();
        } else {
          this.engine.log('bad', '⚠️ 해당 시점의 기록이 손상되어 이동할 수 없습니다.');
        }
      }
    }, 2500);
  }

  // ─────────────────────────────
  //  Multi-POV 시스템
  // ─────────────────────────────
  showPOVSelection(key) {
    const np = this.newspapers[key];
    const grid = document.getElementById('pov-grid');
    grid.innerHTML = '';

    const solvedData = this.engine.state.solved[key] || {};
    const completion = solvedData.povCompletion || {};

    Object.entries(np.povs).forEach(([id, p]) => {
      const isSolved = completion[id];
      const card = document.createElement('div');
      card.className = `pov-card ${isSolved ? 'solved' : ''}`;
      card.innerHTML = `
        <div class="pov-role">${p.role}</div>
        <div class="pov-name">${p.name}</div>
        <div class="pov-status" style="font-size:10px; color:#2e7d32; font-weight:bold; margin-bottom:8px;">${isSolved ? '✓ 완료' : ''}</div>
        <div class="pov-desc">${p.desc}</div>
        <button class="pov-btn-pick" onclick="selectPOV('${key}', '${id}')">${isSolved ? '다시 기록하기' : '이 시점으로 진입'}</button>
      `;
      grid.appendChild(card);
    });

    // ── 작가만의 가상 시나리오 (행복한 단종) 해금 체크 ──
    const nonHiddenPovs = Object.entries(np.povs).filter(([id, p]) => !p.isHidden);
    const totalRequired = nonHiddenPovs.length;
    const completedCount = nonHiddenPovs.filter(([id, p]) => completion[id]).length;
    
    if (completedCount >= totalRequired) {
      const hiddenCard = document.createElement('div');
      hiddenCard.className = 'pov-card hidden-unlocked';
      hiddenCard.style.gridColumn = '1 / -1'; 
      hiddenCard.style.marginTop = '20px';
      hiddenCard.style.background = 'linear-gradient(135deg, rgba(144,184,144,0.1), rgba(200,169,110,0.2))';
      hiddenCard.style.borderColor = '#c8a96e';
      hiddenCard.style.boxShadow = '0 0 20px rgba(200,169,110,0.3)';
      hiddenCard.innerHTML = `
        <div class="pov-role" style="color:#c8a96e; opacity:1; font-weight:bold;">작가만의 특별한 가상 기록</div>
        <div class="pov-name" style="color:#fff; font-size:24px; text-shadow:0 0 10px rgba(255,255,255,0.5);">행복한 단종 — 긴 꿈의 끝</div>
        <div class="pov-desc" style="color:#d9d0c1; line-height:1.6;">모든 엇갈린 기록이 하나로 모여 증명된 것은 죽음이 아닌 '희망'이었습니다. 역사라는 이름의 감옥을 부수고, 단종이 인간으로서 누린 60년의 평온한 세월을 따라갑니다.</div>
        <button class="pov-btn-pick" onclick="selectPOV('${key}', 'virtual')" style="background:#c8a96e; color:#1a1a1a; font-weight:bold; border:none; padding:15px; cursor:pointer; width:100%; border-radius:4px; margin-top:10px;">가상 시나리오 진입 (행복한 엔딩)</button>
      `;
      grid.appendChild(hiddenCard);
    }

    window.selectPOV = (k, pid) => this.selectPOV(k, pid);
    this.audio.play('paper');
    this.showScreen('pov-selection');
  }

  selectPOV(key, povId) {
    this._currentPOV = povId;
    this.audio.play('click');
    this.enterEra(key);
  }
}
