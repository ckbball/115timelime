<template>
  <div>
	<sui-button :color="getColor('primary')">
	</sui-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DonovanTest',
  data () {
    return {}
  }, 
  computed: {
  	...mapGetters([
  		'getColor'
	])
  },
  
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
