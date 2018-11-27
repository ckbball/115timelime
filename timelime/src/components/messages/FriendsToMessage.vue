<template>
    <sui-card class="FriendCard scroll">
    <sui-table padded>
        <sui-table-header>
          <sui-table-row>
            <sui-table-header-cell >
                
                <span class="FriendHeader">Friends</span>
            </sui-table-header-cell>
          </sui-table-row>
        </sui-table-header>
        <sui-table-body>





<!-- okay, so now we need a new value, which is number or unread friends and we also need friends to have
an unread value so that way we can color based off that  -->


          <sui-table-row v-for="(friend,n) in this.getFriendsMessaged" :key="n"> 

                <sui-table-cell 
                    v-if="friend.unread != '' && friend.unread != friend.uid"  
                    negative 
                    v-on:click="requestMessages(friend)"
                >
                    <sui-grid :columns="2">
                      <sui-grid-column :width="3">
                        <MessageAvatar
                            :uid="friend.uid"
                            :image="friend.image">
                        </MessageAvatar>
                      </sui-grid-column>
                      <sui-grid-column :width="13">
                        <span class="FriendName">{{friend.name}}</span>
                      </sui-grid-column>
                    </sui-grid>
                </sui-table-cell>

                <sui-table-cell
                    v-if="friend.unread == '' || friend.unread == friend.uid"  
                    v-on:click="requestMessages(friend)"
                >
                    <sui-grid :columns="2">
                      <sui-grid-column :width="3">
                        <MessageAvatar
                            :uid="friend.uid"
                            :image="friend.image">
                        </MessageAvatar>
                      </sui-grid-column>
                      <sui-grid-column :width="13">
                        <span class="FriendName">{{friend.name}}</span>
                      </sui-grid-column>
                    </sui-grid>
                </sui-table-cell>


            </sui-table-row>

        </sui-table-body>
    </sui-table>
</sui-card>
</template>

<script> 
import db from '@/firebase/init'
import { mapGetters, mapActions } from 'vuex'

import MessageAvatar from '@/components/messages/MessageAvatar'
export default {
    name: 'FriendsToMessage',
    props: {
      uid: String,
      openFriends: Boolean
    },
    components: {
      'MessageAvatar': MessageAvatar
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
        ])
    },
    methods: {
        ...mapActions([
            'fetchMyMessageStatuses',
            'readMessage'
        ]),
        requestMessages(friend){
            this.readMessage({my_uid: this.getUserInfo.uid, friend: friend})
            // TODO: mia create a firebase function that checks if that message was read or not and change the relations
            this.$emit("changeLoadedMessages", friend)
        },
    },
    update: {
        getAllFriends: function() {

            // store.dispatch('fetchAllMyFriendsPosts', store.getters.getAllFriends)
            // this.fetchAllMyFriendsPosts({my_uid: this.getUserInfo.uid, allMyFriends: this.getAllFriends})
            // store.dispatch('fetchMyMessageStatuses', store.getters.getAllFriends)
            this.fetchMyMessageStatuses({my_uid: this.getUserInfo.uid, allMyFriends: this.getAllFriends})
        }
  },
}
</script>
<style scoped>

.FriendHeader {
    font-weight: 400;
    font-size: 15pt;
    left: 90px;
    position: relative;
    /*
    top: 17px;
    right: 10px;
    color: gray;*/
 }
 .FriendName {
    font-size: 11pt;
    position: relative;
    top: 12px;
    /*
    top: 17px;
    right: 10px;
    color: gray;*/
 }
 .FriendCard {
    position: absolute;
    right: 30px;
    /*
    top: 17px;
    right: 10px;
    color: gray;*/
 }
 .scroll {
    max-height: 700px;
    overflow-y: auto;
}
</style>



