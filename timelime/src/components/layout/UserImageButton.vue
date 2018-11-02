<template>
  <router-link :to="{path: '/'}">
    <sui-image 
      :src="image"
      :size="size"
      
      >

    </sui-image>
  </router-link>


</template>

<script>
export default {
  name: 'UserImageButton',
  props: {
      image: {
          type: String,
          default: 'https://randomuser.me/api/portraits/med/men/20.jpg',
          required: false
      },
      size: {
          type: String,
          default: 'tiny',
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
