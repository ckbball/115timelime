<template lang="html">
  <div>
    <sui-grid :columns="3" :centered=false divided>
      <sui-grid-column :width="3">
      </sui-grid-column>

      <sui-grid-column :width="7">
        <!-- <MyFeed fluid
            :uid="getUserInfo.uid"
        /> -->
        <UserFeed>

        </UserFeed>
      </sui-grid-column>
      <sui-grid-column  :width="5">
        <MySideBar
            :userInfo="getUserInfo"
            @editBio="toggle()"
            @editPhoto="togglePhotoUpload()"
            @showFriends="toggleFriends()"

            @writePost="toggleWritePost()"
            @photoPost="togglePhotoPost()"
        />
      </sui-grid-column>
    </sui-grid>


    <sui-modal v-model="open" >
      <sui-modal-header> Edit Bio </sui-modal-header>
      <sui-modal-content>
        <sui-modal-description>
          <sui-form>
            <sui-form-field>
            <textarea 
            v-model="newBio" class="fucku" maxlength="200"
            />
            </sui-form-field>
          </sui-form>
        </sui-modal-description>
      </sui-modal-content>
        
      <sui-modal-actions>
        Characters remaining: {{textRemaining}}
        <sui-button negative @click.native="toggle">
          Cancel
        </sui-button>
        <sui-button positive @click.native="saveNewBio">
          Save
        </sui-button>
      </sui-modal-actions>
      
    </sui-modal>

<!-- 
    <sui-modal v-model="openPhoto">
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
 -->

     <sui-modal v-model="openPhoto">
      <ChangeProfilePhotoModal @ContinuePhotoUpload="togglePhotoUpload" :userInfo="getUserInfo" />
    </sui-modal>


    <sui-modal v-model="openWritePost">
      <CreateNewPostModal @ContinueTextPost="toggleWritePost" :userInfo="getUserInfo" />
    </sui-modal>

    <sui-modal v-model="openPhotoPost">
      <CreateNewPhotoPostModal @ContinuePhotoPost="togglePhotoPost" :userInfo="getUserInfo" />
    </sui-modal>

      <sui-modal v-model="openFriends" size="mini">
        <sui-modal-header>Friends!</sui-modal-header>

          <sui-table padded>
            <sui-table-row v-for="(friend,n) in this.getAllFriends" :key="n"> 
              <FriendBox
                :friend="friend">
              </FriendBox>
            </sui-table-row>
          </sui-table>

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
import MyFeed from '@/components/MyFeed'
import UserFeed from '@/components/posts/UserFeed'
import EditProfileInfo from '@/components/user_profile/EditProfileInfo'
import EditProfilePicture from '@/components/user_profile/EditProfileInfo'
import MySideBar from '@/components/MySideBar'
import Friend from '@/components/user_profile/Friend'
import FriendButton from '@/components/user_profile/FriendButton'
import CommentAvatarButton from '@/components/layout/CommentAvatarButton'
import CreateNewPostModal from '@/components/posts/CreateNewPostModal'
import CreateNewPhotoPostModal from '@/components/posts/CreateNewPhotoPostModal'
import ChangeProfilePhotoModal from '@/components/user_profile/ChangeProfilePhotoModal'
import NavbarSearchBar from '@/components/layout/NavbarSearchBar'
import FriendBox from '@/components/FriendBox'

import firebase from 'firebase'
import db from '@/firebase/init'

export default {
  name: 'MyProfile',
    components: {
    "MySideBar": MySideBar,
    "EditProfileInfo": EditProfileInfo,
    "Friend": Friend,
    "FriendButton": FriendButton,
    // "MyFeed": MyFeed,
    'CreateNewPostModal': CreateNewPostModal,
    'CommentAvatarButton': CommentAvatarButton,
    'UserFeed': UserFeed,
    'CreateNewPhotoPostModal': CreateNewPhotoPostModal,
    'ChangeProfilePhotoModal' : ChangeProfilePhotoModal,
    'NavbarSearchBar': NavbarSearchBar,
    'FriendBox': FriendBox
  },
    props: {
    user: Object,
  },
  data() {
    return {
        open: false,
        newBio:'', 
        openPhoto: false,
        openFriends: false,
        friends: [],
        openWritePost: false,
        openPhotoPost: false,

    }
  },
  computed: {
    ...mapGetters([
      'getUserInfo',
      'getAllFriends'
    ]),
    textRemaining: function(){
        return 200 - this.newBio.length
      },
  },

  methods: {
    toggle: function(){
      this.newBio = this.getUserInfo.bio
      this.open = !this.open;
    },
    saveNewBio(){
      db.collection('users').doc(this.getUserInfo.uid).update({bio: this.newBio})
      .then(() =>{
              this.open = !this.open;
      })
      .catch(err => {
        console.log(err)
      })

    },
    togglePhotoUpload: function(){
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
    togglePhotoPost: function(){
      this.openPhotoPost = !this.openPhotoPost;
    },
  },
  created: function() {

  }

}

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