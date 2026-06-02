<template>
  <v-card color="deep-orange" dark>
    <v-card-title>{{ localizeFilter('homecurrency.title') }}</v-card-title>
    <v-card-text>
      <v-simple-table dark class="deep-orange">
        <thead>
          <tr>
            <th>{{ localizeFilter('homecurrency.currency') }}</th>
            <th>{{ localizeFilter('homecurrency.rate') }}</th>
            <th>{{ localizeFilter('shared.date') }}</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="cur of currencies" :key="cur">
              <td>{{cur}}</td>
              <td>{{rates[cur].toFixed(2)}}</td>
              <td>{{ dateFilter(date * 1000, 'date') }}</td>
            </tr>
        </tbody>
      </v-simple-table>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon @click.prevent="$parent.refresh">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import dateFilter from '@/filters/date.filter'
import localizeFilter from '@/filters/localize.filter'

export default {
  props: ['rates', 'date'],
  data: () => ({
    currencies: ['UAH', 'USD', 'EUR']
  }),
  methods: {
    dateFilter,
    localizeFilter,
  },
}
</script>

<style scoped>
.theme--dark.v-data-table tbody tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: inherit;
}
</style>
