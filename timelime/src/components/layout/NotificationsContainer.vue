<template>

    <a is="sui-dropdown-item">
        <sui-dropdown icon="big bell outline" class="requestDropdown" floating>
            <sui-dropdown-menu scrolling="true" class="left menu dropMenuReq maxheight">
                <sui-dropdown-header content="Notifications:"/>
                <NotificationItem v-for="(notif,n) in this.getAllNotifications" :key="n" @click="acknowledgeNotification(notif)"
                    :notification="notif.data()"
                    class="friendreq"
                ></NotificationItem>
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
.requestButton {
  position: absolute;
  width: 40px;
  height: 40px;
  right: 15px;
}
.dropMenuReq {
  width: 400px;
  max-height:400px;
}
.friendreq {
  position: relative;
  margin-bottom:-13px;
}
.maxheight{
    max-height: 350px;
    overflow: scroll;
}
/* .maxheight{
    max-height: 350px;
    overflow: scroll;
} */
</style>