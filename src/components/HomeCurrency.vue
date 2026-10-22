<template>
  <v-card color="deep-orange" class="text-white">
    <v-card-title>{{ localizeFilter('homecurrency.title') }}</v-card-title>
    <v-card-text>
      <v-table class="bg-deep-orange text-white">
        <thead>
          <tr>
            <th>{{ localizeFilter('homecurrency.currency') }}</th>
            <th>{{ localizeFilter('homecurrency.rate') }}</th>
            <th>{{ localizeFilter('shared.date') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cur of currencies" :key="cur">
            <td>{{ cur }}</td>
            <td>{{ rates[cur].toFixed(2) }}</td>
            <td>{{ dateFilter(date * 1000, 'date') }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon @click="emit('refresh')" aria-label="Refresh exchange rates">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import dateFilter from '@/filters/date.filter'
import localizeFilter from '@/filters/localize.filter'

defineProps(['rates', 'date'])
const emit = defineEmits(['refresh'])
const currencies = ['UAH', 'USD', 'EUR']
</script>

<style scoped>
.theme--dark.v-data-table
  tbody
  tr:hover:not(.v-data-table__expanded__content):not(
    .v-data-table__empty-wrapper
  ) {
  background: inherit;
}
</style>
