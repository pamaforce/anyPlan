<template>
  <div class="topBar">
    <div
      v-for="(item, i) in stateList"
      :key="i"
      :class="'stateItem' + (state === i ? ' current' : '')"
      @click="changeState(i)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["state"],
  data() {
    return {
      stateList: [
        "三生",
        "业",
        "业→方",
        "方→向",
        "向",
        "生→期",
        "期→年",
        "年",
        "年→季",
        "季→月",
        "月→周",
        "周→日",
      ],
    };
  },
  methods: {
    changeState(val) {
      this.$emit("change", val);
    },
  },
};
</script>

<style scoped>
.topBar {
  width: 100%;
  height: 50px;
  background-color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
}
.stateItem {
  margin: 0 10px;
  height: 32px;
  line-height: 32px;
  background-color: #555;
  color: #aaa;
  padding: 0 10px;
  cursor: pointer;
  font-size: 20px;
}
.current {
  background-color: #000;
  color: #ddd;
}
</style>