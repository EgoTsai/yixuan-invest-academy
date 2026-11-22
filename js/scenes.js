/* ============================================================
   scenes.js — 7 大電影級 HTML5 Canvas 互動動畫引擎
   60fps 粒子系統、火柴人、機甲小鐵、馬戲團波波、災難特效、火箭發射
   ============================================================ */

import { AudioEngine } from './audio.js';

function triggerShake(el) {
  if (!el) return;
  el.classList.remove('shake-active');
  void el.offsetWidth;
  el.classList.add('shake-active');
}

function setupCanvas(canvas) {
  const ctx = canvas.getContext('2d');
  let W = 800;
  let H = 450;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = Math.max(320, Math.floor(rect.width));
    H = Math.max(220, Math.floor(rect.height));
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  resize();
  window.addEventListener('resize', resize);

  return {
    ctx,
    getSize: () => ({ W, H }),
    cleanup: () => window.removeEventListener('resize', resize)
  };
}

// Reusable particle helper
function spawnBurst(particles, x, y, count, colors, speed = 5, size = 4) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const spd = (0.35 + Math.random() * 0.9) * speed;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * spd,
      vy: Math.sin(angle) * spd - 1.2,
      life: 1,
      decay: 0.015 + Math.random() * 0.025,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: size * (0.6 + Math.random() * 0.9)
    });
  }
}

function updateAndDrawParticles(ctx, particles, gravity = 0.12) {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += gravity;
    p.life -= p.decay;
    if (p.life <= 0) {
      particles.splice(i, 1);
      continue;
    }
    ctx.save();
    ctx.globalAlpha = Math.max(0, p.life);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// Reusable animated Stickman Hero ("阿火")
function drawStickman(ctx, x, y, scale, t, pose = 'idle', sword = false) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.strokeStyle = '#ff7a2f';
  ctx.fillStyle = '#ff7a2f';
  ctx.lineWidth = 6;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.shadowColor = '#ff7a2f';
  ctx.shadowBlur = 12;

  const bob = Math.sin(t * 6) * 3;
  // Head
  ctx.beginPath();
  ctx.arc(0, -48 + bob, 14, 0, Math.PI * 2);
  ctx.fill();

  // Body
  ctx.beginPath();
  ctx.moveTo(0, -34 + bob);
  ctx.lineTo(0, 2 + bob);
  ctx.stroke();

  // Legs
  const stride = pose === 'run' || pose === 'attack' ? Math.sin(t * 14) * 16 : 10;
  ctx.beginPath();
  ctx.moveTo(0, 2 + bob);
  ctx.lineTo(-stride, 34);
  ctx.moveTo(0, 2 + bob);
  ctx.lineTo(stride, 34);
  ctx.stroke();

  // Arms
  if (pose === 'attack') {
    ctx.beginPath();
    ctx.moveTo(0, -24 + bob);
    ctx.lineTo(28, -32 + bob);
    ctx.moveTo(0, -24 + bob);
    ctx.lineTo(-20, -10 + bob);
    ctx.stroke();
  } else if (pose === 'sad') {
    ctx.beginPath();
    ctx.moveTo(0, -24 + bob);
    ctx.lineTo(-14, -4 + bob);
    ctx.moveTo(0, -24 + bob);
    ctx.lineTo(14, -4 + bob);
    ctx.stroke();
  } else {
    const wave = Math.sin(t * 5) * 6;
    ctx.beginPath();
    ctx.moveTo(0, -24 + bob);
    ctx.lineTo(-20, -12 + wave);
    ctx.moveTo(0, -24 + bob);
    ctx.lineTo(22, -16 - wave);
    ctx.stroke();
  }

  // Golden Laser Sword
  if (sword) {
    ctx.save();
    ctx.translate(26, -30 + bob);
    ctx.rotate(pose === 'attack' ? -0.45 + Math.sin(t * 18) * 0.25 : -0.7);
    ctx.strokeStyle = '#ffb800';
    ctx.shadowColor = '#ffb800';
    ctx.shadowBlur = 18;
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(54, -20);
    ctx.stroke();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(4, -2);
    ctx.lineTo(52, -19);
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
}

// Reusable Cyber Drone Mascot ("小鐵 X-16")
function drawCyberDrone(ctx, x, y, scale, t, mood = 'happy') {
  ctx.save();
  ctx.translate(x, y + Math.sin(t * 3.5) * 5);
  ctx.scale(scale, scale);

  // Thruster glow
  const grad = ctx.createRadialGradient(0, 44, 2, 0, 52, 26);
  grad.addColorStop(0, 'rgba(0, 212, 255, 0.85)');
  grad.addColorStop(1, 'rgba(0, 212, 255, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 50, 26, 0, Math.PI * 2);
  ctx.fill();

  // Body
  ctx.fillStyle = '#334155';
  ctx.beginPath();
  ctx.roundRect(-24, 6, 48, 36, 12);
  ctx.fill();
  ctx.fillStyle = '#00d4ff';
  ctx.fillRect(-10, 18, 20, 6);

  // Antennae
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-22, -26);
  ctx.lineTo(-30, -46);
  ctx.moveTo(22, -26);
  ctx.lineTo(30, -46);
  ctx.stroke();

  // Helmet
  ctx.fillStyle = '#475569';
  ctx.beginPath();
  ctx.roundRect(-34, -38, 68, 46, 20);
  ctx.fill();

  // Dark Visor
  ctx.fillStyle = '#090e18';
  ctx.beginPath();
  ctx.roundRect(-26, -30, 52, 30, 12);
  ctx.fill();

  // Glowing Amber Digital Eyes
  ctx.strokeStyle = '#ffb800';
  ctx.fillStyle = '#ffb800';
  ctx.shadowColor = '#ffb800';
  ctx.shadowBlur = 12;
  ctx.lineWidth = 3.5;

  if (mood === 'amazed') {
    ctx.beginPath();
    ctx.arc(-11, -15, 6, 0, Math.PI * 2);
    ctx.arc(11, -15, 6, 0, Math.PI * 2);
    ctx.fill();
  } else {
    // Happy curved visor eyes ^ ^
    ctx.beginPath();
    ctx.arc(-11, -12, 7, Math.PI * 1.1, Math.PI * 1.9);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(11, -12, 7, Math.PI * 1.1, Math.PI * 1.9);
    ctx.stroke();
  }
  ctx.restore();
}

// ============================================================
// SCENE 1: 桌面大戰 — 通膨怪獸 vs 投資武器
// ============================================================
function mountDesktopInflation(canvas, controlsEl, onSpeak) {
  const { ctx, getSize, cleanup } = setupCanvas(canvas);
  const particles = [];
  let mode = 'today'; // 'today' | 'drawer' | 'invest'
  let modeTime = 0;
  let rafId = 0;
  let t = 0;

  controlsEl.innerHTML = `
    <button class="btn btn-ghost" id="s1-today">📍 16歲今天 ($100)</button>
    <button class="btn btn-crimson" id="s1-drawer">⏩ 放抽屜 20 年 (不動)</button>
    <button class="btn btn-emerald" id="s1-invest">⚡ 拿去投資 20 年！</button>
  `;

  function setMode(next) {
    mode = next;
    modeTime = 0;
    const { W, H } = getSize();
    if (next === 'today') {
      AudioEngine.sfx.click();
      onSpeak('今天手上一百元，剛好可以買兩杯珍珠奶茶！');
    } else if (next === 'drawer') {
      AudioEngine.sfx.alarm();
      AudioEngine.sfx.explosion();
      triggerShake(canvas.parentElement);
      spawnBurst(particles, W * 0.68, H * 0.48, 36, ['#ff4757', '#ff7a2f', '#ffd166'], 6, 5);
      onSpeak('糟糕！放抽屜二十年，通膨怪獸把物價變貴，錢縮水只剩半杯珍奶！');
    } else if (next === 'invest') {
      AudioEngine.sfx.slash();
      AudioEngine.sfx.coin();
      spawnBurst(particles, W * 0.55, H * 0.45, 50, ['#ffb800', '#22e584', '#00d4ff', '#ffffff'], 7, 5);
      onSpeak('太帥啦！阿火用投資讓錢去好公司工作，二十年後變出四杯珍奶，打飛通膨怪獸！');
    }
  }

  controlsEl.querySelector('#s1-today').onclick = () => setMode('today');
  controlsEl.querySelector('#s1-drawer').onclick = () => setMode('drawer');
  controlsEl.querySelector('#s1-invest').onclick = () => setMode('invest');

  function loop() {
    t += 0.016;
    modeTime += 0.016;
    const { W, H } = getSize();
    ctx.clearRect(0, 0, W, H);

    // Stylized OS Desktop wallpaper
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, '#0d1729');
    bg.addColorStop(1, '#162542');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Desktop side icons
    const deskIcons = ['📁', '🎮', '🎬', '🪙'];
    deskIcons.forEach((ic, idx) => {
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.beginPath();
      ctx.roundRect(18, 22 + idx * 62, 46, 46, 10);
      ctx.fill();
      ctx.font = '24px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(ic, 41, 45 + idx * 62);
    });

    // Bottom OS Taskbar
    ctx.fillStyle = '#070c17';
    ctx.fillRect(0, H - 40, W, 40);
    ctx.fillStyle = '#00d4ff';
    ctx.beginPath();
    ctx.roundRect(14, H - 31, 24, 22, 5);
    ctx.fill();
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 13px "Noto Sans TC", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('易軒電腦桌面 — 桌面大戰模式', 50, H - 19);

    // Top Status Banner inside screen
    ctx.fillStyle = 'rgba(9, 14, 24, 0.78)';
    ctx.beginPath();
    ctx.roundRect(W * 0.16, 16, W * 0.68, 44, 14);
    ctx.fill();
    ctx.font = `900 ${Math.min(20, W * 0.032)}px "Noto Sans TC", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (mode === 'today') {
      ctx.fillStyle = '#ffb800';
      ctx.fillText('📍 今天 (16歲)：$100 ＝ 可以買 2 杯珍奶', W * 0.5, 38);
    } else if (mode === 'drawer') {
      ctx.fillStyle = '#ff4757';
      ctx.fillText('👾 放抽屜 20 年：$100 縮水！買不到 1 杯！', W * 0.5, 38);
    } else {
      ctx.fillStyle = '#22e584';
      ctx.fillText('⚡ 投資 20 年：$100 變 $380！買 4 杯還打飛怪獸！', W * 0.5, 38);
    }

    // Center Cash Box & Boba Comparison
    const floorY = H - 82;

    if (mode === 'today') {
      drawStickman(ctx, W * 0.28, floorY, Math.min(1, W / 650), t, 'idle', false);

      // Cash Card
      ctx.fillStyle = '#1b2b48';
      ctx.beginPath();
      ctx.roundRect(W * 0.42, H * 0.38, W * 0.46, H * 0.34, 18);
      ctx.fill();

      ctx.font = `900 ${Math.min(30, W * 0.048)}px "Noto Sans TC", sans-serif`;
      ctx.fillStyle = '#ffb800';
      ctx.textAlign = 'center';
      ctx.fillText('💵 $100', W * 0.55, H * 0.55);

      ctx.font = `bold ${Math.min(24, W * 0.038)}px sans-serif`;
      ctx.fillStyle = '#ffffff';
      ctx.fillText('＝', W * 0.66, H * 0.55);

      ctx.font = `${Math.min(44, W * 0.065)}px sans-serif`;
      ctx.fillText('🧋🧋', W * 0.78, H * 0.54);
    } else if (mode === 'drawer') {
      drawStickman(ctx, W * 0.24, floorY, Math.min(1, W / 650), t, 'sad', false);

      // Fiery Inflation Monster Window
      const mx = W * 0.62 + Math.sin(t * 7) * 8;
      const my = H * 0.44 + Math.cos(t * 5) * 6;
      ctx.save();
      ctx.fillStyle = 'rgba(255, 71, 87, 0.22)';
      ctx.beginPath();
      ctx.arc(mx, my, 66 + Math.sin(t * 10) * 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = `${Math.min(72, W * 0.11)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('👾', mx, my + 4);
      ctx.font = '900 16px "Noto Sans TC", sans-serif';
      ctx.fillStyle = '#ff4757';
      ctx.fillText('通膨大怪獸！(物價翻倍)', mx, my + 62);
      ctx.restore();

      // Shrinking cash
      const shrink = Math.max(0.55, 1 - modeTime * 0.25);
      ctx.save();
      ctx.translate(W * 0.41, H * 0.58);
      ctx.scale(shrink, shrink);
      ctx.fillStyle = '#64748b';
      ctx.beginPath();
      ctx.roundRect(-55, -26, 110, 52, 12);
      ctx.fill();
      ctx.fillStyle = '#e2e8f0';
      ctx.font = '900 22px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('💵 $100', 0, 2);
      ctx.restore();

      // Half grey boba
      ctx.font = `${Math.min(36, W * 0.055)}px sans-serif`;
      ctx.globalAlpha = 0.45;
      ctx.fillText('🧋', W * 0.84, H * 0.55);
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#ff4757';
      ctx.font = '900 18px "Noto Sans TC", sans-serif';
      ctx.fillText('只剩半杯 😭', W * 0.84, H * 0.68);
    } else {
      // INVEST MODE: Stickman slashes monster flying away!
      drawStickman(ctx, W * 0.30, floorY, Math.min(1, W / 650), t, 'attack', true);

      // Golden Energy Slash Arc
      ctx.save();
      ctx.strokeStyle = '#ffb800';
      ctx.shadowColor = '#ffb800';
      ctx.shadowBlur = 22;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(W * 0.34, floorY - 35, 78, -1.1, 0.5);
      ctx.stroke();
      ctx.restore();

      // Monster blasted off top-right!
      const blast = Math.min(1, modeTime * 0.9);
      const bx = W * 0.65 + blast * 180;
      const by = H * 0.42 - blast * 120;
      ctx.save();
      ctx.translate(bx, by);
      ctx.rotate(blast * 8);
      ctx.globalAlpha = Math.max(0.15, 1 - blast * 0.85);
      ctx.font = '56px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('👾💥', 0, 0);
      ctx.restore();

      // Growing Factory & 4 Glowing Bobas
      ctx.fillStyle = 'rgba(34, 229, 132, 0.16)';
      ctx.beginPath();
      ctx.roundRect(W * 0.46, H * 0.33, W * 0.45, H * 0.43, 20);
      ctx.fill();

      ctx.font = '900 26px "Noto Sans TC", sans-serif';
      ctx.fillStyle = '#22e584';
      ctx.textAlign = 'center';
      ctx.fillText('🏭 錢去上班 ➔ $380!', W * 0.685, H * 0.45);

      ctx.font = `${Math.min(42, W * 0.06)}px sans-serif`;
      const pulse = 1 + Math.sin(t * 7) * 0.06;
      ctx.save();
      ctx.translate(W * 0.685, H * 0.62);
      ctx.scale(pulse, pulse);
      ctx.fillText('🧋🧋🧋🧋', 0, 0);
      ctx.restore();
    }

    updateAndDrawParticles(ctx, particles, 0.1);
    rafId = requestAnimationFrame(loop);
  }

  loop();
  return () => {
    cancelAnimationFrame(rafId);
    cleanup();
  };
}

