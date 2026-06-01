<template>
  <v-app>
    <v-main>
      <v-content class="pa-0">
        <router-view />
      </v-content>
    </v-main>

    <Snackbar />
  </v-app>
</template>

<script>
import Snackbar from "@/components/app/Snackbar.vue";

export default {
  name: 'landing-layout',
  components: {
    Snackbar,
  },
  data: () => ({
    appTitle: import.meta.env.VITE_TITLE,
  })
}
</script>

<style scoped>
.v-app-bar {
  backdrop-filter: blur(10px);
}
</style>
