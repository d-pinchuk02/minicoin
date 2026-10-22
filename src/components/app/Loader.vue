<template>
  <v-overlay
    :model-value="true"
    persistent
    class="align-center justify-center text-center"
  >
    <v-progress-circular indeterminate size="64"></v-progress-circular>
    <p class="mt-2">{{ localizeFilter('shared.loading') }}</p>
  </v-overlay>
</template>

<script setup>
import localizeFilter from '@/filters/localize.filter'
</script>
