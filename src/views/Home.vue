<template>
  <div>
    <h1>{{ localizeFilter('home.title') }}</h1>

    <v-divider class="mb-4"></v-divider>

    <Loader v-if="loading" />

    <v-row v-else>
      <v-col cols="12" md="4" xs="12" sm="12">
        <HomeBill :rates="currency.conversion_rates" @refresh="refresh" />
      </v-col>
      <v-col cols="12" md="6" xs="12" sm="12">
        <HomeCurrency
          :rates="currency.conversion_rates"
          :date="currency.time_last_update_unix"
          @refresh="refresh"
        />
      </v-col>
      <v-col cols="12" md="2" xs="12" sm="12">
        <!-- Empty column -->
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useAppStore } from '@/store'
import localizeFilter from '@/filters/localize.filter'
import HomeBill from '@/components/HomeBill.vue'
import HomeCurrency from '@/components/HomeCurrency.vue'
import Loader from '@/components/app/Loader.vue'

const appStore = useAppStore()
const loading = ref(true)
const currency = ref(null)

async function refresh() {
  loading.value = true
  currency.value = await appStore.fetchCurrency()
  loading.value = false
}

onMounted(refresh)
</script>
