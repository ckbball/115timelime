<template lang="html">
  <div>
    <sui-card class="raised">
      <!-- <sui-card-content> -->
        <sui-button animated="fade" v-on:click="changeFriendStatus()">
            <sui-icon :name="icon"/>
            {{this.buttonContent}}
        </sui-button>
      <!-- </sui-card-content> -->
    </sui-card>
  </div>
</template>

<script>
import db from '@/firebase/init'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'FriendButton',
  props: {
    userInfo: Object
  } ,
  data () {
    return {
      buttonContent: 'Add Friend',
      icon: 'user plus',
      currentSubscription: null,
      relationship: {},
      

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
      'cancelFriendRequest',
      'unfriendAUser'
      ]),
      changeFriendStatus() {
        const requester = this.getUserInfo
        const requestee = this.userInfo

        if (this.relationship.status === 'not friends') {
          this.issueFriendRequest({requester: requester, requestee: requestee})
          this.setButtonContent('loading')
        }
        if (this.relationship.status === 'friends' ) {

          this.unfriendAUser(this.relationship)
        }
        if (this.relationship.status === 'pending') {

          this.setButtonContent('loading')
          this.cancelFriendRequest(this.relationship.lastRequest)
        }
        
      },
      setButtonContent(status){
        if(status === 'pending') {
          this.buttonContent = "Cancel Friend Request"
          this.icon = "user times icon"
        }
        if(status === 'friends') {
          this.buttonContent= "Remove Friend"
          this.icon = "user times icon"
        }
        if(status === 'not friends') {
          this.buttonContent = 'Add Friend'
          this.icon = 'user plus'
        }
        if(status === 'loading') {
          this.icon = 'loading spinner'
        }

      },
      getRelationship(friend) {
        const docID = this.getUserInfo.uid + "_" + friend
        this.currentSubscription = db.collection('relationships').doc(docID)
        .onSnapshot({includeMetadataChanges: true}, doc => {

          if(!doc.exists) {
            this.setButtonContent('not friends')
            this.relationship.status = 'not friends'

          } else {
            this.setButtonContent(doc.data().status)
            this.relationship = doc.data()
}
        })
      }

  },
  mounted() {
    /* This feels hackish... basically just guessing that 1.5 sec is enough time for 
        getUserInfo to fetch from server
    */
   setTimeout(() => {

      this.getRelationship(this.$route.params.uid)
   },3500)


  },
  watch: {
    $route: function(to, from) {
      if(this.currentSubscription) this.currentSubscription()
      this.getRelationship(to.params.uid)
    }
  }


}
</script>

<style scoped>

</style>
