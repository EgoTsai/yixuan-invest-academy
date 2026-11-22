/* ============================================================
   app.js — 易軒的投資片場主控制器
   ============================================================ */

import { CHAPTERS } from './data.js';
import { AudioEngine } from './audio.js';
import { mountScene, mountDisasterSandbox } from './scenes.js';

const STORAGE_KEY = 'yixuan_invest_academy_v1';

const state = {
  completed: [],
  coins: 0,
  currentChapterId: null,
  stageStep: 'play', // 'play' | 'quiz' | 'medal'
  quizIdx: 0,
  quizLocked: false,
  destroyScene: null,
  sandboxController: null
};

// ---- Load / Save Progress ----
function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    if (Array.isArray(data.completed)) state.completed = data.completed;
    if (typeof data.coins === 'number') state.coins = data.coins;
  } catch (_) {}
}

function saveProgress() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ completed: state.completed, coins: state.coins })
    );
  } catch (_) {}
}

// ---- Confetti Fireworks Celebration ----
function fireConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const colors = ['#ffb800', '#00d4ff', '#22e584', '#ff7a2f', '#ff4757', '#ffffff'];
  const pieces = Array.from({ length: 110 }, () => ({
    x: canvas.width * (0.2 + Math.random() * 0.6),
    y: canvas.height * 0.38,
    vx: (Math.random() - 0.5) * 14,
    vy: -6 - Math.random() * 10,
    size: 6 + Math.random() * 7,
    rot: Math.random() * Math.PI * 2,
    vrot: (Math.random() - 0.5) * 0.25,
    color: colors[Math.floor(Math.random() * colors.length)],
    life: 1
  }));

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    pieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.28;
      p.rot += p.vrot;
      p.life -= 0.011;
      if (p.life > 0) {
        alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
        ctx.restore();
      }
    });
    if (alive) requestAnimationFrame(tick);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  tick();
}

// ---- Cleanup Active Canvas Engines ----
function cleanupActiveViews() {
  if (state.destroyScene) {
    state.destroyScene();
    state.destroyScene = null;
  }
  if (state.sandboxController) {
    state.sandboxController.destroy();
    state.sandboxController = null;
  }
  AudioEngine.stopSpeak();
}

