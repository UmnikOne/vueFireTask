<template>
  <div class="home">
    Privet. {{ user.displayName }}
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
      locations: [],
      user: '',
    };
  },
  firestore () {
    return {
      locations: db.collection('users'),
    }
  },
  created() {
    this.user = firebase.auth().currentUser;
    var tets = firebase.firestore().collection('users');
    console.log(tets);
    // if (user) {
    //   firebase.firestore().collection('users').onSnapshot(querySnapshot => {
    //           let postsArray = []

    //           querySnapshot.forEach(doc => {
    //               let post = doc.data()
    //               post.id = doc.id
    //               console.log(post.id);
    //           })
    //       })
    // } else {
    //   this.username = 'Guest'
    // }
  },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    push() {
      console.log('test');
      this.user.updateProfile({
        displayName: 'UmnikOne',
        photoURL: 'http://test/ololo'
      });
      // db.collection('users').add({ avatar: 'test', email: this.username, nickname: 'test2' });
    }
  }
}
</script>
