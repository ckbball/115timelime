<template lang="html">
  <div>
    <sui-card>
      <sui-image src="https://images.pexels.com/photos/1466845/pexels-photo-1466845.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" class=ProfilePicture />
      <sui-card-content>
        <sui-card-header>{{Name}}</sui-card-header>
        <sui-card-meta>Joined in 2013</sui-card-meta>
        <sui-card-description>{{Bio}}</sui-card-description>
      </sui-card-content>
      <sui-card-content extra>
        <sui-icon name="user"/>
        22 Friends</sui-card-content>
    </sui-card>
    <WriteButton 
      class="editInfo"
      v-on:edit="editProfileText()"
    ></WriteButton>
    <WriteButton 
      class="editImage"
      v-on:edit="editProfileImage()"
    ></WriteButton>
  </div>
</template>

<script>
  import WriteButton from '@/components/user_profile/WriteButton'
  export default {
  name: 'UserIcon',
  components: {
    "WriteButton": WriteButton,
  },
  data () {
    return {
      Name:"Kristy",
      Bio: "Kristy is an art director living in New York."
    }
  },
  methods: {
    editProfileText: function(){
      console.log("request to edit changes to profile")
    },
    editProfileImage: function(){
      console.log("request to change profile picture")
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
  position: relative;
  margin-right: 350px;
  top: -143px;
  z-index: 2;
}
.editImage{
  position: relative;
  margin-right: 350px;
  top: -480px;
  z-index: 2;
}
</style>
