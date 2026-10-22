<template>
  <div>
    <h1>{{ localizeFilter('categories.title') }}</h1>

    <v-divider class="mb-4"></v-divider>

    <Loader v-if="loading" />
    <v-row v-else>
      <v-col cols="12" md="6" xs="12" sm="12">
        <CategoryCreate @created="addNewCategory" />
      </v-col>
      <v-col cols="12" md="6" xs="12" sm="12">
        <CategoryEdit
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updateCount"
          @updated="updateCategories"
        />
        <v-alert v-else type="info">{{
          localizeFilter('shared.noCategories')
        }}</v-alert>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import localizeFilter from '@/filters/localize.filter'
import CategoryCreate from '@/components/CategoryCreate.vue'
import CategoryEdit from '@/components/CategoryEdit.vue'
import Loader from '@/components/app/Loader.vue'

const store = useStore()
const categories = ref([])
const loading = ref(true)
const updateCount = ref(0)

onMounted(async () => {
  categories.value = await store.dispatch('fetchCategories')
  loading.value = false
})

function addNewCategory(category) {
  categories.value.push(category)
}

function updateCategories(category) {
  const idx = categories.value.findIndex((c) => c.id === category.id)
  categories.value[idx].title = category.title
  categories.value[idx].limit = category.limit
  updateCount.value++
}
</script>
