<template>
  <div id="body_content">
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
              <li id="percentage" style="color: rgb(215, 58, 73);">
                总复制比 {{ response.repeatPercent }}% 
              </li>
              <li>
                <button class="button text-button report py-2" @click="getReport" :disabled="!reportable">
                  详情
                </button>
              </li>
              <li style="vertical-align: -0.12rem;">
                <button class="button p-2 px-5 h-15 report" id="copy" :disabled="!reportable">
                  <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2404"><path d="M875.605333 237.781333L661.76 21.333333a76.8 76.8 0 0 0-14.72-11.52c-1.365333-0.768-2.773333-1.578667-4.266667-2.261333-0.896-0.512-1.92-0.896-2.816-1.28A71.552 71.552 0 0 0 610.986667 0H329.984c-39.765333 0-72.96 32.213333-72.96 72.021333V128H201.472c-39.808 0-72.533333 32.597333-72.533333 72.405333v752c0 39.808 32.725333 71.594667 72.533333 71.594667h494.976c39.808 0 71.509333-31.786667 71.509333-71.594667V896h57.002667c39.808 0 70.997333-32.213333 70.997333-72.021333V288.512c0-19.029333-6.997333-37.205333-20.394666-50.730667z m-227.584-127.402666l136.789334 137.6h-136.789334V110.378667z m48 841.642666H200.96V200.021333h55.978667v624c0 39.765333 33.237333 71.978667 73.002666 71.978667h366.037334v56.021333z m128-128H328.96V72.021333H576v176c0 39.765333 33.194667 71.978667 72.96 71.978667h175.061333v504.021333z m-183.04-404.053333A35.968 35.968 0 0 0 605.013333 384H420.992a35.968 35.968 0 1 0 0 72.021333h184.021333a35.968 35.968 0 0 0 35.968-36.010666z m128 128A35.968 35.968 0 0 0 733.013333 512H420.992a35.968 35.968 0 1 0 0 72.021333h312.021333a35.968 35.968 0 0 0 35.968-36.010666z m-64 128A35.968 35.968 0 0 0 669.013333 640H420.992a35.968 35.968 0 1 0 0 72.021333h248.021333a35.968 35.968 0 0 0 35.968-36.010666z" p-id="2405" fill="#ffffff"></path></svg>
                </button>
              </li>
              <li>
                <button @click="buttonClick" :disabled="isComplete"
                  :class="'text-button button ' + (isComplete ? 'submit-pedding' : 'submit-ready') " 
                >
                  {{ isComplete ? '查重中' : '提交' }}
                </button> 
              </li>

            </ul>
          </div>
          <textarea
            placeholder="内容字数不少于10个字，不多于1000字。输入信息后，点击下方「提交小作文」进行查重 !"
            :maxlength="maxlength"
            v-model="text"
          />
          <div class="text-status">
            <div>
              <el-checkbox v-model="isAgreed"/>
              您已同意<a @click="isProtocolVisiable=true">用户协议</a>
            </div>
            <div>
              {{ text.length }}/{{ maxlength }} 种类: {{typeofText}}
            </div>
          </div>
        </div>
      </div>
      <div class="render-data-list">
        <Article 
          v-for="article in response.alike" 
          :key="article.id"
          :article="article"
        />
      </div>
    </div>
    <div class="content-right">
        <div class="right-top-description right-item shadow-md">
          <p class="text-red-600 font-bold text-3xl">新功能!枝江作文展
            <a href="/rank" class="text-blue-400">点此进入</a>
          </p>
        </div>
        <div class="right-top-description right-item shadow-md">
          <h3 class="description-title">
            枝网查重系统介绍
          </h3>   
          <p v-for="item in description" :key="item.key">
            <b>{{item.key}}</b><br/>
            <em v-if="item.type == 'text'" class="description-value">{{item.value}}</em>
            <em v-if="item.type == 'link'">
              <a :href="item.value.href" class="description-value">{{item.value.text}}</a>
            </em>
          </p>
        </div>

        <Carousel :memberArray="person_list"/>
        <hr class="p-0 my-5">
        <p class="text-center text-xl">
          <a class="text-gray-300" href="https://beian.miit.gov.cn/" target="_blank">
            琼ICP备20001476号-2
          </a>
        </p>
    </div>
    <Protocol :visible="isProtocolVisiable" @close="closeDialog"/>
  </div>
</template>

<script>
import { isChracterDraw, pureLength } from '../utils/'
import { buttonClick } from '../utils/buttonClick' 
import { person_list, description, message } from '../config'
import Article from '../components/article.vue'
import Notice from '../components/Notice.vue'
import Carousel from '../components/Carousel.vue'
import Protocol from './protocol.vue'

export default {
  name: "Home",
  components: {
    Article,
    Notice,
    Carousel,
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
        backgroundColor: '#DB7672',
        color: 'white',
        content:[
          {message: message(new Date() * 1)},
        ]
      },
      response: {
        repeatPercent: 0,
        timeRange: [],
        text: "",
        alike: []
      },
      person_list,
      description,
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
    isAgreed(newVal, oldVal) {
      if (newVal != null)
        localStorage.setItem('isAgreed', newVal)
    }
  }
};
</script>

<style>
@import url("../globalCSS/main.css");
@import url("../globalCSS/media.css");
</style>
