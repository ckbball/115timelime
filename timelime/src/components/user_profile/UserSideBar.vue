<template lang="html">
  <div>
   <UserIcon
    @editBio="changeBio()"
    @editPhoto="changeProfileImage()"
    />
   <FriendButton class="FriendButton"/>
   <bar class="PostButtons"/>
  </div>
</template>

<script>
import UserIcon from '@/components/user_profile/UserIcon'
import FriendButton from '@/components/user_profile/FriendButton'
import bar from '@/components/general/bar'
export default {
  name: 'EditProfileInfo',
  data() {
    return { 
      icon: "photo",
      open: false,
      text: ""
    };
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