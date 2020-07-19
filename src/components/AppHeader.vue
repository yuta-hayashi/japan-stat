<template>
  <div>
    <a
      class="appHeader_link"
      href="https://github.com/yuta-hayashi/japan-stat"
      target="_blank"
      rel="noopener noreferrer"
    >GitHub</a>
    <h1 class="appHeader">
      <slot></slot>
    </h1>
    <Loading v-show="isLoading" class="appHeader_loading" />
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
.appHeader {
  background: var(--primary);
  color: #ffffff;
  margin: 0;
  text-align: center;
  font-weight: normal;
  padding: 0.2em;
}
.appHeader_link {
  position: absolute;
  left: -1.5em;
  top: 0.5em;
  padding: 0.2em 1.2em;
  font-size: 0.9em;
  background: #24292e;
  color: #ffffff;
  transform: rotate(-45deg);
}
.appHeader_loading {
  position: absolute;
  top: 1em;
  right: 1em;
}
</style>
