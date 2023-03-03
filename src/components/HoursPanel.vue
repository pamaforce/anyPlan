<template>
  <div
    :class="'plan-panel-div' + (show ? ' plan-panel-div-show' : '')"
    ref="plan_panel_div"
    @click="planPanelClick"
  >
    <div class="plan-bar">
      <div class="plan-title">{{ title }}</div>
      <div class="plan-time-set">
        <input type="text" ref="hours_start" :value="this.clocks[0]" />
        <input type="text" ref="hours_end" :value="this.clocks[1]" />
        <span @click="setHours">确定</span>
      </div>
      <div class="plan-close">
        <a @click="closeHours">关闭</a>
      </div>
    </div>
    <div class="plan-panel-canvas" ref="canvas">
      <div
        class="plan-panel"
        :class="{ 'stop-pointer-events': isDragBlockMove || canSplitMove }"
        :style="{ height: `${totalHeight}px` }"
        ref="plan_panel_canvas"
        @mouseup="dragEnd"
        @mousemove="dragOver($event, 'level')"
      >
        <div class="time-tips">
          <template v-for="(clock, index) in clocks[1]">
            <div
              v-if="clock > clocks[0]"
              v-bind:key="clock"
              :id="'clock_' + index"
              class="clock-item"
            >
              <span class="clock-item-span">{{ index }}:00</span>
            </div>
          </template>
        </div>
        <div
          class="panel panel-level1"
          style="width: 12.5rem"
          ref="task_panel_level1"
          v-if="update"
        >
          <template v-for="(tab, index) in level1Tabs">
            <DragBlock
              :dragInfo="tab"
              :key="tab.id + '_' + tab.index"
              :index="index"
              :isActive="tab.id === activeId && tab.index === activeIndex"
              :limitSize="limitSize"
              @activeChange="activeChange"
              @stopClearActive="stopClearActive"
              @dragBlockRightClick="dragBlockRightClick"
              @changeTaskInfo="changeTaskInfo"
            ></DragBlock>
          </template>
        </div>
        <div
          class="panel panel-level2"
          style="width: 9.375rem"
          ref="task_panel_level2"
          v-if="update"
        >
          <template v-for="(tab, index) in level2Tabs">
            <DragBlock
              :dragInfo="tab"
              :key="tab.id + '_' + tab.index"
              :index="index"
              :isActive="tab.id === activeId && tab.index === activeIndex"
              :limitSize="limitSize"
              @activeChange="activeChange"
              @stopClearActive="stopClearActive"
              @dragBlockRightClick="dragBlockRightClick"
              @changeTaskInfo="changeTaskInfo"
            ></DragBlock>
          </template>
        </div>
        <div
          @mousedown.stop="level3MouseDown"
          @mousemove.stop="level3MouseMove"
          @mouseup.stop="level3MouseUp"
          class="panel panel-level3"
          ref="task_panel_level3"
          v-if="update"
        >
          <template v-for="(tab, index) in level3Tabs">
            <DragBlock
              :dragInfo="tab"
              :key="tab.id + '_' + tab.index"
              :index="index"
              :isActive="tab.id === activeId && tab.index === activeIndex"
              :limitSize="limitSize"
              @activeChange="activeChange"
              @stopClearActive="stopClearActive"
              @dragBlockRightClick="dragBlockRightClick"
              @changeTaskInfo="changeTaskInfo"
            ></DragBlock>
          </template>
          <div
            v-if="showLevel3MoveDiv === true"
            ref="level_3_move_container"
            class="level-3-move-container"
          >
            <span
              class="level-3-to-move-show-start"
              :style="{ left: curMoveData.left + 'px' }"
              >{{ curMoveData.startTime }}</span
            >
            <span>新建任务</span>
            <span
              class="level-3-to-move-show-end"
              :style="{ left: curMoveData.left + 'px' }"
              >{{ curMoveData.endTime }}</span
            >
          </div>
        </div>
        <div
          v-show="showRightMenu"
          class="right-click-container"
          ref="right_click_container"
        >
          <div @click="setTaskDone">
            {{ rightClickTab.hasDone ? "取消完成" : "完成" }}
          </div>
          <div @click="delTask">取消安排</div>
        </div>
      </div>
      <!-- 当前时间线 -->
      <div
        v-if="isCurDay"
        class="current-time-line"
        ref="current_time_line"
      ></div>
    </div>

    <!-- 两条分割线 -->
    <div
      ref="split_line_container1"
      class="split-line-container split-line-container1"
      :style="{ pointerEvents: isDragBlockMove ? 'none' : 'all' }"
      style="left: 16rem"
      @mousedown="splitMouseDown($event, 1)"
      @mouseup="canSplitMove = false"
    >
      <div
        class="split-line"
        :class="{ 'line-moveing': aplitLineOrder === 1 }"
      ></div>
    </div>
    <div
      ref="split_line_container2"
      class="split-line-container split-line-container2"
      :style="{ pointerEvents: isDragBlockMove ? 'none' : 'all' }"
      style="left: 25.375rem"
      @mousedown="splitMouseDown($event, 2)"
      @mouseup="canSplitMove = false"
    >
      <div
        class="split-line"
        :class="{ 'line-moveing': aplitLineOrder === 2 }"
      ></div>
    </div>

    <!-- 从days拖出来的dom -->
    <div class="to-move-show-div" id="to_move_dom" ref="to_move_dom">
      <span
        v-if="dragOverConfig.type !== 'body'"
        class="to-move-show-start"
        :style="{ left: dragOverConfig.timeLeft + 'px' }"
        >{{ dragOverConfig.startTime }}</span
      >
      <span>{{ dragTaskInfo.text }}</span>
      <span
        v-if="dragOverConfig.type !== 'body'"
        class="to-move-show-end"
        :style="{ left: dragOverConfig.timeLeft + 'px' }"
        >{{ dragOverConfig.endTime }}</span
      >
    </div>
  </div>
