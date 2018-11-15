<template>
  <div >
    <div class="posts" v-for="(p,n) in this.getAllMyPosts" :key="n">
          <post
            :post="p.data()"
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
  name: 'MyFeed',
  props: {
    uid: {
      type: String,
      //required: true
    }
  },
  data () {
    return {
      // posts: [],
    }
  },  
  computed: {
    ...mapGetters([
      'getAllMyPosts'
    ]),
  },
  components: {
    "Post": Post,
  },
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
