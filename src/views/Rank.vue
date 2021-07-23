<template>
  <div class="m-0 p-0 dark:bg-gray-700 text-2xl">
    <div class="box-border text-3xl w-full px-6 lg:px-10 py-4 border-0 bg-blue-400 text-gray-200 dark:bg-gray-700 dark:text-gray-100">
      枝网评论展
      <!-- 说明里需要加上对应通知（弹框形式） -->
      <span class="float-right">说明</span>
    </div>
    <!-- 选择查询类型 需要改为模态框 预期从最下方弹上来-->
    <RankSelect :choices="choices" @values="getSelectData" :class="{'hidden':!selectVisible, 'transition':true}"/>
    <div class="main-container text-2xl border-0 rounded-none overflow-hidden 
      dark:bg-gray-700">
      <!-- left content -->
      <div class="left md:float-left md:w-3/5 p-4 shadow-xl bg-blue-300 lg:my-5 lg:mx-8 lg:mb-64  box-border lg:rounded-md  dark:bg-gray-500">
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
        <div class="page-changer flex justify-center">          
          <span 
            class="py-2 px-3 m-2 bg-white rounded-md hover:scale-110 hover:bg-gray-100 transition"
            @click="pageNum--"
          >
            {{'上一页'}}
          </span>
          <input type="text" class="w-20 text-center h-12 py-2 px-3 m-2 rounded-md" v-model.lazy.number="pageNum">
          <span class="w-15 text-center h-12 py-2 px-0 m-2 dark:text-gray-200">共 {{totalPage}} 页</span>
          <span
            class="py-2 px-3 m-2 bg-white rounded-md hover:scale-110 hover:bg-gray-100 transition"
            @click="pageNum++"
            >
            {{'下一页'}}
          </span>
        </div>
      </div>
      <!-- right content -->
      <div class="box-border md:float-left md:w-1/3 m-5">
        <div class="box-border w-full p-3 border-gray-400 border rounded-md shadow-md text-gray-700 dark:text-gray-200">
          <!-- 站点信息 描述等 -->
          <h2 class="text-4xl pb-4 pt-2">枝网评论展</h2>
          <p class="whitespace-pre-wrap leading-relaxed">本项目旨在收录原创（原偷小作文），由于爬取评论区有限，数据不一定准确，仅供娱乐。本榜单定时刷新。</p>
          <h2 class="text-3xl pb-4 pt-2 my-2">名词解释</h2>
          <p class="whitespace-pre-wrap leading-relaxed">点赞数：小作文自身的点赞数</p>
          <p class="whitespace-pre-wrap leading-relaxed">总点赞数：小作文自身的点赞数和被偷的时候的点赞数</p>
          <p class="whitespace-pre-wrap leading-relaxed">引用数：被偷的次数</p>
        </div>
        <hr class="font-thin h-0 bg-gray-400 m-3 my-10">
      </div>
    </div>
  </div>
</template>

<script>
import RankArticle from '../components/rank/rankArticle.vue'
import RankSelect from '../components/rank/rankSelect.vue'
import { request } from '../utils/rank'
export default {
  name: 'rank',
  components: {
    RankArticle,
    RankSelect
  },
  data() { 
    return {
      choices: [
        {
          filterName: '时间范围',
          options: [
            {text: '全部时间', value: 0},
            {text: '本周', value: 1},
            {text: '三天内', value: 2},
          ]
        },
        {
          filterName: '筛选类型',
          options: [
            {text: '总点赞数', value: 0},
            {text: '点赞数', value: 1},
            {text: '引用次数', value: 2},
          ]
        },
      ],
      stateSelect: [],
      selectVisible: false,
      pageNum: 1,
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
      this.getData()
    },
    getData() {
      request.call(this, arguments)
    }
  },
  mounted() {
    document.title = "枝网评论展"

    const select = [...this.choices].map( s => s.options[0])
    this.stateSelect = select

    this.getData()
  },
  watch: {
    pageNum(newVal, oldVal) {
      if (newVal > this.response.allCount/10 || newVal < 1) {
        return this.pageNum = oldVal
      }
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