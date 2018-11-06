<template>
  <div>
    <MyProfile v-if="uid === getUserInfo.uid"></MyProfile>
    <UserProfile v-else :uid="uid"/>
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
      user: {
        uid: 'uid',
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'email',
        joinedDate: 'joinedDate',
        bio: 'bio',
        image: 'https://www.familyhandyman.com/wp-content/uploads/2017/09/dfh17sep001_shutterstock_550013404.jpg',
      },
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
    getUser() {
      db.collection('users').doc(this.uid).get()
      .then((doc) => {
        if (doc.exists) {
          this.user.uid = doc.data().uid
          this.user.firstName = doc.data().firstName
          this.user.lastName = doc.data().lastName
          this.user.email = doc.data().email,
          this.user.joinedDate = doc.data().joinedDate,
          this.user.bio = doc.data().bio
          this.user.image = doc.data().image
        } else {
          console.log("No such user '"+this.uid+"'")
        }
      })
      .catch((err) => {
        console.log(err)
      })
    },  
  },

  created() {
    this.getUser()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
