<template>
  <div>
    <h1 id="appHeader"><slot></slot></h1>
  </div>
</template>

<script>
export default {
  name: "AppHeader"
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
</style>
