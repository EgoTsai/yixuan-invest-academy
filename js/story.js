/* ============================================================
   story.js — 《投資大作戰》100 幕三等級完整劇本
   🌱 初階 (1–33)：風險、槓桿、FX戰士久留美爆倉①、雙卡/次貸/五貸同堂
   ⚡ 中階 (34–66)：違約交割/當沖、久留美爆倉②(芽吹式盲從)、通膨複利、ETF、微笑曲線、除息、反詐騙
   🏆 高階 (67–100)：資產配置、期貨50X、久留美爆倉③(報復性交易與半夜盯盤)、心理陷阱、體檢、終極魔王
   主角：🟢 小綠
   ============================================================ */

export const SPEAKERS = {
  green: { name: '小綠', color: '#22e584' },
  red: { name: '小紅', color: '#ff4757' },
  yellow: { name: '小黃', color: '#ffd43b' },
  blue: { name: '小藍', color: '#38bdf8' },
  boss: { name: '黑心大魔王', color: '#ff7a2f' },
  narrator: { name: '旁白', color: '#ffffff' }
};

export const TIERS = [
  { id: 'beginner', label: '🌱 初階', title: '防破產基礎篇', start: 0, end: 32, color: '#22e584' },
  { id: 'intermediate', label: '⚡ 中階', title: '台灣實戰避坑篇', start: 33, end: 65, color: '#38bdf8' },
  { id: 'advanced', label: '🏆 高階', title: '大師心法系統篇', start: 66, end: 99, color: '#ffd43b' }
];

