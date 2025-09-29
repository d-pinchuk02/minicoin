# MiniCoin

[![Vue.js V2](https://img.shields.io/badge/Vue.js-v2-%234FC08D%20?style=for-the-badge&logo=vue.js)](https://github.com/sveltejs/svelte)
[![LICENSE](https://img.shields.io/badge/License-MIT-%23F05032%20?style=for-the-badge&logo=git)](LICENSE)
[![Vercel Demo](https://img.shields.io/badge/Vercel-Demo-%23000000%20?style=for-the-badge&logo=vercel)](https://minicoin.now.sh/login?locale=en-US)

This is a simple personal finance manager made with Vue.js

[Public demo available here](https://minicoin.now.sh/login?locale=en-US).

<p align="center">
  <img width="2912" height="1558" alt="Banner(1)" src="https://github.com/user-attachments/assets/e92be742-14a3-4337-9e32-a4df90123562" />
</p>

## Installation

### Clone the repo
``` bash
git clone https://github.com/d-pinchuk02/minicoin-vue.git
```

### Go into app's directory
``` bash
cd minicoin-vue
```

### Install app's dependencies
``` bash
npm install
```

### Rename ```.env.example``` file to ```.env.local``` and fill up variables
Get your free API key from [Exchangerate API](https://exchangerate-api.com).
Put it in a ```VUE_APP_EXCHANGERATE_API_KEY``` variable.

Create a [Firebase](https://console.firebase.google.com) app for Web.
Put your config data (shows after app creation) in the following ```VUE_APP_FIRE_``` variables.

Enable [Auth](https://firebase.google.com/docs/auth/web/start) and [Realtime Database](https://firebase.google.com/docs/database/web/start) modules.

Go to Authentication/Sign-in method page. Enable Email/Password in sign-in providers.

Go to Realtime Database/Rules page, paste below rules and press Publish.
``` js
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth != null && auth.uid == $uid",
        ".write": "auth != null && auth.uid == $uid"
      }
    }
  }
}
```

### Run
``` bash
npm run serve
```

## Licensing
This project is licensed under the MIT license (see [LICENSE](LICENSE)).

## Credits
Big thanks to the [Vue](https://vuejs.org) command for creating this awesome framework.

Thanks to the [Vuetify](https://vuetifyjs.com), [Vuex](https://vuex.vuejs.org), [Vue Meta](https://vue-meta.nuxtjs.org), [Vue Router](https://router.vuejs.org), [Vue Toasted](https://shakee93.github.io/vue-toasted), [Vue Chart.js](https://vue-chartjs.org) and [Chart.js](https://chartjs.org) creators.

Also big thanks to the guys created [Firebase](https://firebase.google.com) - backend of this application.

A project logo made by [Kiranshastry](https://flaticon.com/authors/kiranshastry) from [Flaticon](https://flaticon.com).

## Contributing
I wrote this project while I was learning Vue and related stuff and have no plans to do any serious development on it.

However, if you want to fix a bug or add a new feature, feel free to open a pull request or issue.
