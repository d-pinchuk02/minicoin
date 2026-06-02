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
        item-text="title"
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
        <v-icon left>mdi-pencil</v-icon>
        {{ localizeFilter('shared.update') }}
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import localizeFilter from "@/filters/localize.filter";

export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    title: "",
    limit: 1,
    current: null,
    titleRules: [v => !!v || localizeFilter("categoryedit.error.enterTitle")],
    limitRules: [
      v => (v && +v >= 1) || localizeFilter("shared.errors.minValue") + ": " + 1
    ]
  }),
  watch: {
    current(catId) {
      const { title, limit } = this.categories.find(c => c.id === catId);
      this.title = title;
      this.limit = limit;
    }
  },
  created() {
    const { id, title, limit } = this.categories[0];
    (this.current = id), (this.title = title);
    this.limit = limit;
  },
  methods: {
    localizeFilter,
    async submitHandler() {
      this.$refs.form.validate();

      if (!this.isValid) {
        return;
      }

      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        };
        await this.$store.dispatch("updateCategory", categoryData);
        this.$success(localizeFilter("msg.categoryUpdated"));
        this.$emit("updated", categoryData);
      } catch (e) {}
    }
  }
};
</script>
