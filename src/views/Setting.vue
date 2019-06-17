<template>
  <div class="home">
    Privet. {{ new Date() }}
    <a href='#' @click="push()">test</a>
  </div>
</template>

<script>
import firebase from 'firebase';
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

import { db } from '../main'

export default {
  name: 'setting',
  components: {
    HelloWorld
  },
  data() {
    return {
      username: '',
    };
  },
  firestore () {
    return {
      locations: db.collection('users'),
    }
  },
  created() {
    var user = firebase.auth().currentUser;
    var tets = firebase.firestore().collection('users');
    console.log(tets);
    if (user) {
      for (var key in tets) {
        console.log(tets[key]);
      }
    } else {
      this.username = 'Guest'
    }
  },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    push() {
      console.log('test');
      db.collection('users').add({ avatar: 'test', email: this.username, nickname: 'test2' });
    }
  }
}
</script>
