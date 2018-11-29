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
       @click="toUser(item.uid)">
        <sui-image :src="item.image"/>
        {{lodash.capitalize(item.firstName)}} 
        {{lodash.capitalize(item.lastName)}}
      </sui-dropdown-item>
              
      <sui-dropdown-item v-if="isLoading == true">
        Loading...
      </sui-dropdown-item>

      <sui-dropdown-item v-else-if="!isLoading && getResults.length > 0"
       @click="toSearchPage()" 
      >
        See more
      </sui-dropdown-item>

      <sui-dropdown-item v-else="">
        Type to search users
      </sui-dropdown-item>

    </sui-dropdown-menu>
  </sui-dropdown>

</template>

<script>
import {mapMutations, mapGetters, mapActions} from 'vuex'
export default {
  name: 'NavbarSearchBar',
  components: {
  },
  data () {
    return {
      searchText: '',
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
    ...mapActions([
      'fetchSearchResult'
    ]),
    setLoading: function(bool) {
      this.isLoading = bool
      if (this.isLoading == true) 
        this.icon = 'spinner loading'
      else
        this.icon = 'search'

    },
    getSearchResults: function() {
      if (this.getResults.length > 0) return; // data already loaded
      if (this.isLoading) return; // data already requested 
      if (this.searchText.length == 0) return // param on which to query is none


      this.setLoading(true)
      this.setResults([])

      this.axios.get('https://us-central1-timelime-96d47.cloudfunctions.net/searchUsers',{
        params: {
          name: this.searchText,
          type: 'mini'
        }
      })
      .then(response => {
        let results = []
        response.data.forEach(datum => {
          results.push(datum)
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
    toSearchPage: function() {
      this.$router.push({path: '/search'})
    },
    toUser: function(uid) {
      this.$router.push({path: '/user/'+uid})
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
