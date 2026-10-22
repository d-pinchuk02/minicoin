<template>
  <div>
    <h1>{{ localizeFilter('profile.title') }}</h1>

    <v-divider class="mb-4"></v-divider>

    <v-row>
      <v-col cols="12" sm="6">
        <v-form ref="form" v-model="isValid" @submit.prevent="submitHandler">
          <v-text-field
            :label="localizeFilter('profile.name')"
            :rules="nameRules"
            name="name"
            prepend-icon="mdi-format-letter-case"
            type="name"
            v-model.trim="name"
            required
          ></v-text-field>

          <v-select
            :items="langs"
            :label="localizeFilter('shared.selectLang')"
            name="locale"
            prepend-icon="mdi-translate"
            item-title="name"
            item-value="id"
            v-model="locale"
            required
          ></v-select>

          <v-btn color="success" type="submit">
            <v-icon start>mdi-pencil</v-icon>
            {{ localizeFilter('shared.update') }}
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useInfoStore } from '@/store/info'
import localizeFilter from '@/filters/localize.filter'
import { localesArray } from '@/locales'

const infoStore = useInfoStore()
const form = ref(null)
const name = ref(infoStore.info.name)
const locale = ref(infoStore.info.locale)
const isValid = ref(false)
const langs = localesArray
const nameRules = [
  (v) => !!v || localizeFilter('shared.errors.enterName'),
  (v) =>
    (v && v.length >= 2) ||
    localizeFilter('shared.errors.minLength') + ': ' + 2,
]

async function submitHandler() {
  const { valid } = await form.value.validate()
  if (!valid) return
  try {
    await infoStore.updateInfo({
      name: name.value,
      locale: locale.value,
    })
  } catch {}
}
</script>
