<template lang="html">
  <div>
    <sui-grid :columns="3" :centered=false divided>
      <sui-grid-column :width="3">
      </sui-grid-column>

      <sui-grid-column :width="7">
        <UserFeed fluid/>
      </sui-grid-column>
      <sui-grid-column  :width="5">
        <UserSideBar
        @editBio="toggle()"
        @editPhoto="togglePhoto()"
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



</div>
</template>

<script>
export default {
  name: 'CelledExample',
};
</script>

<script>
  import {mapGetters, mapMutations} from 'vuex'

import UserFeed from '@/components/posts/UserFeed'
import EditProfileInfo from '@/components/user_profile/EditProfileInfo'
import EditProfilePicture from '@/components/user_profile/EditProfileInfo'
import UserSideBar from '@/components/user_profile/UserSideBar'
import FriendButton from '@/components/user_profile/FriendButton'
export default {
  name: 'UserProfile',
  data() {
    return { 
      icon: "photo",
      open: false,
      openPhoto: false,
      newBio: "this.getUser.Bio"
    };
  },
  computed: {
    ...mapGetters(['getUser']),
    textRemaining: function(){
        return 200 - this.newBio.length
      },
  },
  components: {
    "UserSideBar": UserSideBar,
    "FriendButton": FriendButton,
    "EditProfileInfo": EditProfileInfo,
    "UserFeed": UserFeed
  },
  methods: {
    toggle: function(){
      console.log("toggling the modal")
      this.open = !this.open;
    },
    ...mapMutations(['updateUser']),
    savePost(text){
      this.$store.commit('updateUser')
      this.open = !this.open;
    },
    togglePhoto: function(){
      console.log("toggling the modal")
      this.openPhoto = !this.openPhoto;
    },
    savePhoto(){
      this.openPhoto = !this.openPhoto;
    },
  },
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