<template>
  <router-link :to="{path: '/user/'+userUIDLocation}">
    <sui-comment-avatar 
      :src="userImageLocation"
    >
    </sui-comment-avatar>
  </router-link>


</template>

<script>
export default {
  name: 'CommentAvatarButton',
  props: {
    user: Object 
  },
  data () {
    return {
      userImageLocation: "",
      userUIDLocation: ""
    }
  }, 
  methods: {
    userImagePropToVariable() {
      this.userImageLocation = this.user.image
    },
    userUIDPropToVariable() {
      this.userUIDLocation = this.user.uid
    }
  },
  beforeUpdate() {
    this.userImagePropToVariable()
    this.userUIDPropToVariable()
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
