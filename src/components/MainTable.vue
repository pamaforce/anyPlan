<template>
  <div class="main-table" ref="table">
    <div class="table-header no-select" ref="tableHeader">
      <template v-for="(item, i) in supPrevList">
        <div
          v-if="!item.hide"
          :class="['sup-prev-cell', { ani: needAni && hasAni }]"
          :style="
            (item.top !== undefined ? 'top:' + item.top + 'rem;' : '') +
            (item.width !== undefined ? 'width:' + item.width + 'rem;' : '') +
            (item.left !== undefined ? 'left:' + item.left + 'rem;' : '') +
            (item.marginLeft !== undefined
              ? 'margin-left:' + item.marginLeft + 'rem;'
              : '')
          "
          :key="'supPrev' + i"
          ref="supPrevCell"
          :title="item.text"
        >
          <p>
            {{ item.text }}
          </p>
        </div>
      </template>
      <template v-for="(item, i) in subNextList">
        <div
          v-if="!item.hide"
          :class="['sub-next-cell', { ani: needAni && hasAni }]"
          :style="
            (item.top !== undefined ? 'top:' + item.top + 'rem;' : '') +
            (item.width !== undefined ? 'width:' + item.width + 'rem;' : '') +
            (item.left !== undefined ? 'left:' + item.left + 'rem;' : '') +
            (item.marginLeft !== undefined
              ? 'margin-left:' + item.marginLeft + 'rem;'
              : '')
          "
          :key="'subNext' + i"
          ref="subNextCell"
          :title="item.text"
        >
          <p>
            {{ item.text }}
          </p>
        </div>
      </template>
      <template v-for="(item, i) in supList">
        <div
          v-if="!item.hide"
          :class="['sup-cell', { ani: needAni && hasAni }]"
          :style="
            (item.top !== undefined ? 'top:' + item.top + 'rem;' : '') +
            (item.width !== undefined ? 'width:' + item.width + 'rem;' : '') +
            (item.left !== undefined ? 'left:' + item.left + 'rem;' : '') +
            (item.marginLeft !== undefined
              ? 'margin-left:' + item.marginLeft + 'rem;'
              : '')
          "
          :key="'sup' + i"
          ref="supCell"
          @click="supToAni(i)"
          :title="item.text"
        >
          <p>
            {{ item.text }}
          </p>
        </div>
      </template>
      <template v-for="(item, i) in subList">
        <div
          v-if="!item.hide"
          :class="['sub-cell', { ani: needAni && hasAni }]"
          :style="
            (item.top !== undefined ? 'top:' + item.top + 'rem;' : '') +
            (item.width !== undefined ? 'width:' + item.width + 'rem;' : '') +
            (item.left !== undefined ? 'left:' + item.left + 'rem;' : '') +
            (item.marginLeft !== undefined
              ? 'margin-left:' + item.marginLeft + 'rem;'
              : '')
          "
          :key="'sub' + i"
          ref="subCell"
          @click="subToAni(i)"
          :title="item.text"
        >
          <p>
            {{ item.text }}
          </p>
        </div>
      </template>
    </div>
    <div class="table-body-wrapper" @scroll="handleScroll" ref="tableBody">
      <div
        class="table-body-item"
        v-for="(aspect, j) in data.goalTree"
        :key="j"
        :style="
          (marginLeft !== undefined
            ? 'margin-left:' + marginLeft + 'rem;'
            : '') + (left !== undefined ? 'left:' + left + 'rem;' : '')
        "
      >
        <template v-for="(item, i) in supPrevListBody[j]">
          <div
            v-if="!item.hide"
            :class="['body-sup-prev-cell', { ani: needAni && hasAni }]"
            :style="
              (item.top !== undefined ? 'top:' + item.top + 'rem;' : '') +
              (item.width !== undefined ? 'width:' + item.width + 'rem;' : '') +
              (item.left !== undefined ? 'left:' + item.left + 'rem;' : '') +
              (item.marginLeft !== undefined
                ? 'margin-left:' + item.marginLeft + 'rem;'
                : '')
            "
            :key="'supPrevBody' + j + i"
            :ref="'supPrevCellBody' + j"
            :title="item.text"
          >
            <p>
              {{ item.text }}
            </p>
          </div>
        </template>
        <template v-for="(item, i) in subNextListBody[j]">
          <div
            v-if="!item.hide"
            :class="['body-sub-next-cell', { ani: needAni && hasAni }]"
            :style="
              (item.top !== undefined ? 'top:' + item.top + 'rem;' : '') +
              (item.width !== undefined ? 'width:' + item.width + 'rem;' : '') +
              (item.left !== undefined ? 'left:' + item.left + 'rem;' : '') +
              (item.marginLeft !== undefined
                ? 'margin-left:' + item.marginLeft + 'rem;'
                : '')
            "
            :key="'subNextBody' + j + i"
            :ref="'subNextCellBody' + j"
            :title="item.text"
          >
            <p>
              {{ item.text }}
            </p>
          </div>
        </template>
        <template v-for="(item, i) in supListBody[j]">
          <div
            v-if="!item.hide"
            :class="[
              'body-sup-cell',
              { ani: needAni && hasAni, border: needAni },
            ]"
            :style="
              (item.top !== undefined ? 'top:' + item.top + 'rem;' : '') +
              (item.width !== undefined ? 'width:' + item.width + 'rem;' : '') +
              (item.left !== undefined ? 'left:' + item.left + 'rem;' : '') +
              (item.marginLeft !== undefined
                ? 'margin-left:' + item.marginLeft + 'rem;'
                : '')
            "
            :key="'supBody' + j + i"
            :ref="'supCellBody' + j"
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
        </template>
        <template v-for="(item, i) in subListBody[j]">
          <div
            v-if="!item.hide"
            :class="[
              'body-sub-cell',
              { ani: needAni && hasAni, border: needAni },
            ]"
            :style="
              (item.top !== undefined ? 'top:' + item.top + 'rem;' : '') +
              (item.width !== undefined ? 'width:' + item.width + 'rem;' : '') +
              (item.left !== undefined ? 'left:' + item.left + 'rem;' : '') +
              (item.marginLeft !== undefined
                ? 'margin-left:' + item.marginLeft + 'rem;'
                : '')
            "
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
        </template>
      </div>
      <div class="content" ref="content"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainTable",
  props: {
    data: {
      type: Object,
      default: () => ({
        aspect: [],
        goalTree: [],
      }),
    },
    hasAni: {
      type: Boolean,
      default: () => true,
    },
  },
  data: () => ({
    //初始深度
    currentDepth: 8,
    tableWidth: 120,
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
    indexList: [0],
    needAni: false,
    birth: null,
    birthYear: "",
    changeNum: ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"],
    canInput: true,
    pauseScroll: false,
    baseOffset: 0,
    cacheNum: 0,
    marginLeft: 0,
    left: 0,
  }),
  methods: {
    handleScrollX() {
      if (this.pauseScroll) return;
      let basePx = parseFloat(
        document.getElementsByTagName("html")[0].style.fontSize.split("px")[0]
      );
      let left = (this.$refs.tableBody.scrollLeft - this.baseOffset) / basePx;
      this.marginLeft = left;
      this.supPrevList.map((item, i) => {
        this.supPrevList[i].marginLeft = -left;
      });
      this.subNextList.map((item, i) => {
        this.subNextList[i].marginLeft = -left;
      });
      this.supList.map((item, i) => {
        this.supList[i].marginLeft = -left;
        let temp = this.supList[i].left - left;
        let hide = temp > 240 || temp < -120;
        this.supList[i].hide = hide;
      });
      this.subList.map((item, i) => {
        this.subList[i].marginLeft = -left;
        let temp = this.subList[i].left - left;
        let hide = temp > 240 || temp < -120;
        this.subList[i].hide = hide;
      });
      for (let j = 0; j < this.data.goalTree.length; j++) {
        this.supPrevListBody[j]?.map((item, i) => {
          this.supPrevListBody[j][i].marginLeft = -left;
        });
        this.subNextListBody[j]?.map((item, i) => {
          this.subNextListBody[j][i].marginLeft = -left;
        });
        this.supListBody[j].map((item, i) => {
          this.supListBody[j][i].marginLeft = -left;
          let temp = this.supListBody[j][i].left - left;
          let hide = temp > 240 || temp < -120;
          this.supListBody[j][i].hide = hide;
        });
        this.subListBody[j].map((item, i) => {
          this.subListBody[j][i].marginLeft = -left;
          let temp = this.subListBody[j][i].left - left;
          let hide = temp > 240 || temp < -120;
          this.subListBody[j][i].hide = hide;
        });
      }
      this.$forceUpdate();
    },
    //点击Header底部事件处理
    subToAni(val) {
      if (this.needAni) return;
      if (this.currentDepth == 3) return;
      this.currentDepth--;
      this.indexList.push(val);
      this.subNextList = this.fetchHeaderData(this.currentDepth - 1);
      this.needAni = false;
      let width = this.tableWidth;
      this.pauseScroll = true;
      this.$refs.content.style.width = this.subList.length * 100 + "%";
      this.baseOffset =
        width *
        val *
        parseFloat(
          document.getElementsByTagName("html")[0].style.fontSize.split("px")[0]
        );
      this.$refs.tableBody.scrollLeft = this.baseOffset;
      this.left = width * val;
      this.marginLeft = 0;
      setTimeout(() => {
        this.pauseScroll = false;
      });
      let supWidth = width * this.subList.length;
      let subWidth = width / this.subList.length;
      let nextWidth =
        (this.subList[val].span
          ? (width / this.subList[val].total) * this.subList[val].span
          : width / this.subList.length) / this.subNextList.length;
      let newNextWidth =
        (width / this.subNextList.length) * this.subList.length;
      let leftTotal = 0;
      this.$nextTick(() => {
        let subLeftTotal = 0;
        for (let i = 0; i < val; i++) {
          subLeftTotal += this.subList[i].span
            ? ((subWidth * this.subList.length) / this.subList[i].total) *
              this.subList[i].span
            : subWidth;
        }
        this.subNextList.map((item, i) => {
          this.subNextList[i].top = 6.4;
          this.subNextList[i].width = this.subNextList[i].span
            ? ((nextWidth * this.subNextList.length) /
                this.subNextList[i].total) *
              this.subNextList[i].span
            : nextWidth;
          if (i > 0)
            leftTotal += this.subNextList[i - 1].span
              ? ((nextWidth * this.subNextList.length) /
                  this.subNextList[i - 1].total) *
                this.subNextList[i - 1].span
              : nextWidth;
          this.subNextList[i].left = subLeftTotal + leftTotal;
        });
      });
      setTimeout(() => {
        this.needAni = true;
        this.supList.map((item, i) => {
          this.supList[i].top = -3.125;
          this.supList[i].width = supWidth;
          this.supList[i].marginLeft = 0;
          this.supList[i].left =
            supWidth * (i - this.indexList[7 - this.currentDepth] || 0) -
            width * val;
        });
        this.subList.map((item, i) => {
          this.subList[i].top = 0;
          this.subList[i].width = width;
          this.subList[i].marginLeft = 0;
          this.subList[i].left = width * (i - val);
        });
        let leftTotal = 0;
        this.subNextList.map((item, i) => {
          this.subNextList[i].top = 3.125;
          this.subNextList[i].width = this.subNextList[i].span
            ? ((newNextWidth * this.subNextList.length) /
                this.subNextList[i].total) *
              this.subNextList[i].span
            : newNextWidth;
          if (i > 0)
            leftTotal += this.subNextList[i - 1].span
              ? ((newNextWidth * this.subNextList.length) /
                  this.subNextList[i - 1].total) *
                this.subNextList[i - 1].span
              : newNextWidth;
          this.subNextList[i].marginLeft = 0;
          this.subNextList[i].left = leftTotal - width * val;
        });
        this.$forceUpdate();
        setTimeout(
          () => {
            this.rebuildHeader("down");
          },
          this.hasAni ? 2000 : 0
        );
      }, 50);
      if (this.data.goalTree.length) this.subBodyToAni(val);
    },
    //点击Header顶部事件处理
    supToAni(val) {
      if (this.needAni) return;
      if (this.currentDepth == 8) return;
      this.currentDepth++;
      this.needAni = false;
      let width = this.tableWidth;
      this.supPrevList = this.fetchHeaderData(this.currentDepth);
      this.supPrevList.map((item, i) => {
        this.supPrevList[i].top = -3.124;
        this.supPrevList[i].width = width * this.supList.length;
        this.supPrevList[i].left = width * (i - val);
      });
      this.pauseScroll = true;
      this.$refs.content.style.width = this.supPrevList.length * 100 + "%";
      let percent = parseInt(
        (val / this.supList.length) * this.supPrevList.length
      );
      this.baseOffset =
        width *
        percent *
        parseFloat(
          document.getElementsByTagName("html")[0].style.fontSize.split("px")[0]
        );
      this.left = 0;
      this.marginLeft = width * percent;
      this.$refs.tableBody.scrollLeft = this.baseOffset;
      setTimeout(() => {
        this.supList.map((item, i) => {
          this.supList[i].hide = false;
        });
        this.subList.map((item, i) => {
          this.subList[i].hide = false;
        });
        this.needAni = true;
        setTimeout(() => {
          let supWidth =
            (width / this.supList.length) * this.supPrevList.length;
          let subWidth =
            (width / this.subList.length) * this.supPrevList.length;
          let leftTotal = 0;
          this.supPrevList.map((item, i) => {
            this.supPrevList[i].marginLeft = 0;
            this.supPrevList[i].top = 0;
            this.supPrevList[i].width = width;
            this.supPrevList[i].left = width * (i - percent);
          });
          this.supList.map((item, i) => {
            this.supList[i].marginLeft = 0;
            this.supList[i].top = 3.125;
            this.supList[i].width = this.supList[i].span
              ? ((supWidth * this.supList.length) / this.supList[i].total) *
                this.supList[i].span
              : supWidth;
            if (i > 0)
              leftTotal += this.supList[i - 1].span
                ? ((supWidth * this.supList.length) /
                    this.supList[i - 1].total) *
                  this.supList[i - 1].span
                : supWidth;
            this.supList[i].left = leftTotal - width * percent;
          });
          this.subList.map((item, i) => {
            this.subList[i].marginLeft = 0;
            this.subList[i].top = 6.4;
            this.subList[i].width = subWidth;
            this.subList[i].left = subWidth * i - width * percent;
          });
          setTimeout(
            () => {
              this.rebuildHeader("up");
            },
            this.hasAni ? 2000 : 0
          );
        }, 50);
        this.supBodyToAni(val);
        this.pauseScroll = false;
      });
    },
    //重新构建Header结构
    rebuildHeader(type) {
      switch (type) {
        case "down":
          this.needAni = false;
          this.$nextTick(() => {
            this.supList = this.subList;
            this.subList = this.subNextList;
            this.supList.map((item, i) => {
              let temp = this.supList[i].left;
              let hide = temp > 240 || temp < -120;
              this.supList[i].hide = hide;
            });
            this.subList.map((item, i) => {
              let temp = this.subList[i].left;
              let hide = temp > 240 || temp < -120;
              this.subList[i].hide = hide;
            });
            this.$forceUpdate();
          });
          break;
        case "up":
          this.needAni = false;
          this.$nextTick(() => {
            this.subList = this.supList;
            this.supList = this.supPrevList;
            this.supList.map((item, i) => {
              let temp = this.supList[i].left;
              let hide = temp > 240 || temp < -120;
              this.supList[i].hide = hide;
            });
            this.subList.map((item, i) => {
              let temp = this.subList[i].left;
              let hide = temp > 240 || temp < -120;
              this.subList[i].hide = hide;
            });
            this.$forceUpdate();
          });
          this.indexList.pop();
          break;
        default:
          break;
      }
    },
    //获取Header数据
    fetchHeaderData(depth) {
      let tempList = [],
        tempSum = 0,
        tempYear,
        tempArr,
        curYear,
        isFar;
      switch (depth) {
        case 8:
          return [
            {
              text: `一生 ${this.birthYear}-${this.birthYear + 100} 100年`,
              top: 0,
              left: 0,
              width: 0,
              marginLeft: 0,
              hide: false,
            },
          ];
        case 7:
          tempList = [];
          for (let i = 0; i < 20; i++) {
            tempList.push({
              text: `${i + 1}期 ${this.birthYear + 5 * i}-${
                this.birthYear + 5 * i + 4
              } ${5 * i + 1}岁-${5 * i + 5}岁`,
              top: 0,
              left: 0,
              width: 0,
              marginLeft: 0,
              hide: false,
            });
          }
          return tempList;
        case 6:
          tempList = [];
          for (let j = 0; j < 20; j++) {
            for (let i = 0; i < 5; i++) {
              curYear = this.indexList[1] * 5 - 5 * j - i;
              isFar = curYear < -5 || curYear > 10;
              tempList.push({
                text: `${this.birthYear + 5 * j + i}年 ${5 * j + i + 1}岁`,
                top: 0,
                left: 0,
                width: 0,
                marginLeft: 0,
                hide: isFar,
              });
            }
          }
          return tempList;
        case 5:
          tempList = [];
          for (let k = 0; k < 20; k++) {
            for (let j = 0; j < 5; j++) {
              curYear = this.indexList[2] - 5 * k - j;
              isFar = curYear < -3 || curYear > 4;
              for (let i = 0; i < 4; i++) {
                tempList.push({
                  text: `第${this.changeNum[i + 1]}季度 ${i * 3 + 1}月-${
                    i * 3 + 3
                  }月`,
                  top: 0,
                  left: 0,
                  width: 0,
                  marginLeft: 0,
                  hide: isFar,
                });
              }
            }
          }
          return tempList;
        case 4:
          tempList = [];
          for (let p = 0; p < 20; p++) {
            for (let k = 0; k < 5; k++) {
              curYear = this.indexList[3] / 4 - 5 * p - k;
              isFar = curYear < -1 || curYear > 1;
              for (let j = 0; j < 4; j++) {
                for (let i = 0; i < 3; i++) {
                  tempList.push({
                    text: `${this.birthYear + p * 5 + k}年 ${3 * j + i + 1}月`,
                    top: 0,
                    left: 0,
                    width: 0,
                    marginLeft: 0,
                    hide: isFar,
                  });
                }
              }
            }
          }
          return tempList;
        case 3:
          tempList = [];
          curYear = this.birthYear + this.indexList[4] / 12;
          tempArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
          tempSum = 0;
          for (let i = 2001; i < this.birthYear; i++) {
            tempSum =
              (tempSum +
                ((i % 4 === 0 && i % 100 !== 0) || i % 400 === 0 ? 2 : 1)) %
              7;
          }
          for (let i = this.birthYear; i < 2001; i++) {
            tempSum =
              (tempSum +
                ((i % 4 === 0 && i % 100 !== 0) || i % 400 === 0 ? 2 : 1)) %
              7;
          }
          for (let m = 0; m < 20; m++) {
            for (let p = 0; p < 5; p++) {
              tempYear = this.birthYear + m * 5 + p;
              let isRun =
                (tempYear % 4 === 0 && tempYear % 100 !== 0) ||
                tempYear % 400 === 0;
              tempArr[1] = isRun ? 29 : 28;
              isFar = tempYear - curYear;
              isFar = isFar > 5 || isFar < -5;
              let tempNo = tempYear >= 2001 ? tempSum : 7 - tempSum,
                tempBase = 7 - tempNo,
                tD = 8 - tempNo,
                nD,
                tempF = 1,
                totalDay = isRun ? 366 : 365,
                tM = 0;
              tempList.push({
                text: `第${tempF++}周 ${1 + "号-" + (7 - tempNo) + "号"}`,
                top: 0,
                left: 0,
                width: 0,
                marginLeft: 0,
                hide: isFar,
              });
              while (tempBase + 7 <= totalDay) {
                nD = tD + 6;
                if (nD > tempArr[tM]) {
                  nD -= tempArr[tM];
                  tM++;
                }
                tempBase += 7;
                tempList.push({
                  text: `第${tempF++}周 ${tD + "号-" + nD + "号"}`,
                  top: 0,
                  left: 0,
                  width: 0,
                  marginLeft: 0,
                  hide: isFar,
                });
                tD = nD + 1;
                if (tD > tempArr[tM]) {
                  tD -= tempArr[tM];
                  tM++;
                }
              }
              if (tempBase <= totalDay) {
                tempList.push({
                  text: `第${tempF++}周 ${tD + "号-" + 31 + "号"}`,
                  top: 0,
                  left: 0,
                  width: 0,
                  marginLeft: 0,
                  hide: isFar,
                });
              }
              tempSum =
                (tempSum -
                  ((tempYear % 4 === 0 && tempYear % 100 !== 0) ||
                  tempYear % 400 === 0
                    ? 2
                    : 1) +
                  7) %
                7;
            }
          }
          return tempList;
        case 2:
          tempList = [];
          for (let j = 0; j < 100; j++) {
            tempYear = this.birthYear + j;
            curYear = (this.indexList[5] * 7) / 365 - j;
            isFar = curYear < -1 || curYear > 1;
            let isRun =
                (tempYear % 4 === 0 && tempYear % 100 !== 0) ||
                tempYear % 400 === 0,
              totalDay = isRun ? 366 : 365;
            for (let i = 0; i < totalDay; i++) {
              tempList.push({
                text: `${i} 号`,
                top: 0,
                left: 0,
                width: 0,
                marginLeft: 0,
                hide: isFar,
              });
            }
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
        let width = this.tableWidth;
        let subWidth = (width / this.subList.length) * this.supList.length;
        let nextWidth = subWidth / this.subNextList.length;
        let prevWidth = width * this.supList.length;
        this.supPrevList.map((item, i) => {
          this.supPrevList[i].top = -3.125;
          this.supPrevList[i].width = prevWidth;
          this.supPrevList[i].left =
            prevWidth * (i - this.indexList[8 - this.currentDepth]) -
            width * val;
        });
        this.supList.map((item, i) => {
          this.supList[i].top = 0;
          this.supList[i].width = width;
          this.supList[i].left =
            width *
            (i - (type === "up" ? this.indexList[8 - this.currentDepth] : val));
        });
        let leftTotal = 0;
        this.subList.map((item, i) => {
          this.subList[i].top = 3.125;
          this.subList[i].width = this.subList[i].span
            ? ((subWidth * this.subList.length) / this.subList[i].total) *
              this.subList[i].span
            : subWidth;
          if (i > 0)
            leftTotal += this.subList[i - 1].span
              ? ((subWidth * this.subList.length) / this.subList[i - 1].total) *
                this.subList[i - 1].span
              : subWidth;
          this.subList[i].left = leftTotal - width * val;
        });
        this.subNextList.map((item, i) => {
          this.subNextList[i].top = 6.4;
          this.subNextList[i].width = nextWidth;
          this.subNextList[i].left = nextWidth * i;
        });
        this.$forceUpdate();
        if (type === "up") {
          this.indexList.pop();
        }
      });
    },
    //Body下钻动画
    subBodyToAni(val) {
      for (let i = 0; i < this.data.goalTree.length; i++) {
        this.subNextListBody[i] = this.fetchBodyData(this.currentDepth - 1, i);
      }
      this.needAni = false;
      let width = this.tableWidth;
      let supWidth = width * this.subListBody[0].length;
      let subWidth = width / this.subListBody[0].length;
      let nextWidth =
        (this.subListBody[0][val].span
          ? (width / this.subListBody[0][val].total) *
            this.subListBody[0][val].span
          : width / this.subListBody[0].length) /
        this.subNextListBody[0].length;
      let newNextWidth =
        (width / this.subNextListBody[0].length) * this.subListBody[0].length;
      this.$nextTick(() => {
        let subLeftTotal = 0;
        for (let i = 0; i < val; i++) {
          subLeftTotal += this.subListBody[0][i].span
            ? ((subWidth * this.subListBody[0].length) /
                this.subListBody[0][i].total) *
              this.subListBody[0][i].span
            : subWidth;
        }
        for (let j = 0; j < this.data.goalTree.length; j++) {
          let leftTotal = 0;
          this.subNextListBody[j].map((item, i) => {
            this.subNextListBody[j][i].top = 6.4;
            this.subNextListBody[j][i].width = this.subNextListBody[j][i].span
              ? ((nextWidth * this.subNextListBody[j].length) /
                  this.subNextListBody[j][i].total) *
                this.subNextListBody[j][i].span
              : nextWidth;
            if (i > 0)
              leftTotal += this.subNextListBody[j][i - 1].span
                ? ((nextWidth * this.subNextListBody[j].length) /
                    this.subNextListBody[j][i - 1].total) *
                  this.subNextListBody[j][i - 1].span
                : nextWidth;
            this.subNextListBody[j][i].left = subLeftTotal + leftTotal;
          });
        }
      });
      setTimeout(() => {
        this.needAni = true;
        for (let j = 0; j < this.data.goalTree.length; j++) {
          this.supListBody[j].map((item, i) => {
            this.supListBody[j][i].top = -3.125;
            this.supListBody[j][i].width = supWidth;
            this.supListBody[j][i].marginLeft = 0;
            this.supListBody[j][i].left =
              supWidth * (i - this.indexList[7 - this.currentDepth] || 0) -
              width * val;
          });
          // Todo 0.0000001 诡异
          this.subListBody[j].map((item, i) => {
            this.subListBody[j][i].top = 0.0000001;
            this.subListBody[j][i].width = width;
            this.subListBody[j][i].marginLeft = 0;
            this.subListBody[j][i].left = width * (i - val) + 0.0000001;
          });
          let leftTotal = 0;
          this.subNextListBody[j].map((item, i) => {
            this.subNextListBody[j][i].top = 3.125;
            this.subNextListBody[j][i].width = this.subNextListBody[j][i].span
              ? ((newNextWidth * this.subNextListBody[j].length) /
                  this.subNextListBody[j][i].total) *
                this.subNextListBody[j][i].span
              : newNextWidth;
            if (i > 0)
              leftTotal += this.subNextListBody[j][i - 1].span
                ? ((newNextWidth * this.subNextListBody[j].length) /
                    this.subNextListBody[j][i - 1].total) *
                  this.subNextListBody[j][i - 1].span
                : newNextWidth;
            this.subNextListBody[j][i].marginLeft = 0;
            this.subNextListBody[j][i].left = leftTotal - width * val;
          });
          this.$forceUpdate();
        }
        setTimeout(
          () => {
            this.rebuildBody("down");
          },
          this.hasAni ? 2000 : 0
        );
      }, 50);
    },
    //Body上钻动画
    supBodyToAni(val) {
      this.needAni = false;
      let width = this.tableWidth;
      for (let j = 0; j < this.data.goalTree.length; j++) {
        this.supPrevListBody[j] = this.fetchBodyData(this.currentDepth, j);
        this.supPrevListBody[j].map((item, i) => {
          this.supPrevListBody[j][i].top = -3.124;
          this.supPrevListBody[j][i].width = width * this.supList.length;
          this.supPrevListBody[j][i].left = width * (i - val);
        });
      }
      setTimeout(() => {
        for (let j = 0; j < this.data.goalTree.length; j++) {
          this.supListBody[j].map((item, i) => {
            this.supListBody[j][i].hide = false;
          });
          this.subListBody[j].map((item, i) => {
            this.subListBody[j][i].hide = false;
          });
        }
        this.needAni = true;
        setTimeout(() => {
          for (let j = 0; j < this.data.goalTree.length; j++) {
            let percent = parseInt(
              (val / this.supListBody[j].length) *
                this.supPrevListBody[j].length
            );
            let supWidth =
              (width / this.supListBody[j].length) *
              this.supPrevListBody[j].length;
            let subWidth =
              (width / this.subListBody[j].length) *
              this.supPrevListBody[j].length;
            let leftTotal = 0;
            this.supPrevListBody[j].map((item, i) => {
              this.supPrevListBody[j][i].marginLeft = 0;
              this.supPrevListBody[j][i].top = 0;
              this.supPrevListBody[j][i].width = width;
              this.supPrevListBody[j][i].left = width * (i - percent);
            });
            this.supListBody[j].map((item, i) => {
              this.supListBody[j][i].marginLeft = 0;
              this.supListBody[j][i].top = 3.125;
              this.supListBody[j][i].width = this.supListBody[j][i].span
                ? ((supWidth * this.supListBody[j].length) /
                    this.supListBody[j][i].total) *
                  this.supListBody[j][i].span
                : supWidth;
              if (i > 0)
                leftTotal += this.supListBody[j][i - 1].span
                  ? ((supWidth * this.supListBody[j].length) /
                      this.supListBody[j][i - 1].total) *
                    this.supListBody[j][i - 1].span
                  : supWidth;
              this.supListBody[j][i].left = leftTotal - width * percent;
            });
            this.subListBody[j].map((item, i) => {
              this.subListBody[j][i].marginLeft = 0;
              this.subListBody[j][i].top = 6.4;
              this.subListBody[j][i].width = subWidth;
              this.subListBody[j][i].left = subWidth * i - width * percent;
            });
          }
          this.$forceUpdate();
          setTimeout(
            () => {
              this.rebuildBody("up");
            },
            this.hasAni ? 2000 : 0
          );
        }, 50);
      });
    },
    //重新构建Body结构
    rebuildBody(type) {
      switch (type) {
        case "down":
          this.needAni = false;
          for (let j = 0; j < this.data.goalTree.length; j++) {
            this.supListBody[j] = this.subListBody[j];
            this.subListBody[j] = this.subNextListBody[j];
            this.supListBody[j].map((item, i) => {
              let temp = this.supListBody[j][i].left;
              let hide = temp > 240 || temp < -120;
              this.supListBody[j][i].hide = hide;
            });
            this.subListBody[j].map((item, i) => {
              let temp = this.subListBody[j][i].left;
              let hide = temp > 240 || temp < -120;
              this.subListBody[j][i].hide = hide;
            });
            this.$forceUpdate();
          }
          break;
        case "up":
          this.needAni = false;
          for (let j = 0; j < this.data.goalTree.length; j++) {
            this.subListBody[j] = this.supListBody[j];
            this.supListBody[j] = this.supPrevListBody[j];
            this.supListBody[j].map((item, i) => {
              let temp = this.supListBody[j][i].left;
              let hide = temp > 240 || temp < -120;
              this.supListBody[j][i].hide = hide;
            });
            this.subListBody[j].map((item, i) => {
              let temp = this.subListBody[j][i].left;
              let hide = temp > 240 || temp < -120;
              this.subListBody[j][i].hide = hide;
            });
            this.$forceUpdate();
          }
          break;

        default:
          break;
      }
    },
    //初始化Body样式
    initBodyStyle(type, row, val) {
      this.$nextTick(() => {
        this.needAni = false;
        let width = this.tableWidth;
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
    //获取Body数据
    fetchBodyData(depth, row) {
      let tempList = [],
        tempSum = 0,
        tempCnt = 0,
        tempYear,
        tempArr,
        curYear,
        isFar;
      switch (depth) {
        case 8:
          return [
            {
              text: this.data.goalTree[row]?.[0]?.[0]?.desc ?? "",
              showInput: false,
              top: 0,
              left: 0,
              width: 0,
              marginLeft: 0,
              hide: false,
            },
          ];
        case 7:
          tempList = [];
          for (let i = 0; i < 20; i++) {
            tempList.push({
              text: this.data.goalTree[row]?.[1]?.[i]?.desc ?? "",
              showInput: false,
              top: 0,
              left: 0,
              width: 0,
              marginLeft: 0,
              hide: false,
            });
          }
          return tempList;
        case 6:
          tempList = [];
          for (let j = 0; j < 20; j++) {
            for (let i = 0; i < 5; i++) {
              curYear = this.indexList[1] * 5 - 5 * j - i;
              isFar = curYear < -5 || curYear > 10;
              tempList.push({
                text: this.data.goalTree[row]?.[2]?.[j * 5 + i]?.desc ?? "",
                showInput: false,
                top: 0,
                left: 0,
                width: 0,
                marginLeft: 0,
                hide: isFar,
              });
            }
          }
          return tempList;
        case 5:
          tempList = [];
          for (let k = 0; k < 20; k++) {
            for (let j = 0; j < 5; j++) {
              curYear = this.indexList[2] - 5 * k - j;
              isFar = curYear < -3 || curYear > 4;
              for (let i = 0; i < 4; i++) {
                tempList.push({
                  text:
                    this.data.goalTree[row]?.[3]?.[k * 20 + j * 5 + i]?.desc ??
                    "",
                  showInput: false,
                  top: 0,
                  left: 0,
                  width: 0,
                  marginLeft: 0,
                  hide: isFar,
                });
              }
            }
          }
          return tempList;
        case 4:
          tempList = [];
          for (let p = 0; p < 20; p++) {
            for (let k = 0; k < 5; k++) {
              curYear = this.indexList[3] / 4 - 5 * p - k;
              isFar = curYear < -1 || curYear > 1;
              for (let j = 0; j < 4; j++) {
                for (let i = 0; i < 3; i++) {
                  tempList.push({
                    text:
                      this.data.goalTree[row]?.[4]?.[p * 20 + k * 5 + j * 4 + i]
                        ?.desc ?? "",
                    showInput: false,
                    top: 0,
                    left: 0,
                    width: 0,
                    marginLeft: 0,
                    hide: isFar,
                  });
                }
              }
            }
          }
          return tempList;

        case 3:
          tempList = [];
          tempCnt = 0;
          curYear = this.birthYear + this.indexList[4] / 12;
          tempArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
          tempSum = 0;
          for (let i = 2001; i < this.birthYear; i++) {
            tempSum =
              (tempSum +
                ((i % 4 === 0 && i % 100 !== 0) || i % 400 === 0 ? 2 : 1)) %
              7;
          }
          for (let i = this.birthYear; i < 2001; i++) {
            tempSum =
              (tempSum +
                ((i % 4 === 0 && i % 100 !== 0) || i % 400 === 0 ? 2 : 1)) %
              7;
          }
          for (let m = 0; m < 20; m++) {
            for (let p = 0; p < 5; p++) {
              tempYear = this.birthYear + m * 5 + p;
              let isRun =
                (tempYear % 4 === 0 && tempYear % 100 !== 0) ||
                tempYear % 400 === 0;
              tempArr[1] = isRun ? 29 : 28;
              isFar = tempYear - curYear;
              isFar = isFar > 5 || isFar < -5;
              let tempNo = tempYear >= 2001 ? tempSum : 7 - tempSum,
                tempBase = 7 - tempNo,
                tD = 8 - tempNo,
                nD,
                totalDay = isRun ? 366 : 365,
                tM = 0;
              tempList.push({
                text: this.data.goalTree[row]?.[5]?.[tempCnt++]?.desc ?? "",
                showInput: false,
                top: 0,
                left: 0,
                width: 0,
                marginLeft: 0,
                hide: isFar,
              });
              while (tempBase + 7 <= totalDay) {
                nD = tD + 6;
                if (nD > tempArr[tM]) {
                  nD -= tempArr[tM];
                  tM++;
                }
                tempBase += 7;
                tempList.push({
                  text: this.data.goalTree[row]?.[5]?.[tempCnt++]?.desc ?? "",
                  showInput: false,
                  top: 0,
                  left: 0,
                  width: 0,
                  marginLeft: 0,
                  hide: isFar,
                });
                tD = nD + 1;
                if (tD > tempArr[tM]) {
                  tD -= tempArr[tM];
                  tM++;
                }
              }
              if (tempBase <= totalDay) {
                tempList.push({
                  text: this.data.goalTree[row]?.[5]?.[tempCnt++]?.desc ?? "",
                  showInput: false,
                  top: 0,
                  left: 0,
                  width: 0,
                  marginLeft: 0,
                  hide: isFar,
                });
              }
              tempSum =
                (tempSum -
                  ((tempYear % 4 === 0 && tempYear % 100 !== 0) ||
                  tempYear % 400 === 0
                    ? 2
                    : 1) +
                  7) %
                7;
            }
          }
          return tempList;
        case 2:
          tempList = [];
          tempCnt = 0;
          for (let j = 0; j < 100; j++) {
            tempYear = this.birthYear + j;
            curYear = (this.indexList[5] * 7) / 365 - j;
            isFar = curYear < -1 || curYear > 1;
            let isRun =
                (tempYear % 4 === 0 && tempYear % 100 !== 0) ||
                tempYear % 400 === 0,
              totalDay = isRun ? 366 : 365;
            for (let i = 0; i < totalDay; i++) {
              tempList.push({
                text: this.data.goalTree[row]?.[6]?.[tempCnt++]?.desc ?? "",
                showInput: false,
                top: 0,
                left: 0,
                width: 0,
                marginLeft: 0,
                hide: isFar,
              });
            }
          }
          return tempList;
        default:
          break;
      }
      return tempList;
    },
    //初始化数据
    initData() {
      this.supList = this.fetchHeaderData(this.currentDepth);
      this.subList = this.fetchHeaderData(this.currentDepth - 1);
      for (let i = 0; i < this.data.goalTree.length; i++) {
        this.supListBody[i] = this.fetchBodyData(this.currentDepth, i);
        this.subListBody[i] = this.fetchBodyData(this.currentDepth - 1, i);
        this.initBodyStyle("down", i, 0);
      }
    },
    //初始化行样式
    initBodyLine() {
      for (let i = 0; i < this.data.goalTree.length; i++) {
        this.supListBody[i] = this.fetchBodyData(this.currentDepth, i);
        this.subListBody[i] = this.fetchBodyData(this.currentDepth - 1, i);
        this.initBodyStyle("down", i, 0);
      }
    },
    //点击单元格
    clickItem(type, row, val) {
      if (!this.canInput) return;
      this.canInput = false;
      this.$emit("input", false);
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
      let depth = 8 - this.currentDepth;
      if (type === "down") {
        depth++;
        this.subListBody[row][val].showInput = false;
      } else {
        this.supListBody[row][val].showInput = false;
      }
      if (!this.data.goalTree[row][depth]) this.data.goalTree[row][depth] = {};
      if (!this.data.goalTree[row][depth][val])
        this.data.goalTree[row][depth][val] = {};
      if (type === "down") {
        this.data.goalTree[row][depth][val].desc =
          this.subListBody[row][val].text;
      } else {
        this.data.goalTree[row][depth][val].desc =
          this.supListBody[row][val].text;
      }
      this.$emit("save");
      setTimeout(() => {
        this.canInput = true;
        this.$emit("input", true);
      }, 100);
    },
    // 更新表格宽度
    updateTableWidth() {
      let totalWidth = parseFloat(
        document.getElementsByTagName("html")[0].style.fontSize.split("px")[0]
      );
      let tableWidth = this.$refs.table.offsetWidth;
      this.tableWidth = tableWidth / totalWidth;
      this.initHeaderStyle("down", 0);
      for (let i = 0; i < this.data.goalTree.length; i++) {
        this.initBodyStyle("down", i, 0);
      }
    },
    handleScroll() {
      if (this.$refs.tableBody.scrollTop === this.cacheNum) {
        this.handleScrollX();
      } else {
        this.$emit("scroll", this.$refs.tableBody.scrollTop);
      }
      this.cacheNum = this.$refs.tableBody.scrollTop;
    },
    updateScroll(val) {
      this.$refs.tableBody.scrollTop = val;
    },
  },
  created() {
    this.$nextTick(() => {
      this.$nextTick(() => {
        this.updateTableWidth();
      });
    });
    this.birth = new Date(this.initialTimeStamp);
    this.birthYear = this.birth.getFullYear();
    this.initData();
  },
};
</script>

<style scoped>
.main-table {
  width: 100%;
  height: 100%;
  position: relative;
}
.scroll {
  width: 100%;
  height: 500px;
  margin-top: -500px;
  z-index: 100;
  position: relative;
  overflow-x: auto;
}
.content {
  width: 100%;
}
.table-header {
  width: 100%;
  height: 100px;
  overflow: hidden;
  position: relative;
  border: 1px solid #555;
  border-left: none;
  border-bottom: none;
  box-sizing: border-box;
  color: #aaa;
  font-size: 16px;
  font-weight: 700;
  background-color: #333333;
}
.no-select {
  -webkit-user-select: none;
  -moz-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
.table-header div p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 10px;
  margin: 0;
}
.table-body-wrapper {
  height: calc(100% - 100px);
  overflow: auto;
}
.table-body-item {
  width: 100%;
  height: 100px;
  overflow: hidden;
  position: relative;
  border: 1px solid #555;
  border-left: none;
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
  width: 100%;
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
  width: 100%;
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
  width: 100%;
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
  width: 100%;
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
  width: 100%;
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
  width: 100%;
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
  width: 100%;
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
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d2d2d2;
  color: #2c3e50;
  border: 1px solid #555;
}
.ani {
  transition: margin-left 1s cubic-bezier(0, 0.73, 0.04, 0.98),
    left 1s cubic-bezier(0, 0.73, 0.04, 0.98),
    width 1s cubic-bezier(0, 0.73, 0.04, 0.98),
    top 1s cubic-bezier(0, 0.73, 0.04, 0.98) 1s;
}
</style>
