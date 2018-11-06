<template lang="html">
  <div>
    <sui-comment-group>
      <h3 is="sui-header" align="left" dividing>Comments</h3>

    <sui-comment align="left">
      <CommentAvatarButton
      ></CommentAvatarButton>

      <sui-comment-content>
        <a is="sui-comment-author">Matt</a>
        <sui-comment-metadata>
          <div>Today at 5:42PM</div>
        </sui-comment-metadata>
        <sui-comment-text>How artistic!</sui-comment-text>
        <sui-comment-actions>
          <sui-comment-action>Reply</sui-comment-action>
        </sui-comment-actions>
      </sui-comment-content>
    </sui-comment>

    </sui-comment-group>

    <input v-model="textCom" placeholder="When time gives you limes...">
    <div class="ui buttons">
      
      <button class="ui grey button" v-on:click="submit">Comment</button>
      <div class="or"></div>
      <button class="ui button">Cancel</button>

    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import firebase from 'firebase'
import db from '@/firebase/init'
import CommentAvatarButton from '@/components/layout/CommentAvatarButton'

export default {
  name: 'Comments',
    components: {
    'CommentAvatarButton': CommentAvatarButton,
  },
  data () {
    return{
      textCom: '',
      coms: [],
    }
  }, 
  methods: {
    submit() {
      db.collection('comments').add({
        content: this.textCom,
        authorid: this.user.uid,
        author: this.user.firstName,
        postid: this.pid,
      })
      .then(docRef => {
        db.collection('comments').doc(docRef.id).update({id: docRef.id})
      })
      .catch(err => {
        console.log("failed with error: " + err)
      })
    }, 
    getComs() {
      db.collection('comments').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let data = {
            'id': doc.id,
            'content': doc.data().content,
            'author': doc.data().author,
            'authorid': doc.data().authorid,
            'postid': doc.data().postid,
          }
          this.coms.push(data)
        })
      })
      .catch(err => {
        console.log("failed with error: " + err)
      })
      console.log(this.coms)
    }
  },
  created () {
    this.getComs()
    //console.log(this.coms[0])
  },
  props: {
    user: Object,
    uid: String,
    pid: String,
  }
};
</script>
