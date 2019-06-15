import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

let app = '';
const config = {
  apiKey: 'AIzaSyBHzOUR5PqbBC0c31vPr3OiMpWBAcxegPs',
  authDomain: 'oday-cca45.firebaseapp.com',
  databaseURL: 'https://oday-cca45.firebaseio.com',
  projectId: 'oday-cca45',
  storageBucket: 'oday-cca45.appspot.com',
  messagingSenderId: '827432625212'
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
