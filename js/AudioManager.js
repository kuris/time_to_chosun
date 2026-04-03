// ══════════════════════════════
//  AudioManager.js
//  Web Audio API 기반 효과음 합성
//  외부 파일 의존 없이 브라우저에서 직접 생성
// ══════════════════════════════

export class AudioManager {
  constructor() {
    this._ctx = null;
    this._unlocked = false;

    // 첫 사용자 제스처(클릭)에 AudioContext 활성화
    document.addEventListener('click', () => this._unlock(), { once: true });
  }

  _unlock() {
    if (this._unlocked) return;
    this._ctx = new (window.AudioContext || window.webkitAudioContext)();
    this._unlocked = true;
  }

  _ctx_safe() {
    if (!this._ctx) {
      this._ctx = new (window.AudioContext || window.webkitAudioContext)();
      this._unlocked = true;
    }
    if (this._ctx.state === 'suspended') this._ctx.resume();
    return this._ctx;
  }

  play(name) {
    try {
      switch (name) {
        case 'paper':  this._paper();  break;
        case 'type':   this._type();   break;
        case 'clue':   this._clue();   break;
        case 'solve':  this._solve();  break;
        case 'click':  this._click();  break;
        case 'siren':  this._siren();  break;
      }
    } catch(e) { /* 자동재생 정책 에러 무시 */ }
  }

  // ─────────────────────────────
  //  신문 넘기는 소리
  //  — 짧은 화이트 노이즈 버스트 + 피치 스윕
  // ─────────────────────────────
  _paper() {
    const ctx = this._ctx_safe();
    const duration = 0.35;

    // 버퍼 노이즈 생성
    const bufLen  = Math.floor(ctx.sampleRate * duration);
    const buffer  = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const data    = buffer.getChannelData(0);
    for (let i = 0; i < bufLen; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufLen, 1.8);
    }

    const src    = ctx.createBufferSource();
    src.buffer   = buffer;

    // 대역통과 필터 (바스락 질감)
    const bpf         = ctx.createBiquadFilter();
    bpf.type          = 'bandpass';
    bpf.frequency.value = 3500;
    bpf.Q.value       = 0.8;

