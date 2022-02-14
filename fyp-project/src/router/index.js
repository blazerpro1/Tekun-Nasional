import Vue from 'vue'
import VueRouter from 'vue-router'
import Mainmenu from '../views/Home.vue'
import Notification from '../views/notificationList'
import Application from '../views/applyLoans'
import Loans from '../views/checkLoans'
import Login from '../views/Login'
import ForgotPassword from '../views/forgotPassword'
import resetPassword from '../views/resetPassword'
import AppealPage from '../views/AppealPage'
import checkAppeals from '../views/checkAppeals'
import checkUserAppeals from '../views/checkUserAppeals'
import checkUserLoans from '../views/checkUserLoans'
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
    path: '/admin/loans',
    name: 'admin loans',
    component: checkUserLoans,
    meta: {
      requiresAuth: true
    }

  },
  {
    path: '/appeals',
    name: 'loan appeal',
    component: checkAppeals,
    meta: {
      requiresAuth: true
    }

  },
  {
    path: '/admin/appeals',
    name: 'admin appeal',
    component: checkUserAppeals,
    meta: {
      requiresAuth: true
    }

  },
  {
    path: '/login',
    name: 'Login',
    component: Login,

  },
  {
    path: '/forgotPassword',
    name: 'ForgotPassword',
    component: ForgotPassword,

  },
  {
    path: '/resetPassword/:token',
    name: 'resetPassword',
    component: resetPassword,
  },
  {
    path: '/appeal/:id',
    name: 'appealPage',
    component: AppealPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '*',
    redirect: '/'
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
