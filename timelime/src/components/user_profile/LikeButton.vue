<template lang="html">
  <div>
    </object>
    <sui-button color="red" icon="heart" size="compact">
      <a
        is="sui-label"
        slot="label"
        basic
        color="red"
        pointing="left"
        @click="likeClick"
      >
      {{counter}} <!-- string interpolation-->
      </a>
    </sui-button>




    <input type="text" name="" v-model="input"> 




  </div>
</template>

<script>
export default {
  name: 'LikeButton',
  data () {
    return {
    	input:""
    	// likeCount:0,
    	// liked:false
    }
  },
  props: {
  	counter: Number,
  },
  methods: {
	likeClick: function() {
		console.log("yooooooo")
		this.$emit("ah",this.input)
	}
  } 
  
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
