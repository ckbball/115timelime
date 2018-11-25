<template lang="html">
  <div>

    <sui-modal v-model="open">
      <sui-modal-header>New photopost</sui-modal-header>
      <sui-modal-content >
        <sui-modal-description>
          
          <p> Upload a Photo </p>
          <input type="file" @change="uploadPhoto">

        </sui-modal-description>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button negative @click.native="CancelPhotoPost">
          Cancel
        </sui-button>
        <sui-button positive @click.native="ConfirmPhotoPost">
          Post!
        </sui-button>
      </sui-modal-actions>
    </sui-modal>

  </div>
</template>

<script>
import CommentAvatarButton from '@/components/layout/CommentAvatarButton'
import { mapGetters } from 'vuex'
export default {
  name: 'CreateNewPhotoPostModal',
  props: {
      userInfo: Object,
  },
  components: {
  },
  data() {
    return { 
      open: true,
      PostContent: "",
      selectedFile: null,
    };
  },
  computed: {
      ...mapGetters([
        'getUserInfo',  
    ]),
  },
  methods: {
    ConfirmPhotoPost: function() {
      // shuts modal in whoever is opening it
      console.log(this.selectedFile)  
      this.$emit("ContinuePhotoPost")

      const fd = new FormData();
      fd.append('userPhotoPost',this.selectedFile, this.selectedFile.name)

      this.axios.post('https://us-central1-timelime-96d47.cloudfunctions.net/addNewPost', {
            parent_id: this.userInfo.uid, // 
            author_uid: this.getUserInfo.uid, //
            author_image: this.getUserInfo.image, //
            author_name: this.getUserInfo.firstName + ' ' + this.getUserInfo.lastName, //
            content: this.PostContent,
            photo_URL: this.selectedFile.name,
            is_photo_post: "true",
            upload_time: Date.now(),
        })
        .then(response => {
            this.PostContent = ''
        })
        .catch(err => {
            console.log(err)
        })
    },
    CancelPhotoPost: function() {
      // shuts modal in whoever is opening it
      this.PostContent = ''
      this.$emit("ContinuePhotoPost")
    },
    uploadPhoto: function (event) {
      this.selectedFile = event.target.files[0]
      console.log(this.selectedFile)
      console.log(event)
    },
  },

};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.FriendButton{
  position: relative;
  z-index: 2;
  top: 10px;
}
.PostButtons{
  position: relative;
  z-index: 2;
  top: 20px;
}
.PostTextArea{
  width: 100%;
  resize: none;
  height: 100%;
  border:1px solid lightgray;
  border-radius: 5px;
}
</style>