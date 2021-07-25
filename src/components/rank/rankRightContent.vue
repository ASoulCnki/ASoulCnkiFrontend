<template>
  <div class="right-content">
    <div class="discription">
      <h2 class="text-4xl pb-4 pt-2">枝网作文展</h2>
      <p class="text">枝网作文展旨在收录原创（原偷小作文），由于爬取评论区有限，数据不一定准确，仅供娱乐。本榜单定期刷新。</p>
      <h2 class="pb-4 pt-2 my-2">名词解释</h2>
      <p class="text">点赞数：小作文自身的点赞数</p>
      <p class="text">引用数：被偷的次数</p>
      <p class="text">枝网<span class="highlight">鼓励原创小作文和真情实感</span>，故设置<span class="highlight">"累计点赞数(实心赞标志)"</span></p>
      <p class="text">即:将<span class="highlight">所有重复小作文</span>的赞累计到最相似<span class="highlight">[原创/原偷]</span>小作文上</p>
      <p class="text">当然，我们也不能忽视偷小作文对优秀原创小作文的传播作用，重振小作文荣光 我辈义不容辞！</p>
    </div>
    <div class="discription">
      <p><a href="/" class="url">返回枝网查重</a></p>
    </div>
    <hr class="line">
    <div class="right-footer">
      <a href="https://github.com/ASoulCnki" target="_blank" class="px-2">项目地址</a>
    </div>
  </div>
</template>

<script>
  export default {
    name:'RankRightContent'
  }
</script>

<style scoped>

.right-content {
  @apply box-border md:float-left md:w-1/3 m-5 text-3xl;
  @apply dark:bg-gray-700 dark:text-gray-300
}

.url {
  @apply dark:text-yellow-400
}

.discription {
  @apply box-border w-full p-3 mt-0 mb-6 rounded-md shadow-md;
  @apply border-gray-400 border;
  @apply bg-gray-50;
  @apply dark:text-gray-200 dark:bg-gray-600;
}

.text {
  @apply whitespace-pre-wrap leading-relaxed text-2xl my-2;
}

.highlight {
  @apply text-red-500 font-bold;
  @apply dark:text-yellow-500;
}

.line {
  @apply font-thin m-3 mt-8 mb-5 bg-black;
  @apply dark:bg-white
}

.right-footer {
  @apply flex justify-center text-gray-400 divide-x-2 text-2xl;
}
</style>
