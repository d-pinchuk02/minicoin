<template>
  <v-app-bar
    color="orange"
    class="pl-2"
  >
    <v-app-bar-nav-icon @click.prevent="$emit('click')"></v-app-bar-nav-icon>

    <span class="title font-weight-light">{{ dateFilter(date, 'datetime') }}</span>

    <v-spacer/>

    <v-menu location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn
          size="large"
          variant="text"
          v-bind="props"
        >
          <span class="mr-2" v-show="!$vuetify.display.xs && !$vuetify.display.sm">{{name}}</span>
          <v-avatar
            size="32"
          >
            <v-icon size="large">mdi-account-circle</v-icon>
          </v-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="toProfile">
          <template #prepend>
            <v-icon end>mdi-account-circle</v-icon>
          </template>
          <v-list-item-title>{{ localizeFilter('navbar.profile') }}</v-list-item-title>
        </v-list-item>

        <v-list-item @click="logout">
          <template #prepend>
            <v-icon end>mdi-logout</v-icon>
          </template>
          <v-list-item-title>{{ localizeFilter('navbar.logout') }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import dateFilter from '@/filters/date.filter'
import localizeFilter from '@/filters/localize.filter'

export default {
  emits: ['click'],
  data: () => ({
    date: new Date(),
    interval: null,
  }),
  methods: {
    dateFilter,
    localizeFilter,
    async logout() {
      let locale = this.$store.getters.info.locale
      await this.$store.dispatch('logout')
      this.$router.push({
        name: 'login',
        query: {
          message: 'logout',
          locale: locale
        }
      })
    },
    toProfile() {
      this.$router.push('/profile')
    }
  },
  computed: {
    name() {
      return this.$store.getters.info.name
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)
  },
  beforeUnmount() {
    clearInterval(this.interval)
  }
}
</script>
