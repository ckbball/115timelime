<template lang="html">
  <div>

    <sui-modal v-model="open">
      <sui-modal-header> Change Profile Photo </sui-modal-header>
      <sui-modal-content>
          
        <sui-modal-description>
          <p> Choose your photo: </p>
          <input class="PhotoUpload" type="file" @change="uploadPhoto">
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
import { mapGetters } from 'vuex'
import db from '@/firebase/init'
import firebase from 'firebase' 
export default {
  name: 'ChangeProfilePhotoModal',
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
    ChangeProfilePhotoOnFB: function(downloadURL) {
      // change in users
      // this triggers a change that is in index.js
      db.collection('users').doc(this.getUserInfo.uid).update({
        image: downloadURL
      })

    },

    ConfirmPhotoUpload: function() {
      if(this.selectedFile.name == ""){
        console.log("user tried to change their profile to NOTHING!")
        this.$emit("ContinuePhotoUpload")
        this.url = null;
        this.selectedFile = null;
        return
      }

      // Get a reference to the storage service, which is used to create references in your storage bucket
      var storage = firebase.storage();

      // Create a storage reference from our storage service
      var storageRef = storage.ref('user_profile_photos/'+this.getUserInfo.uid+'_'+this.selectedFile.name);

      // shuts modal in whoever is opening it
      this.$emit("ContinuePhotoUpload")

      // get file
      var file = this.selectedFile;

      // upload the file
      var task = storageRef.put(file)

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

      this.url = null;
      this.selectedFile = null;
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