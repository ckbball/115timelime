<template>
  <div>
  	<!-- <UserSideBar/> -->
    
    <PhotoPost/>
  </div>
</template>

<script>
/* How to use this page
1.	Create the .vue file for the component you are developing in the 	approprate location 
2. import the file the file
3. register the component in the components: { .... section
4. Now you can use the component in the <template> section and you'll be able to see in by going to this page
*/


import bar from '@/components/general/bar'
import EditProfileInfo from '@/components/user_profile/EditProfileInfo'
import Button from '@/components/user_profile/Button'
import PostLikeButton from '@/components/user_profile/PostLikeButton'
import Navbar from '@/components/layout/Navbar'
import UserIcon from '@/components/user_profile/UserIcon'
import UserProfile from '@/components/user_profile/UserProfile'
import UserSideBar from '@/components/user_profile/UserSideBar'
import PhotoPost from '@/components/posts/PhotoPost'

export default {
  name: 'MiaTest',
  components: {
    'bar': bar,
    'EditProfileInfo': EditProfileInfo,
  	'Button': Button,
    'Navbar': Navbar,
  	'PostLikeButton': PostLikeButton,
  	'UserIcon': UserIcon,
    'UserProfile': UserProfile,
    'UserSideBar': UserSideBar,
    'PhotoPost': PhotoPost,
  },
  data () {
    return {}
  }, 
  
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
