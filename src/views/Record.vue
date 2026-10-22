<template>
  <div>
    <h1>{{ localizeFilter('newrecord.title') }}</h1>

    <v-divider class="mb-4"></v-divider>

    <Loader v-if="loading" />
    <v-alert v-else-if="!categories.length" type="info">
      {{ localizeFilter('shared.noCategories') }}
      <router-link class="text-white" to="/categories">{{
        localizeFilter('shared.addCategory')
      }}</router-link>
    </v-alert>

    <v-row v-else>
      <v-col cols="12" sm="6">
        <v-form v-model="isValid" ref="form" @submit.prevent="submitHandler">
          <v-select
            :items="categories"
            :label="localizeFilter('shared.selectCategory')"
            name="category"
            prepend-icon="mdi-shape"
            item-title="title"
            item-value="id"
            v-model="category"
            required
          ></v-select>

          <v-label for="type">
            <v-icon>mdi-plus-minus-variant</v-icon>
            {{ localizeFilter('newrecord.type') }}
          </v-label>
          <v-radio-group class="ml-8" name="type" v-model="type" required>
            <v-radio
              color="green"
              value="income"
              :label="localizeFilter('shared.income')"
            ></v-radio>
            <v-radio
              color="red"
              value="expense"
              :label="localizeFilter('shared.expense')"
            ></v-radio>
          </v-radio-group>

          <v-text-field
            :label="localizeFilter('shared.amount')"
            :rules="amountRules"
            name="amount"
            prepend-icon="mdi-cash-multiple"
            type="number"
            v-model.number="amount"
            required
          ></v-text-field>

          <v-text-field
            :label="localizeFilter('shared.description')"
            :rules="descriptionRules"
            name="description"
            prepend-icon="mdi-text"
            type="name"
            v-model.trim="description"
            required
          ></v-text-field>

          <v-btn color="success" type="submit" :disabled="!isValid">
            <v-icon start>mdi-plus</v-icon>
            {{ localizeFilter('shared.create') }}
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import localizeFilter from '@/filters/localize.filter'
import Loader from '@/components/app/Loader.vue'
import { useMessage } from '@/composables/useMessage'

const store = useStore()
const { success, error } = useMessage()
const form = ref(null)
const categories = ref([])
const loading = ref(true)
const isValid = ref(false)
const category = ref(null)
const type = ref('expense')
const amount = ref(1)
const description = ref('')
const info = computed(() => store.getters.info)
const canCreateRecord = computed(
  () => type.value === 'income' || info.value.bill >= amount.value,
)
const amountRules = [
  (v) => (v && +v >= 1) || localizeFilter('shared.errors.minValue') + ': ' + 1,
]

const descriptionRules = [
  (v) => !!v || localizeFilter('newrecord.error.enterDescription'),
  (v) =>
    (v && v.length >= 2) ||
    localizeFilter('shared.errors.minLength') + ': ' + 2,
]

onMounted(async () => {
  categories.value = await store.dispatch('fetchCategories')
  loading.value = false
  if (categories.value.length) {
    category.value = categories.value[0].id
    await nextTick()
    await form.value.validate()
  }
})

async function submitHandler() {
  const { valid } = await form.value.validate()
  if (!valid) return
  if (!canCreateRecord.value) {
    error(
      `${localizeFilter('msg.insufficientMoney')} (${amount.value - info.value.bill})`,
    )
    return
  }
  try {
    await store.dispatch('createRecord', {
      categoryId: category.value,
      amount: amount.value,
      description: description.value,
      type: type.value,
      date: new Date().toJSON(),
    })
    const bill =
      type.value === 'income'
        ? +info.value.bill + +amount.value
        : +info.value.bill - +amount.value
    await store.dispatch('updateInfo', { bill })
    success(localizeFilter('msg.recordCreated'))
    form.value.reset()
    amount.value = 1
    description.value = ''
    category.value = categories.value[0].id
    type.value = 'expense'
    await nextTick()
    await form.value.validate()
  } catch {}
}
</script>
