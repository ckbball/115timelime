<template lang="html">
  <sui-comment-group>
    <h3 is="sui-header" align="left" dividing>Comments</h3>

    <sui-comment align="left">
      <CommentAvatarButton
      ></CommentAvatarButton>

      <sui-comment-content>
        <a is="sui-comment-author">Matt</a>
        <sui-comment-metadata>
          <div>Today at 5:42PM</div>
        </sui-comment-metadata>
        <sui-comment-text>How artistic!</sui-comment-text>
        <sui-comment-actions>
          <sui-comment-action>Reply</sui-comment-action>
        </sui-comment-actions>
      </sui-comment-content>
    </sui-comment>

  </sui-comment-group>
</template>

<script>
import CommentAvatarButton from '@/components/layout/CommentAvatarButton'
export default {
  name: 'Comments',
  components: {
    'CommentAvatarButton': CommentAvatarButton,
  },
};
</script>
