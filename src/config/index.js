const person_list = [
  {
    name: "A-SOUL_Official",
    href: "703007996",
    imgPath: "a.jpg"
  },
  {
    name: "贝拉kira",
    href: "672353429",
    imgPath: "b.jpg"
  },
  {
    name: "嘉然今天吃什么",
    href: "672328094",
    imgPath: "d.jpg"
  },
  {
    name: "向晚大魔王",
    href: "672346917",
    imgPath: "a.jpg"
  },
  {
    name: "乃琳Queen",
    href: "672342685",
    imgPath: "e.jpg"
  },
  {
    name: "珈乐Carol",
    href: "351609538",
    imgPath: "c.jpg"
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