<template>
  <v-card color="blue" dark>
    <v-card-title>{{ localizeFilter('homebill.title') }}</v-card-title>
    <v-card-text>
      <div
        v-for="cur of currencies"
        :key="cur"
      >
        <h2>{{ currencyFilter(getCurrency(cur), cur) }}</h2>
        <v-divider class="mt-3 mb-3"></v-divider>
      </div>
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
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'

export default {
  props: ['rates'],
  data: () => ({
    currencies: ['UAH', 'USD', 'EUR']
  }),
  computed: {
    base() {
      return this.$store.getters.info.bill / (this.rates['UAH'] / this.rates['EUR'])
    }
  },
  methods: {
    currencyFilter,
    localizeFilter,
    getCurrency(currency) {
      return Math.floor(this.base * this.rates[currency])
    }
  }
}
</script>
