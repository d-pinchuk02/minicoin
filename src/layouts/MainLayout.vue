<template>
  <v-app id="app">
    <Navbar @click="sidebarOpen = !sidebarOpen" />
    <Sidebar :value="sidebarOpen" :key="locale" />
    <Loader v-if="loading" />
    <v-main v-else>
      <v-content class="pa-0">
        <v-container fluid class="pa-4">
          <router-view />
        </v-container>
      </v-content>
    </v-main>

    <v-btn fixed dark fab bottom right color="blue" to="record">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
import Navbar from "@/components/app/Navbar.vue";
import Sidebar from "@/components/app/Sidebar.vue";
import localizeFilter from "@/filters/localize.filter";

export default {
  name: "main-layout",
  data: () => ({
    sidebarOpen: true,
    loading: true
  }),
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    }

    this.loading = false;
  },
  components: {
    Navbar,
    Sidebar
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    locale() {
      return this.$store.getters.info.locale;
    }
  },
  watch: {
    error(fbError) {
      this.$error(
        localizeFilter("msg." + fbError.code) ||
          localizeFilter("msg.unknownError")
      );
    }
  }
};
</script>