// ============================================================
// SCENE 2: 無機殺手 — 複利雪球反應爐 (16歲 vs 36歲)
// ============================================================
function mountDroneCompound(canvas, controlsEl, onSpeak) {
  const { ctx, getSize, cleanup } = setupCanvas(canvas);
  let age = 26;
  let playing = false;
  let doubleLate = false;
  let rafId = 0;
  let t = 0;

  const snow = Array.from({ length: 48 }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: 1.2 + Math.random() * 2.5,
    s: 0.001 + Math.random() * 0.0025
  }));

  controlsEl.innerHTML = `
    <div class="slider-panel">
      <div class="slider-header">
        <span>⏳ 拉動年齡：<strong id="s2-age-label" style="color:#ffb800;font-size:1.35rem;">26 歲</strong></span>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <button class="btn btn-gold" id="s2-play" style="padding:8px 16px;font-size:0.95rem;">▶️ 自動加速到 60 歲</button>
          <button class="btn btn-ghost" id="s2-double" style="padding:8px 16px;font-size:0.95rem;">🔥 36歲組每月投雙倍 ($2,000)</button>
        </div>
      </div>
      <input type="range" min="16" max="60" value="26" id="s2-slider" class="big-range" />
    </div>
  `;

  const slider = controlsEl.querySelector('#s2-slider');
  const ageLabel = controlsEl.querySelector('#s2-age-label');
  const playBtn = controlsEl.querySelector('#s2-play');
  const doubleBtn = controlsEl.querySelector('#s2-double');

  function calcFV(monthly, years, rate = 0.07) {
    if (years <= 0) return 0;
    const r = rate / 12;
    const n = years * 12;
    return Math.round(monthly * ((Math.pow(1 + r, n) - 1) / r));
  }

  function formatWan(num) {
    if (num >= 10000) return `$${(num / 10000).toFixed(1)} 萬`;
    return `$${num.toLocaleString()}`;
  }

  slider.oninput = () => {
    playing = false;
    age = Number(slider.value);
    ageLabel.textContent = `${age} 歲`;
    AudioEngine.sfx.click();
  };

  playBtn.onclick = () => {
    age = 16;
    slider.value = 16;
    playing = true;
    AudioEngine.sfx.shield();
    onSpeak('啟動複利反應爐！看十六歲的黃色雪球，越滾越大，把晚二十年開始的遠遠甩在後面！');
  };

  doubleBtn.onclick = () => {
    doubleLate = !doubleLate;
    doubleBtn.classList.toggle('btn-cyan', doubleLate);
    doubleBtn.classList.toggle('btn-ghost', !doubleLate);
    AudioEngine.sfx.laser();
    onSpeak(
      doubleLate
        ? '哇！就算三十六歲組每個月投兩倍的錢，到六十歲還是輸給十六歲開始的易軒！'
        : '回到兩組每個月都投一千元比較！'
    );
  };

  function drawReactor(cx, cy, radius, color, label, valText, subText) {
    ctx.save();
    // Outer plasma glow
    const glow = ctx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius * 1.45);
    glow.addColorStop(0, color);
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.globalAlpha = 0.45;
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.45, 0, Math.PI * 2);
    ctx.fill();

    // Rotating ring
    ctx.globalAlpha = 0.9;
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.setLineDash([12, 8]);
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 9, t * 2, t * 2 + Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Core sphere
    const coreGrad = ctx.createRadialGradient(cx - radius * 0.25, cy - radius * 0.25, 4, cx, cy, radius);
    coreGrad.addColorStop(0, '#ffffff');
    coreGrad.addColorStop(0.45, color);
    coreGrad.addColorStop(1, '#0d1525');
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();

    // Texts
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.font = `900 ${Math.min(22, Math.max(14, radius * 0.34))}px "Noto Sans TC", sans-serif`;
    ctx.fillText(valText, cx, cy + 5);

    ctx.fillStyle = color;
    ctx.font = '900 16px "Noto Sans TC", sans-serif';
    ctx.fillText(label, cx, cy + radius + 30);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '700 13px "Noto Sans TC", sans-serif';
    ctx.fillText(subText, cx, cy + radius + 50);
    ctx.restore();
  }

  function loop() {
    t += 0.016;
    if (playing) {
      age += 0.22;
      if (age >= 60) {
        age = 60;
        playing = false;
        AudioEngine.sfx.fanfare();
      }
      slider.value = Math.round(age);
      ageLabel.textContent = `${Math.round(age)} 歲`;
    }

    const { W, H } = getSize();
    ctx.clearRect(0, 0, W, H);

    // Alien Exoplanet Night Sky
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, '#07101f');
    sky.addColorStop(0.7, '#0f203b');
    sky.addColorStop(1, '#182b47');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);

    // Twin Alien Moons
    ctx.fillStyle = 'rgba(203, 213, 225, 0.22)';
    ctx.beginPath();
    ctx.arc(W * 0.14, H * 0.2, 26, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(W * 0.22, H * 0.28, 12, 0, Math.PI * 2);
    ctx.fill();

    // Snowy ground
    ctx.fillStyle = '#1b2c46';
    ctx.beginPath();
    ctx.moveTo(0, H * 0.8);
    ctx.quadraticCurveTo(W * 0.5, H * 0.72, W, H * 0.82);
    ctx.lineTo(W, H);
    ctx.lineTo(0, H);
    ctx.closePath();
    ctx.fill();

    // Drifting snow particles
    ctx.fillStyle = 'rgba(226, 232, 240, 0.65)';
    snow.forEach(s => {
      s.y += s.s;
      if (s.y > 1) s.y = 0;
      ctx.beginPath();
      ctx.arc(s.x * W + Math.sin(t + s.y * 8) * 6, s.y * H, s.r, 0, Math.PI * 2);
      ctx.fill();
    });

    const curAge = Math.round(age);
    const val16 = calcFV(1000, curAge - 16);
    const lateMonthly = doubleLate ? 2000 : 1000;
    const val36 = calcFV(lateMonthly, curAge - 36);

    // Reactor radii scaled visually by wealth
    const maxR = Math.min(W, H) * 0.21;
    const r16 = 26 + Math.pow(Math.min(1, val16 / 3450000), 0.55) * (maxR - 26);
    const r36 = 22 + Math.pow(Math.min(1, val36 / 3450000), 0.55) * (maxR - 22);

    // Cyber Drone Mascot in center
    drawCyberDrone(ctx, W * 0.5, H * 0.56, Math.min(1.05, W / 650), t, curAge >= 45 ? 'amazed' : 'happy');

    // Left Reactor: 16yo Yi-Xuan
    drawReactor(
      W * 0.24,
      H * 0.47,
      r16,
      '#ffb800',
      '🟡 16歲啟動 (易軒)',
      formatWan(val16),
      '每月 $1,000'
    );

    // Right Reactor: 36yo Late Starter
    drawReactor(
      W * 0.76,
      H * 0.47,
      r36,
      '#00d4ff',
      '🔵 36歲才開始',
      curAge < 36 ? '還沒開始 💤' : formatWan(val36),
      doubleLate ? '每月 $2,000 (雙倍!)' : '每月 $1,000'
    );

    // Top age badge
    ctx.fillStyle = 'rgba(9,14,24,0.8)';
    ctx.beginPath();
    ctx.roundRect(W * 0.34, 14, W * 0.32, 38, 12);
    ctx.fill();
    ctx.fillStyle = '#ffb800';
    ctx.font = '900 18px "Noto Sans TC", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`⚡ 目前時間：${curAge} 歲`, W * 0.5, 39);

    rafId = requestAnimationFrame(loop);
  }

  loop();
  return () => {
    cancelAnimationFrame(rafId);
    cleanup();
  };
}

