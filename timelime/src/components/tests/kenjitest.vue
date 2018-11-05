<template>
  <div>
    <UserProfile v-bind:uid="uid"/>
  </div>
</template>

<script>
import bar from '@/components/general/bar'
import EditProfileInfo from '@/components/user_profile/EditProfileInfo'
import Button from '@/components/user_profile/Button'
import PostLikeButton from '@/components/user_profile/PostLikeButton'
import UserIcon from '@/components/user_profile/UserIcon'
import UserProfile from '@/components/user_profile/UserProfile'
import UserSideBar from '@/components/user_profile/UserSideBar'
import { mapGetters } from 'vuex'

export default {
  name: 'KenjiTest',
  components: {
    'bar': bar,
    'EditProfileInfo': EditProfileInfo,
    'Button': Button,
    'PostLikeButton': PostLikeButton,
    'UserIcon': UserIcon,
    'UserProfile': UserProfile,
    'UserSideBar': UserSideBar,
  },
  data () {
    return {}
  },
  methods: {},
  props: {
    uid: String
  }
}
</script>

<style scoped>
</style>
