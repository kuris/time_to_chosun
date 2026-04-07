// ══════════════════════════════
//  js/data/danjong_story.js
//  단종: 네 개의 시선 - 시점별 상세 시나리오 데이터
// ══════════════════════════════

const danjongStory = (engine, pov) => {
  const next = (nodeId) => {
    engine.state.currentScene = nodeId;
    if (nodes[nodeId]) {
      nodes[nodeId]();
    } else {
      console.error(`Node not found: ${nodeId} for POV: ${pov}`);
    }
  };

  const solveCase = (caseId, title, clues, summary) => {
    if (engine.solve) {
      engine.solve(caseId, title, clues, summary);
    }
  };

  const nodes = {
    // ══════════════════════════════════════════════════════════════
    //  1. 수양대군: 권력의 설계자 (확장 버전: 12 Chapters, 10 Clues)
    // ══════════════════════════════════════════════════════════════
    suyang_start: () => {
        engine.log('time', '[ 1 챕터 — 설원 위의 고독 ]');
        engine.log('story', '진눈깨비가 내리는 수강궁의 뜰, 당신은 홀로 활시위를 당깁니다. 과녁의 중심을 꿰뚫는 화살 소리만이 적막을 깹니다. 어린 조카가 왕위에 오른 지 일 년, 조정은 김종서와 황보인의 손에 휘둘리고 있습니다.');
        engine.log('inner', '“사직이 위태롭다. 문종 형님께서 내게 남긴 것은 이 나라의 안위인가, 아니면 왕위에 대한 유혹인가. 내가 움직이지 않으면 이 나라는 신권에 먹히고 말 것이다.”');
        engine.showChoices([
          { label: "▶ 과녁을 향해 마지막 화살을 날리며 결의를 다진다.", action: () => {
             engine.modifyStat('mental', +5);
             engine.addClue('suyang_bow', '대군의 활', '수양대군의 무(武)에 대한 기개와 결의가 서린 낡은 활입니다.');
             next('suyang_tiger_hunt');
          }},
          { label: "▶ 활을 내려놓고 차가운 눈으로 궁궐 쪽을 응시한다.", action: () => {
             engine.modifyStat('stress', +10);
             next('suyang_tiger_hunt');
          }},
          { label: "▶ 김종서의 집으로 사람을 보내 동태를 살핀다.", action: () => {
             engine.modifyStat('money', -10);
             next('suyang_tiger_hunt');
          }}
        ]);
    },
    suyang_tiger_hunt: () => {
        engine.log('time', '[ 2 챕터 — 대호를 사냥하다 ]');
        engine.log('story', '계유년 십월의 밤. 당신은 한명회와 함께 김종서의 집을 직접 찾아갑니다. 차가운 철퇴가 어둠 속에서 번뜩입니다. "천둥소리가 나거든 시작하라." 당신의 명령에 역사는 요동치기 시작합니다.');
        engine.showChoices([
          { label: "▶ 직접 말을 몰아 거사의 최전선에 선다.", action: () => {
             engine.modifyStat('stamina', -20);
             engine.addClue('black_armor', '검은 갑옷', '계유정난의 밤, 수양대군이 직접 몸에 걸쳤던 차가운 갑옷입니다.');
             next('suyang_throne_entry');
          }},
          { label: "▶ 거리를 유지하며 한명회의 신호만을 기다린다.", action: () => {
             engine.modifyStat('stress', +15);
             next('suyang_throne_entry');
          }}
        ]);
    },
    suyang_throne_entry: () => {
        engine.log('time', '[ 3 챕터 — 육좌 위의 서늘함 ]');
        engine.log('story', '근정전의 육좌에 앉아 있는 순간, 면류관의 옥 구슬들이 가볍게 흔들리며 차가운 소리를 냈습니다. 당신의 시야에 들어오는 대신들의 눈빛은 예전과 전혀 다릅니다. 이 자리는 생각보다 춥고, 생각보다 넓습니다.');
        engine.showChoices([
          { label: "▶ 엄격한 법치와 숙청으로 반대파를 억누른다.", action: () => {
             engine.modifyStat('mental', -10);
             engine.modifyStat('stress', +20);
             engine.addClue('secret_allies', '밀약의 명단', '수양대군의 거사를 도왔던 공신들의 은밀한 결탁 기록입니다.');
             next('suyang_scholar_protest');
          }},
          { label: "▶ 인재들을 포용하며 민심을 먼저 수습하려 한다.", action: () => {
             engine.modifyStat('money', -20);
             engine.modifyStat('mental', +10);
             next('suyang_scholar_protest');
          }}
        ]);
    },
    suyang_scholar_protest: () => {
        engine.log('time', '[ 4 챕터 — 집현전의 조용한 반항 ]');
        engine.log('story', '당신이 아꼈던 인재인 성삼문과 박팽년이 당신을 대하는 태도가 예전 같지 않습니다. 그들은 옥새를 전달하며 차가운 눈빛으로 당신을 바라봅니다.');
        engine.log('inner', '“내가 그토록 아꼈던 천재들이 이제는 나를 비수를 든 괴물처럼 여기는구나. 그들의 고결함이 가소로우면서도, 한편으론 시리도록 부럽다.”');
        engine.showChoices([
          { label: "▶ 그들의 고결함을 비웃으며 정당성을 주장한다.", action: () => {
             engine.modifyStat('stress', -5);
             next('suyang_nightmare_visions');
          }},
          { label: "▶ 묵묵히 그들의 눈빛을 받아내며 옥새를 쥔다.", action: () => {
             engine.modifyStat('mental', -5);
             engine.addClue('regret_monologue', '새벽의 독백', '집현전 학사들의 배신감과 자신의 고독을 적어 내려간 비망록입니다.');
             next('suyang_nightmare_visions');
          }}
        ]);
    },
    suyang_nightmare_visions: () => {
        engine.log('time', '[ 5 챕터 — 피 흘리는 조카의 환영 ]');
        engine.log('story', '깊은 밤, 촛불이 일렁일 때마다 현덕왕후의 원혼이 나타나 당신의 목을 조르는 꿈을 꿉니다. "숙부여, 정녕 당신의 손에 묻은 피가 닦일 줄 알았느냐!" 당신은 식은땀을 흘리며 깨어납니다.');
        engine.showChoices([
          { label: "▶ 무시하고 정무에 더욱 집착한다.", action: () => {
             engine.modifyStat('stamina', -10);
             engine.addClue('cursed_sleep', '저주받은 꿈', '잠들지 못하는 밤, 당신을 괴롭히는 원혼의 흔적입니다.');
             next('suyang_exile_decision');
          }},
          { label: "▶ 대규모 법회를 열어 죄를 씻으려 한다.", action: () => {
             engine.modifyStat('money', -30);
             engine.modifyStat('mental', +20);
             next('suyang_exile_decision');
          }}
        ]);
    },
    suyang_exile_decision: () => {
        engine.log('time', '[ 6 챕터 — 영월, 청령포로의 유배 ]');
        engine.log('story', '당신은 결국 단종을 사면이 절벽으로 둘러싸인 천혜의 감옥, 영월 청령포로 보낼 것을 명합니다. 그것은 유배라는 이름의 사실상의 사형 선고입니다.');
        engine.showChoices([
          { label: "▶ 단호하게 영월 유배령을 최종 선포한다.", action: () => {
             engine.modifyStat('mental', -15);
             engine.addClue('tainted_seal', '얼룩진 옥새', '단종을 유배 보낼 때 찍힌 차가운 옥새의 인장입니다.');
             next('suyang_assassination_threat');
          }},
          { label: "▶ 잠시 주저하며 교서 위에 손을 얹고 망설인다.", action: () => {
             engine.modifyStat('stress', +25);
             next('suyang_assassination_threat');
          }}
        ]);
    },
    suyang_assassination_threat: () => {
        engine.log('time', '[ 7 챕터 — 연회장의 은밀한 비수 ]');
        engine.log('story', '경회루 연회 중, 성삼문과 유응부가 칼을 숨겼다는 밀고를 받습니다. 웃음소리 뒤에 숨겨진 차가운 금속음이 들려오는 것만 같습니다.');
        engine.showChoices([
          { label: "▶ 즉시 호위무사를 불러 연회장을 폐쇄한다.", action: () => {
             engine.modifyStat('stamina', -5);
             engine.addClue('shadow_guards', '그림자 호위병의 증언', '연회장의 어두운 그림자 속에 숨어 있던 자들의 은밀한 기록입니다.');
             next('suyang_interrogation_hell');
          }},
          { label: "▶ 아무 일 없는 듯 연회를 계속하며 기회를 엿본다.", action: () => {
             engine.modifyStat('stress', +30);
             next('suyang_interrogation_hell');
          }}
        ]);
    },
    suyang_interrogation_hell: () => {
        engine.log('time', '[ 8 챕터 — 성삼문의 위엄 앞에 서다 ]');
        engine.log('story', '붙잡힌 성삼문을 직접 국문합니다. 그는 고문 속에서도 당신을 향해 비웃음을 날립니다. "수양, 너는 왕이 아니다!" 당신은 그의 기개에 질투와 경외감을 동시에 느낍니다.');
        engine.showChoices([
          { label: "▶ 차가운 눈으로 그의 최후를 지켜본다.", action: () => {
             engine.modifyStat('mental', -20);
             engine.addClue('blood_edict', '피의 교서', '반역자들을 처벌하기 위해 내린 잔혹한 명령서입니다.');
             next('suyang_final_poison');
          }},
          { label: "▶ 분노하여 직접 채찍을 들어 그를 윽박지른다.", action: () => {
             engine.modifyStat('stamina', -15);
             engine.modifyStat('stress', +10);
             next('suyang_final_poison');
          }}
        ]);
    },
    suyang_final_poison: () => {
        engine.log('time', '[ 9 챕터 — 단종의 마지막 사약 ]');
        engine.log('story', '금부도사 왕방연을 영월로 보냅니다. 그가 가져갈 상자 안에는 어린 왕의 숨을 거둘 사약이 담겨 있습니다. 당신은 창밖을 보며 애써 마음을 다잡습니다.');
        engine.showChoices([
          { label: "▶ 떨리는 손으로 사약 발에 인장을 찍는다.", action: () => {
             engine.modifyStat('mental', -30);
             engine.addClue('poison_goblet', '최후의 사약 발', '어린 왕의 마지막을 지켜보았던 비극적인 도구의 흔적입니다.');
             next('suyang_palace_whispers');
          }},
          { label: "▶ 마지막 순간까지 교서를 쥐고 고뇌한다.", action: () => {
             engine.modifyStat('stress', +40);
             next('suyang_palace_whispers');
          }}
        ]);
    },
    suyang_palace_whispers: () => {
        engine.log('time', '[ 10 챕터 — 환청 속의 왕관 ]');
        engine.log('story', '왕좌에 앉아 있지만, 복도에서 들려오는 발소리가 모두 당신을 해량하려는 자들의 것으로 들립니다. "전하, 정녕 편안하시옵니까?"라는 환청이 귓가를 맴돕니다.');
        engine.showChoices([
          { label: "▶ 종묘를 찾아가 조상신들께 정당성을 호소한다.", action: () => {
             engine.modifyStat('mental', +10);
             engine.addClue('ancestral_vow', '종묘의 맹세', '종묘의 차가운 바닥에서 왕권을 지키겠다 맹세한 기록입니다.');
             next('suyang_building_nation');
          }},
          { label: "▶ 환청을 지우기 위해 밤새 술에 의지한다.", action: () => {
             engine.modifyStat('stamina', -30);
             engine.modifyStat('stress', -10);
             next('suyang_building_nation');
          }}
        ]);
    },
    suyang_building_nation: () => {
        engine.log('time', '[ 11 챕터 — 세조의 업적 뒤의 어둠 ]');
        engine.log('story', '경국대전을 편찬하고 국가의 기틀을 다집니다. 하지만 당신의 손에 묻은 피는 화려한 업적 아래 여전히 붉게 일렁이고 있습니다. 백성들은 당신을 두려워하지만, 사랑하지는 않습니다.');
        engine.showChoices([
          { label: "▶ 역사에 남을 위대한 왕이 되겠노라 다짐한다.", action: () => {
             engine.modifyStat('mental', +15);
             next('suyang_ending');
          }},
          { label: "▶ 신권을 억제하고 왕권을 더욱 공고히 한다.", action: () => {
             engine.modifyStat('stress', +15);
             next('suyang_ending');
          }}
        ]);
    },
    suyang_ending: () => {
        engine.log('time', '[ 12 챕터 — 저물지 않는 업보 ]');
        engine.log('story', '말년의 당신은 피부에 원인 모를 종기가 돋아 고통받습니다. 당신이 세운 조선의 기틀은 단단하지만, 당신의 침상은 매일 밤 비명으로 가득합니다.');
        engine.log('inner', '“내가 얻은 것은 무엇이고, 잃은 것은 무엇인가. 왕관의 무게는 결국 나의 뼈를 깎아내는구나.”');
        solveCase('danjong_multi', '피로 세운 왕좌', ['대군의 활', '검은 갑옷', '밀약의 명단', '얼룩진 옥새', '피의 교서', '최후의 사약 발', '종묘의 맹세'], '조선의 기틀을 세웠으나, 비정한 숙부라는 낙인과 평생의 죄책감을 왕관의 대가로 지불했습니다.');
    },

    // 2. 성삼문(사육신): 고독한 충신 (12 Chapters, 10 Clues)
    sayuksin_start: () => {
        engine.log('time', '[ 1 챕터 — 집현전의 마지막 등불 ]');
        engine.log('story', '늦은 밤 집현전, 당신은 홀로 붓을 들어 정무를 봅니다. 하지만 마음은 저 멀리 수양대군의 사제로 향하고 있습니다. 나라의 기틀을 닦았던 동료들이 하나둘 대군에게 머리를 숙이고 있습니다.');
        engine.log('inner', '“충절이란 무엇인가. 굶주림을 이기고 수양산으로 들어간 백이요, 숙제의 마음이 지금 나의 마음과 같을까. 나는 주상만을 지켜야 한다.”');
        engine.showChoices([
          { label: "▶ 책상 모서리에 새긴 ‘충(忠)’자를 어루만진다.", action: () => {
             engine.addClue('sam_spirit', '절개(節槪)의 문장', '집현전 책상 밑에 몰래 새겨둔 충절의 맹세입니다.');
             next('sayuksin_suyang_call');
          }},
          { label: "▶ 수양대군의 사저를 멀리서 지켜본 후 돌아온다.", action: () => next('sayuksin_suyang_call') }
        ]);
    },
    sayuksin_suyang_call: () => {
        engine.log('time', '[ 2 챕터 — 수양의 부름, 거절의 미학 ]');
        engine.log('story', '수양대군이 당신을 불러 진수성찬을 대접하며 묻습니다. “선생, 나와 함께 큰일을 도모하지 않겠소?” 당신은 웃으며 자리를 사양합니다.');
        engine.showChoices([
          { label: "▶ 우아하지만 단호하게 대군의 제안을 거절한다.", action: () => {
             engine.addClue('sam_poem', '절명시', '수양대군의 회유에도 흔들리지 않았던 그날의 기개가 담긴 시구입니다.');
             next('sayuksin_secret_monologue');
          }}
        ]);
    },
    sayuksin_secret_monologue: () => {
        engine.log('time', '[ 3 챕터 — 단종의 눈물 어린 밀령 ]');
        engine.log('story', '어린 임금이 당신을 은밀히 부릅니다. “선생, 내게는 선생뿐입니다.” 왕의 눈물 젖은 소맷자락을 보며 당신은 명분 이상의 무거운 책임감을 느낍니다.');
        engine.showChoices([
          { label: "▶ 무릎을 꿇고 왕에게 충성을 맹세한다.", action: () => {
             engine.addClue('secret_decree', '단종의 복위 교서', '어린 왕의 복위를 위해 준비했던 비밀스러운 명령서입니다.');
             next('sayuksin_vow_meeting');
          }}
        ]);
    },
    sayuksin_vow_meeting: () => {
        engine.log('time', '[ 4 챕터 — 거사를 위한 은밀한 회합 ]');
        engine.log('story', '박팽년, 이개, 하위지... 당신과 같은 뜻을 품은 이들이 깊은 밤 모였습니다. 등잔불 아래서 서로의 얼굴을 확인하며 죽음을 각오한 맹세를 나눕니다.');
        engine.showChoices([
          { label: "▶ 각자의 손가락을 깨물어 혈서를 작성한다.", action: () => {
             engine.addClue('bloody_vow', '사육신의 혈서', '죽음을 두려워하지 않는 6인 충신의 의지가 담긴 비단 조각입니다.');
             next('sayuksin_sal_seng_bu');
          }}
        ]);
    },
    sayuksin_sal_seng_bu: () => {
        engine.log('time', '[ 5 챕터 — 살생부의 진실을 마주하다 ]');
        engine.log('story', '한명회가 작성했다는 살생부의 초안을 입수합니다. 당신의 이름 옆에 ‘사(死)’ 자가 선명하게 적혀 있습니다. 당신은 두려움 대신 차가운 평온을 느낍니다.');
        engine.showChoices([
          { label: "▶ 자신의 운명을 직시하며 결전의 날을 기다린다.", action: () => {
             engine.addClue('tiger_seal', '호랑이 군단의 인장', '거사 당일 신호를 보내기 위해 준비했던 학사들의 도장입니다.');
             next('sayuksin_banquet_dagger');
          }}
        ]);
    },
    sayuksin_banquet_dagger: () => {
        engine.log('time', '[ 6 챕터 — 경회루, 연회장의 비수 ]');
        engine.log('story', '경회루에서 열린 연회, 장사 유응부가 칼을 숨기고 대기하고 있습니다. 당신의 신호 한 번에 조선의 역사는 다시 쓰일 것입니다. 하지만 공기는 평소보다 무겁고 삼엄합니다.');
        engine.showChoices([
          { label: "▶ 숨겨진 비수를 확인하며 떨리는 손을 꽉 쥔다.", action: () => {
             engine.addClue('hidden_dagger', '연회장의 비수', '거사 실패 후 경회루 연못 근처에서 발견된 차가운 칼날입니다.');
             next('sayuksin_jil_eye');
          }}
        ]);
    },
    sayuksin_jil_eye: () => {
        engine.log('time', '[ 7 챕터 — 김질의 눈빛, 배신의 전조 ]');
        engine.log('story', '동료 김질의 눈빛이 흔들리고 있습니다. 그는 당신과 눈을 맞추지 못하고 자꾸만 발끝을 내려다봅니다. 당신은 무언가 잘못되었음을 직감합니다.');
        engine.log('inner', '“질(質)아, 자네의 눈에 비친 것은 정의인가, 아니면 생존에 대한 갈구인가. 우리의 맹세가 무너지는 소리가 들리는구나.”');
        engine.showChoices([
          { label: "▶ 그에게 다가가 마지막으로 어깨를 꽉 쥐어준다.", action: () => next('sayuksin_capture') }
        ]);
    },
    sayuksin_capture: () => {
        engine.log('time', '[ 8 챕터 — 들이닥친 금부도사 ]');
        engine.log('story', '새벽녘, 관군들이 당신의 가택을 포위합니다. 김질의 밀고로 모든 것이 탄로 났습니다. 당신은 가족들에게 마지막 인사를 건넬 틈도 없이 포박당합니다.');
        engine.showChoices([
          { label: "▶ 당당하게 고개를 들고 관군들을 마주한다.", action: () => {
             engine.addClue('broken_shackles', '부서진 쇠사슬', '심문을 위해 채워졌지만, 당신의 정신만은 묶지 못했던 쇠사슬입니다.');
             next('sayuksin_interrogation');
          }}
        ]);
    },
    sayuksin_interrogation: () => {
        engine.log('time', '[ 9 챕터 — 국문장의 모진 고초 ]');
        engine.log('story', '달궈진 인두가 살을 태우는 냄새가 진동합니다. 수양은 당신에게 묻습니다. “누가 시켰느냐!” 당신은 피를 뱉으며 답합니다. “내 마음이 시켰다!”');
        engine.showChoices([
          { label: "▶ 고문을 이겨내며 끝까지 주상의 안위만을 묻는다.", action: () => {
             engine.addClue('prison_ink', '옥중의 먹물', '고문 도중에도 자신의 의지를 남기기 위해 사용했던 먹물 자국입니다.');
             next('sayuksin_last_shout');
          }}
        ]);
    },
    sayuksin_last_shout: () => {
        engine.log('time', '[ 10 챕터 — 수양을 향한 호통 ]');
        engine.log('story', '수양이 직접 국문장에 나타났습니다. 당신은 그를 ‘나리’라 부르며 왕으로 인정하지 않습니다. “나리, 그대가 훔친 것은 왕좌가 아니라 조선의 천명이다!”');
        engine.showChoices([
          { label: "▶ 눈을 부릅뜨고 수양의 위선을 꾸짖는다.", action: () => {
             engine.addClue('final_gaze', '주상을 향한 마지막 시선', '죽음 앞에서도 왕을 향한 흔들림 없는 충성을 보여준 눈빛의 기록입니다.');
             next('sayuksin_execution');
          }}
        ]);
    },
    sayuksin_execution: () => {
        engine.log('time', '[ 11 챕터 — 거열형, 육신의 흩어짐 ]');
        engine.log('story', '형장으로 향하는 길, 백성들이 울음 섞인 함성을 보냅니다. 당신의 사지가 수레에 묶이지만, 당신의 영혼은 이미 청령포의 어린 임금 곁으로 날아가고 있습니다.');
        engine.showChoices([
          { label: "▶ “이 몸이 죽어가서 무엇이 될고 하니...” 시를 읊으며 최후를 맞는다.", action: () => {
             engine.addClue('loyalist_cane', '유배지의 지팡이', '거사 전, 단종이 머무는 영월을 향해 절을 할 때 지탱했던 지팡이입니다.');
             next('sayuksin_ending');
          }}
        ]);
    },
    sayuksin_ending: () => {
        engine.log('time', '[ 12 챕터 — 역사에 남은 불멸의 충절 ]');
        engine.log('story', '당신의 육신은 찢겨 효시되었으나, 당신의 이름은 ‘사육신’이라는 성스러운 명칭으로 천 년 역사에 남았습니다. 권력에 굴복한 자들은 부귀를 누렸으나 후세의 비난을 받았고, 목숨을 버린 당신은 만인의 존경을 받는 충의의 상징이 되었습니다.');
        engine.log('inner', '“나의 죽음이 조선의 거울이 되리라. 임금은 오직 하나뿐이다.”');
        solveCase('danjong_multi', '만고에 빛나는 절개', ['절명시', '단종의 복위 교서', '사육신의 혈서', '연회장의 비수', '부서진 쇠사슬', '절개(節槪)의 문장'], '사학자가 아닌 의인이 되어 조선의 자존심을 지켰습니다. 당신의 죽음은 훗날 단종이 왕으로 복권되는 가장 큰 씨앗이 됩니다.');
    },

    // ══════════════════════════════════════════════════════════════
    kimjil_start: () => {
        engine.log('time', '[ 1 챕터 — 아슬아슬한 공모 ]');
        engine.log('story', '성삼문, 박팽년... 당신은 기라성 같은 천재들과 함께 단종 복위를 꿈꾸고 있습니다. 하지만 거사일이 다가올수록 설렘보다는 차가운 공포가 목을 조여옵니다.');
        engine.log('inner', '“이것은 정의인가, 아니면 도박인가? 만약 실패한다면 나의 늙은 부모와 어린 자식들은 어떻게 될 것인가?”');
        engine.showChoices([
          { label: "▶ 일단은 동료들의 계획에 동조하는 척한다.", action: () => {
             engine.addClue('jil_hesitation', '흔들리는 붓끝', '김질이 쓴 일기에 나타난 극심한 불안의 흔적입니다.');
             next('kimjil_night_pressure');
          }},
          { label: "▶ 동료들에게 은밀히 빠지겠다는 의사를 내비친다.", action: () => {
             engine.addClue('secret_contract', '동료들과의 서약서', '거사 직전 동료들과 나누었던 피의 맹세가 담긴 서약서입니다.');
             next('kimjil_night_pressure');
          }}
        ]);
    },
    kimjil_night_pressure: () => {
        engine.log('time', '[ 2 챕터 — 잠들지 못하는 밤 ]');
        engine.log('story', '집안의 촛불이 꺼질 때마다 당신은 환청을 듣습니다. 관군들이 들이닥쳐 가족들을 끌고 가는 비명소리. 당신의 손은 벌벌 떨려 찻잔조차 들기 힘듭니다.');
        engine.showChoices([
          { label: "▶ 떨리는 손으로 찻잔을 들어 올린다.", action: () => {
             engine.addClue('panic_shaking', '떨리는 찻잔', '극심한 불안감으로 인해 김질이 떨어뜨려 이가 나간 찻잔입니다.');
             next('kimjil_wife_persuasion');
          }}
        ]);
    },
    kimjil_wife_persuasion: () => {
        engine.log('time', '[ 3 챕터 — 아내의 울음 섞인 호소 ]');
        engine.log('story', '아내는 무릎을 꿇고 당신의 소맷자락을 붙잡습니다. “대감, 부디 산 사람들을 보소서. 충절은 역사에 남지만 가족의 목숨은 지금 당신의 손에 달려 있습니다.”');
        engine.log('inner', '“아내의 눈동자에 비친 내 모습이 너무도 초라하구나. 명분보다 생명이 더 무겁단 말인가.”');
        engine.showChoices([
          { label: "▶ 아내를 다독이며 결심을 굳힌다.", action: () => {
            engine.addClue('jil_tear', '젖은 옷소매', '가족의 안위를 걱정하는 김질의 인간적인 고뇌가 담긴 증거입니다.');
            engine.addClue('wife_plea', '아내의 비단 손수건', '남편의 마음을 돌리기 위해 아내가 눈물로 적신 손수건입니다.');
            next('kimjil_father_in_law_visit');
          }}
        ]);
    },
    kimjil_father_in_law_visit: () => {
        engine.log('time', '[ 4 챕터 — 장인 정창손의 충고 ]');
        engine.log('story', '장인어른이자 대제학인 정창손이 당신을 부릅니다. “김 서방, 눈동자가 불안하네. 대세를 거스르면 남는 것은 피바람뿐일세.” 그 역시 수양의 편에 서야 한다고 강하게 압박합니다.');
        engine.showChoices([
          { label: "▶ 장인에게 모든 사실을 고백하고 도움을 청한다.", action: () => next('kimjil_panic_decision') }
        ]);
    },
    kimjil_panic_decision: () => {
        engine.log('time', '[ 5 챕터 — 공포가 낳은 밀고 ]');
        engine.log('story', '새벽 공기를 뚫고 당신은 세조의 처소로 향합니다. 당신은 결국 모든 계획을 쏟아냅니다. 동료들의 이름을 말할 때마다 영혼이 찢기지만 살 수 있다는 안도가 당신을 지배합니다.');
        engine.showChoices([
          { label: "▶ 고개를 숙이고 모든 세부 사항을 밀고한다.", action: () => {
             engine.addClue('jil_confession', '배신의 증언록', '동료들의 거사 계획을 세조에게 낱낱이 고해바친 밀고의 기록입니다.');
             next('kimjil_betrayal_aftermath');
          }}
        ]);
    },
    kimjil_betrayal_aftermath: () => {
        engine.log('time', '[ 6 챕터 — 보상으로 받은 핏빛 관복 ]');
        engine.log('story', '세조는 당신의 밀고 덕분에 반란을 막았다며 정난공신의 작위를 내립니다. 새로 받은 관복에서 향긋한 비단 냄새가 나지만, 당신에게는 비릿한 피 냄새로만 느껴집니다.');
        engine.showChoices([
          { label: "▶ 훈장(공신록)을 가슴에 품고 애써 웃어 보인다.", action: () => {
            engine.addClue('informer_list', '밀고의 대가', '동료의 목숨과 맞바꾼 화려한 공신록입니다.');
            engine.addClue('betrayal_gold', '배반의 금술잔', '밀고의 공으로 세조에게 하사받은 화려하지만 무거운 금술잔입니다.');
            next('kimjil_witness_torture');
          }}
        ]);
    },
    kimjil_witness_torture: () => {
        engine.log('time', '[ 7 챕터 — 친구의 비명 ]');
        engine.log('story', '국문장에서 성삼문의 처절한 비명이 담장 너머로 들려옵니다. 당신은 귀를 막지만, 비명은 심장속까지 파고듭니다. 어제까지 함께 시를 읊던 친구가 지금 당신 때문에 죽어가고 있습니다.');
        engine.showChoices([
          { label: "▶ 외면하며 고개를 돌린 채 술을 들이켠다.", action: () => next('kimjil_post_rebellion_life') }
        ]);
    },
    kimjil_post_rebellion_life: () => {
        engine.log('time', '[ 8 챕터 — 차가운 주변의 시선 ]');
        engine.log('story', '승승장구하지만, 동료 대신들은 당신과 눈을 마주치지 않습니다. 술자리에서도 당신이 나타나면 대화가 뚝 끊깁니다. 당신은 살아남았으나 유령처럼 존재할 뿐입니다.');
        engine.showChoices([
          { label: "▶ 더욱 큰 목소리로 수양의 업적을 찬양한다.", action: () => {
             engine.addClue('lonely_dinner', '고독한 수라상', '부귀영화 속에서도 아무도 함께 식사하지 않는 김질의 쓸쓸한 밥상입니다.');
             next('kimjil_eternal_guilt');
          }}
        ]);
    },
    kimjil_eternal_guilt: () => {
        engine.log('time', '[ 9 챕터 — 늙어버린 배신자 ]');
        engine.log('story', '오랜 시간이 흘렀습니다. 거울 속 당신은 늙고 병들었습니다. 하지만 성삼문은 죽은 그날의 단단한 모습 그대로 당신의 꿈속에 나타나 묻습니다. “김질, 자네는 편안한가?”');
        engine.showChoices([
          { label: "▶ 꿈에서 깨어나 비명을 지르며 괴로워한다.", action: () => {
             engine.addClue('repentance_scroll', '참회의 비망록', '말년에 죄책감을 이기지 못해 홀로 써 내려간 뒤늦은 고백입니다.');
             next('kimjil_ending');
          }}
        ]);
    },
    kimjil_ending: () => {
        engine.log('time', '[ 10 챕터 — 배신자의 부귀영화 ]');
        engine.log('story', '평생을 부귀 속에 살았으나 밤마다 비명을 듣습니다. 명예 없는 생명의 무게가 당신을 짓누릅니다. 당신은 역사의 영원한 낙인을 얻었습니다.');
        engine.log('inner', '“나는 살았다. 하지만 나의 이름 ‘김질’은 이 땅의 역사에서 영원히 죽었구나.”');
        engine.addClue('cursed_name', '지워진 가문 이름', '후손들조차 부끄러워하며 족보에서 지워버린 배신자의 이름입니다.');
        solveCase('danjong_multi', '배신의 평온', ['김질의 밀고', '흔들리는 붓끝', '젖은 옷소매', '밀고의 대가', '배반의 금술잔', '참회의 비망록'], '생존을 선택했으나 명예를 영원히 잃고 괴로운 무병장수를 누렸습니다.');
    },

    // ══════════════════════════════════════════════════════════════
    //  3. 사관: 기록의 딜레마 (10 Chapters)
    // ══════════════════════════════════════════════════════════════
    historian_start: () => {
        engine.log('time', '[ 1 챕터 — 붓은 칼보다 무겁다 ]');
        engine.log('story', '1453년 무렵, 궐내 사관으로서 당신은 모든 것을 지켜보고 있습니다. 세조의 찬탈 과정, 사육신의 처형, 단종의 유배... 당신의 사초에는 조선의 가장 부끄럽고 아픈 상흔들이 실시간으로 기록됩니다.');
        engine.log('inner', '“역사는 구경꾼이 아니라 증인이 필요하다. 내 목이 달아나도 이 붓끝만은 휘어지게 두지 않으리라.”');
        engine.showChoices([
          { label: "▶ 세조와 공신들의 비행을 있는 그대로 사초에 기록한다.", action: () => {
            engine.modifyStat('stress', +20);
            engine.addClue('secret_record', '은밀하게 숨겨둔 사초', '세조의 즉위 과정을 비정하게 기록한 역사적 증거입니다.');
            next('historian_witness_tiger_hunt');
          }},
          { label: "▶ 주변의 눈을 피해 한밤중에 홀로 먹을 간다.", action: () => {
            engine.addClue('midnight_ink', '한밤의 먹물', '아무도 모르게 진실을 기록하기 위해 깊은 밤 홀로 준비한 먹물의 흔적입니다.');
            next('historian_witness_tiger_hunt');
          }}
        ]);
    },
    historian_witness_tiger_hunt: () => {
        engine.log('time', '[ 2 챕터 — 호랑이가 쓰러지던 밤 ]');
        engine.log('story', '김종서가 철퇴에 맞는 광경을 멀리서 지켜보았습니다. 손이 떨려 붓을 쥐기 힘들지만, 당신은 그 소리를 글자로 바꿉니다. “둔탁한 소리와 함께 조선의 기둥이 꺾였다.”');
        engine.showChoices([
          { label: "▶ 소리 죽여 현장의 참혹함을 묘사한다.", action: () => {
            engine.addClue('tiger_blood_note', '피 묻은 사본', '김종서의 죽음을 묘사한 생생한 사초의 일부분입니다.');
            engine.addClue('eye_witness_log', '목격자의 비망록', '역사의 현장을 직접 지켜본 사관의 떨리는 필체가 남은 기록입니다.');
            next('historian_censorship_battle');
          }}
        ]);
    },
    historian_censorship_battle: () => {
        engine.log('time', '[ 3 챕터 — 불타는 서고, 살아남은 기록 ]');
        engine.log('story', '세조가 사초를 가져오라 명합니다. 이것은 전례 없는 일이며, 사관의 독립성에 대한 정면 도전입니다. 서고 밖에는 이글거리는 불꽃과 함께 당신을 압박하는 군사들이 서 있습니다.');
        engine.log('inner', '“사관이 사초를 지키지 못하면 그것은 죽음보다 더한 수치다. 내 몸이 불타도 이 기록은 반드시 후세에 전해져야 한다.”');
        engine.showChoices([
          { label: "▶ 사초를 사수하다 구타당하지만 굴복하지 않는다.", action: () => {
            engine.modifyStat('stamina', -20);
            engine.addClue('burned_brush', '불탄 붓대', '서고에 불이 났을 때 사초를 지키려다 함께 불에 그슬린 붓의 자루입니다.');
            next('historian_secret_washing');
          }},
          { label: "▶ 가짜 사초를 만들어 세조를 기만한다.", action: () => {
            engine.modifyStat('mental', -15);
            next('historian_secret_washing');
          }}
        ]);
    },
    historian_secret_washing: () => {
        engine.log('time', '[ 4 챕터 — 계곡물에서의 세초(洗草) ]');
        engine.log('story', '사초를 씻어 먹을 지우는 의식인 세초가 진행됩니다. 하지만 당신은 지워져야 할 기록 중 가장 치명적인 부분을 몰래 빼돌려 소매 속에 숨깁니다.');
        engine.showChoices([
          { label: "▶ 차가운 물속에 손을 담그고 기회를 엿본다.", action: () => {
            engine.addClue('washed_paper', '잉크 자국이 남은 종이', '완전히 지워지지 않은 진실이 담긴 종이입니다.');
            next('historian_spy_in_library');
          }}
        ]);
    },
    historian_spy_in_library: () => {
        engine.log('time', '[ 5 챕터 — 서고의 밀탐 ]');
        engine.log('story', '밤늦게 사초각에 잠입했습니다. 한명회의 심복들이 수상한 기록을 찾기 위해 서고를 뒤지고 있습니다. 당신은 소리 없는 발걸음으로 어둠 속에 숨죽여 그들을 지켜봅니다.');
        engine.showChoices([
          { label: "▶ 숨을 죽이고 그들을 피해 기록을 챙긴다.", action: () => {
             engine.addClue('stealthy_shoes', '소리 없는 버선', '기밀 유지를 위해 신발도 신지 않고 숨어 다녔던 사관의 흔적입니다.');
             next('historian_colleague_purge');
          }}
        ]);
    },
    historian_colleague_purge: () => {
        engine.log('time', '[ 6 챕터 — 동료의 죽음, 그리고 유언 ]');
        engine.log('story', '진실을 적던 동료 사관이 결국 압송됩니다. 그는 끌려가는 와중에도 당신에게 눈짓을 보냅니다. “남은 기록은 자네 몫일세.”');
        engine.showChoices([
          { label: "▶ 그가 남긴 붓과 마지막 사고(史稿)를 수습한다.", action: () => {
            engine.addClue('last_pen', '부러진 붓', '진실을 쓰다 부러진 사관의 숭고한 도구입니다.');
            next('historian_exile_sketch');
          }}
        ]);
    },
    historian_exile_sketch: () => {
        engine.log('time', '[ 7 챕터 — 영월로 향하는 어린 왕 ]');
        engine.log('story', '단종이 영월로 배를 타고 떠나는 마지막 모습을 그립니다. 당신의 글은 역사라기보다 비가(悲歌)에 가깝습니다. 하지만 사관의 감정도 역사의 일부입니다.');
        engine.showChoices([
          { label: "▶ 왕의 슬픈 눈동자를 문장으로 담아낸다.", action: () => next('historian_hidden_truth') }
        ]);
    },
    historian_hidden_truth: () => {
        engine.log('time', '[ 8 챕터 — 붓끝으로 지킨 조선의 자존심 ]');
        engine.log('story', '당신은 밤잠을 설쳐가며 동료들의 마지막 모습까지 사초에 한 자 한 자 적어 넣습니다. 촛불조차 숨죽인 밤, 당신은 조선의 역사를 홀로 짊어지고 있습니다.');
        engine.showChoices([
          { label: "▶ 완성된 사초를 항아리에 넣어 깊은 산속 바위 틈에 숨긴다.", action: () => {
            engine.addClue('buried_history', '사관의 항아리', '먼 훗날을 위해 깊이 묻어둔 사초 항아리입니다.');
            next('historian_old_age_wait');
          }}
        ]);
    },
    historian_old_age_wait: () => {
        engine.log('time', '[ 9 챕터 — 잊힌 이름, 살아남은 문장 ]');
        engine.log('story', '수십 년이 흘렀습니다. 당신의 이름은 조정에서 잊혔지만, 당신이 숨긴 항아리 속 글자들은 여전히 그날의 피 냄새를 기억하고 있습니다.');
        engine.showChoices([
          { label: "▶ 죽기 전, 자식에게 항아리의 위치를 알린다.", action: () => {
             engine.addClue('truth_seed', '진실의 씨앗', '역사의 진실을 후세에 전하겠다는 사관의 마지막 의지입니다.');
             next('historian_ending');
          }}
        ]);
    },
    historian_ending: () => {
        engine.log('time', '[ 10 챕터 — 영원히 사라지지 않는 진실 ]');
        engine.log('story', '당신은 이름도 없이 사라졌으나 당신의 기록은 살아남아 유네스코 세계기록유산이 되었습니다. 권력자의 칼날은 녹슬어 사라졌으나, 당신의 먹빛은 수백 년이 지나도 선명하게 빛나며 오늘날 우리에게 진실을 말해주고 있습니다. 역사는 결국 당신의 편이었습니다.');
        solveCase('danjong_multi', '붓으로 지켜낸 역사의 자존심', ['사관의 사초', '피 묻은 사본', '사관의 항아리', '한밤의 먹물', '진실의 씨앗'], '사관으로서 당신은 권력의 협박 앞에서도 붓을 꺾지 않았고, 그 결과 조선의 정직한 역사를 후세에 물려주었습니다.');
    },

    // ══════════════════════════════════════════════════════════════
    //  4. 한명회: 권력의 설계자 (11 Chapters)
    // ══════════════════════════════════════════════════════════════
    hanmyunghoe_start: () => {
        engine.log('time', '[ 1 챕터 — 설원 위의 설계자 ]');
        engine.log('story', '1453년 무렵, 당신은 수양대군의 사저 밀실에서 차가운 등잔불 아래 앉아 있습니다. 사람들은 당신을 ‘칠삭둥이’라 비웃었지만, 지금 당신의 붓끝에는 조선의 권력 지도를 뒤집을 명단이 들려 있습니다.');
        engine.log('inner', '“명분은 선비들의 장난감일 뿐이다. 진정한 힘은 칼끝과 그 칼을 휘두를 자의 머릿속에서 나온다. 수양은 가장 잘 드는 칼이고, 나는 그 칼을 쥔 손이다.”');
        engine.showChoices([
          { label: "▶ 김종서와 황보인의 치명적인 약점을 명단 옆에 기입한다.", action: () => {
            engine.addClue('myung_draft', '초기 살생부', '거사 직전 작성된 정적들의 치밀한 명단입니다.');
            next('hanmyunghoe_meeting_the_prince');
          }},
          { label: "▶ 거사의 은밀한 지령을 담은 전서구를 날린다.", action: () => {
            engine.addClue('messenger_bird', '은밀한 전서구', '거사 당일의 암호를 담아 심복들에게 보냈던 비밀 통로입니다.');
            next('hanmyunghoe_meeting_the_prince');
          }}
        ]);
    },
    hanmyunghoe_meeting_the_prince: () => {
        engine.log('time', '[ 2 챕터 — 수양과의 문답 ]');
        engine.log('story', '수양대군이 묻습니다. “공, 이 길이 정녕 사직을 위한 길인가?” 당신은 한 치의 망설임 없이 답합니다. “사직을 위한 길이 아니라, 새로운 세상을 여는 길입니다.”');
        engine.showChoices([
          { label: "▶ 대군을 압박하여 거사 날짜를 확정한다.", action: () => {
             engine.addClue('map_of_purge', '청산(淸算)의 지도', '도성 내 정적들의 집 위치와 잠입 경로가 상세히 기록된 지도입니다.');
             next('hanmyunghoe_shadow_army');
          }}
        ]);
    },
    hanmyunghoe_shadow_army: () => {
        engine.log('time', '[ 3 챕터 — 어둠의 장정들 ]');
        engine.log('story', '당신은 무사가 아닌, 시장통의 힘깨나 쓰는 장정들을 모읍니다. "그들은 기록에 남지 않을 칼날이 될 것입니다." 당신의 치밀함에 수양도 혀를 내두릅니다.');
        engine.showChoices([
          { label: "▶ 장정들에게 무거운 철퇴와 짧은 칼을 지급한다.", action: () => {
             engine.addClue('iron_hammer', '피 묻은 철퇴', '무인이 아닌 장정들이 김종서를 암살하기 위해 사용한 흉기입니다.');
             next('hanmyunghoe_final_list');
          }}
        ]);
    },
    hanmyunghoe_final_list: () => {
        engine.log('time', '[ 4 챕터 — 최종 살생부 작정 ]');
        engine.log('story', '밤새 잠도 자지 않고 조선의 백 명 넘는 관리들의 이름을 적습니다. 생(生)과 사(死). 당신의 붓이 한 번 그어질 때마다 누군가의 가문이 멸문지화를 당합니다.');
        engine.showChoices([
          { label: "▶ 냉혹하게 명단을 완성하고 인장을 찍는다.", action: () => {
            engine.addClue('myung_list', '한명회의 살생부', '새로운 시대를 열기 위해 정적들의 운명을 결정지은 냉혹한 명단입니다.');
            next('hanmyunghoe_blood_banquet');
          }}
        ]);
    },
    hanmyunghoe_blood_banquet: () => {
        engine.log('time', '[ 5 챕터 — 계유정난, 피의 연회 ]');
        engine.log('story', '계유정난의 밤, 당신은 대군의 뒤에 서서 수첩을 엽니다. 이름이 불릴 때마다 대신들은 울부짖으며 사라집니다. 당신은 그 소리를 감미로운 음악처럼 감상합니다.');
        engine.showChoices([
          { label: "▶ 명단에서 지운 사람들의 이름을 확인하며 미소 짓는다.", action: () => {
             engine.addClue('poison_bead', '비수가 담긴 장신구', '연회장에서 정적들을 제거하기 위해 비밀리에 사용된 독 묻은 무기입니다.');
             next('hanmyunghoe_scholar_trap');
          }}
        ]);
    },
    hanmyunghoe_scholar_trap: () => {
        engine.log('time', '[ 6 챕터 — 사육신의 덫 ]');
        engine.log('story', '성삼문 일당의 거동이 수상합니다. 당신은 연회장에 군을 매복시키고 함정을 팝니다. "쥐새끼들이 드디어 구멍 밖으로 나오는군."');
        engine.showChoices([
          { label: "▶ 연회장에 별운검을 들이지 못하게 하여 거사를 원천 봉쇄한다.", action: () => {
             engine.addClue('sword_trap', '어긋난 칼날', '사육신의 거사가 실패하게 만든 결정적인 배치도입니다.');
             next('hanmyunghoe_kingmaker_smile');
          }}
        ]);
    },
    hanmyunghoe_kingmaker_smile: () => {
        engine.log('time', '[ 7 챕터 — 킹메이커의 미소 ]');
        engine.log('story', '세조가 왕위에 오른 날, 당신은 일등공신이 되어 권력의 최정점에 섭니다. 당신의 딸들은 모두 왕비가 되었고, 세상은 당신을 \'압구정\'이라 부릅니다.');
        engine.showChoices([
          { label: "▶ 화려하게 지어진 압구정에서 한강을 내려다본다.", action: () => {
             engine.addClue('silk_scroll', '왕비의 비단 서신', '한명회의 권세가 왕실까지 뻗어 있음을 보여주는 왕비의 비밀 서신입니다.');
             next('hanmyunghoe_hun_gu_power');
          }}
        ]);
    },
    hanmyunghoe_hun_gu_power: () => {
        engine.log('time', '[ 8 챕터 — 훈구 세력의 수장 ]');
        engine.log('story', '훈구파의 우두머리로서 당신은 수많은 땅과 노비를 소유합니다. 하지만 당신을 시기하는 어린 사림들의 목소리가 들려오기 시작합니다.');
        engine.showChoices([
          { label: "▶ 영의정의 권위로 반대파를 압살한다.", action: () => {
             engine.addClue('han_seal', '영의정의 인장', '조선 최고 권력자로서 수없이 많은 명령을 내렸던 도장입니다.');
             next('hanmyunghoe_succession_plan');
          }}
        ]);
    },
    hanmyunghoe_succession_plan: () => {
        engine.log('time', '[ 9 챕터 — 후계를 위한 설계 ]');
        engine.log('story', '세조가 승하한 후에도 당신의 권력은 건재합니다. 예종, 성종까지 당신의 입김이 닿지 않는 곳이 없습니다. 당신은 조선을 당신의 가문으로 만들려 합니다.');
        engine.showChoices([
          { label: "▶ 자신의 권력을 자손들에게 대대로 물려줄 계획을 세운다.", action: () => next('hanmyunghoe_fading_architect') }
        ]);
    },
    hanmyunghoe_fading_architect: () => {
        engine.log('time', '[ 10 챕터 — 저무는 설계자 ]');
        engine.log('story', '나이가 들어 권력을 내려놓을 때가 왔습니다. 화려했던 동료들은 모두 떠났고, 당신만이 홀로 남았습니다. 사람들은 당신의 지혜를 칭송하지만, 뒤에서는 배신자라 수군댑니다.');
        engine.showChoices([
          { label: "▶ 압구정의 정자에서 조용히 죽음을 맞이한다.", action: () => {
             engine.addClue('apgujung_breeze', '압구정의 서늘한 바람', '권력의 허무함을 담은 한명회의 마지막 시구가 적힌 종이입니다.');
             next('hanmyunghoe_ending');
          }}
        ]);
    },
    hanmyunghoe_ending: () => {
        engine.log('time', '[ 11 챕터 — 압구정에 남은 공허 ]');
        engine.log('story', '당신은 죽었으나 당신이 세운 ‘압구정’이라는 이름은 현대에도 여전히 부의 상징으로 남아 있습니다. 하지만 정작 그곳에 당신의 진정한 충신은 없었습니다. 당신은 역사를 설계했으나, 정작 마음을 얻는 법은 설계하지 못했습니다.');
        solveCase('danjong_multi', '설계자의 허망한 승리', ['한명회의 살생부', '피 묻은 철퇴', '영의정의 인장', '청산(淸算)의 지도', '압구정의 서늘한 바람'], '조선 최고의 책사로서 승리를 얻었으나, 역사로부터 비정한 모략가라는 영원한 꼬리표를 얻었습니다.');
    },

    // ══════════════════════════════════════════════════════════════
    //  5. 엄흥도: 마지막 충성 (12 Chapters)
    // ══════════════════════════════════════════════════════════════
    eomheungdo_start: () => {
        engine.log('time', '[ 1 챕터 — 안개 낀 영월의 아침 ]');
        engine.log('story', '영월의 강물 위로 짙은 물안개가 수의처럼 내려앉은 아침입니다. 당신은 호장으로서 관아로 향하다 말고 잠시 멈춥니다. 저 멀리 청령포 쪽에서 들려오는 소리는 이름 모를 산새의 울음인가, 아니면 어린 임금의 흐느낌인가.');
        engine.log('inner', '“세상은 조카를 버린 숙부의 칼날 아래 숨죽이고 있으나, 저 강물만은 변함없이 흐르는구나. 전하, 소신은 오늘따라 가슴이 시려 차마 눈을 뜰 수 없나이다.”');
        engine.showChoices([
          { label: "▶ 강가에 서서 멀리 청령포 쪽을 묵묵히 바라본다.", action: () => {
             engine.addClue('yeoungwol_fog', '차가운 물안개', '영월의 슬픈 분위기를 자아내는 짙은 안개 속에 감춰진 진실의 흔적입니다.');
             next('eomheungdo_forbidden_news');
          }}
        ]);
    },
    eomheungdo_forbidden_news: () => {
        engine.log('time', '[ 2 챕터 — 금지된 비보 ]');
        engine.log('story', '관아 마당에 들어서자마자 싸늘한 공기가 당신을 덮칩니다. 포졸들이 등을 돌린 채 수군거립니다. “들었는가? 청령포의 주인이 어젯밤 숨을 거두셨다네. 시신은 거두는 자가 없어 강물에 던져졌다더군.” 심장이 얼어붙는 것 같습니다.');
        engine.showChoices([
          { label: "▶ 표정을 숨기고 포졸들의 대화를 엿듣는다.", action: () => {
             engine.addClue('river_shadow', '서강의 그림자', '강가에서 누군가 은밀하게 움직였다는 포졸들의 수상한 증언입니다.');
             next('eomheungdo_riverside_despair');
          }}
        ]);
    },
    eomheungdo_riverside_despair: () => {
        engine.log('time', '[ 3 챕터 — 얼어붙은 강가의 공포 ]');
        engine.log('story', '강가에는 대군의 무시무시한 방이 붙어 있습니다. "시신을 거두는 자는 삼족을 멸하리라." 마을 사람들은 눈길조차 주지 않고 서둘러 지나갑니다. 저 멀리 강물 위로 붉은 옷자락 같은 것이 일렁이는 것이 보입니다.');
        engine.log('inner', '“사람들이 고개를 돌리는구나. 충(忠)이란 것이 이토록 무거운 죄란 말인가. 내 자식들의 목숨과 바꿀 가치가 있는 일인가... 아니, 왕의 시신을 짐승의 먹이로 둘 순 없다.”');
        engine.showChoices([
          { label: "▶ 떨리는 손을 꽉 쥐고 집으로 돌아온다.", action: () => {
            engine.addClue('edict_copy', '금지의 방', '단종의 시신을 수습하는 자를 처벌하겠다는 세조의 엄명입니다.');
            next('eomheungdo_home_deliberation');
          }}
        ]);
    },
    eomheungdo_home_deliberation: () => {
        engine.log('time', '[ 4 챕터 — 가족과의 은밀한 대화 ]');
        engine.log('story', '아들들을 불러 모았습니다. 집안의 공기는 밖보다 더 차갑습니다. “너희들은 보았느냐? 우리 임금께서 차가운 물속에 버려지신 것을. 아비는 오늘 죽을 자리를 찾으려 한다.” 아들들의 눈에 공포와 결의가 동시에 스칩니다.');
        engine.showChoices([
          { label: "▶ “부디 아비를 원망 말거라”라며 동의를 구한다.", action: () => {
             engine.addClue('final_whisper', '마지막 소문', '가족들 사이에서 오가는, 거사를 결심하게 만든 비장한 대화의 파편입니다.');
             next('eomheungdo_preparing_coffin');
          }}
        ]);
    },
    eomheungdo_preparing_coffin: () => {
        engine.log('time', '[ 5 챕터 — 밤새 짠 초라한 관 ]');
        engine.log('story', '창고의 낡은 판자들을 꺼냅니다. 망치 소리가 밖으로 새 나갈까 봐 천으로 감싸고 조심스레 못을 박습니다. 재목이 모자라 당신의 책상까지 뜯어내 관을 만듭니다. 손톱 밑이 피로 물드나 고통조차 느껴지지 않습니다.');
        engine.showChoices([
          { label: "▶ 밤을 새워 관을 완성한다.", action: () => {
            engine.addClue('eom_hammer', '피 묻은 망치', '한밤중 몰래 관을 짤 때 사용했던, 충심의 무게가 실린 도구입니다.');
            engine.addClue('hidden_box', '빈 함', '관을 짜고 남은 목재로 만든, 알 수 없는 용도의 작은 상자입니다.');
            next('eomheungdo_cold_river_search');
          }}
        ]);
    },
    eomheungdo_cold_river_search: () => {
        engine.log('time', '[ 6 챕터 — 서강의 차가운 물속으로 ]');
        engine.log('story', '깊은 밤, 아들들과 함께 작은 나룻배를 탑니다. 횃불도 켜지 못한 채 손으로 차가운 강물을 더듬습니다. 물 밑의 돌이 아니라 부드러운 옷자락을 찾을 때마다 심장이 요동칩니다.');
        engine.showChoices([
          { label: "▶ 깊은 물속으로 직접 몸을 던져 시신을 찾는다.", action: () => {
             engine.addClue('forbidden_boat', '비밀스러운 나룻배', '시신을 수습하기 위해 띄웠던, 역사의 물줄기를 바꾼 작은 배입니다.');
             next('eomheungdo_finding_the_sun');
          }}
        ]);
    },
    eomheungdo_finding_the_sun: () => {
        engine.log('time', '[ 7 챕터 — 마주한 어린 왕의 얼굴 ]');
        engine.log('story', '드디어 찾았습니다. 물속에 잠긴 단종의 시신은 마치 잠든 아이처럼 평온합니다. 당신은 전하의 차가운 시신을 가슴에 꼭 안고 울음을 삼킵니다. 그런데 이상합니다. 전하의 옷 한복판이 무언가에 의해 잘려나간 듯합니다.');
        engine.log('inner', '“전하, 전하... 어찌 이리 차가우십니까. 누가 전하의 마지막 길에서 이 조각을 가져갔단 말입니까.”');
        engine.showChoices([
          { label: "▶ 젖은 관복을 자신의 겉옷으로 감싸 안는다.", action: () => {
            engine.addClue('last_robe', '젖은 곤룡포 조각', '차가운 강물 속에서 건져낸 단종의 마지막 수의입니다.');
            next('eomheungdo_climbing_mountain');
          }}
        ]);
    },
    eomheungdo_climbing_mountain: () => {
        engine.log('time', '[ 8 챕터 — 동을산의 험난한 고개 ]');
        engine.log('story', '시신을 담은 관을 등에 지고 가파른 산길을 오릅니다. 갑자기 쏟아지기 시작한 눈이 앞을 가립니다. 발을 헛디딜 때마다 "멈춰라, 반역자야!"라는 환청이 들려오고, 관님의 무게는 점점 천근만근이 됩니다.');
        engine.showChoices([
          { label: "▶ 이를 악물고 정상을 향해 한 걸음씩 내딛는다.", action: () => next('eomheungdo_noru_miracle') }
        ]);
    },
    eomheungdo_noru_miracle: () => {
        engine.log('time', '[ 9 챕터 — 노루가 비켜준 하늘의 자리 ]');
        engine.log('story', '눈보라 속에서 기운이 다해 쓰러지려 할 때, 기이한 광경을 봅니다. 노루 한 마리가 눈밭에 누워 있다가 당신을 보고 조용히 자리를 비켜줍니다. 그 자리에만 기적처럼 눈이 쌓이지 않았고, 땅은 어머니의 품처럼 보드랍습니다.');
        engine.showChoices([
          { label: "▶ 그 따뜻한 자리를 전하의 묘자리로 정한다.", action: () => {
            engine.addClue('noru_hair', '노루털 한 움큼', '기적 같은 현장에 남겨진 하얀 털입니다. 누군가 미리 다녀간 듯한 흔적도 보입니다.');
            next('eomheungdo_snow_burial');
          }}
        ]);
    },
    eomheungdo_snow_burial: () => {
        engine.log('time', '[ 10 챕터 — 봉분 없는 무덤, 그리고 복선 ]');
        engine.log('story', '관군에게 들키지 않으려면 무덤인 것을 몰라야 합니다. 평평하게 땅을 다지고 낙엽을 덮습니다. 그런데 땅을 파던 중, 아들이 무언가를 발견합니다. "아버지, 여기... 전하의 가락지가 왜 여기 묻혀 있습니까?" 당신은 소름이 돋습니다.');
        engine.log('inner', '“죽었다던 임금의 가락지가 왜 땅속에... 마치 누군가 전하를 구출하려다 흘린 흔적 같지 않은가.”');
        engine.showChoices([
          { label: "▶ 발견한 가락지를 품속 깊이 숨긴다.", action: () => {
             engine.addClue('seed_of_hope', '희망의 씨앗', '죽음을 위장하여 임금을 탈출시키려 했던 누군가의 은밀한 계획을 암시하는 복선입니다.');
             next('eomheungdo_nameless_life');
          }}
        ]);
    },
    eomheungdo_nameless_life: () => {
        engine.log('time', '[ 11 챕터 — 도망자의 세월, 마지막 전언 ]');
        engine.log('story', '당신은 가솔을 이끌고 깊은 산속으로 숨어듭니다. 호장이라는 이름도 버리고 평생을 숨어 삽니다. 하지만 죽기 직전, 당신은 아들들에게 믿기 힘든 말을 남깁니다. "그날 우리가 묻은 것은 정녕 전하의 육신이었을까, 아니면 조선의 슬픔이었을까..."');
        engine.showChoices([
          { label: "▶ 의미심장한 미소를 지으며 눈을 감는다.", action: () => next('eomheungdo_ending') }
        ]);
    },
    eomheungdo_ending: () => {
        engine.log('time', '[ 12 챕터 — 역사가 씻어준 억울함: 장릉의 전설 ]');
        engine.log('story', '수백 년 뒤, 당신이 만든 그 초라한 무덤은 조선 왕조의 정식 왕릉인 ‘장릉’이 되었습니다. 하지만 영월의 백성들 사이에는 여전히 전설이 전해져 내려옵니다. 새벽 안개 속에 작은 배를 타고 바다로 떠난 어린 임금을 보았노라고.');
        engine.log('inner', '“진실은 때로 무덤 아래 잠들고, 때로 안개 너머로 사라진다. 나는 전하의 마지막 예우를 다했을 뿐이나, 남겨진 희망은 후세의 몫이다.”');
        solveCase('danjong_multi', '목숨과 바꾼 마지막 예우', ['장릉의 수호', '젖은 곤룡포 조각', '노루털 한 움큼', '비밀스러운 나룻배', '희망의 씨앗'], '가장 낮은 자리에서 가장 높은 충절을 보여주었습니다. 당신의 용기는 비극 속에 한 줄기 희망의 불씨를 남겼습니다.');
    },

    // ══════════════════════════════════════════════════════════════
    //  7. 히든 가상 시나리오: 단종의 탈출 (Virtual)
    // ══════════════════════════════════════════════════════════════
    virtual_start: () => {
        engine.log('time', '[ 1 챕터 — 기나긴 꿈의 끝 ]');
        engine.log('story', '1457년 가을, 사약이 내려오기 직전. 영월 청령포의 밤은 칠흑같이 어둡습니다. 죽음이 문턱에 다가왔지만, 그동안 당신을 지키다 스러져간 이들의 희생이 당신의 마음속에 불꽃을 피웁니다.');
        engine.log('inner', '“나를 지키고자 한 충신들의 목숨을 헛되게 할 수는 없다. 역사의 공식적인 기록에서는 죽은 자가 되겠으나, 살아남아 그들의 한을 증명하리라.”');
        engine.showChoices([
          { label: "▶ 조심스럽게 문을 열고 어둠 속으로 발을 내디딘다.", action: () => {
            engine.modifyStat('생명력', +10);
            next('virtual_the_boat');
          }},
          { label: "▶ 은장도를 품에 숨긴 채 혹시 모를 관군에 대비하며 나선다.", action: () => {
            engine.modifyStat('생명력', +5);
            engine.modifyStat('행복도', -5);
            next('virtual_the_boat');
          }}
        ]);
    },
    virtual_the_boat: () => {
        engine.log('time', '[ 2 챕터 — 안개 속의 나룻배 ]');
        engine.log('story', '안개로 뒤덮인 서강 변에 이르자, 엄홍도가 남몰래 띄워둔 비밀스러운 나룻배가 당신을 기다리고 있습니다. 멀리서 금부도사 일행이 사약을 가져오는 횃불 불빛이 일렁입니다.');
        engine.showChoices([
          { label: "▶ 군관들의 추격을 피하기 위해 가짜 유서와 용포 조각을 강물에 흘려보낸다.", action: () => {
             engine.addClue('discarded_robe', '버려진 곤룡포 조각', '자살로 위장하기 위해 치밀하게 버려둔 왕의 흔적입니다.');
             engine.modifyStat('기나긴 꿈', +10);
             next('virtual_river_escape');
          }},
          { label: "▶ 뒤돌아볼 새도 없이 나룻배에 몸을 싣고 서둘러 노를 젓는다.", action: () => {
             engine.addClue('secret_boat_escape', '구원의 나룻배', '모든 것을 버리고 생명을 선택한 은밀한 도피의 수단입니다.');
             next('virtual_river_escape');
          }}
        ]);
    },
    virtual_river_escape: () => {
        engine.log('time', '[ 3 챕터 — 새벽의 검문 ]');
        engine.log('story', '배가 물살을 타고 하류로 내려가던 중, 산자락을 지키던 수문장의 초소 불빛과 마주칩니다. 달빛마저 구름에 가려 앞이 잘 보이지 않습니다.');
        engine.showChoices([
          { label: "▶ 배 밑바닥에 납작 엎드려 숨을 멈추고 떠내려간다.", action: () => {
             engine.modifyStat('생명력', -10);
             engine.modifyStat('기나긴 꿈', +5);
             next('virtual_new_life');
          }},
          { label: "▶ 품에 있던 귀한 옥패를 바쳐 수문장을 조용히 매수한다.", action: () => {
             engine.addClue('bribe_jade', '버려진 옥패', '임금의 신분을 증명하던 물건마저 생존을 위해 기꺼이 포기했습니다.');
             engine.modifyStat('행복도', +5);
             next('virtual_new_life');
          }}
        ]);
    },
    virtual_new_life: () => {
        engine.log('time', '[ 4 챕터 — 도망자의 아침 ]');
        engine.log('story', '며칠 밤낮을 산길로 걸어, 마침내 관군의 손길이 닿지 않는 강원도 깊은 산골짜기 촌락에 당도합니다. 사람들은 당신이 누군지 모릅니다.');
        engine.showChoices([
          { label: "▶ 왕의 옷차림을 모두 태워버리고 낡은 평복으로 갈아입는다.", action: () => {
             engine.addClue('dirty_clothes', '낡은 평복', '권력의 무게를 완전히 벗어던진 촌부로서의 새 출발입니다.');
             engine.modifyStat('기나긴 꿈', +15);
             next('virtual_sejo_nightmare');
          }},
          { label: "▶ 벙어리 행세를 하며 마을 사람들 틈에 묵묵히 섞여든다.", action: () => {
             engine.modifyStat('행복도', -10);
             next('virtual_sejo_nightmare');
          }}
        ]);
    },
    virtual_sejo_nightmare: () => {
        engine.log('time', '[ 5 챕터 — 버려둔 한양, 치유의 시간 ]');
        engine.log('story', '밤마다 과거의 악몽에 시달립니다. 피를 흘리며 죽어간 사육신, 당신을 협박하던 숙부 수양대군의 차가운 눈빛. 그 환영들이 당신의 목을 조릅니다.');
        engine.showChoices([
          { label: "▶ 밤하늘의 쏟아질 듯한 별을 보며 복수심을 내려놓기로 결심한다.", action: () => {
             engine.modifyStat('행복도', +20);
             engine.modifyStat('기나긴 꿈', +10);
             next('virtual_new_family');
          }},
          { label: "▶ 아픈 기억을 안고 무작정 장작을 패며 육체를 단련한다.", action: () => {
             engine.modifyStat('생명력', +15);
             next('virtual_new_family');
          }}
        ]);
    },
    virtual_new_family: () => {
        engine.log('time', '[ 6 챕터 — 흙 묻은 두 손, 새로운 인연 ]');
        engine.log('story', '계절이 여러 번 바뀌고 당신의 손엔 굳은살이 박혔습니다. 마을에서 아리랑을 부르며 밭을 매던 평범한 여인과 눈이 마주칩니다. 그녀는 당신의 차가운 두 손을 따뜻하게 잡아줍니다.');
        engine.showChoices([
          { label: "▶ 과거의 왕비 정순왕후를 마음에 묻고 그녀와 가약을 맺는다.", action: () => {
             engine.addClue('village_wedding', '소박한 혼례복', '비운의 왕이 아닌 한 남자로서 평범한 사랑을 시작했음을 알립니다.');
             engine.modifyStat('행복도', +30);
             next('virtual_sejo_death');
          }},
          { label: "▶ 끝내 전처의 슬픈 눈동자를 잊지 못하고 홀로 살아가기를 택한다.", action: () => {
             engine.modifyStat('행복도', -10);
             engine.modifyStat('기나긴 꿈', +20);
             next('virtual_sejo_death');
          }}
        ]);
    },
    virtual_sejo_death: () => {
        engine.log('time', '[ 7 챕터 — 수양버들은 시들고 ]');
        engine.log('story', '시간이 흐르고 흘러 당신이 청년에서 장년이 되었을 무렵, 상단 육의전 장사치들로부터 소문이 들려옵니다. "들었소? 세조 대왕께서 끔찍한 피부병으로 고생하시다 승하하셨다네."');
        engine.showChoices([
          { label: "▶ 허탈한 웃음을 지으며 허공을 향해 가벼운 술동이를 기울인다.", action: () => {
             engine.modifyStat('기나긴 꿈', +20);
             next('virtual_twilight_years');
          }},
          { label: "▶ 분노도 슬픔도 없이, 쥐고 있던 호미로 하던 밭매기를 멈추지 않는다.", action: () => {
             engine.modifyStat('행복도', +15);
             next('virtual_twilight_years');
          }}
        ]);
    },
    virtual_twilight_years: () => {
        engine.log('time', '[ 8 챕터 — 전설이 된 과거 ]');
        engine.log('story', '역사에선 세조 사후에도 여러 번 사화가 일고 피바람이 불었으나, 이 깊은 산골짜기에는 평화만이 가득합니다. 한때 조선의 가장 높은 자리에서 가장 큰 고통을 겪었던 당신은 이제 백발의 촌장이 되었습니다.');
        engine.showChoices([
          { label: "▶ 마을의 아이들을 무릎에 앉히고 호랑이보다 무서웠던 슬픈 임금님 이야기를 들려준다.", action: () => {
             engine.addClue('legendary_story', '전설이 된 옛이야기', '단종 자신의 비극적 과거를 마침내 남의 이야기처럼 웃으며 풀게 된 치유의 증거입니다.');
             next('virtual_ending');
          }}
        ]);
    },
    virtual_ending: () => {
        engine.log('time', '[ 최종장 — 인간 노산군의 60년 ]');
        engine.log('story', '당신은 60여 년이라는 긴 세월을 살아냈습니다. 권좌를 훔치고 피를 묻힌 수양 일가는 병과 저주에 시달리며 단명했지만, 당신은 맑은 공기와 이웃들의 온기 속에서 가장 온전하게 수명을 누리고 평온하게 눈을 감습니다.');
        engine.log('inner', '“허망한 권력은 안개처럼 스러졌으나, 나의 이 소박한 삶은 잔잔한 강물처럼 내내 흐르고 깊었구나.”');
        solveCase('danjong_multi', '진정한 승리자의 60년 평온', ['구원의 나룻배', '낡은 평복', '소박한 혼례복', '전설이 된 옛이야기'], '역사에 기록된 무력한 패자가 아니라, 권력이라는 굴레를 끊어내고 한 인간으로서 마땅히 누려야 할 온전한 수명과 행복을 쟁취한 진정한 승리자의 삶입니다.');
    }
  };

  const startNode = `${pov}_start`;
  
  if (engine.state.currentScene && nodes[engine.state.currentScene]) {
    // ──────── 수사 재개 시 ────────
    // 기존 로그(DOM)를 비우고 현재 챕터만 다시 출력하여 중복 방지
    const logEl = document.getElementById('game-log');
    if (logEl) logEl.innerHTML = '';
    
    engine.clearQueue();
    engine.log('system', '⏳ 파편화된 기억 속에서 현재 챕터를 재구성합니다...');
    engine.logD();
    
    nodes[engine.state.currentScene]();
  } else {
    // ──────── 새 수사 시작 ────────
    engine.state.currentScene = startNode;
    if (nodes[startNode]) {
      nodes[startNode]();
    } else {
      console.error(`Invalid POV for danjongStory: ${pov}`);
    }
  }
};

export { danjongStory };
