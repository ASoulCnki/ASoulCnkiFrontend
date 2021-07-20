import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/index.html',
    name: 'index',
    component: Index
  },
  {
    path: '/m_index',
    name: 'index',
    component: Index
  },
  {
    path: '/m_index.html',
    name: 'index',
    component: Index
  },
  {
    path: '/maintaining',
    name: 'maintaining',
    component: () => import(/* webpackChunkName: "maintaining" */ '../views/maintaining.vue')
  },
  {
    path: '/result',
    name: 'result',
    component: () => import(/* webpackChunkName: "result" */ '../views/result.vue')
  },
  // 兼容旧版本.html
  {
    path: '/maintaining.html',
    name: 'maintaining',
    component: () => import(/* webpackChunkName: "maintaining" */ '../views/maintaining.vue')
  },
  {
    path: '/result.html',
    name: 'result',
    component: () => import(/* webpackChunkName: "result" */ '../views/result.vue')
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
