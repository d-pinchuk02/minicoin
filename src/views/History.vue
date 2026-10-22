<template>
  <div>
    <h1>{{ localizeFilter('history.title') }}</h1>
    <v-divider class="mb-4"></v-divider>
    <Loader v-if="loading" />
    <v-alert v-else-if="!records.length" type="info">
      {{ localizeFilter('shared.noRecords') }}
      <router-link class="text-white" to="/record">{{
        localizeFilter('shared.addRecord')
      }}</router-link>
    </v-alert>
    <section v-else>
      <v-row>
        <v-col cols="12" md="6">
          <h2>{{ localizeFilter('shared.expenses') }}</h2>
          <HistoryChart :categories="categories" :records="expensesRecords" />
        </v-col>
        <v-col cols="12" md="6">
          <h2>{{ localizeFilter('shared.incomes') }}</h2>
          <HistoryChart :categories="categories" :records="incomeRecords" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <h2>{{ localizeFilter('shared.transactions') }}</h2>
          <HistoryTable class="mt-2" :records="items" />
        </v-col>
      </v-row>
      <div class="my-16"></div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import localizeFilter from '@/filters/localize.filter'
import HistoryTable from '@/components/HistoryTable.vue'
import HistoryChart from '@/components/HistoryChart.vue'
import Loader from '@/components/app/Loader.vue'

const store = useStore()
const loading = ref(true)
const records = ref([])
const categories = ref([])

const items = computed(() =>
  records.value
    .map((record) => ({
      ...record,
      categoryName: categories.value.find((c) => c.id === record.categoryId)
        .title,
      typeClass: record.type === 'income' ? 'green' : 'red',
      typeText:
        record.type === 'income'
          ? localizeFilter('shared.income')
          : localizeFilter('shared.expense'),
    }))
    .reverse(),
)
const expensesRecords = computed(() =>
  records.value.filter((r) => r.type === 'expense'),
)
const incomeRecords = computed(() =>
  records.value.filter((r) => r.type === 'income'),
)

onMounted(async () => {
  records.value = await store.dispatch('fetchRecords')
  categories.value = await store.dispatch('fetchCategories')
  loading.value = false
})
</script>
