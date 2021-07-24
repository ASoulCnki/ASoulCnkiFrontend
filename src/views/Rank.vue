<template>
  <div class="m-0 p-0 dark:bg-gray-700 text-2xl">
    <div class="box-border text-3xl w-full px-6 lg:px-10 py-4 border-0 bg-blue-400 text-gray-200 dark:bg-gray-600 dark:text-gray-100">
      枝江作文展
      <!-- 说明里需要加上对应通知（弹框形式） -->
      <span class="float-right">说明</span>
    </div>
    <RankSelect :choices="choices" @values="getSelectData" :class="{'hidden':!selectVisible, 'transition':true}"/>
    <div class="main-container text-2xl border-0 rounded-none overflow-hidden 
      dark:bg-gray-700">
      <!-- left content -->
      <div class="left md:float-left md:w-3/5 p-4 shadow-xl bg-blue-300 lg:my-5 lg:mx-8 lg:mb-64  box-border lg:rounded-md  dark:bg-gray-700">
        <div class="filter-content p-2 bg-white mt-2 mb-4 overflow-auto rounded-md dark:bg-gray-600 dark:text-gray-300 ">
          <div class="box-border p-1 pl-1 mr-3 rounded-md border border-white inline-block float-left text-gray-600
          dark:text-gray-300 dark:bg-gray-600 dark:border-gray-600">
            筛选方式
          </div>
          <div
            class="box-border p-1 px-2 mr-3 rounded-md border border-gray-400 inline-block float-left"
            v-for="i in stateSelect"
            :key="i.text"
          >
            {{ i.text }}
          </div>
          <span 
            class="box-border float-right p-1 px-2 rounded-md border hover:bg-blue-400 hover:text-gray-100 transition"
            @click="selectVisible = !selectVisible"
            >
            筛选
          </span>
        </div>
        <RankArticle v-for="i in response.articles" :article="i" :key="i.replyId"/>
        <div 
          class="text-center text-4xl text-gray-500 w-full bg-gray-100 rounded-md py-64 my-2"
          v-if="response.articles.length == 0"  
        >
          没有找到相关结果,请尝试重新筛选
        </div>
        <div class="page-changer flex justify-center  dark:text-gray-200 dark:bg-gray-600">          
          <span 
            class="py-2 px-3 m-2 bg-white rounded-md hover:scale-110 hover:bg-gray-100 transition dark:bg-gray-500"
            @click="pageNum--"
          >
            {{'上一页'}}
          </span>
          <span
            class="py-2 px-1 my-2 rounded-md transition"
          >第</span>
          <input type="text" class="w-14 text-center h-12 py-2 m-2 rounded-md dark:bg-gray-500" v-model.lazy.number="pageNum">
          <span
            class="py-2 px-1 my-2 rounded-md transition "
          >页</span>
          <!-- <span
            class="py-2 px-3 m-2 bg-white rounded-md hover:scale-110 hover:bg-gray-100 transition dark:bg-gray-500"
            @click="jump"
          >
            跳转
          </span> -->
          <span class="w-15 text-center h-12 py-2 m-2 dark:text-gray-200">共 {{totalPage}} 页</span>
          <span
            class="py-2 px-3 m-2 bg-white rounded-md hover:scale-110 hover:bg-gray-100 transition dark:bg-gray-500"
            @click="pageNum++"
            >
            {{'下一页'}}
          </span>

        </div>
      </div>
      <!-- right content -->
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
    },
    jump() {
      if (this.pageNum == this.pageNumNow) {
        return
      }
      scrollTo(0, 0)
      this.getData()
      this.pageNumNow = this.pageNum
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
}
</style>