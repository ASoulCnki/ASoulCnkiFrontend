<template>
  <div class="activity">
    <p class="activity-content">
      目前筛选提供 4 种筛选方式
      <ol>
        <li>⏱️按时间筛选</li>
        <li>📝排序方式(总点赞数，点赞数，引用数)</li>
        <li>👧按Asoul成员筛选</li>
        <li>🔎关键词搜索</li>
      </ol>

      其中 
      按成员筛选支持多选
      <br>
      关键词搜索支持<b> 0-3 </b>个<b>10字以内</b>的关键词
      <br>
      多关键词请使用<b>一个或多个空格</b>分隔开
      <br>
      后续将开放更多筛选方式供大家使用
    </p>
    <p class="activity-content imp">本通知仅自动弹出一次，后续可从屏幕右下角(移动端为右上角)🎉按钮打开该通知</p>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
  ol {
    @apply list-disc pl-10 py-4;
  }

  .activity {
    @apply w-full p-2 px-5 break-all md:px-16;
  }

  .activity-content {
    @apply text-2xl tracking-wider leading-relaxed mb-2;
  }

  .imp {
    @apply font-bold text-blue-500 dark:text-yellow-500;
  }
</style>