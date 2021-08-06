<!--
  用于展示查重后的一篇文章
  author
 -->
<template>
  <div class="content">
    <div class="content-info">
      <ul>
        <li>发表时间 {{article.createTime}}</li>
        <li style="color:#d73a49">重复率: {{article.repeatPercent}}%</li>
        <li>
          作者: 
          <a :href="'https://space.bilibili.com/' + article.author.id" target="_blank">
            {{article.author.name}}
          </a>
        </li>
        <li><a :href="article.url" target="_blank">传送门</a></li>
      </ul>
    </div>
    <div class="content-detail">
      <p v-if="textMarked" v-html="content"></p>
      <p v-else v-html="pureContent"></p>
    </div>
  </div>
</template>

<script>
import { fillTags } from '../utils'

export default {
  name: 'Article',
  props: {
    article: Object,
    text: String,
    textMarked: {
      default: () => true
    }
  },
  data() {
    return {
      regex : /(https?:\/\/|)(b23\.tv\/\S{0,8}|\S+\.bilibili.com\/\S+\d+)/g
    }
  },
  methods: {
    parseURL(s) {
      const x = s.startsWith('https:') ? s : `https://${s}`
      return `<a target="_blank" href="${x}">${s}</a>`
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
    }
  }
}
</script>

<style lang="css" scoped>
  @import url('../globalCSS/article.css');
</style>