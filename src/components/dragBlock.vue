<template>
  <div
    class="drag-block"
    :ref="'drag_block_' + dragInfo.id + '_' + dragInfo.index"
    :style="{
      height: dragInfo.height + 'px',
      top: dragInfo.top + 'px',
    }"
    @mousedown.stop="blockMouseDown"
    @contextmenu.prevent.stop="dragBlockRightClick"
    :class="{
      'active-block': isActive,
    }"
  >
    <input
      v-if="showInput"
      :ref="'drag_input_' + dragInfo.id + '_' + dragInfo.index"
      class="drag-input"
      type="text"
      v-model="dragInfo.text"
      @click.stop="stopVariable = 'whatever'"
      @keyup.enter="changeText"
      @blur="changeText"
    />
    <div
      v-else
      class="content"
      :class="{ 'has-done': dragInfo.hasDone }"
      @dblclick.stop="blockDbClick"
    >
      {{ dragInfo.text }}
    </div>
    <div
      v-if="isShowTime"
      class="move-time move-time-start"
      :style="{ left: curMoveConfig.left + 'px' }"
    >
      {{ curMoveConfig.startTime }}
    </div>
    <div
      v-if="isShowTime"
      class="move-time move-time-end"
      :style="{ left: curMoveConfig.left + 'px' }"
    >
      {{ curMoveConfig.endTime }}
    </div>
    <div
      v-if="isActive"
      class="line top-line"
      @mousedown.stop.prevent="lineMousedown('top', $event)"
    ></div>
    <div
      v-if="isActive"
      class="line bottom-line"
      @mousedown.stop.prevent="lineMousedown('bottom', $event)"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    // 复杂数据类型不受单向数据流管控，直接作用于父组件
    dragInfo: {
      type: Object,
      default: () => ({}),
    },
    isActive: {
      type: Boolean,
      default: () => false,
    },
    limitSize: {
      type: Number,
      default: () => 30,
    },
    index: {
      type: Number,
      default: () => 0,
    },
  },
  data() {
    return {
      topHeight: 40, // 窗口距离画布的高度
      isMove: false, // 是否正在移动
      isShowTime: false, // 是否显示移动刻度线
      parentDom: null, // 鼠标移动的作用范围元素
      lastEventInfo: {},
      resizeType: "top", // 拖拽类型：上，下
      originDragConfig: {}, // 原始数据
      showInput: false,
      stopVariable: "",
      curMoveConfig: {}, // 当前移动方框的左侧刻度线信息
    };
  },
  created() {
    this.originDragConfig = JSON.parse(JSON.stringify(this.dragInfo));
  },
  methods: {
    changeText() {
      this.$emit("changeTaskInfo", {
        detail: this.dragInfo.detail,
        type: "changeText",
        text: this.dragInfo.text,
      });
      this.showInput = false;
    },
    dragBlockRightClick(event) {
      if (event.which === 3) {
        this.$emit("dragBlockRightClick", {
          event,
          dragInfo: this.dragInfo,
          index: this.index,
        });
      }
    },
    blockMouseDown(event) {
      this.isMove = true;
      this.originDragConfig = JSON.parse(JSON.stringify(this.dragInfo));
      this.$parent.level3MoveTab = this.dragInfo;
      this.$emit("activeChange", this.dragInfo.id, this.dragInfo.index);
      // 父元素：当前栏，祖父元素：三栏+刻度栏
      this.parentDom = event.target.parentNode.parentNode;
      this.parentDom.addEventListener(
        "mousemove",
        this.parentMouseMoveForBlock
      );
      this.parentDom.addEventListener("mouseup", this.parentMouseUpForBlock);
    },
    parentMouseMoveForBlock(event) {
      if (this.isMove) {
        this.isShowTime = true;
        if (this.lastEventInfo.clientY || this.lastEventInfo.clientY === 0) {
          let dargDom =
            this.$refs[
              "drag_block_" + this.dragInfo.id + "_" + this.dragInfo.index
            ];
          if (dargDom) {
            let heightDiff = this.lastEventInfo.clientY - event.clientY;
            this.dragInfo.top = this.dragInfo.top - heightDiff;
            let parentHeight = this.parentDom.getBoundingClientRect().height;
            let topLimitFoot = parentHeight - this.dragInfo.height;
            this.dragInfo.top = this.dragInfo.top < 0 ? 0 : this.dragInfo.top;
            this.dragInfo.top =
              this.dragInfo.top > topLimitFoot
                ? topLimitFoot
                : this.dragInfo.top;
            dargDom.style.top = this.dragInfo.top + "px";
            this.$parent.chartToTime(
              this.dragInfo,
              parentHeight,
              this.$parent.clocks
            );
          }
        }
        this.lastEventInfo.clientY = event.clientY;
        this.getCurMoveConfig();
      }
    },
    parentMouseUpForBlock() {
      this.isMove = false;
      this.isShowTime = false;
      this.$parent.level3MoveTab = {};
      this.$emit("stopClearActive");
      if (this.limitCheck()) {
        this.originDragConfig = JSON.parse(JSON.stringify(this.dragInfo));
      }
      this.lastEventInfo = {};
      this.parentDom.removeEventListener(
        "mousemove",
        this.parentMouseMoveForBlock
      );
      this.parentDom.removeEventListener("mouseup", this.parentMouseUpForBlock);
    },
    lineMousedown(type, event) {
      if (!this.parentDom) {
        this.parentDom = event.target.parentNode.parentNode.parentNode;
      }
      this.resizeType = type;
      this.originDragConfig = JSON.parse(JSON.stringify(this.dragInfo));
      this.parentDom.addEventListener("mousemove", this.parentMouseMoveForLine);
      this.parentDom.addEventListener("mouseup", this.parentMouseUpForLine);
    },
    parentMouseMoveForLine(event) {
      if (this.lastEventInfo.clientY || this.lastEventInfo.clientY === 0) {
        let basePx = parseFloat(
          document.getElementsByTagName("html")[0].style.fontSize.split("px")[0]
        );
        let dargDom =
          this.$refs[
            "drag_block_" + this.dragInfo.id + "_" + this.dragInfo.index
          ];
        if (this.resizeType === "bottom") {
          let newHeight =
            event.clientY -
            (this.topHeight * 16) / basePx -
            this.dragInfo.top -
            (this.$parent.unitSize / 32) * basePx;
          if (newHeight < this.limitSize) newHeight = this.limitSize;
          this.dragInfo.height = newHeight;
          dargDom.style.height = this.dragInfo.height + "px";
        }
        if (this.resizeType === "top") {
          let newTop =
            event.clientY -
            (this.topHeight * 16) / basePx -
            (this.$parent.unitSize / 32) * basePx;
          let topDiff = newTop - this.dragInfo.top;
          let newHeight = this.dragInfo.height - topDiff;
          if (newHeight < this.limitSize) {
            newTop =
              this.originDragConfig.top +
              this.originDragConfig.height -
              this.limitSize;
            newHeight = this.limitSize;
          }
          this.dragInfo.top = newTop;
          this.dragInfo.height = newHeight;
          dargDom.style.height = newHeight + "px";
          dargDom.style.top = newTop + "px";
        }
        let parentHeight = this.parentDom.getBoundingClientRect().height;
        this.$parent.chartToTime(
          this.dragInfo,
          parentHeight,
          this.$parent.clocks
        );
      }
      this.lastEventInfo.clientY = event.clientY;
      this.isShowTime = true;
      this.getCurMoveConfig();
    },
    parentMouseUpForLine() {
      if (this.limitCheck()) {
        this.originDragConfig = JSON.parse(JSON.stringify(this.dragInfo));
      }
      this.$emit("stopClearActive");
      this.lastEventInfo = {};
      this.parentDom.removeEventListener(
        "mousemove",
        this.parentMouseMoveForLine
      );
      this.parentDom.removeEventListener("mouseup", this.parentMouseUpForLine);
      this.isShowTime = false;
    },
    blockDbClick() {
      this.showInput = true;
      this.parentDom.parentNode.addEventListener(
        "click",
        this.parentClickForInput
      );
      this.$nextTick(() => {
        this.$refs[
          "drag_input_" + this.dragInfo.id + "_" + this.dragInfo.index
        ].select();
      });
    },
    parentClickForInput() {
      this.showInput = false;
      this.parentDom.parentNode.removeEventListener(
        "click",
        this.parentClickForInput
      );
    },
    getCurMoveConfig() {
      this.curMoveConfig.startTime = this.dragInfo.startTime;
      this.curMoveConfig.endTime = this.dragInfo.endTime;
      let basePx = parseFloat(
        document.getElementsByTagName("html")[0].style.fontSize.split("px")[0]
      );
      if (this.dragInfo.type === "level1") {
        this.curMoveConfig.left = (-58 / 16) * basePx;
      }
      if (this.dragInfo.type === "level2") {
        this.curMoveConfig.left =
          -this.$parent.$refs.task_panel_level1.getBoundingClientRect().width -
          (58 / 16) * basePx;
      }
      if (this.dragInfo.type === "level3") {
        this.curMoveConfig.left =
          (-558 / 16) * basePx +
          this.$parent.$refs.task_panel_level3.getBoundingClientRect().width;
      }
    },
    limitCheck() {
      if (
        this.$parent.limitOverlap(
          this.$parent[this.dragInfo.type + "Tabs"],
          this.dragInfo
        ) !== true
      ) {
        for (const key in this.originDragConfig) {
          if (
            Object.prototype.hasOwnProperty.call(this.originDragConfig, key)
          ) {
            this.dragInfo[key] = this.originDragConfig[key];
          }
        }
      }
    },
  },
};
</script>

<style scoped>
.drag-block {
  position: absolute;
  width: 100%;
  top: 0px;
  left: 0px;
  z-index: 150;
  box-sizing: border-box;
}
.line {
  width: 5px;
  height: 5px;
  position: absolute;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #008080;
}
.top-line {
  top: -5px;
  right: 15%;
  cursor: ns-resize;
}
.bottom-line {
  bottom: -5px;
  left: 15%;
  cursor: ns-resize;
  /* cursor: url('../assets/img/111.png') 20 20, auto; */
}
.drag-block .content {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  padding: 0px 10px;
}
.drag-input {
  width: calc(100% - 12px);
  height: calc(100% - 6px);
  outline: 1px solid skyblue;
  font-size: 16px;
  padding: 0px 4px;
}
.has-done {
  color: rgb(170, 170, 170);
  text-decoration: line-through;
}
.move-time {
  position: absolute;
  left: -56px;
  font-size: 12px;
  display: inline-block;
  width: 55px;
  text-align: center;
  background: #e7e7e7;
  height: 12px;
  line-height: 1;
  color: green;
}
.move-time-start {
  top: -6px;
}
.move-time-end {
  bottom: -6px;
}
</style>