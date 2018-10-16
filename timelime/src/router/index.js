import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import Home from '@/components/Home'

import Login from '@/components/auth/Login'
import SignUp from '@/components/auth/SignUp'
import TermsAndConditions from '@/components/auth/TermsAndConditions'
import Post from '@/components/posts/Post'

import DonovanTest from '@/components/tests/donovantest'
import MiaTest from '@/components/tests/miatest'
import CaesarTest from '@/components/tests/caesartest'
import KenjiTest from '@/components/tests/kenjitest'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/Login'
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },

    {
      path: '/Login',
      name: 'LogIn',
      component: Login
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
      path: '/Post',
      name: 'Post',
      component: Post,
      meta: {
        requiresAuth: true
      }
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
//   let currentUser = firebase.auth().currentUser;
//   let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

//   if (requiresAuth && !currentUser) next('login')
//   else if (!requiresAuth && currentUser) next('hello')
//   else next()
// })

export default router