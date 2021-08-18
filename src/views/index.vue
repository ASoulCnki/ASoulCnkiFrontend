<template>
  <div class="body-content">
    <div class="index-container">
    <div class="content-left">
      <Notice
        :backgroundColor="notice.backgroundColor"
        :color="notice.color"
        :content="notice.content" 
      />
      <div class="main-container shadow-md">
        <div class="text-contianer">
          <div class="text-header">
            <ul>
              <li class="text-red-500">
                总复制比 {{ response.repeatPercent }}% 
              </li>
              <li>
                <button class="button text-button report" @click="getReport" :disabled="!reportable">
                  详情
                </button>
              </li>
              <li>
                <button class="button report" id="copy" :disabled="!reportable">
                  <span class="iconfont icon-fuzhi"></span>
                </button>
              </li>
              <li>
                <button @click="buttonClick" :disabled="isComplete"
                  :class="'text-button button ' + (isComplete ? 'submit-pedding' : 'submit-ready') " 
                >
                  <span class="iconfont icon-shangchuan -ml-1 mr-2"></span> 
                  {{ isComplete ? '查重中' : '提交' }}
                </button> 
              </li>

            </ul>
          </div>
          <div class="h-full dark:bg-gray-700">
            <textarea
              placeholder="内容字数不少于10个字，不多于1000字。输入信息后，点击下方「提交小作文」进行查重 !"
              :maxlength="maxlength"
              v-model="text"
            />
          </div>
          <div class="text-status">
            <div>
              <el-checkbox v-model="isAgreed"/>
              您已同意<a @click="isProtocolVisiable=true" class="text-blue-400 underline">用户协议</a>
            </div>
            <div>
              {{ text.length }}/{{ maxlength }} 种类: {{typeofText}}
            </div>
          </div>
        </div>
      </div>
      <ArticleShow :articles="response.alike" :text="response.text"/>
    </div>
    <RightContent/>
    </div>
    <Protocol :visible="isProtocolVisiable" @close="closeDialog"/>
  </div>
</template>

<script>
import { isChracterDraw, pureLength, buttonClick } from '../utils/'
import { message } from '../config'
import Notice from '../components/Notice.vue'
import ArticleShow from '../components/index/articleShow.vue'
import RightContent from '../components/index/RightContent.vue'
import Protocol from './protocol.vue'

export default {
  name: "Home",
  components: {
    ArticleShow,
    Notice,
    RightContent,
    Protocol
  },
  data() {
    return {
      text: "",
      agree_check: true,
      maxlength: 1000,
      button_content: "提交小作文",
      isComplete: false,
      isProtocolVisiable: false,
      isAgreed: true,
      notice: {
        backgroundColor: '#576690',
        color: 'white',
        content:[
          {message: message(new Date() * 1)},
        ]
      },
      response: {
        repeatPercent: (0).toFixed(2),
        timeRange: [],
        text: "",
        alike: []
      },
      textMarked: false,
      clipbaord: null
    };
  },
  methods: {
    report(trigger) {
      if (!this.reportable) return
      const response = this.response
      let report = `枝网文本复制检测报告(简洁)\n查重时间: ${response.time}\n总文字复制比: ${response.repeatPercent}%\n`
      if (response.alike.length > 0) {
        const article = response.alike[0] 
        report += `相似小作文: ${article.url}\n作者:${article.author.name}\n发表时间:${article.createTime}\n\n`
      }
      report += `查重结果仅作参考，请注意辨别是否为原创`

      return report;
    },
    buttonClick() {
      buttonClick.call(this, arguments)
    },
    getReport() {
      this.$router.push({
        name: 'result',
        params: { response: this.response }
      })
    },
    notify(s, type) {
      this.$message({
        showClose: true,
        message: s,
        type: type
      })
    },
    closeDialog() {
      this.isProtocolVisiable = false
    },
    openDialog() {
      this.isAgreed = !this.isAgreed
      this.isProtocolVisiable = true
    }
  },
  computed: {
    typeofText() {
      return isChracterDraw(this.text)?'字符画/表情':'正常小作文'
    },
    checkAgree() {
      return localStorage.getItem('agreed')
    },
    length() {
      return pureLength(this.text)
    },
    reportable() {
      return this.response.text.length != 0
    }
  },
  mounted() {
    const isAgreed = JSON.parse(localStorage.getItem('isAgreed'))
    this.isAgreed = isAgreed || false
    const clipboard = new ClipboardJS('#copy', {
      text: this.report
    })
    clipboard.on("success", () => this.notify('复制成功,适度玩梗捏', 'success'));
    clipboard.on("error", () => this.notify('复制失败，请手动复制', 'warning'))
    this.clipboard = clipboard
  },
  watch: {
    isAgreed(newVal) {
      if (newVal != null)
        localStorage.setItem('isAgreed', newVal)
    }
  }
};
</script>

<style>
@import url("../globalCSS/main.css");
</style>