</template>

<script>
import DragBlock from "./dragBlock";
import { Notification } from "element-ui";

export default {
  name: "HoursPanel",
  props: {
    show: {
      type: Boolean,
      default: () => false,
    },
    day: {
      type: Number,
      default: () => -1,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    showMenu: {
      type: Boolean,
      default: () => false,
    },
    isDragBlockMove: {
      type: Boolean,
      default: () => false,
    },
    dragTaskInfo: {
      type: Object,
      default: () => ({}),
    },
    dragOverConfig: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    DragBlock,
  },
  data() {
    return {
      title: "",
      basePx: 1,
      totalHeight: 600, // 时间全域高度
      topHeight: 40, // 窗口距离画布的高度
      unitSize: 50, // 实际最小刻度
      limitSize: 30, // 最小时间限制
      clocks: [7, 24], // 时间全域

      level1Tabs: [],
      level2Tabs: [],
      level3Tabs: [],

      update: true,
      originIndex: 0, // hours栏时间重叠时恢复回原位置的下标
      showRightMenu: false, // 右键菜单的显示
      lastClocks: [7, 24], // 上一次时间域

      canSplitMove: false, // 分割线移动
      aplitLineOrder: 0, // 分割线编号
      level3Width: 150,
      level1Width: 200,

      showLevel3MoveDiv: false, // 计划外任务滑块的显示
      curMoveData: {}, // 计划外任务滑块的信息
      level3MoveTab: {}, // 当前移动的计划外的任务(子组件操作值)
      planPanelInfo: {}, // 三个等级容器的宽度信息

      setStartHour: "",
      setEndHour: "",

      activeId: "",
      activeIndex: "",
      isClearActive: true,

      rightClickTab: {},
      rightClickIndex: 0,

      isCurDay: false, // 是否当前日期的时间
    };
  },
  created() {
    this.changeUnitSize();
    this.updateBasePx();
  },
  watch: {
    day(val) {
      let day = new Date(this.$bus.goalTable.initialTimeStamp + val * 86400000);
      this.title = `${day.getFullYear()}-${
        day.getMonth() + 1
      }-${day.getDate()}`;
      let now = new Date();
      if (
        day.getFullYear() === now.getFullYear() &&
        day.getMonth() === now.getMonth() &&
        day.getDate() === now.getDate()
      ) {
        this.isCurDay = true;
      } else {
        this.isCurDay = false;
      }
    },
    data() {
      this.level1Tabs = this.data.columns[0];
      this.level2Tabs = this.data.columns[1];
      this.level3Tabs = this.data.columns[2];
      setTimeout(() => {
        this.$refs.hours_start.value = this.data.hoursSpan[0];
        this.$refs.hours_end.value = this.data.hoursSpan[1];
        this.setHours();
      }, 500);
    },
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        that.changeUnitSize();
        that.update = false;
        that.$nextTick(() => {
          that.update = true;
        });
      })();
    };
  },
  methods: {
    updateBasePx() {
      this.basePx = parseFloat(
        document.getElementsByTagName("html")[0].style.fontSize.split("px")[0]
      );
    },
    setHours() {
      let startTime = +this.$refs.hours_start.value;
      let endTime = +this.$refs.hours_end.value;
      if (startTime < endTime) {
        this.lastClocks = JSON.parse(JSON.stringify(this.clocks));
        this.clocks[0] = startTime < 0 ? 0 : startTime;
        this.clocks[1] = endTime > 24 ? 24 : endTime;
        this.changeUnitSize();
        if (this.isCurDay) {
          this.setCurTimeLine();
        }
        this.$bus.goalTable.hoursInfo[this.day].hoursSpan = [
          this.clocks[0],
          this.clocks[1],
        ];
        this.$bus.$emit("save");
      }
    },
    setCurTimeLine() {
      if (!this.$refs.plan_panel_div) {
        return;
      }
      let nowTime = new Date();
      let nowHour = nowTime.getHours();
      let nowMinutes = nowTime.getMinutes() / 60;
      let newHours = nowHour + nowMinutes - this.clocks[0];
      if (this.nowHour > this.clocks[1]) {
        newHours += this.clocks[1] - nowHour;
      } else if (this.nowHour < this.clocks[1]) {
        newHours -= nowHour;
      }
      if (this.$refs.current_time_line)
        this.$refs.current_time_line.style.top =
          (this.totalHeight * newHours) / (this.clocks[1] - this.clocks[0]) +
          "px";
    },
    closeHours() {
      this.$emit("hide");
    },
    dragOver(event, type) {
      event.preventDefault();
      event.stopPropagation();
      if (this.canSplitMove) {
        let splitDom1 = this.$refs.split_line_container1;
        let splitDom2 = this.$refs.split_line_container2;
        let level1Dom = this.$refs.task_panel_level1;
        let level2Dom = this.$refs.task_panel_level2;
        let level1Width =
          this.$refs.task_panel_level1.getBoundingClientRect().width;
        let level2Width =
          this.$refs.task_panel_level2.getBoundingClientRect().width;
        let level3Width =
          this.$refs.task_panel_level3.getBoundingClientRect().width;
        if (this.aplitLineOrder === 1) {
          let split1Left = event.offsetX;
          let leftLimt = (106 / 16) * this.basePx; // 56 + 50
          let rightLimt = (456 / 16) * this.basePx; // 500 + 56 - 50 * 2
          if (split1Left < leftLimt) split1Left = leftLimt;
          if (split1Left > rightLimt) split1Left = rightLimt;
          splitDom1.style.left = split1Left + "px";
          level1Dom.style.width = split1Left - (56 / 16) * this.basePx + "px";
          level2Dom.style.width =
            (556 / 16) * this.basePx - split1Left - level3Width + "px"; // 500 - (split1Left - 56) - level3Width
          splitDom2.style.left = (556 / 16) * this.basePx - level3Width + "px"; // 500 + 56 - level3Width
        }
        if (this.aplitLineOrder === 2) {
          let split1Left = event.offsetX;
          let leftLimt = (156 / 16) * this.basePx; // 56 + 50 + 50
          let rightLimt = (506 / 16) * this.basePx; // 500 + 56 - 50
          if (split1Left < leftLimt) split1Left = leftLimt;
          if (split1Left > rightLimt) split1Left = rightLimt;
          splitDom2.style.left = split1Left + "px";
          let newLevel2Width =
            split1Left - (56 / 16) * this.basePx - level1Width;
          newLevel2Width =
            newLevel2Width < (50 / 16) * this.basePx
              ? (50 / 16) * this.basePx
              : newLevel2Width;
          level2Dom.style.width = newLevel2Width + "px";
          if (newLevel2Width === (50 / 16) * this.basePx) {
            level1Dom.style.width =
              split1Left - (56 / 16) * this.basePx - level2Width + "px";
          }
          level1Width =
            this.$refs.task_panel_level1.getBoundingClientRect().width;
          splitDom1.style.left = level1Width + (56 / 16) * this.basePx + "px";
        }
      } else {
        let width = 0;
        let leftLimit1 = 0;
        let timeLeft = -56;
        if (this.dragTaskInfo.taskLevel === "level1") {
          width = this.$refs.task_panel_level1.getBoundingClientRect().width;
          leftLimit1 =
            this.$refs.task_panel_level1.getBoundingClientRect().left;
          timeLeft = -(56 / 16) * this.basePx;
        }
        if (this.dragTaskInfo.taskLevel === "level2") {
          width = this.$refs.task_panel_level2.getBoundingClientRect().width;
          leftLimit1 =
            this.$refs.task_panel_level2.getBoundingClientRect().left;
          timeLeft =
            -this.$refs.task_panel_level1.getBoundingClientRect().width -
            (56 / 16) * this.basePx;
        }
        let top =
          event.clientY -
          (this.topHeight / 16) * this.basePx -
          (50 / 16) * this.basePx -
          (this.unitSize / 32) * this.basePx +
          this.$refs.canvas.scrollTop;
        let toDaysConfig = {
          type,
          top,
          width,
          leftLimit1,
          timeLeft,
          height: (this.unitSize / 16) * this.basePx,
          event,
        };
        let containerHeight =
          this.$refs.plan_panel_canvas.getBoundingClientRect().height;
        this.chartToTime(toDaysConfig, containerHeight, this.clocks);
        this.$emit("moveAreaChange", toDaysConfig);
      }
    },
    dragEnd(event) {
      this.canSplitMove = false;
      this.$emit("moveAreaChange", { type: "hidden" });
      let top =
        event.clientY -
        (this.topHeight / 16) * this.basePx -
        (50 / 16) * this.basePx -
        (this.unitSize / 32) * this.basePx;
      if (top < 0) {
        top = 0;
      }
      let tab = {
        id: this.dragTaskInfo.taskId,
        index: this.dragTaskInfo.taskDay,
        text: this.dragTaskInfo.text,
        height: (this.unitSize / 16) * this.basePx,
        top: top,
        hasDone: false,
        type: this.dragTaskInfo.taskLevel,
        detail: this.dragTaskInfo,
      };
      let containerHeight =
        this.$refs.plan_panel_canvas.getBoundingClientRect().height;
      this.chartToTime(tab, containerHeight, this.clocks);
      let tabListKey = this.dragTaskInfo.taskLevel + "Tabs";
      if (
        this.isDragBlockMove &&
        this.limitOverlap(this[tabListKey], tab) === true
      ) {
        this[tabListKey].push(tab);
        this[tabListKey] = JSON.parse(JSON.stringify(this[tabListKey]));
        let changeTaskInfo = {
          detail: this.dragTaskInfo,
          type: "addPlan",
          hasDone: true,
        };
        this.$emit("changeTaskInfo", changeTaskInfo);
      }
    },
    changeTaskInfo(e) {
      this.$emit("changeTaskInfo", e);
    },
    activeChange(activeId, activeIndex) {
      this.activeId = activeId;
      this.activeIndex = activeIndex;
    },
    stopClearActive() {
      this.isClearActive = false;
    },
    getPlanPanelInfo() {
      if (this.$refs.task_panel_level1) {
        this.planPanelInfo.widthLevel1 =
          this.$refs.task_panel_level1.getBoundingClientRect().width;
        this.planPanelInfo.widthLevel2 =
          this.$refs.task_panel_level2.getBoundingClientRect().width;
        this.planPanelInfo.widthLevel3 =
          this.$refs.task_panel_level3.getBoundingClientRect().width;
      }
      if (this.$refs.task_panel_level1) {
        this.planPanelInfo.leftLevel1 =
          this.$refs.task_panel_level1.getBoundingClientRect().left;
        this.planPanelInfo.leftLevel2 =
          this.$refs.task_panel_level2.getBoundingClientRect().left;
        this.planPanelInfo.leftLevel3 =
          this.$refs.task_panel_level3.getBoundingClientRect().left;
      }
    },

    planPanelClick() {
      this.showRightMenu = false;
      if (this.isClearActive) {
        this.activeId = "";
      }
      this.isClearActive = true;
      this.aplitLineOrder = 0;
    },
    dragBlockRightClick(config) {
      this.showRightMenu = true;
      let rightDom = this.$refs.right_click_container;
      rightDom.style.top = config.event.clientY + "px";
      rightDom.style.left = config.event.clientX + "px";
      this.rightClickTab = config.dragInfo;
      this.rightClickIndex = config.index;
    },
    setTaskDone() {
      this.rightClickTab.hasDone = !this.rightClickTab.hasDone;
      let changeTaskInfo = {
        detail: this.rightClickTab.detail,
        type: "changeDone",
        hasDone: this.rightClickTab.hasDone,
      };
      this.$emit("changeTaskInfo", changeTaskInfo);
    },
    delTask() {
      this[this.rightClickTab.type + "Tabs"].splice(this.rightClickIndex, 1);
      let changeTaskInfo = {
        detail: this.rightClickTab.detail,
        type: "cancelPlan",
      };
      this.$emit("changeTaskInfo", changeTaskInfo);
    },
    splitMouseDown(event, lineOrder) {
      event.stopPropagation();
      event.preventDefault();
      this.canSplitMove = true;
      this.aplitLineOrder = lineOrder;
      this.level1Width =
        this.$refs.task_panel_level1.getBoundingClientRect().width;
      this.level3Width =
        this.$refs.task_panel_level3.getBoundingClientRect().width;
    },
    level3MouseDown(event) {
      // 长按添加临时任务
      this.showLevel3MoveDiv = "waitTime";
      setTimeout(() => {
        if (this.showLevel3MoveDiv === "waitTime") {
          this.showLevel3MoveDiv = true;
          this.$nextTick(() => {
            if (this.$refs.level_3_move_container) {
              let top =
                event.clientY -
                (this.topHeight * 16) / this.basePx -
                (50 / 16) * this.basePx;
              this.$refs.level_3_move_container.style.height =
                (this.unitSize / 16) * this.basePx + "px";
              this.$refs.level_3_move_container.style.top = top + "px";
              this.getPlanPanelInfo();
              this.curMoveData.left = -(
                this.planPanelInfo.widthLevel1 +
                this.planPanelInfo.widthLevel2 +
                56
              );
              this.curMoveData.top = top;
              this.curMoveData.height = (this.unitSize / 16) * this.basePx;
              let containerHeight =
                this.$refs.plan_panel_canvas.getBoundingClientRect().height;
              this.chartToTime(this.curMoveData, containerHeight, this.clocks);
              this.curMoveData = JSON.parse(JSON.stringify(this.curMoveData));
            }
          });
        }
      }, 300);
    },
    level3MouseMove(event) {
      if (this.$refs.level_3_move_container) {
        let top =
          event.clientY -
          (this.topHeight * 16) / this.basePx -
          (50 / 16) * this.basePx;
        this.$refs.level_3_move_container.style.height =
          (this.unitSize / 16) * this.basePx + "px";
        this.$refs.level_3_move_container.style.top = top + "px";
        this.curMoveData.top = top;
        this.curMoveData.height = (this.unitSize / 16) * this.basePx;

        let containerHeight =
          this.$refs.plan_panel_canvas.getBoundingClientRect().height;
        this.chartToTime(this.curMoveData, containerHeight, this.clocks);
      }
    },
    level3MouseUp(event) {
      let top =
        event.clientY -
        (this.topHeight * 16) / this.basePx -
        (50 / 16) * this.basePx;
      let tab = {
        id: Math.random().toFixed(6),
        text: "新建任务",
        height: (this.unitSize / 16) * this.basePx,
        top: top < 0 ? 0 : top,
        hasDone: false,
        type: "level3",
      };
      this.chartToTime(
        tab,
        event.target.parentNode.getBoundingClientRect().height,
        this.clocks
      );
      if (
        !this.level3MoveTab.id &&
        this.showLevel3MoveDiv === true &&
        this.limitOverlap(this.level3Tabs, tab) === true
      ) {
        this.level3Tabs.push(tab);
      }
      this.showLevel3MoveDiv = false;
    },
    // 子组件有用到
    limitOverlap(tabList, tab) {
      let curStartTime = Number(tab.startTime.replace(":", "."));
      let curEndTime = Number(tab.endTime.replace(":", "."));
      let timeOverlap = false;
      tabList.forEach((item) => {
        if (item.id !== tab.id) {
          let itemStartTime = Number(item.startTime.replace(":", "."));
          let itemEndTime = Number(item.endTime.replace(":", "."));
          if (
            (curStartTime < itemStartTime && curEndTime > itemStartTime) ||
            (curStartTime > itemStartTime && curStartTime < itemEndTime)
          ) {
            timeOverlap = true;
          }
        }
      });
      if (timeOverlap) {
        Notification.warning({
          title: "注意",
          message: "任务时间重叠！",
          showClose: false,
          duration: 2500,
        });
        return;
      }
      return true;
    },
    // 子组件有用到
    chartToTime(dragInfo, containerHeight, clocks) {
      let clockDiff = clocks[1] - clocks[0];
      let startTime = (dragInfo.top * clockDiff) / containerHeight;
      dragInfo.startTime = this.numToTime(startTime, clocks[0]);
      let endTime =
        ((dragInfo.height + dragInfo.top) * clockDiff) / containerHeight;
      dragInfo.endTime = this.numToTime(endTime, clocks[0]);
    },
    numToTime(time, initTime) {
      let time1 = Math.floor(time) + initTime;
      let time2 = ((time % 1) * 60).toFixed(0);
      if (time2.length === 1) time2 = "0" + time2;
      if (time2 == 60) {
        time2 = "00";
        time1 = time1 + 1;
      }
      return `${time1}:${time2}`;
    },
    // 时间域、屏幕高度改变
    changeUnitSize() {
      this.topHeight = 3.125 * this.basePx;
      this.totalHeight =
        document.documentElement.clientHeight - 8.125 * this.basePx;
      if (this.clocks[0] < 7 && this.clocks[1] === 24) {
        let unitSize = this.totalHeight / (24 - 7);
        this.totalHeight =
          (unitSize / 16) * this.basePx * (this.clocks[1] - this.clocks[0]);
      }
      // 最小刻度处理
      // this.limitUnitSize();
      this.unitSize =
        ((this.totalHeight / (this.clocks[1] - this.clocks[0])) * 16) /
        this.basePx;
      this.unitSize = this.unitSize < 25 ? 25 : this.unitSize;
      this.limitSize = ((this.unitSize / 16) * this.basePx * 30) / 60;
      if (this.day != -1) {
        this.level1Tabs.map((item, i) => {
          let hour = parseInt(this.level1Tabs[i].startTime.split(":")[0]);
          let minute = parseInt(this.level1Tabs[i].startTime.split(":")[1]);
          let blocks = minute / 60 + hour - this.clocks[0];
          this.level1Tabs[i].top =
            ((blocks * this.unitSize) / 16) * this.basePx;
          let endHour = parseInt(this.level1Tabs[i].endTime.split(":")[0]);
          let endMinute = parseInt(this.level1Tabs[i].endTime.split(":")[1]);
          let endBlocks = endMinute / 60 + endHour - minute / 60 - hour;
          this.level1Tabs[i].height =
            ((endBlocks * this.unitSize) / 16) * this.basePx;
        });
        this.level2Tabs.map((item, i) => {
          let hour = parseInt(this.level2Tabs[i].startTime.split(":")[0]);
          let minute = parseInt(this.level2Tabs[i].startTime.split(":")[1]);
          let blocks = minute / 60 + hour - this.clocks[0];
          this.level2Tabs[i].top =
            ((blocks * this.unitSize) / 16) * this.basePx;
          let endHour = parseInt(this.level2Tabs[i].endTime.split(":")[0]);
          let endMinute = parseInt(this.level2Tabs[i].endTime.split(":")[1]);
          let endBlocks = endMinute / 60 + endHour - minute / 60 - hour;
          this.level2Tabs[i].height =
            ((endBlocks * this.unitSize) / 16) * this.basePx;
        });
        this.level3Tabs.map((item, i) => {
          let hour = parseInt(this.level3Tabs[i].startTime.split(":")[0]);
          let minute = parseInt(this.level3Tabs[i].startTime.split(":")[1]);
          let blocks = minute / 60 + hour - this.clocks[0];
          this.level3Tabs[i].top =
            ((blocks * this.unitSize) / 16) * this.basePx;
          let endHour = parseInt(this.level3Tabs[i].endTime.split(":")[0]);
          let endMinute = parseInt(this.level3Tabs[i].endTime.split(":")[1]);
          let endBlocks = endMinute / 60 + endHour - minute / 60 - hour;
          this.level3Tabs[i].height =
            ((endBlocks * this.unitSize) / 16) * this.basePx;
        });
        this.$bus.goalTable.hoursInfo[this.day].columns = [
          this.level1Tabs,
          this.level2Tabs,
          this.level3Tabs,
        ];
        this.$bus.$emit("save");
      }
      //this.$bus.$emit("save");
    },
    // limitUnitSize() {
    // 	// 最小刻度30px
    // 	let minTotalHeight = 30 * (this.clocks[1] - this.clocks[0]);
    // 	if (this.totalHeight < minTotalHeight) {
    // 		this.totalHeight = minTotalHeight;
    // 	}
    // },
  },
};
</script>

