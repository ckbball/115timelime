<template lang="html">
  <div>
      <sui-card  v-if="uid === this.getUserInfo.uid || uid === '' "  class="UserPost">
        <sui-card-content>
          <span class="top"> YOU HAVE NO POSTS :( </span>
          <p>create a new post using <sui-button icon="pencil alternate" @click="clickWriteButton()"/> in your side bar </p>
          <p> or find friends with posts using the search bar above </p>
          <sui-image 
            src="http://pixelartmaker.com/art/602231445d9af8c.png"
            size="medium"
          />
          <br/>
          <br/>
          <br/>
          <p> happy posting! </p>

        </sui-card-content>
      </sui-card>


      <sui-card  v-if="uid != this.getUserInfo.uid"  class="UserPost">
        <sui-card-content>
          <span class="top"> THIS USER HAS NO POSTS :( </span>
          <br/>
          <sui-image 
            src="https://art.pixilart.com/94b0fa92bfcf878.png"
            size="medium"
          />


        </sui-card-content>
      </sui-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import firebase from 'firebase'
import db from '@/firebase/init'

export default {
  name: 'StandInPost',
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'getUserInfo',
      'getAllFriends'
    ]),
  },
  props: { 
    uid: String,
  },
  methods: {
    clickWriteButton: function() {
      this.$emit("writePost")
    }
  }


}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.UserPost{
  width: 100%;
}
.top{
  font-weight: 400;
  font-size: 15pt;
  position: relative;
}

</style>