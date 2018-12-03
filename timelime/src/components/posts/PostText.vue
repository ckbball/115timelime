<template>
  <div class="post">
    <input v-model="textPost" placeholder="When time gives you limes...">
    <button v-on:click="submit">Squeeze!</button>
  

  <div v-for="(post, n) in posts" :key="n">

      <sui-card>
        <sui-card-content>
          <sui-card-header>Post
            <sui-icon class="right floated" size="small" name="like" />
            <sui-icon class="right floated" size="small" name="star" />
          </sui-card-header>
          <p>Here goes the post text</p>

          {{ post.text }}
        </sui-card-content>
        <sui-card-content extra>
          <span>
            <sui-icon name="heart" /> Like
          </span>
          <span slot="right">
            <sui-icon name="star" /> Favorite
          </span>
        </sui-card-content>
      </sui-card>

  </div>

</div>


</template>

<script>
// import firebase from 'firebase'
// import db from '@/firebase/init'

// export default {
//   name: 'Post',
//   data () {
//     return {
//       textPost: '',
//       posts: [],
//     }
//   }, 
//   methods: {
//     submit() {
//       db.collection('posts').add({
//         text: this.textPost,
//       })
//       .then(docRef => {
//         db.collection('posts').doc(docRef.id).update({id: docRef.id})
//       })
//       .catch(err => {
//         console.log("failed with error: " + err)
//       })
//     }, 
//     getPosts() {
//       db.collection('posts').get()
//       .then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//           let data = {
//             'id': doc.id,
//             'text': doc.data().text
//           }
//           this.posts.push(data)
//         })
//       })
//       .catch(err => {
//         console.log("failed with error: " + err)
//       })
//       console.log(this.posts)
//     }
//   },
//   created () {
//     this.getPosts()
//     console.log(this.posts[0])
//   }
// }
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
