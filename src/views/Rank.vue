<template>
  <div class="m-0 p-0 dark:bg-gray-700 text-2xl h-full mx-auto w-full bg-gray-200">
    <div class="nav">
      枝江作文展
    </div>
    <RankSelect 
      :choices="choices" 
      @values="getSelectData"
      :class="{'hidden':!selectVisible}"
    />
    <div class="main-container">
      <!-- left content -->
      <div class="left-content">
        <div class="filter-content">
          <div class="filter-content-text">筛选方式</div>
          <div class="filter-result-item" v-for="i in stateSelect" :key="i.text">
            {{ i.text }}
          </div>
          <span class="filter-button" @click="selectVisible = !selectVisible">
            筛选
          </span>
        </div>
        <RankArticle v-for="i in response.articles" :article="i" :key="i.replyId"/>
        <div class="result-none" v-if="response.articles.length == 0">
          没有找到相关结果,请尝试重新筛选
        </div>
        <div class="button-panel">          
          <span class="button" @click="pageNum--">上一页</span>
          <span class="px-1 my-2 rounded-md transition">
            第<input type="text" class="page-input" v-model.lazy.number="pageNum" title="这是个输入框">页
          </span>
          <span class="page-num">共 {{totalPage}} 页</span>
          <span class="button" @click="pageNum++">下一页</span>
        </div>
      </div>
      <RankRightContent/>
    </div>
  </div>
</template>

<script>
import RankArticle from '../components/rank/rankArticle.vue'
import RankSelect from '../components/rank/rankSelect.vue'
import RankRightContent from '../components/rank/rankRightContent.vue'
import { request } from '../utils/rank'
import { filters } from '../config/index'

export default {
  name: 'rank',
  components: {
    RankArticle,
    RankSelect,
    RankRightContent
  },
  data() { 
    return {
      choices: filters,
      stateSelect: {},
      selectVisible: false,
      pageNum: 1,
      pageNumNow: 0,
      totalPage:1,
      response: {
        allCount: 0,
        timeRange: [0, 0],
        articles: []
      }
    }
  },
  methods: {
    getSelectData(newVal) { 
      this.stateSelect = newVal
      this.selectVisible = false
    },
    getData() {
      request.call(this, arguments)
    }
  },
  mounted() {
    document.title = "枝江作文展"
    const select = {}
    this.choices.forEach(s => select[s.filterAttr] = s.options[0])
    this.stateSelect = select
  },
  watch: {
    pageNum(newVal) {
      if (newVal > this.totalPage) {
        return this.pageNum = this.totalPage
      }
      if (newVal < 1) {
        return this.pageNum = 1
      }
      scrollTo(0, 0)
      this.getData()
    },
    stateSelect(newVal, oldVal) {
      if (JSON.stringify(newVal) == JSON.stringify(oldVal)) return
      this.pageNum = 1
      this.getData()
    }
  }
}
</script>

<style lang="css" scoped>
html, body {
  min-width: 375px;
  @apply h-full;
  @apply bg-gray-200;
  @apply dark:bg-gray-600;
}

.nav {
  @apply box-border text-3xl w-full px-6 py-4 border-0 ;
  @apply bg-blue-400 text-gray-200;
  @apply lg:px-10;
  @apply dark:bg-gray-700 dark:text-gray-200;
}

.main-container {
  @apply text-2xl border-0 rounded-none overflow-hidden min-h-full;
  @apply xl:w-5/6 lg:mx-auto md:px-6;
  @apply bg-gray-200;
  @apply dark:bg-gray-700;
}

.left-content {
  @apply box-border p-4 shadow-xl bg-blue-300;
  @apply md:w-4/5 md:mx-auto lg:float-left lg:w-3/5;
  @apply md:my-5 md:rounded-md lg:mb-64;
  @apply dark:bg-gray-600;
}

.filter-content {
  @apply p-2 bg-white mt-2 mb-4 overflow-auto rounded-md;
  @apply dark:bg-gray-700 dark:text-gray-300;
}

.filter-content-text {
  @apply box-border p-1 pl-1 mr-3 inline-block float-left text-gray-600;
  @apply rounded-md border border-white;
  @apply dark:text-gray-300 dark:bg-gray-600 dark:border-gray-600;
}

.filter-result-item {
  @apply box-border p-1 px-2 mr-3 rounded-md inline-block float-left;
  @apply border border-gray-400;
}

.filter-button {
  @apply box-border float-right p-1 px-2 rounded-md border;
  @apply hover:bg-blue-400 hover:text-gray-100 transition;
  @apply cursor-pointer;
}

.page-input {
  @apply w-14 text-center h-12 py-2 mx-2 rounded-md;
  @apply dark:bg-gray-500;
}

.button-panel {
  @apply flex justify-center rounded-md mt-2;
  @apply dark:text-gray-200 dark:bg-gray-600;
}

.button {
  @apply py-2 px-3 m-2 bg-white text-black rounded-md border-0;
  @apply hover:scale-110 hover:bg-gray-100 transition;
  @apply dark:bg-gray-500 dark:text-gray-300 dark:hover:bg-gray-400;
}

.page-num {
  @apply w-auto text-center h-12 py-2 m-2;
  @apply dark:text-gray-200;
}

.result-none {
  @apply text-center text-4xl rounded-md py-64 my-2;
  @apply text-gray-500 w-full bg-gray-100;
  @apply dark:text-gray-300 dark:bg-gray-500;
}
</style>