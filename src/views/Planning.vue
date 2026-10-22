<template>
  <div>
    <h1>
      {{ localizeFilter('planning.title') }}
      ({{ currencyFilter(info.bill, 'UAH') }})
    </h1>

    <v-divider class="mb-4"></v-divider>

    <Loader v-if="loading" />
    <v-alert v-else-if="!categories.length" type="info">
      {{ localizeFilter('shared.noCategories') }}
      <router-link class="text-white" to="/categories">{{
        localizeFilter('shared.addCategory')
      }}</router-link>
    </v-alert>
    <v-col v-else cols="12" v-for="cat of categories" :key="cat.id">
      <p>
        <strong>{{ cat.title }}:</strong>
        {{ currencyFilter(cat.spent) }} {{ localizeFilter('shared.of') }}
        {{ currencyFilter(cat.limit) }}
      </p>
      <v-tooltip location="top">
        <template v-slot:activator="{ props }">
          <v-progress-linear
            rounded
            height="8"
            v-bind="props"
            :color="cat.progressColor"
            :model-value="cat.progressPercent"
          ></v-progress-linear>
        </template>
        <span>{{ cat.tooltip }}</span>
      </v-tooltip>
    </v-col>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'planning',
  data: () => ({
    loading: true,
    categories: [],
  }),
  computed: {
    ...mapGetters(['info']),
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.categories = categories.map((cat) => {
      const spent = records
        .filter((r) => r.categoryId === cat.id)
        .filter((r) => r.type === 'expense')
        .reduce((total, record) => {
          return (total += +record.amount)
        }, 0)

      const percent = (100 * spent) / cat.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor =
        percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'

      const tooltipValue = cat.limit - spent
      const tooltip = `${
        tooltipValue < 0
          ? localizeFilter('planning.excess')
          : localizeFilter('planning.left')
      } ${currencyFilter(Math.abs(tooltipValue))}`

      return {
        ...cat,
        progressPercent,
        progressColor,
        spent,
        tooltip,
      }
    })

    this.loading = false
  },
  methods: {
    currencyFilter,
    localizeFilter,
  },
}
</script>
