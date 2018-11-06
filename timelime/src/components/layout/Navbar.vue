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



        <NavbarSearchBar 
          v-on:searchReturned="onSearchReturned($event)"
        ></NavbarSearchBar>

 
      <sui-menu-menu position="right">
        <a v-if="getAuthenticatedUser"
          is="sui-menu-item"
          >
          <sui-button class="requestButton">
            <sui-label color="red" floating circular size="mini" class="friendNotif">
              22
            </sui-label>        
            <sui-dropdown
              class = "requestDropdown"
              multiple
              icon="big universal access"
              floating
            >
            <sui-dropdown-menu  
              class="left menu dropMenuReq" scrolling=true >
              <sui-dropdown-header content="Friend Requests:"/>
                
                <div class="posts" v-for="(req,n) in friendReqs" :key="n">
                      <FriendRequest
                      class="friendreq"
                      :name='req.name'
                      :photo='req.photo'
                      :requester='req.UserID'
                      v-on:response="handelResponse($event)"
                      />
                </div>
               
                
              </sui-dropdown-menu>
            </sui-dropdown>
          </sui-button>

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

import FriendRequest from '@/components/layout/FriendRequest' 
import NavbarSearchBar from '@/components/layout/NavbarSearchBar'

import firebase from 'firebase'
import db from '@/firebase/init'

export default {
  name: 'Navbar',
  components: {
    'NavbarSearchBar': NavbarSearchBar,
    "FriendRequest": FriendRequest
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
      'getAuthenticatedUser'
    ])
  },

  methods: {
    ...mapActions([
      'signUserOut'
    ]),

    handelResponse: function(resp) {
      this.respondRequest(resp[1], resp[0])
    },

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

    respondRequest(otherUser, response){
      var otherUserUID = otherUser;

      var thisUserUID = 'uid_'+this.getAuthenticatedUser.uid;
      db.collection('relations').where(thisUserUID, '==', false).where(otherUserUID, '==', true).get()
      .then((snapshot) =>  {
        snapshot.docs.forEach(doc  => {
          var relation = doc.data();

          if (response === false){
            db.collection('relations').doc(doc.id).delete()
          } else {
            db.collection('relations').doc(doc.id).update({[thisUserUID]:true})
          }
        })
      })
      .catch(err => {
        console.log("failed with error: " + err)
      })
    },

    getFriendRequests() {
      var thisUserUID = 'uid_'+this.getAuthenticatedUser.uid;
      db.collection('relations').where(thisUserUID, '==', false).get() //'uid_'+this.getAuthenticatedUser.uid, '==', 'false').get()
      .then((snapshot) =>  {
        snapshot.docs.forEach(doc  => {
          var relation = doc.data();
          var otherUserUID = "";
          

          for (var property1 in relation) {
            if (property1 == thisUserUID){
              continue;
            } else {
              otherUserUID = property1.substring(4);
              continue;
            }
          }
          
          db.collection('users').where('uid', '==', otherUserUID).get()
          .then((querySnapshot) => {
            querySnapshot.docs.forEach((doc) => {
              let data = {
                'name': doc.data().firstName + ' ' + doc.data().lastName,
                'photo': doc.data().image,
                'UserID': 'uid_'+otherUserUID
               }
               this.friendReqs.push(data)
            })
          })
          .catch(err => {
            console.log("failed with error: " + err)
          })


        })
      })
      .catch(err => {
        console.log("failed with error: " + err)
      })
  },

  },
  created () {
    this.getFriendRequests() 
  }
   
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
  display: this.added;
}
.friendship {
  position: absolute;
  top: 5px;
}
.friendreq {
  position: relative;
}
</style>