<style scoped>
.plan-panel-div {
  height: 100%;
  width: 556px;
  background: #fff;
  position: absolute;
  top: 0px;
  right: -800px;
  z-index: 1000;
  transition: right 0.5s;
}
.plan-panel-div-show {
  right: 0px;
}
.plan-panel-canvas {
  height: calc(100% - 40px);
  overflow: overlay;
  position: relative;
}
.plan-panel-canvas::-webkit-scrollbar {
  width: 10px; /* 纵向滚动条 宽度 */
  height: 0px; /* 横向滚动条 高度 */
  background: #fff; /* 整体背景 */
  border-radius: 10px; /* 整体 圆角 */
  position: fixed;
}

.plan-panel-canvas::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.2);
}
.plan-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 0px 20px;
}
.plan-time-set {
  display: flex;
  align-items: center;
}
.plan-time-set input {
  width: 80px;
  background: #eee;
  margin-right: 10px;
  height: 30px;
  text-align: center;
}
.plan-time-set span {
  cursor: pointer;
}

.plan-panel {
  display: flex;
  flex-direction: row;
  position: relative;
  min-height: 100%;
}
/* 时间 */
.time-tips {
  display: flex;
  font-size: 12px;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  width: 56px;
  background-color: #e7e7e7;
  border-right: #b9b9b9 solid 1px;
}
.time-tips .clock-item {
  flex: 1;
  min-height: 30px;
}
.time-tips .clock-item:after {
  content: "";
  width: 500px;
  height: 1px;
  background-color: #ccc;
  position: absolute;
  right: -500px;
  z-index: 10;
}
.time-tips .clock-item-span {
  position: relative;
  top: -5px;
}
.clock-item:first-child .clock-item-span {
  position: relative;
  top: 0px;
}

