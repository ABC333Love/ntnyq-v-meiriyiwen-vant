import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home')
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('@/views/Detail')
  },
  {
    path: '*',
    redirect: { name: 'Home' }
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes,
  scrollBehavior () {
    return { y: 0 }
  }
})

export default router
