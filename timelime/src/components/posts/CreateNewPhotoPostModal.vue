<template lang="html">
  <div>

    <sui-modal v-model="open">
      <sui-modal-header>New photopost</sui-modal-header>
      <sui-modal-content >

        <p> Describe your photo: </p>
        <sui-form-field>
          <textarea 
             v-model="PostContent" attached
             class="PostTextArea" maxlength="4680"
             />
        </sui-form-field>

        <sui-modal-description>
          
          <p> Choose your file: </p>
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
import db from '@/firebase/init'
import firebase from 'firebase' 
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
      url: null,
    };
  },
  computed: {
      ...mapGetters([
        'getUserInfo',  
        'getMyFriends',  
    ]),
  },
  methods: {
    // var uploader = document.getElementById('uploader')
    // var fileButton = document.getElementById('fileButton')

    PostPhotoToFB: function(downloadURL) {
      console.log('File available at', downloadURL);
         

      // this.axios.post('https://us-central1-timelime-96d47.cloudfunctions.net/addNewPost', {
      //         parent_id: this.userInfo.uid, // 
      //         author_uid: this.getUserInfo.uid, //
      //         author_image: this.getUserInfo.image, //
      //         author_name: this.getUserInfo.firstName + ' ' + this.getUserInfo.lastName, //
      //         content: "OOOOOOOOOOOOOOOOOOO",
      //         photo_URL: downloadURL,
      //         is_photo_post: "true",
      //         upload_time: Date.now(),
      //       })
      //       .then(response => {
      //           this.PostContent = ''
      //       })
      //       .catch(err => {
      //           console.log(err)
      //       })


            this.axios.post('https://us-central1-timelime-96d47.cloudfunctions.net/addNewPost', {
            parent_id: this.userInfo.uid, // 
            author_uid: this.getUserInfo.uid, //
            author_image: this.getUserInfo.image, //
            author_name: this.getUserInfo.firstName + ' ' + this.getUserInfo.lastName, //
            content: this.PostContent,
            photo_URL: downloadURL,
            is_photo_post: "true",
            upload_time: Date.now(),
            whoSees: this.getMyFriends.map(friend => friend.uid)

        })
        .then(response => {
            this.PostContent = ''
        })
        .catch(err => {
            console.log(err)
        })

    },

    ConfirmPhotoPost: function() {
      // Get a reference to the storage service, which is used to create references in your storage bucket
      var storage = firebase.storage();

      // Create a storage reference from our storage service
      var storageRef = storage.ref('user_posts/'+this.getUserInfo.uid+'_'+this.selectedFile.name);

      // shuts modal in whoever is opening it
      console.log(this.selectedFile)  
      this.$emit("ContinuePhotoPost")

      // get file
      var file = this.selectedFile;

      // upload the file
      console.log(storageRef)

      /* almost works
            var task = storageRef.put(file).then(function(url){
              console.log(storageRef.getDownloadURL());
            });
      */

      var task = storageRef.put(file)


      task.on('state_changed', (snapshot) =>{
        // nothing?
      }, (error) => {
        // Handle unsuccessful uploads
      }, ()=> {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        task.snapshot.ref.getDownloadURL().then(downloadURL => {
          this.PostPhotoToFB(downloadURL)
          this.url = downloadURL
          console.log(this.url)

        });
      });

/*      this.axios.post('https://us-central1-timelime-96d47.cloudfunctions.net/addNewPost', {
            parent_id: this.userInfo.uid, // 
            author_uid: this.getUserInfo.uid, //
            author_image: this.getUserInfo.image, //
            author_name: this.getUserInfo.firstName + ' ' + this.getUserInfo.lastName, //
            content: this.PostContent,
            photo_URL: "",
            is_photo_post: "true",
            upload_time: Date.now(),
        })
        .then(response => {
            this.PostContent = ''
        })
        .catch(err => {
            console.log(err)
        })
*/
        this.url = null;
        this.selectedFile = null;
    },
    CancelPhotoPost: function() {
      // shuts modal in whoever is opening it
      this.PostContent = ''
      this.selectedFile = null
      this.$emit("ContinuePhotoPost")
    },
    uploadPhoto: function (event) {
      this.selectedFile = event.target.files[0]
      console.log(this.selectedFile)
      console.log(event)
    },
  },
  watch: {
    url: function(oldvalue, newvalue) {
      if(newvalue){
        console.log("THIS BITCH CHANGED")
        PostPhotoToFB(newvalue)
      }
    }
  }

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