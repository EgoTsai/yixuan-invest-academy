/* ============================================================
   data.js — 易軒 16 歲投資片場：漫畫情境跑馬燈 + 6 大關卡資料
   原則：無語音朗讀、極少文字、漫畫分鏡情境＋超大圖示秒懂
   ============================================================ */

export const HOME_COMIC_SCENARIOS = [
  {
    world: 'desktop',
    tag: '🔥 桌面大戰',
    avatar: '🔥 阿火',
    scene: '🧋$50 ➔ 👾吃錢 ➔ 🧋$90',
    bubble: '「錢放抽屜不動，買珍奶越買越少！」',
    outcome: '💡 投資打贏物價',
    tone: 'gold'
  },
  {
    world: 'drone',
    tag: '🤖 無機殺手',
    avatar: '🤖 小鐵',
    scene: '👦16歲 ➔ ❄️雪球 ➔ 🚀超大！',
    bubble: '「16 歲就啟動，複利滾成巨無霸！」',
    outcome: '⚡ 時間＝最強外掛',
    tone: 'cyan'
  },
  {
    world: 'circus',
    tag: '🎪 奇幻馬戲團',
    avatar: '🎪 波波',
    scene: '🥚1家倒了 💀 vs 🎪500家 🛡️',
    bubble: '「別只頂 1 顆球！ETF 有安全網！」',
    outcome: '✅ 分散風險最穩',
    tone: 'emerald'
  },
  {
    world: 'disaster',
    tag: '🌋 災難特效',
    avatar: '🛡️ 隊長',
    scene: '☄️大跌-40% ➔ 🛡️抱緊 ➔ 📈新高',
    bubble: '「股災像打折特賣，千萬別嚇跑亂賣！」',
    outcome: '🛡️ 雨過一定天晴',
    tone: 'cyan'
  },
  {
    world: 'desktop',
    tag: '⚡ 防詐斬擊',
    avatar: '🔥 阿火',
    scene: '📱加老師賺10倍 ➔ ⚔️砍爆！',
    bubble: '「保證穩賺不賠？100% 是大騙子！」',
    outcome: '🚨 立刻封鎖不匯款',
    tone: 'crimson'
  },
  {
    world: 'drone',
    tag: '🛡️ 閒錢原則',
    avatar: '🤖 小鐵',
    scene: '🍱吃飯錢 🚫 ｜ 🪙多餘閒錢 ✅',
    bubble: '「吃飯錢不能拿去賭，只用閒錢投資！」',
    outcome: '✅ 心情穩才抱得住',
    tone: 'emerald'
  },
  {
    world: 'circus',
    tag: '🎪 拒絕借錢',
    avatar: '🎪 波波',
    scene: '💳借錢全押 ➔ 📉大跌 ➔ 💥爆掉',
    bubble: '「借錢投資遇到大跌，會直接墜機！」',
    outcome: '❌ 絕對不借錢投資',
    tone: 'crimson'
  },
  {
    world: 'disaster',
    tag: '🌋 定期定額',
    avatar: '🛡️ 隊長',
    scene: '📅每月固定買 ➔ 🏷️大跌撿便宜',
    bubble: '「不用猜明天漲跌，每月固定存 ETF！」',
    outcome: '⚡ 懶人最強必殺技',
    tone: 'gold'
  },
  {
    world: 'drone',
    tag: '🚀 16歲開戶',
    avatar: '🤖 小鐵',
    scene: '👦16歲 ＋ 👨‍👩‍👦爸媽 ➔ 🏦安全開戶',
    bubble: '「滿 18 歲前，找爸媽一起討論開戶！」',
    outcome: '🤝 安全合法最放心',
    tone: 'cyan'
  },
  {
    world: 'desktop',
    tag: '🌟 最強資產',
    avatar: '🔥 阿火',
    scene: '😴睡飽 ＋ 🧠學技能 ➔ 💯無敵',
    bubble: '「16 歲投資自己，回報率比股票還高！」',
    outcome: '🏆 健康＋本事第一名',
    tone: 'emerald'
  }
];

