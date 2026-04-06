// ══════════════════════════════
//  js/main.js
//  앱 진입점 — 모든 모듈을 조립
// ══════════════════════════════

import { AudioManager }    from './AudioManager.js';
import { GameEngine }      from './GameEngine.js';
import { LibraryUI }       from './LibraryUI.js';
import { NEWSPAPERS }      from './data/index.js';
import { AdminUI }         from './AdminUI.js';
import { ThemeManager }    from './ThemeManager.js';
import { danjongStory }    from './data/danjong_story.js';

// ── 하드코딩 스토리 맵 ─────────────────────────────────────────
// { scenarioKey: (engine, solveCase) => void }
const STORIES = {
  danjong_multi: danjongStory
};

// ── 앱 초기화 ──────────────────────────────────────────────────
const audio   = new AudioManager();
const engine  = new GameEngine(audio);
const library = new LibraryUI(engine, audio, NEWSPAPERS, STORIES);
const admin   = new AdminUI(library);
const theme   = new ThemeManager();

// 전역 참조 (스토리 로직 및 테마 매니저 등에서 접근 가능하게)
window.audio   = audio;
window.library = library;
window.engine  = engine;

// ── 세이브 로드 체크 ──
const checkSave = () => {
  if (engine.hasSaveData()) {
    const modal = document.getElementById('save-modal');
    modal.classList.add('active');

    document.getElementById('btn-load-save').onclick = () => {
      const loaded = engine.loadState();
      if (loaded) {
        library.updateSolvedUI();
        if (engine.state.currentKey) {
          library.restoreSession();
        }
      }
      modal.classList.remove('active');
      audio.play('click');
    };

    document.getElementById('btn-load-fresh').onclick = () => {
      modal.classList.remove('active');
      audio.play('click');
      // 시작 시 세이브를 굳이 지우지 않고, 다음 solveCase 시점에 덮어씌워짐
    };
  }
};

// ── 라우팅 ──
const handleRoute = () => {
  const hash = window.location.hash;
  if (hash === '#/admin' || hash === '#admin') {
    library.showScreen('admin');
  } else if (hash === '#/about' || hash === '#about') {
    library.showScreen('about');
  } else if (hash === '#/library' || hash === '#library' || !hash) {
    library.showScreen('library');
  }
};

window.addEventListener('hashchange', handleRoute);
// ── 전역 폰트 제어 ──
window.setFontSize = (scale) => {
  document.documentElement.style.setProperty('--f-scale', scale);
  
  // 모든 폰트 컨트롤의 활성 상태 업데이트
  document.querySelectorAll('.font-btn').forEach(btn => btn.classList.remove('active'));
  
  // 해당하는 배율의 버튼에 active 추가
  const findId = (val) => val === 0.85 ? 's' : val === 1.2 ? 'l' : 'm';
  const suffix = findId(scale);
  const targetIds = [`f-btn-${suffix}`, `f-btn-${suffix}-game`];
  targetIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('active');
  });

  audio.play('click');
};

// ── 글로벌 함수 노출 (HTML onclick 대응) ─────────────────────
window.findClueInRecord = (id) => library.findClueInRecord(id);
window.enterEra         = (key) => library.enterEra(key);
window.backToLibrary    = () => library.backToLibrary();
window.toggleCluePanel  = () => library.toggleCluePanel();
window.openRecord       = (key) => library.openRecord(key);
window.toggleTheme      = () => theme.toggleTheme();
window.showClueContext  = (id) => library.showClueContext(id);

handleRoute(); // 초기 실행
checkSave();   // 세이브 체크
