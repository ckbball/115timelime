<template>
    <div>
    <!-- <router-link :to="{name: 'Messages'}"> -->
        <a is="sui-dropdown-item" >
            <sui-dropdown icon="big envelope outline" class="requestDropdown" @click="navigateTo()"floating>
            
                <sui-label v-if="this.getUnreadMessageCount > 0"
                    floating 
                    size="mini" 
                    circular  
                    color="red"
                >{{this.getUnreadMessageCount}}</sui-label>

            </sui-dropdown>
        </a>
    <!-- </router-link> -->
       
    </div>
</template>

<script> 
import { mapGetters } from 'vuex'
export default {
    name: 'MessagingContainer',
    data () {
        return{
    
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
        }
    },
    computed: {
        ...mapGetters([
            'getUnreadMessageCount'
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
</style>