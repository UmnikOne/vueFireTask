import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

let app = '';
const config = {
  apiKey: 'AIzaSyD7SAoJL0njb8kjWe5K0gTFdUTbbinjD2M',
  authDomain: 'oday-8ff2e.firebaseapp.com',
  databaseURL: 'https://oday-8ff2e.firebaseio.com',
  projectId: 'oday-8ff2e',
  storageBucket: 'oday-8ff2e.appspot.com',
  messagingSenderId: '554537556464'
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app');
  }
});

export const db = firebase.firestore();
