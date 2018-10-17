<template lang="html">
  <div>
   <UserIcon/>
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
  props: {
    Header: String,
    Bio: String,
  },
  methods: {
    toggle() {
      this.open = !this.open;
      this.text = ""
    },
    savePost(){
      this.$emit("inputEvent", this.text)
      this.open = !this.open;
      this.text = ""
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