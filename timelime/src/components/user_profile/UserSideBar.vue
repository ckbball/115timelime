<template lang="html">
  <div>
   <UserIcon 
      :userInfo="userInfo"
    />
    <sui-card>
      <sui-card-content>
        <sui-button
          icon="users"
          content="friends"
          @click="$emit('showFriends')"
        ></sui-button>
<!--         <sui-button 
          @click="friendshipChangeHandler()"         
          :content="content"
          :icon="icon"
        ></sui-button> -->
      </sui-card-content>
    </sui-card>
    <FriendButton 
    v-bind:userInfo="userInfo" 
    v-bind:isFriend="isFriend"
    v-on:pendFriend="setFriendshipStatus('pending')"
    v-on:notFriend="setFriendshipStatus('false')"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserIcon from '@/components/user_profile/UserIcon'
import FriendButton from '@/components/user_profile/FriendButton'
import * as firebase from 'firebase'
import db from '@/firebase/init'
export default {
  name: 'UserSideBar',
  props: {
    userInfo: Object,
  },
  components: {
    "UserIcon": UserIcon,
    "FriendButton": FriendButton,
  },
  data() {
    return { 
      icon: 'user plus',
      content: 'add',
      open: false,
      text: "",
      isFriend: 'false',
      relation_id: null
    };
  },
  computed: {
    ...mapGetters([
      'getFriends',
      'getUserInfo'
      ])
  },

  methods: {
    // requestFriendship: function({my_id, their_id}){
    //   db.collection('relations').add({
    //     ['uid_'+my_id]: 'true',
    //     ['uid_'+their_id]: 'false'
    //   })
    //   .then(docRef => {
    //     this.relation_id = docRef.id
    //     this.setFriendshipStatus('pending')
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
    // },
    // cancelFriendship: function(doc_id) {
    //   db.collection('relations').doc(doc_id).delete()
    //   .then(() => {
    //     this.setFriendshipStatus('false')
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })

    // },
    // friendshipChangeHandler: function() {
    //   if(this.isFriend === 'false'){
    //     this.requestFriendship({my_id: this.getUserInfo.uid, their_id: this.userInfo.uid})
    //   } else {
    //     this.cancelFriendship(this.relation_id)
    //   }
    // },

    showFriends: function(){
      console.log("hey! someone REALLY REALLY wants to see their friends! :)")
      this.$emit("showFriends")
    },

    // areFriends: function(){
    //   if (this.getUserInfo !== null) {
    //     var us1 = 'uid_'+this.getUserInfo.uid
    //     var us2 = 'uid_'+this.userInfo.uid
    //     db.collection('relations').where(us1, "==", 'true').where(us2, "==", 'true')
    //     .onSnapshot((snapshot) => {
    //       if (snapshot.size != 0)
    //         this.isFriend = 'true'
    //       else {
    //         db.collection('relations').where(us1, "==", 'true').where(us2, "==", 'false')
    //         .onSnapshot((snapshot) => {
    //           if (snapshot.size != 0)
    //             this.isFriend = 'pending'
    //           else 
    //             this.isFriend = 'false'
    //         })
    //       }
    //     })
    //   }
    // },
    areFriends: function() {
      this.getFriends.forEach(friend => {
        var accepted = friend.data()['uid_'+this.userInfo.uid]
        if (accepted !== undefined) {
          if (accepted == 'true') {
            this.setFriendshipStatus('true')
          } else if (accepted == 'false') {
            this.setFriendshipStatus('pending')
          } else {
            this.setFriendshipStatus('false')
          }
        }
      })
    },
    setFriendshipStatus: function(status) {
      if(status === 'true') {
        this.isFriend = 'true'
        // this.icon='check'
        // this.content='friends'
      }
      if(status === 'pending') {
        this.isFriend = 'pending'
        // this.icon='clock outline'
        // this.content='pending'
      }
      if (status === 'false') {
        this.isFriend = 'false'
        // this.icon='user plus'
        // this.content='add'
      }
    }
  },
  mounted() {
    this.areFriends()
  },
};

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
</style>