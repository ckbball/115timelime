<template>
    <!-- <router-link :to="{name: 'Messages'}"> -->
        <a is="sui-dropdown-item" @click="navigateTo()">
            <sui-dropdown icon="big envelope outline" class="requestDropdown" @click="navigateTo()" floating>
            
                <sui-label v-if="this.count > 0"
                    floating 
                    size="mini" 
                    circular  
                    color="red"
                >{{this.count}}</sui-label>

            </sui-dropdown>
        </a>
    <!-- </router-link> -->
       
 
</template>

<script> 
import { mapGetters } from 'vuex'
import db from '@/firebase/init'

export default {
    name: 'MessagingContainer',
    data () {
        return{
            count: 0
        }
    },
    methods: {
        navigateTo: function() {
            /*
                For some reason the router link causes a page reload, which
                defeats the purpose of an SPA, so just use this function
                instead
            */
            this.$router.push({ path: '/messages' })
        },
        getCount: function() {
            db.collection('messages').where('receiver_uid', '==', this.getUserInfo.uid) 
            .where('read', '==', 'false')
            .onSnapshot({includeMetadataChanges: true}, (snapshot) => {
                console.log(snapshot.size)
                this.count = snapshot.size
           })
        }
    },
    computed: {
        ...mapGetters([
            'getUnreadMessageCount',
            'getUserInfo'
        ])
    },
    mounted() {
        setTimeout(() => {
            this.getCount()

        }, 1500)
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
</style>