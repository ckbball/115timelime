<template lang="html">
  <div>
    </object>
    <sui-button v-bind:icon="icon" @click="clickButton()"
    :color="getPrimaryColor"
    />
  </div>
</template>


<script>
  import { mapGetters } from 'vuex'
export default {
  name: 'Button',
  data () {
    return {
    }
  },
  props: {
    icon: String,
    status: Boolean,
  },
  methods: {
    clickButton: function() {
      this.$emit("clicked")
    }
  },
  computed: {
    ...mapGetters([
      'getPrimaryColor'
    ])
  } 
  
  
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
