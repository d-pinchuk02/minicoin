<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
import localizeFilter from "@/filters/localize.filter"
import { Doughnut } from "vue-chartjs"

export default {
  name: "HistoryChart",
  extends: Doughnut,
  props: {
	categories: {
	  required: true,
	  type: Array
	},
	records: {
	  required: true,
	  type: Array
	},
  },
  mounted() {
      this.renderChart(
        {
          labels: this.categories.map(c => c.title),
          datasets: [
            {
              label: localizeFilter("history.chartTitle"),
              data: this.categories.map(c => {
                return this.records.reduce((total, r) => {
                  if (r.categoryId === c.id) {
                    total += +r.amount;
                  }

                  return total;
                }, 0);
              }),
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(64, 255, 159, 1)",
                "rgba(64, 67, 255, 1)",
                "rgba(252, 64, 255, 1)",
                "rgba(128, 128, 128, 1)",
                "rgba(229, 62, 26, 1)",
                "rgba(62, 62, 26, 1)"
              ],
              backgroundColor: [
                "rgba(255, 99, 132, 0.9)",
                "rgba(54, 162, 235, 0.9)",
                "rgba(255, 206, 86, 0.9)",
                "rgba(75, 192, 192, 0.9)",
                "rgba(153, 102, 255, 0.9)",
                "rgba(255, 159, 64, 0.9)",
                "rgba(64, 255, 159, 0.9)",
                "rgba(64, 67, 255, 0.9)",
                "rgba(252, 64, 255, 0.9)",
                "rgba(128, 128, 128, 0.9)",
                "rgba(229, 62, 26, 0.9)",
                "rgba(62, 62, 26, 0.9)"
              ],
              borderWidth: 2
            }
          ]
        },
        {}
      );
  },
  
}
</script>

<style scoped>
canvas {
  max-width: 600px;
  margin: 0 auto;
}
</style>