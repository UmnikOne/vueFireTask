<template>
  <el-card shadow="always">
    <p>Let's create a new account !</p>
    <el-input type="text" class="login" v-model="email" placeholder="Email"></el-input>
    <el-input type="password" class="login" v-model="password" placeholder="Password"></el-input>
    <el-button type="primary" class="login" @click="signUp">Sign Up</el-button>

    <p><center>or go back to <router-link to="/login">login</router-link>.</center></p>
  </el-card>
</template>

 <script>
  import firebase from 'firebase';

  export default {
    name: 'signUp',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      signUp: function() {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
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

 <style scoped>
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