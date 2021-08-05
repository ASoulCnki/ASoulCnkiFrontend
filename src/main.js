import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from './config/element'
import xss from 'xss'
import "tailwindcss/tailwind.css"

Vue.prototype.xss = xss

Vue.use(Element, {
  size: 'medium'
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
