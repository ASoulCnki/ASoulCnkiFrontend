import { instance } from '@/api';
import { convert, parseTime } from './index'
import axios from 'axios'

// index 组件 查询小作文的函数
async function buttonClick() {
  const notify = this.notify

  if (!this.isAgreed) {
    return notify('请先同意用户协议', 'warning')
  }
  if (this.text.length < 10) {
    return notify('小作文字数太少了捏', 'warning')
  }
  if (!this.isComplete) {
    this.isComplete = true;
    const data = await allRequest(this.serverInfo, this.text)
    this.isComplete = false
    //时间设置
    const format = (...args) => parseTime(new Date(...args))

    this.response = {
      repeatPercent: (data.rate * 100).toFixed(2),
      time: format(),
      TimeRange: [
        format(data.start_time * 1000),
        format(data.end_time * 1000)
      ],
      alike: convert(data.related),
      text: this.text
    }

    const length = this.response.alike.length
    if (length == 0) {
      notify('没有找到重复的小作文捏', 'success')
    } else {
      notify(`请点击复制以复制查重报告`, 'success')
    }
  }

}

// do sub request
function subRequest(serverInfo, text) {
  const url = serverInfo.url + '/v1/api/check'
  return instance.post(url, { text: text })
    .catch(err => err)
}

async function allRequest(serverInfoArray, text) {
  const axiosPendingArray = []
  let response = {}

  // When Server was Select, Add to Pending Array
  serverInfoArray.filter(s => s.select).forEach(serverInfo => {
    axiosPendingArray.push(subRequest(serverInfo, text))
  });

  // 对网站限流的情况没做处理
  await axios.all(axiosPendingArray)
    .then(axios.spread((...res) => {
      response = mergeCheckResponse(res)
    }))
    .catch(err => {
      throw new Error(err)
    })

  return response
}

function mergeCheckResponse(res) {
  if (!Array.isArray(res)) return {}

  let response = {}

  let related = []
  let rateArray = []
  let [ startTimeArray, endTimeArray ] = [ [], [] ]
  res.forEach(result => {
    console.log(result);
    if (result && result.data && result.data.code) return

    const data = result.data.data

    related = related.concat(data.related)
    rateArray.push(data.rate)
    startTimeArray.push(data.start_time)
    endTimeArray.push(data.end_time)
  })
  
  // 去重 按查重率排序 
  related = [... new Set(related.map(s => JSON.stringify(s)))]
    .map(s => JSON.parse(s))
    .sort((x, y) => y.rate - x.rate)

  response = {
    rate: Math.max(...rateArray),
    start_time: Math.min(...startTimeArray),
    end_time: Math.max(...endTimeArray),
    related: related
  }

  return response
}

export { buttonClick }