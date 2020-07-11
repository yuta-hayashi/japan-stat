import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import colorList from "@/assets/colorList.json";

Vue.use(Vuex);
const APIKey = "C8eBr9e61aQqZW4zeEzlWtn0plZYvqDqzrM9EyV5";

export default new Vuex.Store({
  state: {
    prefectures: [],
    labels: [],
    datasets: []
  },
  mutations: {
    setPrefectures(state, prefectures) {
      state.prefectures = prefectures;
    },
    setLabels(state, labels) {
      state.labels = labels;
    },
    setDataSets(state, dataSets) {
      state.datasets.push(dataSets);
    },
    deleteDataSets(state, dataSets) {
      state.datasets = dataSets;
    }
  },
  actions: {
    getPrefectures(ctx) {
      axios
        .get("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
          headers: { "X-API-KEY": APIKey }
        })
        .then((res) => {
          console.log(res);
          ctx.commit("setPrefectures", res.data.result);
        });
    },
    async getData(ctx, prefCode) {
      const rawData = await axios
        .get(
          `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`,
          {
            headers: { "X-API-KEY": APIKey }
          }
        )
        .then((res) => {
          return res.data.result.data[0];
        });
      rawData.prefCode = prefCode;
      rawData.label = ctx.state.prefectures[prefCode - 1].prefName;
      if (ctx.state.labels.length == 0) {
        const labels = rawData.data.map((point) => point.year);
        ctx.commit("setLabels", labels);
      }
      rawData.data.forEach((point, index) => {
        point.x = index;
        point.y = point.value;
        delete point.year;
        delete point.value;
      });
      rawData.fill = false;
      // rawData.borderColor =
      //   "#" + Math.floor(Math.random() * 16777215).toString(16);
      //const color = `hsl(${(360 / 18) * prefCode},80%,60%)`;
      const color = colorList[prefCode - 1];
      rawData.backgroundColor = color;
      rawData.borderColor = color;
      ctx.commit("setDataSets", rawData);
    },
    deletePref(ctx, prefCode) {
      const newDataSets = ctx.state.datasets.filter(
        (pref) => pref.prefCode !== prefCode
      );
      ctx.commit("deleteDataSets", newDataSets);
    }
  },
  modules: {}
});
