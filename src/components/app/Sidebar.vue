<template>
  <v-navigation-drawer v-model="model">
    <v-list density="compact" nav>
      <v-list-item
        v-for="item in links"
        :key="item.title"
        :to="item.to"
        router
        exact
      >
        <template #prepend>
          <v-icon :icon="item.icon" end />
        </template>

        <div>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </div>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { computed } from 'vue'
import {
  mdiCurrencyUsd,
  mdiHistory,
  mdiTrendingUp,
  mdiPlus,
  mdiShape,
} from '@mdi/js'
import localizeFilter from '@/filters/localize.filter'

const model = defineModel({ default: null })
const links = computed(() => [
  {
    title: localizeFilter('sidebar.bill'),
    icon: mdiCurrencyUsd,
    to: '/dashboard',
  },
  {
    title: localizeFilter('sidebar.history'),
    icon: mdiHistory,
    to: '/history',
  },
  {
    title: localizeFilter('sidebar.planning'),
    icon: mdiTrendingUp,
    to: '/planning',
  },
  {
    title: localizeFilter('sidebar.record'),
    icon: mdiPlus,
    to: '/record',
  },
  {
    title: localizeFilter('sidebar.categories'),
    icon: mdiShape,
    to: '/categories',
  },
])
</script>
