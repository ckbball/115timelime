<template lang="html">
  <div>

    <sui-modal v-model="open">
      <sui-modal-header>New textpost</sui-modal-header>
      <sui-modal-content >
        <sui-modal-description>
          <sui-form>
            <sui-form-field>
                <textarea 
                   v-model="PostContent" attached
                   class="PostTextArea" maxlength="4680"
                   />
            </sui-form-field>
        </sui-form>
        </sui-modal-description>
      </sui-modal-content>
      <sui-modal-actions>
        <span class='timeDuration'> Post Duration: </span>
        <span class='timeFields'> Days, Hours, Minutes </span>
        <sui-input class='timeInput' placeholder='31' v-model="days"/>,
        <sui-input class='timeInput' placeholder='0' v-model="hours"/>,
        <sui-input class='timeInput' placeholder='0' v-model="minutes"/>
        <sui-button negative @click.native="CancelTextPost">
          Cancel
        </sui-button>
        <sui-button positive @click.native="ConfirmTextPost">
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
  name: 'CreateNewPostModal',
  props: {
      userInfo: Object,
  },
  components: {
  },
  data() {
    return { 
      open: true,
      PostContent: "",
      days: 31,
      hours: 0,
      minutes: 0
    };
  },
  computed: {
      ...mapGetters([
        'getUserInfo',
        'getMyFriends'  
    ]),
  },
  methods: {
    ConfirmTextPost: function() {
      // shuts modal in whoever is opening it
      this.$emit("ContinueTextPost")
      let whosees=this.getMyFriends.map(friend => friend.uid)
      whosees.push(this.getUserInfo.uid)

      let miliseconds = 60000*this.minutes+3600000*this.hours+86400000*this.days
      console.log(this.days,this.hours,this.minutes)

      this.axios.post('https://us-central1-timelime-96d47.cloudfunctions.net/addNewPost', {
            parent_id: this.userInfo.uid, // 
            author_uid: this.getUserInfo.uid, //
            author_image: this.getUserInfo.image, //
            author_name: this.getUserInfo.firstName + ' ' + this.getUserInfo.lastName, //
            content: this.PostContent,
            photo_URL: "",
            is_photo_post: "false",
            upload_time: Date.now(),
            duration: miliseconds,
            whoSees: whosees//this.getMyFriends.map(friend => friend.uid)

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
    CancelTextPost: function() {
      // shuts modal in whoever is opening it
      this.PostContent = ''
      this.days = 31
      this.hours = 0
      this.minutes = 0
      this.$emit("ContinueTextPost")
    }
  },

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