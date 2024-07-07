<template>
  <div>
    <h1>{{'categories.title' | localize}}</h1>

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
        <v-alert v-else type="info">{{'shared.noCategories' | localize}}</v-alert>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate.vue'
import CategoryEdit from '@/components/CategoryEdit.vue'

export default {
  name: 'categories',
  metaInfo() {
    return {
      title: this.$title('categories.title')
    }
  },
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  components: {
    CategoryCreate, CategoryEdit
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    },
    updateCategories(category) {
      const idx = this.categories.findIndex(c => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount++
    }
  }
}
</script>
