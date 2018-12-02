<template>
    <sui-table-cell>
        <sui-grid :columns="2">
            <sui-grid-column :width="4">
                <MessageAvatar
                    :uid="friend.uid"
                    :image="friend.image">
                </MessageAvatar>
            </sui-grid-column>
                <sui-grid-column :width="12">
                <span class="FriendName">{{nameCase(friend.name)}}
                </span>
                </sui-grid-column>
            </sui-grid>
    </sui-table-cell>
</template>
<script>
import MessageAvatar from '@/components/messages/MessageAvatar'
export default {
    name: 'FriendsToMessageItem',
    props: {
        friend:{
            type: Object
        }
    },
    components: {
      'MessageAvatar': MessageAvatar
    },
    data() {
      return{
      }
    },
    methods: {
        nameCase: function(arg) {
            if(!arg) return 'undefined';
            arg = arg.toLowerCase().split(' ')
            .map((word) => {
                return (word.charAt(0).toUpperCase() + word.slice(1))
            })
            return arg.join(' ')
        },

    }
}
</script>
<style>
 .FriendName {
    font-size: 11pt;
    position: relative;
    top: 12px;
 }
</style>