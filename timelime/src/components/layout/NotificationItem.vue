<template>
    <sui-dropdown-item>
        <p>{{notification.content}}</p>
    </sui-dropdown-item>
</template>

<script> 
import { mapActions } from 'vuex'
export default {
    name: 'NotificationItem',
    components: {
    },
    props: {
        notification: {
            type: Object
        }
    },
    data () {
        return{
    
        }
    },
    methods: {
        ...mapActions([
        ])
    },

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>