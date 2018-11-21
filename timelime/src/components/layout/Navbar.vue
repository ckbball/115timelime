<template>
  <sui-menu pointing secondary >
      <a
        is="sui-menu-item"
        v-for="item in items"
        :active="isActive(item.route)"
        :key="item.content"
        :content="item.content"
        @click="select(item.route)"
      >
        <sui-icon size="big" name="home"/>
      </a>

      <NavbarSearchBar 
        v-on:searchReturned="onSearchReturned($event)"
      ></NavbarSearchBar>

 
      <sui-menu-menu position="right" class="friendReq">
        <FriendRequestContainer></FriendRequestContainer>
        <NotificationsContainer></NotificationsContainer>
        <MessagingContainer></MessagingContainer>

        <a v-if="getAuthenticatedUser"
          is="sui-menu-item">
          <sui-dropdown
            icon="bars big"
          >          
            <sui-dropdown-menu>
              <sui-dropdown-item @click="signUserOut">
                <sui-icon 
                  name="hide" 
                />Log out
              </sui-dropdown-item>
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
import { mapGetters, mapActions } from 'vuex'

import NavbarSearchBar from '@/components/layout/NavbarSearchBar'
import FriendRequestContainer from '@/components/layout/FriendRequestContainer'
import NotificationsContainer from '@/components/layout/NotificationsContainer'
import MessagingContainer from '@/components/messages/MessagingContainer'

import firebase from 'firebase'
import db from '@/firebase/init'

export default {
  name: 'Navbar',
  components: {
    'NavbarSearchBar': NavbarSearchBar,
    'NotificationsContainer': NotificationsContainer,
    'MessagingContainer': MessagingContainer,
    'FriendRequestContainer': FriendRequestContainer
  },
      data () {
        return {
          items:[
          {
            content: 'Home',
            route: 'Home'
          }
          ],
          active:'Home',
          searchResults: null,
          friendReqs: []
    }
  }, 
  computed: {
    ...mapGetters([
      'getAuthenticatedUser',
      'getAllFriendsRequests'
    ]),
    numberOfReqs: function(){
        return this.getAllFriendsRequests.length
    }
  },

  methods: {
    ...mapActions([
      'signUserOut'
    ]),

    onSearchReturned(event) {
      this.searchResults = event
    },

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
.anal {
  size: tiny;
}
.dropMenuReq {
  width: 400px
}
.requestButton {
  position: absolute;
  width: 40px;
  height: 40px;
  right: 15px;
}
.requestDropdown{
  position: absolute;
  width: 40px;
  height: 40px;
  right: 3px;
  top: 3px;
}
.friendNotif{
  position: relative;
  top: 200px;
}
.drop{
  padding: 20px;
  position: absolute;
  right: 0;
}
.hide {
  /* display: this.added; */
}
.friendship {
  position: absolute;
  top: 5px;
}
.friendreq {
  position: relative;
}

</style>
