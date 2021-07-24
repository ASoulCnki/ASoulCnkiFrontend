<template>
  <div class="box-border md:float-left md:w-1/3 m-5">
    <div class="box-border w-full p-3 mb-5 border-gray-400 border rounded-md shadow-md text-gray-700 dark:text-gray-200">
      <!-- 站点信息 描述等 -->
      <p class="text-3xl px-4">
        <a href="/">返回枝网查重</a>
        </p>
    </div>
    <div class="box-border w-full p-3 border-gray-400 border rounded-md shadow-md text-gray-700 dark:text-gray-200">
      <!-- 站点信息 描述等 -->
      <h2 class="text-4xl pb-4 pt-2">枝网作文展</h2>
      <p class="whitespace-pre-wrap leading-relaxed">本项目旨在收录原创（原偷小作文），由于爬取评论区有限，数据不一定准确，仅供娱乐。本榜单定时刷新。</p>
      <h2 class="text-3xl pb-4 pt-2 my-2">名词解释</h2>
      <p class="whitespace-pre-wrap leading-relaxed">点赞数：小作文自身的点赞数</p>
      <p class="whitespace-pre-wrap leading-relaxed">总点赞数：小作文自身的点赞数和被偷的时候的点赞数</p>
      <p class="whitespace-pre-wrap leading-relaxed">引用数：被偷的次数</p>
    </div>
    <hr class="font-thin h-0 bg-gray-400 m-3 mt-8 mb-5">
    <div class="flex justify-center text-gray-400 divide-x-2">
      <a href="https://github.com/ASoulCnki" target="_blank" class="px-2">项目地址</a>
    </div>
  </div>
</template>

<script>
export default {
  name:'RankRightContent'
}
</script>
