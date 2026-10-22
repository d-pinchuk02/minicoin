<template>
  <component :is="layout" />
</template>

<script setup>
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import EmptyLayout from '@/layouts/EmptyLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import LandingLayout from '@/layouts/LandingLayout.vue'
import title from '@/utils/title'

const route = useRoute()
const layouts = { empty: EmptyLayout, main: MainLayout, landing: LandingLayout }
const layout = computed(() => layouts[route.meta.layout || 'empty'])

watchEffect(() => {
  document.title = route.meta.titleKey
    ? title(route.meta.titleKey)
    : import.meta.env.VITE_TITLE
})
</script>
