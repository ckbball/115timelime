<template lang="html">
  <div>  
    <input v-model="messageContent" placeholder="Type your message here..."/>
    <button v-on:click="sendMessage()">save</button>
    <div>{{ saved }}</div>
  </div>
</template>

<script>
import db from '@/firebase/init'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'SendMessage',
  data () {
    return {
      messageContent: "",
      messageID: "TEST_MESSAGE_ID",
      time: "TEST_TIME"
    }
  },
  computed: {
    ...mapGetters([
      'getUserInfo'
    ])
  },
  methods: {
    sendMessage() {
      if (this.getUserInfo !== null) {
        // names for us1 and us2
        var uid1 = this.getUserInfo.uid
        var name1 = this.getUserInfo.firstName + ' ' +this.getUserInfo.lastName
        var image1 = this.getUserInfo.image
        var uid2 = 'TEST_UID'
        var name2 = 'TEST_NAME'
        var image2 = 'TEST_IMAGE'
        db.collection('messages').add({
          message_id: this.messageID,
          time_sent: this.time,
          message_content: this.messageContent,
          sender_uid: uid1,
          sender_name: name1,
          sender_image: image1,
          receiver_uid: uid2,
          receiver_name: name2,
          receiver_image: image2
        })
        .then(docRef => {
          db.collection('relations').doc(docRef.id).update({self_id: docRef.id})
        })    
      }
    }
  }
}
</script>

<style scoped>
</style>
