<template>
  <v-app-bar color="orange" class="pl-2">
    <v-app-bar-nav-icon @click.prevent="emit('click')"></v-app-bar-nav-icon>

    <span class="title font-weight-light">{{
      dateFilter(date, 'datetime')
    }}</span>

    <v-spacer />

    <v-menu location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn size="large" variant="text" v-bind="props">
          <span class="mr-2" v-show="!smAndDown">{{ name }}</span>
          <v-avatar size="32">
            <v-icon size="large">mdi-account-circle</v-icon>
          </v-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="toProfile">
          <template #prepend>
            <v-icon end>mdi-account-circle</v-icon>
          </template>
          <v-list-item-title>{{
            localizeFilter('navbar.profile')
          }}</v-list-item-title>
        </v-list-item>

        <v-list-item @click="logout">
          <template #prepend>
            <v-icon end>mdi-logout</v-icon>
          </template>
          <v-list-item-title>{{
            localizeFilter('navbar.logout')
          }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { useInfoStore } from '@/store/info'
import { useDisplay } from 'vuetify'
import dateFilter from '@/filters/date.filter'
import localizeFilter from '@/filters/localize.filter'

const emit = defineEmits(['click'])
const router = useRouter()
const authStore = useAuthStore()
const infoStore = useInfoStore()
const { smAndDown } = useDisplay()
const date = ref(new Date())
const name = computed(() => infoStore.info.name)
let interval

onMounted(() => {
  interval = setInterval(() => {
    date.value = new Date()
  }, 1000)
})
onUnmounted(() => clearInterval(interval))

async function logout() {
  const locale = infoStore.info.locale
  await authStore.logout()
  router.push({ name: 'login', query: { message: 'logout', locale } })
}

function toProfile() {
  router.push('/profile')
}
</script>
