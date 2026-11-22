/* ============================================================
   data.js — 易軒 16 歲投資片場 6 大關卡資料
   原則：極少文字、超大圖示、口語化台灣中文語音腳本
   ============================================================ */

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
    voiceIntro: '第一關，桌面大戰！易軒你看，把錢藏在抽屜不動，會被物價變貴的通膨怪獸吃掉喔！快按下面的按鈕看看會發生什麼事！',
    takeaway: '💤 錢放抽屜＝越變越小 ｜ ⚡ 投資＝讓錢長大打贏物價',
    takeawayVoice: '記得這招：錢放著不動會越變越小，用投資讓錢去工作，才能打贏通膨怪獸！',
    quiz: [
      {
        icon: '🧋',
        question: '物價變貴，原本能買 2 杯珍奶的錢，20 年後會怎樣？',
        voice: '物價變貴了，原本能買兩杯珍奶的一百元，放抽屜二十年後會怎樣？',
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
        voice: '要打敗通膨怪獸，最好的武器是什麼？',
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
        voice: '投資真正的意思是什麼呢？',
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
    voiceIntro: '第二關，機甲複利反應爐！易軒你現在十六歲，時間就是你最強的超能力！拉拉看下面的時間拉桿，看看早點開始有多恐怖！',
    takeaway: '⏳ 16 歲開始，時間幫你錢滾錢，晚開始追都追不上！',
    takeawayVoice: '太猛了吧！早點啟動複利反應爐，就算錢不多，時間也能幫你滾成超級大雪球！',
    quiz: [
      {
        icon: '❄️',
        question: '什麼是「複利」？',
        voice: '小鐵問你喔，什麼叫做複利？',
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
        voice: '每個月都存一樣的錢，誰到六十歲的時候錢會最多？',
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
        voice: '複利反應爐最需要哪兩種燃料？',
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
    voiceIntro: '第三關，歡迎來到奇幻馬戲團！只買一家公司就像只頂一顆玻璃球，破了就全沒了！買 E T F 大禮包，就像一次擁有五百家好公司還有安全網！按按鈕玩玩看！',
    takeaway: '🥚 別把蛋全放一個籃子 ｜ 🎪 ETF 一次買很多好公司更穩！',
    takeawayVoice: '記住馬戲團的秘密：不要全部壓在一家公司，買 E T F 大禮包分散風險最穩！',
    quiz: [
      {
        icon: '💥',
        question: '把所有錢只買 1 家公司，萬一它倒閉會怎樣？',
        voice: '如果把所有錢只買一家公司，萬一那家公司倒閉會怎樣？',
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
        voice: '買大盤 E T F，最像下面哪一種東西？',
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
        voice: 'E T F 大禮包裡面，如果有一家公司表現不好，會怎麼樣？',
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
    voiceIntro: '第四關，末日災難片場！股市一定會遇到像隕石撞擊一樣的大跌，這時候嚇跑賣掉就會真的賠錢，開護盾抱緊才會迎來天晴！快點啟動航行！',
    takeaway: '🌋 大跌像打折特賣 ｜ 🛡️ 抱緊好 ETF＋定期定額，雨後創新高！',
    takeawayVoice: '超帥！遇到股災千萬不要恐慌亂賣，撐過暴風雨，好資產會帶你飛更高！',
    quiz: [
      {
        icon: '☄️',
        question: '股市大跌 30%，像隕石撞下來時，應該怎麼做？',
        voice: '股市突然大跌百分之三十，像隕石撞下來一樣，這時候該怎麼辦？',
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
        voice: '好的 E T F 遇到股災變便宜了，每個月固定繼續買代表什麼？',
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
        voice: '歷史上每一次大股災過去之後，整個市場長期都是怎麼走的？',
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
    voiceIntro: '第五關，桌面大戰二！網路上超多假老師說保證穩賺不賠、三天翻十倍，那些全都是大騙子！快點擊紅色詐騙彈窗，讓火柴人阿火用雷射劍砍爆它們！',
    takeaway: '🚨 保證暴富＝100% 詐騙 ｜ ✅ 慢慢變富才是真本事！',
    takeawayVoice: '砍得超帥！只要看到保證穩賺不賠、加老師群組，全部都是詐騙，直接封鎖！',
    quiz: [
      {
        icon: '📱',
        question: '網路廣告說：「加老師 LINE，保證 7 天翻 5 倍！」這是？',
        voice: '網路廣告說，加老師賴群組，保證七天賺五倍！這是什麼？',
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
        voice: '可以把吃飯錢拿去投資，或是跟別人借錢投資嗎？',
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
        voice: '下面哪一個才是真正的投資，而不是賭博？',
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
    voiceIntro: '最後一關，十六歲起飛基地！把你的零用錢電池分配到生活需要、緊急護盾、未來投資和開心娛樂四個艙室，配好就能點火發射火箭喔！',
    takeaway: '🛡️ 先存緊急護盾 → 🚀 閒錢投資 → 👨‍👩‍👦 滿18歲前找爸媽討論開戶',
    takeawayVoice: '恭喜起飛！記住：先留緊急護盾金，剩下的閒錢再投資，台灣未滿十八歲記得找爸媽一起討論開戶喔！',
    quiz: [
      {
        icon: '🛡️',
        question: '開始投資前，一定要先準備好什麼？',
        voice: '在開始投資之前，一定要先存好什麼東西保護自己？',
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
        voice: '易軒現在十六歲，在台灣如果想要開證券帳戶，應該怎麼做？',
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
        voice: '十六歲除了存錢投資以外，還有哪一項投資的回報率最高？',
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
