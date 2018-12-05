<template>
    <a is="sui-dropdown-item">
        <sui-dropdown icon="big universal access" class="requestDropdown" floating multiple>
            <sui-dropdown-menu scrolling="true" class="left menu dropMenuReq maxheight" >
                <sui-dropdown-header content="Friend Requests:"/>
                    <FriendRequest v-for="(req,n) in this.getAllFriendsRequests" :key="n"
                        :request="req.data()"
                        class="friendreq"
                    ></FriendRequest>
                    
            </sui-dropdown-menu>
            <sui-label v-if="this.getAllFriendsRequests.length > 0"
                floating 
                :size="size"
                circular  
                color="red"
            >{{this.getAllFriendsRequests.length}}</sui-label>

        </sui-dropdown>
    </a>
 
</template>

<script> 
import FriendRequest from '@/components/layout/FriendRequest'
import { mapGetters } from 'vuex'
export default {
    name: 'FriendRequestContainer',
    components: {
        'FriendRequest': FriendRequest
    },
    data () {
        return{
            size:"mini"
        }
    },
    methods: {


    },
    computed: {
        ...mapGetters([
            'getAllFriendsRequests'
        ])
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.requestDropdown {
  position: relative;
  width: 30px;
  height: 30px;
  top: 0px;
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