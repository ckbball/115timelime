<template>
  <sui-modal v-model="openFriends">
    <sui-modal-content>

            <sui-table>
              <sui-table-header>
                <sui-table-row>
                  <sui-table-header-cell>
                    <sui-input
                    placeholder="search"
                    icon="search"
                    ></sui-input>
                        
                  </sui-table-header-cell>
                </sui-table-row>

              </sui-table-header>
              <sui-table-body>

              <sui-table-row v-for="friend in friend" :key="friend.id"> 
                <sui-table-cell >

                  <FriendBox
                  :friend="friend">
                  </FriendBox>

                </sui-table-cell>


                </sui-table-row>
              </sui-table-body>

            </sui-table>   

    </sui-modal-content>

  </sui-modal>
</template>
<script>
import db from '@/firebase/init'
import CommentAvatarButton from '@/components/layout/CommentAvatarButton'
import FriendBox from '@/components/FriendBox'

export default {
  name: 'FriendsListModal',
  props: {
      uid: String,
      openFriends: Boolean,
      friend: Array,
  },
  components: {
      'CommentAvatarButton': CommentAvatarButton,
      'FriendBox': FriendBox
  },
  data() {
      return{
          friends: [],
          open: false,

      }
  },
  methods: {
      fetchThisPersonsFriends: function() {
          db.collection('relations').where('uid_'+this.uid, '==', 'true').get()
          .then((snapshot) => {
              snapshot.docs.forEach(doc => {
                  this.friends.push(doc)
              })
          })
      }
  },
  mounted(){
      this.fetchThisPersonsFriends()
  },
  
}
  </script>
<style scoped>
   .FriendName {
    font-size: 11pt;
    position: relative;
    top: 12px;
 }
</style>snapshot.docs.forEach(doc => {
                  this.friends.push(doc)
              })
          })
      }
  },
  mounted(){
      this.fetchThisPersonsFriends()
  }
}
  </script>
<style scoped>
   .FriendName {
    font-size: 11pt;
    position: relative;
    top: 12px;
 }
</style>