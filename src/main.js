import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from './config/element'
import 'normalize.css/normalize.css'
import "tailwindcss/tailwind.css"

Vue.use(Element, {
  size: 'medium'
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
