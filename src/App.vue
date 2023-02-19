<template>
  <div id="app" @contextmenu.prevent="onContextmenu">
    <TopBar :state="state" @change="changeState" />
    <div class="main-content">
      <splitpanes class="split-panes" @resize="resize">
        <pane :size="percent">
          <AspectTable
            ref="aspectTable"
            :data="goalTable"
            @save="saveData"
            @scroll="handleLeftScroll"
            :state="state"
            :hasAni="ani"
        /></pane>
        <pane :size="100 - percent">
          <MainTable
            ref="mainTable"
            :data="goalTable"
            :hasAni="ani"
            :hasAni2="ani2"
            :showHours="showHours"
            @save="saveData"
            @scroll="handleRightScroll"
            @state="handleDepthChange"
            @showHours="handleShowHours"
            @dragTaskStart="dragTaskStart"
        /></pane>
      </splitpanes>
      <HoursPanel
        ref="hoursPanel"
        :day="tempDay"
        :data="tempInfo"
        :show="showHours"
        @hide="handleHideHours"
        :dragTaskInfo="dragTaskInfo"
        :isDragBlockMove="isDragBlockMove"
        :dragOverConfig="dragOverConfig"
        @moveAreaChange="moveAreaChange"
        @changeTaskInfo="changeTaskInfo"
      />
    </div>
    <BottomBar
      @clear="clearData"
      @switchAni="switchAni"
      :ani="ani"
      :ani2="ani2"
    />
  </div>
</template>

