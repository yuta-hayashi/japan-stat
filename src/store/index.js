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
    datasets: [],
    apiCache: {},
    isLoading: false,
    isFaild: false
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
    deleteDataSets(state, target) {
      state.datasets.splice(target, 1);
    },
    setApiCache(state, dataSets) {
      state.apiCache[dataSets.prefCode] = dataSets;
    },
    toggleIsLoading(state) {
      state.isLoading = !state.isLoading;
    },
    showError(state) {
      state.isFaild = true;
      state.isLoading = false;
      setTimeout(() => {
        state.isFaild = false;
      }, 2700);
    }
  },
  actions: {
    async getPrefectures(ctx) {
      ctx.commit("toggleIsLoading");
      const prefectures = await axios
        .get("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
          headers: { "X-API-KEY": APIKey }
        })
        .then(res => {
          return res.data.result;
        })
        .catch(err => {
          ctx.commit("showError");
          console.error(err);
        });
      ctx.commit("setPrefectures", prefectures);
      ctx.commit("toggleIsLoading");
    },
    async getData(ctx, prefCode) {
      //キャッシュが存在した場合はそれを使ってリクエストはしない
      if (ctx.state.apiCache[prefCode]) {
        ctx.commit("setDataSets", ctx.state.apiCache[prefCode]);
        return;
      }

      ctx.commit("toggleIsLoading");
      const rawData = await axios
        .get(
          `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`,
          {
            headers: { "X-API-KEY": APIKey }
          }
        )
        .then(res => {
          return res.data.result.data[0];
        })
        .catch(err => {
          ctx.commit("showError");
          console.error(err);
        });

      //APIレスポンスのlabelが"総人口"なので県名に直す
      rawData.label = ctx.state.prefectures[prefCode - 1].prefName;

      //横軸が定義されてない場合は生成する
      if (ctx.state.labels.length == 0) {
        const labels = rawData.data.map(point => {
          return point.year;
        });
        ctx.commit("setLabels", labels);
      }

      //chartjsの形式にデータ構造を変更
      rawData.data.forEach((point, index) => {
        point.x = index;
        point.y = point.value;
        delete point.year;
        delete point.value;
      });

      //chartjsのグラフの設定
      rawData.fill = false;
      const color = colorList[prefCode - 1];
      rawData.backgroundColor = color;
      rawData.borderColor = color;

      ctx.commit("setDataSets", rawData);

      // ApiCacheのIndex用にprefCodeを追加
      rawData.prefCode = prefCode;
      ctx.commit("setApiCache", rawData);
      ctx.commit("toggleIsLoading");
    },
    deletePref(ctx, prefCode) {
      const target = ctx.state.datasets.findIndex(pref => {
        pref.prefCode == prefCode;
      });
      ctx.commit("deleteDataSets", target);
    }
  },
  modules: {}
});
