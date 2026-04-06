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

// ── 하드코딩 스토리 맵 ─────────────────────────────────────────
// { scenarioKey: (engine, solveCase) => void }
const STORIES = {
  // 단종편: 네 개의 시선 (분기 스토리 구현)
  danjong_multi: (engine, solveCase) => {
    const pov = window.library._currentPOV; 

    const startStory = (title, text, choices) => {
      engine.log('time', title);
      engine.log('story', text);
      engine.showChoices(choices);
    };

    if (pov === 'suyang') {
      startStory(
        '[ 1457년 시월 — 수양의 집무실 ]',
        '당신은 조카의 왕위를 찬탈했다는 오명보다, 조선의 종묘사직을 굳건히 하는 것이 더 중요하다고 믿습니다. 하지만 밤마다 들려오는 바람 소리가 가끔은 단종의 울음소리처럼 들리기도 합니다.',
        [
          {
            label: "▶ 단종에게 사약을 내려 후환을 없앤다.",
            action: () => {
              engine.log('story', '당신은 비정한 결단을 내립니다. 왕방연이 울며 길을 떠나고, 당신은 조선의 진정한 왕으로 홀로 남습니다.');
              engine.addClue('suyang_kill', '수양의 비정함', '조카에게 사약을 내린 비정한 기록입니다.');
              solveCase('danjong_multi', '피로 쓴 왕의 일대기', ['수양의 기록'], '수양대군으로서 당신은 조선의 기틀을 다지기 위한 피의 길을 선택했습니다.');
            }
          }
        ]
      );
    } else if (pov === 'sayuksin') {
      startStory(
        '[ 1456년 — 성삼문의 처소 ]',
        '당신은 세종대왕의 은혜를 잊지 않았습니다. 수양대군이 왕위를 찬탈했을 때, 당신은 거사를 꿈꾸며 몰래 동료들을 모았습니다. 하지만 배신의 그림자가 드리우고 있습니다.',
        [
          {
            label: "▶ 거사의 계획을 끝까지 밀어붙인다.",
            action: () => {
              engine.log('story', '당신은 끝까지 충절을 지키기로 합니다. 하지만 김질의 변절로 당신의 거사는 실패하고 맙니다.');
              engine.addClue('sayuksin_loyalty', '성삼문의 충절', '죽음 앞에서도 굽히지 않은 충신의 기록입니다.');
              solveCase('danjong_multi', '단종을 향한 일편단심', ['성삼문의 기록'], '성삼문으로서 당신은 만고의 충신으로 남기를 선택했습니다.');
            }
          }
        ]
      );
    } else if (pov === 'kimjil') {
      startStory(
        '[ 1456년 — 김질의 고뇌 ]',
        '성삼문과 함께 수양대군을 타도하려 했으나, 거사가 탄로 날 위기에 처했습니다. 당신의 가족들이 눈앞에 아른거립니다. 동료를 배신하면 살 수 있지만, 평생 배신자로 남을 것입니다.',
        [
          {
            label: "▶ 장인인 정창손을 찾아가 거사를 고발한다.",
            action: () => {
              engine.log('story', '당신은 생존을 선택했습니다. 당신의 고발로 사육신은 처형되지만, 당신의 가문은 살아남습니다.');
              engine.addClue('kimjil_betrayal', '김질의 변절', '살기 위해 동료를 고발한 배신의 기록입니다.');
              solveCase('danjong_multi', '살고 싶었던 사나이', ['김질의 기록'], '김질로서 당신은 가족과 생존을 위해 동료의 피를 대가로 지불했습니다.');
            }
          }
        ]
      );
    } else if (pov === 'historian') {
      startStory(
        '[ 1457년 — 사관의 붓끝 ]',
        '역사의 진실은 무엇입니까? 왕이 시킨 대로 적을 것인가, 아니면 당신이 본 비극을 그대로 남길 것인가? 당신의 붓끝에 조선의 역사가 달려 있습니다.',
        [
          {
            label: "▶ 실록에 기록되지 않은 비망록을 남긴다.",
            action: () => {
              engine.log('story', '당신은 은밀한 곳에 다른 기록을 남깁니다. 공식 실록에는 담기지 못한 청령포의 진실이 후세에 전해질 것입니다.');
              engine.addClue('historian_truth', '사관의 직필', '역사의 진실을 남기려 한 용기 있는 기록입니다.');
              solveCase('danjong_multi', '지워지지 않는 먹물', ['사관의 기록'], '사관으로서 당신은 권력 앞에서도 진실을 남기는 길을 택했습니다.');
            }
          }
        ]
      );
    }
  }
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
