<template>
  <div class="select-content">
    <div class="my-3" v-for="(choice, index1) in choices" :key="choice.filterName">
      <p class="px-3 font-bold mt-2">{{ choice.filterName }}</p>
      <hr class="m-3">
        <div class="inline-block overflow-hidden"
          v-for="(option, index) in choice.options" 
          :key="option.value"
        >
          <label class="overflow-auto" :for="'radio'+ index + '' + index1">
            <input type="radio"
              v-model="datas[index1]"
              :name="choice.filterName" 
              :id="'radio' + index + '' + index1"
              :value="option.value"
              class="hidden radio">
            <div class="option-label">{{ option.text }}</div>
          </label>
        </div>
    </div>
    <div class="button-panel">
      <button class="button reset" @click="reset">重置</button>
      <button class="button submit" @click="submit">确定</button>
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
      const caches = {}
      this.choices.forEach( (item, index) => {
        caches[item.filterAttr] = item.options[this.datas[index]]
      })
      this.$emit('values', caches)
    }
  }
}
</script>

<style lang="css" scoped>

.radio:checked ~ .option-label {
  @apply bg-blue-500 text-white;
}

.select-content {
  @apply p-1 px-5 py-4 bg-gray-100 m-0;
  @apply dark:bg-gray-600 dark:text-gray-300;
}

.option-label {
  @apply m-2 pt-2 p-1 px-6 border transition;
  @apply bg-gray-50 rounded-lg text-gray-600;
  @apply dark:bg-gray-500 dark:text-gray-300;
}

.button-panel {
  @apply flex justify-center p-3 mt-8 text-white font-bold;
}

.button {
  @apply rounded-lg px-8 p-2 mx-5 transition;
}

.submit {
  @apply bg-blue-500 hover:bg-blue-400;
}

.reset {
  @apply bg-yellow-500 hover:bg-yellow-400;
}

</style>
