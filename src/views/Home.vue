<template>
  <div>
    <h1>{{ localizeFilter('home.title') }}</h1>

    <v-divider class="mb-4"></v-divider>

    <Loader v-if="loading" />

    <v-row v-else>
      <v-col cols="12" md="4" xs="12" sm="12">
        <HomeBill :rates="currency.conversion_rates" />
      </v-col>
      <v-col cols="12" md="6" xs="12" sm="12">
        <HomeCurrency :rates="currency.conversion_rates" :date="currency.time_last_update_unix" />
      </v-col>
      <v-col cols="12" md="2" xs="12" sm="12">
        <!-- Empty column -->
      </v-col>
    </v-row>
  </div>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'
import HomeBill from '@/components/HomeBill.vue'
import HomeCurrency from '@/components/HomeCurrency.vue'

export default {
  name: "dashboard",
  data: () => ({
    loading: true,
    currency: null
  }),
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency')
    this.loading = false
  },
  methods: {
    localizeFilter,
    async refresh() {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    }
  },
  components: {
    HomeBill, HomeCurrency
  }
};
</script>
