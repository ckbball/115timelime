<template>
  <sui-button color="red" icon="heart" @click="likeHandler" :basic="!likedState">
    <a
      is="sui-label"
      slot="label"
      :basic="likedState"
      color="red"
      pointing="left"
    >
      {{parent.whoLikes.length}}
    </a>
  </sui-button>
</template>

<script>
import Button from '@/components/user_profile/Button'
import firebase from 'firebase'
import db from '@/firebase/init'
import { mapGetters } from 'vuex'
export default {
  name: 'PostLikeButton',
  components: {
    "Button": Button
  },
  props: {
    parent: {
      type: Object
    }

  },
  data () {
    return {
     numberOfLikes: 0
    }
  },
  computed:{
      ...mapGetters(['getUserInfo']),
    likedState: function() {
      if(this.parent.whoLikes.indexOf(this.getUserInfo.uid) ===  -1) return true;
      if(this.parent.whoLikes.indexOf(this.getUserInfo.uid) > -1) return false;
    },
  },
  methods: {


    likeHandler: function() {
      if(this.parent.whoLikes.indexOf(this.getUserInfo.uid) ===  -1){
        db.collection('posts').doc(this.parent.post_id)
        .update({"whoLikes": firebase.firestore.FieldValue.arrayUnion(this.getUserInfo.uid)})
      }
      if(this.parent.whoLikes.indexOf(this.getUserInfo.uid) > -1){
        db.collection('posts').doc(this.parent.post_id)
        .update({"whoLikes": firebase.firestore.FieldValue.arrayRemove(this.getUserInfo.uid)})
    }
    }
  }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
