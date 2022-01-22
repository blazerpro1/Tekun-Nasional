import Vue from 'vue'
import VueRouter from 'vue-router'
import Mainmenu from '../views/Home.vue'
import Notification from '../views/notificationList'
import Application from '../views/applyLoans'
import Loans from '../views/checkLoans'
import Appeal from '../views/Appeal'
import Login from '../views/Login'
import Register from '../views/signUp'
import ForgotPassword from '../views/forgotPassword'
import ForgotPassword2 from '../views/forgotPassword2'
import test from '../views/testing'
import store from '@/store/store'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main menu',
    component: Mainmenu,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/notification',
    name: 'notification list',
    component: Notification,
    meta: {
      requiresAuth: true
    }

  },
  {
    path: '/application',
    name: 'loan application',
    component: Application,
    meta: {
      requiresAuth: true
    }

  },
  {
    path: '/loans',
    name: 'check loans',
    component: Loans,
    meta: {
      requiresAuth: true
    }

  },
  {
    path: '/appeal',
    name: 'loan appeal',
    component: Appeal,
    meta: {
      requiresAuth: true
    }

  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    // meta: { hideNavigation: true }

  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    // meta: { hideNavigation: true } "this.$store.dispatch('setToken', null)" written in App.vue beside navbar

  },
  {
    path: '/forgotPassword',
    name: 'ForgotPassword',
    component: ForgotPassword,

  },
  {
    path: '/test',
    name: 'test',
    component: test,
  },
  {
    path: '/forgotPassword2',
    name: 'forgotPassword2',
    component: ForgotPassword2,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.isUserLoggedIn) {
      next({ name: 'Login' })
    } else {
      next() // go to wherever I'm going
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
})

export default router
