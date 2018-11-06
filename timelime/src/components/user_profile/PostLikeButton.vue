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
  data () {
    return {
      counter:0,
      liked:false,
      color:"red",
      icon:"heart",
      docid: "",
    }
  },
  methods: {
    toggleLike: function(){
      console.log(event)
      if (this.liked){
        this.counter--
        this.liked = false
        this.delLike()
      } 
      else {
        this.counter++
        this.liked = true
        this.postLike()
      }
    },
    postLike() {
      var day = Date()
      db.collection('likes').add({
        postId: this.pid,
        date: day.toLocaleString("en-US"),
        uid: this.uid
      })
      .then(docRef => {
        db.collection('likes').doc(docRef.id).update({id: docRef.id})
        this.docid = docRef.id
        console.log(this.docid)
      })
      .catch(err => {
        console.log("failed with error: " + err)
      })
    },
    delLike() {
      var postid = this.pid
      console.log("Just checked postid")
      var userid = this.uid
      db.collection('likes').where('postId', '==', postid).where('uid', '==', userid).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  db.collection('likes').doc(doc.id).delete().then(function() {
                    console.log("Like successfully removed")
                  })
                  .catch(err => {
                    console.log("Error removing like: " + err)
                  })

                })
            })
            .catch(err => {
              console.log("failed with error: " + err)
            })

    },
    getDate() {
      db.collection('likes').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let data = {
            'id': doc.id,
            'date': doc.data().date,
            'post': doc.data().postId,
            'uid': doc.data().uid,
          }
          this.likes.push(data)
        })
      })
      .catch(err => {
        console.log("failed with error: " + err)
      })
    }

  },
  props: {
    user: Object,
    uid: String,
    pid: String
  }
  
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
