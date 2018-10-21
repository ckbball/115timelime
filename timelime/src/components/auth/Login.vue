<template>
  <div class="ui middle aligned center aligned grid">
    <div class="column">
      <h2 class="ui grey image header">    
        <img :src="images.lemon" class="image">
        <div class="content">
          Log In
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
          <button class="ui large fluid grey button" type="button" v-on:click="signIn">
            Squeeze!
          </button>
        </div>

        <div class="ui red message loginForm" v-if="invalidEmail || invalidPassword">
          <p v-if="invalidEmail">Please enter a valid email</p>
          <p v-if="invalidPassword">Incorrect password</p>
        </div>
      </form>
      
      <div class="ui message new">
        New to TimeLime? You can <router-link to="/sign-up">create a new account!</router-link>
      </div>

    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  
  export default {
    name: 'Login',
    data () {
      return{
        email: '',
        password: '',
        images: {
          lemon: require('@/assets/lemon.png')
        },
        invalidEmail: false,
        invalidPassword: false
      }
    },
    methods: {
      ...mapActions([
        'authenticateUser'
      ]),
      signIn() {
        this.authenticateUser({email: this.email, password: this.password})
        .catch(err => {
          this.invalidEmail = false
          this.invalidPassword = false
          if (err.code == "auth/invalid-email") this.invalidEmail = true
          else if (err.code == "auth/wrong-password") this.invalidPassword = true
        })
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