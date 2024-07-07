import Vue from "vue";
import VueMeta from "vue-meta";
import Toasted from "vue-toasted";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dateFilter from "@/filters/date.filter";
import currencyFilter from "@/filters/currency.filter";
import localizeFilter from "@/filters/localize.filter";
import messagePlugin from "@/utils/message.plugin";
import titlePlugin from "@/utils/title.plugin";
import Loader from "@/components/app/Loader";
import "./registerServiceWorker";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(titlePlugin);
Vue.use(VueMeta);
Vue.use(Toasted, { iconPack: "mdi" });
Vue.filter("date", dateFilter);
Vue.filter("currency", currencyFilter);
Vue.filter("localize", localizeFilter);
Vue.component("Loader", Loader);

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIRE_API_KEY,
  authDomain: process.env.VUE_APP_FIRE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIRE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIRE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIRE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIRE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIRE_APP_ID,
  measurementId: process.env.VUE_APP_FIRE_MEASUREMENT_ID
};

if (!process.env.VUE_APP_FIRE_API_KEY || !process.env.VUE_APP_FIRE_AUTH_DOMAIN || !process.env.VUE_APP_FIRE_DATABASE_URL || !process.env.VUE_APP_FIRE_PROJECT_ID || !process.env.VUE_APP_FIRE_STORAGE_BUCKET || !process.env.VUE_APP_FIRE_MESSAGING_SENDER_ID || !process.env.VUE_APP_FIRE_APP_ID || !process.env.VUE_APP_FIRE_MEASUREMENT_ID) {
	document.body.innerHTML = "<h1>Firebase connection error</h1><h2>Failed to connect to Firebase server.</h2><h4>If you are a site administrator, check your environment variables for Firebase tokens.</h4> <br> <h2>Не удалось подключиться к серверу Firebase.</h2><h4>Если вы администратор сайта, проверьте переменные окружения на наличие токенов Firebase.</h4>";
	document.body.style.fontFamily = "'Roboto', 'Open Sans', Helvetica, Arial, sans-serif";
} else {
  firebase.initializeApp(firebaseConfig);
  
  let app;
  
  firebase.auth().onAuthStateChanged((state) => {
    if (!app) {
      app = new Vue({
        router,
        store,
        vuetify,
        render: h => h(App)
      }).$mount("#app");
    }
  });
}
