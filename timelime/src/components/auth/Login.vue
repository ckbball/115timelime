<template>
  <div class="ui middle aligned center aligned grid">
    <div class="column">
      <h2 class="ui grey image header">    
        <img :src="images.lemon" class="image">
        <div class="content">
          Log In
        </div>
      </h2>
      <form class="ui large form error">
        <div class="ui stacked segment">
          <div class="field error">
            <div class="ui left icon input">
              <i class="user icon"></i> 
              <input type="text" name="email" v-model="vemail" placeholder="Email">
            </div>
          </div>
          <div class="field error">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" name="password" v-model="vpassword" placeholder="Password">
            </div>  
          </div>
          <div class="ui fluid large grey submit button">
            Squeeze!
          </div>
        </div>

        <div class="ui error message">
          <ul class="list">
            <li>Please enter your e-mail</li>
            <li>Please enter a valid e-mail</li>
            <li>Please enter your password</li>
            <li>Your password must be at least 6 characters</li>
          </ul>
        </div>
      </form>
      
      <div class="ui message">
        New to TimeLime? You can <router-link to="/sign-up">create a new account!</router-link>
      </div>

      <!-- <button class="ui secondary button" v-on:click="signIn">Squeeze!</button> -->
    </div>
  </div>
</template>

<script>
  //import firebase from 'firebase'
  import { mapActions } from 'vuex'
  export default {
    name: 'Login',
    data () {
      return{
        email: '',
        password: '',
        images: {
          lemon: require('@/assets/lemon.png')
        }
      }
    },
    methods: {
      ...mapActions([
        'authenticateUser'
      ]),
      signIn() {
        this.authenticateUser({email: this.email, password: this.password})
        .catch(err => {
          alert('Oops! ' + err.message)
        })
      }
    }
  }

// $('.ui.form')
//   .form({
//     fields: {
//       email    : 'empty',
//       password   : 'empty',
//     }
//   })
// ;

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .account {
    margin-top: 40px;
  }
  input {
    margin: 10px 0;
    width: 300px;
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
  p a {
    text-decoration: underline;
    cursor: pointer;
  }
</style>