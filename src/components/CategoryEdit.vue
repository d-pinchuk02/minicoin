<template>
  <div>
    <h2>{{ localizeFilter('categoryedit.title') }}</h2>

    <v-divider class="mb-4"></v-divider>

    <v-form v-model="isValid" ref="form" @submit.prevent="submitHandler">
      <v-select
        :items="categories"
        :label="localizeFilter('shared.selectCategory')"
        name="category"
        prepend-icon="mdi-shape"
        item-title="title"
        item-value="id"
        v-model="current"
        required
      ></v-select>

      <v-text-field
        :label="localizeFilter('categoryedit.name')"
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
        <v-icon start>mdi-pencil</v-icon>
        {{ localizeFilter('shared.update') }}
      </v-btn>
    </v-form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import localizeFilter from '@/filters/localize.filter'
import { useMessage } from '@/composables/useMessage'

const props = defineProps({ categories: { type: Array, required: true } })
const emit = defineEmits(['updated'])
const store = useStore()
const { success } = useMessage()
const form = ref(null)
const isValid = ref(false)
const title = ref('')
const limit = ref(1)
const current = ref(props.categories[0]?.id)
const titleRules = [
  (v) => !!v || localizeFilter('categoryedit.error.enterTitle'),
]
const limitRules = [
  (v) => (v && +v >= 1) || localizeFilter('shared.errors.minValue') + ': ' + 1,
]

watch(
  current,
  (catId) => {
    const category = props.categories.find((c) => c.id === catId)
    if (!category) return
    title.value = category.title
    limit.value = category.limit
  },
  { immediate: true },
)

async function submitHandler() {
  const { valid } = await form.value.validate()
  if (!valid) return
  try {
    const categoryData = {
      id: current.value,
      title: title.value,
      limit: limit.value,
    }
    await store.dispatch('updateCategory', categoryData)
    success(localizeFilter('msg.categoryUpdated'))
    emit('updated', categoryData)
  } catch {}
}
</script>
