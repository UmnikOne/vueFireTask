<template>
  <b-row class="text-center" style="padding-top: 20px; padding-bottom: 20px;">
    <b-col>

    <md-tag size="small" shape="circle" type="fill" fill-color="#FC7353" font-color="#fff">返5000</md-tag>


    </b-col>
    <b-col cols="8">

    <b-card
      title="Card Title"
      img-src="https://picsum.photos/600/300/?image=25"
      img-alt="Image"
      img-top
      tag="article"
     
    >
    <b-card-text>
      Some quick example text to build on the card title and make up the bulk of the card's content.
    </b-card-text>
  </b-card>
<br><br>
      <HelloWorld msg="Welcome to Your Vue.js App"/>
      <button @click="logout">Logout</button>
      Welcome back - {{ this.username }}. <br>
      You can edit your profile, on  <router-link to="/setting">setting page</router-link>.
    </b-col>
  </b-row>
</template>

<script>
import firebase from 'firebase';
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data() {
    return {
      username: '',
    };
  },
  created() {
    var user = firebase.auth().currentUser;

    if (user) {
      this.username = user.email;
    } else {
      this.username = 'Guest'
    }
  },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}
</script>
