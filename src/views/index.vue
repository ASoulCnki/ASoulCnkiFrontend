<template>
  <div id="body_content">
    <div class="content-left">
      <div class="notify">
        我是公告
      </div>
      <div class="main-container">
        <div class="text-contianer">
          <div class="text-header">
            <ul>
              <li id="percentage" style="color: rgb(215, 58, 73);">
                重复率 {{ response.repeatPercent }}% 
              </li>
              <li>
                <button @click="buttonClick"
                  :class="'text-button ' + (isComplete ? 'submit-pedding' : 'submit-ready') " 
                >
                  {{ isComplete ? '查重中···' : '提交小作文' }}
                </button>
              </li>
              <li>
                <button class="text-button report" @click="getReport" :disabled="!reportable">
                  生成查重报告
                </button>
              </li>
            </ul>
          </div>
          <textarea
            placeholder="内容字数不少于10个字，不多于1000字。输入信息后，点击下方「提交小作文」进行查重 !"
            :maxlength="maxlength"
            v-model="text"
          />
          <p class="text-status">
            <span>
              {{ text.length }}/{{ maxlength }} 种类: {{typeofText}}
            </span>
          </p>
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
        <div class="right-top-description right-item">
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
        <div class="right-bottom-links right-item">
          <h3 class="description-title">欢迎关注</h3>
          <p v-for="person in person_list" :key="person.href">
            <a
              :href="'https://space.bilibili.com/'+ person.href"
              style="color: rgb(251, 114, 153)"
              target="_blank"
            >
              {{ person.name }}
            </a>
          </p>
      </div>
    </div>
  </div>
</template>

<script>
import { isChracterDraw, pureLength } from '../utils/'
import { buttonClick } from '../utils/buttonClick' 
import { person_list, description } from '../config'
import Article from '../components/article.vue'

export default {
  name: "Home",
  components: {
    Article
  },
  data() {
    return {
      text: "",
      agree_check: true,
      maxlength: 1000,
      button_content: "提交小作文",
      isComplete: false,
      response: {
        repeatPercent: 0,
        timeRange: [],
        text: "",
        alike: []
      },
      person_list,
      description
    };
  },
  methods: {
    buttonClick() {
      buttonClick.call(this, arguments)
    },
    getReport() {
      this.$router.push({
        name: 'result',
        params: { response: this.response }
      })
    },
    agree_check_click() {
      this.agree_check = !this.agree_check;
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
    
  }
};
</script>

<style>
@import url("../globalCSS/main.css");
@import url("../globalCSS/media.css");
</style>
