import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
const APIKey = "C8eBr9e61aQqZW4zeEzlWtn0plZYvqDqzrM9EyV5";

export default new Vuex.Store({
  state: {
    prefectures: []
  },
  mutations: {
    setPrefectures(state, prefectures) {
      state.prefectures = prefectures;
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
    }
  },
  modules: {}
});
