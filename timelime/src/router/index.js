import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import LikeButton from '@/components/user_profile/LikeButton'
import UserIcon from '@/components/user_profile/UserIcon'
import WriteButton from '@/components/user_profile/WriteButton'
import ShittyExample from '@/components/tests/shittyexample'
import Login from '@/components/auth/Login'
import SignUp from '@/components/auth/SignUp'
import Hello from '@/components/auth/Hello'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
    	path: '/shittyexample',
    	name: 'ShittyExample',
    	component: ShittyExample
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    }
  ]
})

export default router