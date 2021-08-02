<template>
  <div class="content-right">
    <div class="right-top-description right-item">
      <p class="text-red-600 font-bold text-3xl">新功能!枝江作文展
        <a href="/rank" class="text-blue-400">点此进入</a>
      </p>
      <p class="text-2xl leading-loose dark:text-gray-300">
        枝网原班人马打造，我们自己都溜到停不下来的优秀小作文展示平台
      </p>
    </div>
    <div class="right-top-description right-item">
      <h3 class="description-title dark:text-gray-300">
        枝网查重系统介绍
      </h3>   
      <p v-for="item in description" :key="item.key" class="dark:text-gray-300">
        <b>{{item.key}}</b><br/>
        <em v-if="item.type == 'text'" class="description-value">{{item.value}}</em>
        <em v-if="item.type == 'link'">
          <a :href="item.value.href" class="description-value">{{item.value.text}}</a>
        </em>
      </p>
    </div>

    <Carousel :memberArray="person_list"/>
    <hr class="p-0 mb-4 mt-10">
    <p class="text-center text-xl">
      <a class="text-gray-400" href="https://beian.miit.gov.cn/" target="_blank">
        琼ICP备20001476号-2
      </a>
    </p>
  </div>
</template>

<script>
import Carousel from '../Carousel.vue'
import { person_list, description } from '@/config'

export default {
  name: 'RightContent',
  components: {
    Carousel
  },
  data() { 
    return {
      person_list: person_list,
      description: description
    }
  },
}
</script>