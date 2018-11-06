<template lang="html">
 
</style>
 <div>
    </object>
    <sui-button :color="color" :icon="icon" size="small" :basic="this.pressed"
        @click="clicked()">
      <a
        is="sui-label"
        slot="label"
        :basic="!this.pressed"
        :color="color"
        pointing="left"
        @click="clicked()"
      >
      {{counter}} <!-- string interpolation-->
      </a>
    </sui-button>
  </div>
</template>

<script>
export default {
  name: 'Button',
  data () {
    return {
    	likeCount:0,
    	pressed:false
    }
  },
  props: {
  	color: String,
  	icon: String,
  	counter: Number,
  },
  methods: {
  	clicked: function() {
  		this.pressed=!this.pressed
  		this.$emit("clickEvent")
  	}
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
