<template>
  <div class="result-panel" id="panel">
    <div class="panel-body">
      <div class="result-title">
        <h3>文本复制检测报告单(枝网)</h3>
      </div>
      <div class="result-head">
        <p><span class="result-head-item">检测时间：</span>{{ response.time }}</p>
        <p><span class="result-head-item">检测范围：</span>b站评论</p>
        <p>
          <span class="result-head-item">时间范围：</span>{{ response.TimeRange[0] }} 至 {{response.TimeRange[1]}}
        </p>
        <p>
          <b :style="'color: ' + rate_color + '; font-size: medium'">
            总文字复制比：{{ response.repeatPercent }}%</b
          >
        </p>
        <div class="result-progress">
          <div
            :class="progress_class"
            :style="'width:' + response.repeatPercent + '%;'"
          >
          </div>
        </div>
      </div>
      <div class="result-body">
        <div style="text-align:center">
          <button class="result-copy-button">
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
        <p class="result-body-title">原文</p>
        <div class="result-article-content">
          <p>{{ response.text }}</p>
        </div>
        <p class="result-body-title">相似小作文</p>
        <div class="render-data">
          <p class="result-body-info" v-if="response.alike.length == 0">没有找到相似的小作文</p>
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
      clipboard: null,
      progress_class: ""
    }
  },
  methods: {
    report(trigger) {
      const response = this.response
      let report = `枝网文本复制检测报告(简洁)\n查重时间: ${response.time}\n总文字复制比: ${response.repeatPercent}%\n`
      if (response.alike.length > 0) {
        const article = response.alike[0] 
        report += `相似小作文: ${article.url}\n作者:${article.author.name}\n发表时间:${article.createTime}\n\n`
      }
      report += `查重结果仅作参考，请注意辨别是否为原创`
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
    this.response = this.$route.params.response

    // if data not exists, turn to index
    if (!this.response) this.$router.push('/')

    document.title = "枝网检测报告";
    let rate = parseInt(this.response.repeatPercent)
    if (rate < 20) {
      this.progress_class = "result-progress-bar result-progress-bar-success";
      this.rate_color = "green";
    } else if (rate < 60) {
      this.progress_class = "result-progress-bar result-progress-bar-warning";
      this.rate_color = "orange";
    } else {
      this.progress_class = "result-progress-bar result-progress-bar-danger";
      this.rate_color = "red";
    }
  },
  mounted() {
    const clipboard = new ClipboardJS('.result-copy-button', {
      text: this.report
    })
    clipboard.on("success", () => this.notify('复制成功,适度玩梗捏', 'success'));
    clipboard.on("error", () => this.notify('复制失败，请手动复制', 'warning')) 
    this.clipboard = clipboard
  }
}
</script>

<style>
@import url('../globalCSS/result.css');
</style>
