<template lang="html">
  <div>
    <LikeButton
      :counter="this.counter"
      v-on:likeEvent="toggleLike()"
    ></LikeButton>
  </div>
</template>

<script>
import LikeButton from '@/components/user_profile/LikeButton'
export default {
  name: 'PostLikeButton',
  components: {
    "LikeButton": LikeButton
  },
  data () {
    return {
      counter:0,
      liked:false,
    }
  },
  methods: {
  toggleLike: function()
  {
    console.log(event)
    if (this.liked){
      this.counter--
      this.liked = false
    } 
    else {
      this.counter++
      this.liked = true
    }
  },
  } 
  
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
