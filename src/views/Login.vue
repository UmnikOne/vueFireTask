<template>
  <el-card shadow="always">
    <el-input type="text" class="login" v-model="email" placeholder="Email"></el-input>
    <el-input type="password" class="login" v-model="password" placeholder="Password"></el-input>
    <el-button type="primary" class="login" @click="login">Connection</el-button>

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
      login: function() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            this.$router.replace('home')
          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        );
      }
    }
  }
</script>

<style scoped>  /* "scoped" attribute limit the CSS to this component only */
  .login {
    margin-top: 20px;
    width: 100%;
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