<template>
  <div >

   <StandInPost 
    v-if="this.getTimelime.length == 0" 
    @writePost="clickWriteButton()"
  />

    <div class="posts" v-for="(p,n) in this.getTimelime" :key="n">
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
      'getUserInfo',
      'getTimelime'
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
      this.$emit("writePost")
    },
  
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
