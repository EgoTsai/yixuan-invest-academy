/* ============================================================
   game.js — Undertale × 火柴人三等級（初階/中階/高階 90 幕）控制器
   極簡流程：Title(START / 繼續進度 / 3等級切換) ➔ 單頁漫畫(上一頁 / 下一頁)
   ============================================================ */

import { SCENES, SPEAKERS, TIERS } from './story.js';
import { createComicStage, drawPortrait } from './comicEngine.js';
import { SFX } from './sfx.js';

const SAVE_KEY = 'yixuan_green_stickman_save_v2';
const LEGACY_SAVE_KEY = 'yixuan_green_stickman_save_v1';

let titleStage = null;
let storyStage = null;
let currentIdx = 0;
let mode = 'story'; // 'story' | 'choice_pending' | 'choice_won' | 'gameover'
let typeTimer = null;
let fullText = '';
let isTyping = false;

let progress = {
  idx: 0,
  maxReached: 0,
  clearedTiers: []
};

// ---- Progress Persistence (with v1 migration) ----
function loadProgress() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      progress.idx = Math.max(0, Math.min(SCENES.length - 1, Number(parsed.idx) || 0));
      progress.maxReached = Math.max(progress.idx, Math.min(SCENES.length - 1, Number(parsed.maxReached) || 0));
      progress.clearedTiers = Array.isArray(parsed.clearedTiers) ? parsed.clearedTiers : [];
      return;
    }
    const legacy = localStorage.getItem(LEGACY_SAVE_KEY);
    if (legacy) {
      const n = Number(legacy);
      if (Number.isInteger(n) && n > 0 && n < SCENES.length) {
        progress.idx = n;
        progress.maxReached = n;
      }
    }
  } catch (_) {}
}

function saveProgress(idx, tierClearId = null) {
  progress.idx = idx;
  if (idx > progress.maxReached) progress.maxReached = idx;
  if (tierClearId && !progress.clearedTiers.includes(tierClearId)) {
    progress.clearedTiers.push(tierClearId);
  }
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(progress));
  } catch (_) {}
}

function getTierMeta(tierId) {
  return TIERS.find(t => t.id === tierId) || TIERS[0];
}

// ---- Screen Shake Helper ----
function shakeFrame() {
  const frame = document.getElementById('comic-frame');
  if (!frame) return;
  frame.classList.remove('shake');
  void frame.offsetWidth;
  frame.classList.add('shake');
}

// ---- Typewriter Effect (Classic Undertale Blip) ----
function stopTypewriter() {
  if (typeTimer) {
    clearInterval(typeTimer);
    typeTimer = null;
  }
  isTyping = false;
}

function startTypewriter(text, speakerKey, onDone = null) {
  stopTypewriter();
  fullText = text;
  const el = document.getElementById('dialogue-text');
  el.textContent = '';
  isTyping = true;
  let i = 0;

  typeTimer = setInterval(() => {
    i++;
    el.textContent = fullText.slice(0, i);
    const ch = fullText[i - 1];
    if (ch && ch !== ' ' && ch !== '\n' && i % 2 === 1) {
      SFX.blip(speakerKey);
    }
    if (i >= fullText.length) {
      stopTypewriter();
      if (onDone) onDone();
    }
  }, 26);
}

function finishTypewriterNow() {
  if (!isTyping) return false;
  stopTypewriter();
  document.getElementById('dialogue-text').textContent = fullText;
  return true;
}

