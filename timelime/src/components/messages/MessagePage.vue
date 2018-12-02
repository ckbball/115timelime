<template>
  <div class="page">
    <sui-grid :centered=false container floated="right">
      <sui-grid-column :width="4">
        <FriendsToMessage
          @changeLoadedMessages="changeLoadedMessages($event)"
          @selectedConversation="onSelectedConversation($event)"
        ></FriendsToMessage>
      </sui-grid-column>
      <sui-grid-column :width="12"> 
          <sui-table striped class="MessageBox">
            <sui-table-header>
              <sui-table-row>
                <sui-table-header-cell textAlign="center" class="HeaderText">
                  <p v-if="this.selectedFriend.name">{{ this.nameCase(this.selectedFriend.name) }}</p>
                </sui-table-header-cell>
              </sui-table-row>
            </sui-table-header>
              <sui-table-body >
                  <ul class="MessageBoxCard" v-chat-scroll>
                    <li v-for="(p, n) in this.messages" :key="n +'message'">
                      <MessageContainer  
                          :userInfo="getUserInfo"
                          :friend="friend"
                          :message="p"
                      />
                    </li>
                  </ul>
              </sui-table-body>
             <sui-table-footer>
              <sui-table-row>
                <sui-table-header-cell>
                  <SendMessage v-if="!noFriendSelected" :friend="selectedFriend"/>
                  <p v-if="noFriendSelected">Click a friend on the left to start messaging!</p>

                </sui-table-header-cell>
              </sui-table-row>
            </sui-table-footer> 
          </sui-table>
      </sui-grid-column>
    </sui-grid>
  </div>

</template>

<script>
import router from '@/router/index'
import FriendsToMessage from '@/components/messages/FriendsToMessage'

import {mapActions, mapGetters, mapMutations} from 'vuex'
import MessageContainer from '@/components/messages/MessageContainer'
import SendMessage from '@/components/messages/SendMessage'

import firebase from 'firebase'
import db from '@/firebase/init'

export default {
  name: 'MessagePage',

  components: {
    'MessageContainer': MessageContainer,
    'FriendsToMessage': FriendsToMessage,
    'SendMessage': SendMessage
  },
  props: {
    user: Object,
  },
  computed: {
      ...mapGetters([
        'getUserInfo',
        'getOurMessages',
      ]),
  },
  data () {
    return {
      friend: {},
      selectedFriend: {},
      messages: [],
      noFriendSelected: true
    }
  },
  methods: {
    ...mapActions([
      'fetchMessages',
      'sortMessages'
    ]),
    nameCase: function(arg) {
      arg = arg.toLowerCase().split(' ')
      .map((word) => {
        return (word.charAt(0).toUpperCase() + word.slice(1))
      })
      return arg.join(' ')
    },
    onSelectedConversation: function(event) {
      if (event.uid !== this.selectedFriend.uid) {
        this.selectedFriend = event
        this.messages = []
        this.noFriendSelected = false

        this.fetchConversation(event)
      }
    },
    pushToMessages: function(newMessage) {
      if(this.messages.length === 0) {
        this.messages.push(newMessage)
        return
      }
      if(this.messages[0].time_sent > newMessage.time_sent) {
          this.messages.unshift(newMessage)
          return
      }
      if(this.messages[this.messages.length-1].time_sent < newMessage.time_sent) {
          this.messages.push(newMessage)
          return
      }
      for(let i = 0; i < this.messages.length;  i++){
        if(this.messages[i].time_sent > newMessage.time_sent){
          this.messages.splice(i, 0, newMessage)
          return
        }
      }
    },
    fetchConversation: function(friend) {
      var conv_id = ""
         if(this.getUserInfo.uid > friend.uid){
            conv_id = this.getUserInfo.uid + "_" + friend.uid
        } else {
            conv_id = friend.uid + "_" + this.getUserInfo.uid
        }
        db.collection('messages') .where('conversation_id', '==', conv_id)
        .onSnapshot({includeMetadataChanges: true}, (snapshot) => {
          snapshot.docChanges().forEach((change) =>{
            if (change.type === 'added') {
              this.pushToMessages(change.doc.data())
            }
          })
        })
        

    },


    // changeLoadedMessages(friend){
    //   this.noFriendSelected = false
    //   this.friend = friend 
    //   this.getMessages()
    // },
    // getMessages: function() {
    //   this.fetchMessages({
    //     messager: this.getUserInfo, 
    //     messagee: this.friend, 
    //   })
    //   setTimeout(this.computeOurMessage, 500)

    // },
    // computeOurMessage: function() {
    //     this.sortMessages({my_uid: this.getUserInfo, allMyFriends: this.getOurMessages})
    // },
    
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page {
  height: 85vh;
}
.MessageBox{
  font-weight: 40;
  font-size: 12pt;
  height: 100%;
  top: 0px;
}
.MessageRow{
  top: 5px;
}
.MessageBoxCard {
  width: 100%;
  overflow-y:auto;
  overflow-x:hidden;
  height: 66vh;
  list-style: none;
}
.HeaderText{
    font-weight: 400;
    font-size: 12pt;
}
</style>
