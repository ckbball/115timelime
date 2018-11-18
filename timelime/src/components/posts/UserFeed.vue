<template>
  <div >
    <div class="posts" v-for="(p,n) in posts" :key="n">
          <post
            :post="p"
          />
    </div>

<!--     <div class="posts" v-for="(post, n) in posts" :key="n">
        <Post :post="post"/>
    </div> -->

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
      db.collection('posts').where('parent_id', '==', uid).get()
      .then((snapshot) => {
        snapshot.docs.forEach(doc => {
          this.posts.push(doc.data())
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
