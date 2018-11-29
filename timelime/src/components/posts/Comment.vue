<template>
    <sui-table-cell :width="16"  >
        <sui-grid>
            <sui-grid-row>
                <sui-grid-column :width="1" floated="left">
                    <MessageAvatar
                      :uid="comment.author_uid"
                      :image="comment.author_image"
                    ></MessageAvatar>
                </sui-grid-column>

                <sui-grid-column :width="15" textAlign="justify" verticalAlign="middle" class="commentText">
                  <span class="commenterName">{{comment.author_name}}</span>
                  <span class="test">
                    {{comment.content}}
                  </span>
                </sui-grid-column>
            </sui-grid-row>
        </sui-grid>
    </sui-table-cell>
</template>

<script>
import MessageAvatar from '@/components/messages/MessageAvatar'
export default {
  name: 'Comment',
  components: {
      'MessageAvatar': MessageAvatar
  },
  props: {
      comment:{
          type: Object,
          required: true,
      }


  },
  data () {
    return {
    }
  }, 

  
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.commentText {
  z-index: 2;
  left: 14px;
  display: block;
}
.commenterName {
  font-weight: 830;
  color: black;
  font-size: 11pt;
}
.test {
/*    padding-left: 1em;
    padding-right: 1em;*/
  display: block;
  width: 95%;

}
</style>
