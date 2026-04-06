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
            engine.log('story', '독한 소주가 목을 타고 넘어갑니다. 술의 열기가 머릿속의 복잡한 번뇌를 태워버립니다. 조카의 슬픈 눈망울이 스쳐 가지만, 당신은 그 눈빛을 어둠 속으로 밀어 넣습니다. 왕이 되려는 자에게 자비는 사치입니다.');
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
            engine.log('story', '국고를 열어 공신들을 돈과 땅으로 묶어둡니다. 그들의 입은 금사로 꿰맸지만, 백성들의 원성은 담 너머로 커져만 가니다.');
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
            engine.log('story', '밤새도록 편지를 씁니다. "조선을 위해 어쩔 수 없는 선택이었다"고 항변해보지만, 돌아오는 것은 싸늘한 침묵과 경멸뿐입니다.');
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
          { label: "▶ 가혹한 처형으로 기를 꺾하겠다 명령한다.", action: () => {
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
        engine.log('story', '붓끝에 먹을 찍다 문득 멈춥니다. 세종대왕께서 나를 믿고 어린 손자(단종)를 부탁하셨건만, 수양대군이 기어이 옥좌를 찬탈했습니다. 춘추관의 어둠 속에서 당신은 홀로 눈물을 삼킵니다. 사초에 적히는 글자 하나하나가 망국의 비명처럼 느껴집니다.');
        engine.log('inner', '“글은 역사를 기록하지만, 칼은 역사를 바꾼다. 성군 세종의 꿈이 정녕 이렇게 무너져야 하는가.”');
        engine.showChoices([
          { label: "▶ 박팽년 등 뜻을 같이하는 동료들을 모은다.", action: () => {
            engine.modifyStat('stress', +10);
            engine.log('story', '당신은 은밀히 동료들에게 서신을 보냅니다. 죽음을 각오한 이들이 하나둘 그림자 속에서 나타납니다. 촛불조차 숨죽인 밤, 거사의 싹이 틉니다.');
            next('vow');
          }},
          { label: "▶ 일단 왕의 곁에서 기회를 엿본다.", action: () => {
            engine.modifyStat('mental', -10);
            engine.log('story', '당신은 수양의 신하가 된 척하며 굴욕을 견딥니다. 술잔을 들 때마다 손이 떨리지만, 복수를 위해 참아냅니다. 하지만 거울 속의 당신은 점차 낯설어집니다.');
            next('vow');
          }}
        ]);
      },
      vow: () => {
        engine.log('time', '[ 2 챕터 — 피로 쓴 맹세 ]');
        engine.log('story', '백악산 기슭 어느 낡은 정자. 거사를 도모하는 6명의 학사가 모였습니다. 누군가는 두려움에 떨고, 누군가는 분노에 차 있습니다. 당신은 정적을 깨고 은장도를 꺼내 손가락을 찌릅니다. 흰 비단 위에 붉은 선이 그어집니다.');
        engine.log('inner', '“이 피가 조선의 정의를 되살릴 수 있다면, 천 번이라도 흘리리라. 죽음은 두렵지 않으나 뜻을 이루지 못할까 그것이 두렵다.”');
        engine.showChoices([
          { label: "▶ 가장 먼저 혈서에 서명하며 동료들을 독려한다.", action: () => {
            engine.modifyStat('mental', +15);
            engine.addClue('bloody_vow', '학사들의 혈서', '죽음을 두려워하지 않는 6인 학사의 맹세가 서린 비단입니다.');
            next('secret_garden');
          }},
          { label: "▶ 신중하게 주변의 동태를 살피며 맹세한다.", action: () => {
            engine.modifyStat('stress', +5);
            next('secret_garden');
          }}
        ]);
      },
      secret_garden: () => {
        engine.log('time', '[ 3 챕터 — 비밀의 정원, 엇갈린 술잔 ]');
        engine.log('story', '박팽년과 함께 후원을 거닙니다. 그는 당신에게 묻습니다. "삼문, 만약 우리가 실패한다면 역사는 우리를 무엇이라 부를까." 당신은 대답 대신 떨어지는 낙조를 바라봅니다. 이미 돌아갈 길은 끊어졌습니다.');
        engine.log('inner', '역사는 승자의 기록일지 모르나, 우리의 진심은 하늘이 알 것이다.');
        engine.showChoices([
          { label: "▶ \"역적이라 불려도 좋으니 주상만은 구하자\" 대답한다.", action: () => {
            engine.modifyStat('mental', +10);
            next('slave_of_crown');
          }},
          { label: "▶ 침묵으로 그와 잔을 나누며 결의를 다진다.", action: () => {
            engine.modifyStat('stamina', -10);
            next('slave_of_crown');
          }}
        ]);
      },
      slave_of_crown: () => {
        engine.log('time', '[ 4 챕터 — 면학의 서늘함, 굴욕의 기록 ]');
        engine.log('story', '당신은 수양(세조)의 어명으로 집현전을 해체하고 새로운 관직을 받는 서류를 작성해야 합니다. 원수인 자를 위해 붓을 드는 고통은 인두로 살을 지지는 것보다 가혹합니다. 수양은 당신의 재능을 아낀다며 미소 짓지만, 그 눈빛은 뱀처럼 차갑습니다.');
        engine.log('inner', '“내 손이 이토록 무거운 것은 죄책감 때문인가, 아니면 복수의 칼날 때문인가.”');
        engine.showChoices([
          { label: "▶ 굴욕을 견디며 정성껏 서류를 작성해 방심을 유도한다.", action: () => {
            engine.modifyStat('mental', -15);
            next('palace_spy');
          }},
          { label: "▶ 일부러 글씨를 거칠게 써서 불편한 기색을 내비친다.", action: () => {
            engine.modifyStat('stress', +15);
            next('palace_spy');
          }}
        ]);
      },
      palace_spy: () => {
        engine.log('time', '[ 5 챕터 — 사신의 연회, 비수를 갈다 ]');
        engine.log('story', '거사일이 확정되었습니다. 명나라 사신의 연회 날, 당신의 동료 유응부가 운검(왕의 호위검)을 잡기로 했습니다. 수양의 목을 칠 수 있는 단 한 번의 기회입니다. 당신은 연회장의 배치도를 머릿속에 그리며 비수를 품습니다.');
        engine.log('inner', '한명회의 눈빛이 날카롭다. 그는 본능적으로 피 냄새를 맡는 인간이다. 들켜서는 안 된다.');
        engine.showChoices([
          { label: "▶ 태연하게 연회 준비를 도우며 유응부와 눈을 맞춘다.", action: () => {
             engine.modifyStat('mental', +5);
             next('failed_attempt');
          }},
          { label: "▶ 일부러 취한 척 연기하며 사람들의 시선을 따돌린다.", action: () => {
             engine.modifyStat('stamina', -15);
             next('failed_attempt');
          }}
        ]);
      },
      failed_attempt: () => {
        engine.log('time', '[ 6 챕터 — 멈춰버린 운검, 틀어진 계획 ]');
        engine.log('story', '연회 당일, 갑자기 한명회의 건의로 세조가 운검의 출입을 금지했습니다! 거사를 실행할 무력의 중심이 잘려나갔습니다. 박팽년은 "오늘이 아니면 안 된다"며 지금이라도 강행하자고 눈짓을 보냅니다. 당신의 심장이 터질 듯 요동칩니다.');
        engine.showChoices([
          { label: "▶ 무리해서라도 오늘 단검을 휘두르자며 신호를 보낸다.", action: () => {
             engine.modifyStat('stress', +20);
             engine.log('story', '하지만 유응부가 고개를 저으며 만류합니다. 기회는 신기루처럼 사라지고, 차가운 공포만이 자리를 메웁니다.');
             next('betrayal_jil');
          }},
          { label: "▶ 훗날을 기약하며 후퇴를 전달한다.", action: () => {
             engine.modifyStat('mental', -10);
             engine.log('story', '당신의 판단으로 거사는 연기되었습니다. 하지만 이 결정이 어떤 비극을 가져올지 그땐 알지 못했습니다.');
             next('betrayal_jil');
          }}
        ]);
      },
      betrayal_jil: () => {
        engine.log('time', '[ 7 챕터 — 등 뒤를 찌른 밀고 ]');
        engine.log('story', '거사가 어긋나자, 공포에 사로잡힌 동료 김질이 당신을 배신하고 수양에게 달려갔다는 첩보가 들어옵니다. 당신의 집 주변에 군졸들이 깔리기 시작합니다. 당신의 등 뒤를 지켜주어야 할 동료가 이제는 당신의 심장에 칼을 겨눕니다.');
        engine.log('inner', '“지키고 싶었던 조선이, 믿었던 동료의 입에서 무너져 내리는구나.”');
        engine.showChoices([
          { label: "▶ 도망치지 않고 당당히 의복을 갖춰 입고 기다린다.", action: () => {
             engine.modifyStat('mental', +20);
             next('torture_chamber');
          }},
          { label: "▶ 단종이 계신 영월을 향해 마지막 절을 올린다.", action: () => {
             engine.modifyStat('stress', +10);
             next('torture_chamber');
          }}
        ]);
      },
      torture_chamber: () => {
        engine.log('time', '[ 8 챕터 — 뜨거운 인두, 타오르는 절개 ]');
        engine.log('story', '당신은 국문장으로 끌려갔습니다. 세조가 직접 내려와 쇠인두를 달구며 묻습니다. "삼문아, 너는 어찌하여 나를 배신하느냐? 내가 너를 그토록 아꼈거늘!" 당신은 발갛게 달아오른 인두를 바라보며 조용히 웃음을 터뜨립니다.');
        engine.log('inner', '다리가 부러지고 살이 타는 냄새가 진동하지만, 내 마음속의 소나무는 더욱 푸르게 빛난다.');
        engine.showChoices([
          { label: "▶ \"수양, 너는 나의 왕이 아니다!\" 정면으로 일갈한다.", action: () => {
             engine.modifyStat('mental', +30);
             next('family_farewell');
          }},
          { label: "▶ 세종대왕의 고명을 읊으며 그의 추악한 욕심을 꾸짖는다.", action: () => {
             engine.modifyStat('stress', +20);
             next('family_farewell');
          }}
        ]);
      },
      family_farewell: () => {
        engine.log('time', '[ 9 챕터 — 마지막 밤, 핏줄의 눈물 ]');
        engine.log('story', '옥사로 찾아온 아들과 마주합니다. 어린 아들은 울먹이며 묻습니다. "아버지, 꼭 그래야만 하셨습니까." 당신은 아들을 안아주고 싶지만 묶인 손이 허락하지 않습니다. 당신의 죽음으로 가문이 몰락할 것을 알기에, 당신의 심장은 갈가리 찢깁니다.');
        engine.log('inner', '아들아, 부디 이 아비를 원망하라. 그러나 부끄러워하지는 마라.');
        engine.showChoices([
          { label: "▶ 아들에게 굳건한 선비의 길을 당부한다.", action: () => {
             engine.modifyStat('mental', +10);
             next('last_poem');
          }},
          { label: "▶ 미안하다는 말 대신 뜨거운 눈물을 삼킨다.", action: () => {
             engine.modifyStat('stress', +25);
             next('last_poem');
          }}
        ]);
      },
      last_poem: () => {
        engine.log('time', '[ 10 챕터 — 처형장의 메아리, 절명시 ]');
        engine.log('story', '처형장으로 향하는 길. 수레 위에서 당신은 수천 명의 백성과 마주합니다. 어떤 이는 울고, 어떤 이는 고개를 돌립니다. 당신은 수레 위에서 붓을 들고 마지막 시를 짓습니다. "북소리 둥둥 울려 목숨을 재촉하는데..."');
        engine.showChoices([
          { label: "▶ 백이숙제의 충절을 담아 마지막 구절을 짓는다.", action: () => {
             engine.addClue('sam_poem', '성삼문의 절명시', '죽음 앞에서도 의연했던 충신 기개가 담긴 마지막 시입니다.');
             next('ending');
          }}
        ]);
      },
      ending: () => {
        engine.log('time', '[ 11 챕터 — 영원한 충절의 소나무 ]');
        engine.log('story', '차가운 칼끝이 당신의 목을 지납니다. 당신의 육신은 한 줌 흙이 되었으나, 당신의 이름은 수백 년이 지나도록 변치 않는 충절의 상징으로 남았습니다. 후세의 선비들은 당신을 보며 권력이 아닌 진리를 쫓는 법을 배울 것입니다.');
        solveCase('danjong_multi', '만고강산에 홀로 푸른 소나무', ['성삼문의 충절'], '성삼문으로서 당신은 권력이라는 거대한 폭풍 앞에서도 꺾이지 않는 소나무처럼 정의를 지켜냈습니다.');
      }
    },

    // ──────────────────────────────────────────────────
    //  3. 김질 (배신의 고뇌)
    // ──────────────────────────────────────────────────
    kimjil: {
      start: () => {
        engine.log('time', '[ 1 챕터 — 밤의 불청객, 성삼문 ]');
        engine.log('story', '장인인 정창손의 집, 그리고 찾아온 성삼문. 그가 내뱉는 말들은 하나하나가 당신의 심장을 조여옵니다. "질아, 수양을 몰아내고 노산군을 다시 옹립하세. 자네도 함께 하겠는가?" 그의 눈빛은 너무나 맑아서, 당신의 어두운 두려움이 더욱 선명하게 드러납니다.');
        engine.log('inner', '“이것은 미친 짓이다. 아니면 영웅의 길인가. 무엇을 선택해도 내 앞날은 핏빛이겠구나.”');
        engine.showChoices([
          { label: "▶ 떨리는 손을 숨기며 맹세에 참여한다.", action: () => {
            engine.modifyStat('stress', +15);
            engine.log('story', '당신은 고개를 끄덕입니다. 하지만 당신의 머릿속에는 거사의 대의보다 실패했을 때 닥칠 처형장의 칼날이 먼저 떠오릅니다. 당신의 침묵은 동의가 아니라 공포의 결빙입니다.');
            next('domestic_fear');
          }},
          { label: "▶ 모호한 대답으로 일단 상황을 회피하려 한다.", action: () => {
            engine.modifyStat('mental', -10);
            engine.log('story', '당신은 횡설수설하며 확답을 피합니다. 하지만 성삼문은 당신의 손을 꼭 잡으며 믿는다고 말합니다. 그 믿음이 당신의 목을 조르는 밧줄처럼 느껴집니다.');
            next('domestic_fear');
          }}
        ]);
      },
      domestic_fear: () => {
        engine.log('time', '[ 2 챕터 — 잠들지 못하는 가택 ]');
        engine.log('story', '집으로 돌아온 당신. 등불 아래에서 바느질하는 아내와 소리 없이 잠든 아이들의 얼굴을 봅니다. 이 거사가 잘못된다면, 이 평화로운 풍경은 순식간에 시체 더미로 변할 것입니다. 당신은 방구석에서 헛구역질을 하며 밤을 지샙니다.');
        engine.log('inner', '나 하나 죽는 것은 두렵지 않다. 하지만 내 처자는? 내 가문은? 왜 성삼문은 나에게 이런 잔인한 짐을 지웠나.');
        engine.showChoices([
          { label: "▶ 아내를 붙잡고 울먹이며 불안을 쏟아낸다.", action: () => {
            engine.modifyStat('mental', -20);
            engine.log('story', '아내는 당신의 손을 잡고 말합니다. "무슨 일인지 모르나, 오직 우리 가족만 생각하세요." 그 말이 당신의 마음속에 배신의 씨앗을 심습니다.');
            next('whispers_of_walls');
          }},
          { label: "▶ 거사의 자료를 남몰래 불태우며 증거를 없앤다.", action: () => {
            engine.modifyStat('stress', +20);
            engine.log('story', '종이가 타들어 가는 냄새가 온 집안에 진동합니다. 당신은 이미 마음속으로 동료들을 버리기 시작했습니다.');
            next('whispers_of_walls');
          }}
        ]);
      },
      whispers_of_walls: () => {
        engine.log('time', '[ 3 챕터 — 담장 밑의 속삭임 ]');
        engine.log('story', '거사 전날, 길을 걷던 당신은 우연히 포도청 군졸들이 집현전 주변을 살피는 것을 봅니다. 그저 우연일 수 있으나, 죄지은 자의 눈에는 모든 것이 함정입니다. 바람 소리조차 당신의 이름을 부르는 고발자의 목소리처럼 들립니다.');
        engine.log('inner', '“이미 들긴 것인가? 아니면 누군가 먼저 밀고한 것인가? 내가 먼저 움직이지 않으면 우리 가문은 끝이다.”');
        engine.showChoices([
          { label: "▶ 공포에 질려 즉시 장인 정창손의 집으로 달려간다.", action: () => {
            engine.modifyStat('stress', +10);
            next('interrogate_jil');
          }},
          { label: "▶ 마지막까지 양심을 지키려 애쓰며 술로 고통을 잊는다.", action: () => {
            engine.modifyStat('stamina', -20);
            next('interrogate_jil');
          }}
        ]);
      },
      interrogate_jil: () => {
        engine.log('time', '[ 4 챕터 — 장인 정창손의 유혹 ]');
        engine.log('story', '장인 정창손이 당신의 사백색으로 질린 얼굴을 빤히 쳐다봅니다. "질아, 거동이 수상하구나. 무언가 숨기는 것이 있느냐? 그것이 너와 나의 가문을 몰살시킬 일은 아니겠지?" 그의 목소리는 달콤하면서도 위협적입니다.');
        engine.log('inner', '장인어른조차 눈치챘다. 더 이상 숨길 곳이 없다. 누군가에게 말해야 살 수 있다. 아니, 말해야만 우리 가문의 대를 이을 수 있다.');
        engine.showChoices([
          { label: "▶ 장인에게 울며 모든 비밀을 털어놓는다.", action: () => {
             engine.log('story', '정창손의 눈이 번쩍입니다. "잘 생각했다! 죽은 충신보다 살아남은 배신자가 더 강한 법이다. 지금 당장 수양대군에게 가자."');
             next('palace_gate');
          }},
          { label: "▶ 끝까지 아니라고 시치미를 떼며 버틴다.", action: () => {
             engine.modifyStat('stress', +30);
             engine.log('story', '하지만 정창손은 당신의 멱살을 잡습니다. "멍청한 놈! 네가 죽으면 네 자식들은 어쩌려고 그러느냐!" 결국 당신은 무너집니다.');
             next('palace_gate');
          }}
        ]);
      },
      palace_gate: () => {
        engine.log('time', '[ 5 챕터 — 운명의 궁궐 정문, 광화문 ]');
        engine.log('story', '밤이 깊어가는 광화문 앞. 차가운 공기가 폐부를 찌릅니다. 지금 이 문을 들어가 성삼문을 밀고하면 당신은 살 수 있습니다. 하지만 당신은 영원히 친구의 피를 손에 묻힌 배신자로 역사에 박제될 것입니다.');
        engine.log('inner', '발걸음이 돌덩이처럼 무겁다. 이 문 너머엔 비겁한 생존이 있고, 이 문 뒤엔 고결한 죽음이 있다. 나는... 나는 살고 싶다.');
        engine.showChoices([
          { label: "▶ 당당히 문지기에게 성명을 밝히고 밀고를 시작한다.", action: () => {
            engine.addClue('informer_list', '김질의 밀고 내용', '성삼문 일당의 거사 계획을 구체적으로 받아 적은 내관의 기록입니다.');
            next('confession_sejo');
          }},
          { label: "▶ 끝내 발길을 돌려 도망치려다 붙잡힌다.", action: () => {
             engine.log('story', '장인 정창손이 당신의 옷자락을 낚아챕니다. "이 머저리 같은 놈! 가문을 살려야지!" 그는 당신을 끌고 무작정 대궐로 들어갑니다.');
             next('confession_sejo');
          }}
        ]);
      },
      confession_sejo: () => {
        engine.log('time', '[ 6 챕터 — 흘리는 눈물, 차가운 옥좌 ]');
        engine.log('story', '세조 앞에 엎드린 당신의 온몸이 촛불처럼 떨립니다. 당신은 흐느끼며 성삼문의 계획, 숨겨둔 칼날, 혈서의 위치를 낱낱이 고백합니다. 세조는 의외로 차분한 목소리로 묻습니다. "질아, 너는 어찌하여 이제야 왔느냐?" 그 목소리가 사형 선고보다 더 무겁게 내려앉습니다.');
        engine.log('inner', '내 입 밖으로 나온 말들이 화살이 되어 친구들의 가슴으로 향한다. 나는 이제 사람이 아니라, 그저 짖어대는 개가 되었구나.');
        engine.showChoices([
          { label: "▶ 머리를 바닥에 찧으며 자손만은 살려달라 빈다.", action: () => {
            engine.modifyStat('mental', -30);
            next('the_aftermath');
          }}
        ]);
      },
      the_aftermath: () => {
        engine.log('time', '[ 7 챕터 — 친구들의 절규, 영혼의 파멸 ]');
        engine.log('story', '며칠 뒤, 성삼문과 박팽년 등이 국문장으로 끌려갑니다. 당신은 세조의 옆자리에서 그 광경을 지켜보는 굴욕적인 특권을 얻었습니다. 성삼문은 당신을 향해 외칩니다. "질아! 네가 어찌 그 자리에 있느냐! 네가 정녕 사람의 자식이냐!" 당신은 차마 고개를 들지 못하고 손톱이 살을 파고들도록 움켜쥐었습니다.');
        engine.showChoices([
          { label: "▶ 죄책감을 이기지 못하고 그 자리에서 실신한다.", action: () => {
            engine.modifyStat('stamina', -30);
             next('hollow_reward');
          }},
          { label: "▶ 일부러 냉정한 척하며 성삼문의 말을 무시한다.", action: () => {
            engine.modifyStat('mental', -25);
             next('hollow_reward');
          }}
        ]);
      },
      hollow_reward: () => {
        engine.log('time', '[ 8 챕터 — 가시 돋친 작위, 피 묻은 금포 ]');
        engine.log('story', '거사를 막은 공으로 당신은 정원공신 2등에 책록되고 고위 관직에 오릅니다. 금과 옥으로 치장된 옷을 입고 가문의 축하 속에 앉아있지만, 당신의 귀에는 여전히 성삼문의 비명소리가 들려옵니다. 하사받은 고기에서는 친구들의 살 냄새가 나는 듯합니다.');
        engine.log('inner', '“생존은 이토록 비린내 나는 것인가. 나는 왕을 지킨 영웅인가, 아니면 영혼을 판 상인인가.”');
        engine.showChoices([
          { label: "▶ 받은 재물을 아낌없이 시주하며 면죄부를 구한다.", action: () => {
            engine.modifyStat('money', -50);
            engine.modifyStat('mental', +10);
            next('aging_coward');
          }},
          { label: "▶ 더욱 권력에 집착하며 자신을 정당화한다.", action: () => {
            engine.modifyStat('stress', +25);
            next('aging_coward');
          }}
        ]);
      },
      aging_coward: () => {
        engine.log('time', '[ 9 챕터 — 노년의 그림자, 배신의 낙인 ]');
        engine.log('story', '수십 년의 세월이 흘러 당신은 높은 벼슬에 올랐습니다. 하지만 당신이 지날 때마다 사람들은 눈길을 피하며 수군거립니다. "저자가 친구를 판 김질이라지." 자식들은 출세했으나, 당신의 이름은 가문의 수치가 되었습니다. 죽지도 못한 채 당신은 공포와 경멸 속에서 늙어갑니다.');
        engine.showChoices([
          { label: "▶ 마지막 사초를 작성하는 사관을 불러 기록을 빼달라 애걸한다.", action: () => next('ending') }
        ]);
      },
      ending: () => {
        engine.log('time', '[ 10 챕터 — 사료에 남겨질 영원한 배신자 ]');
        engine.log('story', '당신은 부귀영화 속에 장수했습니다. 하지만 당신의 이름 앞에는 영원히 "변절"과 "배신"이라는 주홍글씨가 새겨졌습니다. 당신이 지키려 했던 가족들은 살아남았으나, 당신의 명예는 영겁의 세월 동안 지옥의 불꽃 속에서 타오를 것입니다.');
        solveCase('danjong_multi', '살기 위해 의리를 버린 대가', ['김질의 배신'], '김질로서 당신은 생존이라는 본능적인 길을 선택했고, 그 결과 역사의 가장 아픈 기록으로 남게 되었습니다.');
      }
    },

    // ──────────────────────────────────────────────────
    //  4. 사관 (기록의 딜레마)
    // ──────────────────────────────────────────────────
    historian: {
      start: () => {
        engine.log('time', '[ 1 챕터 — 춘추관의 먼지 향기 ]');
        engine.log('story', '춘추관의 문을 열자 오래된 한지 냄새와 묵향이 당신을 맞이합니다. 당신은 역사라는 거대한 거울 앞에 선 파수꾼입니다. 계유정난 이후 궁궐의 공기는 얼어붙었지만, 당신의 붓끝은 누구보다 뜨겁게 타올라야 합니다. 오늘 적는 한 줄이 백 년 뒤의 진실이 될 것이기에.');
        engine.log('inner', '보이지 않는 곳에서 왕을 심판하는 것, 그것이 사관의 운명이다. 나는 무엇을 남길 것인가.');
        engine.showChoices([
          { label: "▶ 목격한 수방의 참혹한 현장을 가감 없이 기록한다.", action: () => {
            engine.modifyStat('stress', +15);
            engine.log('story', '당신은 수양대군이 정적들을 죽이고 시신을 처리하는 방식을 낱낱이 사초에 적어 넣습니다. 붓대가 부러질 듯 힘이 들어갑니다. 이것이 당신이 할 수 있는 유일한 저항입니다.');
            next('blood_on_sacho');
          }},
          { label: "▶ 후세를 위해 비유와 은유로 진실을 교묘히 숨긴다.", action: () => {
             engine.modifyStat('mental', +10);
             engine.log('story', '당신은 직접적인 표현 대신 "비바람이 몰아쳐 고목이 꺾였다"는 식의 비유를 사용합니다. 아는 자만이 읽을 수 있는 슬픈 암호입니다.');
             next('blood_on_sacho');
          }}
        ]);
      },
      blood_on_sacho: () => {
        engine.log('time', '[ 2 챕터 — 사초에 묻은 핏자국 ]');
        engine.log('story', '어느 날 밤, 익명의 서신이 도달합니다. 성삼문 일당의 거사 계획이 담긴 비밀 사초입니다. 이것을 공식 기록에 넣는 순간, 당신은 역적의 공범이 될 수도 있습니다. 하지만 기록하지 않는 것은 사관으로서의 죽음과 같습니다.');
        engine.log('inner', '“붓은 칼보다 약하지만, 칼은 붓이 쓴 이름을 결코 지우지 못한다.”');
        engine.showChoices([
          { label: "▶ 목숨을 걸고 거사 계획을 상세히 기록한다.", action: () => {
            engine.modifyStat('stress', +20);
            next('the_censor_han');
          }},
          { label: "▶ 일단 기록을 보류하고 상황을 더 지켜본다.", action: () => {
             engine.modifyStat('mental', -10);
             next('the_censor_han');
          }}
        ]);
      },
      the_censor_han: () => {
        engine.log('time', '[ 3 챕터 — 한명회의 서늘한 방문 ]');
        engine.log('story', '권력의 설계자 한명회가 춘추관을 찾아왔습니다. 그는 당신이 쓴 어제의 기록을 보여달라 요구합니다. 원래 사초는 임금도 볼 수 없는 것이 국법이나, 지금은 그 법이 칼날 아래 놓여 있습니다. 한명회의 눈은 당신의 심장을 꿰뚫어 보는 듯합니다.');
        engine.log('inner', '“이 글자가 지워지면 역사의 빈틈이 생길 것이다. 나는 이 붓대를 꺾지 않을 자신이 있는가.”');
        engine.showChoices([
          { label: "▶ 국법을 논하며 당당히 거절한다.", action: () => {
             engine.modifyStat('stress', +25);
             engine.log('story', '한명회는 헛웃음을 짓습니다. "목숨이 여러 개인 모양이군." 그는 다음을 기약하며 물러나지만, 당신의 등 뒤엔 식은땀이 흐릅니다.');
             next('face_of_tyrant');
          }},
          { label: "▶ 가짜로 조작한 사초를 보여주어 위기를 넘긴다.", action: () => {
             engine.modifyStat('mental', -15);
             engine.log('story', '진실을 지키기 위해 거짓을 행합니다. 한명회는 만족하며 돌아갔지만, 당신의 손은 부끄러움에 떨립니다.');
             next('face_of_tyrant');
          }}
        ]);
      },
      face_of_tyrant: () => {
        engine.log('time', '[ 4 챕터 — 폭군의 얼굴, 신하의 의무 ]');
        engine.log('story', '세조가 직접 당신을 부릅니다. 그는 옥좌에 비스듬히 앉아 묻습니다. "사관아, 너는 나를 무엇이라 적겠느냐? 나라를 구한 군주냐, 아니면 조카를 죽인 도적이냐?" 짧은 침묵 속에 당신의 생사가 결정될 순간입니다.');
        engine.showChoices([
          { label: "▶ \"역사가 전하를 판단할 것입니다\"라고 대답한다.", action: () => {
            engine.modifyStat('mental', +20);
            next('hidden_scrolls_jar');
          }},
          { label: "▶ 고개를 숙이고 아무 말도 하지 않는다.", action: () => {
            engine.modifyStat('stress', +15);
            next('hidden_scrolls_jar');
          }}
        ]);
      },
      hidden_scrolls_jar: () => {
        engine.log('time', '[ 5 챕터 — 땅속의 묵시록, 비밀의 항아리 ]');
        engine.log('story', '당신은 실록에 담을 수 없는 진짜 진실들을 따로 적어 항아리에 담습니다. 성삼문의 마지막 기개, 단종의 애처로운 죽음, 수양의 광기... 당신은 아무도 모르는 대나무 숲 깊은 곳에 이 항아리를 묻습니다. 수백 년 뒤의 후손들이 이 비명을 듣기를 빌며.');
        engine.showChoices([
          { label: "▶ 위치를 표시하지 않고 오직 하늘만이 알게 한다.", action: () => {
            engine.addClue('buried_history', '사관의 항아리', '부끄러운 시대를 살았던 사관이 훗날을 위해 숨겨둔 미공개 사초입니다.');
            next('ink_vs_blood_field');
          }}
        ]);
      },
      ink_vs_blood_field: () => {
        engine.log('time', '[ 6 챕터 — 국문장의 증언자, 먹물의 힘 ]');
        engine.log('story', '사육신의 국문 현장. 비명이 가득한 마당 구석에서 당신은 묵묵히 붓을 놀립니다. 성삼문의 마지막 일갈, 박팽년의 초연한 눈빛... 당신은 그 모든 것을 먹물 속에 가둡니다. 수양의 칼날은 기개를 베었으나, 당신의 붓은 그 기개를 불멸의 것으로 만듭니다.');
        engine.log('inner', '“내 심장은 두려움에 떨고 있지만, 내 붓끝은 누구보다 차갑고 정직해야 한다.”');
        engine.showChoices([
          { label: "▶ 살 타는 냄새 속에서도 끝까지 정자로 기록한다.", action: () => {
            engine.modifyStat('mental', +15);
            next('legacy_of_ink');
          }}
        ]);
      },
      legacy_of_ink: () => {
        engine.log('time', '[ 7 챕터 — 지워진 이름들, 되살아나는 문장 ]');
        engine.log('story', '세조가 단종을 복위시키려 했던 모든 이들의 기록을 세초(물에 씻어 지움)하라 명합니다. 춘추관 옆 개울물에 먹물이 검게 번져 나갑니다. 하지만 당신은 이미 수만 장의 사초를 머릿속에 외워두었습니다. 당신의 기억이 곧 살아있는 역사입니다.');
        engine.showChoices([
          { label: "▶ 밤마다 외운 내용들을 은밀히 다시 적어둔다.", action: () => {
            engine.modifyStat('stamina', -20);
            next('last_brush_old');
          }}
        ]);
      },
      last_brush_old: () => {
        engine.log('time', '[ 8 챕터 — 붓을 꺾지 않는 노병의 은퇴 ]');
        engine.log('story', '세월이 흘러 은퇴하는 날, 당신은 춘추관을 나섭니다. 당신의 손은 굽고 눈은 침침해졌으나, 당신이 쓴 실록은 금고 속에 안전히 보관되었습니다. 후배 사관에게 당신의 낡은 붓을 물려주며 말합니다. "두려워하되, 멈추지 마라."');
        engine.showChoices([
          { label: "▶ 미소를 지으며 무거운 짐을 내려놓는다.", action: () => next('ending') }
        ]);
      },
      ending: () => {
        engine.log('time', '[ 9 챕터 — 사라지지 않는 역사의 먹빛 ]');
        engine.log('story', '당신은 이름도 없이 사라졌으나 당신의 기록은 살아남아 유네스코 세계기록유산이 되었습니다. 권력자의 칼날은 녹슬어 사라졌으나, 당신의 먹빛은 수백 년이 지나도 선명하게 빛나며 오늘날 우리에게 진실을 말해주고 있습니다.');
        solveCase('danjong_multi', '붓끝으로 지켜낸 역사의 자존심', ['사관의 사초'], '사관으로서 당신은 권력의 협박 앞에서도 붓을 꺾지 않았고, 그 결과 조선의 정직한 역사를 후세에 물려주었습니다.');
      }
    }
  };

  if (nodes[pov]) {
    nodes[pov].start();
  } else {
    console.error(`Invalid POV for danjongStory: ${pov}`);
  }
};
