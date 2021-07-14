import axios from 'axios'
import dayjs from 'dayjs'
import { convert } from './arrayToObject'

function button_click() {

  // const post_url = 'https://asoulcnki.asia/v1/api/check'
  const post_url = '/result1'
  if (this.text.length < 10) {
    alert("小作文字数太少了哦~");
    return;
  }
  if (!this.agree_check) {
    return alert('请先同意协议')
  }
  if (!this.isComplete) {
    this.isComplete = true;
    axios
      .get(post_url)
      // .post(post_url, { text: this.text })
      .then( res => {
        this.isComplete = false;
        if (res.data.code != 0) {
          return alert("服务器错误")
        }
        //时间设置
        const format = (...args) => new dayjs(...args).format("YYYY-MM-DD HH:mm:ss")
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
      })
      .catch( err => {
        this.isComplete = false;
        alert(err);
        throw new Error(err)
      });
  }

}

export {button_click}