<template>
  <v-app>
    <v-main>
      <div class="pa-0">
        <router-view />
      </div>
    </v-main>

    <Snackbar />
  </v-app>
</template>

<script setup>
import Snackbar from '@/components/app/Snackbar.vue'
</script>

<style scoped>
.v-app-bar {
  backdrop-filter: blur(10px);
}
</style>
