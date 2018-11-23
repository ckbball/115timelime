<template>
  <div v-if="this.posts.length > 0" >
    <post class="posts" v-for="(p,n) in posts" :key="n"
      :post="p"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Post from '@/components/posts/Post'

import firebase from 'firebase'
import db from '@/firebase/init'

export default {
  name: 'UserFeed',
  components: {
    "Post": Post,
  },
  data () {
    return {
      posts: [],
    }
  },  
  methods: {
    getPostsOfAUser: function(uid) {
      this.posts = []
      db.collection('posts').where('parent_id', '==', uid)
      .onSnapshot({includeMetadataChanges: true}, (snapshot) => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            this.posts.push(change.doc.data())
          }
          if (change.type === 'modified') {
            this.posts.forEach(post => {
              if(post.post_id === change.doc.data().post_id){
                post.whoLikes = change.doc.data().whoLikes
                post.commentIDs = change.doc.data().commentIDs
              }
            })
          }
        })
      })
    }
  },

  watch: {
    $route: function(to, from) {
      this.getPostsOfAUser(to.params.uid)
    }
  },
  mounted() {
    this.getPostsOfAUser(this.$route.params.uid)
    console.log('adasd')
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
