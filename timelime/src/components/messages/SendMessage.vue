<template lang="html">
  <div>  
    <sui-form>
      <sui-form-field>
        <textarea
          @keydown="inputHandler"
          attached
          :rows="nrows"
          v-model="messageContent"
          placeholder="Type your message here..."
        ></textarea>
      </sui-form-field>
    </sui-form>
  </div>
</template>

<script>
import db from '@/firebase/init'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'SendMessage',
  props: {
    conversation: Object
  },
  data () {
    return {
      messageContent: "",
    }
  },
  computed: {
    ...mapGetters([
      'getUserInfo'
    ]),
    nrows: function() {
      return (Math.floor(this.messageContent.length / 50)) + 1
    }
  },
  methods: {
    ...mapActions([
      'issueMessage',
    ]),
    sendMessage() {
      this.issueMessage({
        messager: this.getUserInfo, 
        conversation: this.conversation, 
        messageContent: this.messageContent
      })
      this.messageContent = ""
    },
    inputHandler: function(e){
      if (e.keyCode === 13 && !e.shiftKey) {
          e.preventDefault();
          this.sendMessage();
      }
      if(e.keyCode === 13 && e.shiftKey) {
          this.messageContent = this.messageContent + '\n'
      }
    }
  },

}
</script>

<style scoped>
  .most {
    width: calc(100% - 77px);
    float: left;
  }
</style>
