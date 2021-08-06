<template>
  <div class="w-full p-2 px-5 break-all md:px-16">
    <p class="activity-content">
      恭喜你触发了乃琳生日彩蛋😈，查重页所有的正文链接都会跳转到乃琳的视频(作文展链接不受影响)，点击下面的按钮关闭彩蛋，<b class="text-blue-500">刷新页面</b>后生效
    </p>
    <p class="activity-content">(彩蛋只有今天生效)</p>
    <div class="w-full flex justify-center mt-10 mb-10 space-x-8">
      <button class="button bg-blue-500" @click="close">关闭彩蛋</button>
      <button class="button bg-green-500">
        <a class="text-white" href="https://live.bilibili.com/22625027">去直播间</a>
      </button>
    </div>
  </div>
</template>

<script>
import { disableActive } from '../../utils' 
export default {
  methods: {
    close() {
      disableActive()
      this.$message({
        showClose: true,
        message: "彩蛋已关闭，刷新页面生效",
        type: 'success'
      })
    }
  }
}
</script>

<style lang="css" scoped>
  .activity-content {
    @apply text-2xl text-center tracking-wide leading-loose my-2;
  }

  .button {
    @apply text-2xl rounded-lg px-6 py-3;
    @apply text-gray-50;
  }
</style>