<template>
  <v-app>
    <v-main>
      <v-content class="pa-0">
        <router-view />
      </v-content>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'landing-layout',
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
