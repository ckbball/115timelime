<template>
  <router-link :to="{path: '/user/'+uid}">
    <sui-comment-avatar 
      :src="user.image"
    >
    </sui-comment-avatar>
  </router-link>


</template>

<script>
export default {
  name: 'CommentAvatarButton',
  props: {
      image: {
          type: String,
          default: 'https://randomuser.me/api/portraits/med/men/20.jpg',
          required: false
      },
      uid: {
          type: String,
          required: true,
          
      },

  },
  data () {
    return {
    }
  }, 

  
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
