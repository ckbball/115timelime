import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import HelloWorld from '@/components/HelloWorld'
import LikeButton from '@/components/user_profile/LikeButton'
import UserIcon from '@/components/user_profile/UserIcon'
import WriteButton from '@/components/user_profile/WriteButton'
import ShittyExample from '@/components/tests/shittyexample'
import Login from '@/components/auth/Login'
import SignUp from '@/components/auth/SignUp'
import Hello from '@/components/auth/Hello'
import TermsAndConditions from '@/components/auth/TermsAndConditions'
import Post from '@/components/posts/Post'

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
      redirect: '/Login'
    },
    {
      path: '/LikeButton',
      name: 'LikeButton',
      component: LikeButton
    },
    {
      path: '/WriteButton',
      name: '/WriteButton',
      component: WriteButton
    },
    {
      path: '/UserIcon',
      name: '/UserIcon',
      component: UserIcon
    },
    {
    	path: '/ShittyExample',
    	name: 'ShittyExample',
    	component: ShittyExample
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Sign-Up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/Hello',
      name: 'Hello',
      component: Hello,
      meta: {
        requiresAuth: true
      }
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
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('hello')
  else next()
})

export default router