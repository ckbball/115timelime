<template>

  <div >
    <sui-loader :active="loading"
    ></sui-loader>
    <sui-grid :columns="3" :centered=false divided v-if="this.otherUsersInfo">
      <sui-grid-column :width="3">
      </sui-grid-column>

      <sui-grid-column :width="7">
        <UserFeed fluid
          :uid="otherUsersInfo.uid"
        />
      </sui-grid-column>
      <sui-grid-column  :width="5">
        <UserSideBar
        :userInfo="otherUsersInfo"
        v-on:showFriends="toggleFriendsModal()"
        />
      </sui-grid-column>
      <FriendsListModal
        :uid="otherUsersInfo.uid"
        :openFriends="openFriends" 
        :friend="friends"
      ></FriendsListModal>
    </sui-grid>


  </div>

</template>
<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import UserFeed from '@/components/posts/UserFeed'
import UserSideBar from '@/components/user_profile/UserSideBar'
import FriendsListModal from '@/components/user_profile/FriendsListModal'

import firebase from 'firebase'
import db from '@/firebase/init'

export default {
  name: 'UserProfile',
  components: {
    "UserSideBar": UserSideBar,
    "UserFeed": UserFeed,
    'FriendsListModal': FriendsListModal
  },
  data() {
    return {
      otherUsersInfo: null,
      openFriends: false,
      show: false,
      loading: false,
      friends: [],
    }
  },
  
  methods: {

    toggleFriendsModal: function(){
      this.openFriends = !this.openFriends;
      this.fetchFriends()
    },
    fetchFriends: function() {
      this.friends = []
      var param = 'uid_' + this.otherUsersInfo.uid
      db.collection('relations').where(param, '>=', 'a' )
      .onSnapshot({includeMetadataChanges: true}, (snapshot) => {
            snapshot.docChanges().forEach(change => {
              if (change.type === 'added') {
                this.friends.push(change.doc.data())
              }
              if (change.type === 'modified') {
              }
            })
      })

    },
    fetchUserInfo: function(uid) {
      this.loading = true
      db.collection('users').doc(uid).get()
      .then(doc => {
        this.otherUsersInfo = doc.data()
        this.loading = false
      })
      .catch(err => {
        console.log(err)
      })
      
    },

  },
  watch: {
    $route: function(to, from) {
      this.fetchUserInfo(to.params.uid)
    },

  },
  mounted() {
    this.fetchUserInfo(this.$route.params.uid)
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