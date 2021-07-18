const person_list = [
  {
    name: "贝拉kira",
    href: "672353429",
    imgPath: "https://i2.hdslb.com/bfs/face/668af440f8a8065743d3fa79cfa8f017905d0065.jpg",
    color:"#bd7d74"
  },
  {
    name: "嘉然今天吃什么",
    href: "672328094",
    imgPath: "https://i2.hdslb.com/bfs/face/d399d6f5cf7943a996ae96999ba3e6ae2a2988de.jpg",
    color:"#e799b0"
  },
  {
    name: "向晚大魔王",
    href: "672346917",
    imgPath: "https://i0.hdslb.com/bfs/face/566078c52b408571d8ae5e3bcdf57b2283024c27.jpg",
    color:"#9ac8e2"
  },
  {
    name: "乃琳Queen",
    href: "672342685",
    imgPath: "https://i1.hdslb.com/bfs/face/8895c87082beba1355ea4bc7f91f2786ef49e354.jpg",
    color:"#576690"
  },
  {
    name: "珈乐Carol",
    href: "351609538",
    imgPath: "https://i2.hdslb.com/bfs/face/a7fea00016a8d3ffb015b6ed8647cc3ed89cbc63.jpg",
    color:"#b8a6d9"
  },
  {
    name: "A-SOUL_Official",
    href: "703007996",
    imgPath: "https://i2.hdslb.com/bfs/face/48d65a10a2c643dddc4a51e0a60fae892393417a.jpg",
    color:"#595959"
  },

];

const description = [
  {key: '比对库范围：', value: 'b站动态、视频评论区', type: 'text'},
  {key: '参考文献：', value: `[1]李旭.基于串匹配方法的文档复制检测系统研究[D].燕山大学.`, type: 'text'},
  {key: '开源地址：', value: {text: 'ASoulCnki', href: 'https://github.com/stream2000/ASoulCnki'}, type: 'link'},
  {key: '反馈地址：', value: {text: 'ASoulCnki_Official', href: 'https://t.bilibili.com/542031663106174238'}, type: 'link'},
]

const message = (time) => {
  const oldVal = '队长！大聪明！！生日快乐！！！一起向前冲啊啊啊！（明天才是正式的生日，大家别记错了！！）（偷自@向晚大魔王）枝网项目组祝拉姐生日快乐！'
  const newVal = '队长！大聪明！！生日快乐！！！一起向前冲啊啊啊！（今天才是正式的生日，大家别记错了！！）（偷自@向晚大魔王）枝网项目组祝拉姐生日快乐！'
  const feedback = '查重过程中遇到的问题可以向@查重姬Official进行反馈，传送门在系统介绍 ——枝网项目组'
  return (time < 1626451200000) ? 
    oldVal : (time < 1626537600000) ? newVal : feedback
}

export {description, person_list, message}