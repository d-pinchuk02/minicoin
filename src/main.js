import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'
import vuetify from './plugins/vuetify'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_API_KEY,
  authDomain: import.meta.env.VITE_FIRE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIRE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIRE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIRE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIRE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIRE_APP_ID,
  measurementId: import.meta.env.VITE_FIRE_MEASUREMENT_ID,
}

if (
  !import.meta.env.VITE_FIRE_API_KEY ||
  !import.meta.env.VITE_FIRE_AUTH_DOMAIN ||
  !import.meta.env.VITE_FIRE_DATABASE_URL ||
  !import.meta.env.VITE_FIRE_PROJECT_ID ||
  !import.meta.env.VITE_FIRE_STORAGE_BUCKET ||
  !import.meta.env.VITE_FIRE_MESSAGING_SENDER_ID ||
  !import.meta.env.VITE_FIRE_APP_ID ||
  !import.meta.env.VITE_FIRE_MEASUREMENT_ID
) {
  document.body.innerHTML =
    '<h1>Firebase connection error</h1><h2>Failed to connect to Firebase server.</h2><h4>If you are a site administrator, check your environment variables for Firebase tokens.</h4> <br> <h2>Не удалось подключиться к серверу Firebase.</h2><h4>Если вы администратор сайта, проверьте переменные окружения на наличие токенов Firebase.</h4>'
  document.body.style.fontFamily =
    "'Roboto', 'Open Sans', Helvetica, Arial, sans-serif"
} else {
  firebase.initializeApp(firebaseConfig)

  let app, pinia

  firebase.auth().onAuthStateChanged((state) => {
    if (!app) {
      pinia = createPinia()
      app = createApp(App)
      app.use(pinia)
      app.use(router)
      app.use(vuetify)
      router.isReady().then(() => app.mount('#app'))
    }
  })
}
