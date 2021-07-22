<template>
  <div class="rounded-t-3xl p-1 px-5 pb-4 bg-gray-100 m-0">
    <div class="my-3" 
      v-for="(choice, index1) in choices" 
      :key="choice.filterName"
    >
      <p class="py-1 font-bold mt-8">{{ choice.filterName }}</p>
      <hr class="m-3">
      <div class="space-x-2">
        <div class="inline-block overflow-hidden"
          v-for="(option, index) in choice.options" 
          :key="option.value"
        >
          <label 
            :for="'radio'+ index + '' + index1" 
            class="overflow-auto">
            <input type="radio"
              v-model="datas[index1]"
              :name="choice.filterName" 
              :id="'radio' + index + '' + index1" 
              :value="option.value"
              class="hidden radio">
            <div class="m-2 pt-2 p-1 px-6 bg-gray-50 rounded-lg text-gray-600  border choice transition">
              {{option.text}}
            </div>
          </label>
        </div>
      </div>
    </div>
    <div class="flex justify-center p-3 mt-8 text-white font-bold">
      <button 
        class="rounded-lg px-8 p-2 mx-5 bg-yellow-500 hover:bg-yellow-400 transition"
        @click="reset"
      >
        重置
      </button>
      <button class="rounded-lg px-8 p-2 mx-5 bg-blue-500 hover:bg-blue-400 transition">
        确定
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {
    
  },
  data() { 
    return {
      choices: [
        {
          filterName: '时间',
          options: [
            {text: '全部时间', value: 0},
            {text: '本周', value: 1},
            {text: '三天内', value: 2},
            {text: '选项4', value: 3},
            {text: '选项5', value: 4},

          ]
        },
        {
          filterName: '类型',
          options: [
            {text: '总点赞数', value: 0},
            {text: '点赞数', value: 1},
            {text: '引用次数', value: 2},
          ]
        }
      ],
      datas:Array(10).fill(0)
    }
  },
  methods: {
    reset() {
      this.datas = this.datas.map(item => 0)
    },
    submit() {
      this.$emit('values', this.datas)
    }
  }
}
</script>

<style scoped>
.radio:checked ~ .choice {
  background: hsl(212, 91%, 60%);
  color: white;
}
</style>
