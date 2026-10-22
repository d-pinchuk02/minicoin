<template>
  <div>
    <h1>
      <v-btn icon size="large" color="primary" :to="'/history'">
        <v-icon :icon="mdiArrowLeft" />
      </v-btn>
      {{ localizeFilter('history.recordTitle') }}
    </h1>
    <v-divider class="mb-4"></v-divider>

    <Loader v-if="loading" />
    <v-row v-else-if="record">
      <v-col cols="12" sm="6">
        <v-card variant="outlined">
          <v-card-title>
            {{ currencyFilter(record.amount) }}
            <v-chip
              class="ml-4 text-white"
              :color="record.typeColor"
              label
              variant="flat"
            >
              <v-icon :icon="record.typeIcon" start />
              {{ record.typeText }}
            </v-chip>
          </v-card-title>
          <v-card-subtitle>{{
            dateFilter(record.date, 'datetime')
          }}</v-card-subtitle>
          <v-card-text>
            <v-chip color="primary" variant="flat" label class="text-white">
              <v-icon :icon="mdiShape" start />
              {{ record.categoryName }}
            </v-chip>
            <br />
            <br />
            {{ record.description }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-alert v-else type="error">
      {{ localizeFilter('history.noRecord') }}
    </v-alert>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { mdiArrowLeft, mdiPlus, mdiMinus, mdiShape } from '@mdi/js'
import { useRecordStore } from '@/store/record'
import { useCategoryStore } from '@/store/category'
import currencyFilter from '@/filters/currency.filter'
import dateFilter from '@/filters/date.filter'
import localizeFilter from '@/filters/localize.filter'
import Loader from '@/components/app/Loader.vue'

const route = useRoute()
const recordStore = useRecordStore()
const categoryStore = useCategoryStore()
const record = ref(null)
const loading = ref(true)

onMounted(async () => {
  const fetchedRecord = await recordStore.fetchRecordById(route.params.id)
  const category = await categoryStore.fetchCategoryById(
    fetchedRecord.categoryId,
  )
  const isIncome = fetchedRecord.type === 'income'

  record.value = {
    ...fetchedRecord,
    categoryName: category.title,
    typeText: localizeFilter(isIncome ? 'shared.income' : 'shared.expense'),
    typeIcon: isIncome ? mdiPlus : mdiMinus,
    typeColor: isIncome ? 'green' : 'red',
  }
  loading.value = false
})
</script>
