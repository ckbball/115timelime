<template>
    <sui-grid :columns="2" :centered=false >
      <sui-grid-column :width="4">
      	<FriendsToMessage
          @changeLoadedMessages="changeLoadedMessages($event)"
        > </FriendsToMessage>
      </sui-grid-column>

      <sui-grid-column :width="7">
        <!-- need to pass down the "friend" object when the user clicks on the left column cell -->
      	<MessageContainer fluid
            :userInfo="getUserInfo"
            
        />
      </sui-grid-column>
    </sui-grid>

</template>

<script>
import router from '@/router/index'
import FriendsToMessage from '@/components/messages/FriendsToMessage'

import {mapActions, mapGetters, mapMutations} from 'vuex'
import MessageContainer from '@/components/messages/MessageContainer'


import firebase from 'firebase'
import db from '@/firebase/init'

export default {
  name: 'MessagePage',

  components: {
    'MessageContainer': MessageContainer,
    'FriendsToMessage': FriendsToMessage,
  },
  props: {
    user: Object,
  },
  computed: {
      ...mapGetters([
        'getUserInfo',
      ]),
  },
  data () {
    return {
      }
  },
   methods: {
      changeLoadedMessages(uid){
          console.log(uid)
      },
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
