<template lang="html">
  <div>  
    <sui-input class="most" v-model="messageContent" placeholder="Type your message here..."/>
    <sui-button v-on:click="sendMessage()">Send</sui-button>
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
      userInfo: {
        uid: 'uid_hAy1HyEEWZZhub8OL5LCV9jTXbY2',
        firstName: 'mia',
        lastName: 'miaaa',
        image: 'https://www.familyhandyman.com/wp-content/uploads/2017/09/dfh17sep001_shutterstock_550013404.jpg'
      }
    }
  },
  computed: {
    ...mapGetters([
      'getUserInfo'
    ])
  },
  methods: {
    ...mapActions([
      'issueMessage',
    ]),
    sendMessage() {
      this.issueMessage({messager: this.getUserInfo, 
                         messagee: this.userInfo, 
                         conversationID: this.conversationID, 
                         messageContent: this.messageContent
                       })
    },
  },
  props: {
    conversationID: String
  }
}
</script>

<style scoped>
  .most {
    width: calc(100% - 77px);
    float: left;
  }
</style>
