<template>
  <el-card shadow="always">
    <el-input type="text" class="login" v-model="email" placeholder="Email"></el-input>
    <el-input type="password" class="login" v-model="password" placeholder="Password"></el-input>
    <el-button type="primary" class="login" @click="login">Login</el-button>
    <p>
      <center>
        or <b>Sign In with Google</b>
        <br>
        <el-button id="social" @click="googleLogin()"><img src="../assets/google.png"></el-button>
      </center>
    </p>
    <p><center>You don't have an account ? You can <router-link to="/sign-up">create one</router-link></center></p>
  </el-card>
</template>

<script>
  import firebase from 'firebase';

  export default {
    name: 'login',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      login() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            this.$router.replace('home');
          },
          (err) => {
            alert('Oops. ' + err.message);
          }
        );
      },

      googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then((result) => {
          this.$router.replace('home');
        }).catch((err) => {
          alert(err.message);
        });
      }
    }
  }
</script>

<style scoped>
  .login {
    margin-top: 20px;
    width: 100%;
  }
  
  #social {
    margin-top: 10px;
  }

  p {
    margin-top: 12px;
    font-size: 13px;
  }

  p a {
    text-decoration: underline;
    cursor: pointer;
  }
</style>