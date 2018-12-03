<template>
  <router-link v-if="this.uid" :to="{path: '/user/'+uid}">
     <sui-image 
        class="MessageIcon"
        :src="image" 
        shape="rounded" 
        width="height" />
  </router-link>

</template>

<script>
export default {
  name: 'MessageAvatarButton',
  props: {
    image: String,
    uid: String
  },
  data () {
    return {
    }
  },  
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.MessageIcon{
  width: 40px;
  height: 40px;
  object-fit: cover;
}
</style>