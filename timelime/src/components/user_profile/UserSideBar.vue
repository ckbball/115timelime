<template lang="html">
  <div>
   <UserIcon 
      @editBio="changeBio()"
      @editPhoto="changeProfileImage()"
      v-bind:isAuthUser="isAuthUser"
      v-bind:user="user"
    />
    <FriendButton 
      class="FriendButton" 
      v-bind:isAuthUser="isAuthUser" 
      v-bind:isFriend="isFriend"
      v-bind:uid="uid"
    />
    <bar 
      class="PostButtons"
      v-bind:isAuthUser="isAuthUser"
      v-bind:isFriend="isFriend"
    />
   <FriendButton class="FriendButton"
    @showFriends="showFriends()"
   />
   <bar class="PostButtons"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserIcon from '@/components/user_profile/UserIcon'
import FriendButton from '@/components/user_profile/FriendButton'
import bar from '@/components/general/bar'
import * as firebase from 'firebase'
import db from '@/firebase/init'
export default {
  name: 'EditProfileInfo',
  data() {
    return { 
      icon: "photo",
      open: false,
      text: "",
      isAuthUser: false,
      isFriend: 'false'
    };
  },
  computed: {
    ...mapGetters(['getAuthenticatedUser'])
  },
  components: {
    "UserIcon": UserIcon,
    "FriendButton": FriendButton,
    "bar": bar,
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
    checkUser: function(){
      if (this.getAuthenticatedUser !== null && this.getAuthenticatedUser.uid === this.uid)
        this.isAuthUser = true
    },
    areFriends: function(){
      if (this.getAuthenticatedUser !== null) {
        var us1 = 'uid_'+this.getAuthenticatedUser.uid
        var us2 = 'uid_'+this.uid
        db.collection('relations').where(us1, "==", true).where(us2, "==", true)
        .onSnapshot((snapshot) => {
          if (snapshot.size != 0)
            this.isFriend = 'true'
          else {
            db.collection('relations').where(us1, "==", true).where(us2, "==", false)
            .onSnapshot((snapshot) => {
              if (snapshot.size != 0)
                this.isFriend = 'pending'
              else 
                this.isFriend = 'false'
            })
          }
        })
      }
    }
  },
  created() {
    this.checkUser()
    this.areFriends()
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
</style>