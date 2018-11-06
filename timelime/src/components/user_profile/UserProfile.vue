<template>
  <div>
    <sui-grid :columns="3" :centered=false divided>
      <sui-grid-column :width="3">
      </sui-grid-column>

      <sui-grid-column :width="7">
        <UserFeed fluid
        v-bind:uid="uid"
        />
      </sui-grid-column>
      <sui-grid-column  :width="5">
        <UserSideBar
        :userInfo="otherUsersInfo"
        v-on:showFriends="toggleFriendsModal()"
        />
      </sui-grid-column>
    </sui-grid>
    <FriendsListModal
     :uid="uid"
     :openFriends="openFriends" 
    ></FriendsListModal>


  </div>

</template>

<script>
export default {
  name: 'CelledExample',
};
</script>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import UserFeed from '@/components/posts/UserFeed'
import UserSideBar from '@/components/user_profile/UserSideBar'
import FriendsListModal from '@/components/user_profile/FriendsListModal'


import firebase from 'firebase'
import db from '@/firebase/init'

export default {
  name: 'UserProfile',
  props: {
    uid: String
  },
  components: {
    "UserSideBar": UserSideBar,
    "UserFeed": UserFeed,
    'FriendsListModal': FriendsListModal
  },
  data() {
      return{
        otherUsersInfo: {},
        openFriends: false

      }
  },
  
  computed: {
    ...mapGetters([
      'getUserInfo'
    ]),
    textRemaining: function(){
        return 200 - this.newBio.length
    },
  },

  methods: {
    ...mapActions(['updateUserBio']),

    fetchOtherUsersInfo: function() {
      db.collection('users').doc(this.uid).get()
      .then((doc) => {
        this.otherUsersInfo = doc.data()
      })
    },

    toggleFriendsModal: function(){
      this.openFriends = !this.openFriends;
    },
  


  //   getFriends() {

  //     db.collection('relations').where('uid_'+this.getUserInfo.uid, '==', true).get() //'uid_0GkbOriyJFaYUupbZhin', '==', 'true').get()
  //     .then((snapshot) =>  {
  //       snapshot.docs.forEach(doc  => {
  //         // need to check if the other one is true 
  //         //    if it is set otherUserUID to whateva that value is break it up at the _ and grab that second part 
  //         var relation = doc.data();
  //         var otherUserUID = "";
  //         var thisUserUID = 'uid_'+this.getUserInfo.uid; // 'uid_0GkbOriyJFaYUupbZhin'
  //         let friends = false;

  //         for (var property1 in relation) {
  //           if (property1 == thisUserUID){
  //             continue;
  //           } else {
  //             if (relation[property1] == true){
  //               otherUserUID = property1.substring(4);
  //               friends = true;
  //             } else {
  //             }
  //             continue;
  //           }
  //         }
          


  //         if (friends === true){
  //           db.collection('users').where('uid', '==', otherUserUID).get()
  //           .then((querySnapshot) => {
  //             querySnapshot.docs.forEach((doc) => {
  //               let data = {
  //                 'name': doc.data().firstName + ' ' + doc.data().lastName,
  //                 'photo': doc.data().image
  //                }
  //                this.friends.push(data)
  //             })
  //           })
  //           .catch(err => {
  //             console.log("failed with error: " + err)
  //           })
  //         }



  //        //  // if it is grab the other uid, and look through the users to find the friend
  //        //  // once friend is found then grab name and photo

  //       })
  //     })
  //     .catch(err => {
  //       console.log("failed with error: " + err)
  //     })


  // },
/*
db.collection('relations').doc().where('uid_'+this.getAuthenticatedUser.uid, '==', 'false').get()
.then((snapshot) => {
  snapshot.forEach((doc) => {
    // something impulsive happens
  }
}) */

  },
  mounted() {
    this.fetchOtherUsersInfo()
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