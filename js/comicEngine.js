/* ============================================================
   comicEngine.js — Alan Becker 火柴人 × Undertale 60fps 動態漫畫引擎
   主角：🟢 小綠 (#22e584)
   ============================================================ */

const COLORS = {
  green: '#22e584',
  red: '#ff4757',
  yellow: '#ffd43b',
  blue: '#38bdf8',
  boss: '#ff7a2f',
  white: '#ffffff'
};

// ---- Articulated Alan Becker Style Stickman ----
function drawStick(ctx, x, y, scale, color, t, pose = 'idle', extra = {}) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  const bob = pose === 'kneel' || pose === 'fall' ? 0 : Math.sin(t * 5.5) * 2.5;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 6.5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.shadowColor = color;
  ctx.shadowBlur = 10;

  if (pose === 'fall') {
    ctx.rotate(1.35);
  }

  const headY = pose === 'kneel' ? -28 : -54 + bob;
  const shoulderY = headY + 18;
  const hipY = pose === 'kneel' ? 8 : 2 + bob;

  // Head (classic Alan Becker solid vibrant head)
  ctx.beginPath();
  ctx.arc(0, headY, 15, 0, Math.PI * 2);
  ctx.fill();

  // Body / Spine
  ctx.beginPath();
  ctx.moveTo(0, headY + 14);
  ctx.lineTo(0, hipY);
  ctx.stroke();

  // Legs
  if (pose === 'kneel') {
    ctx.beginPath();
    ctx.moveTo(0, hipY);
    ctx.lineTo(-16, hipY + 16);
    ctx.lineTo(-28, hipY + 16);
    ctx.moveTo(0, hipY);
    ctx.lineTo(14, hipY + 16);
    ctx.lineTo(24, hipY + 16);
    ctx.stroke();
  } else if (pose === 'hype' || pose === 'cheer') {
    const jump = Math.abs(Math.sin(t * 9)) * 12;
    ctx.translate(0, -jump);
    ctx.beginPath();
    ctx.moveTo(0, hipY);
    ctx.lineTo(-14, hipY + 32);
    ctx.moveTo(0, hipY);
    ctx.lineTo(14, hipY + 32);
    ctx.stroke();
  } else if (pose === 'run') {
    const stride = Math.sin(t * 14) * 18;
    ctx.beginPath();
    ctx.moveTo(0, hipY);
    ctx.lineTo(-stride, hipY + 34);
    ctx.moveTo(0, hipY);
    ctx.lineTo(stride, hipY + 34);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.moveTo(0, hipY);
    ctx.lineTo(-11, hipY + 36);
    ctx.moveTo(0, hipY);
    ctx.lineTo(11, hipY + 36);
    ctx.stroke();
  }

  // Arms by pose
  ctx.beginPath();
  if (pose === 'wave') {
    ctx.moveTo(0, shoulderY);
    ctx.lineTo(-18, shoulderY + 18);
    ctx.moveTo(0, shoulderY);
    ctx.lineTo(18, shoulderY - 10);
    ctx.lineTo(26 + Math.sin(t * 11) * 7, shoulderY - 28);
  } else if (pose === 'hype' || pose === 'cheer') {
    ctx.moveTo(0, shoulderY);
    ctx.lineTo(-24, shoulderY - 20 + Math.sin(t * 12) * 5);
    ctx.moveTo(0, shoulderY);
    ctx.lineTo(24, shoulderY - 20 - Math.sin(t * 12) * 5);
  } else if (pose === 'shock') {
    ctx.moveTo(0, shoulderY);
    ctx.lineTo(-22, headY + 4);
    ctx.moveTo(0, shoulderY);
    ctx.lineTo(22, headY + 4);
  } else if (pose === 'cry' || pose === 'kneel') {
    ctx.moveTo(0, shoulderY);
    ctx.lineTo(-14, headY + 8);
    ctx.moveTo(0, shoulderY);
    ctx.lineTo(14, headY + 8);
  } else if (pose === 'point') {
    ctx.moveTo(0, shoulderY);
    ctx.lineTo(-18, shoulderY + 16);
    ctx.moveTo(0, shoulderY);
    ctx.lineTo(32, shoulderY - 8);
  } else if (pose === 'think') {
    ctx.moveTo(0, shoulderY);
    ctx.lineTo(-16, shoulderY + 18);
    ctx.moveTo(0, shoulderY);
    ctx.lineTo(12, shoulderY + 8);
    ctx.lineTo(8, headY + 14);
  } else if (pose === 'slash') {
    ctx.moveTo(0, shoulderY);
    ctx.lineTo(-20, shoulderY + 12);
    ctx.moveTo(0, shoulderY);
    ctx.lineTo(26, shoulderY - 12);
  } else {
    ctx.moveTo(0, shoulderY);
    ctx.lineTo(-17, shoulderY + 20);
    ctx.moveTo(0, shoulderY);
    ctx.lineTo(17, shoulderY + 20);
  }
  ctx.stroke();

  // Optional props
  if (extra.sword) {
    ctx.save();
    ctx.translate(26, shoulderY - 12);
    ctx.rotate(-0.45 + Math.sin(t * 10) * 0.12);
    ctx.strokeStyle = '#22e584';
    ctx.shadowColor = '#22e584';
    ctx.shadowBlur = 18;
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(52, -24);
    ctx.stroke();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(4, -2);
    ctx.lineTo(50, -23);
    ctx.stroke();
    ctx.restore();
  }

  if (extra.tears) {
    ctx.fillStyle = '#38bdf8';
    ctx.shadowBlur = 0;
    const drop = (t * 45) % 24;
    ctx.beginPath();
    ctx.arc(-18, headY + 6 + drop, 3.5, 0, Math.PI * 2);
    ctx.arc(18, headY + 6 + ((drop + 12) % 24), 3.5, 0, Math.PI * 2);
    ctx.fill();
  }

  if (extra.sweat) {
    ctx.fillStyle = '#38bdf8';
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(22, headY - 8 + Math.sin(t * 8) * 3, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

// ---- Undertale Style HP Bar ----
function drawHPBar(ctx, x, y, w, label, hp, maxHp, color = '#ffd43b') {
  ctx.save();
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 15px "Noto Sans TC", monospace';
  ctx.textAlign = 'left';
  ctx.fillText(label, x, y - 10);

  // Red background (lost HP)
  ctx.fillStyle = '#cc1b28';
  ctx.fillRect(x, y, w, 22);

  // Remaining HP fill
  const ratio = Math.max(0, Math.min(1, hp / maxHp));
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w * ratio, 22);

  // Crisp Undertale border
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(x, y, w, 22);

  ctx.fillStyle = hp <= 0 ? '#ff4757' : '#ffffff';
  ctx.font = '900 16px monospace';
  ctx.textAlign = 'left';
  ctx.fillText(`HP ${hp} / ${maxHp}`, x, y + 42);
  ctx.restore();
}

// ---- Draw Undertale Portrait Box (left of dialogue) ----
export function drawPortrait(canvas, speaker, mood = 'happy') {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, W, H);

  if (speaker === 'narrator') {
    // Classic glowing Undertale green soul heart!
    ctx.save();
    ctx.translate(W / 2, H / 2);
    ctx.fillStyle = '#22e584';
    ctx.shadowColor = '#22e584';
    ctx.shadowBlur = 12;
    ctx.font = '46px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('💚', 0, 2);
    ctx.restore();
    return;
  }

  const col = COLORS[speaker] || '#ffffff';
  ctx.save();
  ctx.translate(W / 2, H / 2 + 4);

  // Shoulders silhouette
  ctx.strokeStyle = col;
  ctx.lineWidth = 7;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(0, 22);
  ctx.lineTo(0, 44);
  ctx.moveTo(-24, 42);
  ctx.quadraticCurveTo(0, 22, 24, 42);
  ctx.stroke();

  // Stickman Head
  ctx.fillStyle = col;
  ctx.shadowColor = col;
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.arc(0, -4, 24, 0, Math.PI * 2);
  ctx.fill();

  // Minimal expressive comic marks over head
  ctx.shadowBlur = 0;
  ctx.strokeStyle = '#05080f';
  ctx.fillStyle = '#05080f';
  ctx.lineWidth = 3.2;

  if (mood === 'happy' || mood === 'excited') {
    ctx.beginPath();
    ctx.arc(-8, -7, 4.5, Math.PI, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(8, -7, 4.5, Math.PI, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, -1, 8, 0.1 * Math.PI, 0.9 * Math.PI);
    ctx.stroke();
  } else if (mood === 'shock') {
    ctx.beginPath();
    ctx.arc(-8, -7, 4, 0, Math.PI * 2);
    ctx.arc(8, -7, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, 7, 5.5, 0, Math.PI * 2);
    ctx.stroke();
  } else if (mood === 'cry') {
    ctx.beginPath();
    ctx.moveTo(-13, -9); ctx.lineTo(-5, -5);
    ctx.moveTo(13, -9); ctx.lineTo(5, -5);
    ctx.stroke();
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(-11, -3, 4, 14);
    ctx.fillRect(7, -3, 4, 14);
  } else if (mood === 'serious' || mood === 'cool') {
    ctx.fillRect(-13, -9, 9, 4);
    ctx.fillRect(4, -9, 9, 4);
    ctx.beginPath();
    ctx.moveTo(-7, 5);
    ctx.lineTo(7, 5);
    ctx.stroke();
  } else {
    // calm / think
    ctx.beginPath();
    ctx.arc(-8, -7, 3.2, 0, Math.PI * 2);
    ctx.arc(8, -7, 3.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, 1, 6, 0.15 * Math.PI, 0.85 * Math.PI);
    ctx.stroke();
  }

  ctx.restore();
}

// ---- Main 60fps Comic Stage Controller ----
export function createComicStage(canvas) {
  const ctx = canvas.getContext('2d');
  let W = 800;
  let H = 420;
  let currentScene = 'intro_green';
  let sceneTime = 0;
  let t = 0;
  let particles = [];
  let rafId = 0;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = Math.max(320, Math.floor(rect.width));
    H = Math.max(200, Math.floor(rect.height));
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  resize();
  window.addEventListener('resize', resize);

  function burst(x, y, count, colors, speed = 6, size = 4.5) {
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const s = (0.3 + Math.random() * 0.9) * speed;
      particles.push({
        x, y,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s - 1.5,
        life: 1,
        decay: 0.014 + Math.random() * 0.02,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: size * (0.6 + Math.random() * 0.8)
      });
    }
  }

  function setScene(sceneKey) {
    currentScene = sceneKey;
    sceneTime = 0;
    particles = [];

    // Trigger immediate entrance bursts on dramatic scenes
    if (
      sceneKey === 'hp_red_liquidated' ||
      sceneKey === 'hp_red_debt' ||
      sceneKey === 'subprime_collapse' ||
      sceneKey === 'five_loans_meteor' ||
      sceneKey === 'gm_domino' ||
      sceneKey === 'mid_limit_down' ||
      sceneKey === 'mid_crash_panic' ||
      sceneKey === 'adv_50x_wick' ||
      sceneKey === 'kurumi_roscut' ||
      sceneKey === 'kurumi_betrayed' ||
      sceneKey.startsWith('gameover_')
    ) {
      burst(W * 0.55, H * 0.5, 55, ['#ff4757', '#ff7a2f', '#ffd43b', '#ffffff'], 7, 5);
    } else if (
      sceneKey === 'tier1_clear' ||
      sceneKey === 'tier2_clear' ||
      sceneKey === 'grand_ending' ||
      sceneKey === 'true_ending'
    ) {
      burst(W * 0.5, H * 0.35, 70, ['#22e584', '#ffd43b', '#38bdf8', '#ffffff'], 8, 5);
    }
  }

  function drawGround(yRatio = 0.82, lineCol = 'rgba(255,255,255,0.22)') {
    const gy = H * yRatio;
    ctx.strokeStyle = lineCol;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(24, gy);
    ctx.lineTo(W - 24, gy);
    ctx.stroke();
    return gy;
  }

  function drawBanner(text, color = '#ffd43b') {
    ctx.save();
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.beginPath();
    ctx.roundRect(W * 0.14, 14, W * 0.72, 36, 10);
    ctx.fill();
    ctx.fillStyle = color;
    ctx.font = `900 ${Math.min(18, W * 0.032)}px "Noto Sans TC", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, W * 0.5, 32);
    ctx.restore();
  }

  function drawComicScene() {
    ctx.clearRect(0, 0, W, H);
    const sc = Math.min(1.05, W / 640);
    const gy = H * 0.8;

    // Default pure Undertale black theater with subtle depth
    ctx.fillStyle = '#05070c';
    ctx.fillRect(0, 0, W, H);

    switch (currentScene) {
      // ---------- TITLE SCREEN ----------
      case 'title': {
        drawGround(0.84, 'rgba(34,229,132,0.35)');
        drawStick(ctx, W * 0.5, gy - 4, sc * 1.15, COLORS.green, t, 'wave');
        drawStick(ctx, W * 0.25, gy + 4, sc * 0.85, COLORS.red, t, 'hype');
        drawStick(ctx, W * 0.75, gy + 4, sc * 0.85, COLORS.yellow, t, 'point');
        ctx.font = '32px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('💚', W * 0.5, H * 0.22 + Math.sin(t * 3.5) * 6);
        break;
      }

      // ---------- CH 1 ----------
      case 'intro_green': {
        // Alan Becker desktop taskbar homage!
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, H - 32, W, 32);
        ctx.fillStyle = '#22e584';
        ctx.fillRect(14, H - 24, 18, 16);
        drawBanner('🟢 主角登場：16 歲的小綠', '#22e584');
        drawStick(ctx, W * 0.5, H - 68, sc * 1.1, COLORS.green, t, 'wave');
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 18px "Noto Sans TC", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('從 0 開始學投資！', W * 0.5, H * 0.32 + Math.sin(t * 3) * 4);
        break;
      }

      case 'red_hype': {
        drawGround();
        drawBanner('❓ 股票是「保證賺錢的提款機」嗎？', '#ff4757');
        drawStick(ctx, W * 0.34, gy - 36, sc, COLORS.green, t, 'think');
        drawStick(ctx, W * 0.65, gy - 36, sc, COLORS.red, t, 'hype');
        ctx.font = '34px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('💵 💵 💵', W * 0.65, H * 0.32 + Math.sin(t * 6) * 8);
        break;
      }

      case 'risk_rollercoaster': {
        drawGround();
        drawBanner('📉 投資有漲有跌！這就是「風險」', '#ffd43b');
        // Rollercoaster stock line
        ctx.save();
        ctx.strokeStyle = '#ff4757';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(W * 0.12, H * 0.62);
        ctx.lineTo(W * 0.32, H * 0.32);
        ctx.lineTo(W * 0.48, H * 0.42);
        ctx.lineTo(W * 0.62, H * 0.24);
        ctx.lineTo(W * 0.84, H * 0.72);
        ctx.stroke();
        ctx.restore();
        drawStick(ctx, W * 0.22, gy - 36, sc * 0.9, COLORS.yellow, t, 'point');
        drawStick(ctx, W * 0.84, H * 0.66, sc * 0.8, COLORS.red, t, 'shock', { sweat: true });
        break;
      }

      case 'risk_reward_scale': {
        drawGround();
        drawBanner('⚖️ 鐵則：高報酬 ＝ 高風險', '#22e584');
        // Left steady road vs Right cliff
        ctx.fillStyle = 'rgba(34,229,132,0.16)';
        ctx.beginPath();
        ctx.roundRect(W * 0.08, H * 0.28, W * 0.36, H * 0.44, 14);
        ctx.fill();
        ctx.fillStyle = '#22e584';
        ctx.font = '900 20px "Noto Sans TC", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🌱 慢慢長大', W * 0.26, H * 0.44);
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '800 15px "Noto Sans TC", sans-serif';
        ctx.fillText('穩穩走，不容易摔死', W * 0.26, H * 0.56);

        ctx.fillStyle = 'rgba(255,71,87,0.18)';
        ctx.beginPath();
        ctx.roundRect(W * 0.56, H * 0.28, W * 0.36, H * 0.44, 14);
        ctx.fill();
        ctx.fillStyle = '#ff4757';
        ctx.font = '900 20px "Noto Sans TC", sans-serif';
        ctx.fillText('🔥 暴衝賺超快', W * 0.74, H * 0.44);
        ctx.fillStyle = '#fecdd3';
        ctx.font = '800 15px "Noto Sans TC", sans-serif';
        ctx.fillText('一摔就粉身碎骨！', W * 0.74, H * 0.56);

        drawStick(ctx, W * 0.5, gy - 36, sc * 0.9, COLORS.green, t, 'think');
        break;
      }

      // ---------- CH 2 ----------
      case 'lever_intro': {
        drawGround();
        drawBanner('⚙️ 什麼是「槓桿」？＝ 借錢放大賭注！', '#ffd43b');
        // Fulcrum triangle
        ctx.fillStyle = '#ffd43b';
        ctx.beginPath();
        ctx.moveTo(W * 0.5, gy);
        ctx.lineTo(W * 0.46, gy);
        ctx.lineTo(W * 0.5, gy - 34);
        ctx.lineTo(W * 0.54, gy);
        ctx.closePath();
        ctx.fill();
        // Tilting Lever beam
        const tilt = Math.sin(t * 2.5) * 0.14;
        ctx.save();
        ctx.translate(W * 0.5, gy - 34);
        ctx.rotate(tilt);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(-W * 0.28, 0);
        ctx.lineTo(W * 0.28, 0);
        ctx.stroke();
        // Big 10X Boulder on right
        ctx.fillStyle = '#ff4757';
        ctx.beginPath();
        ctx.arc(W * 0.22, -36, 36, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 22px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('10X', W * 0.22, -29);
        ctx.restore();
        drawStick(ctx, W * 0.2, gy - 36, sc * 0.95, COLORS.yellow, t, 'point');
        break;
      }

      case 'lever_math': {
        drawGround();
        drawBanner('🧮 10 倍槓桿長這樣：自己 $100 ＋ 借 $900 ＝ $1,000', '#ffd43b');
        const boxY = H * 0.34;
        // Self $100
        ctx.fillStyle = '#22e584';
        ctx.beginPath();
        ctx.roundRect(W * 0.1, boxY + 40, W * 0.16, 60, 10);
        ctx.fill();
        ctx.fillStyle = '#051a0f';
        ctx.font = '900 18px "Noto Sans TC", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('自己 $100', W * 0.18, boxY + 75);

        ctx.fillStyle = '#ffffff';
        ctx.font = '900 28px sans-serif';
        ctx.fillText('＋', W * 0.31, boxY + 75);

        // Borrowed $900
        ctx.fillStyle = '#ff4757';
        ctx.beginPath();
        ctx.roundRect(W * 0.36, boxY, W * 0.26, 100, 12);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 20px "Noto Sans TC", sans-serif';
        ctx.fillText('🏦 向銀行借 $900', W * 0.49, boxY + 55);

        ctx.fillText('＝', W * 0.67, boxY + 60);

        // Total $1,000
        ctx.fillStyle = '#ffd43b';
        ctx.beginPath();
        ctx.roundRect(W * 0.72, boxY - 12, W * 0.2, 112, 12);
        ctx.fill();
        ctx.fillStyle = '#1a1100';
        ctx.font = '900 22px "Noto Sans TC", sans-serif';
        ctx.fillText('$1,000', W * 0.82, boxY + 38);
        ctx.font = '900 15px "Noto Sans TC", sans-serif';
        ctx.fillText('(10倍槓桿!)', W * 0.82, boxY + 66);
        break;
      }

      case 'lever_up': {
        drawGround();
        drawBanner('📈 漲 +10%：$1,000 ➔ $1,100（還 $900，剩 $200 翻倍！）', '#22e584');
        drawStick(ctx, W * 0.5, gy - 40, sc * 1.05, COLORS.red, t, 'hype');
        ctx.fillStyle = '#22e584';
        ctx.font = '900 30px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('▲ +100% 翻倍！', W * 0.5, H * 0.32 + Math.sin(t * 7) * 6);
        break;
      }

      case 'lever_warning': {
        ctx.fillStyle = `rgba(180, 15, 30, ${0.14 + Math.sin(t * 6) * 0.08})`;
        ctx.fillRect(0, 0, W, H);
        drawGround(0.82, 'rgba(255,71,87,0.45)');
        drawBanner('⚠️ 但是……如果股價「跌 -10%」呢？', '#ff4757');
        drawStick(ctx, W * 0.35, gy - 36, sc, COLORS.yellow, t, 'shock', { sweat: true });
        drawStick(ctx, W * 0.65, gy - 36, sc, COLORS.red, t, 'idle', { sweat: true });
        ctx.fillStyle = '#ff4757';
        ctx.font = '900 44px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('▼ -10% ?', W * 0.5, H * 0.34);
        break;
      }

      // ---------- CH 3: HP DUEL ----------
      case 'hp_duel_start': {
        drawGround();
        drawBanner('⚔️ HP 血條對決：不借錢 (1X) vs 槓桿 (10X)', '#ffffff');
        drawStick(ctx, W * 0.27, gy - 36, sc, COLORS.green, t, 'idle');
        drawHPBar(ctx, W * 0.13, H * 0.26, W * 0.28, '🟢 小綠 (不借錢 1X)', 100, 100, '#22e584');

        drawStick(ctx, W * 0.73, gy - 36, sc, COLORS.red, t, 'hype');
        drawHPBar(ctx, W * 0.59, H * 0.26, W * 0.28, '🔴 小紅 (10倍槓桿)', 100, 100, '#ffd43b');
        break;
      }

      case 'hp_green_safe': {
        drawGround();
        drawBanner('📉 股價跌 -10%！小綠沒借錢，只扣 10 點血！', '#22e584');
        drawStick(ctx, W * 0.27, gy - 36, sc, COLORS.green, t, 'wave');
        drawHPBar(ctx, W * 0.13, H * 0.26, W * 0.28, '🟢 小綠 (1X) 活著！', 90, 100, '#22e584');

        drawStick(ctx, W * 0.73, gy - 36, sc, COLORS.red, t, 'shock', { sweat: true });
        drawHPBar(ctx, W * 0.59, H * 0.26, W * 0.28, '🔴 小紅 (10X) 危險...', 100, 100, '#ff7a2f');
        break;
      }

      case 'hp_red_liquidated': {
        ctx.fillStyle = 'rgba(180, 15, 30, 0.22)';
        ctx.fillRect(0, 0, W, H);
        drawGround(0.82, 'rgba(255,71,87,0.5)');
        drawBanner('💥 股價跌 -10% ➔ 10 倍槓桿直接【強制斷頭爆倉】！', '#ff4757');
        drawStick(ctx, W * 0.27, gy - 36, sc, COLORS.green, t, 'idle');
        drawHPBar(ctx, W * 0.13, H * 0.26, W * 0.28, '🟢 小綠 (1X) 安全', 90, 100, '#22e584');

        drawStick(ctx, W * 0.73, gy - 12, sc, COLORS.red, t, 'fall', { tears: true });
        drawHPBar(ctx, W * 0.59, H * 0.26, W * 0.28, '💀 小紅 (10X) 爆倉出局！', 0, 100, '#ff4757');
        break;
      }

      case 'hp_red_debt': {
        ctx.fillStyle = 'rgba(140, 10, 20, 0.3)';
        ctx.fillRect(0, 0, W, H);
        drawBanner('☄️ 暴跌 -20% ➔ 穿倉！不只歸零，還【倒欠銀行錢】！', '#ff4757');
        // Dark debt abyss
        ctx.fillStyle = '#000000';
        ctx.fillRect(W * 0.32, H * 0.58, W * 0.36, H * 0.42);
        ctx.strokeStyle = '#ff4757';
        ctx.lineWidth = 4;
        ctx.strokeRect(W * 0.32, H * 0.58, W * 0.36, H * 0.42);

        drawStick(ctx, W * 0.5, H * 0.74 + Math.sin(t * 8) * 3, sc * 0.9, COLORS.red, t, 'cry', { tears: true });
        drawHPBar(ctx, W * 0.34, H * 0.24, W * 0.32, '💀 負債穿倉 (欠銀行錢！)', -100, 100, '#ff4757');
        break;
      }

      case 'choice_leverage': {
        drawGround();
        drawBanner('💚 Undertale 關鍵抉擇 ①：你要開 10 倍槓桿嗎？', '#ffd43b');
        drawStick(ctx, W * 0.34, gy - 36, sc, COLORS.green, t, 'think');
        drawStick(ctx, W * 0.66, gy - 36, sc, COLORS.red, t, 'hype');
        ctx.fillStyle = '#ff4757';
        ctx.font = '900 28px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('⚡ 10X 槓桿 ⚡', W * 0.66, H * 0.32 + Math.sin(t * 7) * 5);
        break;
      }

      // ---------- CH 4: GEORGE & MARY ----------
      case 'gm_billboard': {
        drawGround();
        // Retro 2005 neon billboard
        ctx.fillStyle = '#1b1126';
        ctx.strokeStyle = '#ffd43b';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.roundRect(W * 0.16, H * 0.16, W * 0.68, H * 0.4, 14);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#ffd43b';
        ctx.font = `900 ${Math.min(28, W * 0.045)}px "Noto Sans TC", sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText('💳 George & Mary 現金卡', W * 0.5, H * 0.31);
        ctx.fillStyle = '#ff7a2f';
        ctx.font = '900 18px "Noto Sans TC", sans-serif';
        ctx.fillText('「2005 台灣雙卡風暴：借錢好輕鬆？！」', W * 0.5, H * 0.45);

        drawStick(ctx, W * 0.38, gy - 32, sc * 0.85, COLORS.green, t, 'think');
        drawStick(ctx, W * 0.62, gy - 32, sc * 0.85, COLORS.red, t, 'hype');
        break;
      }

      case 'gm_monster': {
        ctx.fillStyle = 'rgba(150, 20, 35, 0.18)';
        ctx.fillRect(0, 0, W, H);
        drawGround();
        drawBanner('👾 利率 20% 複利滾債怪獸追來了！', '#ff4757');
        // Monster ball
        const mx = W * 0.34 + Math.sin(t * 5) * 14;
        ctx.fillStyle = '#ff4757';
        ctx.beginPath();
        ctx.arc(mx, H * 0.48, 56, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 22px "Noto Sans TC", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('利率 20%', mx, H * 0.46);
        ctx.font = '900 15px "Noto Sans TC", sans-serif';
        ctx.fillText('複利滾債怪', mx, H * 0.54);

        drawStick(ctx, W * 0.72, gy - 36, sc, COLORS.red, t, 'run', { sweat: true });
        break;
      }

      case 'gm_domino': {
        ctx.fillStyle = 'rgba(160, 15, 25, 0.22)';
        ctx.fillRect(0, 0, W, H);
        drawGround();
        drawBanner('💳 以卡養卡骨牌倒塌 ➔ 幾十萬名卡奴破產！', '#ff4757');
        // Falling cards dominoes
        ['A卡', 'B卡', 'C卡', '負債300萬'].forEach((lbl, idx) => {
          ctx.save();
          ctx.translate(W * (0.2 + idx * 0.16), gy - 45);
          ctx.rotate(0.28 + idx * 0.16);
          ctx.fillStyle = idx === 3 ? '#ff4757' : '#ff7a2f';
          ctx.beginPath();
          ctx.roundRect(-24, -48, 48, 80, 8);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = '900 13px "Noto Sans TC", sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(lbl, 0, 0);
          ctx.restore();
        });
        drawStick(ctx, W * 0.82, gy - 14, sc * 0.9, COLORS.red, t, 'kneel', { tears: true });
        break;
      }

      case 'gm_lesson': {
        drawGround();
        drawBanner('✅ 信用卡鐵則：只刷戶頭已有的錢，每期全額繳清！', '#22e584');
        drawStick(ctx, W * 0.36, gy - 36, sc, COLORS.green, t, 'wave');
        ctx.fillStyle = 'rgba(34,229,132,0.18)';
        ctx.strokeStyle = '#22e584';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.roundRect(W * 0.52, H * 0.3, W * 0.34, H * 0.38, 16);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#22e584';
        ctx.font = '900 22px "Noto Sans TC", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🛡️ 絕不預借現金', W * 0.69, H * 0.45);
        ctx.fillText('🛡️ 絕不欠循環息', W * 0.69, H * 0.57);
        break;
      }

      // ---------- CH 5: 2008 SUBPRIME ----------
      case 'subprime_tower': {
        drawGround();
        drawBanner('🏢 2008 次貸風暴：爛房貸疊成【30 倍槓桿】搖晃巨塔！', '#ffd43b');
        const sway = Math.sin(t * 4) * 10;
        for (let i = 0; i < 6; i++) {
          ctx.fillStyle = i === 0 ? '#ff4757' : '#d97706';
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 2;
          const bw = 110;
          const bh = 28;
          const bx = W * 0.5 - bw / 2 + sway * (i / 5);
          const by = gy - (i + 1) * (bh + 3);
          ctx.fillRect(bx, by, bw, bh);
          ctx.strokeRect(bx, by, bw, bh);
        }
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 15px "Noto Sans TC", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('30X 槓桿塔', W * 0.5 + sway, gy - 196);
        drawStick(ctx, W * 0.24, gy - 36, sc * 0.9, COLORS.green, t, 'shock', { sweat: true });
        break;
      }

      case 'subprime_collapse': {
        ctx.fillStyle = 'rgba(180, 20, 20, 0.25)';
        ctx.fillRect(0, 0, W, H);
        drawGround();
        drawBanner('💥 房價一跌，30 倍槓桿巨塔瞬間連鎖崩塌！', '#ff4757');
        for (let i = 0; i < 7; i++) {
          ctx.save();
          ctx.translate(W * (0.28 + i * 0.08), gy - 20 - (i % 3) * 28);
          ctx.rotate((i - 3) * 0.45 + Math.sin(t * 8) * 0.05);
          ctx.fillStyle = i % 2 === 0 ? '#ff4757' : '#ff7a2f';
          ctx.fillRect(-35, -14, 70, 28);
          ctx.restore();
        }
        drawStick(ctx, W * 0.16, gy - 36, sc * 0.85, COLORS.yellow, t, 'shock');
        break;
      }

      case 'subprime_lehman': {
        drawGround();
        drawBanner('🏦 158 年超級大銀行（雷曼兄弟）破產！全球股市腰斬 -50%！', '#ff4757');
        // Tilting bank skyscraper
        ctx.save();
        ctx.translate(W * 0.34, gy);
        ctx.rotate(0.45);
        ctx.fillStyle = '#334155';
        ctx.fillRect(-42, -160, 84, 160);
        ctx.fillStyle = '#ff4757';
        ctx.font = '900 16px "Noto Sans TC", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('158年銀行', 0, -90);
        ctx.fillText('💀 破產', 0, -64);
        ctx.restore();

        // Crashing -50% chart
        ctx.strokeStyle = '#ff4757';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(W * 0.56, H * 0.28);
        ctx.lineTo(W * 0.86, H * 0.72);
        ctx.stroke();
        ctx.fillStyle = '#ff4757';
        ctx.font = '900 32px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('-50% 📉', W * 0.74, H * 0.38);
        drawStick(ctx, W * 0.86, gy - 36, sc * 0.85, COLORS.blue, t, 'shock', { sweat: true });
        break;
      }

      case 'subprime_lesson': {
        drawGround();
        drawBanner('🛡️ 連 158 年大銀行開高槓桿都倒閉，我們更絕不碰！', '#22e584');
        drawStick(ctx, W * 0.5, gy - 36, sc * 1.05, COLORS.green, t, 'think');
        break;
      }

      // ---------- CH 6: 五貸同堂 ----------
      case 'five_loans_chains': {
        drawGround();
        drawBanner('⛓️ 台灣真實危險玩法：「五貸同堂」五條債鍊綁全身！', '#ff7a2f');
        drawStick(ctx, W * 0.5, gy - 36, sc, COLORS.red, t, 'shock', { sweat: true });
        const loans = ['🏠 房貸', '💳 信貸', '🚗 車貸', '📈 股票質押', '⚡ 融資'];
        loans.forEach((lbl, idx) => {
          const ang = Math.PI + (idx / 4) * Math.PI;
          const lx = W * 0.5 + Math.cos(ang) * (W * 0.33);
          const ly = H * 0.56 + Math.sin(ang) * (H * 0.28);
          ctx.strokeStyle = '#ff4757';
          ctx.lineWidth = 3;
          ctx.setLineDash([7, 5]);
          ctx.beginPath();
          ctx.moveTo(W * 0.5, gy - 50);
          ctx.lineTo(lx, ly);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.fillStyle = '#2b1218';
          ctx.strokeStyle = '#ff4757';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(lx - 52, ly - 18, 104, 34, 10);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = '#ffffff';
          ctx.font = '900 14px "Noto Sans TC", sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(lbl, lx, ly + 4);
        });
        break;
      }

      case 'five_loans_greed': {
        drawGround();
        drawBanner('📈 股市一直漲時，五貸同堂看起來像「躺著數錢」……', '#ffd43b');
        drawStick(ctx, W * 0.5, gy - 36, sc, COLORS.red, t, 'hype');
        ctx.fillStyle = '#ffd43b';
        ctx.font = '900 22px "Noto Sans TC", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('💸 借來的 5 筆錢全衝股市！', W * 0.5, H * 0.3);
        break;
      }

      case 'five_loans_meteor': {
        ctx.fillStyle = 'rgba(180, 15, 25, 0.28)';
        ctx.fillRect(0, 0, W, H);
        drawGround();
        drawBanner('☄️ 股災暴跌 -30%：股票被斷頭 ＋ 5 筆利息照常催繳！', '#ff4757');
        // Meteor smashing down
        ctx.fillStyle = '#ff7a2f';
        ctx.beginPath();
        ctx.arc(W * 0.5, H * 0.38, 42 + Math.sin(t * 14) * 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 20px "Noto Sans TC", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('黑天鵝 -30%', W * 0.5, H * 0.4);

        // 5 red debt bills raining
        for (let i = 0; i < 5; i++) {
          const bx = W * (0.16 + i * 0.17);
          const by = ((t * 90 + i * 70) % (H * 0.65)) + 50;
          ctx.fillStyle = '#ff4757';
          ctx.fillRect(bx - 32, by, 64, 24);
          ctx.fillStyle = '#fff';
          ctx.font = '900 12px "Noto Sans TC", sans-serif';
          ctx.fillText('催繳利息!', bx, by + 16);
        }
        drawStick(ctx, W * 0.5, gy - 14, sc * 0.9, COLORS.red, t, 'kneel', { tears: true });
        break;
      }

      case 'five_loans_auction': {
        drawGround();
        drawBanner('🏠 股票斷頭歸零 ＋ 利息繳不出 ➔ 房子被貼【法拍】！', '#ff4757');
        // Simple house
        ctx.fillStyle = '#334155';
        ctx.fillRect(W * 0.48, gy - 110, 140, 110);
        ctx.beginPath();
        ctx.moveTo(W * 0.45, gy - 110);
        ctx.lineTo(W * 0.48 + 70, gy - 170);
        ctx.lineTo(W * 0.48 + 160, gy - 110);
        ctx.closePath();
        ctx.fill();

        // Diagonal red "法拍" seal
        ctx.save();
        ctx.translate(W * 0.48 + 70, gy - 55);
        ctx.rotate(-0.28);
        ctx.fillStyle = '#ff4757';
        ctx.fillRect(-76, -22, 152, 44);
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 24px "Noto Sans TC", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('【 法 拍 】', 0, 8);
        ctx.restore();

        drawStick(ctx, W * 0.28, gy - 14, sc, COLORS.red, t, 'kneel', { tears: true });
        break;
      }

      case 'choice_fiveloans': {
        drawGround();
        drawBanner('💚 Undertale 關鍵抉擇 ②：拒絕「五貸同堂」誘惑！', '#ffd43b');
        drawStick(ctx, W * 0.34, gy - 36, sc, COLORS.green, t, 'slash', { sword: true });
        drawStick(ctx, W * 0.68, gy - 36, sc, COLORS.boss, t, 'hype');
        ctx.fillStyle = '#ff7a2f';
        ctx.font = '900 20px "Noto Sans TC", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('⛓️ 五貸同堂抄底！', W * 0.68, H * 0.3);
        break;
      }

      // ---------- CH 7: SAFE RULES & ENDING ----------
      case 'safe_blue_highfive': {
        drawGround();
        drawBanner('🛡️ 安全投資一點都不難！4 條防破產鐵則！', '#38bdf8');
        // Glowing dome shield around Green & Blue
        ctx.save();
        ctx.strokeStyle = '#22e584';
        ctx.fillStyle = 'rgba(34,229,132,0.12)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(W * 0.5, gy - 40, 120, Math.PI, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        drawStick(ctx, W * 0.42, gy - 36, sc, COLORS.green, t, 'wave');
        drawStick(ctx, W * 0.58, gy - 36, sc, COLORS.blue, t, 'wave');
        break;
      }

      case 'safe_four_rules': {
        drawBanner('💚 16 歲小綠的 4 大黃金防破產守則', '#22e584');
        const rules = [
          { ic: '🚫', t1: '① 絕不借錢', t2: '絕不開槓桿', c: '#ff4757' },
          { ic: '🛡️', t1: '② 緊急備用金', t2: '留好救命 HP', c: '#38bdf8' },
          { ic: '🧺', t1: '③ 分散 ETF', t2: '用閒錢投資', c: '#22e584' },
          { ic: '⏳', t1: '④ 16 歲時間', t2: '慢慢變富！', c: '#ffd43b' }
        ];
        const cw = Math.min(160, (W - 70) / 4);
        const startX = (W - (cw * 4 + 36)) / 2;
        rules.forEach((r, idx) => {
          const x = startX + idx * (cw + 12);
          ctx.fillStyle = '#111929';
          ctx.strokeStyle = r.c;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.roundRect(x, H * 0.24, cw, H * 0.56, 14);
          ctx.fill();
          ctx.stroke();
          ctx.font = '36px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(r.ic, x + cw / 2, H * 0.41);
          ctx.fillStyle = r.c;
          ctx.font = '900 16px "Noto Sans TC", sans-serif';
          ctx.fillText(r.t1, x + cw / 2, H * 0.58);
          ctx.fillStyle = '#cbd5e1';
          ctx.font = '700 14px "Noto Sans TC", sans-serif';
          ctx.fillText(r.t2, x + cw / 2, H * 0.7);
        });
        break;
      }

      case 'choice_final': {
        drawGround();
        drawBanner('💚 最終考驗 ③：第一筆 $10,000，你選哪條路？', '#22e584');
        drawStick(ctx, W * 0.5, gy - 36, sc * 1.05, COLORS.green, t, 'think');
        ctx.fillStyle = '#ff4757';
        ctx.font = '900 18px "Noto Sans TC", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('⬅️ 🎲 20X 槓桿暴富陷阱', W * 0.22, H * 0.4);
        ctx.fillStyle = '#22e584';
        ctx.fillText('🛡️ 備用金＋爸媽開戶＋ETF ➡️', W * 0.78, H * 0.4);
        break;
      }

      // ---------- TIER 1 & TIER 2 CLEAR ----------
      case 'tier1_clear':
      case 'tier2_clear': {
        const isT1 = currentScene === 'tier1_clear';
        const accent = isT1 ? '#22e584' : '#38bdf8';
        drawGround(0.84, accent);
        drawBanner(
          isT1 ? '🌱 初級通關！(33/100) ➔ 解鎖 ⚡ 中級：投資的方法！' : '⚡ 中級通關！(66/100) ➔ 解鎖 🏆 高級：長期規劃與心理建設！',
          accent
        );
        if (Math.random() < 0.05) {
          burst(W * (0.2 + Math.random() * 0.6), H * 0.28, 18, [accent, '#ffd43b', '#ffffff'], 5, 4);
        }
        drawStick(ctx, W * 0.5, gy - 36, sc * 1.1, COLORS.green, t, 'cheer');
        drawStick(ctx, W * 0.3, gy - 36, sc * 0.9, COLORS.blue, t, 'wave');
        drawStick(ctx, W * 0.7, gy - 36, sc * 0.9, COLORS.yellow, t, 'cheer');
        ctx.font = '46px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(isT1 ? '🌱✨' : '⚡✨', W * 0.5, H * 0.3 + Math.sin(t * 4) * 5);
        break;
      }

      // ================================================================
      // ⚡ 中階（第 31 ～ 60 幕）視覺漫畫引擎
      // ================================================================
      case 'mid_t2_intro': {
        drawGround();
        drawBanner('📅 台股規則【T+2 交割】：今天買 ➔ 兩天後早上 10:00 扣款！', '#38bdf8');
        ['今天(T)', '明天(T+1)', '後天(T+2 扣款!)'].forEach((lbl, idx) => {
          const x = W * (0.18 + idx * 0.32);
          ctx.fillStyle = idx === 2 ? '#ff4757' : '#132138';
          ctx.strokeStyle = idx === 2 ? '#ffd43b' : '#38bdf8';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.roundRect(x - 76, H * 0.3, 152, 76, 12);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = '#ffffff';
          ctx.font = '900 16px "Noto Sans TC", sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(lbl, x, H * 0.4 + 4);
        });
        drawStick(ctx, W * 0.5, gy - 32, sc * 0.9, COLORS.yellow, t, 'point');
        break;
      }

      case 'mid_daytrade_red': {
        drawGround();
        drawBanner('🎲 無本當沖：戶頭只有 $1,000 卻敢買 $100 萬？！', '#ff4757');
        drawStick(ctx, W * 0.5, gy - 36, sc, COLORS.red, t, 'hype');
        ctx.fillStyle = '#ffd43b';
        ctx.font = '900 22px "Noto Sans TC", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('戶頭 $1,000 ➔ 亂按買進 $1,000,000！', W * 0.5, H * 0.32);
        break;
      }

      case 'mid_limit_down': {
        ctx.fillStyle = 'rgba(16, 120, 60, 0.22)';
        ctx.fillRect(0, 0, W, H);
        drawGround(0.82, '#ff4757');
        drawBanner('🔒 股價【跌停鎖死】賣不掉 ➔ T+2 扣不到錢【違約交割】！', '#ff4757');
        ctx.fillStyle = '#14532d';
        ctx.strokeStyle = '#22e584';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.roundRect(W * 0.26, H * 0.24, W * 0.48, 86, 12);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 26px "Noto Sans TC", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🔒 跌停鎖死 -10% (賣不掉!)', W * 0.5, H * 0.35);
        drawStick(ctx, W * 0.5, gy - 14, sc, COLORS.red, t, 'kneel', { tears: true });
        break;
      }

      case 'mid_t2_rule': {
        drawGround();
        drawBanner('🛡️ 鐵則：戶頭有多少現金，最多只買多少，絕不無本當沖！', '#22e584');
        drawStick(ctx, W * 0.35, gy - 36, sc, COLORS.green, t, 'slash', { sword: true });
        ctx.fillStyle = '#111929';
        ctx.strokeStyle = '#22e584';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(W * 0.52, H * 0.28, W * 0.36, 120, 14);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#22e584';
        ctx.font = '900 20px "Noto Sans TC", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('💵 現金多少買多少', W * 0.7, H * 0.41);
        ctx.fillStyle = '#ff4757';
        ctx.fillText('🚫 絕不玩無本當沖', W * 0.7, H * 0.53);
        break;
      }

      case 'mid_inflation_boba':
      case 'mid_inflation_shrink': {
        drawGround();
        drawBanner('🧋 通貨膨脹：以前珍奶 $30 ➔ 現在 $70，現金放著會變小！', '#ffd43b');
        ctx.font = '46px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🧋', W * 0.28, H * 0.42);
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '900 20px "Noto Sans TC", sans-serif';
        ctx.fillText('以前 $30', W * 0.28, H * 0.56);

        ctx.fillStyle = '#ff7a2f';
        ctx.font = '900 32px sans-serif';
        ctx.fillText('➔ 👾 通膨 ➔', W * 0.5, H * 0.46);

        ctx.font = '46px sans-serif';
        ctx.fillText('🧋', W * 0.74, H * 0.42);
        ctx.fillStyle = '#ff4757';
        ctx.font = '900 22px "Noto Sans TC", sans-serif';
        ctx.fillText('現在 $70！', W * 0.74, H * 0.56);

        drawStick(ctx, W * 0.5, gy - 32, sc * 0.85, currentScene === 'mid_inflation_boba' ? COLORS.yellow : COLORS.green, t, 'think');
        break;
      }

      case 'mid_compound_compare':
      case 'mid_compound_power': {
        drawGround();
        drawBanner('❄️ 16 歲複利雪球：每月存 $1,000，早 20 年多滾出 4 倍！', '#22e584');
        // Huge 16yo snowball vs small 36yo snowball
        ctx.fillStyle = 'rgba(34,229,132,0.28)';
        ctx.strokeStyle = '#22e584';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(W * 0.3, H * 0.46, 68 + Math.sin(t * 4) * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 22px "Noto Sans TC", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('$342 萬', W * 0.3, H * 0.46);
        ctx.fillStyle = '#22e584';
        ctx.font = '900 15px "Noto Sans TC", sans-serif';
        ctx.fillText('🟢 16 歲開始', W * 0.3, H * 0.55);

        ctx.fillStyle = 'rgba(56,189,248,0.22)';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(W * 0.72, H * 0.52, 34, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 16px "Noto Sans TC", sans-serif';
        ctx.fillText('$75 萬', W * 0.72, H * 0.53);
        ctx.fillStyle = '#38bdf8';
        ctx.font = '900 14px "Noto Sans TC", sans-serif';
        ctx.fillText('🔵 36 歲才開始', W * 0.72, H * 0.66);

        drawStick(ctx, W * 0.52, gy - 36, sc * 0.9, COLORS.green, t, 'cheer');
        break;
      }

      case 'mid_single_stock_crash': {
        drawGround();
        drawBanner('📱 全壓單一昔日王者 ➔ 被時代淘汰暴跌 -90%！', '#ff4757');
        ctx.strokeStyle = '#ff4757';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(W * 0.16, H * 0.28);
        ctx.lineTo(W * 0.42, H * 0.25);
        ctx.lineTo(W * 0.76, H * 0.74);
        ctx.stroke();
        ctx.fillStyle = '#ff4757';
        ctx.font = '900 32px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('-90% 💀', W * 0.64, H * 0.4);
        drawStick(ctx, W * 0.8, gy - 14, sc * 0.9, COLORS.red, t, 'kneel', { tears: true });
        break;
      }

      case 'mid_etf_basket':
      case 'mid_etf_auto_swap':
      case 'mid_etf_green': {
        drawGround();
        drawBanner(
          currentScene === 'mid_etf_auto_swap'
            ? '🔄 大盤 ETF 自動汰弱留強：踢掉弱者、換進新王者！'
            : '🧺 大盤 ETF 大禮包：一次擁有一整籃最強好公司！',
          '#38bdf8'
        );
        const icons = ['💻', '📱', '⚡', '🏥', '🚗', '🍔', '🛰️', '🔋'];
        icons.forEach((ic, idx) => {
          const ang = (idx / icons.length) * Math.PI * 2 + t * 0.9;
          const ox = W * 0.5 + Math.cos(ang) * (W * 0.28);
          const oy = H * 0.46 + Math.sin(ang) * (H * 0.2);
          ctx.fillStyle = 'rgba(56,189,248,0.22)';
          ctx.beginPath();
          ctx.arc(ox, oy, 22, 0, Math.PI * 2);
          ctx.fill();
          ctx.font = '22px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(ic, ox, oy);
        });
        drawStick(ctx, W * 0.5, gy - 34, sc * 0.95, currentScene === 'mid_etf_green' ? COLORS.green : COLORS.blue, t, 'wave');
        break;
      }

      case 'choice_daytrade': {
        drawGround();
        drawBanner('⚡ 中階抉擇 ④：要玩無本當沖，還是用閒錢買 ETF？', '#ffd43b');
        drawStick(ctx, W * 0.34, gy - 36, sc, COLORS.green, t, 'think');
        drawStick(ctx, W * 0.66, gy - 36, sc, COLORS.red, t, 'hype');
        ctx.fillStyle = '#ff4757';
        ctx.font = '900 20px "Noto Sans TC", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🎲 無本當沖拚一天賺 $5,000！', W * 0.66, H * 0.3);
        break;
      }

      case 'mid_dca_intro':
      case 'mid_smile_curve':
      case 'mid_smile_win':
      case 'mid_discipline': {
        drawGround();
        drawBanner('😊 定期定額「微笑曲線」：大跌撿便宜 ➔ 漲回來大賺！', '#22e584');
        // Glowing smile curve!
        ctx.save();
        ctx.strokeStyle = '#22e584';
        ctx.lineWidth = 6;
        ctx.shadowColor = '#22e584';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.moveTo(W * 0.14, H * 0.36);
        ctx.quadraticCurveTo(W * 0.5, H * 0.84, W * 0.86, H * 0.28);
        ctx.stroke();
        ctx.restore();
        // Buy dots along curve
        [0.14, 0.32, 0.5, 0.68, 0.86].forEach((r, i) => {
          const x = W * r;
          const y = i === 0 ? H * 0.36 : i === 1 ? H * 0.54 : i === 2 ? H * 0.6 : i === 3 ? H * 0.48 : H * 0.28;
          ctx.fillStyle = i === 2 ? '#ffd43b' : '#38bdf8';
          ctx.beginPath();
          ctx.arc(x, y, i === 2 ? 10 : 7, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.fillStyle = '#ffd43b';
        ctx.font = '900 15px "Noto Sans TC", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🏷️ 大跌打折買最多股！', W * 0.5, H * 0.72);
        drawStick(ctx, W * 0.86, gy - 34, sc * 0.85, COLORS.green, t, 'cheer');
        break;
      }

      case 'mid_crash_panic': {
        ctx.fillStyle = 'rgba(180, 15, 25, 0.24)';
        ctx.fillRect(0, 0, W, H);
        drawGround();
        drawBanner('😱 股災大跌 -35% 在最低點亂賣 ➔ 真的鎖定虧損！', '#ff4757');
        ctx.strokeStyle = '#ff4757';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(W * 0.14, H * 0.32);
        ctx.lineTo(W * 0.48, H * 0.66);
        ctx.stroke();
        ctx.strokeStyle = '#22e584';
        ctx.setLineDash([8, 6]);
        ctx.beginPath();
        ctx.moveTo(W * 0.48, H * 0.66);
        ctx.lineTo(W * 0.86, H * 0.26);
        ctx.stroke();
        ctx.setLineDash([]);
        drawStick(ctx, W * 0.48, gy - 14, sc * 0.9, COLORS.red, t, 'kneel', { tears: true });
        break;
      }

      case 'mid_div_hype':
      case 'mid_div_split':
      case 'mid_div_fill':
      case 'mid_div_youth': {
        drawGround();
        drawBanner('✂️ 除息真相：股價 $100 配息 $5 ➔ 變成 $95 ＋ 現金 $5！', '#ffd43b');
        ctx.fillStyle = '#1b2842';
        ctx.strokeStyle = '#ffd43b';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(W * 0.1, H * 0.32, W * 0.22, 86, 12);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 22px "Noto Sans TC", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('股價 $100', W * 0.21, H * 0.44);

        ctx.fillStyle = '#ffd43b';
        ctx.font = '900 26px sans-serif';
        ctx.fillText('➔', W * 0.38, H * 0.44);

        ctx.fillStyle = '#132a2e';
        ctx.strokeStyle = '#38bdf8';
        ctx.beginPath();
        ctx.roundRect(W * 0.44, H * 0.32, W * 0.2, 86, 12);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#38bdf8';
        ctx.font = '900 20px "Noto Sans TC", sans-serif';
        ctx.fillText('股價 $95', W * 0.54, H * 0.44);

        ctx.fillStyle = '#ffffff';
        ctx.fillText('＋', W * 0.68, H * 0.44);

        ctx.fillStyle = '#102d1d';
        ctx.strokeStyle = '#22e584';
        ctx.beginPath();
        ctx.roundRect(W * 0.72, H * 0.32, W * 0.18, 86, 12);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#22e584';
        ctx.fillText('息 $5', W * 0.81, H * 0.44);

        drawStick(ctx, W * 0.5, gy - 30, sc * 0.85, currentScene === 'mid_div_youth' ? COLORS.green : COLORS.yellow, t, 'think');
        break;
      }

      case 'choice_crash_hold': {
        drawGround();
        drawBanner('⚡ 中階抉擇 ⑤：股災跌 -30%，要亂賣借錢翻本，還是抱緊？', '#ffd43b');
        drawStick(ctx, W * 0.35, gy - 36, sc, COLORS.green, t, 'slash', { sword: true });
        drawStick(ctx, W * 0.66, gy - 36, sc, COLORS.red, t, 'shock', { sweat: true });
        break;
      }

      case 'mid_scam_ad':
      case 'mid_scam_actors':
      case 'mid_scam_fakeapp':
      case 'mid_scam_165':
      case 'choice_scam_app': {
        drawGround();
        drawBanner(
          currentScene === 'mid_scam_actors'
            ? '🎭 50 人 LINE 飆股群：49 個全是暗樁，只有 1 個真肥羊！'
            : currentScene === 'mid_scam_165'
              ? '📞 防詐三不＋有懷疑直接問爸媽或打 165 反詐騙！'
              : '🚨 假老師・假券商 APP・叫你繳「解凍金」＝ 100% 詐騙！',
          currentScene === 'mid_scam_165' ? '#22e584' : '#ff4757'
        );
        // Fake phone screen
        ctx.fillStyle = '#1f1218';
        ctx.strokeStyle = currentScene === 'mid_scam_165' ? '#22e584' : '#ff4757';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.roundRect(W * 0.35, H * 0.24, W * 0.3, H * 0.48, 16);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = currentScene === 'mid_scam_165' ? '#22e584' : '#ff7a2f';
        ctx.font = '900 20px "Noto Sans TC", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(currentScene === 'mid_scam_165' ? '📞 165 反詐騙' : '📱 假獲利 APP', W * 0.5, H * 0.4);
        ctx.fillStyle = '#ffffff';
        ctx.font = '800 15px "Noto Sans TC", sans-serif';
        ctx.fillText(currentScene === 'mid_scam_165' ? '不加群・不匯款！' : '假帳面 +300%！', W * 0.5, H * 0.54);

        drawStick(ctx, W * 0.22, gy - 36, sc * 0.9, COLORS.green, t, 'slash', { sword: true });
        drawStick(ctx, W * 0.78, gy - 36, sc * 0.9, COLORS.boss, t, 'hype');
        break;
      }

      case 'mid_summary': {
        drawBanner('⚡ 中階 4 大實戰神招集滿！', '#38bdf8');
        const items = [
          { ic: '🚫', t: '不無本當沖', c: '#ff4757' },
          { ic: '🧺', t: '大盤 ETF', c: '#22e584' },
          { ic: '✂️', t: '看懂除息', c: '#ffd43b' },
          { ic: '📞', t: '165 防詐騙', c: '#38bdf8' }
        ];
        const cw = Math.min(160, (W - 70) / 4);
        const sx = (W - (cw * 4 + 36)) / 2;
        items.forEach((it, i) => {
          const x = sx + i * (cw + 12);
          ctx.fillStyle = '#0e172a';
          ctx.strokeStyle = it.c;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.roundRect(x, H * 0.26, cw, H * 0.52, 14);
          ctx.fill();
          ctx.stroke();
          ctx.font = '38px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(it.ic, x + cw / 2, H * 0.46);
          ctx.fillStyle = it.c;
          ctx.font = '900 16px "Noto Sans TC", sans-serif';
          ctx.fillText(it.t, x + cw / 2, H * 0.65);
        });
        break;
      }

      // ================================================================
      // 🏆 高階（第 61 ～ 90 幕）視覺漫畫引擎
      // ================================================================
      case 'adv_rpg_team':
      case 'adv_stock_bond':
      case 'adv_rebalance':
      case 'adv_rebalance_win':
      case 'adv_age_ratio': {
        drawGround();
        drawBanner(
          currentScene === 'adv_rebalance' || currentScene === 'adv_rebalance_win'
            ? '⚖️ 每年【再平衡】：系統自動幫你做到「高賣、低買」！'
            : '⚔️🛡️ 資產配置像 RPG 隊伍：股票進攻 ＋ 現金公債防守！',
          '#ffd43b'
        );
        // Attack (Green) + Defense (Blue)
        ctx.fillStyle = 'rgba(34,229,132,0.16)';
        ctx.strokeStyle = '#22e584';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(W * 0.12, H * 0.26, W * 0.34, H * 0.48, 14);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#22e584';
        ctx.font = '900 20px "Noto Sans TC", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('⚔️ 進攻：股票 ETF', W * 0.29, H * 0.38);
        drawStick(ctx, W * 0.29, gy - 42, sc * 0.85, COLORS.green, t, 'slash', { sword: true });

        ctx.fillStyle = 'rgba(56,189,248,0.16)';
        ctx.strokeStyle = '#38bdf8';
        ctx.beginPath();
        ctx.roundRect(W * 0.54, H * 0.26, W * 0.34, H * 0.48, 14);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#38bdf8';
        ctx.fillText('🛡️ 防守：現金／公債', W * 0.71, H * 0.38);
        drawStick(ctx, W * 0.71, gy - 42, sc * 0.85, COLORS.blue, t, 'wave');
        break;
      }

      case 'adv_derivatives_intro':
      case 'adv_50x_wick':
      case 'adv_options_decay':
      case 'adv_zero_sum':
      case 'choice_50x_crypto': {
        ctx.fillStyle = currentScene === 'adv_50x_wick' ? 'rgba(180,15,25,0.24)' : '#05070c';
        ctx.fillRect(0, 0, W, H);
        drawGround();
        drawBanner(
          currentScene === 'adv_options_decay'
            ? '⏳ 選擇權買方會隨時間歸零；賣方一次股災就可能破產！'
            : '⚡ 50 倍合約：只要瞬間插針晃動【2%】➔ 0.5 秒爆倉歸零！',
          '#ff4757'
        );
        // Candlestick sharp downward wick!
        ctx.strokeStyle = '#ff4757';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(W * 0.2, H * 0.38);
        ctx.lineTo(W * 0.44, H * 0.38);
        ctx.lineTo(W * 0.5, H * 0.74); // Sharp 2% wick!
        ctx.lineTo(W * 0.56, H * 0.36);
        ctx.lineTo(W * 0.8, H * 0.28);
        ctx.stroke();
        ctx.fillStyle = '#ffd43b';
        ctx.font = '900 16px "Noto Sans TC", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('💥 僅晃動 -2% 插針 ➔ 50X 直接清算！', W * 0.5, H * 0.78);
        drawStick(ctx, W * 0.26, gy - 36, sc * 0.85, COLORS.green, t, 'think');
        drawStick(ctx, W * 0.74, gy - 14, sc * 0.85, COLORS.red, t, currentScene === 'adv_50x_wick' ? 'fall' : 'hype', { tears: currentScene === 'adv_50x_wick' });
        break;
      }

      case 'adv_brain_intro':
      case 'adv_fomo_cliff':
      case 'adv_sunk_cost':
      case 'adv_survivor_iceberg':
      case 'adv_brain_shield': {
        drawGround();
        const title =
          currentScene === 'adv_fomo_cliff'
            ? '🧠 陷阱 ① FOMO 錯失恐懼：衝去追高，剛好買在最高點！'
            : currentScene === 'adv_sunk_cost'
              ? '🧠 陷阱 ② 沉沒成本：買爛股不認錯，越攤越平越慘！'
              : currentScene === 'adv_survivor_iceberg'
                ? '🧊 陷阱 ③ 倖存者偏差：只看到 1 個炫富，沒看到 999 個破產！'
                : '🧠 投資最大的敵人是自己的大腦：冷靜就贏 90%！';
        drawBanner(title, currentScene === 'adv_brain_shield' ? '#22e584' : '#38bdf8');

        if (currentScene === 'adv_survivor_iceberg') {
          // Iceberg: tiny tip 1 winner, massive underwater 999 bankrupt
          ctx.fillStyle = 'rgba(56,189,248,0.18)';
          ctx.fillRect(0, H * 0.44, W, H * 0.56);
          ctx.fillStyle = '#e2e8f0';
          ctx.beginPath();
          ctx.moveTo(W * 0.5, H * 0.22);
          ctx.lineTo(W * 0.58, H * 0.44);
          ctx.lineTo(W * 0.42, H * 0.44);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = '#1e3a5f';
          ctx.beginPath();
          ctx.moveTo(W * 0.42, H * 0.44);
          ctx.lineTo(W * 0.58, H * 0.44);
          ctx.lineTo(W * 0.72, H * 0.82);
          ctx.lineTo(W * 0.28, H * 0.82);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = '#ffd43b';
          ctx.font = '900 16px "Noto Sans TC", sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('🏆 1 個發炫富文', W * 0.5, H * 0.36);
          ctx.fillStyle = '#ff4757';
          ctx.font = '900 22px "Noto Sans TC", sans-serif';
          ctx.fillText('💀 水面下 999 個默默爆倉破產！', W * 0.5, H * 0.66);
        } else {
          drawStick(ctx, W * 0.36, gy - 36, sc, COLORS.green, t, 'think');
          drawStick(ctx, W * 0.64, gy - 36, sc, COLORS.red, t, 'shock', { sweat: true });
        }
        break;
      }

      case 'adv_checkup_intro':
      case 'adv_light_cash':
      case 'adv_light_debt':
      case 'adv_light_moat':
      case 'choice_landmine': {
        drawGround();
        drawBanner('🚦 防地雷 3 紅綠燈：① 賺現金嗎？ ② 負債高嗎？ ③ 有護城河嗎？', '#ffd43b');
        const lights = [
          { lbl: '① 真賺現金', active: currentScene === 'adv_light_cash', col: '#ff4757', icon: '💵' },
          { lbl: '② 負債過高', active: currentScene === 'adv_light_debt', col: '#ff7a2f', icon: '⛓️' },
          { lbl: '③ 強護城河', active: currentScene === 'adv_light_moat', col: '#22e584', icon: '🏰' }
        ];
        lights.forEach((lt, idx) => {
          const cx = W * (0.25 + idx * 0.25);
          ctx.fillStyle = lt.active ? lt.col : '#162136';
          ctx.strokeStyle = lt.col;
          ctx.lineWidth = lt.active ? 5 : 2.5;
          ctx.beginPath();
          ctx.arc(cx, H * 0.44, 42, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.font = '32px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(lt.icon, cx, H * 0.44);
          ctx.fillStyle = '#ffffff';
          ctx.font = '900 15px "Noto Sans TC", sans-serif';
          ctx.fillText(lt.lbl, cx, H * 0.62);
        });
        drawStick(ctx, W * 0.12, gy - 32, sc * 0.85, COLORS.green, t, 'point');
        break;
      }

      case 'adv_fee_hole':
      case 'adv_fee_explain':
      case 'adv_low_cost':
      case 'adv_buffett_turtle':
      case 'adv_invest_self': {
        drawGround();
        drawBanner(
          currentScene === 'adv_invest_self'
            ? '🌟 16 歲回報率最高投資：自己的健康 ＋ 專長能力！'
            : currentScene === 'adv_low_cost' || currentScene === 'adv_buffett_turtle'
              ? '🐢 高階秘密武器：低管理費大盤 ETF ＋ 少動多抱！'
              : '🕳️ 頻繁殺進殺出 200 次 ➔ 獲利全被手續費與交易稅吃光！',
          currentScene === 'adv_fee_hole' || currentScene === 'adv_fee_explain' ? '#ff4757' : '#22e584'
        );
        if (currentScene === 'adv_fee_hole' || currentScene === 'adv_fee_explain') {
          ctx.fillStyle = '#000000';
          ctx.strokeStyle = '#ff4757';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.ellipse(W * 0.5, gy - 12, 96, 26, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = '#ff4757';
          ctx.font = '900 18px "Noto Sans TC", sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('💸 手續費＋交易稅黑洞', W * 0.5, gy - 7);
          drawStick(ctx, W * 0.25, gy - 36, sc, COLORS.red, t, 'cry', { tears: true });
        } else {
          drawStick(ctx, W * 0.5, gy - 36, sc * 1.05, COLORS.green, t, 'cheer');
          ctx.font = '40px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(currentScene === 'adv_invest_self' ? '🧠 💪 🌱' : '🐢 🏆 ✨', W * 0.5, H * 0.3);
        }
        break;
      }

      case 'adv_roadmap_16':
      case 'adv_roadmap_18':
      case 'adv_team_ready': {
        drawGround();
        drawBanner('🗺️ 16 歲 ➔ 18 歲 ➔ 30 歲：小綠的終身財富成長藍圖！', '#22e584');
        const steps = ['16歲：學觀念＋找爸媽', '18歲：6個月備用金', '長期：定期定額 ETF'];
        steps.forEach((st, i) => {
          const x = W * (0.18 + i * 0.32);
          const y = gy - 40 - i * 44;
          ctx.fillStyle = '#112236';
          ctx.strokeStyle = i === 2 ? '#ffd43b' : '#22e584';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.roundRect(x - 86, y - 34, 172, 42, 10);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = '#ffffff';
          ctx.font = '900 13px "Noto Sans TC", sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(st, x, y - 8);
        });
        drawStick(ctx, W * 0.36, gy - 36, sc * 0.9, COLORS.green, t, 'slash', { sword: true });
        drawStick(ctx, W * 0.2, gy - 36, sc * 0.85, COLORS.blue, t, 'wave');
        drawStick(ctx, W * 0.52, gy - 36, sc * 0.85, COLORS.yellow, t, 'point');
        break;
      }

      case 'choice_final_boss': {
        ctx.fillStyle = 'rgba(140, 15, 25, 0.25)';
        ctx.fillRect(0, 0, W, H);
        drawGround(0.84, '#ff4757');
        drawBanner('👑 最終 BOSS 決戰：高槓桿 × 假老師 × 五貸同堂大魔王！', '#ff4757');
        drawStick(ctx, W * 0.28, gy - 36, sc * 1.05, COLORS.green, t, 'slash', { sword: true });
        drawStick(ctx, W * 0.72, gy - 54, sc * 1.45, COLORS.boss, t, 'hype');
        ctx.fillStyle = '#ff4757';
        ctx.font = '900 22px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('💀 破產大魔王 LV.99', W * 0.72, H * 0.26);
        break;
      }

      // ================================================================
      // 📖 致敬《FX戰士久留美》經典爆倉名場面視覺引擎
      // ================================================================
      case 'kurumi_pray': {
        ctx.fillStyle = '#090308';
        ctx.fillRect(0, 0, W, H);
        drawGround(0.84, 'rgba(255,71,87,0.45)');
        drawBanner('📱 久留美名場面 ①：未實現虧損狂跳，雙手合十祈禱反彈…', '#ff4757');
        // Giant glowing smartphone screen with plunging FX chart
        const px = W * 0.56;
        const py = H * 0.2;
        ctx.fillStyle = '#18080e';
        ctx.strokeStyle = '#ff4757';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.roundRect(px, py, W * 0.3, H * 0.56, 16);
        ctx.fill();
        ctx.stroke();

        // Falling FX line
        ctx.strokeStyle = '#ff4757';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(px + 20, py + 45);
        ctx.lineTo(px + W * 0.1, py + 70);
        ctx.lineTo(px + W * 0.18, py + 110);
        ctx.lineTo(px + W * 0.26, py + H * 0.44);
        ctx.stroke();

        // Pulsing floating loss
        const loss = 120000 + Math.floor(Math.abs(Math.sin(t * 7)) * 45000);
        ctx.fillStyle = '#ff4757';
        ctx.font = '900 18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`-${loss.toLocaleString()}`, px + W * 0.15, py + 30);

        drawStick(ctx, W * 0.32, gy - 14, sc, COLORS.red, t, 'kneel', { sweat: true });
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 18px "Noto Sans TC", sans-serif';
        ctx.fillText('🙏 神啊拜託漲回去…', W * 0.32, H * 0.44 + Math.sin(t * 6) * 4);
        break;
      }

      case 'kurumi_add_margin': {
        ctx.fillStyle = 'rgba(140, 12, 24, 0.2)';
        ctx.fillRect(0, 0, W, H);
        drawGround();
        drawBanner('💸 死不停損！把獎學金＋存款狂補進「保證金」拉高防線…', '#ff7a2f');
        drawHPBar(ctx, W * 0.28, H * 0.25, W * 0.44, '⚠️ 保證金維持率（跌破 50% 強制平倉！）', 52 + Math.round(Math.sin(t * 9) * 2), 100, '#ff7a2f');
        drawStick(ctx, W * 0.32, gy - 36, sc, COLORS.red, t, 'shock', { sweat: true });
        ctx.fillStyle = '#ffd43b';
        ctx.font = '900 20px "Noto Sans TC", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🎓 獎學金 ＋ 💰 存款 ➔ 丟進無底洞！', W * 0.64, H * 0.6);
        break;
      }

      case 'kurumi_roscut': {
        ctx.fillStyle = `rgba(200, 15, 30, ${0.28 + Math.sin(t * 12) * 0.1})`;
        ctx.fillRect(0, 0, W, H);
        drawGround(0.84, '#ff4757');
        // Iconic ROSCUT Notification Popup!
        ctx.fillStyle = '#1f060c';
        ctx.strokeStyle = '#ff4757';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.roundRect(W * 0.16, H * 0.15, W * 0.68, H * 0.34, 16);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#ff4757';
        ctx.font = `900 ${Math.min(28, W * 0.044)}px "Noto Sans TC", sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText('🚨 強制平倉通知（ROSCUT）', W * 0.5, H * 0.27);
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 17px "Noto Sans TC", sans-serif';
        ctx.fillText('保證金不足，已全部強制清算！餘額：$0', W * 0.5, H * 0.4);

        drawStick(ctx, W * 0.5, gy - 12, sc, COLORS.red, t, 'fall', { tears: true });
        break;
      }

      case 'kurumi_blind_follow':
      case 'kurumi_betrayed': {
        ctx.fillStyle = currentScene === 'kurumi_betrayed' ? 'rgba(170, 15, 30, 0.24)' : '#05070c';
        ctx.fillRect(0, 0, W, H);
        drawGround();
        drawBanner(
          currentScene === 'kurumi_betrayed'
            ? '🎭 報明牌的人私下做反方向！盲從加借錢瞬間爆倉！'
            : '📖 芽吹式經典慘案：獎學金＋刷卡＋借錢全砸 25 倍 FX！',
          '#ff4757'
        );
        drawStick(ctx, W * 0.36, gy - 36, sc, COLORS.red, t, currentScene === 'kurumi_betrayed' ? 'kneel' : 'hype', { tears: currentScene === 'kurumi_betrayed' });
        drawStick(ctx, W * 0.72, gy - 36, sc, COLORS.boss, t, 'point');
        ctx.fillStyle = '#ffd43b';
        ctx.font = '900 17px "Noto Sans TC", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🎓獎學金 ＋ 💳刷卡 ＋ 🤝借錢 ➔ FX 25X', W * 0.38, H * 0.3);
        ctx.fillStyle = '#ff7a2f';
        ctx.fillText(currentScene === 'kurumi_betrayed' ? '😈 (私下做反方向大賺!)' : '😈 聽我的穩賺！', W * 0.72, H * 0.3);
        break;
      }

      case 'kurumi_choice_margin': {
        ctx.fillStyle = `rgba(160, 15, 30, ${0.16 + Math.sin(t * 8) * 0.06})`;
        ctx.fillRect(0, 0, W, H);
        drawGround(0.84, '#ff4757');
        drawBanner('📱 手機狂震！保證金維持率 55%，即將強制平倉！', '#ffd43b');
        drawHPBar(ctx, W * 0.28, H * 0.25, W * 0.44, '⚠️ FX 25X 保證金防線（快斷頭了！）', 55, 100, '#ff4757');
        drawStick(ctx, W * 0.35, gy - 36, sc, COLORS.green, t, 'think');
        drawStick(ctx, W * 0.65, gy - 36, sc, COLORS.red, t, 'cry', { tears: true });
        break;
      }

      case 'kurumi_revenge_trade': {
        ctx.fillStyle = 'rgba(150, 10, 25, 0.22)';
        ctx.fillRect(0, 0, W, H);
        drawGround();
        drawBanner('🌀 報復性交易心魔：「我要把虧掉的錢一口氣贏回來！」', '#ff4757');
        // Spinning red spiral behind Red
        ctx.save();
        ctx.translate(W * 0.5, H * 0.48);
        ctx.rotate(t * 3);
        ctx.strokeStyle = 'rgba(255,71,87,0.55)';
        ctx.lineWidth = 4;
        ctx.setLineDash([14, 10]);
        ctx.beginPath();
        ctx.arc(0, 0, 88, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, 56, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
        drawStick(ctx, W * 0.5, gy - 36, sc, COLORS.red, t, 'hype', { sweat: true });
        break;
      }

      case 'kurumi_3am_chart': {
        ctx.fillStyle = '#03050a';
        ctx.fillRect(0, 0, W, H);
        drawGround(0.84, 'rgba(255,71,87,0.35)');
        drawBanner('🕒 半夜 03:00 死盯手機 K 線 ➔ 心跳 140、失眠焦慮！', '#ff4757');
        // Digital 03:00 AM clock
        ctx.fillStyle = '#ff4757';
        ctx.font = '900 34px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('03:00 AM', W * 0.26, H * 0.35);
        ctx.fillStyle = '#ff7a2f';
        ctx.font = '900 20px monospace';
        ctx.fillText('💓 140 BPM!', W * 0.26, H * 0.48);

        // Glowing K-line screen
        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.fillRect(W * 0.56, H * 0.24, W * 0.28, H * 0.36);
        ctx.strokeRect(W * 0.56, H * 0.24, W * 0.28, H * 0.36);
        for (let i = 0; i < 6; i++) {
          const ch = 20 + Math.abs(Math.sin(t * 6 + i)) * 55;
          ctx.fillStyle = i % 2 === 0 ? '#22e584' : '#ff4757';
          ctx.fillRect(W * 0.59 + i * 28, H * 0.44 - ch / 2, 14, ch);
        }
        drawStick(ctx, W * 0.46, gy - 36, sc * 0.95, COLORS.red, t, 'shock', { sweat: true });
        break;
      }

      case 'kurumi_peace_sleep':
      case 'kurumi_author_warn': {
        const sky = ctx.createLinearGradient(0, 0, 0, H);
        sky.addColorStop(0, '#061124');
        sky.addColorStop(1, '#0d1f3a');
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, W, H);
        drawGround(0.84, '#22e584');
        drawBanner(
          currentScene === 'kurumi_author_warn'
            ? '🌙 黃金檢查：讓你晚上睡不著的投資，就是買太大或開槓桿了！'
            : '💤 沒有槓桿焦慮的感覺超爽！安心睡到自然醒才是真贏家！',
          '#22e584'
        );
        // Stars & Moon
        ctx.fillStyle = '#ffd43b';
        ctx.font = '40px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🌙', W * 0.2, H * 0.3);
        ctx.fillStyle = '#22e584';
        ctx.font = '900 28px monospace';
        ctx.fillText('Zzz...', W * 0.58, H * 0.38 + Math.sin(t * 2.5) * 8);
        drawStick(ctx, W * 0.5, gy - 36, sc * 1.05, COLORS.green, t, 'wave');
        break;
      }

      // ---------- GAME OVER BANKRUPTCY SCENES ----------
      case 'gameover_leverage':
      case 'gameover_fiveloans':
      case 'gameover_scam':
      case 'gameover_daytrade':
      case 'gameover_50x':
      case 'gameover_landmine':
      case 'gameover_roscut':
      case 'gameover_boss': {
        ctx.fillStyle = '#160408';
        ctx.fillRect(0, 0, W, H);
        drawGround(0.84, '#ff4757');
        ctx.fillStyle = '#ff4757';
        ctx.font = `900 ${Math.min(44, W * 0.07)}px monospace`;
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', W * 0.5, H * 0.24);
        ctx.font = '900 18px "Noto Sans TC", sans-serif';
        ctx.fillStyle = '#fecdd3';
        const reasonMap = {
          gameover_leverage: '💥 10 倍槓桿跌 -15% ➔ 強制斷頭＋負債！',
          gameover_fiveloans: '🏠 五貸同堂繳不出利息 ➔ 斷頭＋房子法拍！',
          gameover_scam: '🚨 假老師・假 APP 詐騙 ➔ 存款瞬間歸零！',
          gameover_daytrade: '🔒 無本當沖遇跌停鎖死 ➔ 違約交割信用全毀！',
          gameover_50x: '⚡ 50 倍合約僅晃動 -2% ➔ 0.5 秒強制爆倉！',
          gameover_landmine: '💣 連虧高負債地雷股下市 ➔ 股票變壁紙！',
          gameover_roscut: '🚨 叮咚！強制平倉通知（ROSCUT）➔ 補進去的錢全部蒸發！',
          gameover_boss: '💀 貪心碰槓桿與借貸 ➔ 遭破產魔王吞噬！'
        };
        ctx.fillText(reasonMap[currentScene] || '💀 財務 HP 歸零破產！', W * 0.5, H * 0.37);
        drawHPBar(ctx, W * 0.34, H * 0.44, W * 0.32, '💀 你的財務 HP', 0, 100, '#ff4757');
        drawStick(ctx, W * 0.5, gy - 8, sc, COLORS.green, t, 'kneel', { tears: true });
        break;
      }

      // ================================================================
      // 🆕 新增初級/中級/高級專屬漫畫場景
      // ================================================================
      case 'beg_age_start': {
        drawGround();
        drawBanner('🎂 幾歲可以開始投資？未滿 18 歲爸媽陪同開戶・現在就能學觀念！', '#22e584');
        const boxes = [
          { t1: '16 歲現在', t2: '學觀念＋找爸媽陪同', c: '#22e584' },
          { t1: '18 歲以後', t2: '獨立開證券戶出發！', c: '#38bdf8' }
        ];
        boxes.forEach((b, i) => {
          const x = W * (0.14 + i * 0.42);
          ctx.fillStyle = '#0e1b2e';
          ctx.strokeStyle = b.c;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.roundRect(x, H * 0.24, W * 0.3, 92, 12);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = b.c;
          ctx.font = '900 20px "Noto Sans TC", sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(b.t1, x + W * 0.15, H * 0.33);
          ctx.fillStyle = '#ffffff';
          ctx.font = '800 15px "Noto Sans TC", sans-serif';
          ctx.fillText(b.t2, x + W * 0.15, H * 0.42);
        });
        drawStick(ctx, W * 0.42, gy - 34, sc, COLORS.green, t, 'wave');
        drawStick(ctx, W * 0.58, gy - 34, sc, COLORS.blue, t, 'wave');
        break;
      }

      case 'beg_terms_principal': {
        drawGround();
        drawBanner('📘 基礎名詞：本金 $100 ＋ 報酬率 (+10%) ＝ $110', '#ffd43b');
        const cols = [
          { lbl: '本金 $100', c: '#38bdf8', x: 0.2 },
          { lbl: '＋ 賺 $10 (+10%)', c: '#22e584', x: 0.5 },
          { lbl: '＝ $110', c: '#ffd43b', x: 0.8 }
        ];
        cols.forEach(col => {
          ctx.fillStyle = '#111a2e';
          ctx.strokeStyle = col.c;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.roundRect(W * col.x - 86, H * 0.3, 172, 74, 12);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = col.c;
          ctx.font = '900 18px "Noto Sans TC", sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(col.lbl, W * col.x, H * 0.39);
        });
        drawStick(ctx, W * 0.5, gy - 34, sc * 0.9, COLORS.yellow, t, 'point');
        break;
      }

      case 'mid_method_map': {
        drawBanner('🗺️ 中級武器庫：6 大常見投資方法（從安全到高風險）', '#38bdf8');
        const tools = [
          { ic: '🏦', t: '① 定存', c: '#94a3b8' },
          { ic: '📜', t: '② 債券', c: '#38bdf8' },
          { ic: '📈', t: '③ 股票', c: '#ffd43b' },
          { ic: '🧺', t: '④ ETF', c: '#22e584' },
          { ic: '🏠', t: '⑤ 房產借貸', c: '#ff7a2f' },
          { ic: '⚡', t: '⑥ 期貨/FX', c: '#ff4757' }
        ];
        const cw = Math.min(115, (W - 76) / 6);
        const sx = (W - (cw * 6 + 40)) / 2;
        tools.forEach((tl, i) => {
          const x = sx + i * (cw + 8);
          ctx.fillStyle = '#0e172a';
          ctx.strokeStyle = tl.c;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.roundRect(x, H * 0.28, cw, H * 0.46, 12);
          ctx.fill();
          ctx.stroke();
          ctx.font = '32px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(tl.ic, x + cw / 2, H * 0.46);
          ctx.fillStyle = tl.c;
          ctx.font = '900 13px "Noto Sans TC", sans-serif';
          ctx.fillText(tl.t, x + cw / 2, H * 0.64);
        });
        break;
      }

      case 'mid_deposit_cash': {
        drawGround();
        drawBanner('🏦 方法 ① 銀行定存：最安全護盾（放備用金），但跑輸通膨', '#38bdf8');
        ctx.fillStyle = '#102138';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.roundRect(W * 0.34, H * 0.25, W * 0.32, 110, 14);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#38bdf8';
        ctx.font = '900 22px "Noto Sans TC", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🏦 銀行定存 ~1.5%', W * 0.5, H * 0.37);
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '800 15px "Noto Sans TC", sans-serif';
        ctx.fillText('🛡️ 幾乎不虧，適合放急用錢', W * 0.5, H * 0.47);
        drawStick(ctx, W * 0.24, gy - 34, sc * 0.9, COLORS.blue, t, 'wave');
        break;
      }

      case 'mid_bond_intro':
      case 'mid_bond_risk': {
        drawGround();
        drawBanner(
          currentScene === 'mid_bond_risk'
            ? '⚖️ 債券實例：🛡️ 政府公債超穩  VS  💣 高息垃圾債可能倒債！'
            : '📜 方法 ② 債券：你當銀行，借錢給國家或大企業領固定利息！',
          currentScene === 'mid_bond_risk' ? '#ffd43b' : '#38bdf8'
        );
        ctx.fillStyle = '#0f2538';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(W * 0.1, H * 0.26, W * 0.34, 115, 14);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#38bdf8';
        ctx.font = '900 19px "Noto Sans TC", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🛡️ 政府公債 (高信用)', W * 0.27, H * 0.37);
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '800 14px "Noto Sans TC", sans-serif';
        ctx.fillText('穩定領息・當防守盾牌', W * 0.27, H * 0.48);

        ctx.fillStyle = '#291018';
        ctx.strokeStyle = '#ff4757';
        ctx.beginPath();
        ctx.roundRect(W * 0.56, H * 0.26, W * 0.34, 115, 14);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#ff4757';
        ctx.font = '900 19px "Noto Sans TC", sans-serif';
        ctx.fillText('💣 高息垃圾債 (低信用)', W * 0.73, H * 0.37);
        ctx.fillStyle = '#fecdd3';
        ctx.font = '800 14px "Noto Sans TC", sans-serif';
        ctx.fillText('利息誘人・公司倒就拿不回！', W * 0.73, H * 0.48);

        drawStick(ctx, W * 0.5, gy - 34, sc * 0.88, currentScene === 'mid_bond_risk' ? COLORS.yellow : COLORS.green, t, 'think');
        break;
      }

      case 'adv_prep_budget': {
        drawBanner('📦 16 歲現在準備 ①：零用錢「四桶分帳法」練習！', '#22e584');
        const buckets = [
          { ic: '🍱', t: '生活需要', c: '#38bdf8' },
          { ic: '🛡️', t: '緊急備用金', c: '#22e584' },
          { ic: '🌱', t: '未來儲蓄', c: '#ffd43b' },
          { ic: '🎮', t: '開心娛樂', c: '#ff7a2f' }
        ];
        const cw = Math.min(160, (W - 70) / 4);
        const sx = (W - (cw * 4 + 36)) / 2;
        buckets.forEach((b, i) => {
          const x = sx + i * (cw + 12);
          ctx.fillStyle = '#0e172a';
          ctx.strokeStyle = b.c;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.roundRect(x, H * 0.26, cw, H * 0.52, 14);
          ctx.fill();
          ctx.stroke();
          ctx.font = '38px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(b.ic, x + cw / 2, H * 0.46);
          ctx.fillStyle = b.c;
          ctx.font = '900 16px "Noto Sans TC", sans-serif';
          ctx.fillText(b.t, x + cw / 2, H * 0.65);
        });
        break;
      }

      case 'adv_prep_shield': {
        drawGround();
        drawBanner('🛡️ 現在準備 ②：先存下第一筆「緊急備用金」安全 HP！', '#38bdf8');
        drawHPBar(ctx, W * 0.28, H * 0.25, W * 0.44, '🛡️ 緊急備用金護盾（急用現金不進股市！）', 100, 100, '#22e584');
        drawStick(ctx, W * 0.5, gy - 34, sc, COLORS.green, t, 'cheer');
        break;
      }

      case 'adv_prep_parents': {
        drawGround();
        drawBanner('📝 現在準備 ③：找爸媽討論理財 ＋ 零風險「紙上模擬觀察」！', '#ffd43b');
        drawStick(ctx, W * 0.34, gy - 34, sc, COLORS.green, t, 'wave');
        drawStick(ctx, W * 0.52, gy - 34, sc * 0.95, COLORS.blue, t, 'wave');
        ctx.fillStyle = '#111b30';
        ctx.strokeStyle = '#ffd43b';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(W * 0.64, H * 0.28, W * 0.26, 110, 12);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#ffd43b';
        ctx.font = '900 17px "Noto Sans TC", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('📓 紙上記錄練習', W * 0.77, H * 0.4);
        ctx.fillStyle = '#ffffff';
        ctx.font = '800 14px "Noto Sans TC", sans-serif';
        ctx.fillText('不花真錢也能練手感!', W * 0.77, H * 0.5);
        break;
      }

      case 'adv_learn_path': {
        drawBanner('🧭 未來進修 4 大學習方向（越學越強！）', '#ffd43b');
        const paths = [
          { ic: '🧺', t1: '① ETF 細節', t2: '成分股與費用率', c: '#22e584' },
          { ic: '📊', t1: '② 基礎財報', t2: '營收・現金・負債', c: '#38bdf8' },
          { ic: '🌍', t1: '③ 總體經濟', t2: '利率・通膨・景氣', c: '#ffd43b' },
          { ic: '📚', t1: '④ 行為財務', t2: '克服人性貪與怕', c: '#ff7a2f' }
        ];
        const cw = Math.min(160, (W - 70) / 4);
        const sx = (W - (cw * 4 + 36)) / 2;
        paths.forEach((p, i) => {
          const x = sx + i * (cw + 12);
          ctx.fillStyle = '#0e172a';
          ctx.strokeStyle = p.c;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.roundRect(x, H * 0.25, cw, H * 0.54, 14);
          ctx.fill();
          ctx.stroke();
          ctx.font = '34px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(p.ic, x + cw / 2, H * 0.42);
          ctx.fillStyle = p.c;
          ctx.font = '900 15px "Noto Sans TC", sans-serif';
          ctx.fillText(p.t1, x + cw / 2, H * 0.58);
          ctx.fillStyle = '#cbd5e1';
          ctx.font = '700 13px "Noto Sans TC", sans-serif';
          ctx.fillText(p.t2, x + cw / 2, H * 0.7);
        });
        break;
      }

      // ---------- GRAND TRUE ENDING (100/100) ----------
      case 'grand_ending':
      case 'true_ending': {
        drawGround(0.84, '#ffd43b');
        drawBanner('👑 GRAND TRUE ENDING：小綠完成【初・中・高級】全部 100 幕！', '#ffd43b');
        if (Math.random() < 0.08) {
          burst(W * (0.12 + Math.random() * 0.76), H * (0.18 + Math.random() * 0.32), 26, ['#22e584', '#ffd43b', '#38bdf8', '#ffffff'], 5.5, 4);
        }
        drawStick(ctx, W * 0.5, gy - 36, sc * 1.15, COLORS.green, t, 'cheer');
        drawStick(ctx, W * 0.32, gy - 36, sc * 0.92, COLORS.blue, t, 'cheer');
        drawStick(ctx, W * 0.68, gy - 36, sc * 0.92, COLORS.yellow, t, 'cheer');
        drawStick(ctx, W * 0.86, gy - 36, sc * 0.8, COLORS.red, t, 'idle', { sweat: true });
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(W * 0.75, H * 0.32, W * 0.22, 34);
        ctx.fillStyle = '#111827';
        ctx.font = '900 12px "Noto Sans TC", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('我徹底戒掉槓桿了!', W * 0.86, H * 0.32 + 21);

        ctx.font = '46px sans-serif';
        ctx.fillText('👑', W * 0.5, H * 0.28 + Math.sin(t * 4) * 5);
        break;
      }

      default:
        drawStick(ctx, W * 0.5, gy - 36, sc, COLORS.green, t, 'idle');
    }

    // Update particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.14;
      p.life -= p.decay;
      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }
      ctx.save();
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function loop() {
    t += 0.016;
    sceneTime += 0.016;
    drawComicScene();
    rafId = requestAnimationFrame(loop);
  }

  loop();

  return {
    setScene,
    destroy: () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    }
  };
}
