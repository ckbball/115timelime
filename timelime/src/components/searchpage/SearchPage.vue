<template>
  <sui-grid container>
    <sui-grid-row centered>
      <sui-grid-column :width="8">
        <sui-table>
          <sui-table-header celled>
            <sui-table-header-cell>
              People
            </sui-table-header-cell>
          </sui-table-header>
          <sui-table-body>
            <sui-table-row v-for="(n,result) in getResults" :key="n">
              <SearchPageResult :result="result">
              </SearchPageResult>

            </sui-table-row>
          </sui-table-body>
        </sui-table>
      </sui-grid-column>
    </sui-grid-row>
  </sui-grid>
</template>

<script>
import {mapMutations, mapGetters, mapActions} from 'vuex'
import SearchPageResult from '@/components/searchpage/SearchPageResult'
export default {
  name: 'SearchPage',
  components: {
    'SearchPageResult': SearchPageResult
  },
  data () {
    return {


    }
  },
  computed: {
    ...mapGetters([
      'getResults'
    ])
  },
  methods: {
    ...mapActions([

    ])
  }




    

  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
