<template>
  <div class="article">
    <div class="article-header">
      <div class="user inline">
        <span class="iconfont icon-yonghu mr-1"></span>
        <a :href="'https://space.bilibili.com/' + article.author.id" target="_blank" class="hover">
          <span class="hidden sm:inline">{{ article.author.name }}</span>
          <span class="sm:hidden">{{ article.author.name.substr(0,4) + '...' }}</span>
        </a>
        <span class="text-green-500 px-2" v-if="article.originReplyId == -1">[原创|原偷]</span>
      </div>
      <div class="right-button text-blue-500 hover">
        <a :href="article.url" target="_blank"><span class="iconfont icon-lianjie" />链接</a>
      </div>
      <div class="right-button hover pr-2 copy" @click="copy">
        <span class="iconfont icon-fuzhi" />复制
      </div>
    </div>
    <div class="article-text">{{ article.content }}</div>
    <div class="article-footer">
      <div class="footer-attr">
        <span class="iconfont icon-dianzan_active" />{{ article.totalLikeSum }}
      </div>
      <div class="footer-attr">
        <span class="iconfont icon-dianzan" />{{ article.likeNum }}
      </div>
      <div class="footer-attr">
        <span class="iconfont icon-yinyong" />{{ article.similarCount }}
      </div>
      <div class="footer-attr">
        <span class="iconfont icon-shijian" />{{ article.createTime }}
      </div>
    </div>
  </div>
</template>

<script>
import clipboard from 'clipboard'

export default {
  name: 'RankArticle',
  props: {
    article: Object,
  },
  methods: {
    notify(message, type="success") {
      this.$message({showClose: true, message, type})
    },
    copy() {
      const clip = new clipboard('.copy', { text: () => this.article.content })
      .on('success', () => {
        this.notify('复制成功，适度玩梗捏')
        clip.destroy()
      })
      .on('error', () => message('复制失败', 'error') )
    }
  }
}
</script>

<style scoped>
.article {
  @apply w-full p-2 mx-auto text-lg mt-3 mb-4 border border-gray-200 dark:border-gray-800;
  @apply bg-gray-100 text-gray-600 rounded-md shadow-md;
  @apply dark:text-gray-400 dark:bg-gray-700; 
}

.article-header { @apply p-1 pb-2 divide-x text-2xl; }

.right-button { @apply inline float-right pl-2 cursor-pointer; }

.hover {
  @apply cursor-pointer hover:text-blue-400 dark:hover:text-yellow-500;
}

.article-text {
  @apply p-2 rounded-md;
  @apply text-2xl leading-relaxed break-all whitespace-pre-wrap;
  @apply bg-gray-200 dark:bg-gray-800 dark:text-gray-400;
}

.article-footer { @apply grid grid-cols-2 md:grid-cols-4 pt-2; }

.footer-attr {
  @apply text-left text-2xl font-mono pl-1;
  @apply dark:hover:text-gray-300 hover:text-gray-800;
}

.footer-attr .iconfont { @apply mx-2; }

</style>