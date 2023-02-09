<template>
  <div class="bottomBar">
    <span>你好 lidasheng</span>
    <span class="cursor" @click="$emit('clear')">清除数据</span>
    <span class="cursor" @click="$emit('switchAni')"
      >{{ ani ? "关闭" : "打开" }}动画</span
    ><span class="cursor" @click="$emit('switchAni', 2)"
      >{{ ani2 ? "切换到部分单元格动画" : "切换到全部单元格动画" }}动画</span
    >
    <span class="cursor">登出</span>
  </div>
</template>

<script>
export default {
  props: ["ani", "ani2"],
};
</script>

<style scoped>
.bottomBar {
  position: fixed;
  width: 100%;
  height: 40px;
  bottom: 0;
  left: 0;
  background-color: #1e1e1e;
  padding: 0 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.bottomBar span {
  color: #aaaaaa;
  margin-right: 20px;
  font-size: 17px;
}
</style>