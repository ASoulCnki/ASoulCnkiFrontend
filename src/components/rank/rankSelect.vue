<template>
  <div :class="{'select-content': true, 'hidden': !visible}">
    <div class="my-3" v-for="(choice, index1) in choices" :key="choice.filterName">
      <p class="px-3 font-bold mt-2">{{ choice.filterName }}</p>
      <hr class="m-3">
      <div v-if="['single', 'multi'].includes(choice.type)">
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
      <div v-if="['input'].includes(choice.type)">
        <div class="w-full">
          <input type="text" 
            class="w-full outline-none p-2 mx-2"
            placeholder="多个关键词用空格分开，每个词不超过10字"
            v-model="datas[index1]"
          >
          <!-- 待添加清空功能 -->
        </div>
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
        if (s.type == 'multi') return []
        if (s.type == 'input') return ''
        return 0
      })
    },
    submit() {
      const caches = {}
      this.choices.forEach( (item, index) => {
        const data = this.datas[index]
        if (item.type == 'input') {
          const arr = this.handleInput(data)
          const isEmpty = arr.length == 0
          caches[item.filterAttr] = {
            text: isEmpty ? '未选择关键词' : arr.toString(),
            value: isEmpty ? '' : arr.toString()
          }
          this.datas[index] = arr.join(' ')
          return
        }
        if (item.type == 'multi') {
          const isEmpty = data.length == 0 || data.length == item.options.length
          caches[item.filterAttr] = {
            text: isEmpty ? '全部' : item.options.filter(s => data.includes(s.value)).map(s => s.text).toString(),
            value: isEmpty ? '' : data.toString()
          }
        }
        else {
          caches[item.filterAttr] = item.options[data]
        }
      })
      this.$emit('values', caches)
    },
    handleInput(str) {
      if (/^[ ]*$/.test(str)) 
        return []
      return [... new Set(str.split(' '))]
        .filter(s => !(/^[ ]+$/).test(s) && s.length <= 10)
        .sort( (a,b) => a.length - b.length)
        .splice(0, 3)
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
