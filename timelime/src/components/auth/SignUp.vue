<template lang="html">



<sui-card fluid class="maxwidth raised"  >
  <sui-dimmer :active="dimmerActive">
    <sui-loader>{{loaderContent}}</sui-loader>
  </sui-dimmer>
  <sui-card-header>
    <h2 class="ui grey image header">    
      <img :src="images.lemon" class="image">
      <div class="content">
        {{headerContent}}
      </div>
    </h2>
  </sui-card-header>
  <sui-card-content v-if="state==='addInfo'">
    <sui-form>
      <sui-form-field inline>
        <label>Name</label>
        <input v-model="firstName" placeholder="First">
        <input v-model="lastName" placeholder="Last">
      </sui-form-field>
      <sui-form-field>
        <textarea v-model="bio" placeholder="Tell us about yourself"></textarea>
      </sui-form-field>


    </sui-form>

  </sui-card-content>
  <sui-card-content v-if="state==='register'">
    <sui-form>
      <sui-form-field>
        <input placeholder="Email..." v-model="email">
      </sui-form-field>
      <sui-form-field>
        <input placeholder="Password..." v-model="password" type="password">
      </sui-form-field>
      <sui-form-field>
        <input placeholder="Confirm Password...." v-model="rePassword" type="password">
      </sui-form-field>
      <sui-form-field>
        <sui-checkbox v-model="termsCheck" label="I agree to the terms and conditions"></sui-checkbox>
      </sui-form-field>
    </sui-form>
  </sui-card-content >
  <sui-card-content v-if="invalidEmail || emailInUse || invalidPassword || invalidRePassword || invalidTermsCheck">
    <sui-message color="red">
      <sui-message-item v-if="invalidTermsCheck">
      You must agree to the terms & conditions!
      </sui-message-item>
      <sui-message-item v-if="invalidEmail">
        Please enter a valid email!
      </sui-message-item>
      <sui-message-item v-if="emailInUse">
        This email is already in use!
      </sui-message-item>
      <sui-message-item v-if="invalidPassword">
        Password must be 6 or more characters!
      </sui-message-item>
      <sui-message-item v-if="invalidRePassword">
        Passwords do not match!
      </sui-message-item>
    </sui-message>
  </sui-card-content>
  <sui-button attached="bottom" @click="buttonHandler()">
    {{buttonContent}} 
  </sui-button>
</sui-card>

   <!-- <div class="ui middle aligned center aligned grid" >
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
  </div>  -->



</template>

<script>
  import { mapActions } from 'vuex'
  
  export default {
    name: 'SignUp',
    data () {
      return{
        user: {},
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
        invalidTermsCheck: false,

        headerContent: 'Create a new account!',
        loaderContent: 'Registering...',
        buttonContent: 'Register',
        dimmerActive: false,

        state: 'register',

        firstName: '', 
        lastName: '',
        bio: '',
      }

    },
    methods: {
      ...mapActions([
        'registerNewUser',
        'updateUserInfo'
      ]),
      changeState: function(state) {
        this.state = state
        if(state === 'register'){
          this.headerContent = 'Create a new account'
          this.buttonContent = 'Register'
        }
        if (state === 'addInfo'){
          this.headerContent = 'Tell us about yourself!'
          this.buttonContent = 'Update Bio'
        }
      },
      setLoading: function(bool) {
        if(bool === 'true'){
          this.loading = true
          this.dimmerActive =true;
        }
        if(bool === 'false') {
          this.loading = false
          this.dimmerActive = false
        }
      },
      buttonHandler: function() {
        if(this.state === 'register') this.signUp()
        if(this.state === 'addInfo'){
          this.updateUserInfo({
            uid: this.user.uid,
            update: {
              firstName: this.firstName,
              lastName: this.lastName,
              bio: this.bio
            }
          })
          .then(() => {
            this.$router.push('/home')
          })
        }
      },

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
          this.setLoading('true')

          this.registerNewUser({email: this.email, password: this.password})
          .then(user => {
            this.user = user
            this.setLoading('false')
            this.changeState('addInfo')
            

          })
          .catch(err => {
            this.setLoading('false')
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
  .maxwidth{
    width:600px;
    margin:auto;
  }

</style>