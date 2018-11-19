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
                         messagee: this.friend, 
                         messageContent: this.messageContent
                       })
    }
  },
  props: {
    friend: Object
  }
}
</script>

<style scoped>
  .most {
    width: calc(100% - 77px);
    float: left;
  }
</style>
