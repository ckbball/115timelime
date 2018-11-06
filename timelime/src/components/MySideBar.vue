<template lang="html">
  <div>
   <MyUserIcon 
      @editBio="changeBio()"
      @editPhoto="changeProfileImage()"
      :userInfo="userInfo"
    />
    <sui-card class="raised">
      <sui-card-content>
        <sui-button 
            v-on:click="showFriends()">
            friends
        </sui-button>
      </sui-card-content>
    </sui-card>
    <sui-card class="raised">
      <sui-card-content>
        <sui-button icon="pencil alternate"></sui-button>
        <sui-button icon="camera retro"></sui-button>
        <sui-button icon="film"></sui-button>
      </sui-card-content>


    </sui-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MyUserIcon from '@/components/MyUserIcon'
import * as firebase from 'firebase'
import db from '@/firebase/init'
export default {
  name: 'MySideBar',
  props: {
      userInfo: Object,
      
  },
  components: {
    "MyUserIcon": MyUserIcon,
  },
  data() {
    return { 
      icon: "photo",
      open: false,
      text: "",
      isFriend: 'false'
    };
  },
  computed: {
    ...mapGetters([
      'getAuthenticatedUser',
      
    ])
  },
  methods: {
    changeBio: function(){
      console.log("hey! someone REALLY REALLY wants to edit this profile! :)")
      this.$emit("editBio")
    },
    changeProfileImage: function(){
      console.log("hey! someone REALLY REALLY wants to edit this profile photo! :)")
      this.$emit("editPhoto")
    },
    showFriends: function(){
      console.log("hey! someone REALLY REALLY wants to see their friends! :)")
      this.$emit("showFriends")
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
</style>