// ---- Screen Switching ----
function showTitleScreen() {
  stopTypewriter();
  if (storyStage) {
    storyStage.destroy();
    storyStage = null;
  }

  document.getElementById('screen-story').classList.add('hidden');
  document.getElementById('screen-title').classList.remove('hidden');

  const btnContinue = document.getElementById('btn-continue');
  const saveNote = document.getElementById('save-note');
  const btnStart = document.getElementById('btn-start');
  const firstNote = document.getElementById('first-play-note');
  const tierRow = document.getElementById('tier-row');

  const hasSaved = progress.idx > 0 || progress.maxReached > 0;

  if (hasSaved) {
    const savedScene = SCENES[progress.idx] || SCENES[0];
    const savedTier = getTierMeta(savedScene.tier);

    btnContinue.classList.remove('hidden');
    saveNote.classList.remove('hidden');
    firstNote.classList.add('hidden');
    tierRow.classList.remove('hidden');

    saveNote.textContent = `上次進度：${savedTier.label}・${savedScene.chapter}（第 ${progress.idx + 1} / ${SCENES.length} 幕）`;
    btnStart.textContent = '↺ 從頭開始 (START)';
    btnStart.classList.remove('primary');

    // Render clean 3-tier direct selector (初階 / 中階 / 高階)
    tierRow.innerHTML = TIERS.map(t => {
      const done = progress.clearedTiers.includes(t.id);
      return `
        <button class="tier-btn ${done ? 'cleared' : ''}" data-tier-start="${t.start}">
          <span class="tier-name">${t.label} ${done ? '✅' : ''}</span>
          <span class="tier-sub">${t.title}</span>
          <span class="tier-sub">第 ${t.start + 1}–${t.end + 1} 幕</span>
        </button>
      `;
    }).join('');

    tierRow.querySelectorAll('.tier-btn').forEach(btn => {
      btn.onclick = () => {
        SFX.select();
        startStoryAt(Number(btn.dataset.tierStart));
      };
    });
  } else {
    // First-time visit: Strictly ONE huge START button so Yi-Xuan knows immediately where to click!
    btnContinue.classList.add('hidden');
    saveNote.classList.add('hidden');
    tierRow.classList.add('hidden');
    firstNote.classList.remove('hidden');
    btnStart.textContent = '▶ START';
    btnStart.classList.add('primary');
  }

  if (!titleStage) {
    titleStage = createComicStage(document.getElementById('title-canvas'));
  }
  titleStage.setScene('title');
}

function startStoryAt(idx) {
  if (titleStage) {
    titleStage.destroy();
    titleStage = null;
  }

  document.getElementById('screen-title').classList.add('hidden');
  document.getElementById('screen-story').classList.remove('hidden');

  if (!storyStage) {
    storyStage = createComicStage(document.getElementById('comic-canvas'));
  }

  currentIdx = Math.max(0, Math.min(SCENES.length - 1, idx));
  renderScene();
}

// ---- Render Current Story Scene ----
function renderScene() {
  const sc = SCENES[currentIdx];
  const tierMeta = getTierMeta(sc.tier);
  saveProgress(currentIdx, sc.tierClear || null);

  const frame = document.getElementById('comic-frame');
  const dBox = document.getElementById('dialogue-box');
  const choicePanel = document.getElementById('choice-panel');
  const navRow = document.getElementById('nav-row');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const tierPill = document.getElementById('tier-pill');

  frame.classList.remove('gameover-border');
  dBox.classList.remove('gameover-border');

  tierPill.textContent = tierMeta.label;
  tierPill.className = `tier-pill tier-${sc.tier}`;
  document.getElementById('chapter-label').textContent = sc.chapter;
  document.getElementById('page-counter').textContent = `${currentIdx + 1} / ${SCENES.length}`;

  // Update Comic Canvas
  storyStage.setScene(sc.scene);
  if (sc.shake) shakeFrame();
  if (sc.sfx && SFX[sc.sfx]) SFX[sc.sfx]();

  // Update Portrait & Speaker
  const sp = SPEAKERS[sc.speaker] || SPEAKERS.narrator;
  const spEl = document.getElementById('speaker-name');
  spEl.textContent = sp.name;
  spEl.style.color = sp.color;
  drawPortrait(document.getElementById('portrait-canvas'), sc.speaker, sc.mood || 'happy');

  // Reset choice/nav UI
  navRow.className = 'nav-row';
  btnPrev.classList.remove('hidden');
  btnPrev.disabled = currentIdx === 0;
  btnNext.className = 'ut-btn primary';

  if (sc.choice) {
    mode = 'choice_pending';
    choicePanel.classList.remove('hidden');
    document.getElementById('choice-prompt').textContent = sc.choice.prompt;
    const grid = document.getElementById('choice-grid');
    grid.innerHTML = sc.choice.options
      .map(
        (opt, i) => `
        <button class="ut-choice-btn" data-opt="${i}">
          <span class="heart">💚</span>
          <span>${opt.label}</span>
        </button>
      `
      )
      .join('');

    grid.querySelectorAll('.ut-choice-btn').forEach(btn => {
      btn.onclick = () => handleChoice(sc.choice.options[Number(btn.dataset.opt)]);
    });

    btnNext.classList.add('hidden');
    navRow.className = 'nav-row single';
  } else {
    mode = 'story';
    choicePanel.classList.add('hidden');
    btnNext.classList.remove('hidden');
    if (sc.isEnding) {
      btnNext.textContent = '↺ 回到標題畫面';
    } else if (sc.tierClear === 'beginner') {
      btnNext.textContent = '⚡ 進入中階篇 ▶';
    } else if (sc.tierClear === 'intermediate') {
      btnNext.textContent = '🏆 進入高階篇 ▶';
    } else {
      btnNext.textContent = '下一頁 ▶';
    }
  }

  startTypewriter(sc.text, sc.speaker);
}

