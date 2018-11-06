<template>
  <sui-modal v-model="openFriends">
    <sui-modal-content>
      <sui-grid>
        <sui-grid-row>
          <sui-grid-column :width="4">

          </sui-grid-column>
          <sui-grid-column :width="8">
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
                    <CommentAvatarButton>
                        :uid="friend.id"
                    </CommentAvatarButton>
                    <p>{{friend.data().firstName}} {{friend.data().lastName}}</p>

                  </sui-table-row>
              </sui-table-body>

            </sui-table>   
          </sui-grid-column>
          <sui-grid-column :width="4">
            
          </sui-grid-column>
        </sui-grid-row>
        
      </sui-grid>
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
                  friends.push(doc)
              })
          })
      }
  },
  mounted(){
      this.fetchThisPersonsFriends()
  }
}
  </script>