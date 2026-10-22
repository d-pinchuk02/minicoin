<template>
  <div>
    <v-data-table
      v-model="selected"
      show-select
      item-value="id"
      :headers="headers"
      :items="items"
      :items-per-page="15"
    >
      <template v-slot:item.amount="{ item }">
        {{ currencyFilter(item.amount) }}
      </template>

      <template v-slot:item.type="{ item }">
        <v-chip :color="item.typeClass" class="text-white" variant="flat">
          {{ item.typeText }}
        </v-chip>
      </template>

      <template v-slot:item.date="{ item }">
        {{ dateFilter(item.date, 'datetime') }}
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn
          icon
          color="primary"
          :to="`/detail/${item.id}`"
          :title="localizeFilter('history.table.openRecord')"
        >
          <v-icon> mdi-open-in-new </v-icon>
        </v-btn>
        <!--<v-btn
          icon
          :title="localizeFilter('history.table.editRecord')"
        >
          <v-icon>
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn
          icon
          color="red"
          :title="localizeFilter('history.table.deleteRecord')"
        >
          <v-icon>
            mdi-delete
          </v-icon>
        </v-btn>-->
      </template>
    </v-data-table>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import currencyFilter from '@/filters/currency.filter'
import dateFilter from '@/filters/date.filter'
import localizeFilter from '@/filters/localize.filter'

const props = defineProps({ records: { required: true, type: Array } })
const selected = ref([])
const headers = computed(() => [
  { title: '#', align: 'start', key: 'index' },
  { title: localizeFilter('shared.amount'), key: 'amount' },
  { title: localizeFilter('shared.type'), key: 'type' },
  { title: localizeFilter('shared.category'), key: 'categoryName' },
  { title: localizeFilter('shared.date'), key: 'date' },
  { title: localizeFilter('history.table.actions'), key: 'actions' },
])
const items = computed(() =>
  props.records.map((item, index) => ({
    ...item,
    index: index + 1,
  })),
)
</script>
