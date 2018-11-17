<template>
  <div>
    <SendMessage/>
  </div>
</template>

<script>
import SendMessage from '@/components/messages/SendMessage'
import { mapGetters } from 'vuex'

export default {
  name: 'KenjiTest',
  components: {
    'SendMessage': SendMessage
  },
  data () {
    return {
    }
  },
  methods: {},
}
</script>

<style scoped>
</style>
