<template>
  <div id="app" class="dark:bg-gray-700">
    <keep-alive>
      <router-view v-if="isRouterAlive" />
    </keep-alive>
      <div class="return-top" @click="toTop">
        <span class="iconfont icon-top"/>
      </div>
  </div>
</template>
<script>
  export default {
    name: 'App',
    provide() {
      return {
        reload: this.reload
      }
    },
    // isRouterAlive控制显示
    data() {
      return {
        isRouterAlive: true
      }
    },
    methods: {
      // 刷新方法
      reload() {
        this.isRouterAlive = false
        // 该方法会在dom更新后执行
        this.$nextTick(function() { this.isRouterAlive = true })
      },
      toTop() {
        scrollTo(0, 0)
      }
    }
  }
</script>