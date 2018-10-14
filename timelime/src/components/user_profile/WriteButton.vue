<template lang="html">
  <div>
    </object>
    <sui-button icon="write" @click="writeClick()"/>
  </div>
</template>


<script>
export default {
  name: 'WriteButton',
  data () {
    return {
      input:""
    }
  },
  props: {
    counter: Number,
  },
  methods: {
  writeClick: function() {
    console.log("this shit was CLICKED")
  }
  } 
  
  
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
