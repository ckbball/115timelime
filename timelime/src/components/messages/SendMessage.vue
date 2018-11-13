<template lang="html">
  <div>  
    <input v-model="message" placeholder="Type your message here..."/>
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
      messageReceiver: {},
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
        var us2_uid = 'TESTUID'
        var us1_name = 'name_' +this.getUserInfo.uid
        var name1 = this.getUserInfo.firstName + ' ' +this.getUserInfo.lastName
        var us2_name = 'name_TESTUID'
        var name2 = 'FIRSTNAME LASTNAME'
        // images for us1 and us2
        var us1_img = 'image_'+this.getUserInfo.uid
        var image1 = this.getUserInfo.image
        var us2_img = 'image_TESTUID'
        var image2 = 'IMAGEURL'
        db.collection('messages').add({
          [us1_name]: name1,
          [us2_name]: name2,
          [us1_img]: image1,
          [us2_img]: image2
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
