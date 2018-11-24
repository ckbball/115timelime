<template>
    <sui-table celled>
        <sui-table-header>
            <sui-table-row>
                <CommentsHeader v-on:toggleVisiblity="onToggleVisibility()" 
                    :visible="this.isVisible"
                    :post="post">
                </CommentsHeader>
            </sui-table-row>
        </sui-table-header>

        <sui-table-body v-if="isVisible == true">
            <sui-table-row v-for="comment in comments" :key="comment.comment_id">
                <Comment :comment="comment"></Comment>
            </sui-table-row>
        </sui-table-body>
        <sui-table-footer>
            <sui-table-row>
                <CommentsFooter :post="post"></CommentsFooter>
            </sui-table-row>
        </sui-table-footer>


    </sui-table>

</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'
import Comment from '@/components/posts/Comment'
import CommentsHeader from '@/components/posts/CommentsHeader'
import CommentsFooter from '@/components/posts/CommentsFooter'
import { mapGetters } from 'vuex'
export default {
  name: 'CommentList',
  components: {
      'Comment': Comment,
      'CommentsHeader': CommentsHeader,
      'CommentsFooter': CommentsFooter
  },
  props: {
      post: {
          type: Object,
          required: true,
      }


  },
  data () {
    return {
        isVisible: false,
        comments: [],
    }
  }, 
  computed:{
      ...mapGetters(['getUserInfo'])
  },
  methods: {
      setVisibility: function(bool) {
          this.isVisible = !this.isVisible

      },
      onToggleVisibility: function() {
          this.setVisibility()
          // now, if visibility = true 
          // check to see if downloading comments is necessary
          if(this.isVisible == true){
              if(this.comments.length == 0){
                  this.fetchComments()
              }
          }
      },
      fetchComments: function() {
          console.log('fetching comments')
          db.collection('comments')
          .where('parent_id', '==', this.post.post_id)
          .onSnapshot({includeMetadataChanges: true}, (snapshot) => {
            snapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                    this.comments.push(change.doc.data())
                }
            })
        })
          

      }
  }

  
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
