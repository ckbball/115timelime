<template lang="html">
  <div>

    <sui-grid :columns="2" :centered=false>

      <sui-grid-column :width="2">
        <PostLikeButton align="left" class= "Button1"/>
        <PostCommentButton align="left" class= "Button2"/>
      </sui-grid-column>
      


      <sui-grid-column  :width="14">
      <sui-card class="UserPost">

        <sui-card-content>
          <sui-card-header align="left">{{post.author_name}}</sui-card-header>
          <sui-card-description align="right">Posted: 4/20/69 </sui-card-description>
        </sui-card-content>

        <sui-card-content>
          <sui-card-description align="left">{{post.content}}</sui-card-description>
        </sui-card-content>

        <sui-card-content>
          <sui-card-description align="right">Time Remaining: 4 mins</sui-card-description>
        </sui-card-content>

        <sui-card-content>
          <Comments/>
        </sui-card-content>
        
      </sui-card>

      </sui-grid-column>
      
    </sui-grid>
  </div>
</template>

<script>
import PostLikeButton from '@/components/user_profile/PostLikeButton'
import PostCommentButton from '@/components/user_profile/PostCommentButton'
import Comments from '@/components/posts/Comments'
export default {
  name: 'EditProfileInfo',
  data() {
    return { 
    };
  },
  components: {
    "PostLikeButton": PostLikeButton,
    "PostCommentButton": PostCommentButton,
    "Comments": Comments,
  },
  props: {

    post: {
      type: Object,
      required: true,
    }
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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