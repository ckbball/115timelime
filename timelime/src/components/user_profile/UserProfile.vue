<template lang="html">

  <sui-grid :columns="2" :centered=false divided>
    <sui-grid-column :width="11">
      <Post fluid/>
    </sui-grid-column>
    <sui-grid-column  :width="5">
      <UserSideBar/>
    </sui-grid-column>
  </sui-grid>



</template>

<script>
export default {
  name: 'CelledExample',
};
</script>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import Post from '@/components/posts/Post'
  import UserSideBar from '@/components/user_profile/UserSideBar'
  import FriendButton from '@/components/user_profile/FriendButton'
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
    "UserSideBar": UserSideBar,
    "FriendButton": FriendButton,
    "Post": Post,
  },
  computed: {
    ...mapGetters(['getUser'])
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
     ...mapMutations(['setUser']),
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