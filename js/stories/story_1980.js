// ══════════════════════════════
//  js/stories/story_1980.js
//  1980 광주 민주화운동 — 고도화된 버전
// ══════════════════════════════

export function story1980(engine, solveCase) {
  const e = engine;

  function start() {
    e.registerScene('start', start);
    e.setEraBadge('1980.05.18');
    e.setLocation('📍 광주 — 금남로 외곽');

    e.log('time', '[ 1980년 5월 18일 일요일 새벽 04:30 ]');
    e.log('story', '번쩍 하는 섬광과 함께 발전기가 돌아가는 듯한 낮은 진동음이 잦아든다.');
    e.log('story', '코를 찌르는 매캐한 최루탄 냄새와 눅눅한 새벽 안개가 시야를 가린다.');
    e.log('story', '여긴... 1980년의 광주다.');
    e.log('system', '멀리서 규칙적인 군화 소리와 차가운 금속음이 들려온다.');
    e.log('story', '길가 담벼락에 한 청년이 다급히 붓글씨를 휘갈기고 도망친다.');
    e.log('mystery', '"우리가 보고 있는 것을 신문은 죽어도 싣지 않는다. 진실은 거리의 피로 쓰여지고 있다."');
    e.logD();
    e.showChoices([
      { label: '▶ 금남로 중심가로 향한다',                    action: street },
      { label: '▶ 담벼락의 글씨를 자세히 살핀다', isClue: true, action: wall },
      { label: '▶ 어두운 골목 안으로 몸을 숨긴다',            action: alley },
    ]);
  }

  function street() {
    e.registerScene('street', street);
    e.setLocation('📍 광주 — 금남로 대로');
    e.log('story', '금남로 대로변엔 이른 새벽임에도 긴장한 시민들이 속속 모여들고 있다.');
    e.log('story', '전남대 학생들이 교문 앞에서 공수부대와 대치 중이라는 뜬소문이 공포처럼 번진다.');
    e.log('story', '갑자기 거대한 군용 트럭 수십 대가 굉음을 내며 시야에 들어온다.');
    e.log('bad', '트럭에서 내린 군인들의 눈빛엔 살기가 가득하다. 그들은 대화 대신 진압봉을 움켜쥐었다.');
    e.log('npc', '옆의 시민(중년 여성): "세상에... 학생들을 저렇게 무자비하게... 이게 무슨 난리래..."');
    const found = e.addClue('c_army_arrival', '군부대 전개', '이것은 단순한 치안 유지가 아닌, 점령군과 같은 대규모 무력 전개였다.', 'street');
    if (found) e.log('clue', '🔑 단서 발견 — 계엄군의 시내 진입');
    e.logD();
    e.showChoices([
      { label: '▶ 더 가까이 다가가 기록한다', isClue: true, action: closer },
      { label: '▶ 시민에게 다가가 정보를 묻는다',           action: citizen },
      { label: '▶ 골목으로 피신한다',                      action: alley },
    ]);
  }

  function wall() {
    e.registerScene('wall', wall);
    e.log('story', '담벼락엔 전단지 대신 직접 쓴 벽보가 붙어 있다.');
    e.log('mystery', '"전남도청 앞에 시민들이 모이고 있다. 군인들이 총구에 대검을 꽂았다."');
    e.log('story', '벽보 구석엔 피 묻은 손가락 지문과 함께 짧은 유언 같은 메모가 있다.');
    e.log('mystery', '"누군가는 남아서 기록해야 한다. 이 연기를 뚫고 진실을 밖으로 보낼 자 누구인가."');
    const found = e.addClue('c_wall', '시민의 벽보', '신문이 침묵할 때, 시민들은 담벼락을 신문삼아 진실을 전하고 있었다.', 'wall');
    if (found) e.log('clue', '🔑 단서 발견 — 담벼락에 남겨진 시민의 외침');
    e.logD();
    e.showChoices([
      { label: '▶ 전남도청 앞으로 이동한다', action: chunnam },
      { label: '▶ 금남로 대로로 나간다',      action: street },
    ]);
  }

  function alley() {
    e.registerScene('alley', alley);
    e.setLocation('📍 광주 — 좁은 골목길');
    e.log('story', '좁고 어두운 골목. 부서진 장독대와 흩어진 신발들이 긴박했던 순간을 말해준다.');
    e.log('story', '낡은 대문 뒤에서 한 남자가 다급히 손짓한다.');
    e.log('npc', '"이쪽입니다! 어서요! 군인들이 집집마다 수색하고 있어요!"');
    e.log('story', '남자는 땀에 젖은 채 카메라 바디를 품에 안고 있다.');
    e.log('npc', '"저는 서울에서 내려온 기자입니다. 취재는커녕 필름을 뺏기지 않는 게 고작이에요."');
    e.log('npc', '"저들이 금남로에서 하는 짓... 이건 사람이 할 짓이 아닙니다. 제발 기록해주십시오."');
    e.logD();
    e.showChoices([
      { label: '▶ 기자에게 구체적인 상황을 묻는다', isClue: true, action: journalist },
      { label: '▶ 전남도청으로 향한다',                      action: chunnam },
    ]);
  }

  function closer() {
    e.registerScene('closer', closer);
    e.setLocation('📍 광주 — 금남로 현장');
    e.log('story', '비명과 호령이 뒤섞인 현장 한가운데로 들어갔다.');
    e.log('story', '군인들이 무차별적으로 몽둥이를 휘두른다. 쓰러진 이의 옷가지가 길바닥에 뒹군다.');
    e.log('bad', '공수부대의 군홧발 소리가 땅을 울린다. 그들은 자비가 없다.');
    e.log('inner', '\'신문 보도와는 정반대다. 이건 폭동 진압이 아니라 일방적인 학살이다.\'');
    const found = e.addClue('c_suppress', '진압의 실체', '계엄군은 무고한 시민들을 향해 전쟁과 같은 폭력을 행사하고 있었다.', 'closer');
    if (found) e.log('clue', '🔑 단서 발견 — 무자비한 진압의 현장');
    e.logD();
    e.showChoices([
      { label: '▶ 골목으로 피신한다',         action: alley },
      { label: '▶ 전남도청 앞으로 간다',    action: chunnam },
    ]);
  }

  function citizen() {
    e.registerScene('citizen', citizen);
    e.log('story', '시민이 공포에 질려 내 손을 움켜쥔다.');
    e.log('npc', '"보셨지요? 저들이 내 아들을 끌고 갔어요. 아무 짓도 안 했는데!"');
    e.log('npc', '"어젯밤부터 전화도 끊기고 고속도로도 막혔답니다. 우린 갇혔어요!"');
    e.log('npc', '"서울 사람들은 우리가 다 빨갱이인 줄 안다면서요? 억울해서 어째..."');
    const found = e.addClue('c_isolated', '고립된 광주', '외부로 향하는 모든 통신과 교통이 계엄군에 의해 완벽히 차단되었다.', 'citizen');
    if (found) e.log('clue', '🔑 단서 발견 — 고립된 도시의 절규');
    e.logD();
    e.showChoices([
      { label: '▶ 전남도청 앞으로 간다', action: chunnam },
      { label: '▶ 골목으로 몸을 피한다', action: alley },
    ]);
  }

  function journalist() {
    e.registerScene('journalist', journalist);
    e.log('npc', '"오늘 새벽, 도청 뒤에서 군인들이 시신을 가마니에 싸서 옮기는 걸 봤습니다."');
    e.log('npc', '"그들은 이미 실탄을 지급받았어요. 곧 총성이 울릴 겁니다."');
    e.log('bad', '"이 필름... 제 목숨보다 소중합니다. 이걸 전남도청 안의 외신 기자에게 전달해주십시오."');
    e.log('story', '기자가 외투 안감에서 숨겨진 필름 통을 꺼내 내민다.');
    const found = e.addClue('c_film', '기자의 필름', '사망자 발생과 실탄 지급 사실이 담긴 결정적 증거 필름.', 'journalist');
    if (found) e.log('clue', '🔑 핵심 단서 발견 — 감춰진 필름');
    e.logD();
    e.showChoices([
      { label: '▶ 필름을 받아 품에 넣는다', isKey: true, action: chunnam },
      { label: '▶ 거절하고 전남도청으로 간다',           action: chunnam },
    ]);
  }

  function chunnam() {
    e.registerScene('chunnam', chunnam);
    e.setLocation('📍 광주 — 전남도청 앞 광장');
    e.log('time', '[ 1980년 5월 18일 오전 10:15 ]');
    e.log('story', '전남도청 앞 비둘기 분수대 주위로 수천 명의 시민이 운집해 있다.');
    e.log('story', '군인들은 도청 입구에서 대열을 유지하며 시민들을 응시하고 있다. 폭풍 전야의 정적.');
    e.log('story', '한 청년이 확성기를 들고 분수대 위에서 사자후를 토한다.');
    e.log('npc', '"광주 시민 여러분! 오늘 우리는 살기 위해 싸워야 합니다! 진실을 외쳐야 합니다!"');
    e.log('story', '거대한 함성이 하늘을 찌른다. 그때, 검은 코트를 입은 한 남자가 내게 다가온다.');
    e.logD();
    e.showChoices([
      { label: '▶ 남자의 정체를 확인한다', action: mysteryMan },
    ]);
  }

  function mysteryMan() {
    e.registerScene('mysteryMan', mysteryMan);
    e.log('story', '그는 계엄사 휘장이 찍힌 신분증을 살짝 보여주고는 두꺼운 봉투를 내민다.');
    e.log('npc', '"양심의 가책을 느낀 병사들이 보낸 기록입니다."');
    e.log('npc', '"작전명 \'화려한 휴가\'. 처음부터 무력 제압을 기획한 작전 지시서입니다."');
    e.log('npc', '"신문에는 \'불순분자의 폭동\'으로 실릴 예정이지만, 이 안엔 진실이 담겨 있습니다."');
    e.log('story', '남자는 혼란스러운 군중 속으로 녹아들며 사라졌다.');
    const found = e.addClue('c_doc', '계엄사 작전 지침', '사망자가 발생해도 좋다는 식의 잔인한 무력 진압 명령이 기재된 문건.', 'mysteryMan');
    if (found) e.log('clue', '🔑 최후의 핵심 단서 — 작전 지시서');
    e.log('mystery', '담벼락의 글귀부터 기자의 필름, 그리고 이 작전서까지... 진실이 완성되었다.');
    e.log('good', '이제 기록을 소장하고 시간의 도서관으로 돌아갈 수 있다.');
    e.logD();
    e.showChoices([
      { label: '▶ 진실의 증거들을 챙겨 기록한다', isKey: true, action: finish },
    ]);
  }

  function finish() {
    e.log('story', '광주의 공기가 거대한 빛의 소용돌이로 변한다.');
    e.log('mystery', '오늘 이곳에서 흘린 피는 헛되지 않을 것이다. 기록이 남았으므로.');
    e.log('story', '신문 아카이브가 당신의 몸을 감싼다.');
    e.logD();
    e.showChoices([{
      label: '▶ 신문을 소중히 품고 귀환한다',
      action: () => solveCase(
        'choi1980',
        '1980년 5월 18일, 광주의 핏빛 진실',
        ['군부대 전개', '시민의 벽보', '진압의 실체', '고립된 광주', '기자의 필름', '계엄사 작전 지침'],
        '1980년 5월 18일.\n광주는 고립된 섬이었고 언론은 권력의 개가 되었다.\n하지만 담벼락에 쓴 벽보와 기자의 필름,\n그리고 용기 있는 자들의 증언이\n사라질 뻔한 진실을 역사의 수면 위로 올렸습니다.\n\n당신은 비극의 현장에서 불멸의 기록을 구출했습니다.',
      ),
    }]);
  }

  start();
}