// ---- Undertale 2-Choice Resolution ----
function handleChoice(option) {
  const frame = document.getElementById('comic-frame');
  const dBox = document.getElementById('dialogue-box');
  const choicePanel = document.getElementById('choice-panel');
  const navRow = document.getElementById('nav-row');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');

  choicePanel.classList.add('hidden');

  if (option.correct) {
    mode = 'choice_won';
    SFX.shield();
    document.getElementById('speaker-name').textContent = '小綠（易軒）— 正確決定！';
    document.getElementById('speaker-name').style.color = '#22e584';
    drawPortrait(document.getElementById('portrait-canvas'), 'green', 'happy');
    startTypewriter(option.winText, 'green');

    navRow.className = 'nav-row';
    btnPrev.classList.remove('hidden');
    btnNext.classList.remove('hidden');
    btnNext.className = 'ut-btn primary';
    btnNext.textContent = '下一頁 ▶';
  } else {
    mode = 'gameover';
    SFX.explosion();
    SFX.gameover();
    shakeFrame();
    frame.classList.add('gameover-border');
    dBox.classList.add('gameover-border');

    storyStage.setScene(option.gameoverScene || 'gameover_leverage');
    document.getElementById('speaker-name').textContent = option.gameoverTitle || '💀 GAME OVER — 破產了！';
    document.getElementById('speaker-name').style.color = '#ff4757';
    drawPortrait(document.getElementById('portrait-canvas'), 'green', 'cry');
    startTypewriter(option.gameoverText, 'red');

    navRow.className = 'nav-row single';
    btnPrev.classList.add('hidden');
    btnNext.classList.remove('hidden');
    btnNext.className = 'ut-btn danger';
    btnNext.textContent = '↺ 重新選擇（回到剛剛）';
  }
}

// ---- Prev / Next Handlers ----
function goPrev() {
  if (currentIdx <= 0) return;
  SFX.page();
  currentIdx--;
  renderScene();
}

function goNext() {
  if (finishTypewriterNow()) return;

  if (mode === 'gameover') {
    SFX.select();
    renderScene();
    return;
  }

  if (mode === 'choice_pending') return;

  const sc = SCENES[currentIdx];
  if (sc.isEnding) {
    SFX.select();
    showTitleScreen();
    return;
  }

  if (currentIdx < SCENES.length - 1) {
    SFX.page();
    currentIdx++;
    renderScene();
  }
}

// ---- Boot ----
function init() {
  loadProgress();

  document.getElementById('btn-start').onclick = () => {
    SFX.select();
    startStoryAt(0);
  };

  document.getElementById('btn-continue').onclick = () => {
    SFX.select();
    startStoryAt(progress.idx);
  };

  document.getElementById('btn-to-title').onclick = () => {
    SFX.select();
    showTitleScreen();
  };

  document.getElementById('btn-prev').onclick = goPrev;
  document.getElementById('btn-next').onclick = goNext;

  document.getElementById('dialogue-box').onclick = () => {
    finishTypewriterNow();
  };

  const muteBtn = document.getElementById('btn-mute');
  muteBtn.onclick = () => {
    SFX.setMuted(!SFX.isMuted());
    muteBtn.textContent = SFX.isMuted() ? '🔇 靜音' : '🔊 音效';
    if (!SFX.isMuted()) SFX.select();
  };

  window.addEventListener('keydown', e => {
    const inStory = !document.getElementById('screen-story').classList.contains('hidden');
    if (!inStory) return;
    if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') {
      if (mode !== 'choice_pending') {
        e.preventDefault();
        goNext();
      }
    } else if (e.key === 'ArrowLeft') {
      if (mode !== 'gameover') {
        e.preventDefault();
        goPrev();
      }
    }
  });

  showTitleScreen();
}

document.addEventListener('DOMContentLoaded', init);
