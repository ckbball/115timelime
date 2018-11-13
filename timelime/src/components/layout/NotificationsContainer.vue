<template>
    <a is="sui-dropdown-item">


        <sui-dropdown icon="big bell outline" floating>
            <sui-dropdown-menu scrolling="true" class="left menu maxheight">
                <a v-for="(notif,n) in this.getAllNotifications" :key="n" @click="acknowledgeNotification(notif)">
                    <NotificationItem 
                        :notification="notif.data()"
                    ></NotificationItem>
                </a>
            </sui-dropdown-menu>
            <sui-label v-if="this.getNumberOfUnreadNotifications > 0"
                floating 
                size="mini" 
                circular  
                color="red"
            >{{this.getNumberOfUnreadNotifications}}</sui-label>
        </sui-dropdown>
    </a>
 
</template>

<script> 
import NotificationItem from '@/components/layout/NotificationItem'
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'NotificationsContainer',
    components: {
        'NotificationItem': NotificationItem
    },
    data () {
        return{
    
        }
    },
    methods: {
        ...mapActions([
            'acknowledgeNotification'
        ])
    },
    computed: {
        ...mapGetters([
            'getAllNotifications',
            'getNumberOfUnreadNotifications'
        ])
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .maxheight{
    max-height: 350px;
    overflow: scroll;
} */
</style>