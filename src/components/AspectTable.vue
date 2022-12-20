<template>
  <div
    class="aspect-table"
    @contextmenu.prevent.stop="
      (val) => {
        onContextmenu(val);
      }
    "
  >
    <div class="aspect-header">
      <div class="sup-cell"><p>管理计划</p></div>
      <div class="sub-cells">
        <div><p>业</p></div>
        <div><p>方面</p></div>
        <div><p>项目</p></div>
      </div>
    </div>
    <div class="aspect-body-wrapper" @scroll="handleScroll()" ref="aspectBody">
      <div
        class="aspect-body-item"
        v-for="(aspect, j) in data.aspect"
        :key="j"
        @contextmenu.prevent.stop="
          (val) => {
            onContextmenu(val, j);
          }
        "
      >
        <div
          class="aspect-level-0"
          :title="aspect.text"
          @click="clickItem(0, j, 0)"
        >
          <p v-if="!aspect.showInput">
            {{ aspect.text }}
          </p>
          <input
            v-else
            v-model="aspect.text"
            @blur="blurItem(0, j, 0)"
            @keyup.enter="blurItem(0, j, 0)"
          />
        </div>
        <div class="wrapper_1">
          <div
            class="wrapper_2"
            v-for="(item, i) in aspect.children"
            :key="i"
            @contextmenu.prevent.stop="
              (val) => {
                onContextmenu(val, j, i);
              }
            "
          >
            <div class="wrapper_3">
              <div
                :title="item.text"
                class="aspect-level-1"
                @click="clickItem(1, j, i)"
              >
                <p v-if="!item.showInput">
                  {{ item.text }}
                </p>
                <input
                  v-else
                  v-model="item.text"
                  @blur="blurItem(1, j, i)"
                  @keyup.enter="blurItem(1, j, i)"
                />
              </div>
            </div>
            <div class="wrapper_4">
              <div
                class="wrapper_5"
                v-for="(_item, k) in item.children"
                :key="k"
                @contextmenu.prevent.stop="
                  (val) => {
                    onContextmenu(val, j, i, k);
                  }
                "
              >
                <div
                  :title="_item.text"
                  class="aspect-level-1"
                  @click="clickItem(2, j, i, k)"
                >
                  <p v-if="!_item.showInput">
                    {{ _item.text }}
                  </p>
                  <input
                    v-else
                    v-model="_item.text"
                    @blur="blurItem(2, j, i, k)"
                    @keyup.enter="blurItem(2, j, i, k)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="操作确认"
      :visible.sync="confirmDialog"
      :show-close="false"
      center
    >
      <span>{{ tempMsg }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="confirmDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteItem(...tempData)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Notification } from "element-ui";
export default {
  props: {
    data: {
      type: Object,
      default: () => ({
        aspect: [],
        goalTree: [],
      }),
    },
  },
  data: () => {
    return {
      confirmDialog: false,
      tempData: [],
      tempMsg: "",
      canInput: true,
    };
  },
  methods: {
    addItem(type, ...info) {
      let temp = "成功添加一条数据";
      switch (type) {
        case 0:
          temp = `成功添加一个节点 "业"`;
          this.data.aspect.push({
            text: "业",
            children: [],
          });
          this.data.goalTree.push({});
          break;
        case 1:
          temp = `成功插入一个节点 "业"`;
          this.data.aspect.splice(info[0], 0, {
            text: "业",
            children: [],
          });
          {
            let index = 0;
            for (let i = 0; i < info[0]; i++) {
              if (this.data.aspect[i].children.length) {
                for (let j = 0; j < this.data.aspect[i].children.length; j++) {
                  index += this.data.aspect[i].children[j].children.length || 1;
                }
              } else {
                index += 1;
              }
            }
            this.data.goalTree.splice(index, 0, {});
          }
          break;
        case 2:
          temp = `成功添加一个节点 "方面"`;
          this.data.aspect[info[0]].children.push({
            text: "方面",
            children: [],
          });
          if (this.data.aspect[info[0]].children.length !== 1) {
            let index = 1;
            for (let i = 0; i <= info[0]; i++) {
              for (let j = 0; j < this.data.aspect[i].children.length; j++) {
                index += this.data.aspect[i].children[j].children.length || 1;
              }
            }
            this.data.goalTree.splice(index, 0, {});
          }
          break;
        case 3:
          temp = `成功插入一个节点 "方面"`;
          this.data.aspect[info[0]].children.splice(info[1], 0, {
            text: "方面",
            children: [],
          });
          {
            let index = 0;
            for (let j = 0; j < info[1]; j++) {
              index +=
                this.data.aspect[info[0]].children[j].children.length || 1;
            }
            for (let i = 0; i < info[0]; i++) {
              if (this.data.aspect[i].children.length) {
                for (let j = 0; j < this.data.aspect[i].children.length; j++) {
                  index += this.data.aspect[i].children[j].children.length || 1;
                }
              } else {
                index += 1;
              }
            }
            this.data.goalTree.splice(index, 0, {});
          }
          break;
        case 4:
          temp = `成功添加一个节点 "项目"`;
          this.data.aspect[info[0]].children[info[1]].children.push({
            text: "项目",
            children: [],
          });
          if (
            this.data.aspect[info[0]].children[info[1]].children.length !== 1
          ) {
            let index =
              this.data.aspect[info[0]].children[info[1]].children.length - 1;
            for (let i = 0; i < info[1]; i++) {
              index +=
                this.data.aspect[info[0]].children[i].children.length || 1;
            }
            console.log(index);
            for (let i = 0; i < info[0]; i++) {
              if (this.data.aspect[i].children.length) {
                for (let j = 0; j < this.data.aspect[i].children.length; j++) {
                  index += this.data.aspect[i].children[j].children.length || 1;
                }
              } else {
                index += 1;
              }
            }
            console.log(index);
            this.data.goalTree.splice(index, 0, {});
          }
          break;
        case 5:
          temp = `成功插入一个节点 "项目"`;
          this.data.aspect[info[0]].children[info[1]].children.splice(
            info[2],
            0,
            {
              text: "项目",
              children: [],
            }
          );
          {
            let index = info[2];
            for (let i = 0; i < info[1]; i++) {
              index +=
                this.data.aspect[info[0]].children[i].children.length || 1;
            }
            for (let i = 0; i < info[0]; i++) {
              if (this.data.aspect[i].children.length) {
                for (let j = 0; j < this.data.aspect[i].children.length; j++) {
                  index += this.data.aspect[i].children[j].children.length || 1;
                }
              } else {
                index += 1;
              }
            }
            console.log(index);
            this.data.goalTree.splice(index, 0, {});
          }
          break;

        default:
          break;
      }
      Notification.success({
        title: "成功",
        message: temp,
        showClose: false,
        duration: 2500,
      });
      this.$emit("save", true);
    },
    deleteItem(type, ...info) {
      let temp = "成功删除一条数据";
      switch (type) {
        case 0:
          temp = `成功删除 "业"：${this.data.aspect[info[0]].text}`;
          {
            let index = 0;
            for (let i = 0; i < info[0]; i++) {
              index += this.data.aspect[i].children.length || 1;
            }
            let num = 0;
            for (
              let i = 0;
              i < this.data.aspect[info[0]].children.length;
              i++
            ) {
              num += this.data.aspect[info[0]].children[i].children.length || 1;
            }
            this.data.aspect.splice(info[0], 1);
            this.data.goalTree.splice(index, num);
          }
          break;
        case 1:
          temp = `成功删除 "方面"：${
            this.data.aspect[info[0]].children[info[1]].text
          }`;
          {
            let index = info[1];
            for (let i = 0; i < info[0]; i++) {
              index += this.data.aspect[i].children.length || 1;
            }
            let num =
              this.data.aspect[info[0]].children[info[1]].children.length || 1;
            this.data.aspect[info[0]].children.splice(info[1], 1);
            this.data.goalTree.splice(index, num);
          }
          break;
        case 2:
          temp = `成功删除 "项目"：${
            this.data.aspect[info[0]].children[info[1]].children[info[2]].text
          }`;
          {
            let index = info[2];
            for (let i = 0; i < info[1]; i++) {
              index +=
                this.data.aspect[info[0]].children[i].children.length || 1;
            }
            for (let i = 0; i < info[0]; i++) {
              for (let j = 0; j < this.data.aspect[i].children.length; j++) {
                index += this.data.aspect[i].children[j].children.length || 1;
              }
            }
            this.data.aspect[info[0]].children[info[1]].children.splice(
              info[2],
              1
            );
            this.data.goalTree.splice(index, 1);
          }
          break;

        default:
          break;
      }
      this.confirmDialog = false;
      Notification.success({
        title: "删除成功",
        message: temp,
        showClose: false,
        duration: 2500,
      });
      this.$emit("save", true);
    },
    clickItem(type, row, val, subVal = 0) {
      if (!this.canInput) return;
      this.canInput = false;
      this.$emit("input", false);
      switch (type) {
        case 0:
          this.data.aspect[row].showInput = true;
          break;
        case 1:
          this.data.aspect[row].children[val].showInput = true;
          break;
        case 2:
          this.data.aspect[row].children[val].children[subVal].showInput = true;
          break;
        default:
          break;
      }
      this.$forceUpdate();
      this.$nextTick(() => {
        document.querySelector("input")?.focus();
        document.querySelector("input")?.select();
      });
    },
    //输入框失焦
    blurItem(type, row, val, subVal = 0) {
      switch (type) {
        case 0:
          this.data.aspect[row].showInput = false;
          break;
        case 1:
          this.data.aspect[row].children[val].showInput = false;
          break;
        case 2:
          this.data.aspect[row].children[val].children[
            subVal
          ].showInput = false;
          break;
        default:
          break;
      }
      this.$emit("save", true);
      setTimeout(() => {
        this.canInput = true;
        this.$emit("input", true);
      }, 100);
    },
    onContextmenu(event, ...info) {
      let item = [];
      switch (info.length) {
        case 0:
          item.push({
            label: "添加节点（业）",
            onClick: () => {
              this.addItem(0);
            },
          });
          break;
        case 1:
          item.push({
            label: `在“${this.data.aspect[info[0]].text}”下添加节点（方面）`,
            onClick: () => {
              this.addItem(2, info[0]);
            },
            divided: true,
          });
          item.push({
            label: `在“${this.data.aspect[info[0]].text}”前插入节点（业）`,
            onClick: () => {
              this.addItem(1, info[0]);
            },
          });
          item.push({
            label: "添加节点（业）",
            onClick: () => {
              this.addItem(0);
            },
            divided: true,
          });
          item.push({
            label: `删除节点“${this.data.aspect[info[0]].text}”（业）`,
            onClick: () => {
              this.tempMsg = `您确定要删除节点“${
                this.data.aspect[info[0]].text
              }”（业）吗？`;
              this.tempData = [0, info[0]];
              this.confirmDialog = true;
            },
          });
          break;
        case 2:
          item.push({
            label: `在“${
              this.data.aspect[info[0]].children[info[1]].text
            }”下添加节点（项目）`,
            onClick: () => {
              this.addItem(4, info[0], info[1]);
            },
            divided: true,
          });
          item.push({
            label: `在“${
              this.data.aspect[info[0]].children[info[1]].text
            }”前插入节点（方面）`,
            onClick: () => {
              this.addItem(3, info[0], info[1]);
            },
          });
          item.push({
            label: `在“${this.data.aspect[info[0]].text}”下添加节点（方面）`,
            onClick: () => {
              this.addItem(2, info[0]);
            },
            divided: true,
          });
          item.push({
            label: `在“${this.data.aspect[info[0]].text}”前插入节点（业）`,
            onClick: () => {
              this.addItem(1, info[0]);
            },
          });
          item.push({
            label: "添加节点（业）",
            onClick: () => {
              this.addItem(0);
            },
          });
          item.push({
            label: `删除节点“${this.data.aspect[info[0]].text}”（业）`,
            onClick: () => {
              this.tempMsg = `您确定要删除节点“${
                this.data.aspect[info[0]].text
              }”（业）吗？`;
              this.tempData = [0, info[0]];
              this.confirmDialog = true;
            },
            divided: true,
          });
          item.push({
            label: `删除节点“${
              this.data.aspect[info[0]].children[info[1]].text
            }”（方面）`,
            onClick: () => {
              this.tempMsg = `您确定要删除节点“${
                this.data.aspect[info[0]].children[info[1]].text
              }”（方面）吗？`;
              this.tempData = [1, info[0], info[1]];
              this.confirmDialog = true;
            },
          });
          break;
        case 3:
          item.push({
            label: `在“${
              this.data.aspect[info[0]].children[info[1]].children[info[2]].text
            }”前插入节点（项目）`,
            onClick: () => {
              this.addItem(5, info[0], info[1], info[2]);
            },
          });
          item.push({
            label: `在“${
              this.data.aspect[info[0]].children[info[1]].text
            }”下添加节点（项目）`,
            onClick: () => {
              this.addItem(4, info[0], info[1]);
            },
            divided: true,
          });
          item.push({
            label: `在“${
              this.data.aspect[info[0]].children[info[1]].text
            }”前插入节点（方面）`,
            onClick: () => {
              this.addItem(3, info[0], info[1]);
            },
          });
          item.push({
            label: `在“${this.data.aspect[info[0]].text}”下添加节点（方面）`,
            onClick: () => {
              this.addItem(2, info[0]);
            },
          });
          item.push({
            label: `删除节点“${
              this.data.aspect[info[0]].children[info[1]].text
            }”（方面）`,
            onClick: () => {
              this.tempMsg = `您确定要删除节点“${
                this.data.aspect[info[0]].children[info[1]].text
              }”（方面）吗？`;
              this.tempData = [1, info[0], info[1]];
              this.confirmDialog = true;
            },
            divided: true,
          });
          item.push({
            label: `在“${this.data.aspect[info[0]].text}”前插入节点（业）`,
            onClick: () => {
              this.addItem(1, info[0]);
            },
          });
          item.push({
            label: "添加节点（业）",
            onClick: () => {
              this.addItem(0);
            },
          });
          item.push({
            label: `删除节点“${this.data.aspect[info[0]].text}”（业）`,
            onClick: () => {
              this.tempMsg = `您确定要删除节点“${
                this.data.aspect[info[0]].text
              }”（业）吗？`;
              this.tempData = [0, info[0]];
              this.confirmDialog = true;
            },
            divided: true,
          });
          item.push({
            label: `删除节点“${
              this.data.aspect[info[0]].children[info[1]].children[info[2]].text
            }”（项目）`,
            onClick: () => {
              this.tempMsg = `您确定要删除节点“${
                this.data.aspect[info[0]].children[info[1]].children[info[2]]
                  .text
              }”（项目）吗？`;
              this.tempData = [2, info[0], info[1], info[2]];
              this.confirmDialog = true;
            },
          });
          break;
        default:
          break;
      }
      this.$contextmenu({
        items: item,
        event,
        customClass: "custom-class",
        zIndex: 3,
        minWidth: 120,
      });
    },
    handleScroll() {
      this.$emit("scroll", this.$refs.aspectBody.scrollTop);
    },
    updateScroll(val) {
      this.$refs.aspectBody.scrollTop = val;
    },
  },
  created() {},
};
</script>

<style scoped>
.aspect-table {
  position: relative;
  width: 100%;
  height: 100%;
}
.aspect-header {
  width: 100%;
  height: 99px;
  overflow: hidden;
  position: relative;
  border: 1px solid #555;
  border-bottom: none;
  box-sizing: border-box;
  color: #aaa;
  font-size: 16px;
  font-weight: 700;
  background-color: #333333;
}
.aspect-header div p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 10px;
  margin: 0;
}
.aspect-body-wrapper {
  height: calc(100% - 100px);
  overflow: auto;
}
.sup-cell {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #333333;
  border: 1px solid #555;
}
.sub-cells {
  position: absolute;
  top: 50px;
  left: 0px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  height: 50px;
}
.sub-cells div {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #333333;
  border: 1px solid #555;
  min-width: 0;
}
.aspect-body-item {
  width: 100%;
  min-height: 99px;
  overflow: hidden;
  position: relative;
  border: 1px solid #555;
  box-sizing: border-box;
  color: #aaa;
  font-size: 16px;
  background-color: #cccccc;
  border-top: none;
  display: grid;
  grid-template-columns: 1fr 2fr;
}
.aspect-body-item div p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 10px;
  margin: 0;
}
.aspect-body-item div input {
  overflow: hidden;
  white-space: nowrap;
  padding: 0 10px;
  margin: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  text-align: center;
  border: none;
  outline: 0px;
  font-size: 16px;
}
.aspect-level-0 {
  min-height: 99px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d2d2d2;
  color: #2c3e50;
  border-right: 1px solid #555;
  min-width: 0;
}
.wrapper_1 {
  width: 100%;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.wrapper_2 {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid #555;
}
.wrapper_3 {
  width: 100%;
  box-sizing: border-box;
  border-right: 1px solid #555;
  min-width: 0;
}
.wrapper_4 {
  width: 100%;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.wrapper_5 {
  width: 100%;
  border-bottom: 1px solid #555;
}
.aspect-level-1 {
  height: 100%;
  min-height: 99px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d2d2d2;
  color: #2c3e50;
}
.wrapper_2:last-of-type {
  border-bottom: none;
}
.wrapper_5:last-of-type {
  border-bottom: none;
}
</style>