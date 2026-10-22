<template>
  <v-snackbar
    v-model="message.show"
    :timeout="message.timeout"
    :color="message.color"
    location="top right"
  >
    <v-icon :icon="message.icon" start v-if="message.icon" />
    {{ message.text }}

    <template v-slot:actions>
      <v-btn variant="text" color="white" @click="message.show = false"
        >OK</v-btn
      >
    </template>
  </v-snackbar>
</template>

<script setup>
import { useMessage } from '@/composables/useMessage'

const { message } = useMessage()
</script>
