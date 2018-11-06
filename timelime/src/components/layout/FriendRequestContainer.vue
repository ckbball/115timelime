<template>
    <sui-dropdown
        item
        icon="big universal access"
    >
        <sui-dropdown-menu scrolling>
            <sui-dropdown-item v-for="(req, n) in getFriendRequests" :key="n">
                <FriendRequestItem
                    :item="req.data()"
                ></FriendRequestItem>
            </sui-dropdown-item>
        </sui-dropdown-menu>    
    </sui-dropdown>
 
</template>

<script> 
import FriendRequestItem from '@/components/layout/FriendRequestItem'
import { mapGetters } from 'vuex'
export default {
    name: 'FriendRequestContainer',
    components: {
        'FriendRequestItem': FriendRequestItem,
    },
    data () {
        return{
    
        }
    },
    methods: {

    },
    computed: {
        ...mapGetters([
            'getFriendRequests'
        ])
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>