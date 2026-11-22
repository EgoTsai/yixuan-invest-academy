/* ============================================================
   sfx.js — Undertale 風格復古 8-bit 音效引擎（無語音朗讀）
   ============================================================ */

export const SFX = (() => {
  let ctx = null;
  let muted = false;

  function ensure() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) ctx = new AC();
    }
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    return ctx;
  }

  function tone(freq, dur, type = 'square', vol = 0.08, slideTo = null, delay = 0) {
    if (muted) return;
    const c = ensure();
    if (!c) return;
    const t0 = c.currentTime + delay;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (slideTo) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(25, slideTo), t0 + dur);
    }
    gain.gain.setValueAtTime(0.001, t0);
    gain.gain.linearRampToValueAtTime(vol, t0 + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  function noise(dur, vol = 0.2, cutoff = 520) {
    if (muted) return;
    const c = ensure();
    if (!c) return;
    const size = Math.floor(c.sampleRate * dur);
    const buf = c.createBuffer(1, size, c.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < size; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / size, 1.5);
    }
    const src = c.createBufferSource();
    src.buffer = buf;
    const filter = c.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(cutoff, c.currentTime);
    const gain = c.createGain();
    gain.gain.setValueAtTime(vol, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(c.destination);
    src.start();
  }

  // Distinct Undertale-style text blip per stickman speaker
  const speakerPitch = {
    green: 330,
    red: 245,
    yellow: 410,
    blue: 290,
    boss: 155,
    narrator: 260
  };

  return {
    setMuted(m) { muted = !!m; },
    isMuted() { return muted; },
    blip(speaker = 'narrator') {
      const base = speakerPitch[speaker] || 260;
      const jitter = (Math.random() - 0.5) * 26;
      tone(base + jitter, 0.038, 'square', 0.045);
    },
    select() {
      tone(520, 0.055, 'square', 0.08, 760);
    },
    page() {
      tone(380, 0.05, 'triangle', 0.08, 490);
    },
    hit() {
      noise(0.28, 0.25, 650);
      tone(160, 0.22, 'sawtooth', 0.16, 42);
    },
    explosion() {
      noise(0.65, 0.34, 420);
      tone(110, 0.52, 'sawtooth', 0.2, 26);
    },
    shield() {
      tone(392, 0.12, 'triangle', 0.11, 587, 0);
      tone(587, 0.18, 'triangle', 0.11, 880, 0.08);
    },
    gameover() {
      tone(330, 0.18, 'square', 0.09, null, 0);
      tone(294, 0.18, 'square', 0.09, null, 0.2);
      tone(262, 0.22, 'square', 0.09, null, 0.4);
      tone(196, 0.5, 'sawtooth', 0.1, 140, 0.64);
    },
    victory() {
      const notes = [523, 659, 784, 1046, 784, 1046];
      const delays = [0, 0.1, 0.2, 0.32, 0.48, 0.6];
      const durs = [0.09, 0.09, 0.11, 0.16, 0.1, 0.45];
      notes.forEach((n, i) => tone(n, durs[i], 'square', 0.09, null, delays[i]));
    }
  };
})();
