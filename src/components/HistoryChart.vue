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
                "rgba(244, 67, 54, 1)",
                "rgba(233, 30, 99, 1)",
                "rgba(156, 39, 176, 1)",
                "rgba(103, 58, 183, 1)",
                "rgba(63, 81, 181, 1)",
                "rgba(33, 150, 243, 1)",
                "rgba(3, 169, 244, 1)",
                "rgba(0, 188, 212, 1)",
                "rgba(0, 150, 136, 1)",
                "rgba(76, 175, 80, 1)",
                "rgba(139, 195, 74, 1)",
                "rgba(205, 220, 57, 1)",
                "rgba(255, 235, 59, 1)",
                "rgba(255, 193, 7, 1)",
                "rgba(255, 152, 0, 1)",
                "rgba(255, 87, 34, 1)",
                "rgba(121, 85, 72, 1)",
                "rgba(96, 125, 139, 1)",
              ],
              backgroundColor: [
                "rgba(244, 67, 54, 0.9)",
                "rgba(233, 30, 99, 0.9)",
                "rgba(156, 39, 176, 0.9)",
                "rgba(103, 58, 183, 0.9)",
                "rgba(63, 81, 181, 0.9)",
                "rgba(33, 150, 243, 0.9)",
                "rgba(3, 169, 244, 0.9)",
                "rgba(0, 188, 212, 0.9)",
                "rgba(0, 150, 136, 0.9)",
                "rgba(76, 175, 80, 0.9)",
                "rgba(139, 195, 74, 0.9)",
                "rgba(205, 220, 57, 0.9)",
                "rgba(255, 235, 59, 0.9)",
                "rgba(255, 193, 7, 0.9)",
                "rgba(255, 152, 0, 0.9)",
                "rgba(255, 87, 34, 0.9)",
                "rgba(121, 85, 72, 0.9)",
                "rgba(96, 125, 139, 0.9)",
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