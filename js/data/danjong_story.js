/**
 * js/data/danjong_story.js
 * 단종: 네 개의 시선 (10+ 챕터 시뮬레이션 로직)
 */

export const danjongStory = (engine, solveCase) => {
  const pov = window.library._currentPOV;

  // ── 헬퍼 함수 ─────────────────────────────────────────
  const next = (nodeName) => {
    if (nodes[pov] && nodes[pov][nodeName]) {
      nodes[pov][nodeName]();
    } else {
      console.error(`Missing node: ${pov}.${nodeName}`);
    }
  };

  const startStory = (title, text, choices) => {
    engine.log('time', title);
    engine.log('story', text);
    engine.showChoices(choices);
  };

  const nodes = {
    // ──────────────────────────────────────────────────
    //  1. 수양대군 (권력의 설계자)
    // ──────────────────────────────────────────────────
    suyang: {
      start: () => {
        engine.log('time', '[ 1 챕터 — 수양의 밤 ]');
        engine.log('story', '1453년, 계유정난 전야. 당신은 옷자락 끝에 묻을 피의 무게를 알고 있습니다. 조선의 강력한 왕권을 위해선 김종서를 제거해야만 합니다.');
        engine.showChoices([
          { label: "▶ 철퇴를 든 심복들을 매복시킨다.", action: () => {
            engine.modifyStat('stress', +10);
            engine.log('story', '당신은 은밀히 거사를 지시합니다. 이제 돌이킬 수 없는 강을 건넜습니다.');
            next('rival');
          }}
        ]);
      },
      rival: () => {
        engine.log('time', '[ 2 챕터 — 김종서의 실각 ]');
        engine.log('story', '대호(大虎)라 불리던 김종서가 쓰러졌습니다. 조정은 당신의 발아래에 있으나, 어린 조카(단종)의 슬픈 눈망울이 자꾸만 마음에 걸립니다.');
        engine.showChoices([
          { label: "▶ 반대파 세력을 철저히 숙청한다.", action: () => {
            engine.modifyStat('mental', -10);
            engine.log('story', '피의 숙청이 시작됩니다. 도성 곳곳에서 통곡 소리가 들려옵니다.');
            next('scholars');
          }},
          { label: "▶ 회유할 수 있는 자들은 포섭한다.", action: () => {
            engine.modifyStat('money', -20);
            engine.log('story', '많은 은을 써서 신하들의 입을 막습니다. 하지만 그들의 눈빛에는 여전히 의심이 가득합니다.');
            next('scholars');
          }}
        ]);
      },
      scholars: () => {
        engine.log('time', '[ 3 챕터 — 집현전의 저항 ]');
        engine.log('story', '성삼문, 박팽년 등 집현전 학사들이 당신의 왕위 찬탈 가능성을 경계하며 상소를 올립니다.');
        engine.showChoices([
          { label: "▶ 학사들을 위협하여 굴복시킨다.", action: () => {
            engine.modifyStat('stress', +15);
            next('rumors');
          }},
          { label: "▶ 그들의 충성심을 이용해 협상을 시도한다.", action: () => {
            engine.modifyStat('mental', -5);
            next('rumors');
          }}
        ]);
      },
      rumors: () => {
        engine.log('time', '[ 4 챕터 — 도성의 흉흉한 소문 ]');
        engine.log('story', '백성들 사이에서 수양대군이 찬탈하려 한다는 노래가 퍼지고 있습니다.');
        engine.showChoices([
          { label: "▶ 유언비어를 퍼뜨리는 자들을 엄벌에 처한다.", action: () => next('exile') },
          { label: "▶ 더 자극적인 다른 소문을 퍼뜨려 덮는다.", action: () => next('exile') }
        ]);
      },
      exile: () => {
        engine.log('time', '[ 5 챕터 — 단종의 유배 ]');
        engine.log('story', '결국 당신은 왕위에 올랐고, 단종은 노산군으로 강봉되어 영월 청령포로 유배되었습니다.');
        engine.addClue('suyang_exile', '유배지의 명단', '단종을 영월로 보낸 비정한 군주의 기록입니다.');
        engine.showChoices([{ label: "▶ 다음 장으로...", action: () => next('rebellion') }]);
      },
      rebellion: () => {
        engine.log('time', '[ 6 챕터 — 복위 거사 발각 ]');
        engine.log('story', '사육신의 단종 복위 모의가 발각되었습니다. 당신이 믿었던 신하들이 당신의 등을 찌르려 했습니다.');
        engine.showChoices([
          { label: "▶ 즉시 관련자 전원을 체포한다.", action: () => next('interrogation') }
        ]);
      },
      interrogation: () => {
        engine.log('time', '[ 7 챕터 — 피의 국문 ]');
        engine.log('story', '성삼문을 직접 심문합니다. 그는 당신을 "수양"이라 부르며 왕으로 인정하지 않습니다.');
        engine.showChoices([
          { label: "▶ 그를 회유하려 노력한다.", action: () => next('guilt') },
          { label: "▶ 가혹한 고문을 명령한다.", action: () => next('guilt') }
        ]);
      },
      guilt: () => {
        engine.log('time', '[ 8 챕터 — 침전의 악몽 ]');
        engine.log('story', '당신은 매일 밤 단종의 어머니, 현덕왕후가 꿈에 나타나 당신의 목을 조르는 고통을 겪습니다.');
        engine.modifyStat('stress', +20);
        engine.showChoices([{ label: "▶ 찬물로 정신을 차린다.", action: () => next('poison') }]);
      },
      poison: () => {
        engine.log('time', '[ 9 챕터 — 마지막 사약 ]');
        engine.log('story', '영월에 있는 단종이 살아있는 한, 당신의 자리는 불안합니다. 이제 마지막 결정을 내려야 합니다.');
        engine.showChoices([
          { label: "▶ 금부도사에게 사약을 전달한다.", action: () => {
            engine.addClue('suyang_poison', '부서진 사약 발', '조카의 목숨을 앗아간 비극의 유물입니다.');
            next('ending');
          }}
        ]);
      },
      ending: () => {
        engine.log('time', '[ 10 챕터 — 세조라는 이름 ]');
        engine.log('story', '당신은 조선의 제7대 왕 세조가 되었습니다. 강한 나라를 만들었지만, 역사는 당신을 어떻게 기록할까요? 정당성과 비극 사이에서 당신은 영원히 갇혔습니다.');
        solveCase('danjong_multi', '피로 세운 왕조의 기틀', ['세조의 야망'], '수양대군으로서 당신은 조선을 위해 가장 비정한 길을 걸어갔습니다.');
      }
    },

    // ──────────────────────────────────────────────────
    //  2. 성삼문 (고독한 충신)
    // ──────────────────────────────────────────────────
    sayuksin: {
      start: () => {
        engine.log('time', '[ 1 챕터 — 한밤의 밀회 ]');
        engine.log('story', '어린 임금이 왕위를 빼앗기고 쫓겨났습니다. 당신은 박팽년 등 뜻을 같이하는 동료들과 비밀리에 모였습니다.');
        engine.showChoices([
          { label: "▶ 피의 맹세(혈서)를 쓴다.", action: () => {
             engine.addClue('blood_vow', '혈서의 조각', '죽음을 각오한 충신들의 맹세입니다.');
             next('letter');
          }}
        ]);
      },
      letter: () => {
        engine.log('time', '[ 2 챕터 — 영월로 보내는 밀서 ]');
        engine.log('story', '유배지에 계신 단종께 거사 계획을 알려야 합니다. 삼엄한 경비를 뚫고 밀서를 전달해야 합니다.');
        engine.showChoices([
          { label: "▶ 상인을 매수하여 전달한다.", action: () => next('sword') },
          { label: "▶ 충직한 하인을 변장시켜 보낸다.", action: () => next('sword') }
        ]);
      },
      sword: () => {
        engine.log('time', '[ 3 챕터 — 칼날을 갈다 ]');
        engine.log('story', '세조의 연회날이 거사의 날입니다. 운검(雲劍)으로서 왕의 바로 옆에서 칼을 휘두를 기회를 기다립니다.');
        engine.showChoices([{ label: "▶ 무예 연습에 매진한다.", action: () => next('suspicion') }]);
      },
      suspicion: () => {
        engine.log('time', '[ 4 챕터 — 세조의 날카로운 눈초리 ]');
        engine.log('story', '연회장에서 세조가 당신을 불러 술을 따릅니다. 무언가 눈치를 챈 듯한 눈빛입니다.');
        engine.showChoices([
          { label: "▶ 태연하게 술을 받아 마신다.", action: () => next('traitor') },
          { label: "▶ 예법을 갖춰 머리를 조아린다.", action: () => next('traitor') }
        ]);
      },
      traitor: () => {
        engine.log('time', '[ 5 챕터 — 배신의 그림자 ]');
        engine.log('story', '동료 김질의 표정이 어둡습니다. 그는 자꾸만 당신의 시선을 피합니다.');
        engine.showChoices([{ label: "▶ 그를 따로 불러 안심시킨다.", action: () => next('failed') }]);
      },
      failed: () => {
        engine.log('time', '[ 6 챕터 — 실패한 거사 ]');
        engine.log('story', '거사 당일, 갑자기 운검의 출입이 금지되었습니다. 김질이 고발한 것입니다! 도망칠 시간이 없습니다.');
        engine.showChoices([{ label: "▶ 당당히 체포에 응한다.", action: () => next('prison') }]);
      },
      prison: () => {
        engine.log('time', '[ 7 챕터 — 차가운 옥사 ]');
        engine.log('story', '어두운 감옥에서 고문을 기다립니다. 몸은 으스러져도 당신의 마음은 여전히 영월을 향합니다.');
        engine.showChoices([{ label: "▶ 시 한 수를 읊는다.", action: () => next('interrogate') }]);
      },
      interrogate: () => {
        engine.log('time', '[ 8 챕터 — 수양과의 대면 ]');
        engine.log('story', '수양이 나타나 회유합니다. "삼문아, 나와 함께 일하자." 당신은 코웃음을 칩니다.');
        engine.showChoices([{ label: "▶ 그를 '수양'이라 부르며 꾸짖는다.", action: () => next('last_poem') }]);
      },
      last_poem: () => {
        engine.log('time', '[ 9 챕터 — 절명시 ]');
        engine.log('story', '처형장으로 향하는 길. 수레 위에서 당신은 마지막 시를 남깁니다. "이 몸이 죽어가서 무엇이 될고 하니..."');
        engine.addClue('last_poem_text', '성삼문의 절명시', '죽음 앞에서도 의연했던 충절의 붓글씨입니다.');
        engine.showChoices([{ label: "▶ 마지막 걸음을 내딛는다.", action: () => next('ending') }]);
      },
      ending: () => {
        engine.log('time', '[ 10 챕터 — 만고의 충신 ]');
        engine.log('story', '당신의 육신은 사라졌으나, 당신의 충절은 조선의 역사가 흐르는 한 영원히 기억될 것입니다.');
        solveCase('danjong_multi', '단종을 향한 일편단심', ['사육신의 충절'], '성삼문으로서 당신은 불의에 타협하지 않고 불멸의 이름을 얻었습니다.');
      }
    },

    // ──────────────────────────────────────────────────
    //  3. 김질 (배신의 고뇌)
    // ──────────────────────────────────────────────────
    kimjil: {
      start: () => {
        engine.log('time', '[ 1 챕터 — 위험한 초대 ]');
        engine.log('story', '장인어른과 성삼문이 당신을 불렀습니다. 그들은 세조를 타도하려 합니다. 당신은 두려움에 손을 떱니다.');
        engine.showChoices([{ label: "▶ 떨리는 손을 감추며 동조한다.", action: () => next('fear') }]);
      },
      fear: () => {
        engine.log('time', '[ 2 챕터 — 덮쳐오는 공포 ]');
        engine.log('story', '집으로 돌아온 당신. 만약 거사가 실패한다면? 당신의 가족, 어린 자식들은 모두 처형당할 것입니다.');
        engine.modifyStat('stress', +20);
        engine.showChoices([{ label: "▶ 아내의 얼굴을 바라본다.", action: () => next('advice') }]);
      },
      advice: () => {
        engine.log('time', '[ 3 챕터 — 장인 정창손의 충고 ]');
        engine.log('story', '당신의 장인이자 노회한 정치가 정창손이 묻습니다. "질아, 거동이 왜 그러느냐? 혹시 무슨 일이 있느냐?"');
        engine.showChoices([
          { label: "▶ 숨긴다.", action: () => next('night') },
          { label: "▶ 고민을 살짝 비춘다.", action: () => next('night') }
        ]);
      },
      night: () => {
        engine.log('time', '[ 4 챕터 — 번뇌의 밤 ]');
        engine.log('story', '잠이 오지 않습니다. 의리인가, 생존인가? 성삼문의 눈빛과 가족의 울음소리가 번갈아 나타납니다.');
        engine.showChoices([{ label: "▶ 궁궐로 향하는 길로 나선다.", action: () => next('gate') }]);
      },
      gate: () => {
        engine.log('time', '[ 5 챕터 — 궁궐 정문 앞에서 ]');
        engine.log('story', '대궐 문 앞에 섰습니다. 지금 들어가면 배신자가 되고, 돌아가면 역적이 될 것입니다.');
        engine.showChoices([{ label: "▶ 문지기에게 성명을 밝힌다.", action: () => next('confess') }]);
      },
      confess: () => {
        engine.log('time', '[ 6 챕터 — 세조 앞에서의 고백 ]');
        engine.log('story', '세조 앞에 엎드려 울먹이며 비밀을 털어놓습니다. 세조의 입가에 옅은 미소가 번집니다.');
        engine.log('system', '배신의 기록이 시작됩니다.');
        engine.addClue('kj_confess', '피 묻은 상소문', '동료들을 배신하고 고발한 내용이 담긴 문서입니다.');
        engine.showChoices([{ label: "▶ 머리를 조아린다.", action: () => next('reward') }]);
      },
      reward: () => {
        engine.log('time', '[ 7 챕터 — 대가로 얻은 생존 ]');
        engine.log('story', '사육신은 모두 죽임을 당했습니다. 하지만 당신과 당신의 가족은 큰 상을 받고 작위가 올라갑니다.');
        engine.showChoices([{ label: "▶ 축하 연회에 참석한다.", action: () => next('cold_shoulder') }]);
      },
      cold_shoulder: () => {
        engine.log('time', '[ 8 챕터 — 신관들의 외면 ]');
        engine.log('story', '조정의 관리들이 뒤에서 수근거립니다. "저자가 친구들을 판 김질이라네." 차가운 시선이 당신을 찌릅니다.');
        engine.showChoices([{ label: "▶ 시선을 무시하고 앞만 본다.", action: () => next('nightmare') }]);
      },
      nightmare: () => {
        engine.log('time', '[ 9 챕터 — 씻기지 않는 손 ]');
        engine.log('story', '아무리 손을 씻어도 성삼문의 피가 묻어있는 것 같습니다. 당신은 평생 죄책감 속에 살아야 합니다.');
        engine.modifyStat('stress', +30);
        engine.showChoices([{ label: "▶ 한숨을 쉰다.", action: () => next('ending') }]);
      },
      ending: () => {
        engine.log('time', '[ 10 챕터 — 생존의 무게 ]');
        engine.log('story', '당신은 장수하며 높은 지위에 올랐습니다. 하지만 역사는 당신을 "변절자"라 부릅니다. 당신이 지켰던 것은 정녕 무엇입니까?');
        solveCase('danjong_multi', '살고 싶었던 사나이의 기록', ['김질의 배신'], '김질로서 당신은 가족과 생존을 위해 모든 명예를 버렸습니다.');
      }
    },

    // ──────────────────────────────────────────────────
    //  4. 사관 (기록의 딜레마)
    // ──────────────────────────────────────────────────
    historian: {
      start: () => {
        engine.log('time', '[ 1 챕터 — 춘추관의 붓끝 ]');
        engine.log('story', '역사는 왕의 것이 아니라 후세의 것입니다. 하지만 지금 당신의 머리 위에는 왕의 칼날이 있습니다.');
        engine.showChoices([{ label: "▶ 오늘 본 무서운 상황을 적는다.", action: () => next('omit') }]);
      },
      omit: () => {
        engine.log('time', '[ 2 챕터 — 삭제된 진실 ]');
        engine.log('story', '상관이 나타나 명령합니다. "수양대군에게 불리한 이 대목은 빼게." 당신은 갈등합니다.');
        engine.showChoices([
          { label: "▶ 명령을 거부하고 끝까지 남긴다.", action: () => next('witness') },
          { label: "▶ 일단 지우는 척하며 따로 적는다.", action: () => {
            engine.addClue('secret_diary', '사관의 비밀 비망록', '공식 기록에서 삭제된 진실이 담긴 일기입니다.');
            next('witness');
          }}
        ]);
      },
      witness: () => {
        engine.log('time', '[ 3 챕터 — 국문장의 현장 ]');
        engine.log('story', '사육신이 고문당하는 현장에 입회해야 합니다. 참담한 비명 소리가 춘추관 마당까지 들려옵니다.');
        engine.showChoices([{ label: "▶ 고통을 꾹 참고 모두 기록한다.", action: () => next('code') }]);
      },
      code: () => {
        engine.log('time', '[ 4 챕터 — 은밀한 암호 ]');
        engine.log('story', '왕의 검열을 피하기 위해 비유를 사용하여 사실을 왜곡하지 않으면서도 진실을 숨깁니다.');
        engine.showChoices([{ label: "▶ 은유적인 표현을 사용한다.", action: () => next('burn') }]);
      },
      burn: () => {
        engine.log('time', '[ 5 챕터 — 불타는 서고 ]');
        engine.log('story', '군졸들이 금서를 찾는다며 서고를 뒤집습니다. 당신이 숨겨둔 기록이 발견될 위기입니다.');
        engine.showChoices([{ label: "▶ 기록을 품속에 숨겨 탈출한다.", action: () => next('king_gaze') }]);
      },
      king_gaze: () => {
        engine.log('time', '[ 6 챕터 — 왕의 시선 ]');
        engine.log('story', '세조가 춘추관에 나타나 묻습니다. "너는 나를 무엇이라 적었느냐?"');
        engine.showChoices([
          { label: "▶ '성군이십니다'라고 답한다.", action: () => next('hiding') },
          { label: "▶ '보고 들은 대로만 적었습니다'라고 답한다.", action: () => next('hiding') }
        ]);
      },
      hiding: () => {
        engine.log('time', '[ 7 챕터 — 땅속에 묻은 진실 ]');
        engine.log('story', '당신의 기록이 소실될 것을 우려하여, 일부 사초를 항아리에 넣어 땅속 깊이 묻습니다.');
        engine.addClue('hiding_pot', '기록 항아리', '후세를 위해 땅속에 숨겨둔 사초 보관함입니다.');
        engine.showChoices([{ label: "▶ 다음 장으로...", action: () => next('pressure') }]);
      },
      pressure: () => {
        engine.log('time', '[ 8 챕터 — 동료 사관의 유배 ]');
        engine.log('story', '친한 동료가 필화 사건에 휘말려 유배를 갑니다. 공포가 당신을 엄습합니다.');
        engine.modifyStat('stress', +20);
        engine.showChoices([{ label: "▶ 붓을 놓지 않고 계속 쓴다.", action: () => next('last_entry') }]);
      },
      last_entry: () => {
        engine.log('time', '[ 9 챕터 — 마지막 기록 ]');
        engine.log('story', '당신은 이제 늙었습니다. 당신이 쓴 이 기록들이 수백 년 뒤 누군가에게 조선의 진실을 알려줄 수 있을까요?');
        engine.showChoices([{ label: "▶ 붓을 내려놓고 회고한다.", action: () => next('ending') }]);
      },
      ending: () => {
        engine.log('time', '[ 10 챕터 — 기록은 영원하다 ]');
        engine.log('story', '권력은 100년을 가지 못하지만, 당신의 기록은 500년을 넘게 살아남았습니다. 당신은 역사의 최종 승자입니다.');
        solveCase('danjong_multi', '지워지지 않는 기록의 증명', ['사관의 사초'], '사관으로서 당신은 권력의 협박 속에서도 역사의 정직한 목소리를 지켰습니다.');
      }
    }
  };

  // 초기 실행
  const startNode = nodes[pov] && nodes[pov].start;
  if (startNode) {
    startStory(
      `[ ${window.library.newspapers['danjong_multi'].povs[pov].name}의 기록 복구 중 ]`,
      `조선 최고의 비극, ${pov === 'suyang' ? '피의 군주' : pov === 'sayuksin' ? '고독한 충신' : pov === 'kimjil' ? '살고픈 배신자' : '진실의 목격자'}의 시점으로 들어갑니다.`,
      [{ label: "▶ 수사 시작", action: () => startNode() }]
    );
  } else {
    engine.log('system', '⚠️ 이 시점은 아직 복구되지 않았습니다.');
  }
};
