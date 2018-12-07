<template>
    <sui-table>
        <sui-table-header>
            <sui-table-row>
                <sui-table-header-cell textAlign="center">
                    Friends
                </sui-table-header-cell>
            </sui-table-row>
        </sui-table-header>
        <sui-table-body>
            <ul class="scroll2">
                <sui-table-row v-for="(conversation, n) in this.getConversationList" :key="n +'friendtomessage'"
                    @click="selectConversation(conversation.data())">
                    <FriendsToMessageItem 
                        @click="selectConversation(conversation.data())"
                        :conversation="conversation.data()">
                    </FriendsToMessageItem>
                </sui-table-row>
            </ul>
        </sui-table-body>
    </sui-table>
</template>

<script> 
import db from '@/firebase/init'
import { mapGetters, mapActions } from 'vuex'

import MessageAvatar from '@/components/messages/MessageAvatar'
import FriendsToMessageItem from '@/components/messages/FriendsToMessageItem'
export default {
    name: 'FriendsToMessage',
    props: {
      uid: String,
      openFriends: Boolean
    },
    components: {
      'MessageAvatar': MessageAvatar,
      'FriendsToMessageItem': FriendsToMessageItem
    },
    data() {
      return{
          friends: []
      }
    },
    computed: {
        ...mapGetters([
            'getUserInfo',
            'getMyFriends',
            'getAllFriends',
            'getFriendsMessaged',
            'getConversationList'
        ])
    },
    methods: {
        ...mapActions([
            'fetchMyMessageStatuses',
            'readMessage'
        ]),
        nameCase: function(arg) {
            if(!arg) return 'undefined';
            arg = arg.toLowerCase().split(' ')
            .map((word) => {
                return (word.charAt(0).toUpperCase() + word.slice(1))
            })
            return arg.join(' ')
        },

        selectConversation: function(conversation) {
            this.$emit('selectedConversation', conversation)
        },

        // requestMessages(friend){
        //     this.readMessage({my_uid: this.getUserInfo.uid, friend: friend})
        //     // TODO: mia create a firebase function that checks if that message was read or not and change the relations
        //     this.$emit("changeLoadedMessages", friend)
        // },
    },
    update: {
        getAllFriends: function() {
            this.fetchMyMessageStatuses({my_uid: this.getUserInfo.uid, allMyFriends: this.getAllFriends})
        }
  },
}
</script>
<style scoped>

.FriendHeader {
    font-weight: 400;
    font-size: 15pt;
    position: relative;
 }
 .FriendName {
    font-size: 11pt;
    position: relative;
    top: 12px;
 }
 .FriendCard {
    position: absolute;
    right: 30px;
 }
 .scroll {
    max-height: 700px;
    overflow-y: auto;
}
.scroll2{
    /* height: 88vh;
    max-height:88vh;
    overflow:scroll; */
      width: 100%;
  overflow-y:auto;
  overflow-x:hidden;
  height: 77vh;
  list-style: none;
  padding-left:0;
}


</style>



