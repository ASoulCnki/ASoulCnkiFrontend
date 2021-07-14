const percentOfNormalSymbol = (s) => {
	//统计常规符号：汉字 字母 数字
	if (s.length == 0) return 0

	// 去除b站表情对较短小作文的影响，将其作为特殊符号统计
	s = s.replace(/[[\u4e00-\u9fa5_]{3,10}]+/, ' ')

  const regex = /([0-9a-z\u4e00-\u9fa5)]+)/i
  const percentage = [...s]
    .filter(s => s.match(regex)).length / s.length
  return percentage
}

// 统计出现的字符种类
const numOfSymbol = (s) => {
  return [... new Set(s)].length
} 

const isChracterDraw = s => {
	const percentage = percentOfNormalSymbol(s)
	const num = numOfSymbol(s)
	if (percentage < 0.15 || num < 7) return true

	return false
}

const pureLength = (s) => {
  s.replace(/[[\u4e00-\u9fa5_]{3,10}]+/, ' ').length
}

export {
  isChracterDraw,
  pureLength
}