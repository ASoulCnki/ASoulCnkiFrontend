<template>
  <div class="panel panel-default" id="panel">
    <div class="panel-body">
      <div id="title">
        <h3><b>文本复制检测报告单(枝网)</b></h3>
      </div>
      <div class="head" id="info_head">
        <p class="time"><span class="head_li">检测时间：</span>{{ response.time }}</p>
        <p class="detection_range">
          <span class="head_li"> 检测范围：</span>b站评论
        </p>
        <p class="time_range">
          <span class="head_li"> 时间范围：</span>
            {{ response.TimeRange[0] }} 至 {{response.TimeRange[1]}}
        </p>
        <p class="detection_range">
          <b :style="'color: ' + rate_color + '; font-size: medium'">
            总文字复制比：{{ response.repeatPercent }}%</b
          >
        </p>
        <div class="progress">
          <div
            :class="progress_class"
            role="progressbar"
            :aria-valuenow="response.repeatPercent"
            aria-valuemin="0"
            aria-valuemax="100"
            :style="'width:' + response.repeatPercent + '%;'"
          >
            <span class="sr-only"></span>
          </div>
        </div>
      </div>
      <div class="result_body">
        <div id="copy_result">
          <button type="button" class="btn btn-info" id="copy_result_btn">
            复制查重结果
          </button>
          <p>
            查重结果仅作参考，请注意辨别是否为原创<br />(算法更新中,不足之处欢迎<a
              href="https://t.bilibili.com/542031663106174238"
              target="_blank"
              >点此反馈</a
            >)
          </p>
        </div>
        <p class="result_title">原文</p>
        <div class="result_box">
          <div class="result_box_inner">
            <div id="src_text" style="word-wrap: break-word">
              <p>{{ response.text }}</p>
            </div>
          </div>
        </div>
        <p class="result_title" style="margin-top: 20px">相似小作文</p>
        <div class="render-data">
          <Article 
            v-for="article in response.alike"
            :key="article.id"
            :article="article"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Article from '../components/article.vue'
export default {
  name: 'result',
  components: {
    Article
  },
  data() {
    return {
      response: {},
      clipboard: null
    }
  },
  methods: {
    report(trigger) {
      const response = JSON.parse(localStorage.getItem('response'))
      let report = `枝网文本复制检测报告(简洁)\n查重时间: ${response.time}\n总文字复制比: ${response.repeatPercent}%\n`
      if (response.alike.length > 0) {
        const article = response.alike[0] 
        report += `相似小作文: ${article.url}\n作者:${article.author.name}\n发表时间:${article.createTime}\n\n`
      }
      report += `查重结果仅作参考，请注意辨别是否为原创`

      //评价
      // var comment = "我的评价是:";
      // if (rate < 40.0) {
      //   comment += "原创/偷🥰\n";
      // } else if (rate < 70.0) {
      //   comment += "有抄袭嫌疑🤨\n";
      // } else {
      //   comment += "一眼偷🥵\n";
      // }

      return report;
    },
    notify(s, type) {
      this.$message({
        showClose: true,
        message: s,
        type: type
      })
    }
  },
  created() {
    // set title
    this.response = this.$route.params.response
    document.title = "枝网检测报告";
    let rate = this.response.repeatPercentage
    localStorage.setItem('response', JSON.stringify(this.response))
    if (rate < 20) {
      this.progress_class = "progress-bar progress-bar-success";
      this.rate_color = "green";
    } else if (rate < 60) {
      this.progress_class = "progress-bar progress-bar-warning";
      this.rate_color = "orange";
    } else {
      this.progress_class = "progress-bar progress-bar-danger";
      this.rate_color = "red";
    }
  },
  mounted() {
    const clipboard = new ClipboardJS('#copy_result_btn', {
      text: this.report
    })
    clipboard.on("success", () => this.notify('复制成功', 'success'));
    clipboard.on("error", () => this.notify('复制失败，请手动复制', 'warning')) 
    this.clipboard = clipboard
  }
};
history.pushState(null, null, document.URL);
window.addEventListener("popstate", function () {
  window.location = "/";
});
</script>

<style>
body {
  background: #ebebeb;
}
#panel {
  width: 90%;
  margin: auto;
  margin-top: 20px;
}
#title {
  margin-bottom: 20px;
}
#title h3 {
  text-align: center;
}
#info_head {
  margin: 10px;
  margin-left: 20px;
}
.head_li {
  color: rgb(23, 121, 204);
}
.result_title {
  text-align: center;
  font-size: medium;
  font-weight: 1000;
  color: rgb(23, 121, 204);
}
.result_box {
  width: 80%;
  margin: auto;
}
.result_box_inner {
  margin: 10px;
  border-radius: 10px;
  border: 1px solid #e2e0e0;
}
.result_box_inner #src_text {
  margin: 20px;
  white-space: pre-wrap;
}
#copy_result {
  text-align: center;
}

#copy_result .btn {
  margin: 20px;
}
</style>
