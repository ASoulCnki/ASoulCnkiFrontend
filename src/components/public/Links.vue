<template>
  <div class="right-footer">
    <div class="footer-links">
      <p>关于项目</p>
      <a href="https://github.com/ASoulCnki" target="_blank">项目地址</a>
      <a href="https://github.com/ASoulCnki/ASoulCnkiBackend/blob/master/api.md" target="_blank">API文档</a>
    </div>
      <div class="footer-links">
      <p>联系我们</p>
      <a href="https://space.bilibili.com/1809170490/" target="_blank">
        <span class="iconfont icon-bilibili-line text-blue-500"> BiliBili</span>
      </a>
      <a href="https://github.com/ASoulCnki" target="_blank">
        <span class="iconfont icon-github text-black dark:text-gray-200"> GitHub</span>
      </a>
      <a href="https://t.bilibili.com/542031663106174238" target="_blank">主站反馈</a>
      <a href="https://t.bilibili.com/551286754984977322" target="_blank">作文展反馈</a>
    </div>
    <div class="footer-links">
      <p>友情链接</p>
      <a href="https://asoul.cloud/" target="_blank">一个魂的二创</a>
      <a href="https://asoulbook.top/" target="_blank">枝江方言词典</a>
      <a href="https://asoulwiki.com/" target="_blank">一个魂WIKI</a>
      <a href="https://www.asdb.live/" target="_blank">ASoul DB</a>
      <a href="https://asoulfan.com/" target="_blank">ASoulFan</a>
    </div>
  </div>
</template>

<style scoped>
.right-footer {
  @apply flex justify-center w-full text-gray-400 divide-x text-2xl;
}

.footer-links { @apply box-border w-1/3 text-center mb-10; }

.footer-links a, p { @apply py-2 block; }

.footer-links a {
  @apply text-gray-500 dark:text-gray-400 hover:underline;
}

.footer-links a, span { @apply text-xl; }

.footer-links p {
  min-width: 60px;
  @apply text-gray-500 font-semibold dark:text-gray-400 text-2xl;
}
</style>