export const SCENES = [
  // =========================================================================
  // 🌱 初階（第 1 ～ 33 幕）：風險、槓桿與台灣真實破產案例
  // =========================================================================
  {
    tier: 'beginner',
    chapter: '第 1 章｜從 0 認識投資與風險',
    scene: 'intro_green',
    speaker: 'green',
    mood: 'happy',
    text: '嗨！我是 16 歲的小綠。\n今天從 0 開始，一步一步完成【初階 → 中階 → 高階】投資修練！'
  },
  {
    tier: 'beginner',
    chapter: '第 1 章｜從 0 認識投資與風險',
    scene: 'red_hype',
    speaker: 'red',
    mood: 'excited',
    text: '投資超簡單啦！買股票就是一直漲、躺著發財的提款機吧！'
  },
  {
    tier: 'beginner',
    chapter: '第 1 章｜從 0 認識投資與風險',
    scene: 'risk_rollercoaster',
    speaker: 'yellow',
    mood: 'serious',
    sfx: 'hit',
    shake: true,
    text: '大錯特錯！投資＝買公司的一部分。\n公司賺錢會漲，但遇到危機也會【暴跌】！'
  },
  {
    tier: 'beginner',
    chapter: '第 1 章｜從 0 認識投資與風險',
    scene: 'risk_reward_scale',
    speaker: 'green',
    mood: 'think',
    text: '原來如此……看起來「賺越快」的地方，摔下去通常越痛！\n先學會「怎麼不破產」，比急著賺大錢更重要！'
  },
  {
    tier: 'beginner',
    chapter: '第 2 章｜什麼是「槓桿」？',
    scene: 'lever_intro',
    speaker: 'yellow',
    mood: 'cool',
    text: '很多人投資會破產，都是因為這根危險武器——「槓桿」！\n簡單說就是：【借別人的錢，放大你的賭注】！'
  },
  {
    tier: 'beginner',
    chapter: '第 2 章｜什麼是「槓桿」？',
    scene: 'lever_math',
    speaker: 'yellow',
    mood: 'serious',
    text: '你看小紅：自己只有 $100，卻向銀行借 $900，\n湊成 $1,000 去買股票！這就叫【10 倍槓桿】！'
  },
  {
    tier: 'beginner',
    chapter: '第 2 章｜什麼是「槓桿」？',
    scene: 'lever_up',
    speaker: 'red',
    mood: 'excited',
    sfx: 'select',
    text: '哇哈哈！股價只漲 10%，$1,000 變 $1,100！\n還完銀行 $900，我剩下 $200，本金直接翻倍啦！'
  },
  {
    tier: 'beginner',
    chapter: '第 2 章｜什麼是「槓桿」？',
    scene: 'lever_warning',
    speaker: 'yellow',
    mood: 'shock',
    sfx: 'hit',
    text: '別高興太早……\n如果股價不是漲 10%，而是【跌 10%】呢？'
  },
  {
    tier: 'beginner',
    chapter: '第 3 章｜槓桿有多可怕？',
    scene: 'hp_duel_start',
    speaker: 'narrator',
    mood: 'serious',
    text: '【HP 血條大對決】\n左邊：小綠（不借錢 1 倍） VS 右邊：小紅（借錢 10 倍槓桿）！'
  },
  {
    tier: 'beginner',
    chapter: '第 3 章｜槓桿有多可怕？',
    scene: 'hp_green_safe',
    speaker: 'green',
    mood: 'calm',
    text: '股價跌 10%！但我沒有借錢，\nHP 只是從 100 變成 90，活得好好的，還能等它漲回來！'
  },
  {
    tier: 'beginner',
    chapter: '第 3 章｜槓桿有多可怕？',
    scene: 'hp_red_liquidated',
    speaker: 'red',
    mood: 'cry',
    sfx: 'explosion',
    shake: true,
    text: '嗚哇！！跌 10% 剩 $900，銀行立刻搶走 $900 還債！\n我的 HP 直接 0 / 100【強制斷頭爆倉】出局了！！'
  },
  {
    tier: 'beginner',
    chapter: '第 3 章｜槓桿有多可怕？',
    scene: 'hp_red_debt',
    speaker: 'yellow',
    mood: 'shock',
    sfx: 'explosion',
    shake: true,
    text: '更可怕的是「暴跌 20%」：$1,000 跌剩 $800，\n不夠還銀行 $900！不只本金歸零，還【倒欠銀行錢】！'
  },
  {
    tier: 'beginner',
    chapter: '第 3 章｜致敬《FX戰士久留美》爆倉名場面 ①',
    scene: 'kurumi_pray',
    speaker: 'red',
    mood: 'shock',
    sfx: 'hit',
    text: '就像經典漫畫《FX戰士久留美》裡最恐怖的一幕：\n帳面已經狂虧，卻死不按停損，雙手合十對手機大喊「神啊拜託漲回去…」！'
  },
  {
    tier: 'beginner',
    chapter: '第 3 章｜致敬《FX戰士久留美》爆倉名場面 ①',
    scene: 'kurumi_add_margin',
    speaker: 'red',
    mood: 'cry',
    text: '看到快被強制平倉，還慌張把全部存款和獎學金「一直補進去拉高防線」，\n心想「有槓桿撐一下就會反彈」……結果越補洞越大！'
  },
  {
    tier: 'beginner',
    chapter: '第 3 章｜致敬《FX戰士久留美》爆倉名場面 ①',
    scene: 'kurumi_roscut',
    speaker: 'yellow',
    mood: 'shock',
    sfx: 'explosion',
    shake: true,
    text: '叮咚！【🚨 強制平倉通知（ROSCUT）】！！\n只要走勢再多晃一點點，連同剛才補進去的救命錢，0.1 秒全部蒸發歸零！'
  },
  {
    tier: 'beginner',
    chapter: '第 3 章｜關鍵抉擇 ①',
    scene: 'choice_leverage',
    speaker: 'red',
    mood: 'excited',
    text: '小綠！這支股票明天一定會噴！\n快跟我一起借錢開「10 倍槓桿」，馬上買新電腦！',
    choice: {
      prompt: '💚 輪到小綠決定！',
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
  {
    tier: 'beginner',
    chapter: '第 4 章｜台灣真實破產 ① 雙卡風暴',
    scene: 'gm_billboard',
    speaker: 'narrator',
    mood: 'serious',
    text: '接著來看 3 個真實發生過的破產災難！\n第一個：2005 年震驚全台灣的【喬治與瑪麗（雙卡風暴）】！'
  },
  {
    tier: 'beginner',
    chapter: '第 4 章｜台灣真實破產 ① 雙卡風暴',
    scene: 'gm_monster',
    speaker: 'red',
    mood: 'shock',
    sfx: 'hit',
    text: '當年廣告整天喊「借錢好輕鬆」，拿現金卡＋信用卡就能狂刷！\n大家卻沒看到藏在背後的【18%～20% 超高循環利率】！'
  },
  {
    tier: 'beginner',
    chapter: '第 4 章｜台灣真實破產 ① 雙卡風暴',
    scene: 'gm_domino',
    speaker: 'yellow',
    mood: 'shock',
    sfx: 'explosion',
    shake: true,
    text: '很多人「以卡養卡」（借 B 卡還 A 卡），債務利滾利暴增！\n原本借 30 萬變欠好幾百萬，當年台灣幾十萬名【卡奴】直接信用破產！'
  },
  {
    tier: 'beginner',
    chapter: '第 4 章｜台灣真實破產 ① 雙卡風暴',
    scene: 'gm_lesson',
    speaker: 'green',
    mood: 'calm',
    text: '好可怕……借錢的複利就像吃人怪獸！\n以後用信用卡，只刷【自己戶頭已經有的錢】，絕不欠循環利息！'
  },
  {
    tier: 'beginner',
    chapter: '第 5 章｜全球災難破產 ② 2008 次貸風暴',
    scene: 'subprime_tower',
    speaker: 'narrator',
    mood: 'serious',
    text: '第二個真實破產：2008 年全球【次貸風暴】！\n銀行把房貸借給根本還不起錢的人，還開【30 倍槓桿】疊成巨塔！'
  },
  {
    tier: 'beginner',
    chapter: '第 5 章｜全球災難破產 ② 2008 次貸風暴',
    scene: 'subprime_collapse',
    speaker: 'yellow',
    mood: 'shock',
    sfx: 'explosion',
    shake: true,
    text: '結果房價稍微一跌，大家繳不出房貸！\n底層抽掉一塊，整座 30 倍槓桿巨塔像災難電影一樣連鎖崩塌！'
  },
  {
    tier: 'beginner',
    chapter: '第 5 章｜全球災難破產 ② 2008 次貸風暴',
    scene: 'subprime_lehman',
    speaker: 'blue',
    mood: 'shock',
    sfx: 'hit',
    text: '連活了 158 年的超級大銀行（雷曼兄弟）都在幾天內宣布破產！\n全球股市腰斬一半，開槓桿的投資人全部一起陪葬！'
  },
  {
    tier: 'beginner',
    chapter: '第 5 章｜全球災難破產 ② 2008 次貸風暴',
    scene: 'subprime_lesson',
    speaker: 'green',
    mood: 'serious',
    text: '連全世界最聰明、最巨大的銀行開高槓桿都會倒閉……\n我們普通人更絕對不能把人生壓在槓桿上！'
  },
  {
    tier: 'beginner',
    chapter: '第 6 章｜台灣最新破產 ③「五貸同堂」',
    scene: 'five_loans_chains',
    speaker: 'narrator',
    mood: 'serious',
    text: '第三個是台灣這幾年真實發生的危險玩法——【五貸同堂】！\n一人同時背：房貸 ＋ 信貸 ＋ 車貸 ＋ 股票質押 ＋ 融資！'
  },
  {
    tier: 'beginner',
    chapter: '第 6 章｜台灣最新破產 ③「五貸同堂」',
    scene: 'five_loans_greed',
    speaker: 'red',
    mood: 'excited',
    text: '網路上有人教我：把房子增貸、再辦信貸買股票、股票再質押借錢！\n一直漲的時候，我好像股神一樣躺著數錢耶！'
  },
  {
    tier: 'beginner',
    chapter: '第 6 章｜台灣最新破產 ③「五貸同堂」',
    scene: 'five_loans_meteor',
    speaker: 'yellow',
    mood: 'shock',
    sfx: 'explosion',
    shake: true,
    text: '但是只要遇到一次股災暴跌：股票被券商【強制斷頭賣光】，\n每個月 5 筆銀行貸款利息卻照樣催繳，現金流瞬間斷裂！'
  },
  {
    tier: 'beginner',
    chapter: '第 6 章｜台灣最新破產 ③「五貸同堂」',
    scene: 'five_loans_auction',
    speaker: 'red',
    mood: 'cry',
    sfx: 'hit',
    text: '我的股票沒了、利息繳不出來，連住的房子都被貼上【法拍】封條……\n貪快開五層槓桿，最後真的什麼都沒了……'
  },
  {
    tier: 'beginner',
    chapter: '第 6 章｜關鍵抉擇 ②',
    scene: 'choice_fiveloans',
    speaker: 'boss',
    mood: 'excited',
    text: '股市大跌剛好抄底啦！快去辦信貸＋股票質押「五貸同堂」，\n借越多賺越快，翻身就靠這一次！',
    choice: {
      prompt: '💚 遇到誘惑！小綠怎麼選？',
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
  {
    tier: 'beginner',
    chapter: '第 7 章｜初階結業：安全起點',
    scene: 'safe_blue_highfive',
    speaker: 'blue',
    mood: 'happy',
    sfx: 'shield',
    text: '看完這麼多破產悲劇，其實「安全又正確」的投資一點都不複雜！\n只要守住這 4 條鐵則，你就能永遠避開破產！'
  },
  {
    tier: 'beginner',
    chapter: '第 7 章｜初階結業：安全起點',
    scene: 'safe_four_rules',
    speaker: 'green',
    mood: 'cool',
    text: '① 絕不借錢、不開槓桿 🚫　② 先留緊急備用金 🛡️\n③ 只用閒錢買分散 ETF 🧺　④ 靠 16 歲「時間」慢慢長大 ⏳'
  },
  {
    tier: 'beginner',
    chapter: '第 7 章｜初階考驗 ③',
    scene: 'choice_final',
    speaker: 'narrator',
    mood: 'happy',
    text: '16 歲的小綠辛苦存到了第一筆零用錢 $10,000！\n這一次，你要怎麼開始你的投資人生？',
    choice: {
      prompt: '💚 初階總考驗！選出能保護你一輩子的路：',
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
          winText: '太棒了！你成功通過初階防破產認證！'
        }
      ]
    }
  },
  {
    tier: 'beginner',
    chapter: '🌱 初階通關！解鎖 ⚡ 中階篇',
    scene: 'tier1_clear',
    speaker: 'green',
    mood: 'happy',
    sfx: 'victory',
    tierClear: 'beginner',
    text: '恭喜小綠完成【🌱 初階：防破產基礎篇 (33/100)】！\n按「下一頁」直接升級進入【⚡ 中階：台灣實戰避坑篇】！'
  },

  // =========================================================================
  // ⚡ 中階（第 34 ～ 66 幕）：台灣實戰規則、久留美教訓②、ETF、複利、除息與反詐騙
  // =========================================================================
  {
    tier: 'intermediate',
    chapter: '第 8 章｜台股死穴：違約交割與無本當沖',
    scene: 'mid_t2_intro',
    speaker: 'yellow',
    mood: 'cool',
    text: '歡迎來到【⚡ 中階篇】！\n在台灣買股票有個超重要規則叫【T+2 交割】：今天買，兩天後早上 10 點扣錢！'
  },
  {
    tier: 'intermediate',
    chapter: '第 8 章｜台股死穴：違約交割與無本當沖',
    scene: 'mid_daytrade_red',
    speaker: 'red',
    mood: 'excited',
    text: '哇！既然兩天後才扣錢，我戶頭只有 $1,000，\n是不是可以早上先買 100 萬的股票、下午賣掉賺價差（無本當沖）？！'
  },
  {
    tier: 'intermediate',
    chapter: '第 8 章｜台股死穴：違約交割與無本當沖',
    scene: 'mid_limit_down',
    speaker: 'red',
    mood: 'cry',
    sfx: 'explosion',
    shake: true,
    text: '救命啊！！買完才 10 分鐘，這支股票突然【跌停鎖死】根本賣不掉！\n兩天後戶頭扣不到 100 萬，我變成【違約交割】信用全毀了！！'
  },
  {
    tier: 'intermediate',
    chapter: '第 8 章｜台股死穴：違約交割與無本當沖',
    scene: 'mid_t2_rule',
    speaker: 'green',
    mood: 'serious',
    text: '違約交割超嚴重！不只帳戶被凍結、賠巨額違約金，嚴重還會吃官司！\n鐵則：【戶頭有多少現金，最多就只買多少，絕不玩無本當沖】！'
  },
  {
    tier: 'intermediate',
    chapter: '第 8 章｜致敬《FX戰士久留美》爆倉名場面 ②',
    scene: 'kurumi_blind_follow',
    speaker: 'yellow',
    mood: 'shock',
    sfx: 'hit',
    text: '看過《FX戰士久留美》裡的「芽吹式慘案」嗎？\n完全不懂原理、只想靠抱大腿聽明牌賺快錢，還把獎學金＋刷卡借錢全砸進 25 倍 FX！'
  },
  {
    tier: 'intermediate',
    chapter: '第 8 章｜致敬《FX戰士久留美》爆倉名場面 ②',
    scene: 'kurumi_betrayed',
    speaker: 'red',
    mood: 'cry',
    sfx: 'explosion',
    shake: true,
    text: '最殘酷的是：報明牌給她的人，自己私下卻做反方向！\n毫無章法又到處借錢加碼，最後一秒強制平倉、血本無歸還欠一屁股債！'
  },
  {
    tier: 'intermediate',
    chapter: '第 8 章｜久留美名場面抉擇',
    scene: 'kurumi_choice_margin',
    speaker: 'red',
    mood: 'shock',
    sfx: 'hit',
    text: '手機狂震！螢幕跳出【⚠️ 保證金維持率 55%，即將強制平倉】！\n小紅哭著問你：「要把最後的學費和借來的錢補進去硬凹等反彈嗎？！」',
    choice: {
      prompt: '⚡ 久留美經典瞬間！小綠怎麼決定？',
      options: [
        {
          label: '🙏 祈禱漲回去！把學費＋借來的錢全補進保證金硬凹！',
          correct: false,
          gameoverScene: 'gameover_roscut',
          gameoverTitle: '💀 GAME OVER — 叮咚！強制平倉通知（ROSCUT）！',
          gameoverText: '「神啊拜託漲回去…」話還沒說完，匯率一根長紅衝破防線！\n連最後補進去的學費和借來的錢，0.1 秒全部蒸發歸零！'
        },
        {
          label: '✂️ 立刻止血不補錢！絕不借錢凹單，從此戒掉高槓桿 FX！',
          correct: true,
          winText: '保住人生了！虧損時絕不能拿學費和借來的錢去補高槓桿黑洞！'
        }
      ]
    }
  },
  {
    tier: 'intermediate',
    chapter: '第 9 章｜通膨怪獸 vs 16 歲複利超能力',
    scene: 'mid_inflation_boba',
    speaker: 'yellow',
    mood: 'serious',
    text: '不借錢、不當沖，那把錢一輩子放抽屜好不好？\n你看珍珠奶茶從以前 $30 漲到現在 $70，這叫【通貨膨脹】！'
  },
  {
    tier: 'intermediate',
    chapter: '第 9 章｜通膨怪獸 vs 16 歲複利超能力',
    scene: 'mid_inflation_shrink',
    speaker: 'green',
    mood: 'think',
    text: '原來現金放著不動，購買力會慢慢被通膨怪獸吃掉……\n所以我才需要用「安全、不開槓桿」的方式投資！'
  },
  {
    tier: 'intermediate',
    chapter: '第 9 章｜通膨怪獸 vs 16 歲複利超能力',
    scene: 'mid_compound_compare',
    speaker: 'blue',
    mood: 'happy',
    sfx: 'select',
    text: '而且小綠你才 16 歲！每月用閒錢存 $1,000 買穩健大盤（年均約 7%），\n滾到 60 歲有機會超過 $340 萬；36 歲才開始只剩 $75 萬！'
  },
  {
    tier: 'intermediate',
    chapter: '第 9 章｜通膨怪獸 vs 16 歲複利超能力',
    scene: 'mid_compound_power',
    speaker: 'green',
    mood: 'happy',
    text: '太猛了吧！借錢的複利會害人破產，\n但【自己慢慢存的複利】，站在 16 歲這方就是最強超能力！'
  },
  {
    tier: 'intermediate',
    chapter: '第 10 章｜單壓個股 vs ETF 大禮包',
    scene: 'mid_single_stock_crash',
    speaker: 'red',
    mood: 'cry',
    sfx: 'hit',
    shake: true,
    text: '嗚嗚……我把全部存款只買 1 家曾經超紅的手機大廠，\n結果幾年後被對手打敗，股價直接跌掉 90%……'
  },
  {
    tier: 'intermediate',
    chapter: '第 10 章｜單壓個股 vs ETF 大禮包',
    scene: 'mid_etf_basket',
    speaker: 'blue',
    mood: 'cool',
    text: '所以新手最推薦【大盤 ETF】（例如台灣 0050 或全球大盤 ETF）！\n買 1 份，就等於一次擁有一整籃 50 家～數千家最強公司！'
  },
  {
    tier: 'intermediate',
    chapter: '第 10 章｜單壓個股 vs ETF 大禮包',
    scene: 'mid_etf_auto_swap',
    speaker: 'yellow',
    mood: 'happy',
    text: '更讚的是大盤 ETF 會【自動汰弱留強】：\n哪家公司變弱就被踢出籃子，新崛起的王者會自動補進來！'
  },
  {
    tier: 'intermediate',
    chapter: '第 10 章｜單壓個股 vs ETF 大禮包',
    scene: 'mid_etf_green',
    speaker: 'green',
    mood: 'happy',
    text: '不用每天猜哪一家公司會暴紅，直接買整籃最強企業，\n既省時間、又不會因為 1 家倒閉就歸零！'
  },
  {
    tier: 'intermediate',
    chapter: '第 10 章｜中階抉擇 ④',
    scene: 'choice_daytrade',
    speaker: 'red',
    mood: 'excited',
    text: '小綠別買什麼慢慢漲的 ETF 了！\n戶頭不用放錢，明天跟我一起「無本當沖」衝熱門飆股，一天賺 5 千！',
    choice: {
      prompt: '⚡ 中階實戰考驗 ④：你怎麼選？',
      options: [
        {
          label: '🎲 沒錢也照買！挑戰無本當沖賺快錢',
          correct: false,
          gameoverScene: 'gameover_daytrade',
          gameoverTitle: '💀 GAME OVER — 跌停鎖死・違約交割！',
          gameoverText: '買進後股價突然跌停鎖死根本賣不掉！兩天後帳戶沒錢扣款，\n正式【違約交割】：信用破產、全市場封鎖，還得賠巨額違約金！'
        },
        {
          label: '🧺 拒絕無本當沖！只用現有閒錢慢慢買大盤 ETF',
          correct: true,
          winText: '漂亮！絕不碰超出自己現金能力的交易，穩健才是王道！'
        }
      ]
    }
  },
  {
    tier: 'intermediate',
    chapter: '第 11 章｜定期定額與「微笑曲線」',
    scene: 'mid_dca_intro',
    speaker: 'blue',
    mood: 'calm',
    text: '很多新手會煩惱：「現在股價好高，我應該等大跌再買嗎？」\n其實沒人能準確猜中明天漲跌——這時候就要用【定期定額】！'
  },
  {
    tier: 'intermediate',
    chapter: '第 11 章｜定期定額與「微笑曲線」',
    scene: 'mid_smile_curve',
    speaker: 'yellow',
    mood: 'cool',
    text: '每個月固定一天投入固定金額買 ETF：\n高價時買到的股數少；股災大跌打折時，同樣的錢可以【多撿超多股】！'
  },
  {
    tier: 'intermediate',
    chapter: '第 11 章｜定期定額與「微笑曲線」',
    scene: 'mid_crash_panic',
    speaker: 'red',
    mood: 'cry',
    sfx: 'explosion',
    shake: true,
    text: '啊！大股災暴跌 -35%！我嚇死了全部賣掉停損！\n結果幾年後股市漲回新高，我卻在谷底賣光光了……'
  },
  {
    tier: 'intermediate',
    chapter: '第 11 章｜定期定額與「微笑曲線」',
    scene: 'mid_smile_win',
    speaker: 'green',
    mood: 'happy',
    sfx: 'shield',
    text: '只要買的是分散大盤 ETF 又沒借錢，\n大跌反而像【百貨週年慶打 65 折】，照常定期定額，最後走出微笑曲線！'
  },
  {
    tier: 'intermediate',
    chapter: '第 11 章｜定期定額與「微笑曲線」',
    scene: 'mid_discipline',
    speaker: 'blue',
    mood: 'happy',
    text: '定期定額最強的地方：讓你不用每天盯盤焦慮，\n把時間留給讀書、畫畫、看動畫和享受生活！'
  },
  {
    tier: 'intermediate',
    chapter: '第 12 章｜看懂「高股息」與「除息真相」',
    scene: 'mid_div_hype',
    speaker: 'red',
    mood: 'excited',
    text: '欸小綠！網路上超多人搶買「高股息月月配」，\n每個月領股息好像天上掉下免費零用錢耶！'
  },
  {
    tier: 'intermediate',
    chapter: '第 12 章｜看懂「高股息」與「除息真相」',
    scene: 'mid_div_split',
    speaker: 'yellow',
    mood: 'serious',
    sfx: 'hit',
    text: '小心誤會！股息不是憑空變出來的！\n股價 $100 發給你 $5 股息，隔天股價會馬上扣掉變成 $95（這叫除息）！'
  },
  {
    tier: 'intermediate',
    chapter: '第 12 章｜看懂「高股息」與「除息真相」',
    scene: 'mid_div_fill',
    speaker: 'yellow',
    mood: 'cool',
    text: '$95 現金＋ $5 股息還是 $100（左手換右手）！\n只有當股價後來漲回 $100（叫【填息】），你才真正賺到那 $5！'
  },
  {
    tier: 'intermediate',
    chapter: '第 12 章｜看懂「高股息」與「除息真相」',
    scene: 'mid_div_youth',
    speaker: 'green',
    mood: 'think',
    text: '懂了！如果公司一直跌、沒填息，只是「賺了股息、賠了價差」！\n16 歲還不需要靠配息過生活，重點是看【長期總報酬能不能長大】！'
  },
  {
    tier: 'intermediate',
    chapter: '第 12 章｜中階抉擇 ⑤',
    scene: 'choice_crash_hold',
    speaker: 'red',
    mood: 'shock',
    text: '大盤遇到股災跌了 30%！好可怕喔！\n快點把大盤 ETF 全部賣掉，再去借信貸買一支聽說要反彈的飆股翻本吧！',
    choice: {
      prompt: '⚡ 中階實戰考驗 ⑤：股災來襲怎麼辦？',
      options: [
        {
          label: '😱 賣光 ETF，再借信貸押單一飆股翻本',
          correct: false,
          gameoverScene: 'gameover_fiveloans',
          gameoverTitle: '💀 GAME OVER — 谷底殺低＋借錢翻車！',
          gameoverText: '在谷底賣掉好 ETF 已經鎖定虧損，借錢買的飆股又繼續腰斬！\n恐慌＋借錢，是投資市場最致命的雙重毒藥！'
        },
        {
          label: '🛡️ 不借錢、不亂賣！照常定期定額撿便宜',
          correct: true,
          winText: '穩如泰山！撐過風暴後大盤創下新高，你在低點撿的便宜全變大獲利！'
        }
      ]
    }
  },
  {
    tier: 'intermediate',
    chapter: '第 13 章｜台灣最新反詐騙特訓',
    scene: 'mid_scam_ad',
    speaker: 'boss',
    mood: 'excited',
    text: '滑手機看到廣告：「知名財經大師免費送飆股！快加 LINE 領內部名額！」\n這其實是台灣這幾年騙走幾百億的【假投資詐騙】起手式！'
  },
  {
    tier: 'intermediate',
    chapter: '第 13 章｜台灣最新反詐騙特訓',
    scene: 'mid_scam_actors',
    speaker: 'yellow',
    mood: 'shock',
    sfx: 'hit',
    text: '你一進那個 50 人的 LINE 群組，大家都在曬賺錢對帳單……\n真相是：【群組裡 49 個人都是詐騙集團演的暗樁】，只有 1 個真肥羊就是你！'
  },
  {
    tier: 'intermediate',
    chapter: '第 13 章｜台灣最新反詐騙特訓',
    scene: 'mid_scam_fakeapp',
    speaker: 'blue',
    mood: 'serious',
    text: '接著他們會叫你下載【假券商 APP】，後台隨便改數字讓你以為賺 300%！\n等你把大筆錢匯進去想領出來時，就說要「先繳保證金」，最後整群消失！'
  },
  {
    tier: 'intermediate',
    chapter: '第 13 章｜台灣最新反詐騙特訓',
    scene: 'mid_scam_165',
    speaker: 'green',
    mood: 'cool',
    text: '記住防詐三不：【不加陌生老師群】、【不下載不明投資 APP】、【絕不面交或匯款給陌生帳戶】！\n有懷疑立刻問爸媽或打【165 反詐騙專線】！'
  },
  {
    tier: 'intermediate',
    chapter: '第 13 章｜中階結業考驗 ⑥',
    scene: 'choice_scam_app',
    speaker: 'boss',
    mood: 'excited',
    text: '恭喜你！你在我們專屬 APP 帳面已經賺了 50 萬！\n只要現在再匯 5 萬元「解凍手續費」，馬上就能把 50 萬領出來喔！',
    choice: {
      prompt: '⚡ 中階最終考驗 ⑥：對方叫你先匯解凍費！',
      options: [
        {
          label: '💸 為了領回 50 萬，趕快匯 5 萬給他！',
          correct: false,
          gameoverScene: 'gameover_scam',
          gameoverTitle: '💀 GAME OVER — 掉進假 APP 詐騙黑洞！',
          gameoverText: '那 50 萬從頭到尾只是假畫面！匯出 5 萬後對方立刻把你封鎖，\n正牌合法券商絕不會叫你匯「解凍金」才能領錢！'
        },
        {
          label: '🚨 100% 詐騙！立刻截圖封鎖並告知爸媽／打 165！',
          correct: true,
          winText: '滿分防詐雷達！！一眼看穿假出金陷阱，守住全部積蓄！'
        }
      ]
    }
  },
  {
    tier: 'intermediate',
    chapter: '第 13 章｜中階總複習',
    scene: 'mid_summary',
    speaker: 'green',
    mood: 'cool',
    text: '中階 4 大實戰神招集滿：\n① 不玩無本當沖　② 買大盤 ETF ＋ 定期定額　③ 看懂除息　④ 封鎖假老師 APP！'
  },
  {
    tier: 'intermediate',
    chapter: '⚡ 中階通關！解鎖 🏆 高階篇',
    scene: 'tier2_clear',
    speaker: 'green',
    mood: 'happy',
    sfx: 'victory',
    tierClear: 'intermediate',
    text: '超強！！你已經完成【⚡ 中階：台灣實戰避坑篇 (66/100)】！\n按「下一頁」前進最終殿堂【🏆 高階：大師心法系統篇】！'
  },

  // =========================================================================
  // 🏆 高階（第 67 ～ 100 幕）：資產配置、衍生品爆倉、久留美教訓③、人性陷阱與終身藍圖
  // =========================================================================
  {
    tier: 'advanced',
    chapter: '第 14 章｜大師防護罩：資產配置與再平衡',
    scene: 'adv_rpg_team',
    speaker: 'blue',
    mood: 'cool',
    text: '歡迎進入【🏆 高階篇】！\n真正的投資大師就像組 RPG 隊伍：不能只帶全攻擊手，一定要有坦克跟補師！'
  },
  {
    tier: 'advanced',
    chapter: '第 14 章｜大師防護罩：資產配置與再平衡',
    scene: 'adv_stock_bond',
    speaker: 'yellow',
    mood: 'serious',
    text: '這就叫【資產配置】：\n⚔️ 股票 ETF 負責長期進攻長大 ＋ 🛡️ 現金/安全公債負責防守穩住心情！'
  },
  {
    tier: 'advanced',
    chapter: '第 14 章｜大師防護罩：資產配置與再平衡',
    scene: 'adv_rebalance',
    speaker: 'yellow',
    mood: 'cool',
    text: '每年固定做一次【再平衡】：\n股市漲太高時，賣一點獲利放回防守；股市大跌時，拿防守錢逢低買股票！'
  },
  {
    tier: 'advanced',
    chapter: '第 14 章｜大師防護罩：資產配置與再平衡',
    scene: 'adv_rebalance_win',
    speaker: 'green',
    mood: 'happy',
    text: '哇！這樣不用預測市場高低點，\n光靠紀律再平衡，系統就自動幫我做到【高賣、低買】耶！'
  },
  {
    tier: 'advanced',
    chapter: '第 14 章｜大師防護罩：資產配置與再平衡',
    scene: 'adv_age_ratio',
    speaker: 'blue',
    mood: 'calm',
    text: '而且配置會隨年齡調整：年輕時有時間能多放穩健股票 ETF，\n年紀漸長接近退休時，就要把安全防守比例拉高！'
  },
  {
    tier: 'advanced',
    chapter: '第 15 章｜進階地雷：期貨、選擇權與 50 倍合約',
    scene: 'adv_derivatives_intro',
    speaker: 'narrator',
    mood: 'serious',
    text: '長大後你一定會聽到期貨、選擇權、加密貨幣合約……\n為什麼這類高倍數衍生品，高達 9 成散戶最後都賠光？'
  },
  {
    tier: 'advanced',
    chapter: '第 15 章｜進階地雷：期貨、選擇權與 50 倍合約',
    scene: 'adv_50x_wick',
    speaker: 'red',
    mood: 'cry',
    sfx: 'explosion',
    shake: true,
    text: '我開了 50 倍加密貨幣合約！結果價格只往下抖了【2%（插針）】，\n我 1 秒直接爆倉歸零！一分鐘後它竟然又大漲，但我早出局了！！'
  },
  {
    tier: 'advanced',
    chapter: '第 15 章｜進階地雷：期貨、選擇權與 50 倍合約',
    scene: 'adv_options_decay',
    speaker: 'yellow',
    mood: 'serious',
    text: '而「選擇權買方」有到期日，每天時間一過價值就融化歸零；\n「賣方」更恐怖——平常小賺零錢，遇到一次大股災就可能賠到破產！'
  },
  {
    tier: 'advanced',
    chapter: '第 15 章｜進階地雷：期貨、選擇權與 50 倍合約',
    scene: 'adv_zero_sum',
    speaker: 'green',
    mood: 'serious',
    text: '買好公司是跟企業一起把餅做大（正和遊戲）；\n高倍數合約與當沖是互相搶錢還要扣手續費（負和賭場），絕不碰！'
  },
  {
    tier: 'advanced',
    chapter: '第 15 章｜致敬《FX戰士久留美》爆倉名場面 ③',
    scene: 'kurumi_revenge_trade',
    speaker: 'yellow',
    mood: 'shock',
    sfx: 'hit',
    text: '《FX戰士久留美》最讓人背脊發涼的心魔叫【報復性交易】：\n滿腦子想著「要把以前虧掉的錢一口氣贏回來」，結果越賭越大、越輸越慘！'
  },
  {
    tier: 'advanced',
    chapter: '第 15 章｜致敬《FX戰士久留美》爆倉名場面 ③',
    scene: 'kurumi_3am_chart',
    speaker: 'red',
    mood: 'cry',
    text: '半夜三點還在死盯手機 K 線、心跳狂飆 140、吃不下也睡不著……\n高槓桿就算暫時沒爆倉，也會把你的健康、課業和快樂全部榨乾！'
  },
  {
    tier: 'advanced',
    chapter: '第 15 章｜致敬《FX戰士久留美》爆倉名場面 ③',
    scene: 'kurumi_peace_sleep',
    speaker: 'green',
    mood: 'happy',
    sfx: 'shield',
    text: '所以《FX戰士久留美》裡有句名言：「沒有未實現虧損焦慮的感覺超爽！」\n不開槓桿、用閒錢穩穩存大盤 ETF，每天安心睡到自然醒才是真贏家！'
  },
  {
    tier: 'advanced',
    chapter: '第 15 章｜致敬《FX戰士久留美》爆倉名場面 ③',
    scene: 'kurumi_author_warn',
    speaker: 'blue',
    mood: 'cool',
    text: '記住一個最簡單的自我檢查：\n【如果一筆投資讓你晚上睡不著覺，就代表你買太大、或開槓桿了！】'
  },
  {
    tier: 'advanced',
    chapter: '第 15 章｜高階抉擇 ⑦',
    scene: 'choice_50x_crypto',
    speaker: 'red',
    mood: 'excited',
    text: '網友貼圖炫耀開「50 倍永續合約」，10 分鐘就賺一台機車！\n小綠快點開單跟上，錯過就虧大了！',
    choice: {
      prompt: '🏆 高階考驗 ⑦：面對 50 倍合約暴富炫耀圖！',
      options: [
        {
          label: '⚡ 怕錯過！立刻跟著開 50 倍合約！',
          correct: false,
          gameoverScene: 'gameover_50x',
          gameoverTitle: '💀 GAME OVER — 2% 插針瞬間爆倉！',
          gameoverText: '半夜市場正常波動往下晃了 2.1%，系統 0.5 秒強制清算！\n50 倍槓桿完全容不下任何正常波動，直接歸零！'
        },
        {
          label: '🧠 冷靜看穿！那是高槓桿賭博，絕不進場！',
          correct: true,
          winText: '大師級定力！價格只要晃 2% 就歸零的東西，絕不是投資！'
        }
      ]
    }
  },
  {
    tier: 'advanced',
    chapter: '第 16 章｜看穿大腦的 3 大投資心理陷阱',
    scene: 'adv_brain_intro',
    speaker: 'blue',
    mood: 'cool',
    text: '投資界最大的敵人其實不是別人，而是【我們自己的大腦】！\n高階玩家一定要認識這 3 個超容易害人賠錢的心理陷阱！'
  },
  {
    tier: 'advanced',
    chapter: '第 16 章｜看穿大腦的 3 大投資心理陷阱',
    scene: 'adv_fomo_cliff',
    speaker: 'red',
    mood: 'shock',
    sfx: 'hit',
    text: '陷阱 ①【FOMO 錯失恐懼症】：看到大家都在狂買某支飆股怕沒賺到，\n忍不住衝進去，結果剛好買在最高點當「最後一棒韭菜」！'
  },
  {
    tier: 'advanced',
    chapter: '第 16 章｜看穿大腦的 3 大投資心理陷阱',
    scene: 'adv_sunk_cost',
    speaker: 'yellow',
    mood: 'serious',
    text: '陷阱 ②【沉沒成本不甘心】：買到爛公司已經大虧，\n不肯認錯停損，還一直加碼攤平想凹回來，結果越陷越深！'
  },
  {
    tier: 'advanced',
    chapter: '第 16 章｜看穿大腦的 3 大投資心理陷阱',
    scene: 'adv_survivor_iceberg',
    speaker: 'blue',
    mood: 'serious',
    text: '陷阱 ③【倖存者偏差】：網路上你只看得到 1 個炫富成功的少年股神，\n卻看不到水面下 999 個默默爆倉破產、不敢發文的人！'
  },
  {
    tier: 'advanced',
    chapter: '第 16 章｜看穿大腦的 3 大投資心理陷阱',
    scene: 'adv_brain_shield',
    speaker: 'green',
    mood: 'calm',
    text: '原來如此！覺得「再不買就來不及」時，先深呼吸離開螢幕 10 分鐘，\n不跟風、不羨慕暴富文，就能避開 90% 的蠢決定！'
  },
  {
    tier: 'advanced',
    chapter: '第 17 章｜3 個紅綠燈：避開地雷股體檢',
    scene: 'adv_checkup_intro',
    speaker: 'yellow',
    mood: 'cool',
    text: '就算以後長大想研究單一公司，也不用先背厚厚財報！\n只要用這 3 顆【防地雷紅綠燈】做基本體檢：'
  },
  {
    tier: 'advanced',
    chapter: '第 17 章｜3 個紅綠燈：避開地雷股體檢',
    scene: 'adv_light_cash',
    speaker: 'yellow',
    mood: 'serious',
    text: '🚦 體檢 ①【有沒有真的賺現金？】\n只會拍炫砲簡報畫大餅、連續 5 年一直大賠錢的公司 ➔ 🔴 危險紅燈！'
  },
  {
    tier: 'advanced',
    chapter: '第 17 章｜3 個紅綠燈：避開地雷股體檢',
    scene: 'adv_light_debt',
    speaker: 'yellow',
    mood: 'serious',
    text: '🚦 體檢 ②【公司負債會不會太高？】\n就像「五貸同堂」一樣，借太多債的公司一遇到景氣變差就會倒閉 ➔ 🔴 紅燈！'
  },
  {
    tier: 'advanced',
    chapter: '第 17 章｜3 個紅綠燈：避開地雷股體檢',
    scene: 'adv_light_moat',
    speaker: 'green',
    mood: 'happy',
    text: '🚦 體檢 ③【有沒有強大護城河？】\n全世界每天都離不開它、對手很難取代的好企業 ➔ 🟢 綠燈！'
  },
  {
    tier: 'advanced',
    chapter: '第 17 章｜高階抉擇 ⑧',
    scene: 'choice_landmine',
    speaker: 'boss',
    mood: 'excited',
    text: '這家神秘科技股連虧 6 年、負債超高，但網紅說它明年會變下一個輝達！\n快把全部資產歐印下去吧！',
    choice: {
      prompt: '🏆 高階考驗 ⑧：用 3 顆紅綠燈體檢這支股票！',
      options: [
        {
          label: '🚀 相信網紅畫大餅！全部資產歐印下去！',
          correct: false,
          gameoverScene: 'gameover_landmine',
          gameoverTitle: '💀 GAME OVER — 踩中地雷股變壁紙！',
          gameoverText: '連年虧損加上龐大負債，半年後公司資金斷鏈宣布下市！\n股票直接變成一文不值的壁紙，全數歸零……'
        },
        {
          label: '🔴 紅燈警報！連虧又高負債，果斷避開地雷！',
          correct: true,
          winText: '火眼金睛！靠基本體檢一眼識破吹牛地雷股！'
        }
      ]
    }
  },
  {
    tier: 'advanced',
    chapter: '第 18 章｜隱形複利殺手：頻繁交易與手續費',
    scene: 'adv_fee_hole',
    speaker: 'red',
    mood: 'cry',
    sfx: 'hit',
    text: '奇怪？我今年明明有賺有賠打平，怎麼帳戶裡的錢還是少了一大截？'
  },
  {
    tier: 'advanced',
    chapter: '第 18 章｜隱形複利殺手：頻繁交易與手續費',
    scene: 'adv_fee_explain',
    speaker: 'yellow',
    mood: 'serious',
    text: '因為每次買進賣出都要付【手續費 ＋ 交易稅】！\n你一年殺進殺出 200 次，獲利全被交易成本吃光，都在幫券商打工！'
  },
  {
    tier: 'advanced',
    chapter: '第 18 章｜隱形複利殺手：頻繁交易與手續費',
    scene: 'adv_low_cost',
    speaker: 'blue',
    mood: 'cool',
    text: '高階贏家的秘密武器反而是「懶惰」：\n挑選【低管理費的大盤 ETF】＋【長期持有、少動多抱】！'
  },
  {
    tier: 'advanced',
    chapter: '第 18 章｜隱形複利殺手：頻繁交易與手續費',
    scene: 'adv_buffett_turtle',
    speaker: 'green',
    mood: 'happy',
    text: '像龜兔賽跑一樣！不亂衝、不亂繳手續費，\n把每一塊錢都留在複利雪球裡，穩穩跑贏大多數人！'
  },
  {
    tier: 'advanced',
    chapter: '第 18 章｜隱形複利殺手：頻繁交易與手續費',
    scene: 'adv_invest_self',
    speaker: 'green',
    mood: 'happy',
    text: '而且別忘了：16 歲回報率最高的投資，其實是【自己的健康與專長】！\n賺錢本事變強 ＋ 正確投資紀律 ＝ 雙引擎起飛！'
  },
  {
    tier: 'advanced',
    chapter: '第 19 章｜16 歲到 30 歲終身藍圖',
    scene: 'adv_roadmap_16',
    speaker: 'blue',
    mood: 'happy',
    text: '【16 ～ 17 歲階段】：練好防破產觀念、零用錢分帳留備用金，\n想體驗買第一股，記得和爸媽一起討論開戶！'
  },
  {
    tier: 'advanced',
    chapter: '第 19 章｜16 歲到 30 歲終身藍圖',
    scene: 'adv_roadmap_18',
    speaker: 'yellow',
    mood: 'cool',
    text: '【18 歲以後階段】：存好 6 個月緊急備用金護盾 ➔\n用閒錢定期定額分散大盤 ETF ＋ 每年做一次資產配置再平衡！'
  },
  {
    tier: 'advanced',
    chapter: '第 19 章｜16 歲到 30 歲終身藍圖',
    scene: 'adv_team_ready',
    speaker: 'green',
    mood: 'cool',
    sfx: 'shield',
    text: '小藍、小黃，我們走！\n帶著初階、中階、高階學會的全部知識，迎戰最後的終極破產大魔王！'
  },
  {
    tier: 'advanced',
    chapter: '第 19 章｜終極總決戰 ⑨',
    scene: 'choice_final_boss',
    speaker: 'boss',
    mood: 'excited',
    sfx: 'hit',
    shake: true,
    text: '我是「高槓桿 × 假老師 × 五貸同堂」終極破產大魔王！！\n放棄慢慢變富吧，跟我簽下借錢 50 倍合約，今晚就變億萬富翁！',
    choice: {
      prompt: '👑 最終 BOSS 決戰！小綠使出必殺技：',
      options: [
        {
          label: '💀 接受誘惑：借錢開 50 倍合約＋押光全部家當',
          correct: false,
          gameoverScene: 'gameover_boss',
          gameoverTitle: '💀 GAME OVER — 被終極破產魔王吞噬！',
          gameoverText: '只要一念貪心碰了高槓桿與借貸，前面累積的一切都可能一夕歸零！\n快重新選擇，拿出你的防破產聖劍！'
        },
        {
          label: '💚 必殺技：不借錢 × 不開槓桿 × 備用金 × 長期分散 ETF！',
          correct: true,
          winText: '轟隆！！防破產黃金護盾一擊擊碎大魔王！！小綠完勝全場！！'
        }
      ]
    }
  },
  {
    tier: 'advanced',
    chapter: '👑 GRAND TRUE ENDING｜投資大師誕生！',
    scene: 'grand_ending',
    speaker: 'green',
    mood: 'happy',
    sfx: 'victory',
    tierClear: 'advanced',
    isEnding: true,
    text: '恭喜小綠全破【初階・中階・高階】全部 100 幕修練！！\n記住一輩子的超能力：不借錢、不開槓桿、懂風險、用時間慢慢變富！'
  }
];
