import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'
import Result from '../views/result.vue'
import Maintaining from '../views/maintaining.vue'
import Rank from '../views/Rank.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/maintaining',
    name: 'maintaining',
    component: Maintaining
  },
  {
    path: '/result',
    name: 'result',
    component: Result
  },
  {
    path: '/rank',
    name: 'rank',
    component: Rank
  },
  {
    path: '*',
    name: 'notFound',
    redirect: '/'
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
