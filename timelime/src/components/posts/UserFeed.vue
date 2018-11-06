<template>
  <div >

    <div class="posts" v-for="(post, n) in posts" :key="n">
        <Post :post="post"/>
    </div>

</div>

</template>

<script>
import Post from '@/components/posts/Post'
import firebase from 'firebase'
import db from '@/firebase/init'

export default {
  name: 'UserFeed',
  data () {
    return {
      textPost: '',
      posts: [],
      uid: '0GkbOriyJFaYUupbZhin',
    }
  }, 
  components: {
    "Post": Post,
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
    // getPosts() {
    //   console.log('gettting this users posts....')
    //   db.collection('posts').get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       let data = {
    //         'id': doc.id,
    //         'text': doc.data().text
    //       }
    //       this.posts.push(data)
    //     })
    //   })
    //   .catch(err => {
    //     console.log("failed with error: " + err)
    //   })
    //   // console.log(this.posts)
    // },
    fetchPosts() {
      console.log('fetch called')
      db.collection('posts').where('parent_id', '==', this.uid).get()
      .then((snapshot) => {
        snapshot.docs.forEach(doc => {
          this.posts.push(doc.data())
        })
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    this.fetchPosts()
    // console.log(this.posts[0])
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
  .posts{
    position: relative;
    z-index: 2;
    width: 100%;
  }
</style>
