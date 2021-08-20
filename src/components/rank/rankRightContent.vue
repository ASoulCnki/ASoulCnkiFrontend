<template>
  <div class="right-content">
    <div class="discription">
      <h2 class="text-4xl pb-4 pt-2">枝网作文展</h2>
      <h2 class="text-3xl py-1 text-blue-600 dark:text-yellow-500">
        <span class="iconfont icon-shijian"></span>上次更新时间: {{ endTime }}
      </h2>
      <p class="text">枝网作文展旨在收录原创（原偷小作文），由于爬取评论区有限，数据不一定准确，仅供娱乐。本榜单<span class="high">定期刷新</span>。作文展的收录范围是<span class="high">ASoul的六个官号</span></p>
      <h2 class="py-2">名词解释</h2>  
      <p class="text">
        <span class="iconfont icon-dianzan"></span>点赞数：小作文自身的点赞数
      </p>
      <p class="text">
        <span class="iconfont icon-yinyong"></span>引用数：被偷的次数
      </p>
      <p class="text">枝网<span class="high">鼓励原创小作文和真情实感</span>，故设置<span class="high">"<span class="iconfont icon-dianzan_active"></span>累计点赞数"</span></p>
      <p class="text">即:将<span class="high">所有重复小作文</span>的赞累计到最相似<span class="high">[原创/原偷]</span>小作文上</p>
      <p class="text">当然，我们也不能忽视偷小作文对优秀原创小作文的传播作用，重振小作文荣光，我辈义不容辞！</p>
      </div>
      <div class="discription">
      <h2 class="pb-4 pt-2">问题反馈
        <a href="https://t.bilibili.com/551286754984977322" class="text-blue-400" target="_blank">[传送门]</a>
      </h2>
      <p class="text">如果使用过程中发现问题，欢迎反馈动态评论或私信反馈，联系方式位于<b class="high">页脚</b>，包括但不限于:</p>
      <ol class="text-2xl leading-relaxed font-bold">
        <li>1. 系统BUG</li>
        <li>2. 功能建议</li>
      </ol>
      <p class="text">为了能够快速定位和解决问题，反馈问题请尽可能清楚描述。</p>
      <p class="text">BUG问题请尽可能说明<span class="high-red">系统，机型，浏览器名称等。</span></p>
      </div>
      <div class="discription">
      <p class="text">由于枝网仅收录了<span class="high-red">A-SOUL六个官方账号</span>下的评论，对比范围有限，且算法还比较粗略，所以使用过程中可能会遇到以下情况</p>
      <ol class="text-2xl leading-relaxed font-bold">
        <li>1. 首发b站二创，贴吧，豆瓣，NGA等平台的小作文被偷后鉴定为原创/原偷</li>
        <li>2. 在ASOUL官号下发布的评论有借鉴，但仍被判断为原创/原偷。</li>
      </ol>
      <p class="text">受制于算法精度和评论数据的数量，以上问题我们目前无法解决，请期待后续技术攻关。</p>
    </div>
    <div class="discription">
      <p><a href="/" class="url">返回枝网查重</a></p>
    </div>
    <Links/>
    <div class="active-button" v-if="isActive" @click="visible = true">🎉</div>
    <el-dialog :visible.sync="visible" title="枝江作文展筛选功能正式上线🎉">
      <Dialog/>
    </el-dialog>
  </div>
</template>

<script>
  import { setDialog, getDialogExist } from '../../utils/activity'
  import Dialog from './rankFilterDialog.vue'
  import Links from '../public/Links.vue'

  export default {
    name:'RankRightContent',
    props: {
      endTime: String,
      scrollVisible: { type: Boolean, default: false },
    },
    components: {
      Dialog,
      Links
    },
    data() {
      return {
        visible: false,
        isActive: false
      }
    },
    mounted() {
      if (getDialogExist()) {
        this.isActive = true
        return
      }
      setTimeout(() => this.visible = true, 500)
      setDialog()
    },
  }
</script>

<style scoped>

.right-content {
  @apply md:w-4/5 md:mx-auto px-4;
  @apply box-border lg:float-left lg:w-2/5 my-5 text-3xl lg:pl-6;
  @apply dark:bg-gray-800 dark:text-gray-200;
}

.url {
  @apply dark:text-yellow-400;
}

.discription {
  @apply box-border w-full p-3 mt-0 mb-6 rounded-md shadow-md;
  @apply border-gray-400 border;
  @apply bg-gray-50;
  @apply dark:text-gray-300 dark:bg-gray-700;
}

.text {
  @apply leading-relaxed text-2xl my-2;
}

.high {
  @apply text-blue-600 font-bold;
  @apply dark:text-yellow-500;
}

.high-red {
  @apply text-red-600 font-bold;
  @apply dark:text-yellow-500;
}

.iconfont {
  @apply mr-2;
}
</style>
