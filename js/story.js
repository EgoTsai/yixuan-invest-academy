/* ============================================================
   story.js — 《投資大作戰》100 幕三等級完整劇本
   🌱 初級 (1–33)：基本觀念（幾歲開始、收益＝風險、必懂投資名詞＋實例）
   ⚡ 中級 (34–66)：投資的方法（定存、債券、股票、ETF、房地產、期貨/FX＋實例）
   🏆 高級 (67–100)：長期規劃、現在的準備、心理建設與未來學習方向
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
  { id: 'beginner', label: '🌱 初級', title: '基本觀念與名詞', start: 0, end: 32, color: '#22e584' },
  { id: 'intermediate', label: '⚡ 中級', title: '各種投資方法實例', start: 33, end: 65, color: '#38bdf8' },
  { id: 'advanced', label: '🏆 高級', title: '長期規劃與心理建設', start: 66, end: 99, color: '#ffd43b' }
];

export const SCENES = [
  // =========================================================================
  // 🌱 初級（第 1 ～ 33 幕）：基本觀念 — 幾歲開始、收益＝風險、投資名詞＋實例
  // =========================================================================
  {
    tier: 'beginner',
    chapter: '第 1 章｜幾歲可以開始投資？',
    scene: 'intro_green',
    speaker: 'green',
    mood: 'happy',
    text: '嗨！我是 16 歲的小綠。\n今天從 0 開始，一步一步完成【初級 → 中級 → 高級】的《投資大作戰》！'
  },
  {
    tier: 'beginner',
    chapter: '第 1 章｜幾歲可以開始投資？',
    scene: 'beg_age_start',
    speaker: 'blue',
    mood: 'cool',
    text: '很多人問：「幾歲可以開始投資？」\n在台灣：18 歲可以自己開證券戶；未滿 18 歲只要【由爸媽陪同】就能開戶！'
  },
  {
    tier: 'beginner',
    chapter: '第 1 章｜幾歲可以開始投資？',
    scene: 'beg_age_start',
    speaker: 'green',
    mood: 'happy',
    text: '而且【學習觀念】沒有年齡限制！\n16 歲先把基本觀念和風險搞懂，比滿 18 歲什麼都不懂就亂衝安全一萬倍！'
  },
  {
    tier: 'beginner',
    chapter: '第 2 章｜鐵則：收益等於風險',
    scene: 'red_hype',
    speaker: 'red',
    mood: 'excited',
    text: '投資超簡單啦！買股票就是穩賺不賠、躺著領錢的提款機吧！'
  },
  {
    tier: 'beginner',
    chapter: '第 2 章｜鐵則：收益等於風險',
    scene: 'risk_rollercoaster',
    speaker: 'yellow',
    mood: 'serious',
    sfx: 'hit',
    shake: true,
    text: '大錯特錯！投資＝用錢換取未來的可能性。\n會賺錢，也可能因為意外【大跌虧損】！'
  },
  {
    tier: 'beginner',
    chapter: '第 2 章｜鐵則：收益等於風險',
    scene: 'risk_reward_scale',
    speaker: 'yellow',
    mood: 'cool',
    text: '世界第一條投資鐵則：【收益等於風險】！\n想要越高的報酬，背後一定藏著越大的虧損風險，絕沒有「高報酬又零風險」！'
  },
  {
    tier: 'beginner',
    chapter: '第 2 章｜鐵則：收益等於風險',
    scene: 'risk_reward_scale',
    speaker: 'green',
    mood: 'think',
    text: '原來如此……看起來「賺超快」的地方，摔下去通常最痛！\n先學會「看懂風險、不破產」，才是第一步！'
  },
  {
    tier: 'beginner',
    chapter: '第 3 章｜必懂名詞 ① 本金、報酬率與通膨',
    scene: 'beg_terms_principal',
    speaker: 'yellow',
    mood: 'cool',
    text: '名詞 ①【本金與報酬率】：\n你拿出來投資的原始資金叫「本金」（例如 $100）；賺 $10 就是報酬率 +10%！'
  },
  {
    tier: 'beginner',
    chapter: '第 3 章｜必懂名詞 ① 本金、報酬率與通膨',
    scene: 'mid_inflation_boba',
    speaker: 'yellow',
    mood: 'serious',
    text: '名詞 ②【通貨膨脹】：\n東西一年比一年貴！實例：以前珍奶 $30，現在漲到 $70，現金放抽屜會變薄！'
  },
  {
    tier: 'beginner',
    chapter: '第 3 章｜必懂名詞 ① 本金、報酬率與通膨',
    scene: 'mid_inflation_shrink',
    speaker: 'green',
    mood: 'think',
    text: '懂了！如果把錢一輩子放抽屜不動，會被通膨怪獸慢慢吃掉購買力，\n所以我們才需要學會正確、安全的投資！'
  },
  {
    tier: 'beginner',
    chapter: '第 4 章｜必懂名詞 ② 複利（正反兩面！）',
    scene: 'mid_compound_compare',
    speaker: 'blue',
    mood: 'happy',
    sfx: 'select',
    text: '名詞 ③【複利（錢滾錢）】：賺到的錢繼續生錢！\n實例：每月用閒錢存 $1,000（年均 7%），16 歲開始到 60 歲約 $342 萬；36 歲才開始只剩 $75 萬！'
  },
  {
    tier: 'beginner',
    chapter: '第 4 章｜必懂名詞 ② 複利（正反兩面！）',
    scene: 'gm_billboard',
    speaker: 'narrator',
    mood: 'serious',
    text: '但複利也有恐怖的反面——【借錢的複利（循環利息）】！\n真實實例：2005 年震驚全台灣的【喬治與瑪麗（雙卡風暴）】！'
  },
  {
    tier: 'beginner',
    chapter: '第 4 章｜必懂名詞 ② 複利（正反兩面！）',
    scene: 'gm_monster',
    speaker: 'red',
    mood: 'shock',
    sfx: 'hit',
    text: '當年廣告狂喊「借錢好輕鬆」，大家刷爆現金卡和信用卡，\n卻沒發現背後藏著高達【18%～20% 循環利率】的複利怪獸！'
  },
  {
    tier: 'beginner',
    chapter: '第 4 章｜必懂名詞 ② 複利（正反兩面！）',
    scene: 'gm_domino',
    speaker: 'yellow',
    mood: 'shock',
    sfx: 'explosion',
    shake: true,
    text: '很多人「以卡養卡」（借 B 卡還 A 卡），30 萬債務利滾利變幾百萬！\n當年台灣幾十萬名【卡奴】直接信用破產！'
  },
  {
    tier: 'beginner',
    chapter: '第 4 章｜必懂名詞 ② 複利（正反兩面！）',
    scene: 'gm_lesson',
    speaker: 'green',
    mood: 'calm',
    text: '記住：存錢的複利是超能力，借錢的複利是吃人怪獸！\n未來用信用卡只刷【戶頭已有的錢】、每期全額繳清！'
  },
  {
    tier: 'beginner',
    chapter: '第 5 章｜必懂名詞 ③ 槓桿與斷頭爆倉',
    scene: 'lever_intro',
    speaker: 'yellow',
    mood: 'cool',
    text: '名詞 ④【槓桿】：最容易讓人一夜破產的名詞！\n簡單講就是：【借別人的錢，放大你的賭注】！'
  },
  {
    tier: 'beginner',
    chapter: '第 5 章｜必懂名詞 ③ 槓桿與斷頭爆倉',
    scene: 'lever_math',
    speaker: 'yellow',
    mood: 'serious',
    text: '實例：小紅自己只有 $100，卻向銀行借 $900，\n湊成 $1,000 去買股票！這就叫【10 倍槓桿】！'
  },
  {
    tier: 'beginner',
    chapter: '第 5 章｜必懂名詞 ③ 槓桿與斷頭爆倉',
    scene: 'lever_up',
    speaker: 'red',
    mood: 'excited',
    sfx: 'select',
    text: '哇哈哈！股價只漲 10%，$1,000 變 $1,100！\n還完銀行 $900，我剩下 $200，本金翻倍耶！'
  },
  {
    tier: 'beginner',
    chapter: '第 5 章｜必懂名詞 ③ 槓桿與斷頭爆倉',
    scene: 'lever_warning',
    speaker: 'yellow',
    mood: 'shock',
    sfx: 'hit',
    text: '別高興太早……\n如果股價不是漲 10%，而是【跌 10%】呢？'
  },
  {
    tier: 'beginner',
    chapter: '第 5 章｜必懂名詞 ③ 槓桿與斷頭爆倉',
    scene: 'hp_duel_start',
    speaker: 'narrator',
    mood: 'serious',
    text: '【HP 血條實例對決】\n左邊：小綠（不借錢 1 倍） VS 右邊：小紅（借錢 10 倍槓桿）！'
  },
  {
    tier: 'beginner',
    chapter: '第 5 章｜必懂名詞 ③ 槓桿與斷頭爆倉',
    scene: 'hp_green_safe',
    speaker: 'green',
    mood: 'calm',
    text: '股價跌 10%！但我沒有借錢，\nHP 只是從 100 變 90，活得好好的，還能等它漲回來！'
  },
  {
    tier: 'beginner',
    chapter: '第 5 章｜必懂名詞 ③ 槓桿與斷頭爆倉',
    scene: 'hp_red_liquidated',
    speaker: 'red',
    mood: 'cry',
    sfx: 'explosion',
    shake: true,
    text: '嗚哇！！跌 10% 剩 $900，銀行立刻搶走 $900 還債！\n名詞 ⑤【強制斷頭（爆倉）】：我的 HP 直接 0 / 100 出局了！！'
  },
  {
    tier: 'beginner',
    chapter: '第 5 章｜必懂名詞 ③ 槓桿與斷頭爆倉',
    scene: 'hp_red_debt',
    speaker: 'yellow',
    mood: 'shock',
    sfx: 'explosion',
    shake: true,
    text: '名詞 ⑥【穿倉（倒欠錢）】：如果閃崩跌 20%，$1,000 剩 $800，\n不夠還銀行 $900！不只本金歸零，還【倒欠銀行錢】！'
  },
  {
    tier: 'beginner',
    chapter: '第 5 章｜實例：致敬《FX戰士久留美》名場面 ①',
    scene: 'kurumi_pray',
    speaker: 'red',
    mood: 'shock',
    sfx: 'hit',
    text: '看過經典漫畫《FX戰士久留美》嗎？裡面演活了名詞 ⑦【未實現虧損與凹單】：\n帳面狂虧卻死不停損，跪對手機大喊「神啊拜託漲回去…」！'
  },
  {
    tier: 'beginner',
    chapter: '第 5 章｜實例：致敬《FX戰士久留美》名場面 ①',
    scene: 'kurumi_add_margin',
    speaker: 'red',
    mood: 'cry',
    text: '快被強制平倉時，還慌張把全部存款和獎學金一直補進去【補保證金】，\n心想「撐一下就會反彈」……結果洞越補越大！'
  },
  {
    tier: 'beginner',
    chapter: '第 5 章｜實例：致敬《FX戰士久留美》名場面 ①',
    scene: 'kurumi_roscut',
    speaker: 'yellow',
    mood: 'shock',
    sfx: 'explosion',
    shake: true,
    text: '叮咚！【🚨 強制平倉通知（ROSCUT）】！！\n走勢只要再多晃一點，連同補進去的救命錢 0.1 秒全部蒸發歸零！'
  },
  {
    tier: 'beginner',
    chapter: '第 5 章｜初級抉擇 ①',
    scene: 'choice_leverage',
    speaker: 'red',
    mood: 'excited',
    text: '小綠！這支股票明天一定會噴！\n快跟我一起借錢開「10 倍槓桿」，馬上買新電腦！',
    choice: {
      prompt: '🌱 初級抉擇 ①：輪到小綠決定！',
      options: [
        {
          label: '⚡ 好！開 10 倍槓桿衝一波！',
          correct: false,
          gameoverScene: 'gameover_leverage',
          gameoverTitle: '💀 GAME OVER — 爆倉破產！',
          gameoverText: '隔天公司爆出壞消息，股價跳空暴跌 -15%！\n你的 HP 瞬間歸零，不只存款蒸發，還倒欠券商一筆債……'
        },
        {
          label: '🛡️ 不要！收益等於風險，我不開槓桿！',
          correct: true,
          winText: '漂亮！隔天那支股票真的暴跌 -15%，小紅直接爆倉，小綠全身而退！'
        }
      ]
    }
  },
  {
    tier: 'beginner',
    chapter: '第 6 章｜初級總複習：4 條基本保護罩',
    scene: 'safe_blue_highfive',
    speaker: 'blue',
    mood: 'happy',
    sfx: 'shield',
    text: '初級的基本觀念和名詞你全部搞懂了！\n只要記住這 4 條基本原則，就能避開 90% 新手會踩的致命大坑：'
  },
  {
    tier: 'beginner',
    chapter: '第 6 章｜初級總複習：4 條基本保護罩',
    scene: 'safe_four_rules',
    speaker: 'green',
    mood: 'cool',
    text: '① 收益＝風險，絕不借錢開槓桿 🚫　② 先留緊急備用金 🛡️\n③ 用閒錢打敗通膨 🧺　④ 靠時間讓正複利慢慢長大 ⏳'
  },
  {
    tier: 'beginner',
    chapter: '第 6 章｜初級抉擇 ②',
    scene: 'gm_billboard',
    speaker: 'boss',
    mood: 'excited',
    text: '剛滿 18 歲嗎？快來辦現金卡預借現金去買股票，\n每個月只要繳最低金額就好，超級輕鬆喔！',
    choice: {
      prompt: '🌱 初級抉擇 ②：遇到「預借現金／循環利息」廣告！',
      options: [
        {
          label: '💳 太方便了！刷循環息預借現金來投資！',
          correct: false,
          gameoverScene: 'gameover_leverage',
          gameoverTitle: '💀 GAME OVER — 20% 循環利息卡奴破產！',
          gameoverText: '股市還沒賺錢，20% 的循環利息怪獸已經把債務越滾越大！\n就像 2005 雙卡風暴一樣，最後信用破產……'
        },
        {
          label: '🚫 絕對不借！只用自己戶頭裡的閒錢！',
          correct: true,
          winText: '讚！徹底識破循環利息陷阱，絕不讓負複利纏上自己！'
        }
      ]
    }
  },
  {
    tier: 'beginner',
    chapter: '第 6 章｜初級抉擇 ③',
    scene: 'choice_final',
    speaker: 'narrator',
    mood: 'happy',
    text: '16 歲的小綠想開始接觸投資，\n哪一個才是安全、合法又正確的第一步？',
    choice: {
      prompt: '🌱 初級總考驗 ③：選出正確的第一步！',
      options: [
        {
          label: '🎲 偷偷借陌生網友的帳號，拿吃飯錢衝高槓桿',
          correct: false,
          gameoverScene: 'gameover_scam',
          gameoverTitle: '💀 GAME OVER — 帳號被騙＋生活費歸零！',
          gameoverText: '用陌生人帳號錢直接被領走！而且吃飯錢絕不能拿去冒險！'
        },
        {
          label: '💚 先學好基本觀念，想開戶時和爸媽討論陪同辦理',
          correct: true,
          winText: '滿分通過初級！！觀念超扎實，準備認識各種投資工具吧！'
        }
      ]
    }
  },
  {
    tier: 'beginner',
    chapter: '第 6 章｜初級結業檢查',
    scene: 'beg_age_start',
    speaker: 'green',
    mood: 'happy',
    text: '初級名詞全部收進口袋：本金、報酬率、通膨、複利、循環息、槓桿、強制平倉！\n接下來進入中級，認識各種「投資的方法」！'
  },
  {
    tier: 'beginner',
    chapter: '🌱 初級通關！解鎖 ⚡ 中級篇',
    scene: 'tier1_clear',
    speaker: 'green',
    mood: 'happy',
    sfx: 'victory',
    tierClear: 'beginner',
    text: '恭喜小綠完成【🌱 初級：基本觀念與名詞 (33/100)】！\n按「下一頁」進入【⚡ 中級：各種投資方法與實際案例】！'
  },

  // =========================================================================
  // ⚡ 中級（第 34 ～ 66 幕）：投資的方法 — 定存、債券、股票、ETF、房地產、期貨/FX ＋ 實例
  // =========================================================================
  {
    tier: 'intermediate',
    chapter: '第 7 章｜認識投資武器庫：6 大工具',
    scene: 'mid_method_map',
    speaker: 'blue',
    mood: 'cool',
    text: '歡迎來到【⚡ 中級篇】！\n市場上的投資方法五花八門：定存、債券、股票、ETF、房地產、期貨／外匯……'
  },
  {
    tier: 'intermediate',
    chapter: '第 7 章｜方法 ① 銀行定存與現金',
    scene: 'mid_deposit_cash',
    speaker: 'blue',
    mood: 'calm',
    text: '【方法 ① 銀行定存】：把錢放銀行領約 1%～2% 利息。\n優點：幾乎零風險，最適合放「緊急備用金」；缺點：利息常跑輸通膨！'
  },
  {
    tier: 'intermediate',
    chapter: '第 8 章｜方法 ② 債券（借錢領利息）',
    scene: 'mid_bond_intro',
    speaker: 'yellow',
    mood: 'cool',
    text: '【方法 ② 債券】：就是「你當銀行，把錢借給國家或大企業」，\n約定好時間，對方定期付你利息、到期還你本金！'
  },
  {
    tier: 'intermediate',
    chapter: '第 8 章｜方法 ② 債券（借錢領利息）',
    scene: 'mid_bond_risk',
    speaker: 'yellow',
    mood: 'serious',
    sfx: 'hit',
    text: '債券實例對比：\n🛡️ 美國政府公債＝信用超高、波動小，適合當防守盾牌；\n💣 高息垃圾債＝快倒閉的公司開高利息借錢，倒債就血本無歸！'
  },
  {
    tier: 'intermediate',
    chapter: '第 8 章｜方法 ② 債券（借錢領利息）',
    scene: 'mid_bond_intro',
    speaker: 'green',
    mood: 'think',
    text: '原來債券也要看「借給誰」！\n信用越好的政府公債越安全，利息超高來路不明的債反而超危險！'
  },
  {
    tier: 'intermediate',
    chapter: '第 9 章｜方法 ③ 股票（買公司當股東）',
    scene: 'mid_single_stock_crash',
    speaker: 'red',
    mood: 'cry',
    sfx: 'hit',
    shake: true,
    text: '【方法 ③ 單一股票實例】：買股票＝成為公司股東，賺錢分紅、股價上漲！\n但我把全部身家只壓 1 家曾經最紅的手機廠，結果被淘汰暴跌 -90%……'
  },
  {
    tier: 'intermediate',
    chapter: '第 9 章｜方法 ③ 股票（台股實戰規則！）',
    scene: 'mid_t2_intro',
    speaker: 'yellow',
    mood: 'cool',
    text: '投資台股必懂實例【T+2 交割】：\n今天買進股票，兩天後早上 10 點才會從銀行扣款！'
  },
  {
    tier: 'intermediate',
    chapter: '第 9 章｜方法 ③ 股票（無本當沖慘案！）',
    scene: 'mid_daytrade_red',
    speaker: 'red',
    mood: 'excited',
    text: '哇！既然兩天後才扣錢，我戶頭只有 $1,000，\n是不是可以早上先買 100 萬、下午賣掉賺差價（無本當沖）？！'
  },
  {
    tier: 'intermediate',
    chapter: '第 9 章｜方法 ③ 股票（違約交割實例！）',
    scene: 'mid_limit_down',
    speaker: 'red',
    mood: 'cry',
    sfx: 'explosion',
    shake: true,
    text: '救命啊！！買完才 10 分鐘股價【跌停鎖死】根本賣不掉！\n兩天後扣不到 100 萬，我變成【違約交割】，帳戶凍結、信用全毀還要賠違約金！'
  },
  {
    tier: 'intermediate',
    chapter: '第 9 章｜方法 ③ 股票（除息實例！）',
    scene: 'mid_div_split',
    speaker: 'yellow',
    mood: 'serious',
    text: '股票另一個常見迷思叫【除息】：\n股價 $100 發給你 $5 股息，開盤股價馬上變成 $95（$95＋$5 還是 $100）！'
  },
  {
    tier: 'intermediate',
    chapter: '第 9 章｜方法 ③ 股票（填息才是真賺！）',
    scene: 'mid_div_fill',
    speaker: 'green',
    mood: 'think',
    text: '只有當股價後來漲回 $100（叫【填息】），才真正賺到那 $5！\n所以不能只看「配息高」，要看公司整體有沒有真的成長！'
  },
  {
    tier: 'intermediate',
    chapter: '第 10 章｜方法 ④ ETF（一籃子大禮包）',
    scene: 'mid_etf_basket',
    speaker: 'blue',
    mood: 'cool',
    text: '【方法 ④ 大盤 ETF】：最適合新手的方法！\n實例：買 1 份台灣 0050 或全球大盤 ETF，等於一次買進 50 家～數千家頂尖企業！'
  },
  {
    tier: 'intermediate',
    chapter: '第 10 章｜方法 ④ ETF（自動汰弱留強）',
    scene: 'mid_etf_auto_swap',
    speaker: 'yellow',
    mood: 'happy',
    text: '大盤 ETF 還會【自動汰弱留強】：\n哪家公司變弱就被踢出籃子，新崛起的強者自動補進來，不怕單壓踩雷！'
  },
  {
    tier: 'intermediate',
    chapter: '第 10 章｜方法 ④ ETF（定期定額微笑曲線）',
    scene: 'mid_smile_curve',
    speaker: 'green',
    mood: 'happy',
    sfx: 'shield',
    text: '搭配【定期定額】（每月固定買固定金額）：\n高價買少股、股災大跌打折時多撿便宜，長期走出漂亮的「微笑曲線」！'
  },
  {
    tier: 'intermediate',
    chapter: '第 10 章｜中級抉擇 ④',
    scene: 'choice_daytrade',
    speaker: 'red',
    mood: 'excited',
    text: '小綠別買什麼慢慢漲的 ETF 了！\n戶頭不用放錢，明天跟我一起「無本當沖」衝熱門飆股，一天賺 5 千！',
    choice: {
      prompt: '⚡ 中級抉擇 ④：選哪一種投資方法？',
      options: [
        {
          label: '🎲 沒錢也照買！挑戰無本當沖賺快錢',
          correct: false,
          gameoverScene: 'gameover_daytrade',
          gameoverTitle: '💀 GAME OVER — 跌停鎖死・違約交割！',
          gameoverText: '買進後股價突然跌停鎖死賣不掉！兩天後帳戶沒錢扣款，\n正式【違約交割】：信用破產、全市場封鎖，還背上巨額違約金！'
        },
        {
          label: '🧺 拒絕無本當沖！只用現有現金定期定額買大盤 ETF',
          correct: true,
          winText: '漂亮！絕不碰超出自己現金能力的交易，穩健才是王道！'
        }
      ]
    }
  },
  {
    tier: 'intermediate',
    chapter: '第 11 章｜方法 ⑤ 房地產與借貸實例（2008 次貸）',
    scene: 'subprime_tower',
    speaker: 'narrator',
    mood: 'serious',
    text: '【方法 ⑤ 房地產與抵押借貸】：房子金額龐大，常搭配貸款！\n實例 ①：2008 全球【次貸風暴】——銀行亂借房貸給還不起的人，還疊成 30 倍槓桿巨塔！'
  },
  {
    tier: 'intermediate',
    chapter: '第 11 章｜方法 ⑤ 房地產與借貸實例（2008 次貸）',
    scene: 'subprime_collapse',
    speaker: 'yellow',
    mood: 'shock',
    sfx: 'explosion',
    shake: true,
    text: '結果房價稍微下跌，大家繳不出房貸！\n底層抽掉一塊，整座 30 倍槓桿巨塔像災難電影一樣瞬間連鎖崩塌！'
  },
  {
    tier: 'intermediate',
    chapter: '第 11 章｜方法 ⑤ 房地產與借貸實例（雷曼破產）',
    scene: 'subprime_lehman',
    speaker: 'blue',
    mood: 'shock',
    sfx: 'hit',
    text: '連活了 158 年的超級大銀行（雷曼兄弟）都在幾天內宣布破產！\n全球股市腰斬一半，過度借貸的投資人全部一起陪葬！'
  },
  {
    tier: 'intermediate',
    chapter: '第 11 章｜方法 ⑤ 台灣實例「五貸同堂」',
    scene: 'five_loans_chains',
    speaker: 'narrator',
    mood: 'serious',
    text: '實例 ②：台灣這幾年真實發生的危險玩法——【五貸同堂】！\n一人同時背：房貸 ＋ 信貸 ＋ 車貸 ＋ 股票質押 ＋ 融資！'
  },
  {
    tier: 'intermediate',
    chapter: '第 11 章｜方法 ⑤ 台灣實例「五貸同堂」',
    scene: 'five_loans_greed',
    speaker: 'red',
    mood: 'excited',
    text: '把房子增貸、再辦信貸買股票、股票再質押借錢……\n股市一直漲的時候，看起來好像躺著變億萬富翁！'
  },
  {
    tier: 'intermediate',
    chapter: '第 11 章｜方法 ⑤ 台灣實例「五貸同堂」',
    scene: 'five_loans_meteor',
    speaker: 'yellow',
    mood: 'shock',
    sfx: 'explosion',
    shake: true,
    text: '只要遇到一次股災暴跌 -30%：股票被券商【強制斷頭賣光】，\n每個月 5 筆銀行貸款利息卻照樣催繳，現金流瞬間斷裂！'
  },
  {
    tier: 'intermediate',
    chapter: '第 11 章｜方法 ⑤ 台灣實例「五貸同堂」',
    scene: 'five_loans_auction',
    speaker: 'red',
    mood: 'cry',
    sfx: 'hit',
    text: '股票沒了、利息繳不出來，連住的房子都被貼上【法拍】封條……\n過度把房產跟股票綁在一起開五層槓桿，最後連家都沒了！'
  },
  {
    tier: 'intermediate',
    chapter: '第 11 章｜中級抉擇 ⑤',
    scene: 'choice_fiveloans',
    speaker: 'boss',
    mood: 'excited',
    text: '股市大跌剛好抄底啦！快去辦信貸＋股票質押「五貸同堂」，\n借越多賺越快，翻身就靠這一次！',
    choice: {
      prompt: '⚡ 中級抉擇 ⑤：面對五貸同堂抄底誘惑！',
      options: [
        {
          label: '💸 借信貸＋質押全力抄底！',
          correct: false,
          gameoverScene: 'gameover_fiveloans',
          gameoverTitle: '💀 GAME OVER — 五貸同堂法拍破產！',
          gameoverText: '股市沒有馬上反彈，反而再跌 25%！\n股票斷頭、5 筆銀行催繳單塞爆信箱，房產遭法拍破產……'
        },
        {
          label: '⚔️ 拒絕借錢！一刀斬斷五條債鍊！',
          correct: true,
          winText: '帥爆了！絕不把房子和借來的錢拿去股市冒險！'
        }
      ]
    }
  },
  {
    tier: 'intermediate',
    chapter: '第 12 章｜方法 ⑥ 期貨、選擇權、FX 與加密合約',
    scene: 'adv_derivatives_intro',
    speaker: 'narrator',
    mood: 'serious',
    text: '【方法 ⑥ 高槓桿衍生品】：期貨、選擇權、外匯保證金（FX）、加密貨幣合約！\n它們原本是企業用來「避險」的工具，但散戶拿來開高倍數賭博，9 成賠光！'
  },
  {
    tier: 'intermediate',
    chapter: '第 12 章｜方法 ⑥ 實例：期貨＆50 倍合約插針',
    scene: 'adv_50x_wick',
    speaker: 'red',
    mood: 'cry',
    sfx: 'explosion',
    shake: true,
    text: '實例：我開 50 倍期貨／加密合約，價格只往下抖了【2%（插針）】，\n我 0.5 秒直接強制爆倉歸零！一分鐘後漲回去也早跟我無關了！！'
  },
  {
    tier: 'intermediate',
    chapter: '第 12 章｜方法 ⑥ 實例：選擇權雙面陷阱',
    scene: 'adv_options_decay',
    speaker: 'yellow',
    mood: 'serious',
    text: '而「選擇權買方」有到期日，每天時間一過價值就融化歸零；\n「賣方」更恐怖——平常小賺零錢，遇到一次黑天鵝就賠到傾家蕩產！'
  },
  {
    tier: 'intermediate',
    chapter: '第 12 章｜方法 ⑥ 實例：《FX戰士久留美》名場面 ②',
    scene: 'kurumi_blind_follow',
    speaker: 'yellow',
    mood: 'shock',
    sfx: 'hit',
    text: '《FX戰士久留美》裡的「芽吹式爆倉」就是 FX 外匯保證金最慘實例：\n完全不懂原理只想抱大腿聽明牌，把獎學金＋刷卡借錢全砸進 25 倍 FX！'
  },
  {
    tier: 'intermediate',
    chapter: '第 12 章｜方法 ⑥ 實例：《FX戰士久留美》名場面 ②',
    scene: 'kurumi_betrayed',
    speaker: 'red',
    mood: 'cry',
    sfx: 'explosion',
    shake: true,
    text: '結果報明牌的人私下還做反方向！\n毫無章法又四處借錢加碼，瞬間強制平倉、血本無歸還背一身債！'
  },
  {
    tier: 'intermediate',
    chapter: '第 12 章｜中級抉擇 ⑥（久留美名場面！）',
    scene: 'kurumi_choice_margin',
    speaker: 'red',
    mood: 'shock',
    sfx: 'hit',
    text: '手機狂震！螢幕跳出【⚠️ FX 25倍保證金維持率 55%，即將強制平倉】！\n小紅哭著問：「要把最後的學費和借來的錢補進去硬凹等反彈嗎？！」',
    choice: {
      prompt: '⚡ 中級抉擇 ⑥：久留美經典瞬間！小綠怎麼選？',
      options: [
        {
          label: '🙏 祈禱漲回去！把學費＋借來的錢全補進保證金硬凹！',
          correct: false,
          gameoverScene: 'gameover_roscut',
          gameoverTitle: '💀 GAME OVER — 叮咚！強制平倉通知（ROSCUT）！',
          gameoverText: '「神啊拜託漲回去…」話沒說完匯率衝破防線！\n連最後補進去的學費和借來的錢，0.1 秒全部蒸發歸零！'
        },
        {
          label: '✂️ 立刻止血不補錢！絕不借錢凹單，遠離高槓桿 FX！',
          correct: true,
          winText: '保住人生了！高槓桿衍生品絕不能拿救命錢去硬凹！'
        }
      ]
    }
  },
  {
    tier: 'intermediate',
    chapter: '第 12 章｜中級抉擇 ⑦',
    scene: 'choice_50x_crypto',
    speaker: 'red',
    mood: 'excited',
    text: '網友貼圖炫耀開「50 倍期貨／加密合約」，10 分鐘就賺一台機車！\n小綠快點開單跟上，錯過就虧大了！',
    choice: {
      prompt: '⚡ 中級抉擇 ⑦：面對 50 倍合約炫耀圖！',
      options: [
        {
          label: '⚡ 怕錯過！立刻跟著開 50 倍合約！',
          correct: false,
          gameoverScene: 'gameover_50x',
          gameoverTitle: '💀 GAME OVER — 2% 插針瞬間爆倉！',
          gameoverText: '半夜市場正常波動往下晃了 2.1%，系統 0.5 秒強制清算！\n50 倍槓桿容不下任何正常波動，直接歸零！'
        },
        {
          label: '🧠 冷靜看穿！那是高槓桿賭場，絕不進場！',
          correct: true,
          winText: '超穩！買好公司 ETF 是正和遊戲，高倍數合約是負和賭場！'
        }
      ]
    }
  },
  {
    tier: 'intermediate',
    chapter: '第 12 章｜中級工具總整理',
    scene: 'adv_zero_sum',
    speaker: 'green',
    mood: 'cool',
    text: '工具等級一次分清楚：\n🛡️ 防守＝定存／高信用債券　｜　🌱 穩健成長＝大盤 ETF　｜　☠️ 遠離＝無本當沖／五貸同堂／高倍期貨 FX！'
  },
  {
    tier: 'intermediate',
    chapter: '第 12 章｜中級總複習',
    scene: 'mid_summary',
    speaker: 'blue',
    mood: 'happy',
    text: '搞懂各種投資工具的優缺點和血淚實例後，\n接下來進入【🏆 高級篇】：建立一輩子的長期規劃、現在的準備、心理建設與學習方向！'
  },
  {
    tier: 'intermediate',
    chapter: '⚡ 中級通關！解鎖 🏆 高級篇',
    scene: 'tier2_clear',
    speaker: 'green',
    mood: 'happy',
    sfx: 'victory',
    tierClear: 'intermediate',
    text: '恭喜小綠完成【⚡ 中級：各種投資方法實例 (66/100)】！\n按「下一頁」前進最終殿堂【🏆 高級：長期規劃、準備與心理建設】！'
  },

  // =========================================================================
  // 🏆 高級（第 67 ～ 100 幕）：長期規劃、現在的準備、心理建設與未來學習方向
  // =========================================================================
  {
    tier: 'advanced',
    chapter: '第 13 章｜長期規劃：資產配置與再平衡',
    scene: 'adv_rpg_team',
    speaker: 'blue',
    mood: 'cool',
    text: '歡迎進入【🏆 高級篇】！\n真正的長期投資規劃就像組 RPG 隊伍：不能只帶全攻擊手，一定要有坦克跟補師！'
  },
  {
    tier: 'advanced',
    chapter: '第 13 章｜長期規劃：資產配置與再平衡',
    scene: 'adv_stock_bond',
    speaker: 'yellow',
    mood: 'serious',
    text: '這就叫【資產配置】：\n⚔️ 股票大盤 ETF 負責長期進攻長大 ＋ 🛡️ 現金／安全公債負責防守穩住心情！'
  },
  {
    tier: 'advanced',
    chapter: '第 13 章｜長期規劃：資產配置與再平衡',
    scene: 'adv_rebalance',
    speaker: 'yellow',
    mood: 'cool',
    text: '每年固定做一次【再平衡】：\n股市漲太高時，賣一點獲利放回防守；股市大跌時，拿防守錢逢低買股票！'
  },
  {
    tier: 'advanced',
    chapter: '第 13 章｜長期規劃：資產配置與再平衡',
    scene: 'adv_rebalance_win',
    speaker: 'green',
    mood: 'happy',
    text: '不用預測明天漲跌，光靠紀律再平衡，\n系統就能自動幫我做到【高賣、低買】！'
  },
  {
    tier: 'advanced',
    chapter: '第 13 章｜長期規劃：人生不同階段',
    scene: 'adv_age_ratio',
    speaker: 'blue',
    mood: 'calm',
    text: '長期規劃要隨年齡調整：\n年輕有時間可多放穩健大盤 ETF；越接近退休，安全現金與債券比例要越高！'
  },
  {
    tier: 'advanced',
    chapter: '第 13 章｜長期規劃：避開手續費黑洞',
    scene: 'adv_fee_hole',
    speaker: 'red',
    mood: 'cry',
    sfx: 'hit',
    text: '奇怪？我今年明明有賺有賠打平，怎麼帳戶裡的錢還是少了一大截？'
  },
  {
    tier: 'advanced',
    chapter: '第 13 章｜長期規劃：避開手續費黑洞',
    scene: 'adv_fee_explain',
    speaker: 'yellow',
    mood: 'serious',
    text: '因為每次買賣都要付【手續費＋交易稅】！\n一年殺進殺出 200 次，獲利全被交易成本吃光，都在幫券商打工！'
  },
  {
    tier: 'advanced',
    chapter: '第 13 章｜長期規劃：龜兔賽跑哲學',
    scene: 'adv_low_cost',
    speaker: 'blue',
    mood: 'cool',
    text: '長期贏家的必殺技反而是「穩健少動」：\n挑選【低管理費的大盤 ETF】＋【長期持有、少進出】，把每一塊錢留給複利！'
  },
  {
    tier: 'advanced',
    chapter: '第 14 章｜現在（16 歲）可以做的 4 項準備',
    scene: 'adv_prep_budget',
    speaker: 'green',
    mood: 'happy',
    text: '【現在的準備 ① 練習分帳與記帳】：\n拿到零用錢或壓歲錢，先分成「生活需要 / 緊急備用 / 未來儲蓄 / 娛樂」四份！'
  },
  {
    tier: 'advanced',
    chapter: '第 14 章｜現在（16 歲）可以做的 4 項準備',
    scene: 'adv_prep_shield',
    speaker: 'blue',
    mood: 'cool',
    sfx: 'shield',
    text: '【現在的準備 ② 存下第一筆緊急備用金】：\n永遠先留好急用現金當安全 HP，絕不把生活費或急用錢丟進市場！'
  },
  {
    tier: 'advanced',
    chapter: '第 14 章｜現在（16 歲）可以做的 4 項準備',
    scene: 'adv_prep_parents',
    speaker: 'yellow',
    mood: 'happy',
    text: '【現在的準備 ③ 找爸媽討論＋紙上觀察練習】：\n16 歲可以先用紙上記錄觀察大盤起伏，也能和爸媽一起討論開戶體驗！'
  },
  {
    tier: 'advanced',
    chapter: '第 14 章｜現在（16 歲）可以做的 4 項準備',
    scene: 'adv_invest_self',
    speaker: 'green',
    mood: 'happy',
    text: '【現在的準備 ④ 投資自己的健康與專長】：\n16 歲回報率最高的資產其實是「你自己」！把本事練強，未來本金才多！'
  },
  {
    tier: 'advanced',
    chapter: '第 14 章｜16 歲 ➔ 18 歲 ➔ 30 歲藍圖',
    scene: 'adv_roadmap_16',
    speaker: 'blue',
    mood: 'calm',
    text: '【16～17 歲】：練觀念、學分帳、養好專長、和爸媽討論理財；\n【18 歲以後】：存滿 6 個月緊急備用金 ➔ 開始閒錢定期定額大盤 ETF！'
  },
  {
    tier: 'advanced',
    chapter: '第 15 章｜心理建設 ①：久留美名場面 ③ 心魔警告',
    scene: 'kurumi_revenge_trade',
    speaker: 'yellow',
    mood: 'shock',
    sfx: 'hit',
    text: '【心理建設最重要的一課】！《FX戰士久留美》裡最可怕的心魔叫【報復性交易】：\n滿腦子想著「把虧掉的錢一口氣贏回來」，結果越賭越大、越輸越慘！'
  },
  {
    tier: 'advanced',
    chapter: '第 15 章｜心理建設 ①：半夜盯盤失眠地獄',
    scene: 'kurumi_3am_chart',
    speaker: 'red',
    mood: 'cry',
    text: '半夜 03:00 還在死盯手機 K 線、心跳狂飆 140、吃不下睡不著……\n就算暫時沒爆倉，焦慮也會把你的健康、課業和快樂全部榨乾！'
  },
  {
    tier: 'advanced',
    chapter: '第 15 章｜心理建設 ①：睡得著覺才是好投資',
    scene: 'kurumi_peace_sleep',
    speaker: 'green',
    mood: 'happy',
    sfx: 'shield',
    text: '《FX戰士久留美》經典名言：「沒有未實現虧損焦慮的感覺超爽！」\n記住自我檢測：【如果一筆投資讓你晚上睡不著，就代表買太大或開槓桿了！】'
  },
  {
    tier: 'advanced',
    chapter: '第 15 章｜心理建設 ②：大腦的 3 大投資陷阱',
    scene: 'adv_fomo_cliff',
    speaker: 'red',
    mood: 'shock',
    sfx: 'hit',
    text: '心理陷阱 ①【FOMO 錯失恐懼症】：看到大家都在狂買飆股怕沒賺到，\n忍不住衝進去，結果剛好買在最高點當「最後一棒韭菜」！'
  },
  {
    tier: 'advanced',
    chapter: '第 15 章｜心理建設 ②：大腦的 3 大投資陷阱',
    scene: 'adv_sunk_cost',
    speaker: 'yellow',
    mood: 'serious',
    text: '心理陷阱 ②【沉沒成本不甘心】：買到爛公司已經大虧，\n不肯認錯還一直加碼攤平想凹回來，最後越陷越深！'
  },
  {
    tier: 'advanced',
    chapter: '第 15 章｜心理建設 ②：大腦的 3 大投資陷阱',
    scene: 'adv_survivor_iceberg',
    speaker: 'blue',
    mood: 'serious',
    text: '心理陷阱 ③【倖存者偏差】：網路上你只看得到 1 個炫富成功的少年股神，\n卻看不到水面下 999 個默默爆倉破產、不敢發文的人！'
  },
  {
    tier: 'advanced',
    chapter: '第 15 章｜心理建設 ②：冷靜 10 分鐘法則',
    scene: 'adv_brain_shield',
    speaker: 'green',
    mood: 'calm',
    text: '覺得「再不買就來不及」或「好想馬上翻本」時，\n立刻放下手機深呼吸離開 10 分鐘，就能躲開 90% 的衝動悲劇！'
  },
  {
    tier: 'advanced',
    chapter: '第 16 章｜心理建設 ③：台灣反詐騙鋼鐵防線',
    scene: 'mid_scam_ad',
    speaker: 'boss',
    mood: 'excited',
    text: '心態一貪心，就最容易掉進【假投資詐騙】！\n滑手機看到「名人免費送飆股、加 LINE 領內部名額」，全是陷阱起手式！'
  },
  {
    tier: 'advanced',
    chapter: '第 16 章｜心理建設 ③：台灣反詐騙鋼鐵防線',
    scene: 'mid_scam_actors',
    speaker: 'yellow',
    mood: 'shock',
    sfx: 'hit',
    text: '50 人的 LINE 飆股群裡大家狂曬賺錢單……\n真相是：【裡面 49 個都是詐騙集團演的暗樁】，只有 1 個肥羊就是你！'
  },
  {
    tier: 'advanced',
    chapter: '第 16 章｜心理建設 ③：假券商 APP 與 165',
    scene: 'mid_scam_165',
    speaker: 'green',
    mood: 'cool',
    text: '防詐鐵則：【不加陌生老師群、不下載不明投資 APP、絕不匯款解凍金】！\n有懷疑立刻問爸媽，或直接撥打【165 反詐騙專線】！'
  },
  {
    tier: 'advanced',
    chapter: '第 16 章｜高級抉擇 ⑧',
    scene: 'choice_scam_app',
    speaker: 'boss',
    mood: 'excited',
    text: '恭喜你在專屬 APP 帳面賺了 50 萬！\n只要現在再匯 5 萬元「解凍手續費」，馬上就能把 50 萬領出來喔！',
    choice: {
      prompt: '🏆 高級抉擇 ⑧：對方叫你先匯解凍費！',
      options: [
        {
          label: '💸 為了領回 50 萬，趕快匯 5 萬給他！',
          correct: false,
          gameoverScene: 'gameover_scam',
          gameoverTitle: '💀 GAME OVER — 掉進假 APP 詐騙黑洞！',
          gameoverText: '那 50 萬從頭到尾只是假數字！匯出 5 萬後對方立刻人間蒸發，\n合法券商絕不會叫你匯「解凍金」才能領錢！'
        },
        {
          label: '🚨 100% 詐騙！立刻截圖封鎖、告知爸媽並打 165！',
          correct: true,
          winText: '防詐滿分！！任何要求先匯保證金／解凍金的都是詐騙！'
        }
      ]
    }
  },
  {
    tier: 'advanced',
    chapter: '第 17 章｜未來學習方向：防地雷 3 紅綠燈',
    scene: 'adv_checkup_intro',
    speaker: 'yellow',
    mood: 'cool',
    text: '最後來看看【未來的學習方向】！\n長大後想更進一步研究公司，先學會這 3 顆防地雷紅綠燈：'
  },
  {
    tier: 'advanced',
    chapter: '第 17 章｜未來學習方向：防地雷 3 紅綠燈',
    scene: 'adv_light_cash',
    speaker: 'yellow',
    mood: 'serious',
    text: '🚦 ①【有沒有真的賺現金？】只會吹牛畫大餅、連年大虧 ➔ 🔴 紅燈！\n🚦 ②【負債會不會高到窒息？】借太多債景氣差就倒閉 ➔ 🔴 紅燈！'
  },
  {
    tier: 'advanced',
    chapter: '第 17 章｜未來學習方向：防地雷 3 紅綠燈',
    scene: 'adv_light_moat',
    speaker: 'green',
    mood: 'happy',
    text: '🚦 ③【有沒有強大護城河？】\n大家每天都離不開、競爭對手很難取代的企業 ➔ 🟢 綠燈！'
  },
  {
    tier: 'advanced',
    chapter: '第 17 章｜高級抉擇 ⑨',
    scene: 'choice_landmine',
    speaker: 'boss',
    mood: 'excited',
    text: '這家神秘科技股連虧 6 年、負債超高，但網紅說它明年會變下一個輝達！\n快把全部資產歐印下去吧！',
    choice: {
      prompt: '🏆 高級抉擇 ⑨：用 3 顆紅綠燈體檢這支股票！',
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
          winText: '火眼金睛！不盲從網紅吹牛，靠體檢穩穩避開地雷股！'
        }
      ]
    }
  },
  {
    tier: 'advanced',
    chapter: '第 18 章｜未來學習方向：下一步怎麼變強？',
    scene: 'adv_learn_path',
    speaker: 'blue',
    mood: 'cool',
    text: '想持續進修？推薦 4 個超棒的學習方向：\n① 看懂 ETF 成分股與費用率　② 練習看基本財報（營收、現金流、負債）！'
  },
  {
    tier: 'advanced',
    chapter: '第 18 章｜未來學習方向：下一步怎麼變強？',
    scene: 'adv_learn_path',
    speaker: 'yellow',
    mood: 'happy',
    text: '③ 認識總體經濟（利率、通膨、景氣循環）\n④ 讀經典指數投資與行為財務學好書，建立屬於自己的投資紀律！'
  },
  {
    tier: 'advanced',
    chapter: '第 18 章｜長期紀律：龜兔賽跑贏到最後',
    scene: 'adv_buffett_turtle',
    speaker: 'green',
    mood: 'happy',
    text: '原來投資不是比誰今天跑最快，而是比誰【撐得最久、永遠不出局】！\n做好長期規劃、練好心態、持續學習，時間就是最強隊友！'
  },
  {
    tier: 'advanced',
    chapter: '第 19 章｜終極決戰前夕',
    scene: 'adv_team_ready',
    speaker: 'green',
    mood: 'cool',
    sfx: 'shield',
    text: '小藍、小黃，我們走！\n帶著【初級觀念 × 中級工具 × 高級規劃與心態】，迎戰最後的破產大魔王！'
  },
  {
    tier: 'advanced',
    chapter: '第 19 章｜最終總決戰 ⑩',
    scene: 'choice_final_boss',
    speaker: 'boss',
    mood: 'excited',
    sfx: 'hit',
    shake: true,
    text: '我是「高槓桿 × 假老師 × 五貸同堂」終極破產大魔王！！\n放棄長期規劃吧，跟我簽下借錢 50 倍合約，今晚就變億萬富翁！',
    choice: {
      prompt: '👑 最終 BOSS 決戰 ⑩！小綠使出必殺技：',
      options: [
        {
          label: '💀 接受誘惑：借錢開 50 倍合約＋押光全部家當',
          correct: false,
          gameoverScene: 'gameover_boss',
          gameoverTitle: '💀 GAME OVER — 被終極破產魔王吞噬！',
          gameoverText: '只要一念貪心碰了高槓桿與借貸，前面累積的一切都可能一夕歸零！\n快重新選擇，拿出你的長期紀律聖劍！'
        },
        {
          label: '💚 必殺技：不借錢 × 備用金 × 資產配置 × 長期穩健投資！',
          correct: true,
          winText: '轟隆！！長期規劃黃金護盾一擊擊碎大魔王！！小綠完勝全場！！'
        }
      ]
    }
  },
  {
    tier: 'advanced',
    chapter: '👑 GRAND TRUE ENDING｜投資大作戰全破！',
    scene: 'grand_ending',
    speaker: 'green',
    mood: 'happy',
    sfx: 'victory',
    tierClear: 'advanced',
    isEnding: true,
    text: '恭喜小綠全破【初級・中級・高級】全部 100 幕修練！！\n記住一輩子的超能力：懂風險、不開槓桿、做好長期規劃與心理建設，慢慢變富！'
  }
];
