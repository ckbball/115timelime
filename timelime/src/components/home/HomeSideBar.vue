<template lang="html">
  <div>
   <HomeUserIcon 
      @editBio="changeBio()"
      @editPhoto="changeProfileImage()"
      :userInfo="userInfo"
    />
    <sui-card class="raised">
      <sui-card-content>
        <sui-button icon="pencil alternate" @click="clickWriteButton()"></sui-button>
        <sui-button icon="camera retro" @click="clickPhotoButton()"></sui-button>
      </sui-card-content>
    </sui-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HomeUserIcon from '@/components/home/HomeUserIcon'
import * as firebase from 'firebase'
import db from '@/firebase/init'
export default {
  name: 'HomeSideBar',
  props: {
      userInfo: Object,
  },
  components: {
    "HomeUserIcon": HomeUserIcon,
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
      this.$emit("editBio")
    },
    changeProfileImage: function(){
      this.$emit("editPhoto")
    },
    clickWriteButton: function() {
      this.$emit("writePost")
    },
    clickPhotoButton: function() {
      this.$emit("photoPost")
    }


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