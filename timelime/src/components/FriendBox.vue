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

    }
  },
 

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