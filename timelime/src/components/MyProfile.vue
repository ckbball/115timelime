<template lang="html">
  <div>
    <sui-grid :columns="3" :centered=false divided>
      <sui-grid-column :width="3">
      </sui-grid-column>

      
      
      <sui-grid-column :width="7">
        <UserFeed fluid
            :uid="getUserInfo.uid"
        />
      </sui-grid-column>
      <sui-grid-column  :width="5">
        <MySideBar
            :userInfo="getUserInfo"
            :uid="uid"
            @editBio="toggle()"
            @editPhoto="togglePhoto()"
            @showFriends="toggleFriends()"
            @writePost="toggleWritePost()"
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


    <sui-modal v-model="openWritePost">
      <CreateNewPostModal @ContinueTextPost="toggleWritePost" :userInfo="getUserInfo" />
    </sui-modal>


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
import {mapActions, mapGetters, mapMutations} from 'vuex'
import UserFeed from '@/components/posts/UserFeed'
import EditProfileInfo from '@/components/user_profile/EditProfileInfo'
import EditProfilePicture from '@/components/user_profile/EditProfileInfo'
import MySideBar from '@/components/MySideBar'
import CreateNewPostModal from '@/components/posts/CreateNewPostModal'
import Friend from '@/components/user_profile/Friend'
import FriendButton from '@/components/user_profile/FriendButton'


import firebase from 'firebase'
import db from '@/firebase/init'

export default {
  name: 'MyProfile',
    components: {
    "MySideBar": MySideBar,
    "CreateNewPostModal": CreateNewPostModal,
    "EditProfileInfo": EditProfileInfo,
    "Friend": Friend,
    "FriendButton": FriendButton,
    "UserFeed": UserFeed
  },
  data() {
    return {
        open: false,
        newBio:'', 
        openPhoto: false,
        openFriends: false,
        openWritePost: false,
        friends: [],
    }
  },
  computed: {
    ...mapGetters([
      'getUserInfo'
    ]),
    textRemaining: function(){
        return 200 - this.newBio.length
      },
  },

  methods: {
    toggle: function(){
      this.open = !this.open;
    },
    ...mapActions(['updateUserBio']),
    savePost(){
      this.updateUserBio(this.newBio)
      this.open = !this.open;
    },
    togglePhoto: function(){
      this.openPhoto = !this.openPhoto;
    },
    savePhoto(){
      this.openPhoto = !this.openPhoto;
    },
    toggleFriends: function(){
      this.openFriends = !this.openFriends;
    },
    toggleWritePost: function(){
      this.openWritePost = !this.openWritePost;
    },
    getFriends() {

      db.collection('relations').where('uid_'+this.getUserInfo.uid, '==', true).get() //'uid_0GkbOriyJFaYUupbZhin', '==', 'true').get()
      .then((snapshot) =>  {
        snapshot.docs.forEach(doc  => {
          // need to check if the other one is true 
          //    if it is set otherUserUID to whateva that value is break it up at the _ and grab that second part 
          var relation = doc.data();
          var otherUserUID = "";
          var thisUserUID = 'uid_'+this.getUserInfo.uid; // 'uid_0GkbOriyJFaYUupbZhin'
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
          


          if (friends === true){
            db.collection('users').where('uid', '==', otherUserUID).get()
            .then((querySnapshot) => {
              querySnapshot.docs.forEach((doc) => {
                let data = {
                  'name': doc.data().firstName + ' ' + doc.data().lastName,
                  'photo': doc.data().image
                 }
                 this.friends.push(data)
              })
            })
            .catch(err => {
              console.log("failed with error: " + err)
            })
          }



         //  // if it is grab the other uid, and look through the users to find the friend
         //  // once friend is found then grab name and photo

        })
      })
      .catch(err => {
        console.log("failed with error: " + err)
      })


  },
/*
db.collection('relations').doc().where('uid_'+this.getAuthenticatedUser.uid, '==', 'false').get()
.then((snapshot) => {
  snapshot.forEach((doc) => {
    // something impulsive happens
  }
}) */

  },
  mounted () {
    this.getFriends()
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