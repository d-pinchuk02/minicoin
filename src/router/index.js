import { createRouter, createWebHistory } from 'vue-router'
import firebase from 'firebase/compat/app'

const routes = [
  {
    path: '/',
    name: 'landing',
    meta: { layout: 'landing', titleKey: 'landing.title' },
    component: () => import('../views/Landing.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'empty', titleKey: 'login.title' },
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta: { layout: 'empty', titleKey: 'register.title' },
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: { layout: 'main', auth: true, titleKey: 'home.title' },
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/categories',
    name: 'categories',
    meta: { layout: 'main', auth: true, titleKey: 'categories.title' },
    component: () => import('../views/Categories.vue'),
  },
  {
    path: '/detail/:id',
    name: 'detail',
    meta: { layout: 'main', auth: true, titleKey: 'history.recordTitle' },
    component: () => import('../views/DetailRecord.vue'),
  },
  {
    path: '/history',
    name: 'history',
    meta: { layout: 'main', auth: true, titleKey: 'history.title' },
    component: () => import('../views/History.vue'),
  },
  {
    path: '/planning',
    name: 'planning',
    meta: { layout: 'main', auth: true, titleKey: 'planning.title' },
    component: () => import('../views/Planning.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    meta: { layout: 'main', auth: true, titleKey: 'profile.title' },
    component: () => import('../views/Profile.vue'),
  },
  {
    path: '/record',
    name: 'record',
    meta: { layout: 'main', auth: true, titleKey: 'newRecord.title' },
    component: () => import('../views/Record.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some((record) => record.meta.auth)

  if (!requireAuth && currentUser) {
    return '/dashboard'
  } else if (requireAuth && !currentUser) {
    return '/login?message=login'
  }
})

export default router
