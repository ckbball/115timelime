<template lang="html">
  <div>
    <LikeButton
      :counter="counter"
      v-on:ah="toggleLike($event)"
    ></LikeButton>
  </div>
</template>

<script>
import LikeButton from '@/components/user_profile/LikeButton'
export default {
  name: 'WriteButton',
  components: {
    "LikeButton": LikeButton
  },
  data () {
    return {
      counter:0,
      liked:false,
      numberOfLikes:0
    }
  },
  methods: {
	toggleLike: function(event)
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
