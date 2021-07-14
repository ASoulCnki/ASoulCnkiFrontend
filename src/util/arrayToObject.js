import dayjs from 'dayjs'

const convert = (arr) => {
  return arr.map(item => {
    return {
      id: item[1].rpid,
      repeatPercent: (item[0] * 100).toFixed(2),
      content: item[1].content,
      author: {
        name: item[1].m_name, 
        id: item[1].mid
      },
      createTime: new dayjs(item[1].ctime * 1000).format('YY/MM/DD HH:mm'),
      url: item[2]
    }
  })
}

export { convert }

