<template>
  <div class="ui middle aligned center aligned grid">
    <div class="column">
      <h2 class="ui grey image header">    
        <img :src="images.lemon" class="image">
        <div class="content">
          Create a new account!
        </div>
      </h2>
      <form class="ui large form">
        <div class="ui segment loginForm">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i> 
              <input type="text" v-model="email" placeholder="Email">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" v-model="password" placeholder="Password">
            </div>  
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" v-model="rePassword" placeholder="Re-type Password">
            </div>  
          </div>
          <div class="field">
            <div class="ui left icon input">  
              <input type="checkbox" v-model="termsCheck">
              I agree to the&nbsp;
              <router-link to="/terms-and-conditions"> terms & conditions</router-link>
            </div>
          </div>
          <button class="ui large fluid grey button" type="button" v-on:click="signUp">
            Sign Up
          </button>
        </div>

        <div class="ui red message loginForm" v-if="invalidEmail || emailInUse || invalidPassword || invalidRePassword || invalidTermsCheck">
          <p v-if="invalidEmail">Please enter a valid email!</p>
          <p v-if="emailInUse">This email is already in use!</p>
          <p v-if="invalidPassword">Password must be 6 or more characters!</p>
          <p v-if="invalidRePassword">Passwords do not match!</p>
          <p v-if="invalidTermsCheck">You must agree to the terms & conditions!</p>
        </div>
      </form>
      
      <div class="ui message new">
        Or go back to the <router-link to="/Login">login page</router-link>
      </div>

    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  
  export default {
    name: 'SignUp',
    data () {
      return{
        email: '',
        password: '',
        rePassword: '',
        termsCheck: false,
        images: {
          lemon: require('@/assets/lemon.png')
        },
        invalidEmail: false,
        emailInUse: false,
        invalidPassword: false,
        invalidRePassword: false,
        invalidTermsCheck: false
      }
    },
    methods: {
      ...mapActions([
        'registerNewUser'
      ]),
      signUp() {
        this.invalidEmail = false
        this.emailInUse = false
        this.invalidPassword = false
        this.invalidRePassword = false
        this.invalidTermsCheck = false
        if (this.password != this.rePassword)
          this.invalidRePassword = true;
        if (!this.termsCheck)
          this.invalidTermsCheck = true;
        if (!this.invalidRePassword && !this.invalidTermsCheck) {
          this.registerNewUser({email: this.email, password: this.password})
          .then(user => {
            alert('Your account has been created!')
          })
          .catch(err => {
            if (err.code == "auth/invalid-email")
              this.invalidEmail = true
            else if (err.code == "auth/weak-password")
              this.invalidPassword = true
            else if (err.code == "auth/email-already-in-use")
              this.emailInUse = true
          })
        }
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .loginForm {
    width: 300px;
    margin: auto;
    margin-bottom: 20px;
  }
  .new {
    width: 300px;
    margin: auto;
    margin-top: 20px;
  }
</style>