import Vue from "vue";
import firebase from "firebase";
import VueFirestore from "vue-firestore";
import App from "./App.vue";
import router from "./router";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import locale from "element-ui/lib/locale/lang/en";

require("firebase/firestore");

Vue.use(VueFirestore);
Vue.use(Element, { locale });
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

let app = "";
const config = {
  apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "XXXX.firebaseapp.com",
  databaseURL: "https://XXXX.firebaseio.com",
  projectId: "XXXX",
  storageBucket: "XXXX.appspot.com",
  messagingSenderId: "XXXXXXXXXXX"
};

const fireApp = firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");
  }
});

export const firestore = fireApp.firestore();

export const db = firebase.firestore();
