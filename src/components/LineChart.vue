<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    "css-classes": {
      default: "chart-container"
    }
  },
  data() {
    return {
      options: {
        title: {
          display: true,
          text: ""
        },
        legend: {
          position: "right"
        },
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "年度"
              }
            }
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "人口数"
              },
              ticks: {
                callback: function(label) {
                  return label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
              }
            }
          ]
        },
        maintainAspectRatio: false
      }
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
</script>

<style>
.chart-container {
  position: relative;
  min-height: 50vh;
}
</style>