// ============================================================
// SCENE 3: 神奇數位馬戲團 — 1 顆球 vs ETF 安全網大禮包
// ============================================================
function mountCircusETF(canvas, controlsEl, onSpeak) {
  const { ctx, getSize, cleanup } = setupCanvas(canvas);
  const particles = [];
  let mode = 'single'; // 'single' | 'etf'
  let crashed = false;
  let crashFlash = 0;
  let poppedIndex = -1;
  let rafId = 0;
  let t = 0;

  const etfIcons = ['💻', '🍔', '🎮', '🏥', '⚡', '🚗', '📱', '🎬', '🛒', '✈️', '🔋', '🛰️'];

  controlsEl.innerHTML = `
    <button class="btn btn-ghost" id="s3-single">🥚 模式A：全押 1 家公司</button>
    <button class="btn btn-cyan" id="s3-etf">🎪 模式B：ETF 500家大禮包</button>
    <button class="btn btn-crimson" id="s3-boom">💥 觸發公司倒閉意外！</button>
  `;

  function setMode(m) {
    mode = m;
    crashed = false;
    poppedIndex = -1;
    AudioEngine.sfx.boing();
    onSpeak(
      m === 'single'
        ? '模式 A，只買一家公司！波波只頂著一顆玻璃球，沒有安全網喔！'
        : '模式 B，E T F 大禮包！一次擁有好多產業的好公司，底下還有超強安全網！'
    );
  }

  controlsEl.querySelector('#s3-single').onclick = () => setMode('single');
  controlsEl.querySelector('#s3-etf').onclick = () => setMode('etf');
  controlsEl.querySelector('#s3-boom').onclick = () => {
    const { W, H } = getSize();
    crashed = true;
    crashFlash = 1;
    triggerShake(canvas.parentElement);
    if (mode === 'single') {
      AudioEngine.sfx.explosion();
      spawnBurst(particles, W * 0.5, H * 0.38, 65, ['#ff4757', '#ffb800', '#ffffff'], 8, 6);
      onSpeak('碰！全押的那家公司倒閉了！玻璃球碎光光，錢直接歸零！');
    } else {
      AudioEngine.sfx.laser();
      AudioEngine.sfx.shield();
      poppedIndex = Math.floor(Math.random() * etfIcons.length);
      spawnBurst(particles, W * 0.5, H * 0.35, 30, ['#ff7a2f', '#00d4ff', '#22e584'], 6, 4);
      onSpeak('安全過關！只有一顆球破掉，其他十一家好公司穩穩彈在安全網上，錢幾乎沒事！');
    }
  };

  function drawJester(cx, cy, sc) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(sc, sc);
    // Jester hat (red & cyan)
    ctx.fillStyle = '#ff4757';
    ctx.beginPath();
    ctx.moveTo(0, -28);
    ctx.quadraticCurveTo(-28, -52, -36, -24);
    ctx.lineTo(-10, -18);
    ctx.fill();

    ctx.fillStyle = '#00d4ff';
    ctx.beginPath();
    ctx.moveTo(0, -28);
    ctx.quadraticCurveTo(28, -52, 36, -24);
    ctx.lineTo(10, -18);
    ctx.fill();

    // Hat bells
    ctx.fillStyle = '#ffb800';
    ctx.beginPath();
    ctx.arc(-36, -24, 6, 0, Math.PI * 2);
    ctx.arc(36, -24, 6, 0, Math.PI * 2);
    ctx.fill();

    // Head
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.arc(0, -10, 20, 0, Math.PI * 2);
    ctx.fill();

    // Eyes & Smile
    ctx.fillStyle = '#090e18';
    ctx.beginPath();
    ctx.arc(-7, -13, 3.5, 0, Math.PI * 2);
    ctx.arc(7, -13, 3.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#ff4757';
    ctx.lineWidth = 3;
    ctx.beginPath();
    if (mode === 'single' && crashed) {
      ctx.arc(0, 2, 7, Math.PI * 1.15, Math.PI * 1.85);
    } else {
      ctx.arc(0, -6, 8, 0.15 * Math.PI, 0.85 * Math.PI);
    }
    ctx.stroke();

    // Torso
    ctx.fillStyle = '#ff7a2f';
    ctx.beginPath();
    ctx.roundRect(-18, 12, 36, 30, 10);
    ctx.fill();
    ctx.restore();
  }

  function loop() {
    t += 0.016;
    crashFlash = Math.max(0, crashFlash - 0.04);
    const { W, H } = getSize();
    ctx.clearRect(0, 0, W, H);

    // Circus Big-Top Tent Stripes Background
    const stripes = 10;
    for (let i = 0; i < stripes; i++) {
      ctx.fillStyle = i % 2 === 0 ? '#1b1122' : '#261421';
      ctx.fillRect((W / stripes) * i, 0, W / stripes + 1, H);
    }

    // Sweeping spotlights
    ctx.save();
    ctx.globalAlpha = mode === 'single' && crashed ? 0.05 : 0.16;
    const beamX = W * 0.5 + Math.sin(t * 1.5) * W * 0.25;
    ctx.fillStyle = '#ffb800';
    ctx.beginPath();
    ctx.moveTo(W * 0.15, 0);
    ctx.lineTo(beamX - 60, H);
    ctx.lineTo(beamX + 60, H);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Checkered Stage Floor
    ctx.fillStyle = '#141e33';
    ctx.fillRect(0, H * 0.78, W, H * 0.22);
    for (let i = 0; i < 12; i++) {
      ctx.fillStyle = i % 2 === 0 ? 'rgba(255,184,0,0.22)' : 'rgba(0,212,255,0.16)';
      ctx.fillRect((W / 12) * i, H * 0.78, W / 12, 16);
    }

    // Safety Net in ETF Mode
    if (mode === 'etf') {
      ctx.save();
      ctx.strokeStyle = '#00d4ff';
      ctx.shadowColor = '#00d4ff';
      ctx.shadowBlur = 12;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(W * 0.1, H * 0.66);
      ctx.quadraticCurveTo(W * 0.5, H * 0.77 + Math.sin(t * 5) * 4, W * 0.9, H * 0.66);
      ctx.stroke();
      ctx.font = '900 15px "Noto Sans TC", sans-serif';
      ctx.fillStyle = '#00d4ff';
      ctx.textAlign = 'center';
      ctx.fillText('🕸️ ETF 分散風險安全網', W * 0.5, H * 0.91);
      ctx.restore();
    }

    // Jester Mascot
    drawJester(W * 0.5, H * 0.68, Math.min(1, W / 640));

    // Juggling Balls
    if (mode === 'single') {
      if (!crashed) {
        const bx = W * 0.5;
        const by = H * 0.37 + Math.sin(t * 4) * 10;
        const g = ctx.createRadialGradient(bx - 12, by - 12, 6, bx, by, 48);
        g.addColorStop(0, '#fff7cc');
        g.addColorStop(0.5, '#ffb800');
        g.addColorStop(1, '#b86e00');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(bx, by, 46, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#1a1100';
        ctx.font = '900 18px "Noto Sans TC", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('單一公司', bx, by - 2);
        ctx.fillText('$10,000', bx, by + 20);
      } else {
        ctx.fillStyle = '#ff4757';
        ctx.font = `900 ${Math.min(34, W * 0.055)}px "Noto Sans TC", sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText('💀 玻璃球全碎！剩下 $0！', W * 0.5, H * 0.36);
      }
    } else {
      // 12 Orbiting Glowing ETF Spheres
      const rx = Math.min(W * 0.34, 240);
      const ry = Math.min(H * 0.22, 95);
      etfIcons.forEach((icon, idx) => {
        if (crashed && idx === poppedIndex) return;
        const ang = (idx / etfIcons.length) * Math.PI * 2 + t * 1.1;
        const ox = W * 0.5 + Math.cos(ang) * rx;
        const oy = H * 0.38 + Math.sin(ang) * ry;
        ctx.fillStyle = idx % 2 === 0 ? 'rgba(255,184,0,0.28)' : 'rgba(0,212,255,0.28)';
        ctx.beginPath();
        ctx.arc(ox, oy, 22, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = '20px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(icon, ox, oy);
      });
    }

    // Lightning flash overlay
    if (crashFlash > 0) {
      ctx.fillStyle = `rgba(255, 255, 255, ${crashFlash * 0.45})`;
      ctx.fillRect(0, 0, W, H);
    }

    // Top Value Pill
    ctx.fillStyle = 'rgba(9,14,24,0.84)';
    ctx.beginPath();
    ctx.roundRect(W * 0.22, 14, W * 0.56, 40, 14);
    ctx.fill();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '900 17px "Noto Sans TC", sans-serif';
    if (mode === 'single') {
      ctx.fillStyle = crashed ? '#ff4757' : '#ffb800';
      ctx.fillText(crashed ? '💥 剩餘資產：$0 (全軍覆沒)' : '🥚 全押 1 家公司：$10,000 (超危險)', W * 0.5, 34);
    } else {
      ctx.fillStyle = '#22e584';
      ctx.fillText(crashed ? '🛡️ 1 家倒了，其他撐住！資產 $9,600 ➔ 繼續漲！' : '🎪 ETF 500家大禮包：$10,000 (超穩健)', W * 0.5, 34);
    }

    updateAndDrawParticles(ctx, particles, 0.14);
    rafId = requestAnimationFrame(loop);
  }

  loop();
  return () => {
    cancelAnimationFrame(rafId);
    cleanup();
  };
}

// ============================================================
// SCENE 4: 災難電影特效 — 股災流星雨＋火山＋海嘯
// ============================================================
function mountDisasterCrash(canvas, controlsEl, onSpeak) {
  const { ctx, getSize, cleanup } = setupCanvas(canvas);
  const particles = [];
  const meteors = [];
  // 16 data points (years 0..15) with massive crash at index 6-7 then huge recovery!
  const curve = [100, 112, 124, 132, 145, 152, 88, 92, 118, 142, 168, 185, 210, 232, 248, 265];
  let progress = 0; // 0..15
  let state = 'ready'; // 'ready' | 'flying' | 'paused_crash' | 'panic_sold' | 'shield_win'
  let soldVal = 0;
  let rafId = 0;
  let t = 0;

  function renderControls() {
    if (state === 'ready' || state === 'flying') {
      controlsEl.innerHTML = `
        <button class="btn btn-gold" id="s4-start" ${state === 'flying' ? 'disabled' : ''}>
          ${state === 'flying' ? '🚀 航行中...' : '🎬 啟動 15 年災難大片！'}
        </button>
      `;
      const btn = controlsEl.querySelector('#s4-start');
      if (btn) {
        btn.onclick = () => {
          state = 'flying';
          progress = 0;
          AudioEngine.sfx.rocket();
          onSpeak('電影開拍！飛船穩穩往上飛，小心前方隨時會有大股災！');
          renderControls();
        };
      }
    } else if (state === 'paused_crash') {
      controlsEl.innerHTML = `
        <button class="btn btn-crimson" id="s4-sell">😱 嚇死了！全部賣掉！</button>
        <button class="btn btn-cyan" id="s4-hold">🛡️ 開防護罩抱緊＋趁便宜買！</button>
      `;
      controlsEl.querySelector('#s4-sell').onclick = () => {
        state = 'panic_sold';
        soldVal = 5800;
        AudioEngine.sfx.wrong();
        AudioEngine.sfx.explosion();
        triggerShake(canvas.parentElement);
        onSpeak('哎呀！在最低點嚇跑賣掉，真的賠掉四千二！你看後面大盤漲回去，但你已經下車了！');
        renderControls();
      };
      controlsEl.querySelector('#s4-hold').onclick = () => {
        state = 'shield_win';
        AudioEngine.sfx.shield();
        AudioEngine.sfx.fanfare();
        const { W, H } = getSize();
        spawnBurst(particles, W * 0.45, H * 0.55, 55, ['#00d4ff', '#ffb800', '#22e584', '#ffffff'], 7, 5);
        onSpeak('超帥！開啟六角防護罩擋住隕石！熬過暴風雨，股市衝破天際創新高，大賺兩萬六千五百元！');
        renderControls();
      };
    } else {
      controlsEl.innerHTML = `
        <button class="btn btn-gold" id="s4-replay">🔄 再演一次（試試另一個選擇！）</button>
      `;
      controlsEl.querySelector('#s4-replay').onclick = () => {
        state = 'ready';
        progress = 0;
        renderControls();
      };
    }
  }

  renderControls();

  function spawnMeteor(W) {
    meteors.push({
      x: W * (0.2 + Math.random() * 0.9),
      y: -20,
      vx: -4 - Math.random() * 4,
      vy: 5 + Math.random() * 4,
      r: 6 + Math.random() * 7
    });
  }

  function loop() {
    t += 0.016;
    const { W, H } = getSize();
    ctx.clearRect(0, 0, W, H);

    const inStorm = (progress >= 5.2 && progress <= 8.5) || state === 'paused_crash';

    // Sky transitions from storm red-dark to golden sunrise!
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    if (inStorm) {
      sky.addColorStop(0, '#1f0b14');
      sky.addColorStop(1, '#3b1218');
    } else if (progress > 10 && state === 'shield_win') {
      sky.addColorStop(0, '#0a1e3b');
      sky.addColorStop(1, '#1a3a5c');
    } else {
      sky.addColorStop(0, '#091121');
      sky.addColorStop(1, '#13233f');
    }
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);

    // Background Volcano silhouette during storm
    if (inStorm) {
      ctx.fillStyle = '#240f14';
      ctx.beginPath();
      ctx.moveTo(W * 0.1, H);
      ctx.lineTo(W * 0.28, H * 0.48);
      ctx.lineTo(W * 0.34, H * 0.48);
      ctx.lineTo(W * 0.52, H);
      ctx.closePath();
      ctx.fill();

      // Lava glow at crater
      ctx.fillStyle = '#ff5722';
      ctx.beginPath();
      ctx.arc(W * 0.31, H * 0.48, 16 + Math.sin(t * 14) * 5, 0, Math.PI * 2);
      ctx.fill();

      // Tsunami wave on right
      ctx.fillStyle = 'rgba(0, 148, 204, 0.32)';
      ctx.beginPath();
      ctx.moveTo(W * 0.65, H);
      ctx.quadraticCurveTo(W * 0.78, H * 0.35 + Math.sin(t * 6) * 10, W, H * 0.55);
      ctx.lineTo(W, H);
      ctx.closePath();
      ctx.fill();

      // Spawn meteors!
      if (Math.random() < 0.22) spawnMeteor(W);
    }

    // Advance timeline
    if (state === 'flying') {
      progress += 0.055;
      if (progress >= 6.4) {
        progress = 6.4;
        state = 'paused_crash';
        AudioEngine.sfx.alarm();
        AudioEngine.sfx.explosion();
        triggerShake(canvas.parentElement);
        spawnBurst(particles, W * 0.44, H * 0.62, 48, ['#ff4757', '#ff7a2f', '#ffb800'], 7, 5);
        onSpeak('紅色警報！隕石股災來了，暴跌百分之四十！易軒你現在要賣掉，還是開護盾抱緊？');
        renderControls();
      }
    } else if (state === 'panic_sold' || state === 'shield_win') {
      if (progress < 15) progress = Math.min(15, progress + 0.09);
    }

    // Draw Market Wave Line
    const padX = 52;
    const padY = 66;
    const plotW = W - padX * 2;
    const plotH = H - padY * 2;

    const toPt = (idx, val) => ({
      x: padX + (idx / 15) * plotW,
      y: H - padY - ((val - 50) / 230) * plotH
    });

    // Subtle baseline
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(padX, H - padY);
    ctx.lineTo(W - padX, H - padY);
    ctx.stroke();

    // Draw drawn curve up to progress
    const maxIdx = Math.floor(progress);
    const frac = progress - maxIdx;
    ctx.save();
    ctx.lineWidth = 5;
    ctx.lineJoin = 'round';
    ctx.strokeStyle = inStorm ? '#ff4757' : '#ffb800';
    ctx.shadowColor = inStorm ? '#ff4757' : '#ffb800';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    const p0 = toPt(0, curve[0]);
    ctx.moveTo(p0.x, p0.y);
    let curX = p0.x;
    let curY = p0.y;
    let curVal = curve[0];
    for (let i = 1; i <= maxIdx; i++) {
      const pt = toPt(i, curve[i]);
      ctx.lineTo(pt.x, pt.y);
      curX = pt.x;
      curY = pt.y;
      curVal = curve[i];
    }
    if (maxIdx < 15 && frac > 0) {
      curVal = curve[maxIdx] + (curve[maxIdx + 1] - curve[maxIdx]) * frac;
      const pt = toPt(progress, curVal);
      ctx.lineTo(pt.x, pt.y);
      curX = pt.x;
      curY = pt.y;
    }
    ctx.stroke();
    ctx.restore();

    // Draw Meteors
    for (let i = meteors.length - 1; i >= 0; i--) {
      const m = meteors[i];
      m.x += m.vx;
      m.y += m.vy;
      ctx.save();
      ctx.strokeStyle = '#ff7a2f';
      ctx.lineWidth = m.r;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(m.x, m.y);
      ctx.lineTo(m.x - m.vx * 3.5, m.y - m.vy * 3.5);
      ctx.stroke();
      ctx.fillStyle = '#fff3b0';
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.r * 0.7, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      if (m.y > H + 30 || m.x < -30) meteors.splice(i, 1);
    }

    // Golden Ship + Shield Dome!
    if (state === 'panic_sold') {
      // Ship stuck in red loss box at crash point
      const crashPt = toPt(6.4, 88);
      ctx.font = '32px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('💸😭', crashPt.x, crashPt.y + 10);
      ctx.fillStyle = '#ff4757';
      ctx.font = '900 16px "Noto Sans TC", sans-serif';
      ctx.fillText('你在這裡賣掉：只剩 $5,800', crashPt.x, crashPt.y + 42);
    } else {
      // Cyan Hexagonal Energy Shield when holding through storm!
      if (state === 'shield_win') {
        ctx.save();
        const sg = ctx.createRadialGradient(curX, curY, 10, curX, curY, 46);
        sg.addColorStop(0, 'rgba(0,212,255,0.12)');
        sg.addColorStop(1, 'rgba(0,212,255,0.58)');
        ctx.fillStyle = sg;
        ctx.strokeStyle = '#00d4ff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(curX, curY, 44 + Math.sin(t * 8) * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
      ctx.font = '34px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🚀', curX, curY - 4);
    }

    // Top HUD
    ctx.fillStyle = 'rgba(9,14,24,0.84)';
    ctx.beginPath();
    ctx.roundRect(W * 0.16, 14, W * 0.68, 40, 14);
    ctx.fill();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '900 17px "Noto Sans TC", sans-serif';
    const money = state === 'panic_sold' ? soldVal : Math.round(curVal * 100);
    if (state === 'paused_crash') {
      ctx.fillStyle = '#ff4757';
      ctx.fillText('🚨 股災大跌 -40%！快做決定！', W * 0.5, 34);
    } else if (state === 'panic_sold') {
      ctx.fillStyle = '#ff4757';
      ctx.fillText(`❌ 恐慌賣出鎖定虧損：$5,800 (錯過後面暴漲!)`, W * 0.5, 34);
    } else if (state === 'shield_win' && progress >= 15) {
      ctx.fillStyle = '#22e584';
      ctx.fillText(`🏆 抱緊大獲全勝！$10,000 ➔ $26,500！`, W * 0.5, 34);
    } else {
      ctx.fillStyle = '#ffb800';
      ctx.fillText(`📅 第 ${Math.round(progress)} 年 ｜ 資產：$${money.toLocaleString()}`, W * 0.5, 34);
    }

    updateAndDrawParticles(ctx, particles, 0.1);
    rafId = requestAnimationFrame(loop);
  }

  loop();
  return () => {
    cancelAnimationFrame(rafId);
    cleanup();
  };
}

// ============================================================
// SCENE 5: 桌面大戰 II — 點擊砍爆紅旗詐騙彈窗！(可玩小遊戲)
// ============================================================
function mountDesktopScam(canvas, controlsEl, onSpeak) {
  const { ctx, getSize, cleanup } = setupCanvas(canvas);
  const particles = [];
  const slashes = [];
  let popups = [];
  let score = 0;
  const targetScore = 6;
  let stickX = 120;
  let stickY = 260;
  let slashTimer = 0;
  let toastText = '👆 點紅色詐騙窗砍爆它！';
  let toastColor = '#ffb800';
  let won = false;
  let rafId = 0;
  let t = 0;

  const scams = [
    '🚨 保證3天翻10倍！',
    '🚨 穩賺不賠加老師LINE',
    '🚨 借錢全押神秘飆股',
    '🚨 免費內線明牌快匯款'
  ];
  const safes = [
    '✅ 長期買大盤 ETF',
    '✅ 只用閒錢投資',
    '✅ 先存緊急備用金'
  ];

  function spawnPopup() {
    const { W, H } = getSize();
    const isScam = Math.random() < 0.68;
    const text = isScam
      ? scams[Math.floor(Math.random() * scams.length)]
      : safes[Math.floor(Math.random() * safes.length)];
    const pw = Math.min(220, W * 0.42);
    const ph = 64;
    popups.push({
      x: 24 + Math.random() * Math.max(40, W - pw - 48),
      y: 72 + Math.random() * Math.max(40, H - ph - 130),
      vx: (Math.random() - 0.5) * 1.4,
      vy: (Math.random() - 0.5) * 1.1,
      w: pw,
      h: ph,
      isScam,
      text
    });
  }

  function resetGame() {
    popups = [];
    score = 0;
    won = false;
    toastText = '👆 點紅色詐騙窗砍爆它！(0/6)';
    toastColor = '#ffb800';
    for (let i = 0; i < 4; i++) spawnPopup();
    AudioEngine.sfx.click();
  }

  controlsEl.innerHTML = `
    <button class="btn btn-gold" id="s5-reset">🔄 重新挑戰砍詐騙</button>
    <span style="font-weight:900;color:#22e584;">💡 規則：點 🔴 紅窗砍爆 ／ 保護 🟢 綠窗！</span>
  `;
  controlsEl.querySelector('#s5-reset').onclick = resetGame;

  resetGame();

  function handlePointer(e) {
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    for (let i = popups.length - 1; i >= 0; i--) {
      const p = popups[i];
      if (px >= p.x && px <= p.x + p.w && py >= p.y && py <= p.y + p.h) {
        if (p.isScam) {
          // Stickman teleports & slashes!
          stickX = p.x + p.w * 0.5;
          stickY = p.y + p.h * 0.5;
          slashTimer = 0.32;
          slashes.push({ x: stickX, y: stickY, life: 1 });
          spawnBurst(particles, stickX, stickY, 34, ['#ff4757', '#ffb800', '#ffffff'], 7, 5);
          popups.splice(i, 1);
          score++;
          AudioEngine.sfx.slash();
          triggerShake(canvas.parentElement);

          if (score >= targetScore && !won) {
            won = true;
            toastText = '🏆 詐騙大魔王全滅！防詐滿分！';
            toastColor = '#22e584';
            AudioEngine.sfx.fanfare();
            onSpeak('太神啦！所有保證穩賺不賠的詐騙視窗全被你砍爆了！');
          } else {
            toastText = `⚔️ 漂亮砍爆詐騙！(${score}/${targetScore})`;
            toastColor = '#ffb800';
            if (popups.filter(x => x.isScam).length < 2) spawnPopup();
          }
        } else {
          AudioEngine.sfx.shield();
          toastText = '🛡️ 這是正確好觀念，別砍它喔！';
          toastColor = '#00d4ff';
          onSpeak('哎呀，綠色的是正確投資好觀念，不要砍它喔！');
        }
        return;
      }
    }
  }

  canvas.addEventListener('pointerdown', handlePointer);

  function loop() {
    t += 0.016;
    if (slashTimer > 0) slashTimer -= 0.016;
    const { W, H } = getSize();
    ctx.clearRect(0, 0, W, H);

    // Desktop BG
    ctx.fillStyle = '#0e1729';
    ctx.fillRect(0, 0, W, H);

    // Maintain 4 popups while playing
    if (!won && popups.length < 4 && Math.random() < 0.04) {
      spawnPopup();
    }

    // Draw Pop-up Windows
    popups.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 14 || p.x + p.w > W - 14) p.vx *= -1;
      if (p.y < 64 || p.y + p.h > H - 50) p.vy *= -1;

      ctx.save();
      ctx.fillStyle = p.isScam ? '#33121a' : '#0f2b22';
      ctx.strokeStyle = p.isScam ? '#ff4757' : '#22e584';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(p.x, p.y, p.w, p.h, 12);
      ctx.fill();
      ctx.stroke();

      // Title bar
      ctx.fillStyle = p.isScam ? '#ff4757' : '#22e584';
      ctx.beginPath();
      ctx.roundRect(p.x, p.y, p.w, 18, [10, 10, 0, 0]);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = '900 14px "Noto Sans TC", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(p.text, p.x + p.w / 2, p.y + 42);
      ctx.restore();
    });

    // Stickman Hero
    drawStickman(ctx, stickX, Math.min(H - 55, Math.max(100, stickY)), 0.85, t, slashTimer > 0 ? 'attack' : 'idle', true);

    // Slash Arc VFX
    for (let i = slashes.length - 1; i >= 0; i--) {
      const s = slashes[i];
      s.life -= 0.06;
      if (s.life <= 0) {
        slashes.splice(i, 1);
        continue;
      }
      ctx.save();
      ctx.globalAlpha = s.life;
      ctx.strokeStyle = '#ffb800';
      ctx.lineWidth = 8 * s.life;
      ctx.beginPath();
      ctx.moveTo(s.x - 55, s.y + 35);
      ctx.lineTo(s.x + 55, s.y - 35);
      ctx.stroke();
      ctx.restore();
    }

    // Top HUD
    ctx.fillStyle = 'rgba(9,14,24,0.86)';
    ctx.beginPath();
    ctx.roundRect(W * 0.14, 12, W * 0.72, 40, 14);
    ctx.fill();
    ctx.fillStyle = toastColor;
    ctx.font = '900 17px "Noto Sans TC", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(toastText, W * 0.5, 32);

    // Taskbar
    ctx.fillStyle = '#070c17';
    ctx.fillRect(0, H - 34, W, 34);

    updateAndDrawParticles(ctx, particles, 0.14);
    rafId = requestAnimationFrame(loop);
  }

  loop();
  return () => {
    cancelAnimationFrame(rafId);
    canvas.removeEventListener('pointerdown', handlePointer);
    cleanup();
  };
}

// ============================================================
// SCENE 6: 16歲起飛基地 — 零用錢電池分配＋火箭發射！
// ============================================================
function mountLaunchPrep(canvas, controlsEl, onSpeak) {
  const { ctx, getSize, cleanup } = setupCanvas(canvas);
  const particles = [];
  // 10 energy batteries ($300 each = $3,000/month)
  const tanks = {
    need: 3,   // 🍱 生活需要
    shield: 2, // 🛡️ 緊急護盾
    invest: 3, // 🚀 未來投資
    fun: 2     // 🎮 開心娛樂
  };
  let launched = false;
  let rocketY = 0;
  let rafId = 0;
  let t = 0;

  const meta = [
    { key: 'need', label: '🍱 生活需要', color: '#38bdf8' },
    { key: 'shield', label: '🛡️ 緊急護盾', color: '#22e584' },
    { key: 'invest', label: '🚀 未來投資', color: '#ffb800' },
    { key: 'fun', label: '🎮 開心娛樂', color: '#ff7a2f' }
  ];

  function totalUsed() {
    return tanks.need + tanks.shield + tanks.invest + tanks.fun;
  }

  function checkReady() {
    if (totalUsed() !== 10) return { ok: false, msg: `🔋 還有 ${10 - totalUsed()} 顆電池還沒放！` };
    if (tanks.need < 2) return { ok: false, msg: '🍱 生活需要太少，會餓肚子喔！' };
    if (tanks.shield < 2) return { ok: false, msg: '🛡️ 緊急護盾至少要 2 顆才安全！' };
    if (tanks.invest < 2) return { ok: false, msg: '🚀 未來投資至少放 2 顆讓錢長大！' };
    if (tanks.fun > 4) return { ok: false, msg: '🎮 娛樂太重了，火箭飛不起來！' };
    return { ok: true, msg: '✅ 黃金比例完成！可以點火發射！' };
  }

  function renderControls() {
    const status = checkReady();
    controlsEl.innerHTML = `
      <div class="tank-grid">
        ${meta.map(m => `
          <div class="tank-card">
            <div class="tank-top">
              <span>${m.label}</span>
              <span style="color:${m.color}">$${(tanks[m.key] * 300).toLocaleString()}</span>
            </div>
            <div class="tank-bar-bg">
              <div class="tank-bar-fill" style="width:${tanks[m.key] * 10}%;background:${m.color};"></div>
            </div>
            <div class="tank-controls">
              <button class="mini-step-btn" data-k="${m.key}" data-d="-1">−</button>
              <strong style="font-size:1.1rem;">🔋 × ${tanks[m.key]}</strong>
              <button class="mini-step-btn" data-k="${m.key}" data-d="1">＋</button>
            </div>
          </div>
        `).join('')}
      </div>
      <div style="width:100%;display:flex;justify-content:center;gap:12px;align-items:center;flex-wrap:wrap;margin-top:8px;">
        <span style="font-weight:900;color:${status.ok ? '#22e584' : '#ffb800'};">${status.msg}</span>
        <button class="btn ${status.ok ? 'btn-emerald' : 'btn-ghost'}" id="s6-launch" ${status.ok ? '' : 'disabled'}>
          ${launched ? '🔄 再試一次配比' : '🚀 點火發射火箭！'}
        </button>
      </div>
    `;

    controlsEl.querySelectorAll('.mini-step-btn').forEach(btn => {
      btn.onclick = () => {
        if (launched) {
          launched = false;
          rocketY = 0;
        }
        const k = btn.dataset.k;
        const d = Number(btn.dataset.d);
        if (d > 0 && totalUsed() >= 10) return;
        if (d < 0 && tanks[k] <= 0) return;
        tanks[k] += d;
        AudioEngine.sfx.click();
        renderControls();
      };
    });

    const launchBtn = controlsEl.querySelector('#s6-launch');
    if (launchBtn) {
      launchBtn.onclick = () => {
        if (launched) {
          launched = false;
          rocketY = 0;
          renderControls();
          return;
        }
        launched = true;
        rocketY = 0;
        AudioEngine.sfx.rocket();
        AudioEngine.sfx.fanfare();
        triggerShake(canvas.parentElement);
        const { W, H } = getSize();
        spawnBurst(particles, W * 0.5, H * 0.72, 70, ['#ffb800', '#ff7a2f', '#00d4ff', '#ffffff'], 8, 6);
        onSpeak('三、二、一，發射！留好護盾、用閒錢投資，十六歲記得和爸媽一起討論開戶喔！');
        renderControls();
      };
    }
  }

  renderControls();

  function loop() {
    t += 0.016;
    const { W, H } = getSize();
    ctx.clearRect(0, 0, W, H);

    // Dawn Starry Sky
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, '#071124');
    sky.addColorStop(0.65, '#122745');
    sky.addColorStop(1, '#263854');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);

    // Stars
    ctx.fillStyle = 'rgba(255,255,255,0.65)';
    for (let i = 0; i < 30; i++) {
      const sx = ((i * 137) % 100) / 100 * W;
      const sy = ((i * 73) % 60) / 100 * H;
      ctx.fillRect(sx, sy, 2.5, 2.5);
    }

    // Launchpad
    ctx.fillStyle = '#1b2840';
    ctx.fillRect(0, H * 0.8, W, H * 0.2);
    ctx.fillStyle = '#334155';
    ctx.fillRect(W * 0.35, H * 0.77, W * 0.3, 14);

    // Cheering mascots on left & right!
    drawCyberDrone(ctx, W * 0.2, H * 0.68, 0.75, t, launched ? 'amazed' : 'happy');
    drawStickman(ctx, W * 0.8, H * 0.72, 0.85, t, launched ? 'attack' : 'idle', false);

    // Rocket
    if (launched) {
      rocketY = Math.min(H * 0.85, rocketY + 4.5);
      if (rocketY < H * 0.75) {
        spawnBurst(particles, W * 0.5, H * 0.68 - rocketY + 46, 4, ['#ffb800', '#ff7a2f', '#ffffff'], 4, 5);
      }
    }

    const rx = W * 0.5 + (launched && rocketY < 80 ? (Math.random() - 0.5) * 5 : 0);
    const ry = H * 0.56 - rocketY;

    ctx.save();
    ctx.translate(rx, ry);
    // Rocket flames
    if (launched) {
      ctx.fillStyle = '#ff7a2f';
      ctx.beginPath();
      ctx.moveTo(-18, 42);
      ctx.lineTo(0, 95 + Math.random() * 25);
      ctx.lineTo(18, 42);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#ffb800';
      ctx.beginPath();
      ctx.moveTo(-10, 42);
      ctx.lineTo(0, 72 + Math.random() * 15);
      ctx.lineTo(10, 42);
      ctx.closePath();
      ctx.fill();
    }

    // Fins
    ctx.fillStyle = '#00d4ff';
    ctx.beginPath();
    ctx.moveTo(-26, 20);
    ctx.lineTo(-46, 48);
    ctx.lineTo(-22, 42);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(26, 20);
    ctx.lineTo(46, 48);
    ctx.lineTo(22, 42);
    ctx.fill();

    // Rocket body
    ctx.fillStyle = '#ffb800';
    ctx.beginPath();
    ctx.moveTo(0, -68);
    ctx.quadraticCurveTo(32, -20, 26, 42);
    ctx.lineTo(-26, 42);
    ctx.quadraticCurveTo(-32, -20, 0, -68);
    ctx.fill();

    // Cockpit window
    ctx.fillStyle = '#00d4ff';
    ctx.beginPath();
    ctx.arc(0, -14, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Top banner
    ctx.fillStyle = 'rgba(9,14,24,0.82)';
    ctx.beginPath();
    ctx.roundRect(W * 0.16, 14, W * 0.68, 40, 14);
    ctx.fill();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '900 17px "Noto Sans TC", sans-serif';
    ctx.fillStyle = launched ? '#22e584' : '#ffb800';
    ctx.fillText(
      launched ? '🚀 起飛成功！記得找爸媽一起討論開戶喔 👨‍👩‍👦' : `🔋 零用錢 $3,000 (剩餘 ${10 - totalUsed()} 顆電池)`,
      W * 0.5,
      34
    );

    updateAndDrawParticles(ctx, particles, 0.08);
    rafId = requestAnimationFrame(loop);
  }

  loop();
  return () => {
    cancelAnimationFrame(rafId);
    cleanup();
  };
}

// ============================================================
// BONUS SANDBOX: 🎬 終極 10 年災難投資電影模擬片場
// ============================================================
export function mountDisasterSandbox(canvas, uiHooks) {
  const { ctx, getSize, cleanup } = setupCanvas(canvas);
  const particles = [];
  let running = false;
  let pausedEvent = null;
  let year = 0; // 0..10
  let history = [10000];
  let cash = 3000;
  let etf = 6000;
  let risky = 1000;
  let alloc = { cash: 30, etf: 60, risky: 10 };
  let eventIdx = 0;
  let goodDecisions = 0;
  let rafId = 0;
  let t = 0;

  const events = [
    {
      atYear: 3,
      title: '☄️ 第 3 年：隕石股災爆發！大盤瞬間大跌 -35%！',
      voice: '第三年，隕石股災爆發，市場暴跌百分之三十五！易軒你要怎麼辦？',
      choices: [
        { label: '😱 嚇死了全部賣掉', good: false, effect: () => { etf *= 0.65; risky *= 0.45; cash += etf + risky; etf = 0; risky = 0; } },
        { label: '🛡️ 開護盾抱緊＋繼續存', good: true, effect: () => { goodDecisions++; etf *= 0.82; etf += 1500; } }
      ]
    },
    {
      atYear: 6,
      title: '🚨 第 6 年：假投資老師傳訊「保證三天賺五倍！」',
      voice: '第六年，陌生老師傳訊息說保證三天賺五倍，叫你把錢匯給他！',
      choices: [
        { label: '⚔️ 雷射劍砍爆＋直接封鎖', good: true, effect: () => { goodDecisions++; } },
        { label: '💸 相信他匯一半的錢', good: false, effect: () => { cash *= 0.5; etf *= 0.5; risky *= 0.5; } }
      ]
    },
    {
      atYear: 8,
      title: '🌋 第 8 年：超級火山通膨＋單一飆股公司大爆炸！',
      voice: '第八年，物價通膨爆發，而且一家熱門飆股公司突然倒閉了！',
      choices: [
        { label: '🎪 相信分散 ETF 穩穩往前飛', good: true, effect: () => { goodDecisions++; risky *= 0.35; etf *= 1.18; } },
        { label: '🎲 把錢全押另一家神秘飆股', good: false, effect: () => { risky = (risky + etf * 0.7) * 0.55; etf *= 0.3; } }
      ]
    }
  ];

  function start(newAlloc) {
    alloc = newAlloc;
    cash = 10000 * (alloc.cash / 100);
    etf = 10000 * (alloc.etf / 100);
    risky = 10000 * (alloc.risky / 100);
    year = 0;
    eventIdx = 0;
    goodDecisions = 0;
    history = [10000];
    pausedEvent = null;
    running = true;
    AudioEngine.sfx.rocket();
  }

  function chooseEventOption(choice) {
    if (!pausedEvent) return;
    choice.effect();
    const { W, H } = getSize();
    if (choice.good) {
      AudioEngine.sfx.shield();
      AudioEngine.sfx.coin();
      spawnBurst(particles, W * 0.5, H * 0.5, 45, ['#22e584', '#00d4ff', '#ffb800'], 7, 5);
    } else {
      AudioEngine.sfx.explosion();
      triggerShake(canvas.parentElement);
      spawnBurst(particles, W * 0.5, H * 0.5, 45, ['#ff4757', '#ff7a2f'], 7, 5);
    }
    pausedEvent = null;
    uiHooks.onEventClear();
  }

  let stepAcc = 0;
  function loop() {
    t += 0.016;
    const { W, H } = getSize();
    ctx.clearRect(0, 0, W, H);

    // Cinematic dark theater bg
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, pausedEvent ? '#260b14' : '#0a1222');
    bg.addColorStop(1, '#12213b');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    if (running && !pausedEvent) {
      stepAcc += 0.016;
      if (stepAcc >= 0.75) {
        stepAcc = 0;
        year++;
        // Monthly savings $1,000 * 12 = $12,000/yr added according to allocation (if not panic-sold all)
        const annualAdd = 12000;
        cash = cash * 0.98 + annualAdd * (alloc.cash / 100); // mild inflation erosion on cash
        etf = etf * (1.07 + (Math.random() * 0.06)) + annualAdd * (alloc.etf / 100);
        risky = risky * (0.75 + Math.random() * 0.65) + annualAdd * (alloc.risky / 100);

        const total = Math.round(cash + etf + risky);
        history.push(total);
        AudioEngine.sfx.coin();

        if (eventIdx < events.length && year === events[eventIdx].atYear) {
          pausedEvent = events[eventIdx];
          eventIdx++;
          AudioEngine.sfx.alarm();
          triggerShake(canvas.parentElement);
          uiHooks.onEvent(pausedEvent, chooseEventOption);
        } else if (year >= 10) {
          running = false;
          AudioEngine.sfx.fanfare();
          spawnBurst(particles, W * 0.5, H * 0.45, 70, ['#ffb800', '#22e584', '#00d4ff'], 8, 6);
          const finalTotal = Math.round(cash + etf + risky);
          let rank = 'B';
          let comment = '不錯喔！再試試多放一點 ETF＋開護盾！';
          if (goodDecisions === 3 && finalTotal >= 170000) {
            rank = 'S';
            comment = '🏆 傳奇投資大導演！安全又爆賺！';
          } else if (goodDecisions >= 2 && finalTotal >= 145000) {
            rank = 'A';
            comment = '⭐ 超強穩健英雄！完美撐過災難！';
          } else if (finalTotal < 110000) {
            rank = 'C';
            comment = '💡 災難中嚇跑或被騙會傷很大，再玩一次翻盤！';
          }
          uiHooks.onFinish({
            finalTotal,
            invested: 10000 + 12000 * 10,
            goodDecisions,
            rank,
            comment
          });
        }
      }
    }

    // Plot Net Worth Curve
    const padX = 54;
    const padY = 66;
    const plotW = W - padX * 2;
    const plotH = H - padY * 2;
    const maxVal = Math.max(180000, ...history) * 1.1;

    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(padX, H - padY);
    ctx.lineTo(W - padX, H - padY);
    ctx.stroke();

    if (history.length > 1) {
      ctx.save();
      ctx.strokeStyle = pausedEvent ? '#ff4757' : '#22e584';
      ctx.shadowColor = pausedEvent ? '#ff4757' : '#22e584';
      ctx.shadowBlur = 14;
      ctx.lineWidth = 5;
      ctx.beginPath();
      history.forEach((v, idx) => {
        const x = padX + (idx / 10) * plotW;
        const y = H - padY - (v / maxVal) * plotH;
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      const lastX = padX + ((history.length - 1) / 10) * plotW;
      const lastY = H - padY - (history[history.length - 1] / maxVal) * plotH;
      ctx.font = '32px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(pausedEvent ? '💥' : '🚀', lastX, lastY - 6);
      ctx.restore();
    } else {
      ctx.fillStyle = '#94a3b8';
      ctx.font = '900 20px "Noto Sans TC", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('調好下方比例 ➔ 按「🎬 開拍 10 年電影」！', W * 0.5, H * 0.5);
    }

    // Top HUD
    const curTotal = Math.round(cash + etf + risky);
    ctx.fillStyle = 'rgba(9,14,24,0.85)';
    ctx.beginPath();
    ctx.roundRect(W * 0.14, 14, W * 0.72, 40, 14);
    ctx.fill();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '900 17px "Noto Sans TC", sans-serif';
    ctx.fillStyle = pausedEvent ? '#ff4757' : '#ffb800';
    ctx.fillText(
      `🎬 ${16 + year} 歲 (第 ${year}/10 年) ｜ 總資產：$${curTotal.toLocaleString()}`,
      W * 0.5,
      34
    );

    updateAndDrawParticles(ctx, particles, 0.1);
    rafId = requestAnimationFrame(loop);
  }

  loop();
  return {
    start,
    destroy: () => {
      cancelAnimationFrame(rafId);
      cleanup();
    }
  };
}

// Unified scene registry
export function mountScene(sceneType, canvas, controlsEl, onSpeak) {
  switch (sceneType) {
    case 'desktop_inflation':
      return mountDesktopInflation(canvas, controlsEl, onSpeak);
    case 'drone_compound':
      return mountDroneCompound(canvas, controlsEl, onSpeak);
    case 'circus_etf':
      return mountCircusETF(canvas, controlsEl, onSpeak);
    case 'disaster_crash':
      return mountDisasterCrash(canvas, controlsEl, onSpeak);
    case 'desktop_scam':
      return mountDesktopScam(canvas, controlsEl, onSpeak);
    case 'launch_prep':
      return mountLaunchPrep(canvas, controlsEl, onSpeak);
    default:
      return () => {};
  }
}
