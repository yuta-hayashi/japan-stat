<template>
  <label class="checkButton">
    <input
      type="checkbox"
      :id="prefecture.prefCode"
      :value="prefecture.prefCode"
      v-model="isCheck"
      @change="emit"
    />
    {{ prefecture.prefName }}
  </label>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    prefecture: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      isCheck: false
    };
  },
  methods: {
    emit() {
      this.$emit("check", {
        prefCode: this.prefecture.prefCode,
        isCheck: this.isCheck
      });
    }
  }
};
</script>

<style scoped>
.checkButton {
  width: 6em;
  margin-bottom: 0.2em;
}
</style>
