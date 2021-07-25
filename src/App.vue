<template>
  <div id="app" class="dark:bg-gray-700">
    <router-view v-if="isRouterAlive" />
  </div>
</template>
<script>
  export default {
    name: 'App',
    provide: function() {
      return {
        reload: this.reload
      }
    },
    // isRouterAlive控制显示
    data: function() {
      return {
        isRouterAlive: true
      }
    },
    methods: {
      // 刷新方法
      reload: function() {
        this.isRouterAlive = false
        // 该方法会在dom更新后执行
        this.$nextTick(function() { this.isRouterAlive = true })
      }
    }
  }
</script>
