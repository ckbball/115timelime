<template>
  <div class="login">
    <h3>Create a new account!</h3>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <input type="password" v-model="rePassword" placeholder="Re-type Password"><br>
    <input type="checkbox" v-model="termsCheck">I agree to the <router-link to="/terms-and-conditions">terms & conditions</router-link><br>
    <button v-on:click="signUp">Sign Up</button>
    <p>Or go back to the <router-link to="/login">login page</router-link></p>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'signUp',
    data () {
      return{
        email: '',
        password: '',
        rePassword: '',
        termsCheck: false
      }
    },
    methods: {
      signUp() {
        if (this.password === this.rePassword) {    
          if (this.termsCheck) {   
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(user => {
              this.$router.replace('Login')
              alert('Your account has been created!')
            })
            .catch(err => {
                alert('Oops! ' + err.message)
            })
          }else{
            alert('You must agree to the terms & conditions!');
          }
        }else{
          alert('Passwords do not match!');
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login {
    margin-top: 40px;
  }
  input:not([type=checkbox]) {
    margin: 10px 0;
    width: 300px;
    padding: 15px;
  }
  input[type=checkbox]{
    margin: 10px 0;
    margin-right: 10px;
    padding: 15px;
  }
  button {
    margin-top: 20px;
    width: 100px;
    cursor: pointer;
  }
  p {
    margin-top: 40px;
    font-size: 13px;
  }
  a {
    text-decoration: underline;
    cursor: pointer;
  }
</style>