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
      <div class="sup-cell"><p>一生目标</p></div>
      <div class="sub-cells">
        <div :class="'sub-cell-item sub-cell-item-1-' + state">
          <div
            :class="'item-label-l' + (hasInit ? ' item-label-l-' + state : '')"
          >
            <p>业</p>
          </div>
          <div
            :class="'item-label-r' + (hasInit ? ' item-label-r-' + state : '')"
          >
            <p>一生</p>
          </div>
        </div>
        <div :class="'sub-cell-item sub-cell-item-2-' + state">
          <div
            :class="'item-label-l' + (hasInit ? ' item-label-l-' + state : '')"
          >
            <p>方面</p>
          </div>
          <div
            :class="'item-label-r' + (hasInit ? ' item-label-r-' + state : '')"
          >
            <p>一生</p>
          </div>
        </div>
        <div :class="'sub-cell-item sub-cell-item-3-' + state">
          <div
            :class="'item-label-l' + (hasInit ? ' item-label-l-' + state : '')"
          >
            <p>项目</p>
          </div>
          <div
            :class="'item-label-r' + (hasInit ? ' item-label-r-' + state : '')"
          >
            <p>一生</p>
          </div>
        </div>
      </div>
    </div>
    <div class="aspect-body-wrapper" @scroll="handleScroll()" ref="aspectBody">
      <div
        class="aspect-body-item"
        v-for="(aspect, j) in $bus.goalTable.aspect"
        :key="j"
        @contextmenu.prevent.stop="
          (val) => {
            onContextmenu(val, j);
          }
        "
      >
        <div
          :class="'aspect-level-0 aspect-level-0-' + state"
          :title="aspect.text"
        >
          <div
            :class="'item-label-l' + (hasInit ? ' item-label-l-' + state : '')"
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
          <div
            :class="'item-label-r' + (hasInit ? ' item-label-r-' + state : '')"
            @click="clickItem(0, j, 0, 0, true)"
          >
            <p v-if="!aspect.goal.showInput">
              {{ aspect.goal.text }}
            </p>
            <input
              v-else
              v-model="aspect.goal.text"
              @blur="blurItem(0, j, 0)"
              @keyup.enter="blurItem(0, j, 0)"
            />
          </div>
        </div>
        <div :class="'wrapper_1' + (hasInit ? ' wrapper_1-' + state : '')">
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
            <div :class="'wrapper_3' + (hasInit ? ' wrapper_3-' + state : '')">
              <div :title="item.text" class="aspect-level-1">
                <div
                  :class="
                    'item-label-l' + (hasInit ? ' item-label-l-' + state : '')
                  "
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
                <div
                  :class="
                    'item-label-r' + (hasInit ? ' item-label-r-' + state : '')
                  "
                  @click="clickItem(1, j, i, 0, true)"
                >
                  <p v-if="!item.goal.showInput">
                    {{ item.goal.text }}
                  </p>
                  <input
                    v-else
                    v-model="item.goal.text"
                    @blur="blurItem(1, j, i)"
                    @keyup.enter="blurItem(1, j, i)"
                  />
                </div>
              </div>
            </div>
            <div :class="'wrapper_4' + (hasInit ? ' wrapper_4-' + state : '')">
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
                <div :title="_item.text" class="aspect-level-1">
                  <div
                    :class="
                      'item-label-l' + (hasInit ? ' item-label-l-' + state : '')
                    "
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
                  <div
                    :class="
                      'item-label-r' + (hasInit ? ' item-label-r-' + state : '')
                    "
                    @click="clickItem(2, j, i, k, true)"
                  >
                    <p v-if="!_item.goal.showInput">
                      {{ _item.goal.text }}
                    </p>
                    <input
                      v-else
                      v-model="_item.goal.text"
                      @blur="blurItem(2, j, i, k, true)"
                      @keyup.enter="blurItem(2, j, i, k, true)"
                    />
                  </div>
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
    state: {
      type: Number,
      default: () => 0,
    },
  },
  data: () => {
    return {
      hasInit: false,
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
          this.$bus.goalTable.aspect.push({
            text: "业",
            goal: {
              text: "业的一生目标",
            },
            children: [
              {
                text: "方面",
                goal: {
                  text: "方面的一生目标",
                },
                children: [
                  {
                    text: "项目",
                    goal: {
                      text: "项目的一生目标",
                    },
                    children: [],
                  },
                ],
              },
            ],
          });
          this.$bus.goalTable.goalTree.push({});
          break;
        case 1:
          temp = `成功插入一个节点 "业"`;
          this.$bus.goalTable.aspect.splice(info[0], 0, {
            text: "业",
            goal: {
              text: "业的一生目标",
            },
            children: [
              {
                text: "方面",
                goal: {
                  text: "方面的一生目标",
                },
                children: [
                  {
                    text: "项目",
                    goal: {
                      text: "项目的一生目标",
                    },
                    children: [],
                  },
                ],
              },
            ],
          });
          {
            let index = 0;
            for (let i = 0; i < info[0]; i++) {
              if (this.$bus.goalTable.aspect[i].children.length) {
                for (
                  let j = 0;
                  j < this.$bus.goalTable.aspect[i].children.length;
                  j++
                ) {
                  index +=
                    this.$bus.goalTable.aspect[i].children[j].children.length ||
                    1;
                }
              } else {
                index += 1;
              }
            }
            this.$bus.goalTable.goalTree.splice(index, 0, {});
          }
          break;
        case 2:
          temp = `成功添加一个节点 "方面"`;
          this.$bus.goalTable.aspect[info[0]].children.push({
            text: "方面",
            goal: {
              text: "方面的一生目标",
            },
            children: [
              {
                text: "项目",
                goal: {
                  text: "项目的一生目标",
                },
                children: [],
              },
            ],
          });
          if (this.$bus.goalTable.aspect[info[0]].children.length !== 1) {
            let index = 1;
            for (let i = 0; i <= info[0]; i++) {
              for (
                let j = 0;
                j < this.$bus.goalTable.aspect[i].children.length;
                j++
              ) {
                index +=
                  this.$bus.goalTable.aspect[i].children[j].children.length ||
                  1;
              }
            }
            this.$bus.goalTable.goalTree.splice(index, 0, {});
          }
          break;
        case 3:
          temp = `成功插入一个节点 "方面"`;
          this.$bus.goalTable.aspect[info[0]].children.splice(info[1], 0, {
            text: "方面",
            goal: {
              text: "方面的一生目标",
            },
            children: [
              {
                text: "项目",
                goal: {
                  text: "项目的一生目标",
                },
                children: [],
              },
            ],
          });
          {
            let index = 0;
            for (let j = 0; j < info[1]; j++) {
              index +=
                this.$bus.goalTable.aspect[info[0]].children[j].children
                  .length || 1;
            }
            for (let i = 0; i < info[0]; i++) {
              if (this.$bus.goalTable.aspect[i].children.length) {
                for (
                  let j = 0;
                  j < this.$bus.goalTable.aspect[i].children.length;
                  j++
                ) {
                  index +=
                    this.$bus.goalTable.aspect[i].children[j].children.length ||
                    1;
                }
              } else {
                index += 1;
              }
            }
            this.$bus.goalTable.goalTree.splice(index, 0, {});
          }
          break;
        case 4:
          temp = `成功添加一个节点 "项目"`;
          this.$bus.goalTable.aspect[info[0]].children[info[1]].children.push({
            text: "项目",
            goal: {
              text: "项目的一生目标",
            },
            children: [],
          });
          if (
            this.$bus.goalTable.aspect[info[0]].children[info[1]].children
              .length !== 1
          ) {
            let index =
              this.$bus.goalTable.aspect[info[0]].children[info[1]].children
                .length - 1;
            for (let i = 0; i < info[1]; i++) {
              index +=
                this.$bus.goalTable.aspect[info[0]].children[i].children
                  .length || 1;
            }
            for (let i = 0; i < info[0]; i++) {
              if (this.$bus.goalTable.aspect[i].children.length) {
                for (
                  let j = 0;
                  j < this.$bus.goalTable.aspect[i].children.length;
                  j++
                ) {
                  index +=
                    this.$bus.goalTable.aspect[i].children[j].children.length ||
                    1;
                }
              } else {
                index += 1;
              }
            }
            this.$bus.goalTable.goalTree.splice(index, 0, {});
          }
          break;
        case 5:
          temp = `成功插入一个节点 "项目"`;
          this.$bus.goalTable.aspect[info[0]].children[info[1]].children.splice(
            info[2],
            0,
            {
              text: "项目",
              goal: {
                text: "项目的一生目标",
              },
              children: [],
            }
          );
          {
            let index = info[2];
            for (let i = 0; i < info[1]; i++) {
              index +=
                this.$bus.goalTable.aspect[info[0]].children[i].children
                  .length || 1;
            }
            for (let i = 0; i < info[0]; i++) {
              if (this.$bus.goalTable.aspect[i].children.length) {
                for (
                  let j = 0;
                  j < this.$bus.goalTable.aspect[i].children.length;
                  j++
                ) {
                  index +=
                    this.$bus.goalTable.aspect[i].children[j].children.length ||
                    1;
                }
              } else {
                index += 1;
              }
            }
            this.$bus.goalTable.goalTree.splice(index, 0, {});
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
      this.$forceUpdate();
      this.$parent.$parent.$parent.$refs.mainTable.updateData();
      this.$bus.$emit("save");
    },
    deleteItem(type, ...info) {
      let temp = "成功删除一条数据";
      switch (type) {
        case 0:
          temp = `成功删除 "业"：${this.$bus.goalTable.aspect[info[0]].text}`;
          {
            let index = 0;
            for (let i = 0; i < info[0]; i++) {
              index += this.$bus.goalTable.aspect[i].children.length || 1;
            }
            let num = 0;
            for (
              let i = 0;
              i < this.$bus.goalTable.aspect[info[0]].children.length;
              i++
            ) {
              num +=
                this.$bus.goalTable.aspect[info[0]].children[i].children
                  .length || 1;
            }
            this.$bus.goalTable.aspect.splice(info[0], 1);
            this.$bus.goalTable.goalTree.splice(index, num);
          }
          break;
        case 1:
          temp = `成功删除 "方面"：${
            this.$bus.goalTable.aspect[info[0]].children[info[1]].text
          }`;
          {
            let index = info[1];
            for (let i = 0; i < info[0]; i++) {
              index += this.$bus.goalTable.aspect[i].children.length || 1;
            }
            let num =
              this.$bus.goalTable.aspect[info[0]].children[info[1]].children
                .length || 1;
            this.$bus.goalTable.aspect[info[0]].children.splice(info[1], 1);
            this.$bus.goalTable.goalTree.splice(index, num);
          }
          break;
        case 2:
          temp = `成功删除 "项目"：${
            this.$bus.goalTable.aspect[info[0]].children[info[1]].children[
              info[2]
            ].text
          }`;
          {
            let index = info[2];
            for (let i = 0; i < info[1]; i++) {
              index +=
                this.$bus.goalTable.aspect[info[0]].children[i].children
                  .length || 1;
            }
            for (let i = 0; i < info[0]; i++) {
              for (
                let j = 0;
                j < this.$bus.goalTable.aspect[i].children.length;
                j++
              ) {
                index +=
                  this.$bus.goalTable.aspect[i].children[j].children.length ||
                  1;
              }
            }
            this.$bus.goalTable.aspect[info[0]].children[
              info[1]
            ].children.splice(info[2], 1);
            console.log(index);
            // this.$bus.goalTable.goalTree.splice(index, 1);
          }
          break;

        default:
          break;
      }
      this.confirmDialog = false;
      console.log(this.$bus.goalTable);
      Notification.success({
        title: "删除成功",
        message: temp,
        showClose: false,
        duration: 2500,
      });
      this.$forceUpdate();
      this.$parent.$parent.$parent.$refs.mainTable.updateData();
      this.$bus.$emit("save");
    },
    clickItem(type, row, val, subVal = 0, isDown = false) {
      switch (type) {
        case 0:
          if (isDown) {
            if (this.$bus.goalTable.aspect[row].goal.showInput) return;
            this.$bus.goalTable.aspect[row].goal.showInput = true;
          } else {
            if (this.$bus.goalTable.aspect[row].showInput) return;
            this.$bus.goalTable.aspect[row].showInput = true;
          }
          break;
        case 1:
          if (isDown) {
            if (this.$bus.goalTable.aspect[row].children[val].goal.showInput)
              return;
            this.$bus.goalTable.aspect[row].children[val].goal.showInput = true;
          } else {
            if (this.$bus.goalTable.aspect[row].children[val].showInput) return;
            this.$bus.goalTable.aspect[row].children[val].showInput = true;
          }
          break;
        case 2:
          if (isDown) {
            if (
              this.$bus.goalTable.aspect[row].children[val].children[subVal]
                .goal.showInput
            )
              return;
            this.$bus.goalTable.aspect[row].children[val].children[
              subVal
            ].goal.showInput = true;
          } else {
            if (
              this.$bus.goalTable.aspect[row].children[val].children[subVal]
                .showInput
            )
              return;
            this.$bus.goalTable.aspect[row].children[val].children[
              subVal
            ].showInput = true;
          }
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
    blurItem(type, row, val, subVal = 0, isNode = false) {
      switch (type) {
        case 0:
          this.$bus.goalTable.aspect[row].showInput = false;
          this.$bus.goalTable.aspect[row].goal.showInput = false;
          break;
        case 1:
          this.$bus.goalTable.aspect[row].children[val].showInput = false;
          this.$bus.goalTable.aspect[row].children[val].goal.showInput = false;
          break;
        case 2:
          this.$bus.goalTable.aspect[row].children[val].children[
            subVal
          ].showInput = false;
          this.$bus.goalTable.aspect[row].children[val].children[
            subVal
          ].goal.showInput = false;
          break;
        default:
          break;
      }
      //如果是叶节点就更新对应右侧的一生目标
      if (isNode) {
        let index = 0;
        for (let i = 0; i < row; i++) {
          if (this.$bus.goalTable.aspect[i].children.length === 0) index += 1;
          for (
            let j = 0;
            j < this.$bus.goalTable.aspect[i].children.length;
            j++
          ) {
            index +=
              this.$bus.goalTable.aspect[i].children[j].children.length || 1;
          }
        }
        for (let i = 0; i < val; i++) {
          index +=
            this.$bus.goalTable.aspect[row].children[i].children.length || 1;
        }
        index += subVal;
        if (this.$bus.goalTable.goalTree[index][0]) {
          this.$bus.goalTable.goalTree[index][0][0].desc =
            this.$bus.goalTable.aspect[row].children[val].children[
              subVal
            ].goal.text;
        } else {
          this.$bus.goalTable.goalTree[index][0] = {
            0: {
              desc: this.$bus.goalTable.aspect[row].children[val].children[
                subVal
              ].goal.text,
            },
          };
        }
      }
      this.$forceUpdate();
      this.$bus.$emit("save");
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
            label: `在“${
              this.$bus.goalTable.aspect[info[0]].text
            }”下添加节点（方面）`,
            onClick: () => {
              this.addItem(2, info[0]);
            },
            divided: true,
          });
          item.push({
            label: `在“${
              this.$bus.goalTable.aspect[info[0]].text
            }”前插入节点（业）`,
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
            label: `删除节点“${
              this.$bus.goalTable.aspect[info[0]].text
            }”（业）`,
            onClick: () => {
              this.tempMsg = `您确定要删除节点“${
                this.$bus.goalTable.aspect[info[0]].text
              }”（业）吗？`;
              this.tempData = [0, info[0]];
              this.confirmDialog = true;
            },
          });
          break;
        case 2:
          item.push({
            label: `在“${
              this.$bus.goalTable.aspect[info[0]].children[info[1]].text
            }”下添加节点（项目）`,
            onClick: () => {
              this.addItem(4, info[0], info[1]);
            },
            divided: true,
          });
          item.push({
            label: `在“${
              this.$bus.goalTable.aspect[info[0]].children[info[1]].text
            }”前插入节点（方面）`,
            onClick: () => {
              this.addItem(3, info[0], info[1]);
            },
          });
          item.push({
            label: `在“${
              this.$bus.goalTable.aspect[info[0]].text
            }”下添加节点（方面）`,
            onClick: () => {
              this.addItem(2, info[0]);
            },
            divided: true,
          });
          item.push({
            label: `在“${
              this.$bus.goalTable.aspect[info[0]].text
            }”前插入节点（业）`,
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
            label: `删除节点“${
              this.$bus.goalTable.aspect[info[0]].text
            }”（业）`,
            onClick: () => {
              this.tempMsg = `您确定要删除节点“${
                this.$bus.goalTable.aspect[info[0]].text
              }”（业）吗？`;
              this.tempData = [0, info[0]];
              this.confirmDialog = true;
            },
            divided: true,
          });
          item.push({
            label: `删除节点“${
              this.$bus.goalTable.aspect[info[0]].children[info[1]].text
            }”（方面）`,
            onClick: () => {
              this.tempMsg = `您确定要删除节点“${
                this.$bus.goalTable.aspect[info[0]].children[info[1]].text
              }”（方面）吗？`;
              this.tempData = [1, info[0], info[1]];
              this.confirmDialog = true;
            },
          });
          break;
        case 3:
          item.push({
            label: `在“${
              this.$bus.goalTable.aspect[info[0]].children[info[1]].children[
                info[2]
              ].text
            }”前插入节点（项目）`,
            onClick: () => {
              this.addItem(5, info[0], info[1], info[2]);
            },
          });
          item.push({
            label: `在“${
              this.$bus.goalTable.aspect[info[0]].children[info[1]].text
            }”下添加节点（项目）`,
            onClick: () => {
              this.addItem(4, info[0], info[1]);
            },
            divided: true,
          });
          item.push({
            label: `在“${
              this.$bus.goalTable.aspect[info[0]].children[info[1]].text
            }”前插入节点（方面）`,
            onClick: () => {
              this.addItem(3, info[0], info[1]);
            },
          });
          item.push({
            label: `在“${
              this.$bus.goalTable.aspect[info[0]].text
            }”下添加节点（方面）`,
            onClick: () => {
              this.addItem(2, info[0]);
            },
          });
          item.push({
            label: `删除节点“${
              this.$bus.goalTable.aspect[info[0]].children[info[1]].text
            }”（方面）`,
            onClick: () => {
              this.tempMsg = `您确定要删除节点“${
                this.$bus.goalTable.aspect[info[0]].children[info[1]].text
              }”（方面）吗？`;
              this.tempData = [1, info[0], info[1]];
              this.confirmDialog = true;
            },
            divided: true,
          });
          item.push({
            label: `在“${
              this.$bus.goalTable.aspect[info[0]].text
            }”前插入节点（业）`,
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
            label: `删除节点“${
              this.$bus.goalTable.aspect[info[0]].text
            }”（业）`,
            onClick: () => {
              this.tempMsg = `您确定要删除节点“${
                this.$bus.goalTable.aspect[info[0]].text
              }”（业）吗？`;
              this.tempData = [0, info[0]];
              this.confirmDialog = true;
            },
            divided: true,
          });
          item.push({
            label: `删除节点“${
              this.$bus.goalTable.aspect[info[0]].children[info[1]].children[
                info[2]
              ].text
            }”（项目）`,
            onClick: () => {
              this.tempMsg = `您确定要删除节点“${
                this.$bus.goalTable.aspect[info[0]].children[info[1]].children[
                  info[2]
                ].text
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
  created() {
    setTimeout(() => {
      this.hasInit = true;
    }, 10);
  },
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
  height: 100px;
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
  display: flex;
  height: 50px;
}
.sub-cell-item {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #333333;
  border: 1px solid #555;
  min-width: 0;
  width: 100%;
  transition: all 1s ease-in;
}
.item-label-l {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 1s ease-in;
}
.item-label-r {
  width: 0%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid #555;
  transition: all 1s ease-in;
}
.aspect-body-item {
  width: 100%;
  min-height: 100px;
  overflow: hidden;
  position: relative;
  border: 1px solid #555;
  box-sizing: border-box;
  color: #aaa;
  font-size: 16px;
  background-color: #cccccc;
  border-top: none;
  display: flex;
  font-weight: 700;
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
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d2d2d2;
  color: #2c3e50;
  border-right: 1px solid #555;
  min-width: 0;
  width: 100%;
  transition: all 1s ease-in;
}
.wrapper_1 {
  min-height: 99px;
  width: 200%;
  display: flex;
  flex-direction: column;
  min-width: 0;
  transition: all 1s ease-in;
}
.wrapper_2 {
  width: 100%;
  display: flex;
  border-bottom: 1px solid #555;
}
.wrapper_3 {
  width: 100%;
  box-sizing: border-box;
  border-right: 1px solid #555;
  min-width: 0;
  transition: all 1s ease-in;
}
.wrapper_4 {
  width: 100%;
  display: flex;
  flex-direction: column;
  min-width: 0;
  transition: all 1s ease-in;
}
.wrapper_5 {
  width: 100%;
  border-bottom: 1px solid #555;
}
.aspect-level-1 {
  min-height: 99px;
  height: 100%;
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

.item-label-l-0 {
  width: 30%;
}
.item-label-l-1 {
  width: 10%;
}
.item-label-l-2 {
  width: 15%;
}
.sub-cell-item-1-2 .item-label-l-2,
.aspect-level-0-2 .item-label-l-2 {
  width: 30%;
}
.aspect-level-1-2 .item-label-l-2 {
  width: 30%;
}
.item-label-l-3 {
  width: 100%;
}
.sub-cell-item-2-3 .item-label-l-3 {
  width: 100%;
}
.sub-cell-item-3-3 .item-label-l-3 {
  width: 100%;
}
.aspect-level-1 .item-label-l-3 {
  width: 100%;
}
.sub-cell-item-3-4 .item-label-l-4 {
  width: 100%;
}
.item-label-r-0 {
  width: 70%;
}
.item-label-r-1 {
  width: 90%;
}
.item-label-r-2 {
  width: 85%;
}
.sub-cell-item-1-2 .item-label-r-2,
.aspect-level-0-2 .item-label-r-2 {
  width: 70%;
}
.item-label-r-3 {
  width: 0%;
}
.sub-cell-item-2-3 .item-label-r-3 {
  width: 200%;
}
.sub-cell-item-3-3 .item-label-r-3 {
  width: 500%;
}
.aspect-level-1 .item-label-r-3 {
  width: 200%;
}
.wrapper_5 .aspect-level-1 .item-label-r-3 {
  width: 500%;
}
.sub-cell-item-3-4 .item-label-r-4 {
  width: 700%;
}
.wrapper_5 .aspect-level-1 .item-label-r-4 {
  width: 700%;
}
.sub-cell-item-1-0 {
  width: 100%;
}
.sub-cell-item-1-1 {
  width: 100%;
}
.sub-cell-item-1-2 {
  width: 100%;
}
.sub-cell-item-1-3 {
  width: 100%;
}
.sub-cell-item-1-4 {
  width: 100%;
}
.sub-cell-item-2-0 {
  width: 100%;
}
.sub-cell-item-2-1 {
  width: 0%;
}
.sub-cell-item-2-2 {
  width: 200%;
}
.sub-cell-item-2-3 {
  width: 300%;
}
.sub-cell-item-2-4 {
  width: 100%;
}
.sub-cell-item-3-0 {
  width: 100%;
}
.sub-cell-item-3-1 {
  width: 0%;
}
.sub-cell-item-3-2 {
  width: 0%;
}
.sub-cell-item-3-3 {
  width: 600%;
}
.sub-cell-item-3-4 {
  width: 800%;
}
.aspect-level-0-0 {
  width: 100%;
}
.aspect-level-0-1 {
  width: 100%;
}
.aspect-level-0-2 {
  width: 100%;
}
.aspect-level-0-3 {
  width: 100%;
}
.aspect-level-0-4 {
  width: 100%;
}
.wrapper_1-0 {
  width: 200%;
}
.wrapper_1-1 {
  width: 0%;
}
.wrapper_1-2 {
  width: 200%;
}
.wrapper_1-3 {
  width: 900%;
}
.wrapper_1-4 {
  width: 900%;
}
.wrapper_3-2 {
  width: 200%;
}
.wrapper_3-3 {
  width: 300%;
}
.wrapper_3-4 {
  width: 100%;
}
.wrapper_4-2 {
  width: 0%;
}
.wrapper_4-3 {
  width: 600%;
}
.wrapper_4-4 {
  width: 800%;
}
</style>