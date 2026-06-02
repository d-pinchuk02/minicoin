<template>
  <div>
    <h2>{{ localizeFilter('categorycreate.title') }}</h2>

    <v-divider class="mb-4"></v-divider>

    <v-form v-model="isValid" ref="form" @submit.prevent="submitHandler">
      <v-text-field
        :label="localizeFilter('categorycreate.name')"
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
        <v-icon left>mdi-plus</v-icon>
        {{ localizeFilter('shared.create') }}
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import localizeFilter from "@/filters/localize.filter";

export default {
  data: () => ({
    title: "",
    limit: 1,
    isValid: false,
    titleRules: [
      v => !!v || localizeFilter("categorycreate.error.enterTitle"),
      v =>
        (v && v.length >= 2) ||
        localizeFilter("shared.errors.minLength") + ": " + 2
    ],
    limitRules: [
      v => (v && +v >= 1) || localizeFilter("shared.errors.minValue") + ": " + 1
    ]
  }),
  methods: {
    localizeFilter,
    async submitHandler() {
      this.$refs.form.validate();

      if (!this.isValid) {
        return;
      }

      try {
        const category = await this.$store.dispatch("createCategory", {
          title: this.title,
          limit: this.limit
        });
        this.$refs.form.reset();
        this.title = "";
        this.limit = 1;
        this.$success(localizeFilter("msg.categoryCreated"));

        this.$emit("created", category);
      } catch (e) {}
    }
  }
};
</script>
