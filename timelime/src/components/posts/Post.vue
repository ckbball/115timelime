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
          </sui-card-content>

          <sui-card-content>
            <sui-card-description align="left">{{post.content}}</sui-card-description>
          </sui-card-content>
            <sui-image  v-if="post.is_photo_post === 'true'" :src="post.photo_URL" />
          <sui-card-content>
            <sui-card-description align="right">Time Remaining: {{timeRemaining}}</sui-card-description>
          </sui-card-content>
          <CommentList :post="post" ></CommentList>
        
        </sui-card>

      </sui-grid-column>
    </sui-grid>
  </div>
</template>

<script>
import PostLikeButton from '@/components/user_profile/PostLikeButton'
import PostCommentButton from '@/components/user_profile/PostCommentButton'
import MessageAvatar from '@/components/messages/MessageAvatar'
import CommentList from '@/components/posts/CommentList'
export default {
  name: 'Post',
  components: {
    "PostLikeButton": PostLikeButton,
    "PostCommentButton": PostCommentButton,
    "MessageAvatar": MessageAvatar,
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
        var days_left = Math.floor(time_left / 86400000)
        var hours_left = Math.floor((time_left - (days_left * 86400000)) / 3600000)
        var minutes_left = Math.floor((time_left - (days_left * 86400000) - (hours_left * 3600000)) / 60000)
        var time = days_left + " days, " + hours_left + " hours, " + minutes_left + " minutes"
        return time
        //.format('days h:mm')
    },
    formattedPostDate: function(){
        var moment = require('moment')
        return moment(this.post.upload_time).format("MMM Do, YYYY, h:mm A")
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

.PostersName{
  font-weight: 400;
  font-size: 15pt;
  position: relative;
  top: 12px;
}
.Button1{
  position: relative;
  margin-right: 20px;
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