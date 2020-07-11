<template>
  <div id="app">
    <AppHeader>都道府県の人口 </AppHeader>
    <SubTitle>都道府県</SubTitle>
    <CheckButton
      v-for="prefecture in prefectures"
      :prefecture="prefecture"
      :key="prefecture.prefCode"
      @check="check($event)"
    />
    <LineChart :chartData="null" />
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import SubTitle from "@/components/SubTitle.vue";
import CheckButton from "@/components/CheckButton.vue";
import LineChart from "@/components/LineChart.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    SubTitle,
    CheckButton,
    LineChart
  },
  data() {
    return {
      prefDummy: { prefCode: 1, prefName: "北海道" },
      isShow: 0
    };
  },
  methods: {
    check(eventArgs) {
      console.log(eventArgs);
    }
  },
  mounted() {
    this.$store.dispatch("getPrefectures");
  },
  computed: {
    prefectures() {
      return this.$store.state.prefectures;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
