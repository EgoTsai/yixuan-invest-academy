/* ============================================================
   comicEngine.js — Alan Becker 火柴人 × Undertale 60fps 動態漫畫引擎
   主角：🟢 小綠 (#22e584) 代表易軒
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
      sceneKey.startsWith('gameover_')
    ) {
      burst(W * 0.55, H * 0.5, 55, ['#ff4757', '#ff7a2f', '#ffd43b', '#ffffff'], 7, 5);
    } else if (sceneKey === 'true_ending') {
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
        drawBanner('🟢 主角登場：小綠（16歲的易軒）', '#22e584');
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
        drawBanner('💚 16 歲易軒的 4 大黃金防破產守則', '#22e584');
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

      // ---------- GAME OVER BANKRUPTCY SCENES ----------
      case 'gameover_leverage':
      case 'gameover_fiveloans':
      case 'gameover_scam': {
        ctx.fillStyle = '#160408';
        ctx.fillRect(0, 0, W, H);
        drawGround(0.84, '#ff4757');
        ctx.fillStyle = '#ff4757';
        ctx.font = `900 ${Math.min(44, W * 0.07)}px monospace`;
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', W * 0.5, H * 0.24);
        ctx.font = '900 18px "Noto Sans TC", sans-serif';
        ctx.fillStyle = '#fecdd3';
        ctx.fillText(
          currentScene === 'gameover_leverage'
            ? '💥 10 倍槓桿跌 -15% ➔ 強制斷頭＋負債！'
            : currentScene === 'gameover_fiveloans'
              ? '🏠 五貸同堂繳不出利息 ➔ 斷頭＋房子法拍！'
              : '🚨 高槓桿＋假老師陷阱 ➔ 存款 3 天歸零！',
          W * 0.5,
          H * 0.37
        );
        drawHPBar(ctx, W * 0.34, H * 0.44, W * 0.32, '💀 你的財務 HP', 0, 100, '#ff4757');
        drawStick(ctx, W * 0.5, gy - 8, sc, COLORS.green, t, 'kneel', { tears: true });
        break;
      }

      // ---------- TRUE ENDING ----------
      case 'true_ending': {
        drawGround(0.84, '#22e584');
        drawBanner('🏆 TRUE ENDING：易軒（小綠）成為防破產大師！', '#ffd43b');
        if (Math.random() < 0.06) {
          burst(W * (0.15 + Math.random() * 0.7), H * (0.2 + Math.random() * 0.3), 24, ['#22e584', '#ffd43b', '#38bdf8', '#ffffff'], 5, 4);
        }
        drawStick(ctx, W * 0.5, gy - 36, sc * 1.1, COLORS.green, t, 'cheer');
        drawStick(ctx, W * 0.32, gy - 36, sc * 0.92, COLORS.blue, t, 'cheer');
        drawStick(ctx, W * 0.68, gy - 36, sc * 0.92, COLORS.yellow, t, 'cheer');
        // Funny Red holding white surrender sign!
        drawStick(ctx, W * 0.86, gy - 36, sc * 0.8, COLORS.red, t, 'idle', { sweat: true });
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(W * 0.76, H * 0.32, W * 0.21, 34);
        ctx.fillStyle = '#111827';
        ctx.font = '900 12px "Noto Sans TC", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('我再也不開槓桿了!', W * 0.865, H * 0.32 + 21);

        ctx.font = '44px sans-serif';
        ctx.fillText('🏆', W * 0.5, H * 0.3 + Math.sin(t * 4) * 5);
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
