<template>
  <v-overlay>
    <v-progress-circular indeterminate size="64"></v-progress-circular>
    <p class="mt-2">{{ localizeFilter('shared.loading') }}</p>
  </v-overlay>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'

export default {
  methods: {
    localizeFilter,
  },
}
</script>
