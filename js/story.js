/* ============================================================
   story.js — 《小綠的投資冒險》Undertale × 火柴人 30 幕劇本
   主角：🟢 小綠（代表易軒）
   夥伴：🔴 小紅（衝動踩雷王）、🟡 小黃（算數軍師）、🔵 小藍（穩健派）
   ============================================================ */

export const SPEAKERS = {
  green: { name: '小綠（易軒）', color: '#22e584' },
  red: { name: '小紅', color: '#ff4757' },
  yellow: { name: '小黃', color: '#ffd43b' },
  blue: { name: '小藍', color: '#38bdf8' },
  boss: { name: '黑心廣告', color: '#ff7a2f' },
  narrator: { name: '旁白', color: '#ffffff' }
};

export const SCENES = [
  // ================= 第 1 章：從 0 開始！認識投資與風險 =================
  {
    chapter: '第 1 章｜從 0 認識投資與風險',
    scene: 'intro_green',
    speaker: 'green',
    mood: 'happy',
    text: '嗨！我是小綠（代表 16 歲的易軒）。\n今天我想從 0 開始，搞懂「投資」到底是怎麼回事！'
  },
  {
    chapter: '第 1 章｜從 0 認識投資與風險',
    scene: 'red_hype',
    speaker: 'red',
    mood: 'excited',
    text: '投資超簡單啦！買股票就是一直漲、躺著發財的提款機吧！'
  },
  {
    chapter: '第 1 章｜從 0 認識投資與風險',
    scene: 'risk_rollercoaster',
    speaker: 'yellow',
    mood: 'serious',
    sfx: 'hit',
    shake: true,
    text: '大錯特錯！投資＝買公司的一部分。\n公司賺錢會漲，但遇到危機也會【暴跌】！'
  },
  {
    chapter: '第 1 章｜從 0 認識投資與風險',
    scene: 'risk_reward_scale',
    speaker: 'green',
    mood: 'think',
    text: '原來如此……看起來「賺越快」的地方，摔下去通常越痛！\n先學會「怎麼不破產」，比急著賺大錢更重要！'
  },

  // ================= 第 2 章：什麼是「槓桿」？ =================
  {
    chapter: '第 2 章｜什麼是「槓桿」？',
    scene: 'lever_intro',
    speaker: 'yellow',
    mood: 'cool',
    text: '很多人投資會破產，都是因為這根危險武器——「槓桿」！\n簡單說就是：【借別人的錢，放大你的賭注】！'
  },
  {
    chapter: '第 2 章｜什麼是「槓桿」？',
    scene: 'lever_math',
    speaker: 'yellow',
    mood: 'serious',
    text: '你看小紅：自己只有 $100，卻向銀行借 $900，\n湊成 $1,000 去買股票！這就叫【10 倍槓桿】！'
  },
  {
    chapter: '第 2 章｜什麼是「槓桿」？',
    scene: 'lever_up',
    speaker: 'red',
    mood: 'excited',
    sfx: 'select',
    text: '哇哈哈！股價只漲 10%，$1,000 變 $1,100！\n還完銀行 $900，我剩下 $200，本金直接翻倍啦！'
  },
  {
    chapter: '第 2 章｜什麼是「槓桿」？',
    scene: 'lever_warning',
    speaker: 'yellow',
    mood: 'shock',
    sfx: 'hit',
    text: '別高興太早……\n如果股價不是漲 10%，而是【跌 10%】呢？'
  },

  // ================= 第 3 章：槓桿的致命陷阱 =================
  {
    chapter: '第 3 章｜槓桿有多可怕？',
    scene: 'hp_duel_start',
    speaker: 'narrator',
    mood: 'serious',
    text: '【HP 血條大對決】\n左邊：小綠（不借錢 1 倍） VS 右邊：小紅（借錢 10 倍槓桿）！'
  },
  {
    chapter: '第 3 章｜槓桿有多可怕？',
    scene: 'hp_green_safe',
    speaker: 'green',
    mood: 'calm',
    text: '股價跌 10%！但我沒有借錢，\nHP 只是從 100 變成 90，活得好好的，還能等它漲回來！'
  },
  {
    chapter: '第 3 章｜槓桿有多可怕？',
    scene: 'hp_red_liquidated',
    speaker: 'red',
    mood: 'cry',
    sfx: 'explosion',
    shake: true,
    text: '嗚哇！！跌 10% 剩 $900，銀行立刻搶走 $900 還債！\n我的 HP 直接 0 / 100【強制斷頭爆倉】出局了！！'
  },
  {
    chapter: '第 3 章｜槓桿有多可怕？',
    scene: 'hp_red_debt',
    speaker: 'yellow',
    mood: 'shock',
    sfx: 'explosion',
    shake: true,
    text: '更可怕的是「暴跌 20%」：$1,000 跌剩 $800，\n不夠還銀行 $900！不只本金歸零，還【倒欠銀行錢】！'
  },
  {
    chapter: '第 3 章｜關鍵抉擇 ①',
    scene: 'choice_leverage',
    speaker: 'red',
    mood: 'excited',
    text: '小綠！這支股票明天一定會噴！\n快跟我一起借錢開「10 倍槓桿」，馬上買新電腦！',
    choice: {
      prompt: '💚 輪到易軒（小綠）決定！',
      options: [
        {
          label: '⚡ 好！開 10 倍槓桿衝一波！',
          correct: false,
          gameoverScene: 'gameover_leverage',
          gameoverTitle: '💀 GAME OVER — 爆倉破產！',
          gameoverText: '隔天公司突然爆出壞消息，股價跳空暴跌 -15%！\n你的 HP 瞬間歸零，不只存款蒸發，還倒欠券商一筆債……'
        },
        {
          label: '🛡️ 不要！我不借錢、不開槓桿！',
          correct: true,
          winText: '漂亮！隔天那支股票真的暴跌 -15%，小紅直接爆倉，小綠全身而退！'
        }
      ]
    }
  },

  // ================= 第 4 章：台灣真實破產 ① 喬治與瑪麗雙卡風暴 =================
  {
    chapter: '第 4 章｜台灣真實破產 ① 雙卡風暴',
    scene: 'gm_billboard',
    speaker: 'narrator',
    mood: 'serious',
    text: '接著來看 3 個真實發生過的破產災難！\n第一個：2005 年震驚全台灣的【喬治與瑪麗（雙卡風暴）】！'
  },
  {
    chapter: '第 4 章｜台灣真實破產 ① 雙卡風暴',
    scene: 'gm_monster',
    speaker: 'red',
    mood: 'shock',
    sfx: 'hit',
    text: '當年廣告整天喊「借錢好輕鬆」，拿現金卡＋信用卡就能狂刷！\n大家卻沒看到藏在背後的【18%～20% 超高循環利率】！'
  },
  {
    chapter: '第 4 章｜台灣真實破產 ① 雙卡風暴',
    scene: 'gm_domino',
    speaker: 'yellow',
    mood: 'shock',
    sfx: 'explosion',
    shake: true,
    text: '很多人「以卡養卡」（借 B 卡還 A 卡），債務利滾利暴增！\n原本借 30 萬變欠好幾百萬，當年台灣幾十萬名【卡奴】直接信用破產！'
  },
  {
    chapter: '第 4 章｜台灣真實破產 ① 雙卡風暴',
    scene: 'gm_lesson',
    speaker: 'green',
    mood: 'calm',
    text: '好可怕……借錢的複利就像吃人怪獸！\n以後用信用卡，只刷【自己戶頭已經有的錢】，絕不欠循環利息！'
  },

  // ================= 第 5 章：全球災難破產 ② 2008 次貸風暴 =================
  {
    chapter: '第 5 章｜全球災難破產 ② 2008 次貸風暴',
    scene: 'subprime_tower',
    speaker: 'narrator',
    mood: 'serious',
    text: '第二個真實破產：2008 年全球【次貸風暴】！\n銀行把房貸借給根本還不起錢的人，還開【30 倍槓桿】疊成巨塔！'
  },
  {
    chapter: '第 5 章｜全球災難破產 ② 2008 次貸風暴',
    scene: 'subprime_collapse',
    speaker: 'yellow',
    mood: 'shock',
    sfx: 'explosion',
    shake: true,
    text: '結果房價稍微一跌，大家繳不出房貸！\n底層抽掉一塊，整座 30 倍槓桿巨塔像災難電影一樣連鎖崩塌！'
  },
  {
    chapter: '第 5 章｜全球災難破產 ② 2008 次貸風暴',
    scene: 'subprime_lehman',
    speaker: 'blue',
    mood: 'shock',
    sfx: 'hit',
    text: '連活了 158 年的超級大銀行（雷曼兄弟）都在幾天內宣布破產！\n全球股市腰斬一半，開槓桿的投資人全部一起陪葬！'
  },
  {
    chapter: '第 5 章｜全球災難破產 ② 2008 次貸風暴',
    scene: 'subprime_lesson',
    speaker: 'green',
    mood: 'serious',
    text: '連全世界最聰明、最巨大的銀行開高槓桿都會倒閉……\n我們普通人更絕對不能把人生壓在槓桿上！'
  },

  // ================= 第 6 章：台灣最新破產 ③ 五貸同堂 =================
  {
    chapter: '第 6 章｜台灣最新破產 ③「五貸同堂」',
    scene: 'five_loans_chains',
    speaker: 'narrator',
    mood: 'serious',
    text: '第三個是台灣這幾年真實發生的危險玩法——【五貸同堂】！\n一人同時背：房貸 ＋ 信貸 ＋ 車貸 ＋ 股票質押 ＋ 融資！'
  },
  {
    chapter: '第 6 章｜台灣最新破產 ③「五貸同堂」',
    scene: 'five_loans_greed',
    speaker: 'red',
    mood: 'excited',
    text: '網路上有人教我：把房子增貸、再辦信貸買股票、股票再質押借錢！\n一直漲的時候，我好像股神一樣躺著數錢耶！'
  },
  {
    chapter: '第 6 章｜台灣最新破產 ③「五貸同堂」',
    scene: 'five_loans_meteor',
    speaker: 'yellow',
    mood: 'shock',
    sfx: 'explosion',
    shake: true,
    text: '但是只要遇到一次股災暴跌：股票被券商【強制斷頭賣光】，\n每個月 5 筆銀行貸款利息卻照樣催繳，現金流瞬間斷裂！'
  },
  {
    chapter: '第 6 章｜台灣最新破產 ③「五貸同堂」',
    scene: 'five_loans_auction',
    speaker: 'red',
    mood: 'cry',
    sfx: 'hit',
    text: '我的股票沒了、利息繳不出來，連住的房子都被貼上【法拍】封條……\n貪快開五層槓桿，最後真的什麼都沒了……'
  },
  {
    chapter: '第 6 章｜關鍵抉擇 ②',
    scene: 'choice_fiveloans',
    speaker: 'boss',
    mood: 'excited',
    text: '股市大跌剛好抄底啦！快去辦信貸＋股票質押「五貸同堂」，\n借越多賺越快，翻身就靠這一次！',
    choice: {
      prompt: '💚 遇到誘惑！易軒（小綠）怎麼選？',
      options: [
        {
          label: '💸 借信貸＋質押全力抄底！',
          correct: false,
          gameoverScene: 'gameover_fiveloans',
          gameoverTitle: '💀 GAME OVER — 五貸同堂破產！',
          gameoverText: '股市沒有馬上反彈，反而又跌了 25%！\n股票遭到斷頭、5 筆銀行催繳單塞爆信箱，房產法拍破產……'
        },
        {
          label: '⚔️ 拒絕借錢！一刀斬斷五條債鍊！',
          correct: true,
          winText: '帥爆了！不借錢投資，就算股市再震盪，你依然能安心吃飯睡覺！'
        }
      ]
    }
  },

  // ================= 第 7 章：16 歲小綠的安全投資守則 =================
  {
    chapter: '第 7 章｜16 歲的安全起點',
    scene: 'safe_blue_highfive',
    speaker: 'blue',
    mood: 'happy',
    sfx: 'shield',
    text: '看完這麼多破產悲劇，其實「安全又正確」的投資一點都不複雜！\n只要守住這 4 條鐵則，你就能永遠避開破產！'
  },
  {
    chapter: '第 7 章｜16 歲的安全起點',
    scene: 'safe_four_rules',
    speaker: 'green',
    mood: 'cool',
    text: '① 絕不借錢、不開槓桿 🚫　② 先留緊急備用金 🛡️\n③ 只用閒錢買分散 ETF 🧺　④ 靠 16 歲「時間」慢慢長大 ⏳'
  },
  {
    chapter: '第 7 章｜最終考驗 ③',
    scene: 'choice_final',
    speaker: 'narrator',
    mood: 'happy',
    text: '16 歲的易軒（小綠）辛苦存到了第一筆零用錢 $10,000！\n這一次，你要怎麼開始你的投資人生？',
    choice: {
      prompt: '💚 最終決定！選出能保護你一輩子的路：',
      options: [
        {
          label: '🎲 跟網路老師開 20 倍槓桿拚一夜暴富',
          correct: false,
          gameoverScene: 'gameover_scam',
          gameoverTitle: '💀 GAME OVER — 爆倉＋詐騙雙重打擊！',
          gameoverText: '高槓桿加上假老師群組，三天就把 $10,000 榨乾歸零！\n記住：凡是叫你開高槓桿、保證暴富的，通通是陷阱！'
        },
        {
          label: '💚 留好急用金、找爸媽討論開戶，用閒錢慢慢存 ETF',
          correct: true,
          winText: '滿分通關！！安全、合法、不借錢、不開槓桿，16 歲的你已經超越大多數大人了！'
        }
      ]
    }
  },
  {
    chapter: '🏆 TRUE ENDING｜防破產大師誕生！',
    scene: 'true_ending',
    speaker: 'green',
    mood: 'happy',
    sfx: 'victory',
    isEnding: true,
    text: '恭喜易軒通關！【不借錢、不開槓桿、懂風險、慢慢變富】！\n這就是 16 歲送給未來自己最強的保護盾！'
  }
];
