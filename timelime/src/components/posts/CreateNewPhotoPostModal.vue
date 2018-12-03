<template lang="html">
  <div>

    <sui-modal v-model="open">
      <sui-modal-header>New image post</sui-modal-header>
      <sui-modal-content >

        <sui-modal-description>
          <p> Choose your photo: </p>
          <input class="PhotoUpload" type="file" @change="uploadPhoto">
        </sui-modal-description>

        <br/>
        <br/>
        <p> Caption this photo: </p>
        <sui-form-field>
          <textarea 
             v-model="PostContent" attached
             class="PostTextArea" maxlength="4680"
             />
        </sui-form-field>


      </sui-modal-content>
      <sui-modal-actions>
        <span class='timeDuration'> Post Duration: </span>
        <span class='timeFields'> Days, Hours, Minutes </span>
        <sui-input class='timeInput' placeholder='31' v-model="days"/>,
        <sui-input class='timeInput' placeholder='0' v-model="hours"/>,
        <sui-input class='timeInput' placeholder='0' v-model="minutes"/>
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
      days: 31,
      hours: 0,
      minutes: 0
    };
  },
  computed: {
      ...mapGetters([
        'getUserInfo',  
        'getMyFriends',  
    ]),
  },
  methods: {

    PostPhotoToFB: function(downloadURL) {
      let whosees = this.getMyFriends.map(friend => friend.uid)
      whosees.push(this.getUserInfo.uid)

      let miliseconds = 60000*this.minutes+3600000*this.hours+86400000*this.days

      this.axios.post('https://us-central1-timelime-96d47.cloudfunctions.net/addNewPost', {
        parent_id: this.userInfo.uid, // 
        author_uid: this.getUserInfo.uid, //
        author_image: this.getUserInfo.image, //
        author_name: this.getUserInfo.firstName + ' ' + this.getUserInfo.lastName, //
        content: this.PostContent,
        photo_URL: downloadURL,
        is_photo_post: "true",
        upload_time: Date.now(),
        duration: miliseconds,
        whoSees: whosees

      })
      .then(response => {
          this.PostContent = ''
          this.days = 31
          this.hours = 0
          this.minutes = 0
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
      this.$emit("ContinuePhotoPost")

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
          this.PostPhotoToFB(downloadURL)
          this.url = downloadURL
        });
      });
        this.url = null;
        this.selectedFile = null;
    },
    CancelPhotoPost: function() {
      // shuts modal in whoever is opening it
      this.PostContent = ''
      this.selectedFile = null
      this.days = 31
      this.hours = 0
      this.minutes = 0
      this.$emit("ContinuePhotoPost")
    },
    uploadPhoto: function (event) {
      this.selectedFile = event.target.files[0]
    },
  },
  watch: {
    url: function(oldvalue, newvalue) {
      if(newvalue){
        PostPhotoToFB(newvalue)
      }
    }
  }

};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.timeInput{
  width: 5%;
}
.timeFields {
  font-weight: -12
}
.timeDuration {
  font-weight: 710;
  font-size: 11pt;
  position: relative;
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