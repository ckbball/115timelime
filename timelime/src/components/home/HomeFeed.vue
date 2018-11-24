<template>
  <div >

   <StandInPost 
    v-if="this.getAllMyNetworksPosts.length == 0" 
    @writePost="clickWriteButton()"
  />

    <div class="posts" v-for="(p,n) in this.getAllMyNetworksPosts" :key="n">
          <post
            :post="p.data()"
          />
    </div>

</div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

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
      'getAllMyNetworksPosts',
      'getAllFriends',
      'getUserInfo'
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
    ...mapActions([
      'fetchAllMyFriendsPosts'
    ]),
    clickWriteButton: function() {
    console.log("clicked at HOMEfeed level")
    this.$emit("writePost")
  },
  },
  // mounted () {
  //   console.log('anal-hole')
  //   this.fetchAllMyFriendsPosts(this.getAllFriends)
  // },
  watch: {
    getAllFriends: function() {
      this.fetchAllMyFriendsPosts({my_uid: this.getUserInfo.uid, allMyFriends: this.getAllFriends})
    }
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
