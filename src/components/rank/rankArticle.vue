<template>
  <div class="article-item">
    <div class="item-head p-2">
      <span class="py-3">
        <span class="iconfont icon-yonghu"></span>
        <a
          :href="'https://space.bilibili.com/' + article.author.id"
          class="url" target="_blank"
          :title="article.author.name"
        >
          <span class="sm:hidden">{{ authorName }}</span>
          <span class="hidden sm:inline">{{ article.author.name }}</span>
        </a>
      <span
        class="py-3 text-red-500 font-bold dark:text-yellow-500"
        title="鉴定为[原创/原偷],请根据情况自行判断是否属实"
        v-if="article.originReplyId < 0"
      >
        [原创/原偷]
      </span>
      </span>
      <span class="float-right">
        <a :href="article.url" target="_blank" class="url">
          <span class="iconfont icon-lianjie">传送门</span>
        </a>
      </span>
      <span 
        title="一键偷走" class="copy" 
        :id="'copy' + article.replyId + article.id"
      >
        复制
      </span>
    </div>
    <!-- <div class="article-content" v-if="markedText" v-html="content"></div>
    <div class="article-content" v-else>{{ article.content }}</div> -->
    <div class="article-content">{{ article.content }}</div>

    <div class="article-footer">
      <span class="mt-1" title="累计点赞数">
        <span class="iconfont icon-dianzan_active"></span>
        {{article.totalLikeSum}}
      </span>
      <span class="mt-1" title="点赞数">
        <span class="iconfont icon-dianzan"></span>
        {{article.likeNum}}
      </span>
      <span class="mt-1" title="引用数">
        <span class="iconfont icon-yinyong"></span>
        {{article.similarCount}}
      </span>
      <span class="mt-1" title="发布时间">
        <span class="iconfont icon-shijian"></span>
        {{ article.createTime }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RankArticle',
  props: {
    article: Object,
    markArray: {
      default: () => []
    },
  },
  data() {
    return {
      clipboard: null
    }
  },
  methods: {
    notify(s, type) {
      this.$message({showClose: true, message: s, type: type})
    }
  },
  computed: {
    authorName() {
      const name = this.article.author.name
      return name.length <= 6 ? name : name.substr(0, 5) + '...'
    },
    markedText() {
      return this.markArray.value.length > 0 
      // return this.marked && this.markArray.length > 0 
    },
    content() {
      let content = this.article.content;
      const arr = this.markArray.value.split(',').sort((a, b) => b.length - a.length)
      for (const regex of arr) {
        content = content.replaceAll(regex, s => `<span class="marked">${s}</span>`)
      }
      return content
    }
  },
  mounted() {
    let clipboard = new ClipboardJS('#copy' + this.article.replyId + this.article.id, {
      text: () => this.article.content
    })
      .on("success", () => {this.notify('复制成功,适度玩梗捏', 'success')})
      .on("error", () => this.notify('复制失败，请手动复制', 'warning'))
    this.clipboard = clipboard
  },
  beforeDestroy() {
    this.clipboard.listener.destroy()
  }
}
</script>

<style scoped>
.article-item {
  @apply w-full p-2 my-4 bg-gray-100 rounded-md overflow-hidden;
  @apply dark:bg-gray-700 dark:text-gray-300;
}

.url {
 @apply text-blue-500 dark:text-blue-300;
}

.copy {
  @apply float-right border px-5 mr-2 rounded-md bg-blue-400 text-white cursor-pointer;
  @apply dark:bg-gray-500 dark:text-gray-200;
  @apply hover:bg-blue-500 transition;
  margin-top: -1px
}

.article-content {
  @apply rounded-md p-4 bg-gray-200;
  @apply dark:bg-gray-800 dark:text-gray-300;
  @apply leading-relaxed whitespace-pre-wrap overflow-hidden;
}

.article-footer {
  @apply text-2xl pt-2 px-2 grid grid-cols-2 lg:grid-cols-4 w-full;
}

.iconfont {
  @apply mx-2;
}
</style>