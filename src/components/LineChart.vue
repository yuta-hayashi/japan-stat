<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  data() {
    return {
      options: {
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
