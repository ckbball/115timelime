<template lang="html">
  <div>
    <sui-card class="raised">
      <sui-image src="https://images.pexels.com/photos/1466845/pexels-photo-1466845.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" class=ProfilePicture />
      <sui-card-content>
        <div class="ui grid">
          <div class="two wide column">
             <EditProfileInfo 
              class= "editInfo"
              :Header="this.Header" 
              :Bio="getUser.Bio"
              v-on:inputEvent="setBio($event)"/> 
          </div>
          <div class="two wide column">
            <EditProfilePicture
              class="editImage" 
            /> 
          </div>
        </div>
        <sui-card-header>{{getUser.Name}}</sui-card-header>
        <sui-card-meta>Joined in 2013</sui-card-meta>
        <sui-card-description>{{getUser.Bio}}</sui-card-description>
      </sui-card-content>
    </sui-card>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import EditProfileInfo from '@/components/user_profile/EditProfileInfo'
  import EditProfilePicture from '@/components/user_profile/EditProfilePicture'
  export default {
  name: 'UserIcon',
  components: {
    "EditProfileInfo": EditProfileInfo,
    "EditProfilePicture": EditProfilePicture,
  },
  data () {
    return {
      Header: "Bio",
      Friends: 0
    }
  },
   computed: {
    ...mapGetters(['getUser'])
  },
  methods: {
    editProfileImage: function(){
      console.log("request to change profile picture")
    },
    ...mapMutations(['updateUser']),
    setBio: function(text){
      this.$store.commit('updateUser')
    },
  } 
  
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ProfilePicture{
  width: 300px;
  height: 300px;
  object-fit: cover;
}
.editInfo{
  z-index: 2;
  position: relative;
  margin-left: 134px;
  top: -5px;
}
.editImage{
  position: relative;
  margin-left: 51px;
  top: -5px;
  z-index: 2;
}
</style>
