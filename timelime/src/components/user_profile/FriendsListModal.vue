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

              <sui-table-row v-for="friend in friends" :key="friend.id"> 
                <sui-table-cell >

                    <sui-grid :columns="2">
                      <sui-grid-column :width="3">
                        <CommentAvatarButton>
                            :uid="friend.id"
                        </CommentAvatarButton>
                      </sui-grid-column>
                      <sui-grid-column :width="13">
                        <span class="FriendName">{{friend.data().firstName}} {{friend.data().lastName}}</span>
                      </sui-grid-column>
                    </sui-grid>
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
export default {
  name: 'FriendsListModal',
  props: {
      uid: String,
      openFriends: Boolean
  },
  components: {
      'CommentAvatarButton': CommentAvatarButton
  },
  data() {
      return{
          friends: []

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