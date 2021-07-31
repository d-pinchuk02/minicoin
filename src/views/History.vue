<template>
  <div>
    <h1>{{ "history.title" | localize }}</h1>
    <v-divider class="mb-4"></v-divider>
    <Loader v-if="loading" />
    <v-alert v-else-if="!records.length" type="info">
      {{ "shared.noRecords" | localize }}
      <router-link class="white--text" to="/record">{{ "shared.addRecord" | localize }}</router-link>
    </v-alert>
    <section v-else>
      <v-row>
		<v-col col="12">
		  <h2>{{ "shared.outcomes" | localize }}</h2>
		  <HistoryChart :categories="categories" :records="expensesRecords" />
		</v-col>
      </v-row>
      <v-row>
        <v-col col="12">
          <h2>{{ "shared.transactions" | localize }}</h2>
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
import HistoryTable from "@/components/HistoryTable";
import HistoryChart from "@/components/HistoryChart";

export default {
  name: "history",
  metaInfo() {
    return {
      title: this.$title("history.title")
    };
  },
  data: () => ({
    loading: true,
    records: [],
    categories: [],
    items: [],
    expensesRecords: [],
    
  }),
  async mounted() {
    this.records = await this.$store.dispatch("fetchRecords");
    this.categories = await this.$store.dispatch("fetchCategories");

    this.setup(this.categories);
    this.loading = false;
  },
  methods: {
    setup(categories) {
      this.items = this.records.map(record => {
        return {
          ...record,
          categoryName: categories.find(c => c.id === record.categoryId).title,
          typeClass: record.type === "income" ? "green" : "red",
          typeText:
            record.type === "income"
              ? localizeFilter("shared.income")
              : localizeFilter("shared.outcome")
        };
      }).reverse();
      
      this.expensesRecords = this.records.filter(r => r.type === "outcome" );
    },
  },
  components: {
    HistoryTable,
    HistoryChart,
  }
};
</script>	
