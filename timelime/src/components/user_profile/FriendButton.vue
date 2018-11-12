<template lang="html">
  <div>
    <sui-card class="raised">
      <sui-card-content>
        <!-- issueFriendRequest(this.getUserInfo, this.userInfo)"> -->
        <div is="sui-button" animated="fade" v-on:click="changeFriendStatus()">
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
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'FriendButton',
  data () {
    return {
      input:"",
      // desiredAction: ""
    }
  },
  computed: {
    ...mapGetters([
      'getUserInfo'
      ])
  },
  methods: {
    ...mapActions([
      'issueFriendRequest',
      ]),
    // this function will depend on the desiredAction
    // addFriend(){
    //   console.log("action taken on friend page")
    //   console.log(this.getUserInfo, this.userInfo)
    //   this.issueFriendRequest({requester: this.getUserInfo, requestee: this.userInfo})
    // },
    changeFriendStatus() {
      if (this.getUserInfo !== null) {
        var us1 = 'uid_'+this.getUserInfo.uid
        var us2 = 'uid_'+this.userInfo.uid
        // names for us1 and us2
        var us1_name = 'name_' +this.getUserInfo.uid
        var name1 = this.getUserInfo.firstName + ' ' +this.getUserInfo.lastName
        var us2_name = 'name_' +this.userInfo.uid
        var name2 = this.userInfo.firstName + ' ' +this.userInfo.lastName
        // images for us1 and us2
        var us1_img = ['image_'+this.getUserInfo.uid]
        var image1 = this.getUserInfo.image
        var us2_img = ['image_'+this.userInfo.uid]
        var image2 = this.userInfo.image

        if (this.isFriend === "false") {
          db.collection('relations').add({
            type: "friend",
            [us1]: 'true',
            [us2]: 'false',
            [us1_name]: name1,
            [us2_name]: name2,
            [us1_img]: image1,
            [us2_img]: image2
          })
          .then(docRef => {
            db.collection('relations').doc(docRef.id).update({self_id: docRef.id})
        })
          this.$emit('pendFriend')
        } else if (this.isFriend === "true") {
          db.collection('relations').where(us1, "==", 'true').where(us2, "==", 'true').get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              doc.ref.delete()
            })
            this.$emit('notFriend')
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
            this.$emit('notFriend')
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
