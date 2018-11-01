<template>

  <sui-table-cell>
    <sui-grid>
      <sui-grid-row>
        <sui-grid-column :width="2" floated="left">
          <sui-image 
            class="square"
            :src="result.image" 
            fluid
            size="tiny"
          />
          </sui-grid-column>
          <sui-grid-column :width="14" textAlign="left" verticalAlign="middle">
            <p class="results-text"> 
            {{this.lodash.capitalize(result.firstName)}} 
            {{this.lodash.capitalize(result.lastName)}}</p>
          </sui-grid-column>

        </sui-grid-row>
      </sui-grid>
  </sui-table-cell>




</template>

<script>
export default {
  name: 'SearchPageResult',
  props:{
    result: Object
  },
  components: {
  },
  data () {
    return {


    }
  },





    

  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.results-text{
  font-weight:150;
  font-size: 2em;
}



</style>
