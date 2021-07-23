<template>
  <div class="p-1 px-5 py-4 bg-gray-100 m-0 dark:bg-gray-600 dark:text-gray-300">
    <div>
      <div class="my-3" 
        v-for="(choice, index1) in choices" 
        :key="choice.filterName"
      >
        <p class="px-3 font-bold mt-2">{{ choice.filterName }}</p>
        <hr class="m-3">
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
      <button
        class="rounded-lg px-8 p-2 mx-5 bg-blue-500 hover:bg-blue-400 transition"
        @click="submit"
      >
        确定
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props:{
    choices: Array
  },
  data() { 
    return {
      datas:Array(this.choices.length).fill(0)
    }
  },
  methods: {
    reset() {
      this.datas = this.datas.map(item => 0)
    },
    submit() {
      const data = [...this.choices].map( (item, index) => {
        return item.options[this.datas[index]]
        // return item.options.filter(item => item.value == this.datas[index])[0]
      })
      this.$emit('values', data)
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
