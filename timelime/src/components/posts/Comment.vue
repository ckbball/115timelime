<template>
    <sui-table-cell :width="16"  >
        <sui-grid>
            <sui-grid-row>
                <sui-grid-column :width="1" floated="left">
                    <CommentAvatarButton
                    :image="comment.author_image"
                    ></CommentAvatarButton>
                </sui-grid-column>

                <sui-grid-column :width="15" text-align="left" verticalAlign="middle">
                    <h5>{{comment.author_name}}</h5>
                </sui-grid-column>
            </sui-grid-row>
            <sui-grid-row :width="12"  textAlign="left">
               <p class="test">
                  {{comment.content}}
                </p>
            </sui-grid-row>


        </sui-grid>
    </sui-table-cell>
</template>

<script>
import CommentAvatarButton from '@/components/layout/CommentAvatarButton'
export default {
  name: 'Comment',
  components: {
      'CommentAvatarButton': CommentAvatarButton
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
.test {
    padding-left: 1em;
    padding-right: 1em;

}
</style>
