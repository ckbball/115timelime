<template lang="html">
  <div>
    <sui-card class="raised">
      <sui-card-content>
        <sui-button 
        v-on:click="open">
        friends
      </sui-button>
      </sui-card-content>
    </sui-card>
  </div>
</template>

<script>
export default {
  name: 'FriendButton',
  data () {
    return {
      input:""
    }
  },
  methods: {
    open() {
      console.log("hey! someone wants to see their friends :)")
      this.$emit("showFriends")
    },
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
