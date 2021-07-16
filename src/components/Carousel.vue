<template>
  <div class="right-item">
    <el-carousel :interval="5000" arrow="hover" indicator-position="none">
      <el-carousel-item v-for=" item in 6" :key="item" class="carousel-item">
        <div class="member-info">
          {{ item }}
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  components: {
    
  },
  data() { 
    return {
      
    }
  },
  methods: {
    
  }
}
</script>

<style lang="css" scoped>
  .carousel-item h3 {
    text-align: center;
    background: #000;
  }
  .member-info {
    background: rgb(105, 163, 230);
    width: 100%;
    height: 300px;
  }
</style>