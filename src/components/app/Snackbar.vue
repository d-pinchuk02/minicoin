<template>
  <v-snackbar
    v-model="message.show"
    :timeout="message.timeout"
    :color="message.color"
    location="top right"
  >
    <v-icon start v-if="message.icon">{{ message.icon }}</v-icon>
    {{ message.text }}

    <template v-slot:actions>
      <v-btn variant="text" color="white" @click="message.show = false"
        >OK</v-btn
      >
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'app-snackbar',
  computed: {
    message() {
      return this.$message
    },
  },
}
</script>
