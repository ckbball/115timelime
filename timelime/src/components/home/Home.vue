<template lang="html">
  <div>
    <sui-grid :columns="3" :centered=false divided>
      <sui-grid-column :width="3">
      </sui-grid-column>

      <sui-grid-column :width="7">
        <HomeFeed fluid
            :uid="getUserInfo.uid"
        />
      </sui-grid-column>
      <sui-grid-column  :width="5">
        <HomeSideBar
            :userInfo="getUserInfo"
            @writePost="toggleWritePost()"
        />
      </sui-grid-column>
    </sui-grid>

     <sui-modal v-model="openWritePost">
      <CreateNewPostModal @ContinueTextPost="toggleWritePost" :userInfo="getUserInfo" />
    </sui-modal>

	</div>
</template>


<script>
import router from '@/router/index'

import {mapActions, mapGetters, mapMutations} from 'vuex'
import HomeFeed from '@/components/home/HomeFeed'
import HomeSideBar from '@/components/home/HomeSideBar'
import CreateNewPostModal from '@/components/posts/CreateNewPostModal'

import firebase from 'firebase'
import db from '@/firebase/init'

export default {
	name: 'Home',
	components: {
		'HomeSideBar': HomeSideBar,
		'HomeFeed': HomeFeed,
		'CreateNewPostModal': CreateNewPostModal
	},
	props: {
		user: Object,
	},
	data() {
	    return {
	        open: false,
	        newBio:'', 
	        openPhoto: false,
	        openFriends: false,
	        friends: [],
        	openWritePost: false
	    }
	  },
	  computed: {
	    ...mapGetters([
	      'getUserInfo',
	    ]),
	    textRemaining: function(){
	        return 200 - this.newBio.length
	      },
	  },

	  methods: {

	    toggle: function(){
	      this.newBio = this.getUserInfo.bio
	      this.open = !this.open;
	    },
	    toggleWritePost: function(){
	      this.openWritePost = !this.openWritePost;
	    },
	    saveNewBio(){
	      db.collection('users').doc(this.getUserInfo.uid).update({bio: this.newBio})
	      .then(() =>{
	              this.open = !this.open;
	      })
	      .catch(err => {
	        console.log(err)
	      })

	    },
	    togglePhoto: function(){
	      this.openPhoto = !this.openPhoto;
	    },
	    savePhoto(){
	      this.openPhoto = !this.openPhoto;
	    },
	    toggleFriends: function(){
	      this.openFriends = !this.openFriends;
	    },

	}
}
  

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.FriendButton{
  position: relative;
  z-index: 2;
  top: 10px;
}
.PostButtons{
  position: relative;
  z-index: 2;
  top: 20px;
}
.fucku{
  width: 100%;
  resize: none;
  height: 100%;
  border:1px solid lightgray;
  border-radius: 5px;
}
.feed{
  width: 100%;
}
</style>