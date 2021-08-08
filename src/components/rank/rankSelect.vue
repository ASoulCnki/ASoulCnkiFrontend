<template>
  <div :class="{'select-content': true, 'hidden': !visible}">
    <div class="my-3" v-for="(choice, index1) in choices" :key="choice.filterName">
      <p class="px-3 font-bold mt-2">{{ choice.filterName }}</p>
      <hr class="m-3">
        <div class="inline-block overflow-hidden"
          v-for="(option, index) in choice.options" 
          :key="option.value"
        >
          <label class="overflow-auto" :for="'radio'+ index + '' + index1">
            <input type="checkbox" class="hidden radio" v-if="choice.type == 'multi'"
              :id="'radio' + index + '' + index1" v-model="datas[index1]"
              :value="option.value"
            >
            <input type="radio" class="hidden radio" v-else
              :id="'radio' + index + '' + index1" v-model="datas[index1]"
              :value="option.value" 
            >
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
    choices: Array,
    visible: Boolean
  },
  data() { 
    return {
      datas: []
    }
  },
  methods: {
    reset() {
      this.datas = this.choices.map(s => {
        return (s.type == "multi") ? [] : 0 
      })
    },
    submit() {
      const caches = {}
      this.choices.forEach( (item, index) => {
        if (item.type == 'multi') {
          const data = this.datas[index]
          const isEmpty = data.length == 0 || data.length == item.options.length
          caches[item.filterAttr] = {
            text: isEmpty ? '全部' : item.options.filter(s => data.includes(s.value)).map(s => s.text).toString(),
            value: data.toString()
          }
        }
        else {
          caches[item.filterAttr] = item.options[this.datas[index]]
        }
      })
      this.$emit('values', caches)
    }
  },
  mounted() {
    this.reset()
  }
}
</script>

<style lang="css" scoped>

.radio:checked ~ .option-label {
  @apply bg-blue-500 text-white;
}

.select-content {
  @apply px-5 py-4 bg-gray-100 mt-3 rounded-md transition;
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
