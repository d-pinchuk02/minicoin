<template>
  <div>
    <h2>{{ localizeFilter('categories.create.title') }}</h2>

    <v-divider class="mb-4"></v-divider>

    <v-form v-model="isValid" ref="form" @submit.prevent="submitHandler">
      <v-text-field
        :label="localizeFilter('categories.create.name')"
        :rules="titleRules"
        name="title"
        prepend-icon="mdi-format-letter-case"
        type="text"
        v-model.trim="title"
        required
      ></v-text-field>

      <v-text-field
        :label="localizeFilter('shared.limit')"
        :rules="limitRules"
        name="limit"
        prepend-icon="mdi-cash-multiple"
        type="number"
        v-model="limit"
        required
      ></v-text-field>

      <v-btn color="success" type="submit" :disabled="!isValid">
        <v-icon start>mdi-plus</v-icon>
        {{ localizeFilter('shared.create') }}
      </v-btn>
    </v-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCategoryStore } from '@/store/category'
import localizeFilter from '@/filters/localize.filter'
import { useMessage } from '@/composables/useMessage'

const emit = defineEmits(['created'])
const categoryStore = useCategoryStore()
const { success } = useMessage()
const form = ref(null)
const title = ref('')
const limit = ref(1)
const isValid = ref(false)
const titleRules = [
  (v) => !!v || localizeFilter('categories.create.error.enterTitle'),
  (v) =>
    (v && v.length >= 2) || localizeFilter('shared.error.minLength') + ': ' + 2,
]

const limitRules = [
  (v) => (v && +v >= 1) || localizeFilter('shared.error.minValue') + ': ' + 1,
]

async function submitHandler() {
  const { valid } = await form.value.validate()
  if (!valid) return
  try {
    const category = await categoryStore.createCategory({
      title: title.value,
      limit: limit.value,
    })
    form.value.reset()
    title.value = ''
    limit.value = 1
    success(localizeFilter('msg.categoryCreated'))
    emit('created', category)
  } catch {}
}
</script>
