<template>
  <SearchPageResult></SearchPageResult>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex'
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
  }




    

  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
