<template>
  <div class="notify"
    :style="{backgroundColor:backgroundColor, color: color}"  
  >
    <!--  -->
    <div class="notify-left">
      <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3124"><path d="M896 128H128a32 32 0 0 0-32 32v576a32 32 0 0 0 32 32h288v-64H160V192h704v512h-256c-8.832 0-16.832 3.584-22.656 9.376l-159.968 160 45.248 45.248L621.248 768H896a32 32 0 0 0 32-32V160a32 32 0 0 0-32-32" fill="#181818" p-id="3125"></path><path d="M560 448a48 48 0 1 0-95.968-0.032A48 48 0 0 0 560 448M240 448a48 48 0 1 0 95.968 0.032A48 48 0 0 0 240 448M784 448a48 48 0 1 0-95.968-0.032A48 48 0 0 0 784 448" fill="#181818" p-id="3126"></path></svg>
    </div>
    <div class="notify-right" ref="container">
      <marquee behavior="scroll" 
        scrollamount=10
        scrolldelay=60
        onmouseover="this.stop()" 
        onmouseout="this.start()"
      >
        <span v-if="content.url">
          <a 
            :href="content.url" 
            target="_blank"
            :style="{color: color}"
          >
            {{ content.message }}
          </a>
        </span>
        <span v-else>
          {{ content.message }}
        </span>
      </marquee>
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
    content: Object
  }
}
</script>

<style lang="css" scoped>
  a {
    text-decoration: none;
  }

  .icon {
    width: 4rem;
    height: 4rem;
    padding: 0.7rem 0;
  }
  .icon path {
    fill: white;
  }

  .notify-left, .notify-right {
    float: left;
    box-sizing: border-box;
    height: inherit;
    line-height: 4rem;
    font-size: 1.8rem
  }

  .notify-left {
    width: 4rem;
  }

  .notify-right {
    width: calc(100% - 4rem);
    letter-spacing: 0.15rem;
    word-break: break-all;
  }

</style>