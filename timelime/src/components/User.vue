<template>
  <div>
    
    <MyProfile v-if="uid === getUserInfo.uid"></MyProfile>
    <UserProfile v-else :otherUsersInfo="otherUsersInfo"/>






  
  </div>
</template>

<script>
import router from '@/router/index'
import UserProfile from '@/components/user_profile/UserProfile'
import MyProfile from '@/components/MyProfile'
import db from '@/firebase/init'
import { mapGetters } from 'vuex'

export default {
  name: 'User',
  props: {
    uid: String
  },
  data () {
    return {
      otherUsersInfo: {},
      activeUID: ''

    }
  }, 
  components : {
    'UserProfile': UserProfile,
    'MyProfile': MyProfile
  },
  computed: {
    ...mapGetters([
      'getUserInfo'
    ])
  },
  methods: {
    fetchOtherUsersInfo: function() {
      db.collection('users').doc(this.uid).get()
        .then((doc) => {
            this.otherUsersInfo = doc.data()
            console.log(doc.data())
          })
    },
    // getUser() {
    //   db.collection('users').doc(this.uid).get()
    //   .then((doc) => {
    //     if (doc.exists) {
    //       this.user.uid = doc.data().uid
    //       this.user.firstName = doc.data().firstName
    //       this.user.lastName = doc.data().lastName
    //       this.user.email = doc.data().email,
    //       this.user.joinedDate = doc.data().joinedDate,
    //       this.user.bio = doc.data().bio
    //       this.user.image = doc.data().image
    //     } else {
    //       console.log("No such user '"+this.uid+"'")
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
    // },  
  },
  watch: {
    '$route' (to, from) {
      if(to.params.uid != this.getUserInfo.uid){
        this.fetchOtherUsersInfo()
      }
    }
  },
  mounted() {
    this.fetchOtherUsersInfo()
  }



  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
