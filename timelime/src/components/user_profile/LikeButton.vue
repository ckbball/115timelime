<template lang="html">
  <div>
    </object>
    <sui-button color="red" icon="heart" size="small" 
        @click="likeClick()">
      <a
        is="sui-label"
        slot="label"
        basic
        color="red"
        pointing="left"
      >
      {{counter}} <!-- string interpolation-->
      </a>
    </sui-button>
  </div>
</template>

<script>
export default {
  name: 'LikeButton',
  data () {
    return {
    	likeCount:0,
    	liked:false
    }
  },
  props: {
  	counter: Number,
  },
  methods: {
	likeClick: function() {
		console.log("yooooooo")
		this.$emit("likeEvent")
	}
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
