<template>


    <sui-grid :columns="2" :centered=false divided>
      <sui-grid-column :width="5">
      	<p> friends to messenge </p>
      </sui-grid-column>

      <sui-grid-column :width="7">
        <!-- need to pass down the "friend" object when the user clicks on the left column cell -->
      	<MessageContainer fluid
            :userInfo="getUserInfo"
            
        />
      </sui-grid-column>
    </sui-grid>

</template>

<script>
import router from '@/router/index'

import {mapActions, mapGetters, mapMutations} from 'vuex'
import MessageContainer from '@/components/messages/MessageContainer'


import firebase from 'firebase'
import db from '@/firebase/init'

export default {
  name: 'MessagePage',
  components: {
    'MessageContainer': MessageContainer,
  },
  props: {
    user: Object,
  },
  computed: {
      ...mapGetters([
        'getUserInfo',
      ]),
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
