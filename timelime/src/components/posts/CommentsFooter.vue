<template>
    <sui-table-header-cell>
        <sui-grid>
            <sui-grid-row>
                
                <sui-grid-column :width="1">
                    <CommentAvatarButton
                       :uid="getUserInfo.uid" 
                       :image="getUserInfo.image"
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
      post: {
          type: Object,
          required: true
      },


  },
  data () {
    return {
        commentText: '',
        loading: false
    }
  }, 


  
  methods: {
    setLoading: function(state) {
        if(state === 'false'){
            this.loading = false
        }
        if(state === 'true'){
            this.loading = true
        }
    },
    submitComment: function() {
        if(this.commentText.length == 0) return;

        this.axios.post('https://us-central1-timelime-96d47.cloudfunctions.net/addNewComment', {
            parent_id: this.post.post_id,
            postAuthor_uid: this.post.author_uid,
            author_uid: this.getUserInfo.uid,
            author_image: this.getUserInfo.image,
            author_name: this.getUserInfo.firstName + ' ' + this.getUserInfo.lastName,
            content: this.commentText,
        })
        .then(response => {
        })
        .catch(err => {
            console.log(err)
        })
            this.commentText = ''

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
        'getUserInfo',  
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
