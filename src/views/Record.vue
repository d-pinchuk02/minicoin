<template>
  <div>
    <h1>{{ localizeFilter('newrecord.title') }}</h1>

    <v-divider class="mb-4"></v-divider>

    <Loader v-if="loading" />
    <v-alert v-else-if="!categories.length" type="info">
      {{ localizeFilter('shared.noCategories') }}
      <router-link class="white--text" to="/categories">{{
        localizeFilter('shared.addCategory')
      }}</router-link>
    </v-alert>

    <v-col v-else cols="12" xs="12" sm="6">
      <v-form v-model="isValid" ref="form" @submit.prevent="submitHandler">
        <v-select
          :items="categories"
          :label="localizeFilter('shared.selectCategory')"
          name="category"
          prepend-icon="mdi-shape"
          item-text="title"
          item-value="id"
          v-model="category"
          required
        ></v-select>

        <v-label for="type">
          <v-icon>mdi-plus-minus-variant</v-icon>
          {{ localizeFilter('newrecord.type') }}
        </v-label>
        <v-radio-group class="ml-8" name="type" v-model="type" column required>
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
          <v-icon left>mdi-plus</v-icon>
          {{ localizeFilter('shared.create') }}
        </v-btn>
      </v-form>
    </v-col>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import localizeFilter from "@/filters/localize.filter";

export default {
  name: "newrecord",
  data: () => ({
    categories: [],
    loading: true,
    isValid: false,
    category: null,
    type: "expense",
    amount: 1,
    description: "",
    amountRules: [
      v => (v && +v >= 1) || localizeFilter("shared.errors.minValue") + ": " + 1
    ],
    descriptionRules: [
      v => !!v || localizeFilter("newrecord.error.enterDescription"),
      v =>
        (v && v.length >= 2) ||
        localizeFilter("shared.errors.minLength") + ": " + 2
    ]
  }),
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;

    if (this.categories.length) {
      this.category = this.categories[0].id;
      this.$refs.form.validate();
    }
  },
  computed: {
    ...mapGetters(["info"]),
    canCreateRecord() {
      if (this.type === "income") {
        return true;
      }

      return this.info.bill >= this.amount;
    }
  },
  methods: {
    localizeFilter,
    async submitHandler() {
      this.$refs.form.validate();

      if (!this.isValid) {
        return;
      }

      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch("createRecord", {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          });

          const bill =
            this.type === "income"
              ? +this.info.bill + +this.amount
              : +this.info.bill - +this.amount;

          await this.$store.dispatch("updateInfo", { bill });
          this.$success(localizeFilter("msg.recordCreated"));
          this.$refs.form.reset();

          this.amount = 1;
          this.description = "";
          this.category = this.categories[0].id;
          this.type = "expense";

          this.$refs.form.validate();
        } catch (e) {}
      } else {
        this.$error(
          `${localizeFilter("msg.insufficientMoney")} (${this.amount -
            this.info.bill})`
        );
      }
    }
  }
};
</script>
