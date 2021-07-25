import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'
import Result from '../views/result.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/result',
    name: 'result',
    component: Result
  },
  {
    path: '/rank',
    name: 'rank',
    component: () => import('../views/Rank.vue')
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
