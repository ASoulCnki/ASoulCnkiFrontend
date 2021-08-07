<!--
  用于展示查重后的一篇文章
  author
 -->
<template>
  <div class="content" ref="content">
    <div class="content-info">
      <ul>
        <li>发表时间 {{article.createTime}}</li>
        <li style="color:#d73a49">重复率: {{article.repeatPercent}}%</li>
        <li>
          作者: 
          <a :href="isActive ? randomURL(urlArray) :'https://space.bilibili.com/' + article.author.id" target="_blank">
            {{article.author.name}}
          </a>
        </li>
        <li><a :href="isActive ? randomURL(urlArray) :article.url" target="_blank">传送门</a></li>
      </ul>
    </div>
    <div class="content-detail">
      <p v-if="textMarked" v-html="content"></p>
      <p v-else v-html="pureContent"></p>
    </div>
    <el-dialog :visible.sync="visible" title="彩蛋🎉">
      <ActivityDialog/>
    </el-dialog>
  </div>
</template>

<script>
import { fillTags, isActive, isTimeActive, randomURL } from '../utils'
import { setDialog, getDialogExist } from '../utils/activity'
import { urlArray } from '../config'
import ActivityDialog from '../components/activity/activityDialog.vue'

export default {
  name: 'Article',
  components: {
    ActivityDialog
  },
  props: {
    article: Object,
    text: String,
    textMarked: {
      default: () => true
    }
  },
  data() {
    return {
      regex : /(https?:\/\/|)(b23\.tv\/\S{0,8}|\S+\.bilibili.com\/\S+\d+)/g,
      timeout: null,
      visible: false,
      urlArray: urlArray(),
      randomURL
    }
  },
  methods: {
    parseURL(s) {
      const x = s.startsWith('https:') ? s : `https://${s}`
      const fakeURL = randomURL(this.urlArray)
      const url = (this.isActive) ? fakeURL : x
      return `<a target="_blank" class="content-url" href="${url}">${s}</a>`
    },
    message() {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout( () => {
        this.visible = true
        setDialog()
      }, 800)
    }
  },
  computed: {
    content() {
      const content = this.article.content.replace(/<\/?[\S ]+>/g, '')
      const preString = fillTags(this.text, content, 4, 'strong')
      return preString
    },
    pureContent() {
      return this.article.content
        .replace(/<\/?[\S ]+>/g, '')
        .replace(this.regex, s => this.parseURL(s))
    },
    isActive() {
      return isActive() && isTimeActive()
    }
  },
  mounted() {
    if (isActive() && !getDialogExist()) {
      this.$refs.content.addEventListener('click', e => {
        if (e.target.tagName != "A") return
        this.message()
      }, false)
    }
  }
}
</script>

<style lang="css" scoped>
  @import url('../globalCSS/article.css');
</style>