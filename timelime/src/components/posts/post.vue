<template>
  <div class="post">
    <input v-model="textPost" placeholder="When time gives you limes...">
    <button v-on:click="submit">Squeeze!</button>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'

export default {
  name: 'Post',
  data () {
    return {
      textPost: '',
      posts: [],
    }
  }, 
  methods: {
    submit() {
      db.collection('posts').add({
        text: this.textPost,
      })
      .then(docRef => {
        db.collection('posts').doc(docRef.id).update({id: docRef.id})
      })
      .catch(err => {
        console.log("failed with error: " + err)
      })
    }, 
    getPosts() {
      db.collection('posts').get()
      .then((snapshot) => {
        snapshot.docs.forEach(doc => {
          this.posts.push(doc.text)
        })
      })
      .catch(err => {
        console.log("failed with error: " + err)
      })
    }
  },
  created () {
    this.getPosts()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  input {
    margin: 10px 0;
    width: 300px;
    padding: 15px;
  }
  button {
    margin-top: 20px;
    width: 100px;
    cursor: pointer;
  }
</style>
