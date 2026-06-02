<template>
  <v-app-bar
    app
    clipped-left
    color="orange"
    class="pl-2"
  >
    <v-app-bar-nav-icon @click.prevent="$emit('click')"></v-app-bar-nav-icon>

    <span class="title font-weight-light">{{ dateFilter(date, 'datetime') }}</span>

    <v-spacer/>

    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          large
          text
          v-on="on"
        >
          <span class="mr-2" v-show="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm">{{name}}</span>
          <v-avatar
            size="32px"
            item
          >
            <v-icon large>mdi-account-circle</v-icon>
          </v-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="toProfile">
          <v-list-item-icon>
            <v-icon right>mdi-account-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ localizeFilter('navbar.profile') }}</v-list-item-title>
        </v-list-item>

        <v-list-item @click="logout">
          <v-list-item-icon>
            <v-icon right>mdi-logout</v-icon>
          </v-list-item-icon>
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
  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>
