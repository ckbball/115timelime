<template lang="html">

    <!-- if the message is one that I sent show it in my box -->
    <div v-if="message.sender_uid == getUserInfo.uid">
      <div class="time">
        {{ timeSent }}
      </div>
      <MyMessageBox
        :message="message"
        :image="getUserInfo.image"
        :uid="getUserInfo.uid">
      </MyMessageBox>
    </div>
    <!-- if the message is one that friend sent show it in friend box -->
    <div v-else>
      <div class="time">
        {{ timeSent }}
      </div>
      <FriendsMessageBox
        :message="message"
        :image="friend.image"
        :uid="friend.uid">
      </FriendsMessageBox>
    </div>   
</template>

<script>
import db from '@/firebase/init'
import { mapGetters, mapActions } from 'vuex'
import MyMessageBox from '@/components/messages/MyMessageBox'
import FriendsMessageBox from '@/components/messages/FriendsMessageBox'
import MessageAvatar from '@/components/messages/MessageAvatar'

export default {
  name: 'MessageContainer',
  components: {
    'MyMessageBox': MyMessageBox,
    'FriendsMessageBox': FriendsMessageBox,
    'MessageAvatar': MessageAvatar
  },
  props: {
    userInfo: Object,
    friend: Object,
    message: {
      type: Object,
    }
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'getUserInfo',
    ]),
    timeSent: function(){
        var moment = require('moment')
        var time_sent = this.message.time_sent
        return moment(time_sent).format("MMM Do, YYYY, h:mm A")
        //.format('days h:mm')
    },
  },


}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.time {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .7em;
  color: darkgray;

}

</style>