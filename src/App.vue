<template>
  <div id="app" @contextmenu.prevent="onContextmenu">
    <splitpanes class="split-panes" @resize="resize">
      <pane size="30">
        <AspectTable
          ref="aspectTable"
          :data="goalTable"
          @save="saveData"
          @input="handleLeftInput"
          @scroll="handleLeftScroll"
      /></pane>
      <pane size="70">
        <MainTable
          ref="mainTable"
          :data="goalTable"
          @save="saveData"
          @input="handleRightInput"
          @scroll="handleRightScroll"
      /></pane>
    </splitpanes>
    <BottomBar @clear="clearData" />
  </div>
</template>

<script>
import { Splitpanes, Pane } from "splitpanes";
import AspectTable from "./components/AspectTable.vue";
import MainTable from "./components/MainTable.vue";
import BottomBar from "./components/BottomBar.vue";
export default {
  name: "App",
  components: { Splitpanes, Pane, MainTable, BottomBar, AspectTable },
  data() {
    return {
      goalTable: {
        aspect: [],
        goalTree: [],
      },
    };
  },
  methods: {
    resize() {
      this.$refs.mainTable.updateTableWidth();
    },
    getData() {
      this.goalTable = JSON.parse(
        window.localStorage.getItem("anyPlanUserData_0") ||
          JSON.stringify({
            aspect: [],
            goalTree: [],
          })
      );
    },
    saveData(val) {
      window.localStorage.setItem(
        "anyPlanUserData_0",
        JSON.stringify(this.goalTable)
      );
      this.$refs.aspectTable.$forceUpdate();
      if (val) this.$refs.mainTable.initBodyLine();
      this.$refs.mainTable.$forceUpdate();
    },
    clearData() {
      this.goalTable = {
        aspect: [],
        goalTree: [],
      };
      this.saveData();
    },
    onContextmenu(event) {
      this.$contextmenu({
        items: [
          {
            label: "返回(B)",
            onClick: () => {
              this.message = "返回(B)";
              console.log("返回(B)");
            },
          },
          { label: "前进(F)", disabled: true },
          { label: "重新加载(R)", divided: true, icon: "el-icon-refresh" },
          { label: "另存为(A)..." },
          { label: "打印(P)...", icon: "el-icon-printer" },
          { label: "投射(C)...", divided: true },
          {
            label: "使用网页翻译(T)",
            divided: true,
            minWidth: 0,
            children: [
              { label: "翻译成简体中文" },
              { label: "翻译成繁体中文" },
            ],
          },
          {
            label: "截取网页(R)",
            minWidth: 0,
            children: [
              {
                label: "截取可视化区域",
                onClick: () => {
                  this.message = "截取可视化区域";
                  console.log("截取可视化区域");
                },
              },
              { label: "截取全屏" },
            ],
          },
          { label: "查看网页源代码(V)", icon: "el-icon-view" },
          { label: "检查(N)" },
        ],
        event, // 鼠标事件信息
        customClass: "custom-class", // 自定义菜单 class
        zIndex: 3, // 菜单样式 z-index
        minWidth: 230, // 主菜单最小宽度
      });
      return false;
    },
    handleLeftInput(val) {
      this.$refs.mainTable.canInput = val;
    },
    handleRightInput(val) {
      this.$refs.aspectTable.canInput = val;
    },
    handleLeftScroll(val) {
      this.$refs.mainTable.updateScroll(val);
    },
    handleRightScroll(val) {
      this.$refs.aspectTable.updateScroll(val);
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style scoped>
.split-panes {
  position: relative;
  height: calc(100vh - 40px);
}
</style>
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
.cursor {
  cursor: pointer;
}
.splitpanes--vertical > .splitpanes__splitter {
  position: relative;
  min-width: 6px !important;
  background-color: white;
}
.splitpanes--vertical > .splitpanes__splitter:before {
  margin-left: -2px;
}
.splitpanes--vertical > .splitpanes__splitter:before,
.splitpanes--vertical > .splitpanes__splitter:after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: #00000026;
  transition: background-color 0.3s;
  transform: translateY(-50%);
  width: 1px;
  height: 30px;
}

.el-button + .el-button {
  margin-left: 20px !important;
}
.el-dialog {
  --el-dialog-title-font-size: 36px !important;
  --el-dialog-font-line-height: unset !important;
  display: flex;
  display: -ms-flex;
  flex-direction: column;
  -ms-flex-direction: column;
  margin: 0 !important;
  padding: 0 30px !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: calc(100% - 30px);
  max-width: calc(100% - 30px);
  width: max-content !important;
  border-radius: 8px !important;
}

.el-dialog .el-dialog__body {
  max-height: 100%;
  flex: 1;
  -ms-flex: 1 1 auto;
  overflow-y: auto;
  overflow-x: hidden;
  text-align: center;
}
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-thumb {
  cursor: pointer;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.25);
  transition: color 0.2s ease;
}
.aspect-body-wrapper::-webkit-scrollbar-track,
.aspect-body-wrapper::-webkit-scrollbar,
.aspect-body-wrapper::-webkit-scrollbar-thumb {
  display: none;
}
</style>