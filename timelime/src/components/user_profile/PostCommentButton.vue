<template lang="html">
  <div>
    <Button
      :counter="this.counter"
      :color="this.color"
      :icon="this.icon"
      v-on:clickEvent="toggleLike()"
    ></Button>
  </div>
</template>

<script>
import Button from '@/components/user_profile/Button'
export default {
  name: 'PostCommentButton',
  components: {
    "Button": Button
  },
  data () {
    return {
      counter:0,
      liked:false,
      color:"blue",
      icon:"comment",
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
