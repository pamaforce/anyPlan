<template>
  <div class="main-table">
    <div class="table-header">
      <div
        :class="['sup-prev-cell', { ani: needAni }]"
        ref="supPrevCell"
        v-for="(item, i) in supPrevList"
        :key="'supPrev' + i"
        :title="item.text"
      >
        <p>
          {{ item.text }}
        </p>
      </div>
      <div
        :class="['sup-cell', { ani: needAni }]"
        ref="supCell"
        v-for="(item, i) in supList"
        :key="'sup' + i"
        @click="supToAni(i)"
        :title="item.text"
      >
        <p>
          {{ item.text }}
        </p>
      </div>
      <div
        :class="['sub-cell', { ani: needAni }]"
        v-for="(item, i) in subList"
        :key="'sub' + i"
        ref="subCell"
        @click="subToAni(i)"
        :title="item.text"
      >
        <p>
          {{ item.text }}
        </p>
      </div>
      <div
        :class="['sub-next-cell', { ani: needAni }]"
        v-for="(item, i) in subNextList"
        :key="'subNext' + i"
        ref="subNextCell"
        :title="item.text"
      >
        <p>
          {{ item.text }}
        </p>
      </div>
    </div>
    <div
      class="table-body-item"
      v-for="(aspect, j) in goalTable.goalTree"
      :key="j"
    >
      <div
        :class="['body-sup-prev-cell', { ani: needAni }]"
        :ref="'supPrevCellBody' + j"
        v-for="(item, i) in supPrevListBody[j]"
        :key="'supPrevBody' + j + i"
        :title="item.text"
      >
        <p>
          {{ item.text }}
        </p>
      </div>
      <div
        :class="['body-sup-cell', { ani: needAni, border: needAni }]"
        :ref="'supCellBody' + j"
        v-for="(item, i) in supListBody[j]"
        :key="'supBody' + j + i"
        :title="item.text"
        @click="clickItem('up', j, i)"
      >
        <p v-if="!item.showInput">
          {{ item.text }}
        </p>
        <input
          v-else
          v-model="item.text"
          @blur="blurItem('up', j, i)"
          @keyup.enter="blurItem('up', j, i)"
        />
      </div>
      <div
        :class="['body-sub-cell', { ani: needAni }]"
        v-for="(item, i) in subListBody[j]"
        :key="'subBody' + j + i"
        :ref="'subCellBody' + j"
        :title="item.text"
        @click="clickItem('down', j, i)"
      >
        <p v-if="!item.showInput">
          {{ item.text }}
        </p>
        <input
          v-else
          v-model="item.text"
          @blur="blurItem('down', j, i)"
          @keyup.enter="blurItem('down', j, i)"
        />
      </div>
      <div
        :class="['body-sub-next-cell', { ani: needAni }]"
        v-for="(item, i) in subNextListBody[j]"
        :key="'subNextBody' + j + i"
        :ref="'subNextCellBody' + j"
        :title="item.text"
      >
        <p>
          {{ item.text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainTable",
  data: () => ({
    //初始深度
    currentDepth: 8,
    //出生日期时间戳
    initialTimeStamp: 539452800000,
    supList: [],
    supPrevList: [],
    subList: [],
    subNextList: [],
    supListBody: [],
    supPrevListBody: [],
    subListBody: [],
    subNextListBody: [],
    goalTable: {
      aspect: [],
      goalTree: [],
    },
    indexList: [0],
    needAni: false,
    birth: null,
    birthYear: "",
    changeNum: ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"],
  }),
  methods: {
    //点击Header底部事件处理
    subToAni(val) {
      if (this.needAni) return;
      if (this.currentDepth == 3) return;
      this.currentDepth--;
      this.indexList.push(val);
      this.subNextList = this.fetchHeaderData(this.currentDepth - 1);
      this.needAni = false;
      let width = 120;
      let supWidth = width * this.subList.length;
      let subWidth = width / this.subList.length;
      let nextWidth =
        (this.subList[val].span
          ? (width / this.subList[val].total) * this.subList[val].span
          : width / this.subList.length) / this.subNextList.length;
      let newNextWidth = width / this.subNextList.length;
      let leftTotal = 0;
      this.$nextTick(() => {
        let subLeftTotal = 0;
        for (let i = 0; i < val; i++) {
          subLeftTotal += this.subList[i].span
            ? ((subWidth * this.subList.length) / this.subList[i].total) *
              this.subList[i].span
            : subWidth;
        }
        this.$refs.subNextCell?.map((item, i) => {
          this.$refs.subNextCell[i].style.top = "6.4rem";
          this.$refs.subNextCell[i].style.width = this.subNextList[i].span
            ? ((nextWidth * this.subNextList.length) /
                this.subNextList[i].total) *
                this.subNextList[i].span +
              "rem"
            : nextWidth + "rem";
          if (i > 0)
            leftTotal += this.subNextList[i - 1].span
              ? ((nextWidth * this.subNextList.length) /
                  this.subNextList[i - 1].total) *
                this.subNextList[i - 1].span
              : nextWidth;
          this.$refs.subNextCell[i].style.left =
            subLeftTotal + leftTotal + "rem";
        });
      });
      setTimeout(() => {
        this.needAni = true;
        this.$refs.supCell?.map((item, i) => {
          this.$refs.supCell[i].style.top = "-3.125rem";
          this.$refs.supCell[i].style.width = supWidth + "rem";
          this.$refs.supCell[i].style.left =
            supWidth * (i - this.indexList[7 - this.currentDepth] || 0) -
            width * val +
            "rem";
        });
        this.$refs.subCell?.map((item, i) => {
          this.$refs.subCell[i].style.top = 0;
          this.$refs.subCell[i].style.width = width + "rem";
          this.$refs.subCell[i].style.left = width * (i - val) + "rem";
        });
        let leftTotal = 0;
        this.$refs.subNextCell?.map((item, i) => {
          this.$refs.subNextCell[i].style.top = "3.125rem";
          this.$refs.subNextCell[i].style.width = this.subNextList[i].span
            ? ((newNextWidth * this.subNextList.length) /
                this.subNextList[i].total) *
                this.subNextList[i].span +
              "rem"
            : newNextWidth + "rem";
          if (i > 0)
            leftTotal += this.subNextList[i - 1].span
              ? ((newNextWidth * this.subNextList.length) /
                  this.subNextList[i - 1].total) *
                this.subNextList[i - 1].span
              : newNextWidth;
          this.$refs.subNextCell[i].style.left = leftTotal + "rem";
        });
        setTimeout(() => {
          this.rebuildHeader("down", val);
        }, 2000);
      });
      this.subBodyToAni(val);
    },
    //点击Header顶部事件处理
    supToAni(val) {
      if (this.needAni) return;
      if (this.currentDepth == 8) return;
      this.currentDepth++;
      this.supPrevList = this.fetchHeaderData(this.currentDepth);
      this.needAni = false;
      let width = 120;
      let supWidth = width / this.supList.length;
      let subWidth =
        (this.supList[val].span
          ? (width / this.supList[val].total) * this.supList[val].span
          : supWidth) / this.subList.length;
      let prevWidth = width * this.supList.length;
      this.$nextTick(() => {
        this.$refs.supPrevCell?.map((item, i) => {
          this.$refs.supPrevCell[i].style.top = "-3.125rem";
          this.$refs.supPrevCell[i].style.width = prevWidth + "rem";
          this.$refs.supPrevCell[i].style.left =
            prevWidth * (i - this.indexList[8 - this.currentDepth]) -
            width * val +
            "rem";
        });
      });
      setTimeout(() => {
        this.needAni = true;
        this.$refs.supPrevCell?.map((item, i) => {
          this.$refs.supPrevCell[i].style.top = 0;
          this.$refs.supPrevCell[i].style.width = width + "rem";
          this.$refs.supPrevCell[i].style.left =
            width * (i - this.indexList[8 - this.currentDepth]) + "rem";
        });
        let leftTotal = 0;
        this.$refs.supCell?.map((item, i) => {
          this.$refs.supCell[i].style.top = "3.125rem";
          this.$refs.supCell[i].style.width = this.supList[i].span
            ? ((supWidth * this.supList.length) / this.supList[i].total) *
                this.supList[i].span +
              "rem"
            : supWidth + "rem";
          if (i > 0)
            leftTotal += this.supList[i - 1].span
              ? ((supWidth * this.supList.length) / this.supList[i - 1].total) *
                this.supList[i - 1].span
              : supWidth;
          this.$refs.supCell[i].style.left = leftTotal + "rem";
        });
        let subLeftTotal = 0;
        for (let i = 0; i < val; i++) {
          subLeftTotal += this.supList[i].span
            ? ((supWidth * this.supList.length) / this.supList[i].total) *
              this.supList[i].span
            : supWidth;
        }
        this.$refs.subCell?.map((item, i) => {
          this.$refs.subCell[i].style.top = "6.4rem";
          this.$refs.subCell[i].style.width = subWidth + "rem";
          this.$refs.subCell[i].style.left =
            subLeftTotal + subWidth * i + "rem";
        });
        setTimeout(() => {
          this.rebuildHeader("up", val);
        }, 2000);
      });
      this.supBodyToAni(val);
    },
    //重新构建Header结构
    rebuildHeader(type, val) {
      switch (type) {
        case "down":
          this.subList.forEach((item) => {
            item.parentIndex = this.indexList[7 - this.currentDepth] || 0;
          });
          this.supList = this.subList;
          this.subNextList.forEach((item) => {
            item.parentIndex = val;
          });
          this.subList = this.subNextList;
          break;
        case "up":
          this.supList.forEach((item) => {
            item.parentIndex = this.indexList[8 - this.currentDepth];
          });
          this.subList = this.supList;
          this.supPrevList.forEach((item) => {
            item.parentIndex = this.indexList[7 - this.currentDepth] || 0;
          });
          this.supList = this.supPrevList;
          break;

        default:
          break;
      }
      this.initHeaderStyle(type, val);
    },
    //获取Header数据
    fetchHeaderData(depth) {
      let tempList = [],
        tempSum = 0,
        tempNum = 0,
        tempYear,
        tempMonth,
        tempDate,
        tempArr;
      switch (depth) {
        case 8:
          return [
            {
              text: `一生 ${this.birthYear}-${this.birthYear + 100} 100年`,
              parentIndex: 0,
            },
          ];
        case 7:
          tempList = [];
          for (let i = 0; i < 20; i++) {
            tempList.push({
              text: `${i + 1}期 ${this.birthYear + 5 * i}-${
                this.birthYear + 5 * i + 4
              } ${5 * i}岁-${5 * i + 4}岁`,
              parentIndex: this.indexList[1],
            });
          }
          return tempList;
        case 6:
          tempList = [];
          for (let i = 0; i < 5; i++) {
            tempList.push({
              text: `${this.birthYear + 5 * this.indexList[1] + i}年 ${
                5 * this.indexList[1] + i
              }岁`,
              parentIndex: this.indexList[2],
            });
          }
          return tempList;
        case 5:
          tempList = [];
          for (let i = 0; i < 4; i++) {
            tempList.push({
              text: `第${this.changeNum[i + 1]}季度 ${i * 3 + 1}月-${
                i * 3 + 3
              }月`,
              parentIndex: this.indexList[3],
            });
          }
          return tempList;
        case 4:
          tempList = [];
          for (let i = 0; i < 3; i++) {
            tempList.push({
              text: `${
                this.birthYear + this.indexList[1] * 5 + this.indexList[2]
              }年 ${3 * this.indexList[3] + i + 1}月`,
              parentIndex: this.indexList[4],
            });
          }
          return tempList;
        case 3:
          tempList = [];
          tempSum = 0;
          tempNum = 0;
          tempYear = this.birthYear + this.indexList[1] * 5 + this.indexList[2];
          tempMonth = this.indexList[3] * 3 + this.indexList[4];
          tempDate = new Date(tempYear, 0, 1);
          tempArr = [
            31,
            (tempYear % 4 === 0 && tempYear % 100 !== 0) || tempYear % 400 === 0
              ? 29
              : 28,
            31,
            30,
            31,
            30,
            31,
            31,
            30,
            31,
            30,
            31,
          ];
          for (let i = 0; i < tempMonth; i++) {
            tempSum += tempArr[i];
          }
          for (let i = 0; i < tempArr[tempMonth]; i++) {
            if (
              tempSum % 7 === 7 - tempDate.getDay() ||
              i === tempArr[tempMonth] - 1
            ) {
              tempList.push({
                text: `第${parseInt(tempSum / 7) + 1}周 ${
                  tempNum === i
                    ? (i === 0 ? "~" : "") +
                      (i + 1) +
                      "号" +
                      (i === tempArr[tempMonth] - 1 ? "~" : "")
                    : tempNum + 1 + "号-" + (i + 1) + "号"
                }`,
                parentIndex: this.indexList[5],
                span: i - tempNum + 1,
                total: tempArr[tempMonth],
              });
              tempNum = i + 1;
            }
            tempSum++;
          }
          console.log(tempList);
          return tempList;
        case 2:
          tempList = [];
          tempSum = 0;
          tempArr = this.fetchHeaderData(3);
          for (let i = 0; i < this.indexList[5]; i++) {
            tempSum += tempArr[i].span;
          }
          for (let i = 0; i < tempArr[this.indexList[5]].span; i++) {
            tempList.push({
              text: `${tempSum + i + 1}号`,
              parentIndex: this.indexList[6],
            });
          }
          return tempList;
        default:
          break;
      }
      return [];
    },
    //初始化Header样式
    initHeaderStyle(type, val) {
      this.$nextTick(() => {
        this.needAni = false;
        let width = 120;
        let subWidth = width / this.subList.length;
        let nextWidth = subWidth / this.subNextList.length;
        let prevWidth = width * this.supList.length;
        this.$refs.supPrevCell?.map((item, i) => {
          this.$refs.supPrevCell[i].style.top = "-3.125rem";
          this.$refs.supPrevCell[i].style.width = prevWidth + "rem";
          this.$refs.supPrevCell[i].style.left =
            prevWidth * (i - this.indexList[8 - this.currentDepth]) -
            width * val +
            "rem";
        });
        this.$refs.supCell?.map((item, i) => {
          this.$refs.supCell[i].style.top = 0;
          this.$refs.supCell[i].style.width = width + "rem";
          this.$refs.supCell[i].style.left =
            width *
              (i -
                (type === "up" ? this.indexList[8 - this.currentDepth] : val)) +
            "rem";
        });
        let leftTotal = 0;
        this.$refs.subCell?.map((item, i) => {
          this.$refs.subCell[i].style.top = "3.125rem";
          this.$refs.subCell[i].style.width = this.subList[i].span
            ? ((subWidth * this.subList.length) / this.subList[i].total) *
                this.subList[i].span +
              "rem"
            : subWidth + "rem";
          if (i > 0)
            leftTotal += this.subList[i - 1].span
              ? ((subWidth * this.subList.length) / this.subList[i - 1].total) *
                this.subList[i - 1].span
              : subWidth;
          this.$refs.subCell[i].style.left = leftTotal + "rem";
        });
        this.$refs.subNextCell?.map((item, i) => {
          this.$refs.subNextCell[i].style.top = "6.4rem";
          this.$refs.subNextCell[i].style.width = nextWidth + "rem";
          this.$refs.subNextCell[i].style.left = nextWidth * i + "rem";
        });
        if (type === "up") {
          this.indexList.pop();
        }
      });
    },
    //Body下钻动画
    subBodyToAni(val) {
      for (let i = 0; i < this.goalTable.goalTree.length; i++) {
        this.subNextListBody[i] = this.fetchBodyData(this.currentDepth - 1, i);
      }
      this.needAni = false;
      let width = 120;
      let supWidth = width * this.subListBody[0].length;
      let subWidth = width / this.subListBody[0].length;
      let nextWidth =
        (this.subListBody[0][val].span
          ? (width / this.subListBody[0][val].total) *
            this.subListBody[0][val].span
          : width / this.subListBody[0].length) /
        this.subNextListBody[0].length;
      let newNextWidth = width / this.subNextListBody[0].length;
      this.$nextTick(() => {
        let subLeftTotal = 0;
        for (let i = 0; i < val; i++) {
          subLeftTotal += this.subListBody[0][i].span
            ? ((subWidth * this.subListBody[0].length) /
                this.subListBody[0][i].total) *
              this.subListBody[0][i].span
            : subWidth;
        }
        for (let j = 0; j < this.goalTable.goalTree.length; j++) {
          let leftTotal = 0;
          this.$refs["subNextCellBody" + j]?.map((item, i) => {
            this.$refs["subNextCellBody" + j][i].style.top = "6.4rem";
            this.$refs["subNextCellBody" + j][i].style.width = this
              .subNextListBody[j][i].span
              ? ((nextWidth * this.subNextListBody[j].length) /
                  this.subNextListBody[j][i].total) *
                  this.subNextListBody[j][i].span +
                "rem"
              : nextWidth + "rem";
            if (i > 0)
              leftTotal += this.subNextListBody[j][i - 1].span
                ? ((nextWidth * this.subNextListBody[j].length) /
                    this.subNextListBody[j][i - 1].total) *
                  this.subNextListBody[j][i - 1].span
                : nextWidth;
            this.$refs["subNextCellBody" + j][i].style.left =
              subLeftTotal + leftTotal + "rem";
          });
        }
      });
      setTimeout(() => {
        this.needAni = true;
        for (let j = 0; j < this.goalTable.goalTree.length; j++) {
          this.$refs["supCellBody" + j]?.map((item, i) => {
            this.$refs["supCellBody" + j][i].style.top = "-3.125rem";
            this.$refs["supCellBody" + j][i].style.width = supWidth + "rem";
            this.$refs["supCellBody" + j][i].style.left =
              supWidth * (i - this.indexList[7 - this.currentDepth] || 0) -
              width * val +
              "rem";
          });
        }
        for (let j = 0; j < this.goalTable.goalTree.length; j++) {
          this.$refs["subCellBody" + j]?.map((item, i) => {
            this.$refs["subCellBody" + j][i].style.top = 0;
            this.$refs["subCellBody" + j][i].style.width = width + "rem";
            this.$refs["subCellBody" + j][i].style.left =
              width * (i - val) + "rem";
          });
        }
        for (let j = 0; j < this.goalTable.goalTree.length; j++) {
          let leftTotal = 0;
          this.$refs["subNextCellBody" + j]?.map((item, i) => {
            this.$refs["subNextCellBody" + j][i].style.top = "3.125rem";
            this.$refs["subNextCellBody" + j][i].style.width = this
              .subNextListBody[j][i].span
              ? ((newNextWidth * this.subNextListBody[j].length) /
                  this.subNextListBody[j][i].total) *
                  this.subNextListBody[j][i].span +
                "rem"
              : newNextWidth + "rem";
            if (i > 0)
              leftTotal += this.subNextListBody[j][i - 1].span
                ? ((newNextWidth * this.subNextListBody[j].length) /
                    this.subNextListBody[j][i - 1].total) *
                  this.subNextListBody[j][i - 1].span
                : newNextWidth;
            this.$refs["subNextCellBody" + j][i].style.left = leftTotal + "rem";
          });
        }
        setTimeout(() => {
          this.rebuildBody("down", val);
        }, 2000);
      });
    },
    //Body上钻动画
    supBodyToAni(val) {
      for (let i = 0; i < this.goalTable.goalTree.length; i++) {
        this.supPrevListBody[i] = this.fetchBodyData(this.currentDepth, i);
      }
      this.needAni = false;
      let width = 120;
      let supWidth = width / this.supListBody[0].length;
      let subWidth =
        (this.supListBody[0][val].span
          ? (width / this.supListBody[0][val].total) *
            this.supListBody[0][val].span
          : supWidth) / this.subListBody[0].length;
      let prevWidth = width * this.supListBody[0].length;
      this.$nextTick(() => {
        for (let j = 0; j < this.goalTable.goalTree.length; j++) {
          this.$refs["supPrevCellBody" + j]?.map((item, i) => {
            this.$refs["supPrevCellBody" + j][i].style.top = "-3.125rem";
            this.$refs["supPrevCellBody" + j][i].style.width =
              prevWidth + "rem";
            this.$refs["supPrevCellBody" + j][i].style.left =
              prevWidth * (i - this.indexList[8 - this.currentDepth]) -
              width * val +
              "rem";
          });
        }
      });
      setTimeout(() => {
        this.needAni = true;
        for (let j = 0; j < this.goalTable.goalTree.length; j++) {
          this.$refs["supPrevCellBody" + j]?.map((item, i) => {
            this.$refs["supPrevCellBody" + j][i].style.top = 0;
            this.$refs["supPrevCellBody" + j][i].style.width = width + "rem";
            this.$refs["supPrevCellBody" + j][i].style.left =
              width * (i - this.indexList[8 - this.currentDepth]) + "rem";
          });
          let leftTotal = 0;
          this.$refs["supCellBody" + j]?.map((item, i) => {
            this.$refs["supCellBody" + j][i].style.top = "3.125rem";
            this.$refs["supCellBody" + j][i].style.width = this.supListBody[j][
              i
            ].span
              ? ((supWidth * this.supListBody[j].length) /
                  this.supListBody[j][i].total) *
                  this.supListBody[j][i].span +
                "rem"
              : supWidth + "rem";
            if (i > 0)
              leftTotal += this.supListBody[j][i - 1].span
                ? ((supWidth * this.supListBody[j].length) /
                    this.supListBody[j][i - 1].total) *
                  this.supListBody[j][i - 1].span
                : supWidth;
            this.$refs["supCellBody" + j][i].style.left = leftTotal + "rem";
          });
          let subLeftTotal = 0;
          for (let i = 0; i < val; i++) {
            subLeftTotal += this.supListBody[j][i].span
              ? ((supWidth * this.supListBody[j].length) /
                  this.supListBody[j][i].total) *
                this.supListBody[j][i].span
              : supWidth;
          }
          this.$refs["subCellBody" + j]?.map((item, i) => {
            this.$refs["subCellBody" + j][i].style.top = "6.4rem";
            this.$refs["subCellBody" + j][i].style.width = subWidth + "rem";
            this.$refs["subCellBody" + j][i].style.left =
              subLeftTotal + subWidth * i + "rem";
          });
        }
        setTimeout(() => {
          this.rebuildBody("up", val);
        }, 2000);
      });
    },
    //重新构建Body结构
    rebuildBody(type, val) {
      switch (type) {
        case "down":
          for (let i = 0; i < this.goalTable.goalTree.length; i++) {
            this.supListBody[i] = this.subListBody[i];
            this.subListBody[i] = this.subNextListBody[i];
          }
          break;
        case "up":
          for (let i = 0; i < this.goalTable.goalTree.length; i++) {
            this.subListBody[i] = this.supListBody[i];
            this.supListBody[i] = this.supPrevListBody[i];
          }
          break;

        default:
          break;
      }
      this.$forceUpdate();
      for (let i = 0; i < this.goalTable.goalTree.length; i++) {
        this.initBodyStyle(type, i, val);
      }
    },
    //初始化Body样式
    initBodyStyle(type, row, val) {
      this.$nextTick(() => {
        this.needAni = false;
        let width = 120;
        let subWidth = width / this.subListBody[row].length;
        let nextWidth = subWidth / this.subNextListBody[row]?.length;
        let prevWidth = width * this.supListBody[row].length;
        this.$refs["supPrevCellBody" + row]?.map((item, i) => {
          this.$refs["supPrevCellBody" + row][i].style.top = "-3.125rem";
          this.$refs["supPrevCellBody" + row][i].style.width =
            prevWidth + "rem";
          this.$refs["supPrevCellBody" + row][i].style.left =
            prevWidth * (i - this.indexList[8 - this.currentDepth]) -
            width * val +
            "rem";
        });
        this.$refs["supCellBody" + row]?.map((item, i) => {
          this.$refs["supCellBody" + row][i].style.top = 0;
          this.$refs["supCellBody" + row][i].style.width = width + "rem";
          this.$refs["supCellBody" + row][i].style.left =
            width *
              (i -
                (type === "up" ? this.indexList[8 - this.currentDepth] : val)) +
            "rem";
        });
        let leftTotal = 0;
        this.$refs["subCellBody" + row]?.map((item, i) => {
          this.$refs["subCellBody" + row][i].style.top = "3.125rem";
          this.$refs["subCellBody" + row][i].style.width = this.subListBody[
            row
          ][i]?.span
            ? ((subWidth * this.subListBody[row].length) /
                this.subListBody[row][i].total) *
                this.subListBody[row][i].span +
              "rem"
            : subWidth + "rem";
          if (i > 0)
            leftTotal += this.subListBody[row][i - 1]?.span
              ? ((subWidth * this.subListBody[row].length) /
                  this.subListBody[row][i - 1].total) *
                this.subListBody[row][i - 1].span
              : subWidth;
          this.$refs["subCellBody" + row][i].style.left = leftTotal + "rem";
        });
        this.$refs["subNextCellBody" + row]?.map((item, i) => {
          this.$refs["subNextCellBody" + row][i].style.top = "6.4rem";
          this.$refs["subNextCellBody" + row][i].style.width =
            nextWidth + "rem";
          this.$refs["subNextCellBody" + row][i].style.left =
            nextWidth * i + "rem";
        });
      });
    },
    fetchBodyData(depth, row) {
      let tempList = [],
        tempSum = 0,
        tempNum = 0,
        tempCnt = 0,
        tempYear,
        tempMonth,
        tempDate,
        tempArr;
      switch (depth) {
        case 8:
          return [
            {
              text: this.goalTable.goalTree[row]?.[0]?.desc ?? "",
              showInput: false,
            },
          ];
        case 7:
          tempList = [];
          for (let i = 0; i < 20; i++) {
            tempList.push({
              text: this.goalTable.goalTree[row]?.[0]?.[i]?.desc ?? "",
              showInput: false,
            });
          }
          return tempList;
        case 6:
          tempList = [];
          for (let i = 0; i < 5; i++) {
            tempList.push({
              text:
                this.goalTable.goalTree[row]?.[0]?.[this.indexList[1]]?.[i]
                  ?.desc ?? "",
              showInput: false,
            });
          }
          return tempList;
        case 5:
          tempList = [];
          for (let i = 0; i < 4; i++) {
            tempList.push({
              text:
                this.goalTable.goalTree[row]?.[0]?.[this.indexList[1]]?.[
                  this.indexList[2]
                ]?.[i]?.desc ?? "",
              showInput: false,
            });
          }
          return tempList;
        case 4:
          tempList = [];
          for (let i = 0; i < 3; i++) {
            tempList.push({
              text:
                this.goalTable.goalTree[row]?.[0]?.[this.indexList[1]]?.[
                  this.indexList[2]
                ]?.[this.indexList[3]]?.[i]?.desc ?? "",
              showInput: false,
            });
          }
          return tempList;

        case 3:
          tempList = [];
          tempSum = 0;
          tempNum = 0;
          tempCnt = 0;
          tempYear = this.birthYear + this.indexList[1] * 5 + this.indexList[2];
          tempMonth = this.indexList[3] * 3 + this.indexList[4];
          tempDate = new Date(tempYear, 0, 1);
          tempArr = [
            31,
            (tempYear % 4 === 0 && tempYear % 100 !== 0) || tempYear % 400 === 0
              ? 29
              : 28,
            31,
            30,
            31,
            30,
            31,
            31,
            30,
            31,
            30,
            31,
          ];
          for (let i = 0; i < tempMonth; i++) {
            tempSum += tempArr[i];
          }
          for (let i = 0; i < tempArr[tempMonth]; i++) {
            if (
              tempSum % 7 === 7 - tempDate.getDay() ||
              i === tempArr[tempMonth] - 1
            ) {
              tempList.push({
                text:
                  this.goalTable.goalTree[row]?.[0]?.[this.indexList[1]]?.[
                    this.indexList[2]
                  ]?.[this.indexList[3]]?.[this.indexList[4]]?.[tempCnt]
                    ?.desc ?? "",
                showInput: false,
                span: i - tempNum + 1,
                total: tempArr[tempMonth],
              });
              tempCnt++;
              tempNum = i + 1;
            }
            tempSum++;
          }
          console.log(tempList);
          return tempList;
        case 2:
          tempList = [];
          tempSum = 0;
          tempArr = this.fetchBodyData(3, row);
          for (let i = 0; i < this.indexList[5]; i++) {
            tempSum += tempArr[i].span;
          }
          for (let i = 0; i < tempArr[this.indexList[5]].span; i++) {
            tempList.push({
              text:
                this.goalTable.goalTree[row]?.[0]?.[this.indexList[1]]?.[
                  this.indexList[2]
                ]?.[this.indexList[3]]?.[this.indexList[4]]?.[
                  this.indexList[5]
                ]?.[i]?.desc ?? "",
              showInput: false,
            });
          }
          return tempList;
        default:
          break;
      }
      return tempList;
    },
    initData() {
      this.goalTable = JSON.parse(
        window.localStorage.getItem("anyPlanUserData") ||
          JSON.stringify({
            aspect: [],
            goalTree: [{}, {}, {}],
          })
      );
      this.birth = new Date(this.initialTimeStamp);
      this.birthYear = this.birth.getFullYear();
      this.supList = this.fetchHeaderData(this.currentDepth);
      this.subList = this.fetchHeaderData(this.currentDepth - 1);
      for (let i = 0; i < this.goalTable.goalTree.length; i++) {
        this.supListBody[i] = this.fetchBodyData(this.currentDepth, i);
        this.subListBody[i] = this.fetchBodyData(this.currentDepth - 1, i);
      }
    },
    //点击单元格
    clickItem(type, row, val) {
      if (type === "up") {
        this.supListBody[row][val].showInput = true;
      } else {
        this.subListBody[row][val].showInput = true;
      }
      this.$forceUpdate();
      this.$nextTick(() => {
        document.querySelector("input")?.focus();
        document.querySelector("input")?.select();
      });
    },
    //输入框失焦
    blurItem(type, row, val) {
      console.log(this.indexList);
      console.log(this.currentDepth);
      let tempObj = this.goalTable.goalTree[row];
      for (let i = 0; i <= 8 - this.currentDepth; i++) {
        if (!tempObj[this.indexList[i]]) {
          tempObj[this.indexList[i]] = {
            desc: "",
          };
        }
        tempObj = tempObj[this.indexList[i]];
      }
      if (type === "up") {
        this.supListBody[row][val].showInput = false;
        if (!tempObj) tempObj = { desc: "" };
        tempObj.desc = this.supListBody[row][val].text;
      } else {
        this.subListBody[row][val].showInput = false;
        if (!tempObj) tempObj = { desc: "" };
        if (!tempObj[val]) tempObj[val] = { desc: "" };
        tempObj[val].desc = this.subListBody[row][val].text;
      }
      this.$forceUpdate();
      this.saveData();
    },
    saveData() {
      console.log(this.goalTable);
      window.localStorage.setItem(
        "anyPlanUserData",
        JSON.stringify(this.goalTable)
      );
    },
  },
  created() {
    this.initData();
  },
  mounted() {
    this.initHeaderStyle("down", 0);
    for (let i = 0; i < this.goalTable.goalTree.length; i++) {
      this.initBodyStyle("down", i, 0);
    }
  },
};
</script>

<style scoped>
.main-table {
  width: 1920px;
}
.table-header {
  width: 1920px;
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
.table-header div p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 10px;
  margin: 0;
}
.table-body-item {
  width: 1920px;
  height: 100px;
  overflow: hidden;
  position: relative;
  border: 1px solid #555;
  box-sizing: border-box;
  color: #aaa;
  font-size: 16px;
  background-color: #cccccc;
  border-top: none;
}
.table-body-item div p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 10px;
  margin: 0;
}
.table-body-item div input {
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
.sup-prev-cell {
  position: absolute;
  top: -50px;
  left: 0px;
  width: 1920px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #333333;
  border: 1px solid #555;
}
.body-sup-prev-cell {
  position: absolute;
  top: -50px;
  left: 0px;
  width: 1920px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d2d2d2;
  color: #2c3e50;
  border: 1px solid #555;
}
.sup-cell {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 1920px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #333333;
  border: 1px solid #555;
}
.body-sup-cell {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 1920px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d2d2d2;
  color: #2c3e50;
  border: 1px solid #555;
  border-top: none;
}
.border {
  border: 1px solid #555 !important;
}
.sub-cell {
  position: absolute;
  top: 50px;
  left: 0;
  width: 1920px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #333333;
  border: 1px solid #555;
}
.body-sub-cell {
  position: absolute;
  top: 50px;
  left: 0;
  width: 1920px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d2d2d2;
  color: #2c3e50;
  border: 1px solid #555;
}
.sub-next-cell {
  position: absolute;
  top: 100px;
  left: 0;
  width: 1920px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #333333;
  border: 1px solid #555;
}
.body-sub-next-cell {
  position: absolute;
  top: 100px;
  left: 0;
  width: 1920px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d2d2d2;
  color: #2c3e50;
  border: 1px solid #555;
}
.ani {
  transition: all 2s;
}
</style>
