<template>



<sui-card class="uglyfoot">
    <sui-card-content>

        <MessageAvatar  
            :uid="notification.notif_id"
            :image="notification.notif_image">
        </MessageAvatar>
        <span class="name"> {{ name }} </span>
        <span class="content" >{{ content }}</span>

    </sui-card-content>
</sui-card>

</template>

<script> 
import firebase from 'firebase'
import db from '@/firebase/init'
import MessageAvatar from '@/components/messages/MessageAvatar'
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'NotificationItem',
    components: {
        'MessageAvatar': MessageAvatar
    },
    props: {
        notification: {
            type: Object
        }
    },
    computed: {
        ...mapGetters([
            'getUserInfo'
        ]),
        
    },
    data () {
        return{
            user_uid: [],
            user_image: '',
            content: "",
            name: "",
        }
    },
    methods: {
        ...mapActions([
        ]),
        
    },
    created: function () {
        // Used to parse the user name from the content
        var n = this.notification.content.indexOf(' ')
        var l = this.notification.content.indexOf(' ', n+1)
        this.name = this.notification.content.substring(0, l+1)
        this.content = this.notification.content.substring(l+1, this.notification.content.length)
        
    }

}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.uglyfoot {
  width: 400px
}
.username {
    font-weight: 210;
    font-size: 11pt;
    left: 7px;
    position: relative;
 }
 .name {
    font-weight: bold;
 }
.butthole {
    float: right;
    position: relative;
    font-weight: 100;
    font-size: 10pt;
    top: 11px;
    right: 5px;
    color: gray;
}
.dropdown_ul {
  right: 0;
}
.hide {
  /* display: this.added; */
}
.squareButton {
  float: right;
  position: relative;
  top: 5px;
  z-index: 2;
}
.squarePhoto {
  object-fit: cover;
  width: 40px;
  height: 40px;
}
</style>