/* ============================================================
   audio.js — Web Audio API 電影特效音效引擎（純音效，無語音朗讀）
   ============================================================ */

export const AudioEngine = (() => {
  let ctx = null;
  let sfxEnabled = true;

  function ensureCtx() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) ctx = new AC();
    }
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    return ctx;
  }

  function setSfx(on) { sfxEnabled = !!on; }
  function getSfx() { return sfxEnabled; }

  // ---- Synthesized Movie & Game SFX ----
  function playTone(freq, duration, type = 'sine', vol = 0.16, slideTo = null, delay = 0) {
    if (!sfxEnabled) return;
    const c = ensureCtx();
    if (!c) return;
    const now = c.currentTime + delay;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (slideTo) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, slideTo), now + duration);
    }
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(vol, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  function playNoise(duration, vol = 0.25, cutoff = 700, delay = 0) {
    if (!sfxEnabled) return;
    const c = ensureCtx();
    if (!c) return;
    const now = c.currentTime + delay;
    const bufferSize = Math.floor(c.sampleRate * duration);
    const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 1.4);
    }
    const noise = c.createBufferSource();
    noise.buffer = buffer;
    const filter = c.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(cutoff, now);
    filter.frequency.exponentialRampToValueAtTime(100, now + duration);
    const gain = c.createGain();
    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(c.destination);
    noise.start(now);
  }

  const sfx = {
    click() {
      playTone(580, 0.06, 'triangle', 0.12, 820);
    },
    coin() {
      playTone(987, 0.09, 'sine', 0.16);
      playTone(1318, 0.16, 'sine', 0.16, null, 0.07);
    },
    laser() {
      playTone(1200, 0.16, 'sawtooth', 0.14, 180);
      playNoise(0.1, 0.08, 2200);
    },
    slash() {
      playTone(920, 0.12, 'sawtooth', 0.15, 220);
      playNoise(0.14, 0.18, 3000);
      playTone(1560, 0.08, 'triangle', 0.12, 600, 0.03);
    },
    explosion() {
      playNoise(0.55, 0.34, 480);
      playTone(120, 0.45, 'sawtooth', 0.22, 28);
    },
    shield() {
      playTone(320, 0.24, 'sine', 0.15, 680);
      playTone(480, 0.28, 'triangle', 0.12, 960, 0.05);
    },
    alarm() {
      playTone(760, 0.18, 'square', 0.12, 520, 0);
      playTone(760, 0.18, 'square', 0.12, 520, 0.22);
    },
    boing() {
      playTone(260, 0.22, 'sine', 0.18, 620);
    },
    wrong() {
      playTone(240, 0.16, 'sawtooth', 0.13, 160);
      playTone(180, 0.22, 'sawtooth', 0.13, 120, 0.14);
    },
    correct() {
      playTone(523, 0.1, 'triangle', 0.16, null, 0);
      playTone(659, 0.1, 'triangle', 0.16, null, 0.08);
      playTone(784, 0.12, 'triangle', 0.18, null, 0.16);
      playTone(1046, 0.24, 'triangle', 0.18, null, 0.24);
    },
    fanfare() {
      const notes = [523, 659, 784, 1046, 784, 1046];
      const delays = [0, 0.09, 0.18, 0.28, 0.42, 0.52];
      const durs = [0.1, 0.1, 0.1, 0.18, 0.1, 0.42];
      notes.forEach((n, i) => playTone(n, durs[i], 'triangle', 0.17, null, delays[i]));
    },
    rocket() {
      playNoise(0.9, 0.28, 900);
      playTone(110, 0.85, 'sawtooth', 0.16, 420);
    }
  };

  return {
    setSfx,
    getSfx,
    sfx
  };
})();
