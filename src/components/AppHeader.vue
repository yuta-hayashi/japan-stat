<template>
  <div>
    <h1 id="appHeader"><slot></slot></h1>
    <Loading v-show="isLoading" id="appHeader_loading" />
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
export default {
  name: "AppHeader",
  components: { Loading },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  }
};
</script>

<style scoped>
#appHeader {
  background: var(--primary);
  color: #ffffff;
  margin: 0;
  text-align: center;
  font-weight: normal;
  padding: 0.2em;
}
#appHeader_loading {
  position: absolute;
  top: 1em;
  right: 1em;
}
</style>
