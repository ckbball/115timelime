import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
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
    	path: '/shittyexample',
    	name: 'ShittyExample',
    	component: ShittyExample
    }
  ]
})

export default router