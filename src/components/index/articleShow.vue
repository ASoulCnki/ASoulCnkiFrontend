<template>
  <div class="render-data-list">
    <div class="select-panel" v-if="articles.length > 0">
      <div class="overflow-hidden">
        <span>
        找到 {{articles.length}} 篇相似的小作文
        </span>
        <button 
          class="float-right px-4 rounded-lg bg-blue-400 text-gray-100 dark:bg-yellow-500"
          @click="textMarked = !textMarked"
        >
          {{textMarked ? '关闭' : '打开'}}
        </button>
        <span class="float-right pr-3">标出相似部分</span>
      </div>
    </div>
    <Article 
      v-for="article in articles" 
      :key="article.id"
      :article="article"
      :text="text"
      :textMarked="textMarked"
    />
  </div>
</template>

<script>
import Article from '../article.vue'

export default {
  name: 'articleShow',
  components: {
    Article
  },
  props: {
    articles: Array,
    text:String
  },
  data() { 
    return {
      textMarked: false
    }
  }
}
</script>
