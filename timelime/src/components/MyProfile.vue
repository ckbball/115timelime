<template lang="html">
  <div>
    <sui-grid :columns="3" :centered=false divided>
      <sui-grid-column :width="3">
      </sui-grid-column>

      <sui-grid-column :width="7">
        <UserFeed fluid
            :uid="getUserInfo.uid"
        />
      </sui-grid-column>
      <sui-grid-column  :width="5">
        <MySideBar
            :userInfo="getUserInfo"
            :uid="uid"
            @editBio="toggle()"
            @editPhoto="togglePhoto()"
            @showFriends="toggleFriends()"
        />
      </sui-grid-column>
    </sui-grid>


    <sui-modal v-model="open" >
      <sui-modal-header> Edit Bio </sui-modal-header>
      <sui-modal-content>
        <sui-modal-description>
          <sui-form>
            <sui-form-field>
            <textarea 
            v-model="newBio" class="fucku" maxlength="200"
            />
            </sui-form-field>
          </sui-form>
        </sui-modal-description>
      </sui-modal-content>
        
      <sui-modal-actions>
        Characters remaining: {{textRemaining}}
        <sui-button negative @click.native="toggle">
          Cancel
        </sui-button>
        <sui-button positive @click.native="saveNewBio">
          Save
        </sui-button>
      </sui-modal-actions>
      
    </sui-modal>


    <sui-modal v-model="openPhoto">
      <sui-modal-header> Change Profile Photo </sui-modal-header>
      <sui-modal-content>
        <sui-modal-description>
          
        </sui-modal-description>
      </sui-modal-content>
        
      <sui-modal-actions>
        Characters remaining: {{textRemaining}}
        <sui-button negative @click.native="togglePhoto">
          Cancel
        </sui-button>
        <sui-button positive @click.native="savePhoto">
          Save
        </sui-button>
      </sui-modal-actions>
      
    </sui-modal>




      <sui-modal v-model="openFriends" size="mini">
        <sui-modal-header>Friends!</sui-modal-header>
        <sui-modal-content scrolling > 
          <!-- scrolling image  -->
          <sui-modal-description>
            <sui-table>
              <sui-table-header>
                <sui-table-row>
                  <sui-table-header-cell>
                    <sui-form>
                      <sui-form-fields>
                        <input
                          placeholder="search"
                        ></input>
                      </sui-form-fields>
                    </sui-form>
                  </sui-table-header-cell>
                </sui-table-row>
              </sui-table-header>
              <sui-table-body>
                <sui-table-row v-for="(friend, n) in getFriends" :key="n">
                  <sui-table-cell>
                    <sui-grid>
                      <sui-grid-row>
                        <sui-grid-column :width="4">
                          <CommentAvatarButton
                            :image="friend.image"
                            :uid="friend.uid"
                          ></CommentAvatarButton>
                        </sui-grid-column>
                        <sui-grid-column :width="12">
                          {{friend.name}}
                        </sui-grid-column>
                      </sui-grid-row>
                    </sui-grid>
                  </sui-table-cell>
                </sui-table-row>
              </sui-table-body>

            </sui-table>

          </sui-modal-description>
        </sui-modal-content>
        <sui-modal-actions>
          <sui-button positive @click.native="toggleFriends">
            Close
          </sui-button>
        </sui-modal-actions>
      </sui-modal>



</div>
</template>



<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import UserFeed from '@/components/posts/UserFeed'
import EditProfileInfo from '@/components/user_profile/EditProfileInfo'
import EditProfilePicture from '@/components/user_profile/EditProfileInfo'
import MySideBar from '@/components/MySideBar'
import Friend from '@/components/user_profile/Friend'
import FriendButton from '@/components/user_profile/FriendButton'
import CommentAvatarButton from '@/components/layout/CommentAvatarButton'

import firebase from 'firebase'
import db from '@/firebase/init'

export default {
  name: 'MyProfile',
    components: {
    "MySideBar": MySideBar,
    "EditProfileInfo": EditProfileInfo,
    "Friend": Friend,
    "FriendButton": FriendButton,
    "UserFeed": UserFeed,
    'CommentAvatarButton': CommentAvatarButton
  },
  data() {
    return {
        open: false,
        newBio:'', 
        openPhoto: false,
        openFriends: false,
        friends: [],

    }
  },
  computed: {
    ...mapGetters([
      'getUserInfo',
      'getFriends'
    ]),
    textRemaining: function(){
        return 200 - this.newBio.length
      },
  },

  methods: {
    toggle: function(){
      this.newBio = this.getUserInfo.bio
      this.open = !this.open;
    },

    saveNewBio(){
      db.collection('users').doc(this.getUserInfo.uid).update({bio: this.newBio})
      .then(() =>{
              this.open = !this.open;
      })
      .catch(err => {
        console.log(err)
      })

    },
    togglePhoto: function(){
      this.openPhoto = !this.openPhoto;
    },
    savePhoto(){
      this.openPhoto = !this.openPhoto;
    },
    toggleFriends: function(){
      this.openFriends = !this.openFriends;
    },


    getFriends() {

      db.collection('relations').where('uid_'+this.getUserInfo.uid, '==', true).get() //'uid_0GkbOriyJFaYUupbZhin', '==', 'true').get()
      .then((snapshot) =>  {
        snapshot.docs.forEach(doc  => {
          // need to check if the other one is true 
          //    if it is set otherUserUID to whateva that value is break it up at the _ and grab that second part 
          var relation = doc.data();
          var otherUserUID = "";
          var thisUserUID = 'uid_'+this.getUserInfo.uid; // 'uid_0GkbOriyJFaYUupbZhin'
          let friends = false;

          for (var property1 in relation) {
            if (property1 == thisUserUID){
              continue;
            } else {
              if (relation[property1] == true){
                otherUserUID = property1.substring(4);
                friends = true;
              } else {
              }
              continue;
            }
          }
          


          if (friends === true){
            db.collection('users').where('uid', '==', otherUserUID).get()
            .then((querySnapshot) => {
              querySnapshot.docs.forEach((doc) => {
                let data = {
                  'name': doc.data().firstName + ' ' + doc.data().lastName,
                  'photo': doc.data().image
                 }
                 this.friends.push(data)
              })
            })
            .catch(err => {
              console.log("failed with error: " + err)
            })
          }



         //  // if it is grab the other uid, and look through the users to find the friend
         //  // once friend is found then grab name and photo

        })
      })
      .catch(err => {
        console.log("failed with error: " + err)
      })


  },
/*
db.collection('relations').doc().where('uid_'+this.getAuthenticatedUser.uid, '==', 'false').get()
.then((snapshot) => {
  snapshot.forEach((doc) => {
    // something impulsive happens
  }
}) */

  },
  mounted () {
    this.getFriends()
  },
  props: {
    user: Object,
    uid: String
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.FriendButton{
  position: relative;
  z-index: 2;
  top: 10px;
}
.PostButtons{
  position: relative;
  z-index: 2;
  top: 20px;
}
.fucku{
  width: 100%;
  resize: none;
  height: 100%;
  border:1px solid lightgray;
  border-radius: 5px;
}
.feed{
  width: 100%;
}
</style>