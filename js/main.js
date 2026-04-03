// ══════════════════════════════
//  js/main.js
//  앱 진입점 — 모든 모듈을 조립
// ══════════════════════════════

import { AudioManager }    from './AudioManager.js';
import { GameEngine }      from './GameEngine.js';
import { LibraryUI }       from './LibraryUI.js';
import { NEWSPAPERS as FALLBACK_NP } from './data/index.js';
import { storyIMF1997 }    from './stories/story_imf1997.js';
import { story1980 }       from './stories/story_1980.js';
import { AdminUI }         from './AdminUI.js';
import { DataLoader }      from './DataLoader.js';

// ── 구글 시트 설정 ──────────────────────────────────────────────
const SHEET_ID = '11S56XbS10yTAXi-U6ZD0AIiXXSVYrhlVqsO0qxCrN9E';
const dataLoader = new DataLoader(SHEET_ID);

// ── 하드코딩 스토리 맵 ─────────────────────────────────────────
const STORIES = {
  imf1997:  storyIMF1997,
  choi1980: story1980,
};

// ── 앱 초기화 ──────────────────────────────────────────────────
const initApp = async () => {
  const audio  = new AudioManager();
  const engine = new GameEngine(audio);
  
  // 시나리오 로드 (GSheet)
  console.log('📦 시나리오 데이터를 가져오는 중...');
  const remoteNP = await dataLoader.loadScenarios();
  const newspapers = remoteNP || FALLBACK_NP; // 실패 시 로컬 데이터 사용
  
  const library = new LibraryUI(engine, audio, newspapers, STORIES);
  const admin   = new AdminUI(library);

  // ── 라우팅 ──
  const handleRoute = () => {
    const hash = window.location.hash;
    if (hash === '#/admin' || hash === '#admin') {
      library.showScreen('admin');
    } else if (hash === '#/library' || hash === '#library' || !hash) {
      library.showScreen('library');
    }
  };

  window.addEventListener('hashchange', handleRoute);
  handleRoute(); 
  
  console.log('✅ 시스템 준비 완료.');
};

initApp();
