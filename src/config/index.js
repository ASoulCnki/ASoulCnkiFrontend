const person_list = [
  {
    name: "贝拉kira",
    href: "672353429",
    imgPath: "https://i2.hdslb.com/bfs/face/668af440f8a8065743d3fa79cfa8f017905d0065.jpg",
    imgApplePath: "/assets/images/bella.webp",
    color:"#db7d74"
  },
  {
    name: "嘉然今天吃什么",
    href: "672328094",
    imgPath: "https://i2.hdslb.com/bfs/face/d399d6f5cf7943a996ae96999ba3e6ae2a2988de.jpg",
    imgApplePath: "/assets/images/diana.webp",
    color:"#e799b0"
  },
  {
    name: "向晚大魔王",
    href: "672346917",
    imgPath: "https://i0.hdslb.com/bfs/face/566078c52b408571d8ae5e3bcdf57b2283024c27.jpg",
    imgApplePath: "/assets/images/ava.webp",
    color:"#9ac8e2"
  },
  {
    name: "乃琳Queen",
    href: "672342685",
    imgPath: "https://i1.hdslb.com/bfs/face/8895c87082beba1355ea4bc7f91f2786ef49e354.jpg",
    imgApplePath: "/assets/images/eileen.webp",
    color:"#576690"
  },
  {
    name: "珈乐Carol",
    href: "351609538",
    imgPath: "https://i2.hdslb.com/bfs/face/a7fea00016a8d3ffb015b6ed8647cc3ed89cbc63.jpg",
    imgApplePath: "/assets/images/carol.webp",
    color:"#b8a6d9"
  },
  {
    name: "A-SOUL_Official",
    href: "703007996",
    imgPath: "https://i2.hdslb.com/bfs/face/48d65a10a2c643dddc4a51e0a60fae892393417a.jpg",
    imgApplePath: "/assets/images/cao.webp",
    color:"#595959"
  },

];

const description = [
  {key: '比对库范围：', value: 'b站动态、视频评论区', type: 'text'},
  {key: '参考文献：', value: `[1]李旭.基于串匹配方法的文档复制检测系统研究[D].燕山大学.`, type: 'text'},
  {key: '开源地址：', value: {text: 'ASoulCnki', href: 'https://github.com/ASoulCnki'}, type: 'link'},
  {key: '反馈地址：', value: {text: 'ASoulCnki_Official', href: 'https://t.bilibili.com/542031663106174238'}, type: 'link'},
]

const filters = [
  {
    filterName: '时间范围',
    filterAttr:'timeRangeMode',
    multiple: false,
    options: [
      {text: '全部时间', value: 0},
      {text: '本周', value: 1},
      {text: '三天内', value: 2},
    ]
  },
  {
    filterName: '筛选类型',
    filterAttr:'sortMode',
    multiple: false,
    options: [
      {text: '累计点赞数', value: 0},
      {text: '点赞数', value: 1},
      {text: '引用次数', value: 2},
    ]
  },
]

const message = (time) => {
  let feedback = '查重过程中遇到的问题可以向@查重姬Official进行反馈，传送门在系统介绍 ——枝网项目组'
  if (time < 1628438400000 && time > 1628265600000) {
    feedback = "喜欢被你逗，喜欢当你的TOM猫，但最喜欢的是你的笑容。今天、明天、每一天，我们一直在！乃琳生日快乐吖！！！今天你是大哥！！！一起向前冲啊啊啊！！！🎂🎂🎂  ——超级超级爱你的一个魂（以上内容偷自ASoul）枝网项目组祝乃琳生日快乐！"
  } 
  return feedback
}


function urlArray() {
  let fakeArray = [
    'https://www.bilibili.com/video/BV1CB4y1K7vE',
    'https://www.bilibili.com/video/BV1Y54y1V7Pv',
    'https://www.bilibili.com/video/BV1mU4y1V7j2',
    'https://www.bilibili.com/video/BV1s64y1R7SN',
    'https://www.bilibili.com/video/BV1Xf4y1b7vs',
    'https://www.bilibili.com/video/BV1x44y167br',
    'https://www.bilibili.com/video/BV1pM4y1u77H',
    'https://www.bilibili.com/video/BV1HU4y1G7xV',
    'https://www.bilibili.com/video/BV1oy4y1T7kc',
    'https://www.bilibili.com/video/BV1Mf4y1s723',
    'https://www.bilibili.com/video/BV1oX4y1g79t',
    'https://www.bilibili.com/video/BV1Ap4y1b7YN',
    'https://www.bilibili.com/video/BV1Zb4y1Z7nh',
    'https://www.bilibili.com/video/BV1MK4y1A7FE',
    'https://www.bilibili.com/video/BV1J64y1y7em',
    'https://www.bilibili.com/video/BV19A411G7uE',
    'https://www.bilibili.com/video/BV1cK4y1V7mf',
    'https://www.bilibili.com/video/BV1Eb4y1Z7wN'
  ]

  const sp = 'https://www.bilibili.com/video/BV1f54y1j7X8'

  fakeArray = Array(6).fill(sp).concat(fakeArray)
  return fakeArray
}

export {description, person_list, message, filters, urlArray}