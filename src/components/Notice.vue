<template>
  <div class="notify"
    :style="{backgroundColor:backgroundColor, color: color}"  
  >
    <div class="notify-left">
      <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3124"><path d="M896 128H128a32 32 0 0 0-32 32v576a32 32 0 0 0 32 32h288v-64H160V192h704v512h-256c-8.832 0-16.832 3.584-22.656 9.376l-159.968 160 45.248 45.248L621.248 768H896a32 32 0 0 0 32-32V160a32 32 0 0 0-32-32" fill="#181818" p-id="3125"></path><path d="M560 448a48 48 0 1 0-95.968-0.032A48 48 0 0 0 560 448M240 448a48 48 0 1 0 95.968 0.032A48 48 0 0 0 240 448M784 448a48 48 0 1 0-95.968-0.032A48 48 0 0 0 784 448" fill="#181818" p-id="3126"></path></svg>
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
    @apply w-full h-16 px-4 mb-4 text-white text-2xl leading-loose;
    @apply rounded-lg overflow-hidden bg-yellow-500;
  }

  .icon {
    @apply w-16 h-16 py-3;
  }
  .icon path {
    fill: white;
  }

  .notify-left, .notify-right {
    line-height: 4rem;
    font-size: 1.8rem;
    @apply float-left box-border;
  }

  .notify-left {
    @apply w-16;
  }

  .notify-right {
    width: calc(100% - 4rem);
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

</style>