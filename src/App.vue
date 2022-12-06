<template>
  <div id="app">
    <MainTable />
    <BottomBar />
  </div>
</template>

<script>
import MainTable from "./components/MainTable.vue";
import BottomBar from "./components/BottomBar.vue";

export default {
  name: "App",
  components: {
    MainTable,
    BottomBar,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #cccccc;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
}
</style>
