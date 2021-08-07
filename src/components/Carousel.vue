<template>
  <div class="right-item">
    <el-carousel :interval="6000" arrow="hover" indicator-position="none" :height="'20rem'">
      <el-carousel-item v-for=" member in memberArray" :key="member.name" class="carousel-item">
        <a :href="'https://space.bilibili.com/' + member.href">
        <div class="member-info" 
          :style="{backgroundColor: member.color}"  
        >
          <div class="avtar">
            <img referrerpolicy="no-referrer" class="avtar-img"
              :data-src="member.imgPath + '@128w_128h_1o.webp'"
              :data-apple-src="member.imgApplePath" 
              :alt="member.name" 
            > 
          </div>
          <div class="member-name">
            {{member.name}}
          </div>
        </div>
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  props: {
    memberArray: Array
  },
  methods: {
    lazyLoad(target, isApple) {
      const io = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const img = entry.target
            const src = isApple ? 
              img.getAttribute('data-apple-src') : img.getAttribute('data-src')
            img.setAttribute('src', src)
            io.unobserve(entry.target)
          }
        });
      }, {
        root: null,
        threshold: [0],
        rootMargin: '-50px'
      })
      io.observe(target)
    },
    isApple() {
      const ua = navigator.userAgent
      const platform = navigator.platform
      return (
        !(/chrome/i).test(ua) && (/safari/i).test(ua) &&
          !(/(win|linux)/i).test(platform)
      )
    }
  },
  mounted() {
    const imgs = [...document.querySelectorAll('.avtar-img')]
    const isApple = this.isApple()
    imgs.forEach(i => {
      this.lazyLoad(i, isApple)
    })
  }
}
</script>

<style lang="css" scoped>
  a, a:hover {
    @apply no-underline text-white;
  }

  .carousel-item h3 {
    @apply text-center bg-black p-0;
  }
  .member-info {
    @apply pt-12 m-0 w-full h-full rounded-lg;
  }

  .avtar {
    @apply w-40 h-40 m-auto rounded-full border-2 overflow-hidden;
    @apply bg-white;
  }

  .avtar img {
    @apply h-full;
  }

  .member-name {
    @apply m-8 font-bold text-center text-gray-200 text-3xl
  }
</style>