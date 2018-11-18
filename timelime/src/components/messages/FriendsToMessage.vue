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
          <sui-table-row v-for="(friend,n) in this.getMyFriends" :key="n"> 
            <sui-table-cell v-on:click="requestMessages(friend)">

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
import { mapGetters } from 'vuex'

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
            'getMyFriends'
        ])
    },
    methods: {
        requestMessages(friend){
            console.log(friend)
            this.$emit("changeLoadedMessages", friend)
        },
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



