<template>
  <router-link :to="{path: '/user/'+uid}">
     <sui-image 
        class="MessageIcon"
        :src="image" 
        shape="rounded" 
        width="height" />
<!--     <sui-comment-avatar 
      :src="image"
    > -->
    </sui-comment-avatar>
  </router-link>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CommentAvatarButton',
  props: {
    
  },
  data () {
    return {
      userImageLocation: "",
      userUIDLocation: ""
    }
  }, 
  computed: {
      ...mapGetters([
        'getUserInfo',  
    ]),
      
  },
  methods: {
    userImagePropToVariable() {
      console.log(this.getUserInfo.image + 'in CommentAvatarButton')
      this.userImageLocation = this.getUserInfo.image
    },
    userUIDPropToVariable() {
      this.userUIDLocation = this.getUserInfo.uid
    }
  },
  beforeUpdate() {
    this.userImagePropToVariable()
    this.userUIDPropToVariable()
  }
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
