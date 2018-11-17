q<template lang="html">
  <div>

    <sui-grid :columns="2" :centered=false>

      <sui-grid-column :width="2">
        <PostLikeButton align="left" class= "Button1"
        :post_id="post.post_id"
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
         <sui-card-description class="PostedTime" align="right">Posted: 4/20/69 </sui-card-description>
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
          <sui-card-description align="left">{{post.content}}</sui-card-description>
        </sui-card-content>

        <sui-card-content>
          <sui-card-description align="right">Time Remaining: 4 mins</sui-card-description>
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
  name: 'EditProfileInfo',
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