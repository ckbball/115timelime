<template lang="html">
  <div>
    <Button
      :counter="this.counter"
      :color="this.color"
      :icon="this.icon"
      v-on:clickEvent="toggleLike()"
      v-on:click="toggleLike()"
    ></Button>
  </div>
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
    post_id: {
      type: String,
      required: true,
    }
  },
  data () {
    return {
      counter:0,
      liked:false,
      color:"red",
      icon:"heart",
      docid: ""
    }
  },
  computed:{
      ...mapGetters(['getUserInfo'])
  },
  methods: {
    toggleLike: function(){
      console.log(event)
      if (this.liked){
        this.counter--
        this.liked = false
        this.deleteLike()
      } 
      else {
        this.counter++
        this.liked = true
        this.addLike()
      }
    },
    addLike: function() {
      this.axios.post('http://localhost:5001/timelime-96d47/us-central1/addLike', {
          parent_id: this.post_id,
          author_uid: this.getUserInfo.uid,
          author_image: this.getUserInfo.image,
          author_name: this.getUserInfo.firstName + ' ' + this.getUserInfo.lastName,
      })
      .then(docRef => {
          db.collection('likes').doc(docRef.id).update({likeid: docRef.id})
          this.docid = docRef.id
      })
      .catch(err => {
        console.log("failed with error: " + err)
      })
    },
    deleteLike() {
      this.axios.post('http://localhost:5001/timelime-96d47/us-central1/removeLike', {
          author_uid: this.getUserInfo.uid,
          parent_id: this.post_id
      })
      .then(docRef => {
        console.log("like deleted")
      })
      .catch(err => {
        console.log("failed with error: " + err)
      })

    },

  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