.panel {
  position: relative;
  height: 100%;
}
.panel-level1 {
  width: 200px;
  min-width: 50px;
  height: unset;
  font-size: 18px;
  /* background-color: #dcdfe6; */
}
.panel-level2 {
  width: 150px;
  min-width: 50px;
  /* background: #e4e7ed; */
}
.panel-level3 {
  flex: 1;
  min-width: 50px;
  /* background: #ebeef5; */
  font-size: 12px;
}
.panel-level1 .drag-block {
  background: #909399;
  border: 2px solid #909399;
}
.panel-level2 .drag-block {
  background: #c0c4cc;
  border: 2px solid #c0c4cc;
}
.panel-level3 .drag-block {
  background: #e4e7ed;
  border: 2px solid #e4e7ed;
}
.drag-block.active-block {
  border: 2px solid #008080;
  z-index: 2000;
}
.right-click-container {
  width: 100px;
  position: fixed;
  top: 0px;
  left: 0px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
  padding: 5px 0px;
  z-index: 2000;
}
.right-click-container > div {
  margin: 5px 0px;
}
.split-line-container {
  width: 5px;
  display: flex;
  justify-content: flex-start;
  background: rgba(0, 0, 0, 0);
  position: absolute;
  top: 40px;
  height: calc(100% - 40px);
  z-index: 2000;
  cursor: col-resize;
}
.split-line-container1 {
  left: 254px;
}
.split-line-container2 {
  left: 404px;
}
.split-line {
  width: 0px;
  background: #409eff;
  height: 100%;
  pointer-events: none;
}
.split-line-container:hover .split-line {
  width: 2px;
}
.line-moveing {
  width: 2px;
}
.level-3-move-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0px;
  right: 0px;
  width: 100%;
  height: 30px;
  background: #e7e7e7;
  z-index: 2000;
  pointer-events: none;
}
.level-3-to-move-show-start,
.level-3-to-move-show-end {
  position: absolute;
  top: -6px;
  left: -56px;
  font-size: 12px;
  display: inline-block;
  width: 55px;
  text-align: center;
  background: #e7e7e7;
  line-height: 1;
  color: green;
}
.level-3-to-move-show-end {
  top: unset;
  bottom: -6px;
}

.stop-pointer-events * {
  pointer-events: none;
}
/* 从days界面拖任务 */
.to-move-show-div {
  display: none;
  align-items: center;
  justify-content: center;
  width: 0px;
  height: 0px;
  color: #333;
  position: fixed;
  z-index: 99999;
  pointer-events: none;
}
.to-move-show-div .to-move-show-start,
.to-move-show-div .to-move-show-end {
  position: absolute;
  top: -6px;
  left: -56px;
  font-size: 12px;
  display: inline-block;
  width: 55px;
  text-align: center;
  background: #e7e7e7;
  line-height: 1;
  color: green;
}
.to-move-show-div .to-move-show-end {
  top: unset;
  bottom: -6px;
}
.current-time-line {
  width: calc(100% - 56px);
  position: absolute;
  top: 40px;
  left: 56px;
  height: 1px;
  background: green;
  z-index: 1000;
}
</style>
