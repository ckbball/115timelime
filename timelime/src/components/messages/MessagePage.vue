<template>
  <div>
    <sui-grid :columns="2" :centered=false >
      <sui-grid-column :width="4">
      	<FriendsToMessage
          @changeLoadedMessages="changeLoadedMessages($event)"
        > </FriendsToMessage>
      </sui-grid-column>

      <sui-grid-column :width="10">
        <div class="MessageBox">
          <sui-table striped>
            <sui-table-header>
              <sui-table-row>
                <sui-table-header-cell text-align="center">{{ this.friend.name}}</sui-table-header-cell>
              </sui-table-row>
            </sui-table-header>

            <sui-table-body>
                  <sui-table-row class="MessageRow"> 
                    <div v-for="(p, n) in this.getOurMessages" :key="n">
                      <MessageContainer 
                          :userInfo="getUserInfo"
                          :friend="friend"
                          :message="p"
                      />
                    </div>


                  </sui-table-row>
            </sui-table-body>

            <sui-table-footer>
              
            </sui-table-footer>
          </sui-table>


      </div>

      <div>
        <SendMessage v-if="!noFriendSelected" :friend="friend"/>
        <p v-if="noFriendSelected">Click a friend on the left to start messaging!</p>
      </div>
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
      noFriendSelected: true
    }
  },
  methods: {
    ...mapActions([
      'fetchMessages',
      'sortMessages'
    ]),
    changeLoadedMessages(friend){
      this.noFriendSelected = false
      this.friend = friend 
      this.getMessages()
    },
    getMessages: function() {
      
      this.fetchMessages({messager: this.getUserInfo, 
                         messagee: this.friend, 
                       })
      
      
      setTimeout(this.computeOurMessage, 500)
      
      
    },
    computeOurMessage: function() {
        this.sortMessages({my_uid: this.getUserInfo, allMyFriends: this.getOurMessages})
    },
    
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.MessageBox{
  font-weight: 40;
  font-size: 12pt;
  width: 100%;
  top: 0px;
}
.MessageRow{
  
  top: 5px;
}
</style>
