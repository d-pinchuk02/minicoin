<template>
  <v-app class="bg-gradient">
    <v-main class="bg-overlay">
      <v-container fluid class="fill-height d-flex align-center flex-wrap">
        <v-row class="align-center justify-center">
          <v-col cols="12" lg="5" sm="12" md="6">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <Snackbar />
  </v-app>
</template>

<script>
import Snackbar from '@/components/app/Snackbar.vue'
import localizeFilter from '@/filters/localize.filter'

export default {
  components: {
    Snackbar,
  },
  computed: {
    error() {
      return this.$store.getters.error
    },
  },
  watch: {
    error(fbError) {
      this.$error(
        localizeFilter('msg.' + fbError.code) ||
          localizeFilter('msg.unknownError'),
      )
    },
  },
}
</script>

<style scoped>
.bg-gradient {
  background: linear-gradient(135deg, #ff8c00 0%, #ff6f00 100%);
}

.bg-overlay {
  background-color: rgb(0 0 0 / 0.4);
}
</style>
