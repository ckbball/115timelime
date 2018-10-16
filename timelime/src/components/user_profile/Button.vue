<template lang="html">
  <div>
    </object>
    <sui-button v-bind:icon="icon" @click="clickButton()"/>
  </div>
</template>


<script>
export default {
  name: 'Button',
  data () {
    return {
    }
  },
  props: {
    icon: String,
    status: Boolean,
  },
  methods: {
  clickButton: function() {
    this.$emit("clicked")
  }
  } 
  
  
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
