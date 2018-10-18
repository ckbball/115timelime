<template lang="html">
  <div>

    <sui-grid :columns="2" :centered=false>
      <sui-grid-column  :width="3">
        <PostLikeButton class= "Button1"/>
        <PostCommentButton class= "Button2"/>
      </sui-grid-column>
      
      <sui-grid-column :width="13" >
        <sui-segment>b</sui-segment>
      </sui-grid-column>
      
    </sui-grid>
  </div>
</template>

<script>
import PostLikeButton from '@/components/user_profile/PostLikeButton'
import PostCommentButton from '@/components/user_profile/PostCommentButton'
import PostText from '@/components/posts/Post'
export default {
  name: 'EditProfileInfo',
  data() {
    return { 
    };
  },
  components: {
    "PostLikeButton": PostLikeButton,
    "PostCommentButton": PostCommentButton,
    "PostText": PostText,
  },
  props: {
    Header: String,
    Bio: String,
  },
  methods: {
    toggle() {
      this.open = !this.open;
      this.text = ""
    },
    savePost(){
      this.$emit("inputEvent", this.text)
      this.open = !this.open;
      this.text = ""
    },
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

</style>