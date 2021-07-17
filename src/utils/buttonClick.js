import axios from 'axios'
import { convert, parseTime } from './index'

// index 组件 查询小作文的函数
function buttonClick() {
  const notify = this.notify

  const post_url = `${process.env.VUE_APP_BASE_API || 'https://asoulcnki.asia/v1/api'}/check`;
  if (this.text.length < 10) {
    return notify('小作文字数太少了捏', 'warning')
  }
  if (!this.agree_check) {
    return notify('请先同意协议', 'warning')
  }
  if (!this.isComplete) {
    this.isComplete = true;
    axios
      .post(post_url, { text: this.text })
      .then(res => {
        this.isComplete = false;
        if (res.data.code != 0) {
          return notify('服务器异常', 'error')
        }
        //时间设置
        const format = (...args) => parseTime(new Date(...args), '{y}/{m}/{d} {h}:{i}:{s}')
        const data = res.data.data

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
      })
      .catch(err => {
        this.isComplete = false;
        notify('服务器异常', 'error')
        throw new Error(err)
      });
  }

}

export { buttonClick }