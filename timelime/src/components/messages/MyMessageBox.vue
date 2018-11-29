<template lang="html">
  <div >
      <sui-grid :columns="2">
        <sui-grid-column :width="14" text-align="right">
          <div class="message">
            {{ message.message_content }}
          </div>   
        </sui-grid-column>

        <sui-grid-column :width="2">
          <span class="avatar">
            <MessageAvatar
              :uid="uid"
              :image="image">
            </MessageAvatar>
          </span>
        </sui-grid-column>
      </sui-grid>
  </div>
</template>

<script>
import MessageAvatar from '@/components/messages/MessageAvatar'

export default {
  name: 'MyMessageBox',
  components: {
    "MessageAvatar": MessageAvatar,
  },
  props: {
    message: Object,
    uid: String,
    image: String,

  },
  data() {
    return {

    }
  },

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.message {
    background-color: yellow;
    border: 5px;
    padding: 20px;
    margin: 20px;
    float: right;
    border-radius: 20px;
}
.avatar {
  position: relative;
  
}

</style>