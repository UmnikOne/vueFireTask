import Vue from 'vue';
import firebase from 'firebase';
import VueFirestore from 'vue-firestore';
import App from './App.vue';
import router from './router';
import mandMobile from 'mand-mobile';
import 'mand-mobile/lib/mand-mobile.css';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

require('firebase/firestore');

Vue.use(VueFirestore);
Vue.use(mandMobile);
Vue.use(Element);
Vue.use(BootstrapVue);

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

const fireApp = firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app');
  }
});

export const firestore = fireApp.firestore();

export const db = firebase.firestore();

