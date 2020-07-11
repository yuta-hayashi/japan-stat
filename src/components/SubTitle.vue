<template>
  <h2 class="subTitle"><slot></slot></h2>
</template>

<script>
export default {
  name: "SubTitle"
};
</script>

<style scoped>
.subTitle {
  margin-bottom: 0;
  padding: 0.2em;
  font-weight: normal;
  display: inline-block;
  border: solid 2px #000;
}
</style>
