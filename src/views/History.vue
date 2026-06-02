<template>
  <div>
    <h1>{{ localizeFilter('history.title') }}</h1>
    <v-divider class="mb-4"></v-divider>
    <Loader v-if="loading" />
    <v-alert v-else-if="!records.length" type="info">
      {{ localizeFilter('shared.noRecords') }}
      <router-link class="white--text" to="/record">{{ localizeFilter('shared.addRecord') }}</router-link>
    </v-alert>
    <section v-else>
      <v-row>
		<v-col col="6">
		  <h2>{{ localizeFilter('shared.expenses') }}</h2>
		  <HistoryChart :categories="categories" :records="expensesRecords" />
		</v-col>
		<v-divider vertical></v-divider>
		<v-col col="6">
		  <h2>{{ localizeFilter('shared.incomes') }}</h2>
		  <HistoryChart :categories="categories" :records="incomeRecords" />
		</v-col>
      </v-row>
      <v-row>
        <v-col col="12">
          <h2>{{ localizeFilter('shared.transactions') }}</h2>
          <HistoryTable
            class="mt-2"
            :records="items"
          />
        </v-col>
      </v-row>
      <div class="my-16"></div>
    </section>
  </div>
</template>

<script>
import localizeFilter from "@/filters/localize.filter";
import HistoryTable from "@/components/HistoryTable.vue";
import HistoryChart from "@/components/HistoryChart.vue";

export default {
  name: "history",
  data: () => ({
    loading: true,
    records: [],
    categories: [],
    items: [],
    expensesRecords: [],
    incomeRecords: [],
    
  }),
  async mounted() {
    this.records = await this.$store.dispatch("fetchRecords");
    this.categories = await this.$store.dispatch("fetchCategories");

    this.setup(this.categories);
    this.loading = false;
  },
  methods: {
    localizeFilter,
    setup(categories) {
      this.items = this.records.map(record => {
        return {
          ...record,
          categoryName: categories.find(c => c.id === record.categoryId).title,
          typeClass: record.type === "income" ? "green" : "red",
          typeText:
            record.type === "income"
              ? localizeFilter("shared.income")
              : localizeFilter("shared.expense")
        };
      }).reverse();
      
      this.expensesRecords = this.records.filter(r => r.type === "expense" );
      this.incomeRecords = this.records.filter(r => r.type === "income" );
    },
  },
  components: {
    HistoryTable,
    HistoryChart,
  }
};
</script>	
