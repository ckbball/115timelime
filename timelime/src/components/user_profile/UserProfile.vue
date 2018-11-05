<template lang="html">
  <div>
    <sui-grid :columns="3" :centered=false divided>
      <sui-grid-column :width="3">
      </sui-grid-column>

      <sui-grid-column :width="7">
        <UserFeed fluid
        v-bind:user="user"
        v-bind:uid="uid"
        />
      </sui-grid-column>
      <sui-grid-column  :width="5">
        <UserSideBar
        v-bind:user="user"
        v-bind:uid="uid"
        @editBio="toggle()"
        @editPhoto="togglePhoto()"
        @showFriends="toggleFriends()"
        />
      </sui-grid-column>
    </sui-grid>


    <sui-modal 
    v-model="open"
    >
      <sui-modal-header> Edit Bio </sui-modal-header>
      <sui-modal-content>
        <sui-modal-description>
          <textarea 
           v-model="newBio" class="fucku" maxlength="200"
           />
        </sui-modal-description>
      </sui-modal-content>
        
      <sui-modal-actions>
        Characters remaining: {{textRemaining}}
        <sui-button negative @click.native="toggle">
          Cancel
        </sui-button>
        <sui-button positive @click.native="savePost">
          Save
        </sui-button>
      </sui-modal-actions>
      
    </sui-modal>


    <sui-modal 
    v-model="openPhoto"
    >
      <sui-modal-header> Change Profile Photo </sui-modal-header>
      <sui-modal-content>
        <sui-modal-description>
          
        </sui-modal-description>
      </sui-modal-content>
        
      <sui-modal-actions>
        Characters remaining: {{textRemaining}}
        <sui-button negative @click.native="togglePhoto">
          Cancel
        </sui-button>
        <sui-button positive @click.native="savePhoto">
          Save
        </sui-button>
      </sui-modal-actions>
      
    </sui-modal>




<!--       <sui-button @click.native="toggleFriends">Show Modal</sui-button> -->
      <sui-modal v-model="openFriends" size="mini">
        <sui-modal-header>Friends</sui-modal-header>
        <sui-modal-content scrolling > 
          <!-- scrolling image  -->
          <sui-modal-description>
<div class="friends" v-for="f in friends">
       <Friend
          :name="f.name"
          :image="f.photo"
        />
  </div>

           <!--  <Friend
              name="Naaaame yolo"
              image="https://images.pexels.com/photos/1466845/pexels-photo-1466845.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            />
 -->
          </sui-modal-description>
        </sui-modal-content>
        <sui-modal-actions>
          <sui-button positive @click.native="toggleFriends">
            Close
          </sui-button>
        </sui-modal-actions>
      </sui-modal>



</div>
</template>

<script>
export default {
  name: 'CelledExample',
};
</script>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import UserFeed from '@/components/posts/UserFeed'
import EditProfileInfo from '@/components/user_profile/EditProfileInfo'
import EditProfilePicture from '@/components/user_profile/EditProfileInfo'
import UserSideBar from '@/components/user_profile/UserSideBar'
import Friend from '@/components/user_profile/Friend'
import FriendButton from '@/components/user_profile/FriendButton'

import firebase from 'firebase'
import db from '@/firebase/init'

export default {
  name: 'UserProfile',
  data() {
    return { 
      icon: "photo",
      open: false,
      openPhoto: false,
      openFriends: false,
      friends: [],
      newBio: "this.user.bio"
    };
  },
  computed: {
    textRemaining: function(){
        return 200 - this.newBio.length
      },
  },
  components: {
    "UserSideBar": UserSideBar,
    "EditProfileInfo": EditProfileInfo,
    "Friend": Friend,
    "FriendButton": FriendButton,
    "UserFeed": UserFeed
  },
  methods: {
    toggle: function(){
      console.log("toggling the modal")
      this.open = !this.open;
    },
    ...mapActions(['updateUserBio']),
    savePost(){
      console.log(this.newBio)
      this.updateUserBio(this.newBio)
      this.open = !this.open;
    },
    togglePhoto: function(){
      console.log("toggling the modal")
      this.openPhoto = !this.openPhoto;
    },
    savePhoto(){
      this.openPhoto = !this.openPhoto;
    },
    toggleFriends: function(){
      console.log("toggling the friendship modal")
      this.openFriends = !this.openFriends;
    },


    getFriends() {
      console.log("finding friends...")

      db.collection('relations').where('uid_'+this.getAuthenticatedUser.uid, '==', true).get() //'uid_0GkbOriyJFaYUupbZhin', '==', 'true').get()
      .then((snapshot) =>  {
        snapshot.docs.forEach(doc  => {
          console.log(doc)
          // need to check if the other one is true 
          //    if it is set otherUserUID to whateva that value is break it up at the _ and grab that second part 
          var relation = doc.data();
          //console.log('~~~~~~~~~~~~~~~~~',relation)
          var otherUserUID = "";
          var thisUserUID = 'uid_'+this.getAuthenticatedUser.uid; // 'uid_0GkbOriyJFaYUupbZhin'
          let friends = false;

          for (var property1 in relation) {
            if (property1 == thisUserUID){
              continue;
            } else {
              if (relation[property1] == true){
                otherUserUID = property1.substring(4);
                friends = true;
              } else {
              }
              continue;
            }
          }
          
          console.log(thisUserUID);
          console.log(otherUserUID);
          console.log(friends);

          if (friends === true){
            db.collection('users').where('uid', '==', otherUserUID).get()
            .then((querySnapshot) => {
              querySnapshot.docs.forEach((doc) => {
                let data = {
                  'name': doc.data().firstName + ' ' + doc.data().lastName,
                  'photo': doc.data().image
                 }
                 this.friends.push(data)
                 console.log("************************users name",data.name)
              })
            })
            .catch(err => {
              console.log("failed with error: " + err)
            })
          }

      console.log("========================these are all of this users friends",this.friends)


         //  // if it is grab the other uid, and look through the users to find the friend
         //  // once friend is found then grab name and photo

        })
      })
      .catch(err => {
        console.log("failed with error: " + err)
      })


      console.log("========================these are all of this users friends",this.friends)
  },
/*
db.collection('relations').doc().where('uid_'+this.getAuthenticatedUser.uid, '==', 'false').get()
.then((snapshot) => {
  snapshot.forEach((doc) => {
    // something impulsive happens
  }
}) */

  },
  created () {
    this.getFriends()
    console.log(this.friends[0])
  },
  props: {
    user: Object,
    uid: String
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.FriendButton{
  position: relative;
  z-index: 2;
  top: 10px;
}
.PostButtons{
  position: relative;
  z-index: 2;
  top: 20px;
}
.fucku{
  width: 100%;
  resize: none;
  height: 100%;
  border:1px solid lightgray;
  border-radius: 5px;
}
.feed{
  width: 100%;
}
</style>