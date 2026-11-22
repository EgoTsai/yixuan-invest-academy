/* ============================================================
   game.js — Undertale × 火柴人單線故事控制器
   極簡流程：Title(START / 繼續進度) ➔ 單頁動態漫畫(上一頁 / 下一頁 / 2選1)
   ============================================================ */

import { SCENES, SPEAKERS } from './story.js';
import { createComicStage, drawPortrait } from './comicEngine.js';
import { SFX } from './sfx.js';

const SAVE_KEY = 'yixuan_green_stickman_save_v1';

let titleStage = null;
let storyStage = null;
let currentIdx = 0;
let mode = 'story'; // 'story' | 'choice_pending' | 'choice_won' | 'gameover'
let typeTimer = null;
let fullText = '';
let isTyping = false;

// ---- Progress Persistence ----
function loadSavedIndex() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return 0;
    const n = Number(raw);
    if (Number.isInteger(n) && n > 0 && n < SCENES.length) return n;
    return 0;
  } catch (_) {
    return 0;
  }
}

function saveProgress(idx) {
  try {
    localStorage.setItem(SAVE_KEY, String(idx));
  } catch (_) {}
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
  }, 28);
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

  const saved = loadSavedIndex();
  const btnContinue = document.getElementById('btn-continue');
  const saveNote = document.getElementById('save-note');
  const btnStart = document.getElementById('btn-start');

  if (saved > 0) {
    btnContinue.classList.remove('hidden');
    saveNote.classList.remove('hidden');
    const savedChapter = SCENES[saved]?.chapter || '';
    saveNote.textContent = `上次看到：${savedChapter}（第 ${saved + 1} / ${SCENES.length} 頁）`;
    btnStart.textContent = '↺ 從頭開始 (START)';
    btnStart.classList.remove('primary');
  } else {
    btnContinue.classList.add('hidden');
    saveNote.classList.add('hidden');
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
  saveProgress(currentIdx);

  const frame = document.getElementById('comic-frame');
  const dBox = document.getElementById('dialogue-box');
  const choicePanel = document.getElementById('choice-panel');
  const navRow = document.getElementById('nav-row');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');

  frame.classList.remove('gameover-border');
  dBox.classList.remove('gameover-border');

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

    // While waiting for choice, hide Next so user must pick an option
    btnNext.classList.add('hidden');
    navRow.className = 'nav-row single';
  } else {
    mode = 'story';
    choicePanel.classList.add('hidden');
    btnNext.classList.remove('hidden');
    btnNext.textContent = sc.isEnding ? '↺ 回到標題畫面' : '下一頁 ▶';
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
    // GAME OVER Bankruptcy Outcome!
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

    // Only ONE clear button: Retry this choice!
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
    renderScene(); // Retry the exact same choice scene!
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
  document.getElementById('btn-start').onclick = () => {
    SFX.select();
    saveProgress(0);
    startStoryAt(0);
  };

  document.getElementById('btn-continue').onclick = () => {
    SFX.select();
    startStoryAt(loadSavedIndex());
  };

  document.getElementById('btn-prev').onclick = goPrev;
  document.getElementById('btn-next').onclick = goNext;

  // Tap dialogue box to finish typewriter immediately
  document.getElementById('dialogue-box').onclick = () => {
    finishTypewriterNow();
  };

  // Subtle SFX Mute toggle
  const muteBtn = document.getElementById('btn-mute');
  muteBtn.onclick = () => {
    SFX.setMuted(!SFX.isMuted());
    muteBtn.textContent = SFX.isMuted() ? '🔇 靜音' : '🔊 音效';
    if (!SFX.isMuted()) SFX.select();
  };

  // Keyboard shortcuts (Undertale feel: Left / Right / Enter / Space)
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
