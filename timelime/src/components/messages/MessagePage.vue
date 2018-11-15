<template>


    <sui-grid :columns="2" :centered=false divided>
      <sui-grid-column :width="5">
      	<p> friends to messenge </p>
      </sui-grid-column>

      <sui-grid-column :width="7">
      	<p> actual messenges </p>
      </sui-grid-column>
    </sui-grid>

</template>

<script>
import router from '@/router/index'

export default {
  name: 'MessagePage',
  data () {
    return {
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
