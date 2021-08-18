<template>
  <div class="notify"
    :style="{backgroundColor:backgroundColor, color: color}"  
  >
    <div class="notify-left">
      <span class="iconfont icon-xiaoxi_huaban text-4xl -ml-1"></span> 
    </div>
    <div class="notify-right" ref="box">
      <div class="notify-right-container" ref="container">
        <div class="notify-text" ref="text">
          <span v-for="(notice, index) in content" :key="index">
            <a :href="notice.url" v-if="notice.url" :style="{color:color}"><span>{{ notice.message }}</span></a>
            <span v-else>{{ notice.message }}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Notice',
  props:{
    color: {
      type: String,
      default: () => '#fafafa'
    },
    backgroundColor: {
      type: String,
      default: () => 'rgba(245, 132, 27, 0.863)'
    },
    content: Array
  },
  data() {
    return {
      isScrolling: false,
      animate: null
    }
  },
  methods: {
    start() {
      const [ box, text ] = [ this.$refs.box, this.$refs.text]
      let [ textWidth, boxWidth ] = [ text.offsetWidth, box.offsetWidth ]

      const toScrollLeft = () => {
        const oldVal = box.scrollLeft
        if (textWidth > boxWidth) {
          box.scrollLeft++
          if (oldVal == box.scrollLeft) { box.scrollLeft = 0 }
        }
        if (this.isScrolling) {
          this.animate = requestAnimationFrame(toScrollLeft)
        } else {
          box.scrollLeft = 0
          cancelAnimationFrame(this.animate)
        }
      }

      if (textWidth < boxWidth) {
        this.isScrolling = false
      }
      
      text.classList.add('notify-text-padding')
      textWidth = text.offsetWidth
      this.isScrolling = true
      this.animate = requestAnimationFrame(toScrollLeft)
    },
    stop() {
      
    }
  },
  mounted() {
    window.onresize = () => {
      if (!this.isScrolling) {
        this.start()
      }
    }
    window.onload = () => {
      setTimeout(this.start, 500)
    }
  }
}
</script>

<style lang="css" scoped>
  .notify {
    @apply w-full h-16 px-4 mb-4 text-white text-3xl leading-loose;
    @apply rounded-lg overflow-hidden bg-yellow-500;
  }

  .notify-left, .notify-right {
    line-height: 4rem;
    @apply float-left box-border;
  }

  .notify-left {
    @apply w-10;
  }

  .notify-right {
    width: calc(100% - 2.5rem);
    word-break: none;
    @apply tracking-widest overflow-hidden whitespace-nowrap;
  }
  
  .notify-text {
    @apply inline;
  }

  .notify-text-padding {
    @apply w-full;
    padding: 0 80%;
  }

  .notify-text-padding span {
    margin: 0 20%;
    @apply text-left m-auto;
  }

  .iconfont {
    @apply text-4xl
  }
</style>