function showView(id) {
  ['view-home', 'view-stage', 'view-sandbox'].forEach(v => {
    document.getElementById(v).classList.toggle('hidden', v !== id);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---- Topbar & Home Progress UI ----
function updateHeaderStats() {
  document.getElementById('stat-stars').textContent = `${state.completed.length}/${CHAPTERS.length}`;
  document.getElementById('stat-coins').textContent = state.coins;

  const pct = Math.round((state.completed.length / CHAPTERS.length) * 100);
  const fill = document.getElementById('home-progress-fill');
  if (fill) fill.style.width = `${pct}%`;

  const badgeRow = document.getElementById('home-badge-row');
  if (badgeRow) {
    badgeRow.innerHTML = CHAPTERS.map(ch => {
      const earned = state.completed.includes(ch.id);
      return `<div class="mini-badge ${earned ? 'earned' : ''}" title="${ch.badgeName}">${ch.badgeIcon}</div>`;
    }).join('');
  }

  // Update Hero CTA text
  const nextCh = CHAPTERS.find(c => !state.completed.includes(c.id)) || CHAPTERS[0];
  const heroStart = document.getElementById('btn-hero-start');
  if (heroStart) {
    heroStart.textContent =
      state.completed.length === 0
        ? '🎬 第 1 關：立刻開拍！'
        : state.completed.length === CHAPTERS.length
          ? '🏆 全部通關！再玩一次！'
          : `▶️ 繼續第 ${nextCh.num} 關：${nextCh.title}`;
    heroStart.onclick = () => openChapter(nextCh.id);
  }
}

function renderHomeGrid() {
  const grid = document.getElementById('chapter-grid');
  grid.innerHTML = CHAPTERS.map(ch => {
    const done = state.completed.includes(ch.id);
    return `
      <button class="chapter-card ${done ? 'completed' : ''}" data-chapter="${ch.id}">
        <div class="chapter-thumb-wrap">
          <img class="chapter-thumb" src="${ch.image}" alt="${ch.title}" loading="lazy" />
          <div class="chapter-thumb-overlay"></div>
          <span class="chapter-num-tag">第 ${ch.num} 關</span>
          ${done ? `<span class="chapter-done-tag">✅ 已通關 ${ch.badgeIcon}</span>` : ''}
          <span class="chapter-world-label">${ch.worldBadge}</span>
        </div>
        <div class="chapter-body">
          <h3 class="chapter-title">${ch.badgeIcon} ${ch.title}</h3>
          <p class="chapter-hook">${ch.hook}</p>
          <div class="chapter-footer">
            <span class="chapter-play-pill">${done ? '🔄 再玩一次動畫' : '▶️ 看動畫玩實驗'}</span>
            <span style="font-size:1.2rem;">🔊</span>
          </div>
        </div>
      </button>
    `;
  }).join('');

  grid.querySelectorAll('.chapter-card').forEach(card => {
    card.onclick = () => {
      AudioEngine.sfx.click();
      openChapter(card.dataset.chapter);
    };
  });
}

function goHome() {
  cleanupActiveViews();
  renderHomeGrid();
  updateHeaderStats();
  showView('view-home');
}

// ---- Stage View (Play -> Quiz -> Medal) ----
function openChapter(chapterId) {
  cleanupActiveViews();
  state.currentChapterId = chapterId;
  state.stageStep = 'play';
  state.quizIdx = 0;
  state.quizLocked = false;
  showView('view-stage');
  renderStage();
}

function getCurrentChapter() {
  return CHAPTERS.find(c => c.id === state.currentChapterId) || CHAPTERS[0];
}

function renderStage() {
  const ch = getCurrentChapter();
  document.getElementById('stage-world-badge').textContent = ch.worldBadge;
  document.getElementById('stage-title').textContent = `第 ${ch.num} 關：${ch.title}`;

  // Step tabs state
  const tabPlay = document.getElementById('tab-play');
  const tabQuiz = document.getElementById('tab-quiz');
  const tabMedal = document.getElementById('tab-medal');

  tabPlay.className = `step-tab ${state.stageStep === 'play' ? 'active' : 'done'}`;
  tabQuiz.className = `step-tab ${state.stageStep === 'quiz' ? 'active' : state.stageStep === 'medal' ? 'done' : ''}`;
  tabMedal.className = `step-tab ${state.stageStep === 'medal' ? 'active' : ''}`;

  document.getElementById('pane-play').classList.toggle('hidden', state.stageStep !== 'play');
  document.getElementById('pane-quiz').classList.toggle('hidden', state.stageStep !== 'quiz');
  document.getElementById('pane-medal').classList.toggle('hidden', state.stageStep !== 'medal');

  if (state.destroyScene) {
    state.destroyScene();
    state.destroyScene = null;
  }

  if (state.stageStep === 'play') {
    document.getElementById('play-prompt-text').textContent = ch.shortPrompt;
    document.getElementById('play-takeaway-text').textContent = ch.takeaway;

    document.getElementById('btn-speak-intro').onclick = () => AudioEngine.speak(ch.voiceIntro, true);
    document.getElementById('btn-speak-takeaway').onclick = () => AudioEngine.speak(ch.takeawayVoice, true);

    const canvas = document.getElementById('stage-canvas');
    const controlsEl = document.getElementById('stage-controls');
    state.destroyScene = mountScene(ch.sceneType, canvas, controlsEl, msg => {
      AudioEngine.speak(msg, false);
    });

    AudioEngine.speak(ch.voiceIntro, false);
  } else if (state.stageStep === 'quiz') {
    renderQuizQuestion();
  } else if (state.stageStep === 'medal') {
    renderMedalPane();
  }
}

function renderQuizQuestion() {
  const ch = getCurrentChapter();
  const q = ch.quiz[state.quizIdx];
  state.quizLocked = false;

  // Progress dots
  const dotsEl = document.getElementById('quiz-dots');
  dotsEl.innerHTML = ch.quiz
    .map((_, idx) => {
      const cls = idx < state.quizIdx ? 'done' : idx === state.quizIdx ? 'current' : '';
      return `<div class="q-dot ${cls}"></div>`;
    })
    .join('');

  document.getElementById('quiz-icon').textContent = q.icon;
  document.getElementById('quiz-question').textContent = `(${state.quizIdx + 1}/3) ${q.question}`;
  document.getElementById('btn-speak-quiz').onclick = () => AudioEngine.speak(q.voice, true);

  const feedbackEl = document.getElementById('quiz-feedback');
  feedbackEl.classList.add('hidden');
  feedbackEl.innerHTML = '';

  const optsEl = document.getElementById('quiz-options');
  optsEl.innerHTML = q.options
    .map(
      (opt, idx) => `
      <button class="quiz-opt-btn" data-idx="${idx}">
        <span class="quiz-opt-icon">${opt.icon}</span>
        <span class="quiz-opt-label">${opt.label}</span>
      </button>
    `
    )
    .join('');

  optsEl.querySelectorAll('.quiz-opt-btn').forEach(btn => {
    btn.onclick = () => {
      if (state.quizLocked) return;
      const chosen = q.options[Number(btn.dataset.idx)];
      if (chosen.correct) {
        state.quizLocked = true;
        btn.classList.add('correct');
        AudioEngine.sfx.correct();
        state.coins += 20;
        saveProgress();
        updateHeaderStats();

        feedbackEl.className = 'quiz-feedback good';
        feedbackEl.innerHTML = `
          <div class="quiz-feedback-msg">✅ ${q.goodMsg} (+20 🪙)</div>
          <button class="btn btn-emerald" id="btn-quiz-next">
            ${state.quizIdx < ch.quiz.length - 1 ? '下一題 ➡️' : '領取勳章 🏆'}
          </button>
        `;
        feedbackEl.classList.remove('hidden');
        AudioEngine.speak(q.goodMsg, false);

        feedbackEl.querySelector('#btn-quiz-next').onclick = () => {
          AudioEngine.sfx.click();
          if (state.quizIdx < ch.quiz.length - 1) {
            state.quizIdx++;
            renderQuizQuestion();
          } else {
            if (!state.completed.includes(ch.id)) {
              state.completed.push(ch.id);
              state.coins += 50;
              saveProgress();
            }
            updateHeaderStats();
            state.stageStep = 'medal';
            renderStage();
          }
        };
      } else {
        btn.classList.add('wrong');
        AudioEngine.sfx.wrong();
        feedbackEl.className = 'quiz-feedback try-again';
        feedbackEl.innerHTML = `
          <div class="quiz-feedback-msg">💡 ${q.badMsg}</div>
        `;
        feedbackEl.classList.remove('hidden');
        AudioEngine.speak(q.badMsg, false);
        setTimeout(() => btn.classList.remove('wrong'), 700);
      }
    };
  });

  AudioEngine.speak(q.voice, false);
}

function renderMedalPane() {
  const ch = getCurrentChapter();
  AudioEngine.sfx.fanfare();
  fireConfetti();

  document.getElementById('medal-icon').textContent = ch.badgeIcon;
  document.getElementById('medal-name').textContent = `獲得【${ch.badgeName}】！`;
  document.getElementById('medal-slogan').textContent = ch.takeaway;

  AudioEngine.speak(`恭喜易軒通關！獲得${ch.badgeName}！${ch.takeawayVoice}`, false);

  const nextIdx = CHAPTERS.findIndex(c => c.id === ch.id) + 1;
  const nextBtn = document.getElementById('btn-medal-next');
  if (nextIdx < CHAPTERS.length) {
    const nextCh = CHAPTERS[nextIdx];
    nextBtn.textContent = `▶️ 挑戰第 ${nextCh.num} 關：${nextCh.title}`;
    nextBtn.onclick = () => openChapter(nextCh.id);
  } else {
    nextBtn.textContent = '🎬 進入終極 10 年電影模擬片場！';
    nextBtn.onclick = () => openSandbox();
  }
}

// ---- Boss Disaster Sandbox View ----
function openSandbox() {
  cleanupActiveViews();
  showView('view-sandbox');

  const alloc = { cash: 30, etf: 60, risky: 10 };
  const sCash = document.getElementById('sb-cash');
  const sEtf = document.getElementById('sb-etf');
  const sRisky = document.getElementById('sb-risky');

  function syncAllocUI() {
    document.getElementById('sb-cash-val').textContent = `${alloc.cash}%`;
    document.getElementById('sb-etf-val').textContent = `${alloc.etf}%`;
    document.getElementById('sb-risky-val').textContent = `${alloc.risky}%`;
    sCash.value = alloc.cash;
    sEtf.value = alloc.etf;
    sRisky.value = alloc.risky;
  }

  // Keep total strictly 100% automatically so Yi-Xuan never struggles with arithmetic!
  function adjustAlloc(changedKey, newVal) {
    newVal = Math.max(0, Math.min(100, Number(newVal)));
    alloc[changedKey] = newVal;
    const others = ['cash', 'etf', 'risky'].filter(k => k !== changedKey);
    const rem = 100 - newVal;
    const curOtherSum = alloc[others[0]] + alloc[others[1]];
    if (curOtherSum === 0) {
      alloc[others[0]] = Math.round(rem / 2);
      alloc[others[1]] = rem - alloc[others[0]];
    } else {
      alloc[others[0]] = Math.round((alloc[others[0]] / curOtherSum) * rem);
      alloc[others[1]] = rem - alloc[others[0]];
    }
    syncAllocUI();
  }

  sCash.oninput = e => adjustAlloc('cash', e.target.value);
  sEtf.oninput = e => adjustAlloc('etf', e.target.value);
  sRisky.oninput = e => adjustAlloc('risky', e.target.value);
  syncAllocUI();

  const eventBox = document.getElementById('sandbox-event-box');
  const resultBox = document.getElementById('sandbox-result-box');
  eventBox.classList.add('hidden');
  resultBox.classList.add('hidden');

  const canvas = document.getElementById('sandbox-canvas');
  state.sandboxController = mountDisasterSandbox(canvas, {
    onEvent(ev, chooseCb) {
      eventBox.innerHTML = `
        <div class="event-modal-title">${ev.title}</div>
        <div class="event-choice-row">
          ${ev.choices
            .map(
              (c, i) => `
              <button class="btn ${c.good ? 'btn-cyan' : 'btn-crimson'}" data-c="${i}">
                ${c.label}
              </button>
            `
            )
            .join('')}
        </div>
      `;
      eventBox.classList.remove('hidden');
      AudioEngine.speak(ev.voice, false);
      eventBox.querySelectorAll('button').forEach(btn => {
        btn.onclick = () => chooseCb(ev.choices[Number(btn.dataset.c)]);
      });
    },
    onEventClear() {
      eventBox.classList.add('hidden');
    },
    onFinish(res) {
      fireConfetti();
      state.coins += res.rank === 'S' ? 100 : 50;
      saveProgress();
      updateHeaderStats();

      const profit = res.finalTotal - res.invested;
      resultBox.innerHTML = `
        <div class="rank-stamp">${res.rank}</div>
        <h3 style="margin:0;font-size:1.5rem;color:#ffb800;">${res.comment}</h3>
        <div class="result-metrics">
          <div class="result-metric-box">
            <div class="label">10 年總投入本金</div>
            <div class="val" style="color:#cbd5e1;">$${res.invested.toLocaleString()}</div>
          </div>
          <div class="result-metric-box">
            <div class="label">26 歲最終總資產</div>
            <div class="val">$${res.finalTotal.toLocaleString()}</div>
          </div>
          <div class="result-metric-box">
            <div class="label">正確防災決策</div>
            <div class="val" style="color:#22e584;">${res.goodDecisions} / 3 題</div>
          </div>
        </div>
        <p style="margin:4px 0 0;font-weight:800;color:${profit >= 0 ? '#22e584' : '#ff4757'};">
          ${profit >= 0 ? `📈 額外多賺了 $${profit.toLocaleString()}！` : `📉 少了 $${Math.abs(profit).toLocaleString()}，再調整配置試試！`}
        </p>
      `;
      resultBox.classList.remove('hidden');
      AudioEngine.speak(`十年電影殺青！你拿到 ${res.rank} 級評價！二十六歲總資產是 ${res.finalTotal} 元！${res.comment}`, false);
    }
  });

  document.getElementById('btn-sandbox-run').onclick = () => {
    eventBox.classList.add('hidden');
    resultBox.classList.add('hidden');
    state.sandboxController.start({ ...alloc });
    AudioEngine.speak('十年投資電影開拍！隨時準備應對災難突發事件！', false);
  };

  document.getElementById('btn-speak-sandbox').onclick = () => {
    AudioEngine.speak('這裡是終極十年電影模擬片場！先調好你的現金護盾、E T F 大禮包和單一飆股比例，再按開拍十年電影，挑戰三大災難事件！', true);
  };

  AudioEngine.speak('歡迎來到終極十年電影模擬片場！拉動下方比例，按下開拍十年電影，看看二十六歲的你能賺多少！', false);
}

// ---- Boot & Event Wiring ----
function init() {
  loadProgress();
  renderHomeGrid();
  updateHeaderStats();

  // Topbar Buttons
  document.getElementById('btn-home-logo').onclick = goHome;
  document.getElementById('btn-back-home').onclick = goHome;
  document.getElementById('btn-sandbox-back').onclick = goHome;
  document.getElementById('btn-open-sandbox-top').onclick = openSandbox;
  document.getElementById('btn-open-sandbox-banner').onclick = openSandbox;

  document.getElementById('btn-hero-speak').onclick = () => {
    AudioEngine.speak(
      '哈囉易軒！歡迎來到你的專屬投資片場！這裡幾乎不用看字，用看動畫、玩特效和語音，就能從零學會最正確的投資觀念！快點第一關開始冒險吧！',
      true
    );
  };

  // Voice Auto Toggle
  const voiceBtn = document.getElementById('btn-toggle-voice');
  const syncVoiceBtn = () => {
    const on = AudioEngine.getVoiceAuto();
    voiceBtn.classList.toggle('active', on);
    voiceBtn.textContent = on ? '🔊 語音朗讀：開' : '🔇 語音朗讀：關';
  };
  voiceBtn.onclick = () => {
    AudioEngine.setVoiceAuto(!AudioEngine.getVoiceAuto());
    syncVoiceBtn();
    if (AudioEngine.getVoiceAuto()) AudioEngine.speak('語音朗讀已開啟！', true);
  };
  syncVoiceBtn();

  // SFX Toggle
  const sfxBtn = document.getElementById('btn-toggle-sfx');
  const syncSfxBtn = () => {
    const on = AudioEngine.getSfx();
    sfxBtn.classList.toggle('active', on);
    sfxBtn.textContent = on ? '🎵 電影音效：開' : '🔕 電影音效：關';
  };
  sfxBtn.onclick = () => {
    AudioEngine.setSfx(!AudioEngine.getSfx());
    syncSfxBtn();
    if (AudioEngine.getSfx()) AudioEngine.sfx.coin();
  };
  syncSfxBtn();

  // Stage Step Navigation
  document.getElementById('tab-play').onclick = () => {
    AudioEngine.sfx.click();
    state.stageStep = 'play';
    renderStage();
  };
  document.getElementById('tab-quiz').onclick = () => {
    AudioEngine.sfx.click();
    state.stageStep = 'quiz';
    state.quizIdx = 0;
    renderStage();
  };
  document.getElementById('btn-go-quiz').onclick = () => {
    AudioEngine.sfx.click();
    state.stageStep = 'quiz';
    state.quizIdx = 0;
    renderStage();
  };
  document.getElementById('btn-medal-home').onclick = goHome;
}

document.addEventListener('DOMContentLoaded', init);
