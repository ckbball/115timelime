<template lang="html">
  <div>
   <UserIcon 
      :userInfo="userInfo"
    />
    <sui-card>
      <sui-card-content>
        <sui-button
          icon="users"
          content="friends"
          @click="$emit('showFriends')"
        ></sui-button>
      </sui-card-content>
    </sui-card>
    <FriendButton 
    v-bind:userInfo="userInfo" 
    v-bind:isFriend="isFriend"
    v-on:pendFriend="setFriendshipStatus('pending')"
    v-on:notFriend="setFriendshipStatus('false')"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserIcon from '@/components/user_profile/UserIcon'
import FriendButton from '@/components/user_profile/FriendButton'
import * as firebase from 'firebase'
import db from '@/firebase/init'
export default {
  name: 'UserSideBar',
  props: {
    userInfo: {
      type: Object,
      default: null,
    }
  },
  components: {
    "UserIcon": UserIcon,
    "FriendButton": FriendButton,
  },
  data() {
    return { 
      icon: 'user plus',
      content: 'add',
      open: false,
      text: "",
      isFriend: 'false',
      relation_id: null
    };
  },
  computed: {
    ...mapGetters([
      'getAllRelations',
      'getUserInfo'
      ])
  },

  methods: {
    showFriends: function(){
      this.$emit("showFriends")
    },
    areFriends: function() {
      this.getAllRelations.forEach(friend => {
        var accepted = friend.data()['uid_'+this.userInfo.uid]
        if (accepted !== undefined) {
          if (accepted == 'true') {
            this.setFriendshipStatus('true')
          } else if (accepted == 'false') {
            this.setFriendshipStatus('pending')
          } else {
            this.setFriendshipStatus('false')
          }
        }
      })
    },
    setFriendshipStatus: function(status) {
      if(status === 'true') {
        this.isFriend = 'true'
      }
      if(status === 'pending') {
        this.isFriend = 'pending'

      }
      if (status === 'false') {
        this.isFriend = 'false'

      }
    }
  },
  watch: {
    getAllRelations: function () {
      this.areFriends()
    }
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.FriendButton{
  position: relative;
  z-index: 2;
  top: 10px;
}
.PostButtons{
  position: relative;
  z-index: 2;
  top: 20px;
}
</style>