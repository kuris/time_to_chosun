/**
 * js/data/danjong_story.js
 * 단종: 네 개의 시선 (고밀도 내러티브 오버홀)
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
        engine.log('time', '[ 1 챕터 — 설원 위의 고독 ]');
        engine.log('story', '1453년 무렵, 수양대군의 사저에는 뼈를 시리게 하는 북풍이 몰아치고 있습니다. 마당에 쌓인 눈은 마치 갓 태어난 백성들의 순수함 같으면서도, 동시에 모든 흔적을 비정하게 지워버리는 죽음의 수의처럼 보입니다. 당신은 얼어붙은 연못가에 서서 생각합니다. 나약한 조카가 보위에 앉아 신하들에게 농락당하고 있는 이 현실이 정녕 조선이 가야 할 길인가. 아니면 내가 그 오명을 뒤집어쓰고 강력한 나라를 세워야 하는가.');
        engine.log('inner', '“왕관은 차가운 얼음과 같다. 누군가는 그 냉기를 견뎌야 조선의 봄이 올 것이니. 그것을 짊어질 자는 이 나라에서 오직 나뿐이다.”');
        engine.showChoices([
          { label: "▶ 한명회와 함께 정적들의 명단을 작성한다.", action: () => {
            engine.modifyStat('stress', +15);
            engine.log('story', '당신은 붓을 들어 정적들의 이름을 하나씩 적어 내려갑니다. 먹물이 번지는 모양이 마치 갓 흘린 피처럼 보이지만, 당신의 손은 단 한 번도 떨리지 않습니다. 첫 번째 이름은 대호(大虎) 김종서. 조선의 호랑이를 잡지 못하면 내가 사냥당할 뿐입니다.');
            next('tiger_hunt');
          }},
          { label: "▶ 홀로 술을 마시며 망설임을 털어낸다.", action: () => {
            engine.modifyStat('mental', -10);
            engine.log('story', '독한 소주가 목을 타고 넘어갑니다. 술의 열기가 머릿속의 복잡한 번뇌를 태워버립니다. 조카의 슬픈 눈망울이 스쳐 가지만, 당신은 그 눈빛을 어방 속으로 밀어 넣습니다. 왕이 되려는 자에게 자비는 사치입니다.');
            next('tiger_hunt');
          }},
          { label: "▶ 밤새도록 병법서를 읽으며 전략을 가다듬는다.", action: () => {
            engine.modifyStat('stamina', -10);
            engine.log('story', '등불이 가물거리도록 병법서를 탐독합니다. 모든 우연을 배제하고 오직 필승의 길만을 계산합니다. 당신의 눈에는 이제 조카도, 동생도 아닌 오직 배치해야 할 말(馬)들만이 보입니다.');
            next('tiger_hunt');
          }}
        ]);
      },
      tiger_hunt: () => {
        engine.log('time', '[ 2 챕터 — 대호를 사냥하다 ]');
        engine.log('story', '김종서의 집 대문 앞. 밤공기가 비수를 품은 듯 살벌합니다. 당신은 철퇴를 품속에 숨긴 장정들과 함께 그의 거처 앞에 섰습니다. 조선에서 가장 강대한 세력을 가졌던 정승, 김종서와 마주할 시간입니다. 이 문을 넘는 순간, 당신은 영웅이 되거나 혹은 반역자가 될 것입니다.');
        engine.log('inner', '심장 박동 소리가 고요한 밤을 깨뜨릴 것만 같다. 호랑이를 잡으려면 그 소굴로 들어가야 한다. 두려움은 보이지 마라.');
        engine.showChoices([
          { label: "▶ 직접 김종서 앞에 서서 위압감을 행사한다.", action: () => {
            engine.modifyStat('stress', +20);
            engine.log('story', '당신은 당당히 걸어가 그를 마주합니다. 짧은 침묵은 수 만년처럼 느껴집니다. 당신의 눈빛에서 살기를 읽은 김종서가 입을 떼려는 찰나, 어둠 속에서 철퇴가 번개처럼 낙하합니다. 조선의 호랑이가 비참한 비명조차 지르지 못한 채 바닥을 적십니다.');
            next('empty_throne');
          }},
          { label: "▶ 신호를 내려 매복한 자들이 즉시 처리하게 한다.", action: () => {
            engine.modifyStat('mental', -15);
            engine.log('story', '당신은 등을 돌려 먼 곳을 바라봅니다. 둔탁한 타격음과 함께 거친 숨소리가 멎는 소리가 들려옵니다. 당신의 관복 끝에 튀긴 붉은 핏방울이 무겁게만 느껴집니다. 이제 대세는 당신의 것입니다.');
            next('empty_throne');
          }},
          { label: "▶ 김종서의 아들을 인질로 잡아 항복을 권유한다.", action: () => {
            engine.modifyStat('stress', +25);
            engine.log('story', '비열하다는 소리를 들어도 상관없습니다. 그의 아들을 앞세워 김종서의 기세를 꺾어놓습니다. 무너진 호랑이의 눈에서 흐르는 절망을 보며, 당신은 권력의 잔인함을 다시 한번 체감합니다.');
            next('empty_throne');
          }}
        ]);
      },
      empty_throne: () => {
        engine.log('time', '[ 3 챕터 — 옥좌 위의 서늘함 ]');
        engine.log('story', '결국 당신은 근정전의 옥좌에 앉았습니다. 면류관의 옥 구슬들이 잘그락거리며 당신의 시야를 가로막습니다. 하지만 가려진 시야 너머로 보이는 대신들의 눈빛은 예전과 전혀 다릅니다. 충성이 아닌, 언제 터질지 모르는 시한폭탄 같은 공포가 그들 사이를 흐르고 있습니다. 이 자리는 생각보다 춥고, 생각보다 넓습니다.');
        engine.log('inner', '“모두가 고개를 숙이고 있지만, 그들의 마음속에는 누가 칼을 품고 있는가. 이제 나는 아무도 믿을 수 없다.”');
        engine.showChoices([
          { label: "▶ 공신들에게 막대한 상을 내려 결속을 다진다.", action: () => {
            engine.modifyStat('money', -40);
            engine.log('story', '국고를 열어 공신들을 돈과 땅으로 묶어둡니다. 그들의 입은 금사로 꿰맸지만, 백성들의 원성은 담 너머로 커져만 갑니다.');
            next('scholar_tension');
          }},
          { label: "▶ 엄격한 법치와 숙청으로 반대파를 억누른다.", action: () => {
            engine.modifyStat('stress', +30);
            engine.log('story', '당신은 작은 반항조차 용납하지 않습니다. 의금부의 형틀이 마를 날이 없고, 도성의 밤은 비명 소리로 가득 찹니다. 당신은 조선을 공포라는 쇠사슬로 묶어버립니다.');
            next('scholar_tension');
          }}
        ]);
      },
      scholar_tension: () => {
        engine.log('time', '[ 4 챕터 — 집현전의 조용한 반항 ]');
        engine.log('story', '당신이 그토록 아꼈던 집현전 학사들—성삼문, 박팽년 등이 당신의 연회 초대를 노골적인 핑계로 일관하며 거부합니다. 그들의 빈 자리가 연회장의 화려한 촛불보다 더 선명하게 당신을 괴롭힙니다. 그들은 조카의 왕위를 뺏은 당신을 왕이 아닌, 그저 보좌를 훔친 도적으로 보고 있습니다.');
        engine.log('inner', '“내가 그토록 아꼈던 천재들이 이제는 나를 비수를 든 괴물처럼 여기는구나.”');
        engine.showChoices([
          { label: "▶ 그들을 압박하여 강제로 충성 서약을 받는다.", action: () => {
            engine.modifyStat('mental', -20);
            engine.log('story', '강제로 붓을 쥐여주고 충성을 맹세하게 합니다. 하지만 그들이 쓴 글씨에는 영혼이 없습니다. 당신은 껍데기뿐인 복종을 얻었을 뿐입니다.');
            next('nightmare_visions');
          }},
          { label: "▶ 진심 어린 서신으로 그들의 마음을 돌려보려 한다.", action: () => {
            engine.modifyStat('stress', +15);
            engine.log('story', '밤새도록 편지를 씁니다. "조선을 위해 어쩔 수 없는 선택이었다"고 항변해보지만, 돌아오는 것은 싸늘한 침묵과 경멜뿐입니다.');
            next('nightmare_visions');
          }},
          { label: "▶ 일부러 그들 앞에서 어린 단종을 향한 자비를 베푼다.", action: () => {
            engine.modifyStat('mental', +10);
            engine.log('story', '단종에게 후한 대접을 내리는 척하며 연출을 시도합니다. 학사들의 의심어린 눈빛이 잠시나마 누그러지는 듯하지만, 가슴 속에 응어리진 불길은 꺼지지 않았습니다.');
            next('nightmare_visions');
          }}
        ]);
      },
      nightmare_visions: () => {
        engine.log('time', '[ 5 챕터 — 피 흘리는 조카의 환영 ]');
        engine.log('story', '깊은 밤, 침전에 홀로 누워있어도 잠은 당신을 외면합니다. 촛불이 일렁일 때마다 그림자가 단종의 모습으로 변하여 당신을 압박합니다. 꿈속에서 단종의 어머니, 현덕왕후가 나타나 당신의 목을 조르며 피눈물을 흘립니다. "숙부여, 정녕 당신의 손에 묻은 피가 닦일 줄 알았느냐!" 당신은 비명을 지르며 깨어납니다.');
        engine.log('inner', '등 뒤가 서늘하다. 옷을 몇 겹이나 껴입어도 이 한기는 사라지지 않는다. 내가 죽인 자들의 원혼이 나를 끌어내리려 하는가.');
        engine.showChoices([
          { label: "▶ 무시하고 정무에 더욱 집착한다.", action: () => {
            engine.modifyStat('stress', +25);
            engine.log('story', '환상을 지우기 위해 밤낮없이 나랏일에 매달립니다. 당신의 몸은 축나고 성격은 더욱 포악해져 가며, 이제 당신의 곁에는 아무도 남지 않게 됩니다.');
            next('exile_decision');
          }},
          { label: "▶ 대규모 시주를 통해 부처님의 자비를 구한다.", action: () => {
            engine.modifyStat('money', -30);
            engine.modifyStat('mental', +15);
            engine.log('story', '전국의 사찰에 금을 내리고 불상을 조성합니다. 잠시나마 마음의 평안을 얻은 듯하지만, 눈을 감으면 여전히 영월의 파도 소리가 들려옵니다.');
            next('exile_decision');
          }}
        ]);
      },
      exile_decision: () => {
        engine.log('time', '[ 6 챕터 — 영월, 청령포로의 유배 ]');
        engine.log('story', '정적들이 단종을 다시 옹립하려 한다는 밀고가 빗발칩니다. 더 이상 그를 도성 근처에 둘 수 없습니다. 당신은 단종을 사면이 강과 절벽으로 둘러싸인 천혜의 감옥, 영월 청령포로 보낼 것을 명령합니다. 그것은 유배라는 이름의 사실상의 사형 선고와 같습니다.');
        engine.log('inner', '“조카야, 너를 죽이고 싶지는 않았다. 하지만 네가 살아있는 한 조선의 하늘에 태양은 둘이 될 수밖에 없구나.”');
        engine.showChoices([
          { label: "▶ 단호하게 영월 유배령을 선포한다.", action: () => {
            engine.addClue('exile_seal', '세조의 비정한 인장', '조카의 유배지에 찍힌 차가운 옥새의 낙인입니다.');
            next('assassination_threat');
          }},
          { label: "▶ 유배길의 호위를 강화하여 상해를 방지한다.", action: () => {
            engine.modifyStat('stress', +10);
            engine.log('story', '혹시라도 가는 길에 해를 입을까 봐 당신의 최정예 군사들을 붙입니다. 비정함 속에서도 남은 일말의 죄책감이 당신을 괴롭힙니다.');
            next('assassination_threat');
          }}
        ]);
      },
      assassination_threat: () => {
        engine.log('time', '[ 7 챕터 — 연회장의 은밀한 비수 ]');
        engine.log('story', '경회루에서 열린 연회. 화려한 가무가 이어지는 가운데, 당신은 한명회로부터 쪽지를 받습니다. "운검(雲劍) 성삼문과 유응부가 칼을 숨겼습니다. 거사가 임박했습니다." 주변을 둘러보자, 미소 짓고 있는 신하들의 옷자락 아래에서 차가운 금속 광채가 비치는 것만 같습니다.');
        engine.showChoices([
          { label: "▶ 즉시 호위무사를 불러 연회장을 폐쇄한다.", action: () => {
            engine.modifyStat('stress', +20);
            next('interrogation_hell');
          }},
          { label: "▶ 태연하게 술을 마시며 그들이 먼저 움직이게 유도한다.", action: () => {
            engine.modifyStat('mental', -20);
            next('interrogation_hell');
          }},
          { label: "▶ 범인을 지목하지 않고 모두에게 자백할 기회를 준다.", action: () => {
            engine.modifyStat('stress', +15);
            next('interrogation_hell');
          }}
        ]);
      },
      interrogation_hell: () => {
        engine.log('time', '[ 8 챕터 — 성삼문의 위엄 앞에 서다 ]');
        engine.log('story', '붙잡힌 성삼문을 국문합니다. 그는 무릎이 깨지고 살이 타는 고문 속에서도 당신을 향해 비웃음을 날립니다. "수양, 너는 왕이 아니다! 그저 어린 조카를 문 자취에 불과하다!" 당신은 그를 죽여야 마땅하지만, 그의 곧은 기개에 압도되어 말문이 막힙니다.');
        engine.log('inner', '이런 자가 내 신하를 자처했더라면, 나는 세종을 넘어서는 성군이 되었을지도 모른다. 하지만 이제는 그를 찢어 죽여야만 내가 살 수 있다.');
        engine.showChoices([
          { label: "▶ 가혹한 처형으로 기를 꺾겠다 명령한다.", action: () => {
            engine.modifyStat('mental', -25);
            next('brother_blood');
          }},
          { label: "▶ 마지막까지 그의 재능을 아까워하며 회유한다.", action: () => {
            engine.modifyStat('stress', +15);
            next('brother_blood');
          }}
        ]);
      },
      brother_blood: () => {
        engine.log('time', '[ 9 챕터 — 살붙이의 피까지 묻히다 ]');
        engine.log('story', '당신의 친동생 금성대군마저 반란을 꾀했다는 보고가 들어옵니다. 이제 당신의 명령서는 가문 전체를 향합니다. 권력이라는 괴물은 형제도, 친구도 남기지 않습니다. 당신의 곁은 이제 텅 비어버렸고, 오직 찬바람만이 옥좌를 감쌉니다.');
        engine.showChoices([
          { label: "▶ 모든 역모자를 처단하라는 명을 고수한다.", action: () => {
            engine.log('story', '당신의 명령으로 동생의 숨통마저 끊어집니다. 당신은 이제 피로 맺어진 진정한 왕이 되었습니다. 하지만 거울 속의 당신은 더 이상 예전의 수양대군이 아닙니다.');
            next('final_poison');
          }}
        ]);
      },
      final_poison: () => {
        engine.log('time', '[ 10 챕터 — 영월 청령포의 마지막 전언 ]');
        engine.log('story', '이제 선택의 여지가 없습니다. 단종이 살아있는 한, 반란은 멈추지 않을 것입니다. 금부도사에게 사약을 들려 영월로 보냅니다. 창밖에는 비가 쏟아져 대지를 적십니다. 마치 하늘이 내리는 조카의 눈물 같습니다.');
        engine.log('inner', '“끝내야 한다. 그래야 조선이 산다. 미안하다, 조카야. 지옥에서 만나자.”');
        engine.showChoices([
          { label: "▶ 사약 사발을 건네라는 명령을 최종 확인한다.", action: () => {
            engine.addClue('last_poison_bowl', '단종의 사약 사발', '조선 사상 가장 슬픈 죽음을 담았던 낡은 사발입니다.');
            next('ending');
          }},
          { label: "▶ 사약 대신 가문을 멸문시키고 단종은 홀로 두게 한다.", action: () => {
            engine.modifyStat('stress', +30);
            engine.log('story', '조카의 숨통은 끊지 못하지만, 그의 지지기반을 처참히 부숴버립니다. 그것은 죽음보다 더 가혹한 형벌이 될 것입니다.');
            next('ending');
          }}
        ]);
      },
      ending: () => {
        engine.log('time', '[ 11 챕터 — 역사가 적을 이름, 세조 ]');
        engine.log('story', '당신은 결국 조선의 제7대 왕 세조가 되었습니다. 국방을 튼튼히 하고 법전을 정비하여 나라의 기틀을 세웠습니다. 하지만 후세는 당신을 위대한 왕이라 칭하면서도, 동시에 혈육을 죽인 비정한 숙부라 기록할 것입니다. 당신은 옥좌라는 차가운 바다 위에 홀로 떠 있는 고독한 승리자입니다.');
        solveCase('danjong_multi', '피와 야망으로 세운 왕조', ['세조의 야망'], '수양대군으로서 당신은 조선을 위해 가장 비정한 길을 선택했고, 그 결과 찬란한 치적 뒤에 영원한 죄책감을 남겼습니다.');
      }
    },

    // ──────────────────────────────────────────────────
    //  2. 성삼문 (고독한 충신)
    // ──────────────────────────────────────────────────
    sayuksin: {
      start: () => {
        engine.log('time', '[ 1 챕터 — 춘추관의 밤그늘 ]');
        engine.log('story', '붓끝에 먹을 찍다 문득 멈춥니다. 세종대왕께서 나를 믿고 어린 손자(단종)를 부탁하셨건만, 수양대군이 기어이 옥좌를 찬탈했습니다. 춘추관의 어둠 속에서 당신은 홀로 눈물을 삼킵니다.');
        engine.log('inner', '“글은 역사를 기록하지만, 칼은 역사를 바꾼다. 이제 나도 칼을 들어야 하는가.”');
        engine.showChoices([
          { label: "▶ 박팽년 등 뜻을 같이하는 동료들을 모은다.", action: () => {
            engine.modifyStat('stress', +10);
            engine.log('story', '당신은 은밀히 동료들에게 서신을 보냅니다. 죽음을 각오한 이들이 하나둘 그림자 속에서 나타납니다.');
            next('vow');
          }},
          { label: "▶ 일단 왕의 곁에서 기회를 엿본다.", action: () => {
            engine.modifyStat('mental', -5);
            engine.log('story', '당신은 수양의 신하가 된 척하며 굴욕을 견딥니다. 술잔을 들 때마다 손이 떨리지만, 복수를 위해 참아냅니다.');
            next('vow');
          }}
        ]);
      },
      vow: () => {
        engine.log('time', '[ 2 챕터 — 피로 쓴 맹세 ]');
        engine.log('story', '어느 낡은 정자 아래, 거사를 도모하는 6명의 학사가 모였습니다. 누군가는 두려움에 떨고, 누군가는 분노에 차 있습니다. 당신은 손가락을 깨물어 흰 비단 위에 붉은 선을 긋습니다.');
        engine.log('inner', '이 피가 조선의 정의를 되살릴 수 있다면, 백 번이라도 흘리리라.');
        engine.showChoices([
          { label: "▶ 가장 먼저 혈서에 서명한다.", action: () => {
            engine.addClue('bloody_vow', '학사들의 혈서', '죽음을 두려워하지 않는 6인 학사의 맹세가 서린 비단입니다.');
            next('palace_spy');
          }},
          { label: "▶ 신중하게 주변의 동태를 살피며 맹세한다.", action: () => next('palace_spy') }
        ]);
      },
      palace_spy: () => {
        engine.log('time', '[ 3 챕터 — 폭풍 전의 고요 ]');
        engine.log('story', '거사일이 다가옵니다. 명나라 사신의 연회 날, 당신의 동료 유응부가 운검(왕의 호위검)을 잡기로 했습니다. 수양의 목을 칠 수 있는 단 한 번의 기회입니다. 하지만 궁궐 내 분위기가 심상치 않습니다.');
        engine.log('inner', '한명회의 눈빛이 날카롭다. 무언가 눈치챈 것인가.');
        engine.showChoices([
          { label: "▶ 계획대로 거사를 진행한다.", action: () => next('failed_attempt') },
          { label: "▶ 신중을 기하기 위해 거사일을 늦춘다.", action: () => {
             engine.log('story', '당신은 동료들을 만류합니다. 하지만 이 지연이 비극의 서막이 될 줄은 몰랐습니다.');
             next('failed_attempt');
          }}
        ]);
      },
      failed_attempt: () => {
        engine.log('time', '[ 4 챕터 — 틀어진 톱니바퀴 ]');
        engine.log('story', '연회 당일, 갑자기 세조가 운검의 출입을 금지했습니다! 거사를 실행할 무력을 잃었습니다. 박팽년은 "오늘이 아니면 안 된다"며 울부짖고, 당신의 머릿속은 하얗게 변합니다.');
        engine.showChoices([
          { label: "▶ 무리해서라도 오늘 단검을 휘두른다.", action: () => {
             engine.modifyStat('stress', +20);
             next('betrayal_jil');
          }},
          { label: "▶ 훗날을 기약하며 후퇴를 명령한다.", action: () => {
             engine.modifyStat('mental', -10);
             next('betrayal_jil');
          }}
        ]);
      },
      betrayal_jil: () => {
        engine.log('time', '[ 5 챕터 — 등 뒤를 찌른 배신 ]');
        engine.log('story', '거사가 어긋나자, 공포에 사로잡힌 동료 김질이 당신을 배신하고 수양에게 달려갔다는 첩보가 들어옵니다. 그가 흘리는 눈물은 당신의 목숨을 대가로 한 것입니다.');
        engine.log('inner', '“지키고 싶었던 조선이, 동료의 입에서 무너져 내리는구나.”');
        engine.showChoices([
          { label: "▶ 도망치지 않고 당당히 집에서 기다린다.", action: () => next('torture_chamber') },
          { label: "▶ 단종이 계신 영월을 향해 마지막 절을 올린다.", action: () => next('torture_chamber') }
        ]);
      },
      torture_chamber: () => {
        engine.log('time', '[ 6 챕터 — 뜨거운 인두, 차가운 눈빛 ]');
        engine.log('story', '당신은 국문장으로 끌려갔습니다. 세조가 직접 내려와 쇠인두를 달구며 묻습니다. "삼문아, 너는 어찌하여 나를 배신하느냐?" 당신은 고통 속에서도 웃음을 터뜨립니다.');
        engine.log('inner', '다리가 부러지고 살이 타는 냄새가 나지만, 내 마음은 부끄럽지 않다.');
        engine.showChoices([
          { label: "▶ 당신은 나의 왕이 아니라 '수양'일 뿐이라 일갈한다.", action: () => {
             engine.modifyStat('mental', +30);
             next('last_poem');
          }},
          { label: "▶ 세종대왕의 고명을 읊으며 그의 죄를 꾸짖는다.", action: () => next('last_poem') }
        ]);
      },
      last_poem: () => {
        engine.log('time', '[ 7 챕터 — 낙화암의 메아리 ]');
        engine.log('story', '처형장으로 향하는 길. 수레 위에서 당신은 마지막 붓을 듭니다. 수천 명의 백성이 울며 당신을 지켜봅니다. 당신은 조선의 선비로서 마지막 의무를 다하고자 합니다.');
        engine.showChoices([
          { label: "▶ 백이숙제의 충절을 담은 절명시를 짓는다.", action: () => {
             engine.addClue('sam_poem', '성삼문의 절명시', '죽음 앞에서도 의연했던 충신의 기개가 담긴 마지막 시입니다.');
             next('ending');
          }}
        ]);
      },
      ending: () => {
        engine.log('time', '[ 8 챕터 — 영원한 충절의 상징 ]');
        engine.log('story', '차가운 칼끝이 당신의 목을 스칩니다. 당신은 눈을 감으며 어린 단종의 평안을 빕니다. 육신은 찢겨 나갔으나, 당신의 이름은 조선의 모든 선비가 우러러보는 만고의 충신으로 부활했습니다.');
        solveCase('danjong_multi', '만고강산에 홀로 푸른 소나무', ['성삼문의 충절'], '성삼문으로서 당신은 불의에 타협하지 않고 죽음으로 정의를 지켜냈습니다.');
      }
    },

    // ──────────────────────────────────────────────────
    //  3. 김질 (배신의 고뇌)
    // ──────────────────────────────────────────────────
    kimjil: {
      start: () => {
        engine.log('time', '[ 1 챕터 — 밤의 방문객 ]');
        engine.log('story', '장인인 정창손의 집, 그리고 찾아온 성삼문. 그들이 내뱉는 말들은 하나하나가 당신의 심장을 조여옵니다. "수양을 몰아내고 노산군을 다시 옹립하세. 자네도 함께 하겠는가?"');
        engine.log('inner', '“이것은 미친 짓이다. 아니면 영웅의 길인가. 무엇을 선택해도 내 앞날은 핏빛이겠구나.”');
        engine.showChoices([
          { label: "▶ 떨리는 손을 숨기며 맹세에 참여한다.", action: () => {
            engine.modifyStat('stress', +10);
            engine.log('story', '당신은 고개를 끄덕입니다. 하지만 당신의 머릿속에는 거사의 대의보다 실패했을 때 닥칠 처형장의 칼날이 먼저 떠오릅니다.');
            next('domestic_fear');
          }},
          { label: "▶ 모호한 대답으로 일단을 회피한다.", action: () => {
            engine.modifyStat('mental', -5);
            next('domestic_fear');
          }}
        ]);
      },
      domestic_fear: () => {
        engine.log('time', '[ 2 챕터 — 잠들지 못한 가택 ]');
        engine.log('story', '집으로 돌아온 당신. 등불 아래에서 바느질하는 아내와 소리 없이 잠든 아이들의 얼굴을 봅니다. 이 거사가 잘못된다면, 이 평화로운 풍경은 순식간에 시체 더미로 변할 것입니다. 당신은 방구석에서 헛구역질을 합니다.');
        engine.log('inner', '나 하나 죽는 것은 두렵지 않다. 하지만 내 처자는? 내 가문은? 왜 성삼문은 나에게 이런 짐을 지웠나.');
        engine.showChoices([
          { label: "▶ 아내를 끌어안으며 슬픔을 억누른다.", action: () => {
            engine.modifyStat('mental', -10);
            next('interrogate_jil');
          }},
          { label: "▶ 거사의 자료를 남 몰래 불태우려 고민한다.", action: () => {
            engine.modifyStat('stress', +15);
            next('interrogate_jil');
          }}
        ]);
      },
      interrogate_jil: () => {
        engine.log('time', '[ 3 챕터 — 장인 정창손의 날카로운 눈 ]');
        engine.log('story', '며칠 뒤, 장인 정창손이 당신의 사백색으로 질린 얼굴을 빤히 쳐다봅니다. "질아, 거동이 수상하구나. 무언가 숨기는 것이 있느냐? 그것이 너와 나의 가문을 몰살시킬 일은 아니겠지?"');
        engine.log('inner', '장인어른조차 눈치챘다. 더 이상 숨길 곳이 없다. 누군가에게 말해야 살 수 있다.');
        engine.showChoices([
          { label: "▶ 장인에게 모든 비밀을 털어놓는다.", action: () => {
             engine.log('story', '정창손의 눈이 번쩍입니다. "잘 생각했다! 지금 당장 수양대군에게 가자. 그것만이 우리가 살 길이다."');
             next('palace_gate');
          }},
          { label: "▶ 끝까지 아니라고 시치미를 뗀다.", action: () => {
             engine.modifyStat('stress', +20);
             next('palace_gate');
          }}
        ]);
      },
      palace_gate: () => {
        engine.log('time', '[ 4 챕터 — 운명의 궁궐 정문 ]');
        engine.log('story', '밤이 깊어가는 광화문 앞. 차가운 공기가 폐부를 찌릅니다. 지금 이 문을 들어가 성삼문을 밀고하면 당신은 살 수 있습니다. 하지만 당신은 영원히 친구의 피를 손에 묻힌 배신자로 역사에 기록될 것입니다.');
        engine.log('inner', '발걸음이 돌덩이처럼 무겁다. 저 문 너머엔 생존이 있고, 이 문 뒤엔 의리가 있다.');
        engine.showChoices([
          { label: "▶ 당당히 문지기에게 성명을 밝히고 국왕(세조)을 뵙길 청한다.", action: () => {
            engine.addClue('informer_list', '김질의 밀고 내용', '성삼문 일당의 거사 계획을 구체적으로 받아 적은 내관의 기록입니다.');
            next('confession_sejo');
          }},
          { label: "▶ 끝내 발길을 돌려 도망치려 한다.", action: () => {
             engine.log('story', '하지만 장인 정창손이 당신의 옷자락을 붙듭니다. "어디 가느냐! 가문을 살려야지!" 그는 당신을 끌고 무작정 대궐로 들어갑니다.');
             next('confession_sejo');
          }}
        ]);
      },
      confession_sejo: () => {
        engine.log('time', '[ 5 챕터 — 흘리는 눈물, 차가운 옥좌 ]');
        engine.log('story', '세조 앞에 엎드린 당신의 온몸이 눈앞의 촛불처럼 떨립니다. 당신은 흐느끼며 성삼문의 계획, 숨겨둔 칼날, 혈서의 위치를 낱낱이 고백합니다. 세조는 의외로 차분한 목소리로 묻습니다. "그것이 참이더냐?"');
        engine.log('inner', '입 밖으로 나온 말들이 화살이 되어 친구들의 가슴으로 향한다. 나는 이제 사람이 아니다.');
        engine.showChoices([
          { label: "▶ 머리를 바닥에 찧으며 자비를 구한다.", action: () => {
            engine.modifyStat('mental', -30);
            next('the_aftermath');
          }}
        ]);
      },
      the_aftermath: () => {
        engine.log('time', '[ 6 챕터 — 친구들의 절규 ]');
        engine.log('story', '며칠 뒤, 성삼문과 박팽년 등이 국문장으로 끌려갑니다. 당신은 세조의 옆자리에서 그 광경을 지켜보는 굴욕과 행운을 동시에 맛봅니다. 성삼문은 당신을 향해 외칩니다. "질아! 네가 어찌 그 자리에 있느냐!" 당신은 차마 고개를 들지 못합니다.');
        engine.showChoices([
          { label: "▶ 울음을 참으며 외면한다.", action: () => next('hollow_reward') }
        ]);
      },
      hollow_reward: () => {
        engine.log('time', '[ 7 챕터 — 가시 돋친 작위 ]');
        engine.log('story', '거사를 막은 공으로 당신은 정원공신 2등에 책록되고 작위가 오릅니다. 금과 옥으로 치장된 옷을 입고 가문의 축하 속에 앉아있지만, 당신의 귀에는 여전히 성삼문의 비명소리가 들려옵니다.');
        engine.log('inner', '“살아남았다. 하지만 내 영혼은 그날 국문장에서 함께 불타버린 것인가.”');
        engine.showChoices([
          { label: "▶ 공신 연회에서 억지로 술을 마신다.", action: () => {
            engine.modifyStat('money', +50);
            next('aging_coward');
          }}
        ]);
      },
      aging_coward: () => {
        engine.log('time', '[ 8 챕터 — 노년의 그림자 ]');
        engine.log('story', '수십 년의 세월이 흘러 당신은 높은 벼슬에 올랐습니다. 하지만 당신이 지날 때마다 신진 사림들은 눈길을 피하며 수군거립니다. "저자가 친구를 판 김질이라지." 죽지도 못한 채 당신은 기록 속에 박제된 배신자로 늙어갑니다.');
        engine.showChoices([
          { label: "▶ 마지막 사초를 작성하는 사관을 불러 간곡히 부탁한다.", action: () => next('ending') }
        ]);
      },
      ending: () => {
        engine.log('time', '[ 9 챕터 — 사료에 남겨질 이름 ]');
        engine.log('story', '당신은 장수했습니다. 하지만 당신의 이름 앞에는 영원히 "변절"과 "배신"이라는 수식어가 붙을 것입니다. 당신이 지키려 했던 가족들은 살아남았으나, 당신의 명예는 영영 돌아오지 못할 강을 건넜습니다.');
        solveCase('danjong_multi', '살기 위해 의리를 버린 대가', ['김질의 배신'], '김질로서 당신은 생존이라는 본능을 선택했고, 그 결과 역사의 가장 아픈 배신자로 기억되었습니다.');
      }
    },

    // ──────────────────────────────────────────────────
    //  4. 사관 (기록의 딜레마)
    // ──────────────────────────────────────────────────
    historian: {
      start: () => {
        engine.log('time', '[ 1 챕터 — 춘추관의 먼지 향기 ]');
        engine.log('story', '춘추관의 문을 열자 오래된 한지 냄새와 먹 향이 당신을 맞이합니다. 당신은 역사라는 거대한 거울 앞에 서 있습니다. 계유정난 이후, 궁궐의 분위기는 얼어붙었지만 당신의 붓끝은 뜨겁게 타올라야 합니다.');
        engine.log('inner', '왕은 몸을 지배하지만, 사관은 정신을 지배한다. 나는 무엇을 남길 것인가.');
        engine.showChoices([
          { label: "▶ 목격한 참혹한 현장을 가감 없이 기록한다.", action: () => {
            engine.modifyStat('stress', +10);
            engine.log('story', '당신은 수양대군이 공신들에게 내리는 은밀한 하명들을 하나도 빠짐없이 사초에 적어 넣습니다. 붓대가 부러질 듯 힘이 들어갑니다.');
            next('the_censor');
          }},
          { label: "▶ 후세를 위해 비유와 상징으로 진실을 숨긴다.", action: () => {
             engine.modifyStat('mental', +5);
             next('the_censor');
          }}
        ]);
      },
      the_censor: () => {
        engine.log('time', '[ 2 챕터 — 지우려는 자, 쓰려는 자 ]');
        engine.log('story', '어느 날, 권력을 쥔 한명회가 춘추관을 찾아와 당신이 쓴 어제의 기록을 보여달라 요구합니다. 사관이 쓴 사초는 임금도 볼 수 없는 것이 원칙이나, 지금은 원칙이 무너진 시대입니다.');
        engine.log('inner', '“이 글자가 지워지면 역사의 빈틈이 생길 것이다. 목숨을 걸고 막아야 하는가.”');
        engine.showChoices([
          { label: "▶ 국법을 논하며 목숨을 걸고 거부한다.", action: () => {
             engine.modifyStat('stress', +20);
             next('hidden_scrolls');
          }},
          { label: "▶ 거짓 사초를 보여주어 그들의 눈을 속인다.", action: () => {
             engine.modifyStat('mental', -10);
             next('hidden_scrolls');
          }}
        ]);
      },
      hidden_scrolls: () => {
        engine.log('time', '[ 3 챕터 — 땅속의 메아리 ]');
        engine.log('story', '당신은 공식 실록에 담을 수 없는 진짜 진실들을 따로 적어 항아리에 담습니다. 그리고 아무도 모르는 대나무 숲 땅속 깊이 그것을 묻습니다. 500년 뒤의 누군가 이 항아리를 발견하길 빌며.');
        engine.showChoices([
          { label: "▶ 항아리를 묻고 그 자리에 돌을 놓아 표시한다.", action: () => {
            engine.addClue('buried_history', '사관의 항아리', '부끄러운 시대를 살았던 사관이 훗날을 위해 숨겨둔 미공개 사초입니다.');
            next('ink_vs_blood');
          }}
        ]);
      },
      ink_vs_blood: () => {
        engine.log('time', '[ 4 챕터 — 국문장의 증언자 ]');
        engine.log('story', '사육신의 국문 현장. 비명이 가득한 마당 구석에서 당신은 묵묵히 붓을 놀립니다. 성삼문의 마지막 외침, 단종을 향한 그들의 눈물... 당신은 그 모든 것을 먹물 속에 가둡니다. 수양의 서늘한 시선이 당신의 등을 찌릅니다.');
        engine.log('inner', '“내 심장은 두려움에 떨고 있지만, 내 붓끝은 누구보다 차갑고 정확해야 한다.”');
        engine.showChoices([
          { label: "▶ 떨리는 손을 쥐고 끝까지 정자로 써 내려간다.", action: () => {
            engine.modifyStat('mental', +15);
            next('last_brush');
          }}
        ]);
      },
      last_brush: () => {
        engine.log('time', '[ 5 챕터 — 붓을 꺾지 않는 노병 ]');
        engine.log('story', '세월이 흘러 은퇴하는 날, 당신은 후배 사관에게 당신의 낡은 붓을 물려줍니다. 역사는 당신이 쓴 대로 흘러갈 것입니다. 당신은 비록 작았으나, 거대한 권력에 맞서 이긴 유일한 인간이었습니다.');
        engine.showChoices([
          { label: "▶ 미소를 지으며 춘추관을 나선다.", action: () => next('ending') }
        ]);
      },
      ending: () => {
        engine.log('time', '[ 6 챕터 — 사라지지 않는 먹빛 ]');
        engine.log('story', '당신은 사라졌으나 당신의 기록은 살아남아 유네스코 세계기록유산이 되었습니다. 권력자의 칼날은 무뎌졌으나 사관의 먹빛은 수백 년이 지나도 선명하게 빛나고 있습니다.');
        solveCase('danjong_multi', '붓끝으로 지켜낸 역사의 자존심', ['사관의 사초'], '사관으로서 당신은 권력의 협박 앞에서도 붓을 꺾지 않았고, 그 결과 조선의 정직한 역사를 후세에 물려주었습니다.');
      }
    }
  };

  // 초기 실행
  const startNode = nodes[pov] && nodes[pov].start;
  if (startNode) {
    startStory(
      `[ ${window.library.newspapers['danjong_multi'].povs[pov].name}의 기록 복구 중 ]`,
      `조선 최고의 비극 아래, ${pov === 'suyang' ? '냉혹한 군주' : pov === 'sayuksin' ? '고독한 충신' : pov === 'kimjil' ? '살고픈 배신자' : '진실의 수호자'}의 심장 속으로 들어갑니다.`,
      [{ label: "▶ 수사 동기화 시작", action: () => startNode() }]
    );
  } else {
    engine.log('system', '⚠️ 이 시점은 아직 복구되지 않았습니다.');
  }
};
