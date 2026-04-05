// ══════════════════════════════
//  js/stories/story_imf1997.js
//  IMF 1997 국가 부도의 날 — 고도화된 버전
// ══════════════════════════════

export function storyIMF1997(engine, solveCase) {
  const e = engine;

  function start() {
    e.registerScene('start', start);
    e.setEraBadge('1997.11.21');
    e.setLocation('📍 서울 — 여의도 증권가');

    e.log('time', '[ 1997년 11월 21일 금요일 오전 09:30 ]');
    e.log('story', '번쩍 하는 섬광과 함께 쌀쌀한 초겨울 공기가 온몸을 감싼다.');
    e.log('story', '낯선 빌딩 숲, 회색빛 정장이 가득한 여의도다. 그런데 분위기가 이상하다.');
    e.log('system', '빌딩 전광판엔 붉은색 하락 화살표가 가득하고, 사람들은 넋이 나간 듯 허공을 본다.');
    e.log('story', '발 앞엔 누군가 짓밟은 신문 한 장이 굴러다닌다.');
    e.log('news', '「정부, IMF 구제금융 공식 신청... "외환보유고 바닥"」');
    e.log('mystery', '신문 가장자리에 붉은 잉크로 휘갈겨진 메모: "누군가는 72시간 전부터 이 재앙을 축제로 즐겼다."');
    e.logD();
    e.showChoices([
      { label: '▶ 주변 증권가 골목을 살펴본다',          action: street },
      { label: '▶ 신문의 세부 수치를 자세히 읽는다', isClue: true, action: newspaper },
      { label: '▶ 넋이 나간 듯한 행인에게 말을 건다',    action: stranger },
    ]);
  }

  function street() {
    e.registerScene('street', street);
    e.setLocation('📍 서울 — 여의도 금융로');
    e.log('story', '화려한 빌딩 숲 사이로 장례식장 같은 침묵이 흐른다.');
    e.log('story', '은행 앞엔 새벽부터 예금을 찾으려는 사람들이 긴 줄을 서 있다.');
    e.log('npc', '앞에 서 있는 주부: "애들 학원비도 못 내게 생겼어요. 나라가 진짜 망하는 건가요?"');
    e.log('story', '반면, 검은색 고급 승용차 수십 대가 지하 주차장에서 서둘러 빠져나간다.');
    e.log('inner', '\'모두가 절망할 때, 누군가는 다급히 자리를 뜨고 있다. 저 차들의 방향은 어디인가?\'');
    const found = e.addClue('c_chaos', '금융 공황의 시작', '국민은 절망에 빠졌으나, 상류층은 이미 대피 준비를 마친 듯했다.', 'street');
    if (found) e.log('clue', '🔑 단서 발견 — 여의도의 금융 패닉');
    e.logD();
    e.showChoices([
      { label: '▶ 은행 내부의 동태를 살핀다',           action: bank },
      { label: '▶ 라디오 가게에서 들리는 소리에 집중한다', isClue: true, action: radio },
      { label: '▶ 고급 승용차의 뒤를 조심스럽게 쫓는다',   action: suit },
    ]);
  }

  function newspaper() {
    e.registerScene('newspaper', newspaper);
    e.log('story', '짓밟힌 신문을 펼쳐 흙을 털어낸다.');
    e.log('story', '외환보유고 39억 달러. 며칠 전까지만 해도 "경제 펀더멘털은 튼튼하다"던 정부의 공식 발표.');
    e.log('story', '하지만 구석진 단신 기사 뒤엔 300억 달러가 넘는 단기 외채 수치가 숨겨져 있다.');
    e.log('inner', '\'수학적으로 불가능한 보고였다. 이건 명백한 의도적 기만이다.\'');
    const found = e.addClue('c_gap', '발행과 실제의 괴리', '정부는 실제 수치를 알고 있었음에도 무책임한 낙관론으로 국민을 기만했다.', 'newspaper');
    if (found) e.log('clue', '🔑 단서 발견 — 조작된 공식 발표 수치');
    e.log('story', '메모를 다시 확인한다. "K가 도서관 3층에서 기다린다."');
    e.logD();
    e.showChoices([
      { label: '▶ 여의도 거리로 나간다', action: street },
      { label: '▶ K라는 인물을 찾아 떠난다', isKey: true, action: findK },
    ]);
  }

  function stranger() {
    e.registerScene('stranger', stranger);
    e.log('story', '지나가던 양복 차림의 남성이 떨리는 손으로 담배를 피우고 있다.');
    e.log('npc', '"오늘 아침에 해고됐습니다. 어제까지만 해도 우리 회사는 건실하다고 했는데..."');
    e.log('story', '그의 열려있는 서류 가방 틈으로 "달러 환수 보고서"라는 직인이 찍힌 문건이 보인다.');
    e.log('inner', '\'이 이틀 전 날짜... 이미 본부에서는 구조조정을 확정했었다.\'');
    const found = e.addClue('c_layoff', '기획된 해고', '공식 발표 전 이미 기업들은 대규모 구조조정을 확정하고 있었다.', 'stranger');
    if (found) e.log('clue', '🔑 단서 발견 — 해고 통보 전의 비밀 문서');
    e.logD();
    e.showChoices([
      { label: '▶ 남자를 위로하며 정보를 더 듣는다', action: stranger_talk },
      { label: '▶ 서둘러 은행 쪽으로 향한다', action: bank },
    ]);
  }

  function stranger_talk() {
    e.registerScene('stranger_talk', stranger_talk);
    e.log('npc', '"사무실에서 들었어요. 사장님 친구분들은 어제 달러를 싹쓸이했다고..."');
    e.log('npc', '"우리는 월급도 못 받았는데... 그들은 이미 부자가 됐겠죠."');
    const found = e.addClue('c_insider', '내부자 정보 유출', '고위층은 발표 전 정보를 공유하며 달러를 대거 매집했다.', 'stranger_talk');
    if (found) e.log('clue', '🔑 핵심 단서 발견 — 정보의 불평등');
    e.logD();
    e.showChoices([
      { label: '▶ K를 찾으러 간다', isKey: true, action: findK },
      { label: '▶ 양복 남자들의 승용차를 쫓는다', action: suit },
    ]);
  }

  function radio() {
    e.registerScene('radio', radio);
    e.setLocation('📍 서울 — 여의도 상가');
    e.log('story', '라디오 매장 앞, 고장 난 라디오처럼 지직거리는 속보가 흘러나온다.');
    e.log('news', '"...정부 고위 인사의 친인척이 발표 48시간 전 수백만 달러를... 뚝."');
    e.log('story', '갑자기 전파가 끊기고 방송 중단 신호음만 들린다.');
    e.log('bad', '가게 주인이 황급히 셔터를 내리며 주변을 경계한다.');
    e.log('npc', '"못 들은 걸로 해요. 오늘 이런 방송 나간 적 없어!"');
    const found = e.addClue('c_radio', '중단된 보도', '정부 친인척의 달러 투기 의혹 보도가 외부 압력에 의해 강제 중단되었다.', 'radio');
    if (found) e.log('clue', '🔑 단서 발견 — 강제 중단된 비밀 속보');
    e.logD();
    e.showChoices([
      { label: '▶ K가 제안한 도서관으로 간다', isKey: true, action: findK },
      { label: '▶ 은행으로 가 확인한다', action: bank },
    ]);
  }

  function bank() {
    e.registerScene('bank', bank);
    e.setLocation('📍 서울 — 외환은행 본점 부근');
    e.log('story', '은행 셔터는 굳게 닫혀 있지만, 옆문으로 검은 양복들이 가방을 든 채 쉴 새 없이 드나든다.');
    e.log('story', '한 젊은 행원이 쓰레기통에 급하게 종이 뭉치를 버리고 사라지는 것을 목격했다.');
    e.logD();
    e.showChoices([
      { label: '▶ 그 쓰레기통을 뒤져본다', isClue: true, action: trashCan },
      { label: '▶ 양복 남자들의 승용차를 미행한다', action: suit },
    ]);
  }

  function trashCan() {
    e.registerScene('trashCan', trashCan);
    e.log('story', '쓰레기통 안엔 찢겨진 텔렉스 전송 기록이 가득하다.');
    e.log('story', '"발표 12시간 전. 자산 해외 이전 최종 승인 완료. 대상자: 용산 OO, 종로 OO..."');
    e.log('inner', '\'국가가 망하기 직전, 누군가는 국가의 자금을 해외로 빼돌리는 것을 승인했다.\'');
    const found = e.addClue('c_transfer', '해외 자산 도피', '국가 부도 선언 직전, 고위직의 자산이 대규모로 해외로 빠져나간 증거.', 'trashCan');
    if (found) e.log('clue', '🔑 단서 발견 — 해외 자산 도피 기록');
    e.logD();
    e.showChoices([
      { label: '▶ 이제 K를 만나러 간다', isKey: true, action: findK },
    ]);
  }

  function suit() {
    e.registerScene('suit', suit);
    e.setLocation('📍 서울 — 한강변 안가');
    e.log('story', '승용차를 쫓아 도착한 곳은 한강이 내려다보이는 은밀한 건물.');
    e.log('story', '창문 틈으로 두 남자가 양주를 마시며 웃는 소리가 들린다.');
    e.log('npc', '"환율 800원에서 1,500원 찍으면 앉아서 두 배야. 이번 건으로 강남 빌딩 한 채 더 샀네."');
    e.log('npc', '"국민이야 죽든 말든 우리가 살아야 나라가 사는 것 아니겠나? 하하하."');
    e.log('bad', '그들의 웃음소리가 국가 부도의 비명 소리 위로 잔인하게 겹친다.');
    const found = e.addClue('c_party', '권력의 축제', '국가의 위기를 개인의 부를 축적할 기회로 삼은 이들의 소름 끼치는 대화.', 'suit');
    if (found) e.log('clue', '🔑 핵심 단서 발견 — 위기를 즐기는 자들');
    e.logD();
    e.showChoices([
      { label: '▶ K를 만나러 도서관으로 향한다', isKey: true, action: findK },
    ]);
  }

  function findK() {
    e.registerScene('findK', findK);
    e.setLocation('📍 서울 — 낡은 도서관 서고');
    e.log('time', '[ 1997년 11월 21일 자정 ]');
    e.log('story', '먼지 쌓인 서고 3층. 1997년의 차가운 밤이 창밖에서 울부짖는다.');
    e.log('story', 'K라 불리는 노인이 촛불 하나를 켜고 낡은 수첩을 적고 있다.');
    e.log('npc', 'K: "모두 보셨나요? 환율 뒤에 숨겨진 그 추악한 미소들을..."');
    e.log('npc', '"정부는 금을 모으라고 하겠죠. 하지만 금을 빼돌린 자들의 명단은 절대 말하지 않을 겁니다."');
    e.log('story', 'K가 가죽 가방에서 마이크로필름을 꺼내 내민다.');
    e.log('npc', '"이것이 당신이 찾는 마지막 조각입니다. 72시간의 비밀 기록입니다."');
    const found = e.addClue('c_k', 'K의 기밀 리포트', '72시간 동안 진행된 국가 자금의 불법 이전과 정보 유출의 총집 대성 기록.', 'findK');
    if (found) e.log('clue', '🔑 최후의 증거 — K의 비밀 보고서');
    e.log('mystery', '모든 퍼즐이 맞춰졌다. 1997년의 비극은 예견된 것이 아닌, 방조되고 기획된 면이 있었다.');
    e.log('good', '진실을 들고 돌아가 오늘을 기억해야 한다.');
    e.logD();
    e.showChoices([
      { label: '▶ 모든 기록을 가슴에 품고 귀환한다', isKey: true, action: finish },
    ]);
  }

  function finish() {
    e.log('story', '도서관의 공기가 소용돌이치며 시간의 통로가 열린다.');
    e.log('mystery', '누군가는 이 날을 눈물로 기억하겠지만, 당신은 그것을 진실로 기록했습니다.');
    e.log('story', '빛의 잔상이 사라지고 신문의 활자가 다시 살아난다.');
    e.logD();
    e.showChoices([{
      label: '▶ 시간의 갈라짐 속으로 뛰어든다',
      action: () => solveCase(
        'imf1997',
        '국가 부도의 날, 그 차가운 기만의 기록',
        ['금융 공황의 시작', '발행과 실제의 괴리', '기획된 해고', '중단된 보도', '해외 자산 도피', 'K의 기밀 리포트'],
        '1997년 11월 21일.\n대한민국은 국가 부도라는 치욕을 겪었다.\n국민은 장롱 속 금을 꺼냈지만,\n고립된 권력은 3일 전부터 정보를 팔아 배를 불렸다.\n\n당신은 무책임한 낙관론 뒤에 숨은\n냉혹한 기만의 기록을 구출해냈습니다.',
      ),
    }]);
  }

  start();
}