export const CHAPTERS = [
  {
    id: 'inflation',
    num: 1,
    worldBadge: '🔥 桌面大戰',
    title: '為什麼要投資？',
    hook: '打敗吃錢的「通膨怪獸」👾',
    image: 'assets/world_desktop_battle.jpg',
    badgeIcon: '⚔️',
    badgeName: '桌面屠龍勳章',
    sceneType: 'desktop_inflation',
    shortPrompt: '點按鈕！看 20 年後紙鈔怎麼了 👇',
    defaultReaction: {
      avatar: '🔥 阿火',
      line: '點下面按鈕，看看錢放抽屜 20 年會怎樣！',
      tone: 'gold'
    },
    comics: [
      {
        step: '漫畫① 16歲今天',
        avatar: '🔥 阿火',
        scene: '💵 $100 ＝ 🧋🧋',
        bubble: '「我有 100 元，可以買 2 杯珍奶！」',
        outcome: '📍 物價還沒漲',
        tone: 'gold'
      },
      {
        step: '漫畫② 怪獸來襲',
        avatar: '👾 通膨怪獸',
        scene: '🔥 珍奶 $50 ➔ $150！',
        bubble: '「哈哈！每年東西都變貴一點！」',
        outcome: '⚠️ 現金偷偷縮水',
        tone: 'crimson'
      },
      {
        step: '漫畫③ 放抽屜不動',
        avatar: '😭 阿火',
        scene: '🛏️ 藏20年 ➔ 🧋剩半杯',
        bubble: '「紙鈔還是 100，卻買不到 1 杯了！」',
        outcome: '❌ 只存現金會變小',
        tone: 'crimson'
      },
      {
        step: '漫畫④ 投資大反擊',
        avatar: '⚡ 劍士阿火',
        scene: '🏭 好公司 ➔ 💵$380 ➔ 🧋🧋🧋🧋',
        bubble: '「讓錢去上班，變出 4 杯珍奶！」',
        outcome: '✅ 投資打贏通膨',
        tone: 'emerald'
      }
    ],
    takeaway: '💤 錢放抽屜＝越變越小 ｜ ⚡ 投資＝讓錢長大打贏物價',
    quiz: [
      {
        icon: '🧋',
        question: '物價變貴，原本能買 2 杯珍奶的錢，20 年後會怎樣？',
        options: [
          { icon: '📉', label: '買不到 1 杯', correct: true },
          { icon: '🧋🧋🧋', label: '自動變 5 杯', correct: false },
          { icon: '🧊', label: '永遠不變', correct: false }
        ],
        goodMsg: '答對！物價變貴，現金放著會縮水！',
        badMsg: '再想想！通膨怪獸會讓東西變貴喔！'
      },
      {
        icon: '⚔️',
        question: '打敗「通膨怪獸」最好的武器是？',
        options: [
          { icon: '🛏️', label: '現金藏枕頭下', correct: false },
          { icon: '🏭', label: '投資好公司一起長大', correct: true },
          { icon: '🛍️', label: '今天全部花光光', correct: false }
        ],
        goodMsg: '超讚！讓錢去買好公司，幫你賺錢！',
        badMsg: '藏起來會縮水，花光就沒錢囉，試試另一個！'
      },
      {
        icon: '🪙',
        question: '「投資」真正的意思是？',
        options: [
          { icon: '🎰', label: '猜大小賭運氣', correct: false },
          { icon: '🌱', label: '讓錢去工作慢慢長大', correct: true },
          { icon: '💸', label: '借錢買最新手機', correct: false }
        ],
        goodMsg: '滿分！投資就像種樹，讓錢幫你工作！',
        badMsg: '投資不是賭博也不是花錢，再選一次！'
      }
    ]
  },
  {
    id: 'compound',
    num: 2,
    worldBadge: '🤖 無機殺手核心',
    title: '16 歲的超能力',
    hook: '「複利反應爐」錢滾錢越滾越大 ⚡',
    image: 'assets/world_cyber_drone.jpg',
    badgeIcon: '⚛️',
    badgeName: '複利核心勳章',
    sceneType: 'drone_compound',
    shortPrompt: '拉動年齡滑桿！看 16 歲啟動有多猛 👇',
    defaultReaction: {
      avatar: '🤖 小鐵',
      line: '拉動年齡滑桿，看 16 歲雪球怎麼碾壓 36 歲！',
      tone: 'cyan'
    },
    comics: [
      {
        step: '漫畫① 什麼是複利',
        avatar: '🤖 小鐵',
        scene: '🪙生🪙 ➔ 🪙🪙再生🪙🪙🪙🪙',
        bubble: '「賺到的錢不花掉，繼續幫你生錢！」',
        outcome: '⚛️ 錢生錢反應爐',
        tone: 'gold'
      },
      {
        step: '漫畫② 16歲啟動',
        avatar: '👦 16歲易軒',
        scene: '📅每月$1,000 ➔ 滾 44 年',
        bubble: '「我才 16 歲，雪道超級長！」',
        outcome: '🏆 60歲衝上 $342萬',
        tone: 'emerald'
      },
      {
        step: '漫畫③ 36歲才開始',
        avatar: '👨 晚20年大叔',
        scene: '📅每月$1,000 ➔ 只滾 24 年',
        bubble: '「糟了！我才滾到 $75 萬！」',
        outcome: '📉 少滾 20 年差超多',
        tone: 'crimson'
      },
      {
        step: '漫畫④ 投雙倍也追不上',
        avatar: '🤖 小鐵驚呆',
        scene: '🔵雙倍$2,000($150萬) ＜ 🟡16歲($342萬)',
        bubble: '「早點開始，比有錢還猛！」',
        outcome: '⏳ 時間就是最強超能力',
        tone: 'cyan'
      }
    ],
    takeaway: '⏳ 16 歲開始，時間幫你錢滾錢，晚開始追都追不上！',
    quiz: [
      {
        icon: '❄️',
        question: '什麼是「複利」？',
        options: [
          { icon: '⚡', label: '賺到的錢，繼續幫你生錢', correct: true },
          { icon: '✂️', label: '每天把錢花掉一半', correct: false },
          { icon: '📦', label: '把錢鎖進保險箱', correct: false }
        ],
        goodMsg: '神準！利滾利就像超級雪球！',
        badMsg: '複利是「錢生錢，生出來的錢再生錢」喔！'
      },
      {
        icon: '🏆',
        question: '每個月都投一樣的錢，誰到 60 歲錢最多？',
        options: [
          { icon: '👦', label: '16 歲就開始的易軒', correct: true },
          { icon: '👨', label: '40 歲才開始的大叔', correct: false },
          { icon: '👴', label: '55 歲才開始的阿伯', correct: false }
        ],
        goodMsg: '沒錯！越早啟動，反應爐威力越炸裂！',
        badMsg: '時間越長，雪球滾越大！選年紀最早的！'
      },
      {
        icon: '🚀',
        question: '複利反應爐最需要的燃料是什麼？',
        options: [
          { icon: '⏳', label: '時間 ＋ 耐心等待', correct: true },
          { icon: '😡', label: '每天緊張盯盤', correct: false },
          { icon: '🎲', label: '一夜暴富的運氣', correct: false }
        ],
        goodMsg: '完全正確！時間和耐心就是最強外掛！',
        badMsg: '複利需要慢慢滾大，選跟「時間」有關的！'
      }
    ]
  },
  {
    id: 'etf',
    num: 3,
    worldBadge: '🎪 奇幻馬戲團',
    title: '別只頂一顆球！',
    hook: 'ETF 500 家大禮包＋安全網 🕸️',
    image: 'assets/world_digital_circus.jpg',
    badgeIcon: '🎪',
    badgeName: '馬戲團安全網勳章',
    sceneType: 'circus_etf',
    shortPrompt: '切換模式再按「💥 觸發意外」看看差別 👇',
    defaultReaction: {
      avatar: '🎪 波波',
      line: '先選模式 A 或 B，再按紅色意外按鈕看看！',
      tone: 'gold'
    },
    comics: [
      {
        step: '漫畫① 全押 1 家公司',
        avatar: '🥚 冒險波波',
        scene: '💰$10,000 ➔ 只買 1 顆球',
        bubble: '「這家公司超紅，我全部壓它！」',
        outcome: '⚠️ 沒有安全網！',
        tone: 'gold'
      },
      {
        step: '漫畫② 突然倒閉！',
        avatar: '💥 閃電來襲',
        scene: '⚡ 劈中 ➔ 玻璃球碎光 ➔ $0',
        bubble: '「碰！！公司出事，錢全沒了！」',
        outcome: '💀 全軍覆沒超痛',
        tone: 'crimson'
      },
      {
        step: '漫畫③ 換買 ETF 大禮包',
        avatar: '🎪 聰明波波',
        scene: '💻🍔🎮🏥⚡🚗 一次買 500 家！',
        bubble: '「一包買進全世界頂尖好公司！」',
        outcome: '🕸️ 張開安全網',
        tone: 'cyan'
      },
      {
        step: '漫畫④ 1 家倒也不怕',
        avatar: '🛡️ 安全過關',
        scene: '💥1家爆掉 ➔ 其他 499 家撐住！',
        bubble: '「其他球照飛！資產穩穩繼續漲！」',
        outcome: '✅ 分散風險大勝利',
        tone: 'emerald'
      }
    ],
    takeaway: '🥚 別把蛋全放一個籃子 ｜ 🎪 ETF 一次買很多好公司更穩！',
    quiz: [
      {
        icon: '💥',
        question: '把所有錢只買 1 家公司，萬一它倒閉會怎樣？',
        options: [
          { icon: '💀', label: '錢可能瞬間歸零', correct: true },
          { icon: '🎁', label: '政府會送你雙倍錢', correct: false },
          { icon: '🎈', label: '完全沒有影響', correct: false }
        ],
        goodMsg: '答對！全押一家風險太大啦！',
        badMsg: '想想剛才單顆玻璃球破掉的動畫！再選一次！'
      },
      {
        icon: '🎪',
        question: '買「大盤 ETF」最像下面哪一種？',
        options: [
          { icon: '🎟️', label: '只買 1 張刮刮樂', correct: false },
          { icon: '🍱', label: '一次買進 500 家好公司大禮包', correct: true },
          { icon: '💎', label: '只買 1 顆超貴糖果', correct: false }
        ],
        goodMsg: '超懂！ETF 就是超強分散大禮包！',
        badMsg: 'ETF 就像一次擁有很多顆發光球的大禮包喔！'
      },
      {
        icon: '🕸️',
        question: 'ETF 裡面如果有 1 家公司表現不好，會怎樣？',
        options: [
          { icon: '🔥', label: '全部錢立刻蒸發', correct: false },
          { icon: '🛡️', label: '其他好公司會撐住大局', correct: true },
          { icon: '🚫', label: '馬戲團永遠關門', correct: false }
        ],
        goodMsg: '正解！這就是分散風險的安全網！',
        badMsg: '還有好多其他好公司一起撐住喔，再試一次！'
      }
    ]
  },
  {
    id: 'crash',
    num: 4,
    worldBadge: '🌋 災難電影特效',
    title: '股災來了別嚇跑！',
    hook: '流星＋火山暴跌時，開護盾抱緊 🛡️',
    image: 'assets/world_disaster_vfx.jpg',
    badgeIcon: '🛡️',
    badgeName: '末日鋼鐵護盾勳章',
    sceneType: 'disaster_crash',
    shortPrompt: '按「🎬 啟動航行」體驗超炸裂股災特效！',
    defaultReaction: {
      avatar: '🛡️ 隊長',
      line: '點「🎬 啟動 15 年災難大片」，小心隕石股災！',
      tone: 'gold'
    },
    comics: [
      {
        step: '漫畫① 隕石股災爆發',
        avatar: '☄️ 紅色警報',
        scene: '🌋🌊 股市瞬間暴跌 -40%！',
        bubble: '「哇！螢幕一片紅，新聞都在喊崩盤！」',
        outcome: '🚨 心跳加速時刻',
        tone: 'crimson'
      },
      {
        step: '漫畫② 恐慌亂賣悲劇',
        avatar: '😱 路人甲',
        scene: '💸 最低點賣掉 ➔ 真的虧 -$4,200',
        bubble: '「嚇死我快跑！結果後面漲回來都沒賺！」',
        outcome: '❌ 亂賣＝鎖定虧損',
        tone: 'crimson'
      },
      {
        step: '漫畫③ 開護盾撿便宜',
        avatar: '🛡️ 防災易軒',
        scene: '🛡️ 抱緊 ETF ＋ 🏷️ 打六折繼續買',
        bubble: '「好東西大特價，剛好撿便宜！」',
        outcome: '⚡ 冷靜就是贏家',
        tone: 'cyan'
      },
      {
        step: '漫畫④ 雨過天晴創新高',
        avatar: '🚀 大獲全勝',
        scene: '☀️ 風暴散去 ➔ $10,000 變 $26,500',
        bubble: '「熬過災難，飛船直接衝破天際！」',
        outcome: '🏆 長期持有大勝',
        tone: 'emerald'
      }
    ],
    takeaway: '🌋 大跌像打折特賣 ｜ 🛡️ 抱緊好 ETF＋定期定額，雨後創新高！',
    quiz: [
      {
        icon: '☄️',
        question: '股市大跌 30%，像隕石撞下來時，應該怎麼做？',
        options: [
          { icon: '😱', label: '嚇死了！馬上全部賣掉', correct: false },
          { icon: '🛡️', label: '冷靜抱緊好 ETF，等雨過天晴', correct: true },
          { icon: '💳', label: '刷爆卡去賭一把', correct: false }
        ],
        goodMsg: '鋼鐵心態！大跌時亂賣才會真的虧錢！',
        badMsg: '回想剛才開護盾撐過去的結局！再選一次！'
      },
      {
        icon: '🛒',
        question: '好 ETF 遇到股災變便宜了，定期定額繼續買代表？',
        options: [
          { icon: '🏷️', label: '剛好趁大特價多撿便宜', correct: true },
          { icon: '💣', label: '世界明天就要毀滅', correct: false },
          { icon: '🗑️', label: '買到垃圾沒救了', correct: false }
        ],
        goodMsg: '聰明！就像喜歡的東西打七折一樣划算！',
        badMsg: '好東西變便宜其實是打折特賣喔！再試一次！'
      },
      {
        icon: '📈',
        question: '歷史上每一次大股災過去之後，大盤長期都怎麼走？',
        options: [
          { icon: '🕳️', label: '永遠掉到 0 元', correct: false },
          { icon: '🚀', label: '慢慢修復，甚至漲得更高', correct: true },
          { icon: '⏸️', label: '卡住一動也不動', correct: false }
        ],
        goodMsg: '太神啦！長期向上是投資人的最強靠山！',
        badMsg: '人類和好公司會持續進步，市場長期會修復創新高喔！'
      }
    ]
  },
  {
    id: 'scam',
    num: 5,
    worldBadge: '⚡ 桌面大戰 II',
    title: '砍爆詐騙大魔王！',
    hook: '「穩賺不賠、保證翻倍」全是騙子 🚨',
    image: 'assets/world_desktop_battle.jpg',
    badgeIcon: '🚨',
    badgeName: '防詐雷射劍勳章',
    sceneType: 'desktop_scam',
    shortPrompt: '點「🔴 紅旗詐騙窗」砍爆它！別砍「🟢 綠色好觀念」👇',
    defaultReaction: {
      avatar: '🔥 阿火',
      line: '快點紅色詐騙視窗砍爆 6 個！綠色的不要砍喔！',
      tone: 'crimson'
    },
    comics: [
      {
        step: '漫畫① 假老師廣告',
        avatar: '🤡 詐騙魔王',
        scene: '📱「免費加 LINE！3天賺10倍！」',
        bubble: '「信我啦，穩賺不賠快匯款！」',
        outcome: '🚨 100% 詐騙陷阱',
        tone: 'crimson'
      },
      {
        step: '漫畫② 拆穿謊言',
        avatar: '🔥 阿火',
        scene: '🤔 真這麼好賺 ➔ 他幹嘛教你？',
        bubble: '「他自己賺就好，幹嘛找陌生人！」',
        outcome: '🧠 識破詐騙套路',
        tone: 'gold'
      },
      {
        step: '漫畫③ 賭博 vs 投資',
        avatar: '⚖️ 雙劍阿火',
        scene: '🎲猜明牌(賭博) vs 🌱存ETF(投資)',
        bubble: '「想一夜暴富最容易被騙光光！」',
        outcome: '✅ 慢慢變富才是真',
        tone: 'cyan'
      },
      {
        step: '漫畫④ 一刀封鎖！',
        avatar: '⚔️ 防詐英雄',
        scene: '🚫 不加群 ＋ 🚫 不借錢 ＋ 🚫 不匯款',
        bubble: '「雷射劍全砍爆，保護自己的錢！」',
        outcome: '🏆 防詐滿分通關',
        tone: 'emerald'
      }
    ],
    takeaway: '🚨 保證暴富＝100% 詐騙 ｜ ✅ 慢慢變富才是真本事！',
    quiz: [
      {
        icon: '📱',
        question: '網路廣告說：「加老師 LINE，保證 7 天翻 5 倍！」這是？',
        options: [
          { icon: '🚨', label: '100% 大詐騙！快封鎖', correct: true },
          { icon: '😇', label: '好心人送你發財機會', correct: false },
          { icon: '🎓', label: '免費學校功課', correct: false }
        ],
        goodMsg: '防詐滿分！真有這麼好賺他自己賺就好！',
        badMsg: '警報響了！保證快速暴富一定是詐騙喔！'
      },
      {
        icon: '💸',
        question: '可以「借錢」或「拿吃飯錢」去投資嗎？',
        options: [
          { icon: '🚫', label: '絕對不行！只用「閒錢」', correct: true },
          { icon: '🔥', label: '借越多賺越快！', correct: false },
          { icon: '🍜', label: '餓肚子沒關係', correct: false }
        ],
        goodMsg: '超正確！永遠只用不影響生活的閒錢投資！',
        badMsg: '借錢投資遇到大跌會超慘，一定要用閒錢！'
      },
      {
        icon: '⚖️',
        question: '哪一個才是「真正的投資」，不是賭博？',
        options: [
          { icon: '🎲', label: '聽網友猜明天漲還是跌', correct: false },
          { icon: '🌱', label: '長期持有好 ETF，慢慢累積', correct: true },
          { icon: '🚀', label: '買來路不明的暴漲迷因幣', correct: false }
        ],
        goodMsg: '太棒了！你已經有頂尖投資人的防詐雷達！',
        badMsg: '猜明天漲跌跟買不明飆幣都是賭博喔，選長期穩健的！'
      }
    ]
  },
  {
    id: 'launch',
    num: 6,
    worldBadge: '🚀 16歲起飛基地',
    title: '16 歲怎麼出發？',
    hook: '留護盾 🛡️、用閒錢、找爸媽一起開戶！',
    image: 'assets/world_launch_ark.jpg',
    badgeIcon: '🚀',
    badgeName: '16歲起飛司令勳章',
    sceneType: 'launch_prep',
    shortPrompt: '把 10 顆零用錢電池 🔋 分進 4 個艙室，讓火箭發射！',
    defaultReaction: {
      avatar: '🚀 司令官',
      line: '把 10 顆電池分好，按下「🚀 點火發射火箭！」',
      tone: 'emerald'
    },
    comics: [
      {
        step: '漫畫① 零用錢到手',
        avatar: '👦 16歲易軒',
        scene: '💵 $3,000 ➔ 切分成 4 個艙室',
        bubble: '「不能全花光，也不能全拿去衝！」',
        outcome: '🔋 先分配再花錢',
        tone: 'gold'
      },
      {
        step: '漫畫② 先留安全護盾',
        avatar: '🛡️ 小鐵',
        scene: '🏥 急用錢 ➔ 有備用金不慌張！',
        bubble: '「先存緊急備用金，才不會被迫賣股！」',
        outcome: '🛡️ 護盾一定要裝滿',
        tone: 'emerald'
      },
      {
        step: '漫畫③ 找爸媽一起開戶',
        avatar: '👨‍👩‍👦 家人神隊友',
        scene: '👦16歲 ＋ 👨‍👩‍👦爸媽 ➔ 🏦合法證券戶',
        bubble: '「台灣未滿 18 歲，爸媽陪同就能開！」',
        outcome: '🤝 安全合法出發',
        tone: 'cyan'
      },
      {
        step: '漫畫④ 投資自己無敵',
        avatar: '🚀 起飛大合照',
        scene: '🧠專長 ＋ 💪健康 ＋ 🌱ETF',
        bubble: '「照顧好自己＋正確理財，未來超帥！」',
        outcome: '🏆 16歲正式起飛',
        tone: 'gold'
      }
    ],
    takeaway: '🛡️ 先存緊急護盾 → 🚀 閒錢投資 → 👨‍👩‍👦 滿18歲前找爸媽討論開戶',
    quiz: [
      {
        icon: '🛡️',
        question: '開始投資前，一定要先準備好什麼？',
        options: [
          { icon: '🏦', label: '緊急備用金（安全護盾）', correct: true },
          { icon: '🏎️', label: '一輛跑車', correct: false },
          { icon: '🎮', label: '十台遊戲機', correct: false }
        ],
        goodMsg: '沒錯！先有安全護盾，遇到急事才不會亂賣股票！',
        badMsg: '要先留一筆急用現金當護盾才安全喔！'
      },
      {
        icon: '👨‍👩‍👦',
        question: '易軒現在 16 歲，在台灣想開股票帳戶要怎麼做？',
        options: [
          { icon: '🤝', label: '和爸媽一起討論＆由爸媽陪同開戶', correct: true },
          { icon: '🕵️', label: '偷偷借陌生網友的帳號', correct: false },
          { icon: '💸', label: '把現金寄給網路老師代操', correct: false }
        ],
        goodMsg: '100 分！找爸媽一起開戶最安全合法！',
        badMsg: '千萬不能用陌生人帳號或給別人代操！要找爸媽喔！'
      },
      {
        icon: '🧠',
        question: '16 歲除了存錢投資，還有哪一項「回報率最高」的投資？',
        options: [
          { icon: '🌟', label: '投資自己的健康與專長能力', correct: true },
          { icon: '🎰', label: '每天熬夜抽盲盒', correct: false },
          { icon: '📢', label: '盲目跟風買最貴球鞋', correct: false }
        ],
        goodMsg: '大滿貫！照顧好自己、學好本事，加上正確投資觀念，未來無敵！',
        badMsg: '16 歲最棒的寶藏就是你自己！選跟健康與能力有關的！'
      }
    ]
  }
];
