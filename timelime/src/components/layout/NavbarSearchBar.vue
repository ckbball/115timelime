<template>

  <sui-dropdown 
    item
    :icon="icon"
    floating
    labeled>

    <sui-input
      inverted
      v-model="searchText"
      placeholder="Search...."
    ></sui-input>

    <sui-dropdown-menu >

      <sui-dropdown-item v-for="item in items.slice(0,6)"
        :key="item.id"
       @click="test(item.id)">
        <sui-image :src="item.image"/>
        {{item.firstName}} {{item.lastName}}
      </sui-dropdown-item>
              
      <sui-dropdown-item v-if="isLoading == true">
        Loading...
      </sui-dropdown-item>

      <sui-dropdown-item v-else-if="!isLoading && getResults.length > 0"
        @click="test('id')">

        See more
      </sui-dropdown-item>

      <sui-dropdown-item v-else="">
        Type to search users
      </sui-dropdown-item>

    </sui-dropdown-menu>
  </sui-dropdown>

</template>

<script>
import {mapMutations, mapGetters} from 'vuex'
export default {
  name: 'NavbarSearchBar',
  components: {
  },
  data () {
    return {
      searchText: null,
      isLoading: false,
      icon:'search',
      count: null,
      //entries: [],
      descriptionLimit: 60,

    }
  },
  watch: {
    searchText: function() {
      if (this.searchText.length == 0)
        this.setResults([])

      this.debouncedGetSearchResults()
      
    }
  },
  created: function() {
    this.debouncedGetSearchResults = this.lodash.debounce(this.getSearchResults, 500)
  },
  methods: {
    ...mapMutations([
      'setResults'
    ]),
    setLoading: function(bool) {
      this.isLoading = bool
      if (this.isLoading == true) {
        this.icon = 'spinner loading'
      }
      else
        this.icon = 'search'

    },
    getSearchResults: function() {
      if (this.getResults.length > 0) return; // data already loaded
      if (this.isLoading) return; // data already requested 
      if (this.searchText.length == 0) return // param on which to query


      this.setLoading(true)
      this.setResults([])

      this.axios.get('http://localhost:5001/timelime-96d47/us-central1/searchUsers/', {
        params: {
          name: this.searchText
        }
      })
      .then(response => {
        let results = []
        response.data.forEach(datum => {
          results.push(datum)
          console.log(datum)

        })
        this.setResults(results)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(()=> {
        this.setLoading(false)
      })

    },
    test: function(id) {
      console.log('test ', id)
    }
  },
  computed: {
    ...mapGetters([
      'getResults'
    ]),
    items () {
      return this.getResults.filter(entry => {
        return (entry.firstName.substring(0, this.searchText.length) == this.searchText) || (entry.lastName.substring(0, this.searchText.length) == this.searchText)
      })
    }
  }


    

  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
