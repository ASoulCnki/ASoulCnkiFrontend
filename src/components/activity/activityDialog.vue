<template>
  <div class="activity">
    <p class="activity-content">
      恭喜你触发了乃琳生日彩蛋😈，查重页所有的正文链接都会跳转到乃琳的视频😈(作文展链接不受影响)，点击下面的按钮关闭彩蛋，<b class="text-blue-500">刷新页面</b>后生效
    </p>
    <p class="activity-content">本通知仅自动弹出一次，后续可从屏幕右下角🎉按钮进入该页面</p>
    <p class="activity-content">(彩蛋只有今天生效)</p>
    <div class="activity-button-panel">
      <button class="button bg-red-500" @click="close" v-if="isActive">关闭彩蛋</button>
      <button class="button bg-blue-500" @click="open" v-else>打开彩蛋</button>
      <button class="button bg-green-500">
        <a class="text-white" target="_blank" href="https://live.bilibili.com/22625027">去直播间</a>
      </button>
    </div>
  </div>
</template>

<script>
import { enableActive ,disableActive, isActive } from '../../utils' 
export default {
  data() {
    return {
      isActive: isActive()
    }
  },
  methods: {
    notify(s, type='success') {
      this.$message({
        showClose: true,
        message: `${s}，刷新页面生效`,
        type: type
      })
    },
    close() {
      disableActive()
      this.notify('彩蛋已关闭')
    },
    open() {
      enableActive()
      this.notify('彩蛋已打开')
    }
  }
}
</script>

<style lang="css" scoped>
  .activity {
    @apply w-full p-2 px-5 break-all md:px-16;
  }

  .activity-content {
    @apply text-2xl text-center tracking-wide leading-loose my-2;
  }

  .activity-button-panel {
    @apply w-full flex justify-center mt-10 mb-10 space-x-8;
  }

  .button {
    @apply text-2xl rounded-lg px-6 py-3;
    @apply text-gray-50;
  }
</style>