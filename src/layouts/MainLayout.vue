<template>
  <v-app>
    <Navbar @click="sidebarOpen = !sidebarOpen" />
    <Sidebar v-model="sidebarOpen" :key="locale" />
    <Loader v-if="loading" />
    <v-main v-else>
      <div class="pa-0">
        <v-container fluid class="pa-4">
          <router-view />
        </v-container>
      </div>
    </v-main>

    <v-btn
      position="fixed"
      icon
      class="record-fab"
      color="blue"
      to="/record"
      aria-label="New record"
    >
      <v-icon :icon="mdiPlus" />
    </v-btn>

    <Snackbar />
  </v-app>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { mdiPlus } from '@mdi/js'
import { useInfoStore } from '@/store/info'
import { useAppStore } from '@/store'
import Navbar from '@/components/app/Navbar.vue'
import Sidebar from '@/components/app/Sidebar.vue'
import Snackbar from '@/components/app/Snackbar.vue'
import Loader from '@/components/app/Loader.vue'
import localizeFilter from '@/filters/localize.filter'
import { useMessage } from '@/composables/useMessage'

const infoStore = useInfoStore()
const appStore = useAppStore()
const { error: showError } = useMessage()
const sidebarOpen = ref(null)
const loading = ref(true)
const locale = computed(() => infoStore.info.locale)

onMounted(async () => {
  if (!infoStore.info.name) {
    await infoStore.fetchInfo()
  }
  loading.value = false
})

watch(
  () => appStore.error,
  (fbError) => {
    if (!fbError) return
    showError(
      localizeFilter('msg.' + fbError.code) ||
        localizeFilter('msg.unknownError'),
    )
  },
)
</script>
