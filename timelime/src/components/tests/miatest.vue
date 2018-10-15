<template>
  <div>
  	<WriteButton></WriteButton>

  </div>
</template>

<script>
/* How to use this page
1.	Create the .vue file for the component you are developing in the 	approprate location 
2. import the file the file
3. register the component in the components: { .... section
4. Now you can use the component in the <template> section and you'll be able to see in by going to this page
*/
import LikeButton from '@/components/user_profile/LikeButton'
import PostLikeButton from '@/components/user_profile/PostLikeButton'
import UserIcon from '@/components/user_profile/UserIcon'
import WriteButton from '@/components/user_profile/WriteButton'

export default {
  name: 'MiaTest',
  components: {
  	'LikeButton': LikeButton,
  	'PostLikeButton': PostLikeButton,
  	'UserIcon': UserIcon,
  	'WriteButton': WriteButton,
  },
  data () {
    return {}
  }, 
  
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
