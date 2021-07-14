import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css';

if (process.env.NODE_ENV === 'production') {
  const {mockXHR} = require('../mark')
  mockXHR()
}
Vue.use(Element, {
  size: 'medium'
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
