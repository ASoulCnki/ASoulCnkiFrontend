<template>
  <div class="rank-panel">
    <div class="nav">
      枝江作文展
    </div>
    <div class="main-container">
      <div class="left-content">
        <div class="filter-content">
          <div class="filter-content-mian">
            <div class="filter-tag">
              <div class="filter-content-text">筛选方式</div>
              <div class="filter-result-item mb-1" v-for="i in stateSelect" :key="i.text">
                {{ i.text }}
              </div>
            </div>
            <span class="filter-button" @click="selectVisible = !selectVisible">
              <span class="iconfont icon-guolv mr-1">筛选</span>
            </span>
          </div>
          <RankSelect 
            :choices="choices"
            :visible="selectVisible"
            @values="getSelectData"
          />
        </div>
        <RankArticle v-for="i in response.articles" :article="i" :key="i.replyId" :markArray="stateSelect.keywords"/>
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
      <RankRightContent :endTime="response.timeRange[1]" :scrollVisible="scrollVisible"/>
    </div>
  </div>
</template>

<script>
import RankArticle from '../components/rank/rankArticle.vue'
import RankSelect from '../components/rank/rankSelect.vue'
import RankRightContent from '../components/rank/rankRightContent.vue'
import throttle from "throttle-debounce/throttle";
import { debounce, request } from '../utils/'
import { filters } from '../config/'

export default {
  name: 'rank',
  components: {
    RankArticle,
    RankSelect,
    RankRightContent,
  },
  data() { 
    return {
      choices: filters,
      stateSelect: {},
      selectVisible: false,
      pageNum: 1,
      totalPage:1,
      response: {
        allCount: 0,
        timeRange: [0, '2021-07-25 00:00:00'],
        articles: []
      },
      timer: null,
      scrollVisibleHeight: 1000,
      scrollVisible: false,
    }
  },
  methods: {
    getSelectData(newVal) { 
      this.stateSelect = newVal
      this.selectVisible = false
    },
    getData() {
      request.call(this, arguments)
    },
    debounce,
  },
  mounted() {
    document.title = "枝江作文展"
    const select = {}
    this.choices.forEach(s => {
      const val = s.type != "multi" ? s.options[0] : { text: "全部", value: ''}
      select[s.filterAttr] = val
    })
    this.stateSelect = select

    const debounce = (fn, delay) => {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => fn(), delay)
    }

    document.addEventListener('keydown', e => {
      if (e.key == "ArrowRight" && this.pageNum < this.totalPage) {
        debounce(() => this.pageNum++, 700)
      }
      if (e.key == "ArrowLeft" && this.pageNum > 1) {
        debounce(() => this.pageNum--, 700)
      }
    })
    this.initScroll();
  },
  beforeDestroy() {
    this.$el.removeEventListener('scroll', this.scrollHandler);
  },
  watch: {
    pageNum(newVal) {
      if (newVal > this.totalPage) {
        return this.pageNum = this.totalPage
      }
      if (newVal < 1) {
        return this.pageNum = 1
      }
      this.scrollBackTop();
      this.getData()
    },
    stateSelect(newVal, oldVal) {
      if (JSON.stringify(newVal) == JSON.stringify(oldVal)) return
      if (1 === this.pageNum) {
        this.getData();
      } else {
        this.pageNum = 1;
      }
    }
  }
}
</script>

<style lang="css" scoped>
html, body {
  min-width: 375px;
  @apply h-full;
  @apply bg-gray-200;
  @apply dark:bg-gray-800;
}

.rank-panel {
  @apply m-0 p-0 text-2xl h-full mx-auto w-full bg-gray-200 overflow-hidden;
  @apply dark:bg-gray-800;
  min-width: 350px;
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
  @apply dark:bg-gray-800;
}

.left-content {
  @apply box-border p-4 bg-blue-300;
  @apply md:w-4/5 md:mx-auto lg:float-left lg:w-3/5;
  @apply md:my-5 md:rounded-md lg:mb-64;
  @apply dark:bg-gray-600;
}

.filter-content {
  @apply p-2 bg-white mt-2 mb-4 overflow-auto rounded-md;
  @apply dark:bg-gray-700 dark:text-gray-300;
}

.filter-content-mian {
  height: 27px;
  @apply overflow-hidden;
}

.filter-tag {
  width: calc(100% - 70px);
  height: 27px;
  @apply inline-block overflow-hidden;
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
  @apply box-border float-right p-1 pb-0 rounded-md border;
  @apply hover:bg-blue-400 hover:text-gray-100 transition;
  @apply cursor-pointer;
}

.page-input {
  @apply w-14 text-center h-12 py-2 mx-2 rounded-md;
  @apply dark:bg-gray-500 dark:text-gray-300;
}

.button-panel {
  @apply flex justify-center rounded-md mt-2;
  @apply dark:text-gray-400 dark:bg-gray-600;
}

.button {
  @apply py-2 px-3 m-2 bg-white text-black rounded-md border-0;
  @apply hover:scale-110 hover:bg-gray-100 transition;
  @apply dark:bg-gray-700 dark:text-gray-400;
}

.page-num {
  @apply w-auto text-center h-12 py-2 m-2;
  @apply dark:text-gray-400;
}

.result-none {
  @apply text-center text-4xl rounded-md py-64 my-2;
  @apply text-gray-500 w-full bg-gray-100;
  @apply dark:text-gray-300 dark:bg-gray-500;
}
</style>