<template>
  <div class="login">
    <h3>Sign In</h3>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <button v-on:click="signIn">Squeeze!</button>
    <p>New to TimeLime? You can <router-link to="/sign-up">create a new account!</router-link></p>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'login',
    data () {
      return{
        email: '',
        password: ''
      }
    },
    methods: {
      signIn() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          alert('Logged in successfully!')
        })
        .catch(err => {
          alert('Oops! ' + err.message)
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login {
    margin-top: 40px;
  }
  input {
    margin: 10px 0;
    width: 30%;
    padding: 15px;
  }
  button {
    margin-top: 20px;
    width: 10%;
    cursor: pointer;
  }
  p {
    margin-top: 40px;
    font-size: 13px;
  }
  p a {
    text-decoration: underline;
    cursor: pointer;
  }
</style>
