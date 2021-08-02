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
    <div class="content-detail ">
      {{article.content}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Article',
  props: {
    article: Object
  }
}
</script>

<style lang="css" scoped>
  @import url('../globalCSS/article.css');
</style>