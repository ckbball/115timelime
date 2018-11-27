<template>
  <div >

   <StandInPost 
    v-if="this.posts.length == 0" 
    @writePost="clickWriteButton()"
  />

    <div class="posts" v-for="(p,n) in this.posts" :key="n">
          <post
            :post="p"
          />
    </div>

</div>

</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

import Post from '@/components/posts/Post'
import StandInPost from '@/components/posts/StandInPost'
import firebase from 'firebase'
import db from '@/firebase/init'

export default {
  name: 'HomeFeed',
  props: {
    uid: {
      type: String,
      //required: true
    }
  },
  computed: {
    ...mapGetters([
      'getUserInfo'
    ]),
    ...mapState([
      'userInfo'
    ]),
  },
  data () {
    return {
      posts: [],
    }
  }, 
  components: {
    "Post": Post,
    "StandInPost": StandInPost,
  },
  methods: {

    clickWriteButton: function() {
    //console.log("clicked at HOMEfeed level")
    this.$emit("writePost")
    },
    getTimelime: function(id) {
      console.log(2, id)
      db.collection('posts').where('whoSees', "array-contains", id)
      .onSnapshot({includeMetadataChanges: true}, (snapshot) => {
        console.log('snapshot size:' , snapshot.size)
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
  mounted() {
    console.log(1, this.getUserInfo.uid)
    this.getTimelime(this.getUserInfo.uid)
  },
  watch: {
    userInfo: function(oldvalue, newvalue) {
      console.log(4, newvalue)
    }
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
