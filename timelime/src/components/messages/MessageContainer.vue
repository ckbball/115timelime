<template lang="html">
  <div>
    <sui-grid :columns="2" :centered=false divided>

      <sui-grid-column :width="8">
        <FriendsMessageBox
            
        />
      </sui-grid-column>

      

      <sui-grid-column  :width="8">
        <MyMessageBox fluid
            
        />
      </sui-grid-column>
    </sui-grid>


  </div>
</template>

<script>
import MyMessageBox from '@/components/messages/MyMessageBox'
import FriendsMessageBox from '@/components/messages/FriendsMessageBox'

export default {
  name: 'MessageContainer',
  components: {
    'MyMessageBox': MyMessageBox,
    'FriendsMessageBox': FriendsMessageBox
  },
  props: {
    userInfo: Object
  },
  data() {
    return {

    }
  },
  methods: {

  }


}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>