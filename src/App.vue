<template>
  <div id="app">
    <AppHeader>都道府県別の人口</AppHeader>
    <div class="content">
      <SubTitle>都道府県</SubTitle>
      <div class="prefList">
        <CheckButton
          v-for="prefecture in prefectures"
          :prefecture="prefecture"
          :key="prefecture.prefCode"
          @check="check($event)"
          class="checkButton"
        />
      </div>
      <LineChart :chartData="chartData" />
    </div>
    <ErrorMessage />
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import SubTitle from "@/components/SubTitle.vue";
import CheckButton from "@/components/CheckButton.vue";
import LineChart from "@/components/LineChart.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    SubTitle,
    CheckButton,
    LineChart,
    ErrorMessage
  },
  methods: {
    check(eventArgs) {
      if (eventArgs.isCheck) {
        this.$store.dispatch("getData", eventArgs.prefCode);
      } else {
        this.$store.dispatch("deletePref", eventArgs.prefCode);
      }
    }
  },
  mounted() {
    this.$store.dispatch("getPrefectures");
  },
  computed: {
    prefectures() {
      return this.$store.state.prefectures;
    },
    chartData() {
      const chartData = {
        labels: this.$store.state.labels,
        datasets: this.$store.state.datasets
      };
      return chartData;
    }
  }
};
</script>

<style>
body {
  margin: 0;
  --primary: #3f51b5;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}

.prefList {
  display: flex;
  flex-wrap: wrap;
  margin: 2em 0;
}
.checkButton {
  margin-bottom: 0.3em;
}

.content {
  margin: 0 1em;
}
</style>
