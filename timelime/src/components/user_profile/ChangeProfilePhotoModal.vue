<template lang="html">
  <div>

    <sui-modal v-model="open">
      <sui-modal-header> Change Profile Photo </sui-modal-header>
      <sui-modal-content>
          
        <sui-modal-description>



  
          <div id="app" class="photoUploadAndClip">
              <button round>
                <clipper-upload v-model="imgURL">upload image</clipper-upload>
              </button>
              
              <clipper-basic class="my-clipper" ref="clipper" :src="imgURL" :ratio="ratio" :min-scale="minscale" preview="my-preview">
                  <div class="placeholder" slot="placeholder">No image</div>
              </clipper-basic>
              
          </div>





        </sui-modal-description>

      </sui-modal-content>
        
      <sui-modal-actions>
        <sui-button negative @click.native="CancelProfileChange">
          Cancel
        </sui-button>
        <sui-button positive @click.native="ConfirmPhotoUpload">
          Save
        </sui-button>
      </sui-modal-actions>
      
    </sui-modal>
  </div>
</template>


<script>
import { clipperBasic, clipperPreview } from 'vuejs-clipper'
import { mapGetters } from 'vuex'
import db from '@/firebase/init'
import firebase from 'firebase' 

export default {
  name: 'ChangeProfilePhotoModal',
  props: {
      userInfo: Object,
  },
  components: {
      clipperBasic,
      clipperPreview
  },
  data() {
    return { 
      open: true,
      PostContent: "",
      selectedFile: null,
      url: null,
      imgURL: '',
      resultURL: '',
      ratio: 1,
      minscale:.5
    };
  },
  computed: {
      ...mapGetters([
        'getUserInfo',  
        'getMyFriends',  
    ]),
  },
  methods: {
    ChangeProfilePhotoOnFB: function(downloadURL) {
      // change in users
      // this triggers a change that is in index.js
      db.collection('users').doc(this.getUserInfo.uid).update({
        image: downloadURL
      })

    },

            getResult: function () {
                const canvas = this.$refs.clipper.clip();//call component's clip method
                this.resultURL = canvas.toDataURL("image/jpg", 1);//canvas->image
                console.log(this.resultURL)
            },

    ConfirmPhotoUpload: function() {
      // if(this.selectedFile.name == ""){
      //   console.log("user tried to change their profile to NOTHING!")
      //   this.$emit("ContinuePhotoUpload")
      //   this.url = null;
      //   this.selectedFile = null;
      //   return
      // }

      // Get a reference to the storage service, which is used to create references in your storage bucket
      var storage = firebase.storage();

      // Create a storage reference from our storage service
      var storageRef = storage.ref('user_profile_photos/'+this.getUserInfo.uid+'_'+this.imgURL.name);

      // shuts modal in whoever is opening it
      this.$emit("ContinuePhotoUpload")

      const canvas = this.$refs.clipper.clip();//call component's clip method
      this.resultURL = canvas.toDataURL("image/jpg", 1);//canvas->image
      console.log(this.resultURL)

      var BlobVersion = this.dataURLtoBlob(this.resultURL)

      // upload the file
      var task = storageRef.put(BlobVersion)

      task.on('state_changed', (snapshot) =>{
        // nothing?
      }, (error) => {
        // Handle unsuccessful uploads
      }, ()=> {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        task.snapshot.ref.getDownloadURL().then(downloadURL => {
          this.ChangeProfilePhotoOnFB(downloadURL)
          this.url = downloadURL
        });
      });

      // canvas.toBlob(function(blob) {
      //   var newImg = document.createElement('img'),
      //         url = URL.createObjectURL(blob);

      //         newImg.onload = function() {
      //           // no longer need to read the blob so it's revoked
      //           URL.revokeObjectURL(url);
      //         };

      //         newImg.src = url;
      //         console.log(newImg)

      //         console.log(newImg.src)

      //         console.log(url)

      //         // upload the file
      //         var task = storageRef.put(newImg)

      //         task.on('state_changed', (snapshot) =>{
      //           // nothing?
      //         }, (error) => {
      //           // Handle unsuccessful uploads
      //         }, ()=> {
      //           // Handle successful uploads on complete
      //           // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      //           task.snapshot.ref.getDownloadURL().then(downloadURL => {
      //             this.ChangeProfilePhotoOnFB(downloadURL)
      //             this.url = downloadURL
      //           });
      //         });

      // });

   

      
      this.url = null;
      this.selectedFile = null;
    },

    dataURLtoBlob: function (dataurl) {
      console.log("CALLING THAT FUNCTION")
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type:mime});
    },

    CancelProfileChange: function() {
      // shuts modal in whoever is opening it
      this.PostContent = ''
      this.selectedFile = null
      this.$emit("ContinuePhotoUpload")
    },
    uploadPhoto: function (event) {
      this.selectedFile = event.target.files[0]
    },




  },

};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.photoUploadAndClip{
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 600px;
  max-height: 600px;
}
.PhotoUpload{
  position: relative;
  margin-right: 1000px;
  z-index: 2;
}
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