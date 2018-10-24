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
        <sui-image src="https://images.pexels.com/photos/1466845/pexels-photo-1466845.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>
        {{item.firstName}} {{item.lastName}}
      </sui-dropdown-item>
              
      <sui-dropdown-item v-if="isLoading == true">
        Loading...
      </sui-dropdown-item>

      <sui-dropdown-item v-else-if="!isLoading && entries.length > 0"
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
      entries: [],
      descriptionLimit: 60,

    }
  },
  watch: {
    searchText: function() {
      this.debouncedGetSearchResults()
      
    }
  },
  created: function() {
    this.debouncedGetSearchResults = this.lodash.debounce(this.getSearchResults, 500)
  },
  methods: {
    setLoading: function(bool) {
      console.log(bool)
      this.isLoading = bool
      if (this.isLoading == true) {
        this.icon = 'spinner loading'
        console.log(this.icon)    
      }
      else
        this.icon = 'search'

    },
    getSearchResults: function() {
      if (this.entries.length > 0) return; // data already loaded
      if (this.isLoading) return; // data already requested 

      this.setLoading(true)

      setTimeout(() => { 
       //simulate return from getter 
       this.entries = [
        {id: 1, firstName: 'donovan', lastName: 'rost'},
        {id: 2, firstName: 'mia', lastName: 'altieri'},
        {id: 3, firstName: 'kenji', lastName: 'takeshi'},
        {id: 5, firstName: 'caesar', lastName: 'landon'},
        ]
       this.setLoading(false)


      },1000)

    },
    test: function(id) {
      console.log('test ', id)
    }
  },
  computed: {
    items () {
      return this.entries.filter(entry => {
        return (entry.firstName.substring(0, this.searchText.length) == this.searchText) || (entry.lastName.substring(0, this.searchText.length) == this.searchText)
      })
    }
  }


    

  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
