<template>
    <sui-grid :columns="2" :centered=false >
      <sui-grid-column :width="4">
      	<FriendsToMessage> </FriendsToMessage>
      </sui-grid-column>

      <sui-grid-column :width="8">
      	<p> actual messenges </p>
      </sui-grid-column>
    </sui-grid>

</template>

<script>
import router from '@/router/index'
import FriendsToMessage from '@/components/messages/FriendsToMessage'

export default {
  name: 'MessagePage',

  components: {
    'FriendsToMessage': FriendsToMessage,
  },
  data () {
    return {
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
