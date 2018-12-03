<template>
  <sui-grid container>
    <sui-grid-row textAlign="left">
      <sui-grid-column :width='2'>

      </sui-grid-column>
      <sui-grid-column :width='10'  >
        <p>Donovan Rost</p>
      </sui-grid-column>
      <sui-grid-column :width='4'>
        
      </sui-grid-column>
    </sui-grid-row>

  </sui-grid>

    
</template>

<script>  
  export default {
    name: 'FriendRequestItem',
    props:{
        item: {
            type: Object,
            required: true
        }
    },
    data () {
      return{
        
      }
    },
    methods: {

      
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>