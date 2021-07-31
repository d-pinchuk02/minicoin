<template>
  <div>
    <h1>
      <v-btn
        icon
        large
        color="primary"
        :to="'/history'"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      {{'detailrecord.title' | localize}}
    </h1>
    <v-divider class="mb-4"></v-divider>

    <Loader v-if="loading" />
    <v-col v-else-if="record" cols="12" xs="12" sm="6" md="6">
      <v-card
        outlined
      >
        <v-card-title>
          {{record.amount | currency}}
          <v-chip
            class="ml-4"
            :color="record.typeColor"
            label
            text-color="white"
          >
            <v-icon left>{{record.typeIcon}}</v-icon>
            {{record.typeText}}
          </v-chip>
        </v-card-title>
        <v-card-subtitle>{{record.date | date('datetime')}}</v-card-subtitle>
        <v-card-text>
          <v-chip
            color="primary"
            label
            text-color="white"
          >
            <v-icon left>mdi-shape</v-icon>
            {{record.categoryName}}
          </v-chip>
          <br/>
          <br/>
          {{record.description}}
        </v-card-text>
      </v-card>
    </v-col>
    <v-alert v-else type="error">
      {{'detailrecord.noRecord' | localize}}
    </v-alert>
  </div>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'detailrecord',
  metaInfo() {
    return {
      title: this.$title('detailrecord.title')
    }
  },
  data: () => ({
    record: null, 
    loading: true
  }),
  async mounted() {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)

    let typeText = record.type === 'income'
              ? localizeFilter('shared.income')
              : localizeFilter('shared.outcome')
    let typeIcon = record.type === 'income'
              ? 'mdi-plus'
              : 'mdi-minus'
    let typeColor = record.type === 'income'
              ? 'green'
              : 'red'

    this.record = {
      ...record,
      categoryName: category.title,
      typeText,
      typeIcon,
      typeColor
    }

    this.loading = false
  },
  methods: {
    localizeFilter(key) {
      return localizeFilter(key)
    }
  }
}
</script>
