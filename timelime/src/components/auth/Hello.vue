<template>
  <div>
  <p> Hello there. Welcome</p>
  <button v-on:click="logout">Logout</button>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Hello',
  data () {
    return {}
  }, 
  methods: {
    logout() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('Login')
      })
    } 
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
