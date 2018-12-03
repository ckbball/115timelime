<template lang="html">
  <div>
    <sui-card class="raised" v-if="isAuthUser || isFriend == 'true'">
      <sui-card-content>
        <sui-button icon="edit"/>
        <sui-button icon="camera retro"/>
        <sui-button icon="film"/>
      </sui-card-content>
    </sui-card>
  </div>
</template>

<script>
export default {
  name: 'Bar',
  data () {
    return {
      input:""
    }
  },
  methods: {
  },
  props: {
    isAuthUser: Boolean,
    isFriend: String
  }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
