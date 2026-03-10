<template>
  <v-app class="bg-gradient">
    <v-content class="bg-overlay">
      <v-container fluid class="fill-height">
        <v-row align="center" justify="center">
          <v-col cols="12" lg="5" sm="12" md="6">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'

export default {
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error (fbError) {
      this.$error(localizeFilter('msg.' + fbError.code) || localizeFilter('msg.unknownError'))
    }
  }
}
</script>

<style scoped>
.bg-gradient {
  background: linear-gradient(135deg, #FF8C00 0%, #FF6F00 100%);
}

.bg-overlay {
  background-color: rgb(0 0 0 / 0.4);
}
</style>
