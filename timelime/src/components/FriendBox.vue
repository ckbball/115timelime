<template lang="html">
  <div class="box">


          <sui-grid :columns="2">
            <sui-grid-column :width="3">
            <MessageAvatar
              :uid="this.friend.friend_uid"
              :image="this.friend.friend_image">
            </MessageAvatar> 
            </sui-grid-column>
            <sui-grid-column :width="13">
              <span class="FriendName">{{this.friend.friend_name}}</span>
            </sui-grid-column>
          </sui-grid>


  </div>
</template>

<script>
import MessageAvatar from '@/components/messages/MessageAvatar'
import {mapActions, mapGetters, mapMutations} from 'vuex'

export default {
  name: 'FriendBox',
  components: {
    "MessageAvatar": MessageAvatar,
  },
  props: {
    friend : Object

  },
  computed: {
    ...mapGetters([
        'getUserInfo',
    ]),
  },
  data() {
    return {
      // friend_uid: String,
      // friend_image: String,
      // friend_name: String
    }
  },
  // created: function() {
  //   var _index = this.friend.conversation_id.indexOf('_')
  //   var id1 = this.friend.conversation_id.substring(0, _index)
  //   var id2 = this.friend.conversation_id.substring(_index + 1, this.friend.conversation_id.length)
    
  //   if(this.getUserInfo.uid === id1) {
  //     this.friend_uid = id2
  //     var img = 'image_' + id2
  //     var name = 'name_' + id2
  //     for(var property in this.friend) {
  //       if(property === img){
  //         this.friend_image = this.friend[property]
  //       }
  //       if(property === name){
  //         this.friend_name = this.friend[property]
  //       }
  //     }

  //   } else{
  //     this.friend_uid = id1
  //     var img = 'image_' + id1
  //     var name = 'name_' + id1
  //     for(var property in this.friend) {
  //       if(property === img){
  //         this.friend_image = this.friend[property]
  //       }
  //       if(property === name){
  //         this.friend_name = this.friend[property]
  //       }
  //     }
  //   }
    
  // }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.avatar {
  margin: 0px;
  display: inline-block;
}
   .FriendName {
    font-size: .9em;
    position: relative;
    top: .5em;
    left: -1em;
 }
.name {
  margin: 0px;
  display: inline-block;

}

.box {
  font-size: 24px;
}

</style>