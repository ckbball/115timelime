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
        <a v-if="getAuthenticatedUser"
          is="sui-menu-item"
        >
          <sui-icon 
            name="envelope outline"
            size="big"
          ></sui-icon>
        </a>

        <a v-if="getAuthenticatedUser"
          is="sui-menu-item">
          <sui-dropdown
            icon="bars big"
          >          
            <sui-dropdown-menu>
              <sui-dropdown-item @click="signUserOut">
                <sui-icon 
                name="hide" 
                />Log out</sui-dropdown-item>
            </sui-dropdown-menu>
          </sui-dropdown>
        </a>
        <a v-if="!getAuthenticatedUser"
          is="sui-menu-item"
          :active="isActive('SignUp')"
          content="Sign Up"
          @click="select('SignUp')"
        />
        <a v-if="!getAuthenticatedUser"
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
  		'getAuthenticatedUser'
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
