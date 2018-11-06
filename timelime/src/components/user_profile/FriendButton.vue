<template lang="html">
  <div>
    <sui-card class="raised">
      <sui-card-content>
        <sui-button 
        v-on:click="open">
        friends
      </sui-button>
        <div is="sui-button" animated="fade" v-on:click="changeFriendStatus">
            <sui-button-content visible v-if="isFriend == 'true'">
              Remove Friend
            </sui-button-content>
            <sui-button-content hidden v-if="isFriend == 'true'">
              <i class="user times icon"></i>
            </sui-button-content>

            <sui-button-content visible v-if="isFriend == 'false'">
              Add Friend
            </sui-button-content>
            <sui-button-content hidden v-if="isFriend == 'false'">
              <i class="user plus icon"></i>
            </sui-button-content>

            <sui-button-content visible v-if="isFriend == 'pending'">
              Cancel Friend Request
            </sui-button-content>
            <sui-button-content hidden v-if="isFriend == 'pending'">
              <i class="user times icon"></i>
            </sui-button-content>
        </div>
      </sui-card-content>
    </sui-card>
  </div>
</template>

<script>
import db from '@/firebase/init'
import { mapGetters } from 'vuex'

export default {
  name: 'FriendButton',
  data () {
    return {
      input:""
    }
  },
  computed: {
    ...mapGetters(['getUserInfo'])
  },
  methods: {
    open() {
      console.log("hey! someone wants to see their friends :)")
      this.$emit("showFriends")
    },
    changeFriendStatus() {
      if (this.getUserInfo !== null) {
        var us1 = 'uid_'+this.getUserInfo.uid
        var us2 = 'uid_'+this.userInfo.uid
        if (this.isFriend === "false") {
          db.collection('relations').doc()
          .set({
            type: "friend",
            [us1]: 'true',
            [us2]: 'false'
          })
        } else if (this.isFriend === "true") {
          db.collection('relations').where(us1, "==", 'true').where(us2, "==", 'true').get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              doc.ref.delete()
            })
          })
          .catch((err) => {
            console.log(err)
          })
        } else {
          db.collection('relations').where(us1, "==", 'true').where(us2, "==", 'false').get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              doc.ref.delete()
            })
          })
          .catch((err) => {
            console.log(err)
          })
        }        
      }
    }
  },
  props: {
    isFriend: String,
    userInfo: Object
  } 
}
</script>

<style scoped>

</style>
