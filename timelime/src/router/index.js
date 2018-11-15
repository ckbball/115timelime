import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import Home from '@/components/Home'

import User from '@/components/User'
import Login from '@/components/auth/Login'
import MessagePage from '@/components/messages/MessagePage'
import SignUp from '@/components/auth/SignUp'
import TermsAndConditions from '@/components/auth/TermsAndConditions'
import Post from '@/components/posts/PostText'

import DonovanTest from '@/components/tests/donovantest'
import MiaTest from '@/components/tests/miatest'
import CaesarTest from '@/components/tests/caesartest'
import KenjiTest from '@/components/tests/kenjitest'

import auth from '@/store/modules/auth'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/messages',
      name: 'Messages',
      component: MessagePage,
    },
    {
      path: '/user/:uid',
      name: 'User',
      component: User,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Login',
      name: 'LogIn',
      component: Login
    },
    {
      path: '/Messages',
      name: 'Messages',
      component: MessagePage
    },
    {
      path: '/Sign-Up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/Terms-and-Conditions',
      name: 'TermsAndConditions',
      component: TermsAndConditions
    },
    {
      path: '/donovantest',
      name: 'DonovanTest',
      component: DonovanTest
    },
    {
      path: '/miatest',
      name: 'MiaTest',
      component: MiaTest
    },
        {
      path: '/caesartest',
      name: 'CaesarTest',
      component: CaesarTest
    },
        {
      path: '/kenjitest',
      name: 'KenjiTest',
      component: KenjiTest
    },
  ]
})

// router.beforeEach((to, from, next) => {
//   let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//   if (requiresAuth && !auth.isLoggedIn) next('login')
//   else if (!requiresAuth && auth.isLoggedIn) next('hello')
//   else next()
// })

export default router