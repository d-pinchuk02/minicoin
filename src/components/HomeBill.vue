<template>
  <v-card color="blue" class="text-white">
    <v-card-title>{{ localizeFilter('homebill.title') }}</v-card-title>
    <v-card-text>
      <div v-for="cur of currencies" :key="cur">
        <h2>{{ currencyFilter(getCurrency(cur), cur) }}</h2>
        <v-divider class="mt-3 mb-3"></v-divider>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon @click="emit('refresh')" aria-label="Refresh balance">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'
import { useInfoStore } from '@/store/info'
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'

const props = defineProps(['rates'])
const emit = defineEmits(['refresh'])
const infoStore = useInfoStore()
const currencies = ['UAH', 'USD', 'EUR']
const base = computed(
  () => infoStore.info.bill / (props.rates.UAH / props.rates.EUR),
)

function getCurrency(currency) {
  return Math.floor(base.value * props.rates[currency])
}
</script>
