<template>
  <div>
  <p> Hello there. Welcome</p>
  <button v-on:click="logout">Logout</button>
  </div>
</template>

<script>
import firebase from 'firebase'
import { mapActions } from 'vuex'

export default {
  name: 'Hello',
  data () {
    return {}
  }, 
  methods: {
    ...mapActions([
      'signUserOut'
    ]),
    logout() {
      this.signUserOut()
      .catch(err => {
        alert('Oops! '+ err.messages)
      })
    } 
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
