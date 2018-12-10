<template lang="html">
 
</style>
 <div>
    </object>
    <sui-button :color="color" :icon="icon" size="small" :basic="this.pressed"
        @click="clicked()">
      <a
        is="sui-label"
        slot="label"
        :basic="!this.pressed"
        :color="color"
        pointing="left"
        @click="clicked()"
      >
      {{counter}} <!-- string interpolation-->
      </a>
    </sui-button>
  </div>
</template>

<script>

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