    // 볼륨 엔벨로프
    const gain        = ctx.createGain();
    const t           = ctx.currentTime;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.55, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    src.connect(bpf);
    bpf.connect(gain);
    gain.connect(ctx.destination);
    src.start(t);
    src.stop(t + duration);
  }

  // ─────────────────────────────
  //  타자기 타이핑 소리
  //  — 낮고 묵직한 기계식 타격음 (노이즈 + 저역 공명)
  // ─────────────────────────────
  _type() {
    const ctx = this._ctx_safe();
    const t   = ctx.currentTime;

    // 1) 짧은 임팩트 노이즈 (기계 타격)
    const bufLen = Math.floor(ctx.sampleRate * 0.06);
    const buffer = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const data   = buffer.getChannelData(0);
    for (let i = 0; i < bufLen; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufLen, 3);
    }
    const noiseSrc = ctx.createBufferSource();
    noiseSrc.buffer = buffer;

    const lpf         = ctx.createBiquadFilter();
    lpf.type          = 'lowpass';
    lpf.frequency.value = 2200;

    const noiseGain   = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.25, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.055);

    noiseSrc.connect(lpf);
    lpf.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noiseSrc.start(t);

    // 2) 저역 공명 (바디감)
    const body  = ctx.createOscillator();
    const bodyG = ctx.createGain();
    body.type   = 'triangle';
    body.frequency.setValueAtTime(110, t);
    body.frequency.exponentialRampToValueAtTime(60, t + 0.05);
    bodyG.gain.setValueAtTime(0.12, t);
    bodyG.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
    body.connect(bodyG);
    bodyG.connect(ctx.destination);
    body.start(t);
    body.stop(t + 0.07);
  }

  // ─────────────────────────────
  //  단서 발견 소리
  //  — 물방울 느낌의 상승 핑
  // ─────────────────────────────
  _clue() {
    const ctx = this._ctx_safe();
    const t   = ctx.currentTime;

    [0, 0.07].forEach((delay, i) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      const baseFreq = i === 0 ? 880 : 1320;
      osc.frequency.setValueAtTime(baseFreq, t + delay);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, t + delay + 0.25);

      gain.gain.setValueAtTime(0.28, t + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t + delay);
      osc.stop(t + delay + 0.5);
    });
  }

  // ─────────────────────────────
  //  사건 해결 소리
  //  — 3화음 웅장한 벨 코드
  // ─────────────────────────────
  _solve() {
    const ctx   = this._ctx_safe();
    const t     = ctx.currentTime;
    const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5-E5-G5-C6

    freqs.forEach((freq, i) => {
      const delay = i * 0.08;

      const osc    = ctx.createOscillator();
      const gain   = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.value = freq;

      gain.gain.setValueAtTime(0, t + delay);
      gain.gain.linearRampToValueAtTime(0.25, t + delay + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 2.5);

      // 배음 추가 (풍성함)
      const osc2   = ctx.createOscillator();
      const gain2  = ctx.createGain();
      osc2.type    = 'triangle';
      osc2.frequency.value = freq * 2;
      gain2.gain.setValueAtTime(0.08, t + delay);
      gain2.gain.exponentialRampToValueAtTime(0.001, t + delay + 1.5);

      osc.connect(gain);   gain.connect(ctx.destination);
      osc2.connect(gain2); gain2.connect(ctx.destination);
      osc.start(t + delay);  osc.stop(t + delay + 3);
      osc2.start(t + delay); osc2.stop(t + delay + 2);
    });
  }

  // ─────────────────────────────
  //  UI 클릭 소리
  //  — 짧고 낮은 클릭
  // ─────────────────────────────
  _click() {
    const ctx = this._ctx_safe();
    const t   = ctx.currentTime;

    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(180, t);
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.06);

    gain.gain.setValueAtTime(0.22, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.08);
  }

  // ─────────────────────────────
  //  빈티지 경보 사이렌
  //  — 시대 착륙 시 재생 (호외·비상사태 느낌)
  //    낮은 주파수 2회 스윕 + 라디오 잡음 레이어
  // ─────────────────────────────
  _siren() {
    const ctx = this._ctx_safe();
    const t   = ctx.currentTime;

    // 마스터 볼륨 (너무 크면 게임 분위기 깸)
    const master = ctx.createGain();
    master.gain.value = 0.30;
    master.connect(ctx.destination);

    // 확성기·라디오 질감용 밴드패스
    const bpf         = ctx.createBiquadFilter();
    bpf.type          = 'bandpass';
    bpf.frequency.value = 900;
    bpf.Q.value       = 0.6;
    bpf.connect(master);

    // 사이렌 2회 스윕
    const sweepDur = 0.85;
    for (let i = 0; i < 2; i++) {
      const off = i * sweepDur;
      const osc = ctx.createOscillator();
      const env = ctx.createGain();
      osc.type  = 'sawtooth';

      osc.frequency.setValueAtTime(260,  t + off);
      osc.frequency.linearRampToValueAtTime(500, t + off + sweepDur * 0.45);
      osc.frequency.linearRampToValueAtTime(260, t + off + sweepDur * 0.88);

      env.gain.setValueAtTime(0,   t + off);
      env.gain.linearRampToValueAtTime(1.0,  t + off + 0.07);
      env.gain.setValueAtTime(1.0, t + off + sweepDur - 0.1);
      env.gain.linearRampToValueAtTime(0,   t + off + sweepDur);

      osc.connect(env);
      env.connect(bpf);
      osc.start(t + off);
      osc.stop(t + off + sweepDur);
    }

    // 배경 라디오 잡음 (아주 미세하게)
    const totalLen = Math.floor(ctx.sampleRate * 1.8);
    const nBuf     = ctx.createBuffer(1, totalLen, ctx.sampleRate);
    const nData    = nBuf.getChannelData(0);
    for (let i = 0; i < totalLen; i++) nData[i] = (Math.random() * 2 - 1) * 0.05;
    const nSrc  = ctx.createBufferSource();
    nSrc.buffer = nBuf;
    const nGain = ctx.createGain();
    nGain.gain.value = 0.5;
    nSrc.connect(nGain);
    nGain.connect(master);
    nSrc.start(t);
  }
}
