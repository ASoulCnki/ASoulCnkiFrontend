<template>
  <div class="m-0 p-0 dark:bg-gray-700 text-2xl">
    <div class="box-border text-3xl w-full px-6 lg:px-10 py-4 border-0 bg-blue-400 text-gray-200 dark:bg-gray-700 dark:text-gray-100">
      枝网评论展
      <!-- 说明里需要加上对应通知（弹框形式） -->
      <span class="float-right">说明</span>
    </div>
    <!-- 选择查询类型 需要改为模态框 预期从最下方弹上来-->
    <RankSelect @value="getData"/>
    <div class="main-container text-2xl">
      <!-- left content -->
      <div class="left md:float-left md:w-3/5 p-4 my-5 mx-4 lg:mx-8 lg:mb-64 bg-blue-300 box-border rounded-md shadow-xl dark:bg-gray-600">
        <div class="filter-content p-2 bg-white mt-2 mb-4 overflow-auto rounded-md dark:bg-gray-600 dark:text-gray-300 ">
          <span class="box-border float-right p-1 px-2 rounded-md border hover:bg-blue-400 hover:text-gray-100 transition">筛选</span>
        </div>
        <RankArticle v-for="i in 10" :key="i"/>
        <div class="page-changer flex justify-center">          
          <span 
            v-for="i in 8"
            :key="i"
            class="py-2 px-3 m-2 bg-white rounded-md hover:scale-110 hover:bg-gray-100 transition"
          >{{i}}</span>
        </div>
      </div>
      <!-- right content -->
      <div class="box-border md:float-left md:w-1/3 m-5">
        <div class="box-border w-full p-3 border-gray-400 border rounded-md shadow-md">
          <!-- 站点信息 描述等 -->
          <h2 class="text-4xl pb-4 pt-2">枝网评论展</h2>
          <p class="whitespace-pre-wrap leading-relaxed">这里是站点的描述信息</p>
        </div>
        <hr class="font-thin h-0 bg-gray-400 m-3 my-10">
        <p class="text-center">枝网项目组 © 版权所有</p>
      </div>
    </div>
  </div>
</template>

<script>
import RankArticle from '../components/rank/rankArticle.vue'
import RankSelect from '../components/rank/rankSelect.vue'
export default {
  name: 'rank',
  components: {
    RankArticle,
    RankSelect
  },
  data() { 
    return {
      stateSelect: []
    }
  },
  methods: {
    getData(newVal) { this.stateSelect = newVal },
  }
}
</script>

<style lang="css" scoped>
html, body {
  min-width: 375px;
}
</style>