<template lang="html">
  <div>
    <sui-grid :columns="2" :centered=false>
      <sui-grid-column :width="2">
        *user icon*
      </sui-grid-column>
      
      <sui-grid-column  :width="14">
      <sui-card>
        <sui-card-content>
          *actual message*
        </sui-card-content>
      </sui-card>

      </sui-grid-column>
      
    </sui-grid>
  </div>
</template>

<script>
export default {
  name: 'FriendsMessageBox',
  props: {
    
  },
  data() {
    return {

    }
  },
  methods: {

  }


}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>