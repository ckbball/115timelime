<template>
    <sui-table-header-cell>
        <sui-grid>
            <sui-grid-row>
                <sui-grid-column :width="1">
                    <CommentAvatarButton
                        
                    ></CommentAvatarButton>
                   
                </sui-grid-column>
                <sui-grid-column :width="15" textAlign="right">
                    <sui-form>
                        <sui-form-field>
                            <textarea 
                                @keydown="inputHandler"
                                attached
                                :rows="nrows"
                                v-model="commentText"
                            ></textarea>

                        </sui-form-field>
                    </sui-form>
                </sui-grid-column>
            </sui-grid-row>
        </sui-grid>
    </sui-table-header-cell>
</template>

<script>
import CommentAvatarButton from '@/components/layout/CommentAvatarButton'
import { mapGetters } from 'vuex'
export default {
  name: 'CommentsFooter',
  components: {
      'CommentAvatarButton': CommentAvatarButton
  },
  props: { 
      post_id: {
          type: String,
          required: true
      }

  },
  data () {
    return {
        commentText: ''
        
    }
  }, 
  methods: {
      submitComment: function() {
        if(this.commentText.length == 0) return;
            console.log(this.post_id, ' ', this.commentText,' ', this.getAuthenticatedUser.uid)

        this.axios.post('http://localhost:5001/timelime-96d47/us-central1/addNewComment', {
            parent_id: this.post_id,
            author_uid: this.getAuthenticatedUser.uid,
            author_image: '',
            author_name: '',
            content: this.commentText,


        })
        .then(response => {
            this.commentText.length = 0
        })
        .catch(err => {
            console.log(err)
        })
      },
      inputHandler: function(e){
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            this.submitComment();
        }
        if(e.keyCode === 13 && e.shiftKey) {
            this.commentText = this.commentText + '\n'
        }
      },


  },
  computed: {
      ...mapGetters([
        'getAuthenticatedUser',  
    ]),
      nrows: function() {
          return (Math.floor(this.commentText.length / 44)) + 1
      }
  }

  
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