<script>
import { Splitpanes, Pane } from "splitpanes";
import { Notification } from "element-ui";
import AspectTable from "./components/AspectTable.vue";
import MainTable from "./components/MainTable.vue";
import HoursPanel from "./components/HoursPanel.vue";
import BottomBar from "./components/BottomBar.vue";
import TopBar from "./components/TopBar.vue";
import { dragTaskMixin } from "@/utils/dragTaskMixin";
export default {
  name: "App",
  mixins: [dragTaskMixin],
  components: {
    Splitpanes,
    Pane,
    MainTable,
    BottomBar,
    TopBar,
    AspectTable,
    HoursPanel,
  },
  data() {
    return {
      storageKey: "anyPlanUserData_1",
      state: 0,
      percent: 100,
      goalTable: {
        initialTimeStamp: 536428800000,
        state: 0,
        aspect: [],
        goalTree: [],
        hoursInfo: {},
      },
      showHours: false,
      ani: true,
      ani2: false,
      tempDay: 0,
      tempInfo: {},
    };
  },
  methods: {
    handleHideHours() {
      this.showHours = false;
    },
    handleShowHours(e) {
      this.tempDay = e;
      if (!this.$bus.goalTable.hoursInfo[e]) {
        this.$bus.goalTable.hoursInfo[e] = {
          hoursSpan: [7, 24],
          columns: [[], [], []],
        };
      }
      this.tempInfo = { ...this.$bus.goalTable.hoursInfo[e] };
      console.log(this.tempInfo);
      this.showHours = true;
    },
    resize() {
      this.$refs.mainTable.updateTableWidth();
    },
    getData() {
      this.goalTable = JSON.parse(
        window.localStorage.getItem(this.storageKey) ||
          JSON.stringify({
            initialTimeStamp: 536428800000,
            state: 0,
            aspect: [],
            goalTree: [],
            hoursInfo: [],
          })
      );
      this.$bus.goalTable = this.goalTable;
      this.$bus.$on("save", () => {
        console.log("已保存");
        window.localStorage.setItem(
          this.storageKey,
          JSON.stringify(this.$bus.goalTable)
        );
      });
      this.state = this.goalTable.state;
      if (this.state > 5) this.state = 5;
      this.changeState(this.state);
    },
    saveData(val, needTableUpdate = true) {
      this.$bus.goalTable = this.goalTable;
      window.localStorage.setItem(
        this.storageKey,
        JSON.stringify({ ...this.goalTable, state: this.state })
      );
      if (needTableUpdate) {
        this.$refs.aspectTable.$forceUpdate();
        if (val) this.$refs.mainTable.initBodyLine();
        this.$refs.mainTable.$forceUpdate();
      }
    },
    clearData() {
      this.goalTable = {
        initialTimeStamp: 536428800000,
        state: 0,
        aspect: [],
        goalTree: [],
        hoursInfo: [],
      };
      this.state = 0;
      this.saveData();
    },
    changeState(val) {
      switch (val) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
          this.percent = 100;
          break;
        case 5:
          if (this.state <= 5)
            setTimeout(() => {
              this.percent = 30;
              setTimeout(() => {
                this.$refs.mainTable.updateTableWidth();
              }, 250);
            }, 1050);
          setTimeout(() => {
            this.$refs.mainTable.changeState(5);
          }, 50);
          break;
        case 6:
          if (this.state <= 5)
            setTimeout(() => {
              this.percent = 30;
              setTimeout(() => {
                this.$refs.mainTable.updateTableWidth();
              }, 250);
            }, 1050);
          setTimeout(() => {
            this.$refs.mainTable.changeState(6);
          }, 50);
          break;
        case 7:
          if (this.state <= 5)
            setTimeout(() => {
              this.percent = 30;
              setTimeout(() => {
                this.$refs.mainTable.updateTableWidth();
              }, 250);
            }, 1050);
          setTimeout(() => {
            this.$refs.mainTable.changeState(6);
          }, 50);
          break;
        case 8:
          if (this.state <= 5)
            setTimeout(() => {
              this.percent = 30;
              setTimeout(() => {
                this.$refs.mainTable.updateTableWidth();
              }, 250);
            }, 1050);
          setTimeout(() => {
            this.$refs.mainTable.changeState(8);
          }, 50);
          break;
        case 9:
          if (this.state <= 5)
            setTimeout(() => {
              this.percent = 30;
              setTimeout(() => {
                this.$refs.mainTable.updateTableWidth();
              }, 250);
            }, 1050);
          setTimeout(() => {
            this.$refs.mainTable.changeState(9);
          }, 50);
          break;
        case 10:
          if (this.state <= 5)
            setTimeout(() => {
              this.percent = 30;
              setTimeout(() => {
                this.$refs.mainTable.updateTableWidth();
              }, 250);
            }, 1050);
          setTimeout(() => {
            this.$refs.mainTable.changeState(10);
          }, 50);
          break;
        case 11:
          if (this.state <= 5)
            setTimeout(() => {
              this.percent = 30;
              setTimeout(() => {
                this.$refs.mainTable.updateTableWidth();
              }, 250);
            }, 1050);
          setTimeout(() => {
            this.$refs.mainTable.changeState(11);
          }, 50);
          break;

        default:
          break;
      }
      this.state = val;
      this.saveData(false, false);
    },
    switchAni(val = 1) {
      switch (val) {
        case 1:
          this.ani = !this.ani;
          Notification.success({
            title: "成功",
            message: this.ani ? "打开动画成功" : "关闭动画成功",
            showClose: false,
            duration: 2500,
          });
          break;
        case 2:
          this.ani2 = !this.ani2;
          Notification.success({
            title: "成功",
            message: this.ani
              ? "成功切换到全部单元格动画"
              : "成功切换到部分单元格动画",
            showClose: false,
            duration: 2500,
          });
          break;

        default:
          break;
      }
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
    // handleLeftInput(val) {
    //   this.$refs.mainTable.canInput = val;
    // },
    // handleRightInput(val) {
    //   this.$refs.aspectTable.canInput = val;
    // },
    handleLeftScroll(val) {
      this.$refs.mainTable.updateScroll(val);
    },
    handleRightScroll(val) {
      this.$refs.aspectTable.updateScroll(val);
    },
    handleDepthChange(val) {
      if (val <= 6) {
        val--;
      }
      this.state = 13 - val;
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
  height: 100%;
}
.main-content {
  position: relative;
  height: calc(100vh - 90px);
}
</style>
<style>
body {
  overflow-x: hidden;
}
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
.splitpanes__splitter {
  background-color: #555;
  position: relative;
}
.splitpanes__splitter:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  transition: opacity 0.4s;
  opacity: 0;
  z-index: 1;
}
.splitpanes__splitter:hover:before {
  opacity: 1;
}
.splitpanes--vertical > .splitpanes__splitter:before {
  left: -10px;
  right: -10px;
  height: 100%;
}
.splitpanes--horizontal > .splitpanes__splitter:before {
  top: -10px;
  bottom: -10px;
  width: 100%;
}
/* .splitpanes--vertical .splitpanes__pane {
  transition: width 1.5s ease-in !important;
} */
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