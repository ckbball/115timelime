import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import bar from '@/components/general/bar'
import TopBar from '@/components/general/TopBar'

import EditProfileInfo from '@/components/user_profile/EditProfileInfo'
import FriendButton from '@/components/user_profile/FriendButton'
import LikeButton from '@/components/user_profile/LikeButton'
import PostLikeButton from '@/components/user_profile/PostLikeButton'
import UserIcon from '@/components/user_profile/UserIcon'
import WriteButton from '@/components/user_profile/WriteButton'
import ShittyExample from '@/components/tests/shittyexample'


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
      path: '/bar',
      name: 'bar',
      component: bar
    },
    {
      path: '/TopBar',
      name: 'TopBar',
      component: TopBar
    },
    {
      path: '/EditProfileInfo',
      name: 'EditProfileInfo',
      component: EditProfileInfo
    },
    {
      path: '/FriendButton',
      name: 'FriendButton',
      component: FriendButton
    },
    {
      path: '/LikeButton',
      name: 'LikeButton',
      component: LikeButton
    },
    {
      path: '/PostLikeButton',
      name: 'PostLikeButton',
      component: PostLikeButton
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
    }
  ]
})

export default router