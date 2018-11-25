<template lang="html">
  <div>
    <sui-grid :columns="2" :centered=false>

      <sui-grid-column :width="2">
        <PostLikeButton align="left" class= "Button1"
        :parent="post"
        />
      </sui-grid-column>
      


      <sui-grid-column  :width="14">
      <sui-card class="UserPost">

        <sui-card-content>

    <sui-grid :columns="3" :centered=false >
      <sui-grid-column :width="2">
          <MessageAvatar
            :uid="post.author_uid"
            :image="post.author_image"
          ></MessageAvatar>
      </sui-grid-column>
      <sui-grid-column :width="7">
        <sui-card-header class="PostersName" align="left">{{post.author_name}}</sui-card-header>
      </sui-grid-column>

      <sui-grid-column :width="7">
         <sui-card-description class="PostedTime" align="right">Posted: {{formattedPostDate}} </sui-card-description>
      </sui-grid-column>
    </sui-grid>


<!-- 
          <MessageAvatar
          :uid="post.author_uid"
          :image="post.author_image"
          ></MessageAvatar>
          <sui-card-header align="left">{{post.author_name}}</sui-card-header>
          <sui-card-description align="right">Posted: 4/20/69 </sui-card-description> -->
        </sui-card-content>

        <sui-card-content>
          Hey checkout this photo I took yesterday
        </sui-card-content>

        <sui-card-content>
          <sui-image src="https://cdn.drawception.com/images/panels/2012/5-2/yD3XfXms5g-2.png" />
        </sui-card-content>

        <sui-card-content>
          <sui-card-description align="right">Time Remaining: {{timeRemaining}}</sui-card-description>
        </sui-card-content>


          <CommentList
          :post="post"
          ></CommentList>
        
      </sui-card>

      </sui-grid-column>
      
    </sui-grid>
  </div>
</template>

<script>
import PostLikeButton from '@/components/user_profile/PostLikeButton'
import PostCommentButton from '@/components/user_profile/PostCommentButton'
import MessageAvatar from '@/components/messages/MessageAvatar'
// import Comments from '@/components/posts/Comments'
import CommentList from '@/components/posts/CommentList'
export default {
  name: 'Post',
  components: {
    "PostLikeButton": PostLikeButton,
    "PostCommentButton": PostCommentButton,
    "MessageAvatar": MessageAvatar,
    // "Comments": Comments,
    "CommentList": CommentList
  },
  props: {
    post: {
      type: Object,
      required: true,
    }
  },
  computed: {
    timeRemaining: function(){
        var moment = require('moment')
        var time_left = this.post.expire_time - Date.now()
        var time = Math.ceil(time_left/86400000) + " days " + moment(time_left).format('hh') + " hrs " + moment(time_left).format('mm') + " minutes"
        return time
        //.format('days h:mm')
    },
    formattedPostDate: function(){
        var moment = require('moment')
        return moment(this.post.upload_time).format("dddd h:mm A, MMMM Do YYYY")
    }
  },
  data() {
    return {

    }
  },
  methods: {

  }


}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.PostedTime {
}
.PostersName{
  font-weight: 400;
  font-size: 15pt;
  position: relative;
  top: 12px;
}
.Button1{
  position: relative;
  margin-right: -130px;
  z-index: 2;
}
.Button2{
  position: relative;
  margin-right: -130px;
  z-index: 2;
  top:4px;
}
.UserPost{
  width: 100%;
}

</style>