<template>
	<sui-menu pointing secondary>
      <a
        is="sui-menu-item"
        v-for="item in items"
        :active="isActive(item.route)"
        :key="item.content"
        :content="item.content"
        @click="select(item.route)"
      />
      <sui-menu-menu position="right">
        <a v-if="getUser"
          is="sui-menu-item"
          :active="isActive('Logout')"
          content="Logout"
          @click="signUserOut"
        />
        <a v-if="!getUser"
          is="sui-menu-item"
          :active="isActive('SignUp')"
          content="Sign Up"
          @click="select('SignUp')"
        />
        <a v-if="!getUser"
          is="sui-menu-item"
          :active="isActive('LogIn')"
          content="Log In"
          @click="select('LogIn')"
        />

      </sui-menu-menu>
    </sui-menu>

</template>

<script>
/*

	add new navbar items to data/ items
	item.content is what is displayed on the screen.
	item.route must correspond to route/index.js route name **case sensitive**
*/
import {mapGetters, mapActions } from 'vuex'
export default {
	name: 'Navbar',
  		data () {
    		return {
    			items:[
    			{
    				content: 'Home',
    				route: 'Home'
    			}
    			],
    			active:'Home',
    }
  }, 
  computed: {
  	...mapGetters([
  		'getUser'
		])
  },
	methods: {
		...mapActions([
			'signUserOut'
		]),

		navigateTo(route) {
			this.$router.push({ name:route })
		},
    isActive(name) {
      return this.active === name;
    },
    select(name) {
      this.active = name;
      this.navigateTo(name)
    },
  },
  
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
