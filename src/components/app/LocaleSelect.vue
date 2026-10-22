<template>
  <v-menu location="bottom" :class="menuClass">
    <template v-slot:activator="{ props }">
      <v-btn
        :size="activatorLarge ? 'large' : 'small'"
        :class="activatorClass"
        variant="outlined"
        v-bind="props"
      >
        <v-icon :icon="mdiTranslate" start />
        {{ languages.find((lang) => lang.id === info.locale)?.name }}
      </v-btn>
    </template>
    <v-list :class="listClass">
      <v-list-item
        v-for="lang in languages"
        :key="lang.id"
        @click="setLanguage(lang.id)"
      >
        <v-list-item-title>{{ lang.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
import { computed } from 'vue'
import { mdiTranslate } from '@mdi/js'
import { useInfoStore } from '@/store/info'
import { localesArray } from '@/locales'

defineProps({
  menuClass: {
    type: String,
    default: '',
  },
  activatorClass: {
    type: String,
    default: '',
  },
  activatorColor: {
    type: String,
    default: undefined,
  },
  activatorLarge: {
    type: Boolean,
    default: true,
  },
  listClass: {
    type: String,
    default: '',
  },
})
const infoStore = useInfoStore()
const languages = localesArray
const info = computed(() => infoStore.info)

function setLanguage(code) {
  infoStore.setInfo({ ...info.value, locale: code })
}
</script>
