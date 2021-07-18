<template>
  <div class="right-item">
    <el-carousel :interval="6000" arrow="hover" indicator-position="none" :height="'20rem'">
      <el-carousel-item v-for=" member in memberArray" :key="member.name" class="carousel-item">
        <a :href="'https://space.bilibili.com/' + member.href">
        <div class="member-info" 
          :style="{backgroundColor: member.color}"  
        >
          <div class="avtar">
            <img :src="member.imgPath" :alt="member.name" referrerpolicy="no-referrer"> 
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
}
</script>

<style lang="css" scoped>
  a, a:hover {
    text-decoration: none;
    color: white;
  }

  .carousel-item h3 {
    text-align: center;
    background: #000;
    padding: 0;
  }
  .member-info {
    padding: 3rem 0 0 0;
    margin: 0;
    width: 100%;
    height: 100%;
    border-radius: 0.4rem;
  }

  .avtar {
    width: 10rem;
    height: 10rem;
    margin: auto;
    border-radius: 10rem;
    border: 0.3rem solid #fafafa;
    overflow: hidden;
  }

  .avtar img {
    height: 100%;
  }

  .member-name {
    margin: 2rem;
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    color: #fafafa;
  }
</style>