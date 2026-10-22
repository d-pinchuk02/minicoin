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
          <v-icon end>{{ item.icon }}</v-icon>
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
import localizeFilter from '@/filters/localize.filter'

const model = defineModel({ default: null })
const links = computed(() => [
  {
    title: localizeFilter('sidebar.bill'),
    icon: 'mdi-currency-usd',
    to: '/dashboard',
  },
  {
    title: localizeFilter('sidebar.history'),
    icon: 'mdi-history',
    to: '/history',
  },
  {
    title: localizeFilter('sidebar.planning'),
    icon: 'mdi-trending-up',
    to: '/planning',
  },
  {
    title: localizeFilter('sidebar.record'),
    icon: 'mdi-plus',
    to: '/record',
  },
  {
    title: localizeFilter('sidebar.categories'),
    icon: 'mdi-shape',
    to: '/categories',
  },
])
</script>
