<template>
  <div>
  <div>
    <StandInPost 
      v-if="this.posts.length === 0" 
      @writePost="clickWriteButton()"
      :uid="this.$route.params.uid"
    />

  </div>

  <div v-if="this.posts.length > 0" >
    <post class="posts" v-for="(p,n) in this.posts" :key="n"
      :post="p"
    />
  </div>
  </div>
</template>

<script>

import Post from '@/components/posts/Post'
import StandInPost from '@/components/posts/StandInPost'

import firebase from 'firebase'
import db from '@/firebase/init'

export default {
  name: 'UserFeed',
  components: {
    "Post": Post,
    "StandInPost": StandInPost,
  },
  data () {
    return {
      posts: [],
    }
  }, 
  methods: {
    clickWriteButton: function() {
      this.$emit("writePost")
    },
    getPostsOfAUser: function(uid) {
      this.posts = []
      db.collection('posts').where('parent_id', '==', uid)
      .onSnapshot({includeMetadataChanges: true}, (snapshot) => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            this.posts.push(change.doc.data())
            function compareUploadTime(post1, post2) {
              if (post1.upload_time > post2.upload_time)
                  return -1
              if (post1.upload_time < post2.upload_time)
                  return 1
              return 0
            }
            this.posts.sort(compareUploadTime)
          }
          if (change.type === 'modified') {
            this.posts.forEach(post => {
              if(post.post_id === change.doc.data().post_id){
                post.whoLikes = change.doc.data().whoLikes
                post.commentIDs = change.doc.data().commentIDs
                post.author_image = change.doc.data().author_image
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
