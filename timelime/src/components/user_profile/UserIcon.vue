<template lang="html">
  <div>
    <sui-card class="raised">
      <sui-image :src="user.image" class=ProfilePicture />
      <sui-card-content>
        <div v-if="isAuthUser" class="ui grid">
          <div class="two wide column">
             <EditProfileInfo
              @editBio="changeBio()"
              class= "editInfo"/> 
          </div>
          <div class="two wide column">
            <EditProfilePicture
              @editPhoto="changeProfileImage()"
              class="editImage"/> 
          </div>
        </div>
        <sui-card-header>{{this.user.firstName}} {{this.user.lastName}}</sui-card-header>
        <sui-card-meta>Joined {{this.user.joinedDate}}</sui-card-meta>
        <sui-card-description>{{this.user.bio}}</sui-card-description>
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
      images: {
        user_lemon: require('@/assets/user_lemon.png')
      }
    }
  },
  methods: {
    editProfileImage: function(){
      console.log("request to change profile picture")
    },
    changeProfileImage: function(){
      console.log("hey! someone REALLY wants to edit this profile picture :)")
      this.$emit("editPhoto")
    },
    changeBio: function(){
      console.log("hey! someone REALLY wants to edit this profile! :)")
      this.$emit("editBio")
    },
    ...mapMutations(['updateUser']),
    setBio: function(text){
      this.$store.commit('updateUser')
    },
  },
  props: {
    isAuthUser: Boolean,
    user: Object
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
