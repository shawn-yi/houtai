import Vue from 'vue'
import VueRouter from 'vue-router'

import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: () => import('@/views/login') },
  { path: '/home',
    name: 'home',
    component: () => import('@/views/home'),
    redirect: '/welcome',
    children: [
      { path: '/welcome', name: 'welcome', component: () => import('@/views/welcome') },
      { path: '/account', name: 'account', component: () => import('@/views/account/account.vue') },
      { path: '/article', name: 'article', component: () => import('@/views/article') },
      { path: '/articleadd', name: 'articleadd', component: () => import('@/views/articleadd/articleadd.vue') },
      { path: '/articleedit/:aid', name: 'articleedit', component: () => import('@/views/articleedit/articleedit.vue') },
      { path: '/material', name: 'material', component: () => import('@/views/material/material.vue') },
      { path: '/fans', name: 'fans', component: () => import('@/views/fans/fans.vue') }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  Nprogress.inc()
  let token = window.sessionStorage.getItem('token')
  if (!token && to.path !== '/login') {
    return next('/login')
  }
  next()
})

router.afterEach(() => {
  Nprogress.done()
})

export default router
