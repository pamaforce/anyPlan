<template>
  <div class="main-table" ref="table">
    <div class="table-header no-select" ref="tableHeader">
      <template v-for="(item, i) in supPrevList_dom">
        <div
          v-if="!item.hide"
          :class="[
            'sup-prev-cell',
            {
              ['ani' + speed]: needAni && hasAni,
              current: item.current,
              bold: item.bold,
            },
          ]"
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
      <template v-for="(item, i) in subNextList_dom">
        <div
          v-if="!item.hide"
          :class="[
            'sub-next-cell',
            {
              ['ani' + speed]: needAni && hasAni,
              current: item.current,
              bold: item.bold,
            },
          ]"
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
      <template v-for="(item, i) in supList_dom">
        <div
          v-if="!item.hide"
          :class="[
            'sup-cell',
            {
              ['ani' + speed]: needAni && hasAni,
              current: item.current,
              bold: item.bold,
            },
          ]"
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
          @click="supToAni(item.index)"
          :title="item.text"
        >
          <p>
            {{ item.text }}
          </p>
        </div>
      </template>
      <template v-for="(item, i) in subList_dom">
        <div
          v-if="!item.hide"
          :class="[
            'sub-cell',
            {
              ['ani' + speed]: needAni && hasAni,
              current: item.current,
              bold: item.bold,
            },
          ]"
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
          @click="subToAni(item.index)"
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
        v-for="(aspect, j) in $bus.goalTable.goalTree"
        :key="j"
        :style="
          (marginLeft !== undefined
            ? 'margin-left:' + marginLeft + 'rem;'
            : '') + (left !== undefined ? 'left:' + left + 'rem;' : '')
        "
      >
        <template v-for="(item, i) in supPrevListBody_dom[j]">
          <div
            v-if="!item.hide"
            :class="[
              'body-sup-prev-cell',
              { ['ani' + speed]: needAni && hasAni },
            ]"
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
        <template v-for="(item, i) in subNextListBody_dom[j]">
          <div
            v-if="!item.hide"
            :class="[
              'body-sub-next-cell',
              { ['ani' + speed]: needAni && hasAni },
            ]"
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
        <template v-for="(item, i) in supListBody_dom[j]">
          <div
            v-if="!item.hide"
            :class="[
              'body-sup-cell',
              { ['ani' + speed]: needAni && hasAni, border: needAni },
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
            @click="clickItem('up', j, item.index)"
            @contextmenu.prevent.stop="
              (val) => {
                onContextmenu(val, j, item.index, 'up');
              }
            "
          >
            <p
              v-if="!item.showInput"
              :class="[{ finish: item.finish, bold: item.bold }]"
            >
              {{ item.text }}
            </p>
            <input
              v-else
              v-model="item.text"
              :id="'input_up_' + j + '_' + item.index"
              @blur="blurItem('up', j, item.index)"
              @keyup.enter="blurItem('up', j, item.index)"
            />
          </div>
        </template>
        <template v-for="(item, i) in subListBody_dom[j]">
          <div
            @mousedown.prevent="(e) => dragTaskStart(e, j, item.index)"
            v-if="!item.hide"
            :class="[
              'body-sub-cell',
              { ['ani' + speed]: needAni && hasAni, border: needAni },
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
            :id="'subBody_' + j + '_' + item.index"
            :title="item.text"
            @click="clickItem('down', j, item.index)"
            @contextmenu.prevent.stop="
              (val) => {
                onContextmenu(val, j, item.index, 'down');
              }
            "
          >
            <p
              v-if="!item.showInput"
              :class="[
                {
                  finish: item.finish,
                  bold: item.bold,
                  assigned: item.isAssigned,
                },
              ]"
            >
              {{ item.text }}
            </p>
            <input
              v-else
              v-model="item.text"
              :id="'input_down_' + j + '_' + item.index"
              @blur="blurItem('down', j, item.index)"
              @keyup.enter="blurItem('down', j, item.index)"
            />
          </div>
        </template>
      </div>
      <div class="content" ref="content"></div>
    </div>
  </div>
</template>

<script>
import { Notification } from "element-ui";
export default {
  name: "MainTable",
  props: {
    showHours: {
      type: Boolean,
      default: () => false,
    },
    hasAni: {
      type: Boolean,
      default: () => true,
    },
    hasAni2: {
      type: Boolean,
      default: () => false,
    },
  },
  data: () => ({
    //初始深度
    basePx: 1,
    cachePx: 1,
    currentDepth: 8,
    tableWidth: 120,
    supList: [],
    supPrevList: [],
    subList: [],
    subNextList: [],
    supListBody: [],
    supPrevListBody: [],
    subListBody: [],
    subNextListBody: [],
    supList_dom: [],
    supPrevList_dom: [],
    subList_dom: [],
    subNextList_dom: [],
    supListBody_dom: [],
    supPrevListBody_dom: [],
    subListBody_dom: [],
    subNextListBody_dom: [],
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
    speed: 1,
  }),
  methods: {
    updateBasePx() {
      this.basePx = parseFloat(
        document.getElementsByTagName("html")[0].style.fontSize.split("px")[0]
      );
    },
    dragTaskStart(event, row, val) {
      if (this.showHours) this.$emit("dragTaskStart", event, row, val);
    },
    //处理Body横向滚动
    handleScrollX() {
      if (this.pauseScroll) return;
      let left =
        this.$refs.tableBody.scrollLeft / this.basePx - this.baseOffset;
      this.marginLeft = left;
      this.supList.map((item, i) => {
        this.supList[i].marginLeft = -left;
        let temp = this.supList[i].left - left;
        let hide = temp > 120 || temp < -120;
        this.supList[i].hide = hide;
      });
      this.subList.map((item, i) => {
        this.subList[i].marginLeft = -left;
        let temp = this.subList[i].left - left;
        let hide = temp > 120 || temp < -120;
        this.subList[i].hide = hide;
      });
      this.supList_dom = [];
      this.supList.map((item, i) => {
        if (!item.hide) {
          this.supList_dom.push(item);
          this.supList_dom[this.supList_dom.length - 1].index = i;
        }
      });
      this.subList_dom = [];
      this.subList.map((item, i) => {
        if (!item.hide) {
          this.subList_dom.push(item);
          this.subList_dom[this.subList_dom.length - 1].index = i;
        }
      });
      for (let j = 0; j < this.$bus.goalTable.goalTree.length; j++) {
        this.supListBody[j].map((item, i) => {
          this.supListBody[j][i].marginLeft = -left;
          let temp = this.supListBody[j][i].left - left;
          let hide = temp > 120 || temp < -120;
          this.supListBody[j][i].hide = hide;
        });
        this.subListBody[j].map((item, i) => {
          this.subListBody[j][i].marginLeft = -left;
          let temp = this.subListBody[j][i].left - left;
          let hide = temp > 120 || temp < -120;
          this.subListBody[j][i].hide = hide;
        });
        this.supListBody_dom[j] = [];
        this.supListBody[j].map((item, i) => {
          if (!item.hide) {
            this.supListBody_dom[j].push(item);
            this.supListBody_dom[j][this.supListBody_dom[j].length - 1].index =
              i;
          }
        });
        this.subListBody_dom[j] = [];
        this.subListBody[j].map((item, i) => {
          if (!item.hide) {
            this.subListBody_dom[j].push(item);
            this.subListBody_dom[j][this.subListBody_dom[j].length - 1].index =
              i;
          }
        });
      }
      this.$forceUpdate();
    },
    //点击Header底部事件处理
    subToAni(val) {
      if (this.needAni) return;
      if (this.currentDepth === 3) return;
      this.currentDepth--;
      this.indexList.push(val);
      this.subNextList = this.fetchHeaderData(this.currentDepth - 1);
      this.subNextList_dom = [];
      this.subNextList.map((item, i) => {
        if (!item.hide) {
          this.subNextList_dom.push(item);
          this.subNextList_dom[this.subNextList_dom.length - 1].index = i;
        }
      });
      this.needAni = false;
      let width = this.tableWidth;
      this.pauseScroll = true;
      this.$refs.content.style.width = this.subList.length * 100 + "%";
      this.baseOffset = width * val;
      this.$refs.tableBody.scrollLeft = this.baseOffset * this.basePx;
      if (this.$refs.tableBody.scrollLeft < this.baseOffset * this.basePx) {
        this.$refs.content.style.width =
          parseFloat(
            window.getComputedStyle(this.$refs.content).width.split("px")[0]
          ) +
          (this.baseOffset * this.basePx - this.$refs.tableBody.scrollLeft) +
          "px";
        this.$refs.tableBody.scrollLeft = this.baseOffset * this.basePx;
      }
      this.left = width * val;
      this.marginLeft = 0;
      setTimeout(() => {
        this.pauseScroll = false;
      });
      let supWidth = width * this.subList.length;
      let subWidth = width / this.subList.length;
      let nextWidth = width / this.subList.length / this.subNextList.length;
      let newNextWidth =
        (width / this.subNextList.length) * this.subList.length;
      this.$nextTick(() => {
        let subLeftTotal = subWidth * val;
        this.subNextList_dom.map((item, i) => {
          this.subNextList_dom[i].top = 6.4;
          this.subNextList_dom[i].width = nextWidth;
          this.subNextList_dom[i].left =
            subLeftTotal + nextWidth * this.subNextList_dom[i].index;
        });
      });
      setTimeout(() => {
        this.needAni = true;
        this.supList.map((item, i) => {
          this.supList[i].top = -3.125;
          this.supList[i].marginLeft = 0;
          this.supList[i].width = supWidth;
          this.supList[i].left =
            supWidth * (i - this.indexList[7 - this.currentDepth] || 0) -
            width * val;
        });
        this.supList_dom.map((item, i) => {
          this.supList_dom[i].top = -3.125;
          this.supList_dom[i].marginLeft = 0;
          this.supList_dom[i].width = supWidth;
          this.supList_dom[i].left =
            supWidth *
              (this.supList_dom[i].index -
                this.indexList[7 - this.currentDepth] || 0) -
            width * val;
        });
        let firstWidth = (width * this.subList[0].daySpan) / 7;
        let lastWidth =
          (width * this.subList[this.subList.length - 1].daySpan) / 7;
        if (this.currentDepth === 3 && val !== 0) {
          this.pauseScroll = true;
          this.baseOffset = width * val;
          this.$refs.tableBody.scrollLeft =
            this.baseOffset * this.basePx - (width - firstWidth) * this.basePx;
          this.left = width * val;
          this.marginLeft = firstWidth - width;
          setTimeout(() => {
            this.pauseScroll = false;
          });
        }
        this.subList.map((item, i) => {
          this.subList[i].top = 0;
          this.subList[i].marginLeft = 0;
          this.subList[i].width = width;
          this.subList[i].left = width * (i - val);
          if (this.currentDepth === 3) {
            if (val !== 0) this.subList[i].marginLeft = width - firstWidth;
            if (i === 0) {
              this.subList[i].width = firstWidth;
              this.subList[i].left = width * (i - val);
            } else {
              this.subList[i].left = width * (i - val - 1) + firstWidth;
            }
            if (i === this.subList.length - 1) {
              this.subList[i].width = lastWidth;
            }
          }
        });
        this.subList_dom.map((item, i) => {
          this.subList_dom[i].top = 0;
          this.subList_dom[i].marginLeft = 0;
          this.subList_dom[i].width = width;
          this.subList_dom[i].left = width * (this.subList_dom[i].index - val);
          if (this.currentDepth === 3) {
            if (val !== 0) this.subList_dom[i].marginLeft = width - firstWidth;
            if (this.subList_dom[i].index === 0) {
              this.subList_dom[i].width = firstWidth;
              this.subList_dom[i].left =
                width * (this.subList_dom[i].index - val);
            } else {
              this.subList_dom[i].left =
                width * (this.subList_dom[i].index - val - 1) + firstWidth;
            }
            if (this.subList_dom[i].index === this.subList.length - 1) {
              this.subList_dom[i].width = lastWidth;
            }
          }
        });
        let wT = 0,
          wA = [],
          wAT = [0];
        this.subNextList.map((item, i) => {
          this.subNextList[i].top = 3.125;
          let w = newNextWidth;
          if (this.currentDepth === 4) {
            w =
              ((12 * width) / this.subNextList[i].yearDays) *
              this.subNextList[i].daySpan;
          } else if (this.currentDepth === 3) {
            w = width / 7;
          }
          wA[i] = w;
          if (i > 0) {
            wT += wA[i - 1];
            wAT[i] = wT;
          }
          this.subNextList[i].width = w;
          this.subNextList[i].marginLeft = 0;
          this.subNextList[i].left = wT - width * val;
          if (this.currentDepth === 3 && val !== 0) {
            this.subNextList[i].marginLeft = width - firstWidth;
          }
        });
        this.subNextList_dom.map((item, i) => {
          this.subNextList_dom[i].top = 3.125;
          this.subNextList_dom[i].width = wA[this.subNextList_dom[i].index];
          this.subNextList_dom[i].marginLeft = 0;
          this.subNextList_dom[i].left =
            wAT[this.subNextList_dom[i].index] - width * val;
          if (this.currentDepth === 3 && val !== 0) {
            this.subNextList_dom[i].marginLeft = width - firstWidth;
          }
        });
        this.$forceUpdate();
        setTimeout(
          () => {
            this.rebuildHeader("down");
          },
          this.hasAni ? 2000 / this.speed : 0
        );
      }, 50);
      if (this.$bus.goalTable.goalTree.length) this.subBodyToAni(val);
    },
    //点击Header顶部事件处理
    supToAni(val) {
      if (this.needAni) return;
      if (this.currentDepth === 8) return;
      this.currentDepth++;
      this.needAni = false;
      let width = this.tableWidth;
      this.supPrevList = this.fetchHeaderData(this.currentDepth);
      this.supPrevList.map((item, i) => {
        this.supPrevList[i].top = -3.124;
        this.supPrevList[i].width = width * this.supList.length;
        this.supPrevList[i].left = width * (i - val);
      });
      this.supPrevList_dom = [];
      this.supPrevList.map((item, i) => {
        if (!item.hide) {
          this.supPrevList_dom.push(item);
          this.supPrevList_dom[this.supPrevList_dom.length - 1].index = i;
        }
      });
      this.supPrevList_dom.map((item, i) => {
        this.supPrevList_dom[i].top = -3.124;
        this.supPrevList_dom[i].width = width * this.supList.length;
        this.supPrevList_dom[i].left =
          width * (this.supPrevList_dom[i].index - val);
      });
      this.pauseScroll = true;
      this.$refs.content.style.width = this.supPrevList.length * 100 + "%";
      let percent = parseInt(
        (val / this.supList.length) * this.supPrevList.length
      );
      this.baseOffset = width * percent;
      this.left = 0;
      this.marginLeft = width * percent;
      this.$refs.tableBody.scrollLeft = this.baseOffset * this.basePx;
      setTimeout(() => {
        if (this.hasAni2) {
          this.supList_dom = [];
          this.supList.map((item, i) => {
            this.supList[i].hide = false;
            this.supList_dom.push(item);
            this.supList_dom[this.supList_dom.length - 1].index = i;
            this.supList_dom[this.supList_dom.length - 1].hide = false;
          });
          this.subList_dom = [];
          this.subList.map((item, i) => {
            this.subList[i].hide = false;
            this.subList_dom.push(item);
            this.subList_dom[this.subList_dom.length - 1].index = i;
            this.subList_dom[this.subList_dom.length - 1].hide = false;
          });
        }
        this.needAni = true;
        setTimeout(() => {
          let supWidth =
            (width / this.supList.length) * this.supPrevList.length;
          let subWidth =
            (width / this.subList.length) * this.supPrevList.length;
          this.supPrevList.map((item, i) => {
            this.supPrevList[i].marginLeft = 0;
            this.supPrevList[i].top = 0;
            this.supPrevList[i].width = width;
            this.supPrevList[i].left = width * (i - percent);
          });
          this.supPrevList_dom.map((item, i) => {
            this.supPrevList_dom[i].marginLeft = 0;
            this.supPrevList_dom[i].top = 0;
            this.supPrevList_dom[i].width = width;
            this.supPrevList_dom[i].left =
              width * (this.supPrevList_dom[i].index - percent);
          });
          let wT = 0,
            wA = [],
            wAT = [0];
          this.supList.map((item, i) => {
            this.supList[i].top = 3.125;
            let w = supWidth;
            if (this.currentDepth === 4) {
              w =
                ((12 * width) / this.supList[i].yearDays) *
                this.supList[i].daySpan;
            }
            wA[i] = w;
            if (i > 0) {
              wT += wA[i - 1];
              wAT[i] = wT;
            }
            this.supList[i].width = w;
            this.supList[i].marginLeft = 0;
            this.supList[i].left = wT - width * percent;
          });
          this.supList_dom.map((item, i) => {
            this.supList_dom[i].marginLeft = 0;
            this.supList_dom[i].top = 3.125;
            this.supList_dom[i].width = wA[this.supList_dom[i].index];
            this.supList_dom[i].left =
              wAT[this.supList_dom[i].index] - width * percent;
          });
          this.subList.map((item, i) => {
            this.subList[i].marginLeft = 0;
            this.subList[i].top = 6.4;
            this.subList[i].width = subWidth;
            this.subList[i].left = subWidth * i - width * percent;
          });
          this.subList_dom.map((item, i) => {
            this.subList_dom[i].marginLeft = 0;
            this.subList_dom[i].top = 6.4;
            this.subList_dom[i].width = subWidth;
            this.subList_dom[i].left =
              subWidth * this.subList_dom[i].index - width * percent;
          });
          setTimeout(
            () => {
              this.rebuildHeader("up");
            },
            this.hasAni ? 2000 / this.speed : 0
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
              let hide = temp > 120 || temp < -120;
              this.supList[i].hide = hide;
            });
            this.subList.map((item, i) => {
              let temp = this.subList[i].left;
              let hide = temp > 120 || temp < -120;
              this.subList[i].hide = hide;
            });
            this.supList_dom = [];
            this.supList.map((item, i) => {
              if (!item.hide) {
                this.supList_dom.push(item);
                this.supList_dom[this.supList_dom.length - 1].index = i;
              }
            });
            this.subList_dom = [];
            this.subList.map((item, i) => {
              if (!item.hide) {
                this.subList_dom.push(item);
                this.subList_dom[this.subList_dom.length - 1].index = i;
              }
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
              let hide = temp > 120 || temp < -120;
              this.supList[i].hide = hide;
            });
            this.subList.map((item, i) => {
              let temp = this.subList[i].left;
              let hide = temp > 120 || temp < -120;
              this.subList[i].hide = hide;
            });
            this.supList_dom = [];
            this.supList.map((item, i) => {
              if (!item.hide) {
                this.supList_dom.push(item);
                this.supList_dom[this.supList_dom.length - 1].index = i;
              }
            });
            this.subList_dom = [];
            this.subList.map((item, i) => {
              if (!item.hide) {
                this.subList_dom.push(item);
                this.subList_dom[this.subList_dom.length - 1].index = i;
              }
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
      let nowDate = new Date();
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
              current: true,
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
              current:
                nowDate.getFullYear() >= this.birthYear + 5 * i &&
                nowDate.getFullYear() <= this.birthYear + 5 * i + 4,
              hide: false,
            });
          }
          return tempList;
        case 6:
          tempList = [];
          for (let j = 0; j < 20; j++) {
            for (let i = 0; i < 5; i++) {
              curYear = this.indexList[1] * 5 - 5 * j - i;
              isFar = curYear < -5 || curYear > 1;
              tempList.push({
                text: `${this.birthYear + 5 * j + i}年 ${5 * j + i + 1}岁`,
                top: 0,
                left: 0,
                width: 0,
                marginLeft: 0,
                current: nowDate.getFullYear() == this.birthYear + 5 * j + i,
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
              isFar = curYear < -1 || curYear > 1;
              for (let i = 0; i < 4; i++) {
                tempList.push({
                  text: `第${this.changeNum[i + 1]}季度 ${i * 3 + 1}月-${
                    i * 3 + 3
                  }月`,
                  top: 0,
                  left: 0,
                  width: 0,
                  marginLeft: 0,
                  current:
                    nowDate.getFullYear() == this.birthYear + 5 * k + j &&
                    nowDate.getMonth() >= i * 3 &&
                    nowDate.getMonth() <= i * 3 + 2,
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
              isFar = curYear < 0 || curYear > 0.8;
              for (let j = 0; j < 4; j++) {
                for (let i = 0; i < 3; i++) {
                  tempList.push({
                    text: `${this.birthYear + p * 5 + k}年 ${3 * j + i + 1}月`,
                    top: 0,
                    left: 0,
                    width: 0,
                    marginLeft: 0,
                    current:
                      nowDate.getFullYear() == this.birthYear + 5 * p + k &&
                      nowDate.getMonth() == 3 * j + i,
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
              isFar = isFar > 1 || isFar < -1;
              let tempNo = 7 - tempSum,
                tempBase = 7 - tempNo,
                tD = 8 - tempNo,
                nD,
                tempF = 1,
                totalDay = isRun ? 366 : 365,
                tM = 0;
              if (m === 0 && p === 0) {
                tempList.push({
                  text: `第${tempF++}周 ${1 + "号-" + (7 - tempNo) + "号"}`,
                  top: 0,
                  left: 0,
                  width: 0,
                  marginLeft: 0,
                  hide: isFar,
                  current:
                    nowDate.getFullYear() == tempYear &&
                    nowDate.getMonth() == tM &&
                    nowDate.getDate() <= 7 - tempNo,
                  yearGroup: tempYear,
                  yearDays: totalDay,
                  daySpan: 7 - tempNo,
                });
              } else {
                if (tempNo !== 0) {
                  let y = tempList[tempList.length - 1];
                  tempList[tempList.length - 1] = {
                    text: `${
                      y.text.split("周")[0]
                    }周/${tempYear}年第${tempF++}周 ${
                      y.text.split("-")[1].split("号")[0] +
                      "号-" +
                      (7 - tempNo) +
                      "号"
                    }`,
                    top: 0,
                    left: 0,
                    width: 0,
                    marginLeft: 0,
                    hide: y.hide,
                    current:
                      y.current ||
                      (nowDate.getFullYear() == tempYear &&
                        nowDate.getMonth() == tM &&
                        nowDate.getDate() <= 7 - tempNo),
                    yearGroup: y.yearGroup,
                    yearDays: y.yearDays,
                    daySpan: 7,
                  };
                }
              }
              while (tempBase + 7 <= totalDay) {
                nD = tD + 6;
                let cFlag = nowDate.getDate() >= tD;
                if (nD > tempArr[tM]) {
                  nD -= tempArr[tM];
                  tM++;
                  cFlag = true;
                }
                cFlag = cFlag && nowDate.getDate() <= nD;
                tempBase += 7;
                tempList.push({
                  text: `第${tempF++}周 ${tD + "号-" + nD + "号"}`,
                  top: 0,
                  left: 0,
                  width: 0,
                  marginLeft: 0,
                  hide: isFar,
                  current:
                    nowDate.getFullYear() == tempYear &&
                    nowDate.getMonth() == tM &&
                    cFlag,
                  yearGroup: tempYear,
                  yearDays: totalDay,
                  daySpan: 7,
                });
                tD = nD + 1;
                if (tD > tempArr[tM]) {
                  tD -= tempArr[tM];
                  tM++;
                }
              }
              if (tempBase < totalDay) {
                tempList.push({
                  text: `第${tempF++}周 ${tD + "号-" + 31 + "号"}`,
                  top: 0,
                  left: 0,
                  width: 0,
                  marginLeft: 0,
                  hide: isFar,
                  current:
                    nowDate.getFullYear() == tempYear &&
                    nowDate.getMonth() == tM &&
                    nowDate.getDate() >= tD,
                  yearGroup: tempYear,
                  yearDays: totalDay,
                  daySpan: 32 - tD,
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
          tempArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
          for (let j = 0; j < 100; j++) {
            tempYear = this.birthYear + j;
            curYear = (this.indexList[5] * 7) / 365 - j;
            isFar = curYear < -0.25 || curYear > 0.5;
            let isRun =
                (tempYear % 4 === 0 && tempYear % 100 !== 0) ||
                tempYear % 400 === 0,
              totalDay = isRun ? 366 : 365;
            tempArr[1] = isRun ? 29 : 28;
            let cFlag = nowDate.getFullYear() == tempYear;
            for (let i = 0; i < 12; i++) {
              let dFlag = cFlag && nowDate.getMonth() == i;
              for (let k = 1; k <= tempArr[i]; k++) {
                tempList.push({
                  text: `${tempYear}年${i + 1}月${k}日`,
                  top: 0,
                  left: 0,
                  width: 0,
                  marginLeft: 0,
                  yearDays: totalDay,
                  hide: isFar,
                  current: dFlag && nowDate.getDate() == k,
                });
              }
            }
          }
          return tempList;
        default:
          break;
      }
      return [];
    },
    //初始化Header样式
    initHeaderStyle(val) {
      this.$nextTick(() => {
        this.needAni = false;
        let width = this.tableWidth;
        let subWidth = (width / this.subList.length) * this.supList.length;
        this.supList.map((item, i) => {
          this.supList[i].top = 0;
          this.supList[i].width = width;
          this.supList[i].left = width * (i - val);
          this.supList[i].marginLeft = 0;
        });
        let leftTotal = 0;
        this.subList.map((item, i) => {
          this.subList[i].top = 3.125;
          this.subList[i].width = subWidth;
          if (i > 0) leftTotal += subWidth;
          this.subList[i].marginLeft = 0;
          this.subList[i].left = leftTotal - width * val;
        });
        this.$forceUpdate();
      });
    },
    //Body下钻动画
    subBodyToAni(val) {
      for (let i = 0; i < this.$bus.goalTable.goalTree.length; i++) {
        this.subNextListBody[i] = this.fetchBodyData(this.currentDepth - 1, i);
        this.subNextListBody_dom[i] = [];
        this.subNextListBody[i].map((item, j) => {
          if (!item.hide) {
            this.subNextListBody_dom[i].push(item);
            this.subNextListBody_dom[i][
              this.subNextListBody_dom[i].length - 1
            ].index = j;
          }
        });
      }
      this.needAni = false;
      let width = this.tableWidth;
      let supWidth = width * this.subListBody[0].length;
      let subWidth = width / this.subListBody[0].length;
      let nextWidth =
        width / this.subListBody[0].length / this.subNextListBody[0].length;
      let newNextWidth =
        (width / this.subNextListBody[0].length) * this.subListBody[0].length;
      this.$nextTick(() => {
        let subLeftTotal = subWidth * val;
        for (let j = 0; j < this.$bus.goalTable.goalTree.length; j++) {
          this.subNextListBody[j].map((item, i) => {
            this.subNextListBody[j][i].top = 6.4;
            this.subNextListBody[j][i].width = nextWidth;
            this.subNextListBody[j][i].left =
              subLeftTotal + nextWidth * this.subNextListBody[j][i].index;
          });
        }
      });
      setTimeout(() => {
        this.needAni = true;
        for (let j = 0; j < this.$bus.goalTable.goalTree.length; j++) {
          this.supListBody[j].map((item, i) => {
            this.supListBody[j][i].top = -3.125;
            this.supListBody[j][i].width = supWidth;
            this.supListBody[j][i].marginLeft = 0;
            this.supListBody[j][i].left =
              supWidth * (i - this.indexList[7 - this.currentDepth] || 0) -
              width * val;
          });
          this.supListBody_dom[j].map((item, i) => {
            this.supListBody_dom[j][i].top = -3.125;
            this.supListBody_dom[j][i].width = supWidth;
            this.supListBody_dom[j][i].marginLeft = 0;
            this.supListBody_dom[j][i].left =
              supWidth *
                (this.supListBody_dom[j][i].index -
                  this.indexList[7 - this.currentDepth] || 0) -
              width * val;
          });
          let firstWidth = (width * this.subList[0].daySpan) / 7;
          let lastWidth =
            (width * this.subList[this.subList.length - 1].daySpan) / 7;
          // Todo 0.0000001 诡异
          this.subListBody[j].map((item, i) => {
            this.subListBody[j][i].top = 0.0000001;
            this.subListBody[j][i].width = width;
            this.subListBody[j][i].marginLeft = 0;
            this.subListBody[j][i].left = width * (i - val) + 0.0000001;
            if (this.currentDepth === 3) {
              if (val !== 0)
                this.subListBody[j][i].marginLeft = width - firstWidth;
              if (i === 0) {
                this.subListBody[j][i].width = firstWidth;
                this.subListBody[j][i].left = width * (i - val) + 0.0000001;
              } else {
                this.subListBody[j][i].left =
                  width * (i - val - 1) + firstWidth + 0.0000001;
              }
              if (i === this.subListBody[j].length - 1) {
                this.subListBody[j][i].width = lastWidth;
              }
            }
          });
          this.subListBody_dom[j].map((item, i) => {
            this.subListBody_dom[j][i].top = 0.0000001;
            this.subListBody_dom[j][i].width = width;
            this.subListBody_dom[j][i].marginLeft = 0;
            this.subListBody_dom[j][i].left =
              width * (this.subListBody_dom[j][i].index - val) + 0.0000001;
            if (this.currentDepth === 3) {
              if (val !== 0)
                this.subListBody_dom[j][i].marginLeft = width - firstWidth;
              if (this.subListBody_dom[j][i].index === 0) {
                this.subListBody_dom[j][i].width = firstWidth;
                this.subListBody_dom[j][i].left =
                  width * (this.subListBody_dom[j][i].index - val) + 0.0000001;
              } else {
                this.subListBody_dom[j][i].left =
                  width * (this.subListBody_dom[j][i].index - val - 1) +
                  firstWidth +
                  0.0000001;
              }
              if (
                this.subListBody_dom[j][i].index ===
                this.subListBody[j].length - 1
              ) {
                this.subListBody_dom[j][i].width = lastWidth;
              }
            }
          });
          let wT = 0,
            wA = [],
            wAT = [0];
          this.subNextListBody[j].map((item, i) => {
            this.subNextListBody[j][i].top = 3.125;
            let w = newNextWidth;
            if (this.currentDepth === 4) {
              w =
                ((12 * width) / this.subNextListBody[j][i].yearDays) *
                this.subNextListBody[j][i].daySpan;
            } else if (this.currentDepth === 3) {
              w = width / 7;
            }
            wA[i] = w;
            if (i > 0) {
              wT += wA[i - 1];
              wAT[i] = wT;
            }
            this.subNextListBody[j][i].width = w;
            this.subNextListBody[j][i].marginLeft = 0;
            this.subNextListBody[j][i].left = wT - width * val;
            if (this.currentDepth === 3 && val !== 0) {
              this.subNextListBody[j][i].marginLeft = width - firstWidth;
            }
          });
          this.subNextListBody_dom[j].map((item, i) => {
            this.subNextListBody_dom[j][i].top = 3.125;
            this.subNextListBody_dom[j][i].width =
              wA[this.subNextListBody_dom[j][i].index];
            this.subNextListBody_dom[j][i].marginLeft = 0;
            this.subNextListBody_dom[j][i].left =
              wAT[this.subNextListBody_dom[j][i].index] - width * val;
            if (this.currentDepth === 3 && val !== 0) {
              this.subNextListBody_dom[j][i].marginLeft = width - firstWidth;
            }
          });
          this.$forceUpdate();
        }
        setTimeout(
          () => {
            this.rebuildBody("down");
          },
          this.hasAni ? 2000 / this.speed : 0
        );
      }, 50);
    },
    //Body上钻动画
    supBodyToAni(val) {
      this.needAni = false;
      let width = this.tableWidth;
      for (let j = 0; j < this.$bus.goalTable.goalTree.length; j++) {
        this.supPrevListBody[j] = this.fetchBodyData(this.currentDepth, j);
        this.supPrevListBody[j].map((item, i) => {
          this.supPrevListBody[j][i].top = -3.124;
          this.supPrevListBody[j][i].width = width * this.supList.length;
          this.supPrevListBody[j][i].left = width * (i - val);
        });
        this.supPrevListBody_dom[j] = [];
        this.supPrevListBody[j].map((item, i) => {
          if (!item.hide) {
            this.supPrevListBody_dom[j].push(item);
            this.supPrevListBody_dom[j][
              this.supPrevListBody_dom[j].length - 1
            ].index = i;
          }
        });
        this.supPrevListBody_dom[j].map((item, i) => {
          this.supPrevListBody_dom[j][i].top = -3.124;
          this.supPrevListBody_dom[j][i].width = width * this.supList.length;
          this.supPrevListBody_dom[j][i].left =
            width * (this.supPrevListBody_dom[j][i].index - val);
        });
      }
      setTimeout(() => {
        if (this.hasAni2) {
          for (let j = 0; j < this.$bus.goalTable.goalTree.length; j++) {
            this.supListBody_dom[j] = [];
            this.supListBody[j].map((item, i) => {
              this.supListBody[j][i].hide = false;
              this.supListBody_dom[j].push(item);
              this.supListBody_dom[j][
                this.supListBody_dom[j].length - 1
              ].index = i;
              this.supListBody_dom[j][
                this.supListBody_dom[j].length - 1
              ].hide = false;
            });
            this.subListBody_dom[j] = [];
            this.subListBody[j].map((item, i) => {
              this.subListBody[j][i].hide = false;
              this.subListBody_dom[j].push(item);
              this.subListBody_dom[j][
                this.subListBody_dom[j].length - 1
              ].index = i;
              this.subListBody_dom[j][
                this.subListBody_dom[j].length - 1
              ].hide = false;
            });
          }
        }
        this.needAni = true;
        setTimeout(() => {
          for (let j = 0; j < this.$bus.goalTable.goalTree.length; j++) {
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
            this.supPrevListBody[j].map((item, i) => {
              this.supPrevListBody[j][i].marginLeft = 0;
              this.supPrevListBody[j][i].top = 0;
              this.supPrevListBody[j][i].width = width;
              this.supPrevListBody[j][i].left = width * (i - percent);
            });
            this.supPrevListBody_dom[j].map((item, i) => {
              this.supPrevListBody_dom[j][i].marginLeft = 0;
              this.supPrevListBody_dom[j][i].top = 0;
              this.supPrevListBody_dom[j][i].width = width;
              this.supPrevListBody_dom[j][i].left =
                width * (this.supPrevListBody_dom[j][i].index - percent);
            });
            let wT = 0,
              wA = [],
              wAT = [0];
            this.supListBody[j].map((item, i) => {
              this.supListBody[j][i].top = 3.125;
              let w = supWidth;
              if (this.currentDepth === 4) {
                w =
                  ((12 * width) / this.supListBody[j][i].yearDays) *
                  this.supListBody[j][i].daySpan;
              }
              wA[i] = w;
              if (i > 0) {
                wT += wA[i - 1];
                wAT[i] = wT;
              }
              this.supListBody[j][i].width = w;
              this.supListBody[j][i].marginLeft = 0;
              this.supListBody[j][i].left = wT - width * percent;
            });
            this.supListBody_dom[j].map((item, i) => {
              this.supListBody_dom[j][i].marginLeft = 0;
              this.supListBody_dom[j][i].top = 3.125;
              this.supListBody_dom[j][i].width =
                wA[this.supListBody_dom[j][i].index];
              this.supListBody_dom[j][i].left =
                wAT[this.supListBody_dom[j][i].index] - width * percent;
            });
            this.subListBody[j].map((item, i) => {
              this.subListBody[j][i].marginLeft = 0;
              this.subListBody[j][i].top = 6.4;
              this.subListBody[j][i].width = subWidth;
              this.subListBody[j][i].left = subWidth * i - width * percent;
            });
            this.subListBody_dom[j].map((item, i) => {
              this.subListBody_dom[j][i].marginLeft = 0;
              this.subListBody_dom[j][i].top = 6.4;
              this.subListBody_dom[j][i].width = subWidth;
              this.subListBody_dom[j][i].left =
                subWidth * this.subListBody_dom[j][i].index - width * percent;
            });
          }
          this.$forceUpdate();
          setTimeout(
            () => {
              this.rebuildBody("up");
            },
            this.hasAni ? 2000 / this.speed : 0
          );
        }, 100);
      });
    },
    //重新构建Body结构
    rebuildBody(type) {
      switch (type) {
        case "down":
          this.needAni = false;
          for (let j = 0; j < this.$bus.goalTable.goalTree.length; j++) {
            this.supListBody[j] = this.subListBody[j];
            this.subListBody[j] = this.subNextListBody[j];
            this.supListBody[j].map((item, i) => {
              let temp = this.supListBody[j][i].left;
              let hide = temp > 120 || temp < -120;
              this.supListBody[j][i].hide = hide;
            });
            this.subListBody[j].map((item, i) => {
              let temp = this.subListBody[j][i].left;
              let hide = temp > 120 || temp < -120;
              this.subListBody[j][i].hide = hide;
            });
            this.supListBody_dom[j] = [];
            this.supListBody[j].map((item, i) => {
              if (!item.hide) {
                this.supListBody_dom[j].push(item);
                this.supListBody_dom[j][
                  this.supListBody_dom[j].length - 1
                ].index = i;
              }
            });
            this.subListBody_dom[j] = [];
            this.subListBody[j].map((item, i) => {
              if (!item.hide) {
                this.subListBody_dom[j].push(item);
                this.subListBody_dom[j][
                  this.subListBody_dom[j].length - 1
                ].index = i;
              }
            });
            this.$forceUpdate();
          }
          break;
        case "up":
          this.needAni = false;
          for (let j = 0; j < this.$bus.goalTable.goalTree.length; j++) {
            this.subListBody[j] = this.supListBody[j];
            this.supListBody[j] = this.supPrevListBody[j];
            this.supListBody[j].map((item, i) => {
              let temp = this.supListBody[j][i].left;
              let hide = temp > 120 || temp < -120;
              this.supListBody[j][i].hide = hide;
            });
            this.subListBody[j].map((item, i) => {
              let temp = this.subListBody[j][i].left;
              let hide = temp > 120 || temp < -120;
              this.subListBody[j][i].hide = hide;
            });
            this.supListBody_dom[j] = [];
            this.supListBody[j].map((item, i) => {
              if (!item.hide) {
                this.supListBody_dom[j].push(item);
                this.supListBody_dom[j][
                  this.supListBody_dom[j].length - 1
                ].index = i;
              }
            });
            this.subListBody_dom[j] = [];
            this.subListBody[j].map((item, i) => {
              if (!item.hide) {
                this.subListBody_dom[j].push(item);
                this.subListBody_dom[j][
                  this.subListBody_dom[j].length - 1
                ].index = i;
              }
            });
            this.$forceUpdate();
          }
          break;

        default:
          break;
      }
    },
    //初始化Body样式
    initBodyStyle(row, val) {
      this.$nextTick(() => {
        this.needAni = false;
        let width = this.tableWidth;
        let subWidth = (width / this.subList.length) * this.supList.length;
        this.supListBody[row]?.map((item, i) => {
          this.supListBody[row][i].top = 0;
          this.supListBody[row][i].width = width;
          this.supListBody[row][i].marginLeft = 0;
          this.supListBody[row][i].left = width * (i - val);
        });
        let leftTotal = 0;
        this.subListBody[row]?.map((item, i) => {
          this.subListBody[row][i].top = 3.125;
          this.subListBody[row][i].width = subWidth;
          if (i > 0) leftTotal += subWidth;
          this.subListBody[row][i].marginLeft = 0;
          this.subListBody[row][i].left = leftTotal - width * val;
        });
        this.$forceUpdate();
      });
    },
    //获取Body数据
    fetchBodyData(depth, row) {
      let tempList = [],
        tempSum = 0,
        tempCnt = 0,
        totalCnt = 0,
        tempYear,
        tempArr,
        curYear,
        isFar;
      switch (depth) {
        case 8:
          return [
            {
              text: this.$bus.goalTable.goalTree[row]?.[0]?.[0]?.desc ?? "",
              finish:
                this.$bus.goalTable.goalTree[row]?.[0]?.[0]?.finish ?? false,
              bold: this.$bus.goalTable.goalTree[row]?.[0]?.[0]?.bold ?? false,
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
              text: this.$bus.goalTable.goalTree[row]?.[1]?.[i]?.desc ?? "",
              finish:
                this.$bus.goalTable.goalTree[row]?.[1]?.[i]?.finish ?? false,
              bold: this.$bus.goalTable.goalTree[row]?.[1]?.[i]?.bold ?? false,
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
          totalCnt = 0;
          for (let j = 0; j < 20; j++) {
            for (let i = 0; i < 5; i++) {
              curYear = this.indexList[1] * 5 - 5 * j - i;
              isFar = curYear < -5 || curYear > 1;
              tempList.push({
                text:
                  this.$bus.goalTable.goalTree[row]?.[2]?.[totalCnt]?.desc ??
                  "",
                finish:
                  this.$bus.goalTable.goalTree[row]?.[2]?.[totalCnt]?.finish ??
                  false,
                bold:
                  this.$bus.goalTable.goalTree[row]?.[2]?.[totalCnt]?.bold ??
                  false,
                showInput: false,
                top: 0,
                left: 0,
                width: 0,
                marginLeft: 0,
                hide: isFar,
              });
              totalCnt++;
            }
          }
          return tempList;
        case 5:
          tempList = [];
          totalCnt = 0;
          for (let k = 0; k < 20; k++) {
            for (let j = 0; j < 5; j++) {
              curYear = this.indexList[2] - 5 * k - j;
              isFar = curYear < -1 || curYear > 1;
              for (let i = 0; i < 4; i++) {
                tempList.push({
                  text:
                    this.$bus.goalTable.goalTree[row]?.[3]?.[totalCnt]?.desc ??
                    "",
                  finish:
                    this.$bus.goalTable.goalTree[row]?.[3]?.[totalCnt]
                      ?.finish ?? false,
                  bold:
                    this.$bus.goalTable.goalTree[row]?.[3]?.[totalCnt]?.bold ??
                    false,
                  showInput: false,
                  top: 0,
                  left: 0,
                  width: 0,
                  marginLeft: 0,
                  hide: isFar,
                });
                totalCnt++;
              }
            }
          }
          return tempList;
        case 4:
          tempList = [];
          totalCnt = 0;
          for (let p = 0; p < 20; p++) {
            for (let k = 0; k < 5; k++) {
              curYear = this.indexList[3] / 4 - 5 * p - k;
              isFar = curYear < 0 || curYear > 0.8;
              for (let j = 0; j < 4; j++) {
                for (let i = 0; i < 3; i++) {
                  tempList.push({
                    text:
                      this.$bus.goalTable.goalTree[row]?.[4]?.[totalCnt]
                        ?.desc ?? "",
                    finish:
                      this.$bus.goalTable.goalTree[row]?.[4]?.[totalCnt]
                        ?.finish ?? false,
                    bold:
                      this.$bus.goalTable.goalTree[row]?.[4]?.[totalCnt]
                        ?.bold ?? false,
                    showInput: false,
                    top: 0,
                    left: 0,
                    width: 0,
                    marginLeft: 0,
                    hide: isFar,
                  });
                  totalCnt++;
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
              isFar = isFar > 1 || isFar < -1;
              let tempNo = 7 - tempSum,
                tempBase = 7 - tempNo,
                tD = 8 - tempNo,
                nD,
                totalDay = isRun ? 366 : 365,
                tM = 0;
              let x = tempCnt++;
              if (m === 0 && p === 0) {
                tempList.push({
                  text: this.$bus.goalTable.goalTree[row]?.[5]?.[x]?.desc ?? "",
                  finish:
                    this.$bus.goalTable.goalTree[row]?.[5]?.[x]?.finish ??
                    false,
                  bold:
                    this.$bus.goalTable.goalTree[row]?.[5]?.[x]?.bold ?? false,
                  showInput: false,
                  top: 0,
                  left: 0,
                  width: 0,
                  marginLeft: 0,
                  hide: isFar,
                  yearGroup: tempYear,
                  yearDays: totalDay,
                  daySpan: 7 - tempNo,
                });
              } else {
                if (tempNo !== 0) {
                  tempCnt--;
                  let y = tempList[tempList.length - 1];
                  tempList[tempList.length - 1] = {
                    text: y.text,
                    finish: y.finish,
                    bold: y.bold,
                    showInput: false,
                    top: 0,
                    left: 0,
                    width: 0,
                    marginLeft: 0,
                    hide: y.hide,
                    yearGroup: y.yearGroup,
                    yearDays: y.yearDays,
                    daySpan: 7,
                  };
                }
              }
              while (tempBase + 7 <= totalDay) {
                nD = tD + 6;
                if (nD > tempArr[tM]) {
                  nD -= tempArr[tM];
                  tM++;
                }
                tempBase += 7;
                let x = tempCnt++;
                tempList.push({
                  text: this.$bus.goalTable.goalTree[row]?.[5]?.[x]?.desc ?? "",
                  finish:
                    this.$bus.goalTable.goalTree[row]?.[5]?.[x]?.finish ??
                    false,
                  bold:
                    this.$bus.goalTable.goalTree[row]?.[5]?.[x]?.bold ?? false,
                  showInput: false,
                  top: 0,
                  left: 0,
                  width: 0,
                  marginLeft: 0,
                  hide: isFar,
                  yearGroup: tempYear,
                  yearDays: totalDay,
                  daySpan: 7,
                });
                tD = nD + 1;
                if (tD > tempArr[tM]) {
                  tD -= tempArr[tM];
                  tM++;
                }
              }
              if (tempBase < totalDay) {
                let x = tempCnt++;
                tempList.push({
                  text: this.$bus.goalTable.goalTree[row]?.[5]?.[x]?.desc ?? "",
                  finish:
                    this.$bus.goalTable.goalTree[row]?.[5]?.[x]?.finish ??
                    false,
                  bold:
                    this.$bus.goalTable.goalTree[row]?.[5]?.[x]?.bold ?? false,
                  showInput: false,
                  top: 0,
                  left: 0,
                  width: 0,
                  marginLeft: 0,
                  hide: isFar,
                  yearGroup: tempYear,
                  yearDays: totalDay,
                  daySpan: 32 - tD,
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
          tempArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
          tempCnt = 0;
          for (let j = 0; j < 100; j++) {
            tempYear = this.birthYear + j;
            curYear = (this.indexList[5] * 7) / 365 - j;
            isFar = curYear < -0.25 || curYear > 0.5;
            let isRun =
                (tempYear % 4 === 0 && tempYear % 100 !== 0) ||
                tempYear % 400 === 0,
              totalDay = isRun ? 366 : 365;
            tempArr[1] = isRun ? 29 : 28;
            for (let i = 0; i < 12; i++) {
              for (let k = 1; k <= tempArr[i]; k++) {
                let x = tempCnt++;
                tempList.push({
                  text: this.$bus.goalTable.goalTree[row]?.[6]?.[x]?.desc ?? "",
                  finish:
                    this.$bus.goalTable.goalTree[row]?.[6]?.[x]?.finish ??
                    false,
                  bold:
                    this.$bus.goalTable.goalTree[row]?.[6]?.[x]?.bold ?? false,
                  isAssigned:
                    this.$bus.goalTable.goalTree[row]?.[6]?.[x]?.isAssigned ??
                    false,
                  showInput: false,
                  top: 0,
                  left: 0,
                  width: 0,
                  marginLeft: 0,
                  yearDays: totalDay,
                  hide: isFar,
                });
              }
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
      this.supList_dom = [];
      this.supList.map((item, i) => {
        if (!item.hide) {
          this.supList_dom.push(item);
          this.supList_dom[this.supList_dom.length - 1].index = i;
        }
      });
      this.subList = this.fetchHeaderData(this.currentDepth - 1);
      this.subList_dom = [];
      this.subList.map((item, i) => {
        if (!item.hide) {
          this.subList_dom.push(item);
          this.subList_dom[this.subList_dom.length - 1].index = i;
        }
      });
      for (let i = 0; i < this.$bus.goalTable.goalTree.length; i++) {
        this.supListBody[i] = this.fetchBodyData(this.currentDepth, i);
        this.supListBody_dom[i] = [];
        this.supListBody[i].map((item, j) => {
          if (!item.hide) {
            this.supListBody_dom[i].push(item);
            this.supListBody_dom[i][this.supListBody_dom[i].length - 1].index =
              j;
          }
        });
        this.subListBody[i] = this.fetchBodyData(this.currentDepth - 1, i);
        this.subListBody_dom[i] = [];
        this.subListBody[i].map((item, j) => {
          if (!item.hide) {
            this.subListBody_dom[i].push(item);
            this.subListBody_dom[i][this.subListBody_dom[i].length - 1].index =
              j;
          }
        });
        this.initBodyStyle(i, 0);
        this.updateTableWidth();
      }
    },
    //初始化行样式
    initBodyLine() {
      for (let i = 0; i < this.$bus.goalTable.goalTree.length; i++) {
        this.supListBody[i] = this.fetchBodyData(this.currentDepth, i);
        this.supListBody_dom[i] = [];
        this.supListBody[i].map((item, j) => {
          if (!item.hide) {
            this.supListBody_dom[i].push(item);
            this.supListBody_dom[i][this.supListBody_dom[i].length - 1].index =
              j;
          }
        });
        this.subListBody[i] = this.fetchBodyData(this.currentDepth - 1, i);
        this.subListBody_dom[i] = [];
        this.subListBody[i].map((item, j) => {
          if (!item.hide) {
            this.subListBody_dom[i].push(item);
            this.subListBody_dom[i][this.subListBody_dom[i].length - 1].index =
              j;
          }
        });
        this.$forceUpdate();
      }
    },
    //点击单元格
    clickItem(type, row, val) {
      if (
        this.supListBody[row][val]?.showInput ||
        this.subListBody[row][val]?.showInput
      )
        return;
      setTimeout(() => {
        if (type === "up") {
          this.supListBody[row][val].showInput = true;
        } else {
          if (
            this.currentDepth === 3 &&
            this.$bus.goalTable.goalTree[row]?.[6]?.[val]?.isAssigned
          ) {
            Notification.warning({
              title: "注意",
              message: "该任务已经被安排",
              showClose: false,
              duration: 2500,
            });
            return;
          }
          this.subListBody[row][val].showInput = true;
        }
        this.$forceUpdate();
        this.$nextTick(() => {
          let input = document.getElementById(
            "input_" + type + "_" + row + "_" + val
          );
          if (!input) return;
          let offset =
            input.getBoundingClientRect().x +
            input.getBoundingClientRect().width -
            document.body.clientWidth;
          if (offset > 5) {
            this.$refs.tableBody.scrollLeft += offset;
          }
          input.select();
          input.focus();
        });
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
      if (!this.$bus.goalTable.goalTree[row][depth])
        this.$bus.goalTable.goalTree[row][depth] = {};
      if (!this.$bus.goalTable.goalTree[row][depth][val])
        this.$bus.goalTable.goalTree[row][depth][val] = {};
      if (type === "down") {
        this.$bus.goalTable.goalTree[row][depth][val].desc =
          this.subListBody[row][val].text;
      } else {
        this.$bus.goalTable.goalTree[row][depth][val].desc =
          this.supListBody[row][val].text;
      }
      if (depth === 0) {
        this.findAspectAndUpdateText(
          row,
          this.$bus.goalTable.goalTree[row][depth][val].desc
        );
      }
      this.$forceUpdate();
      this.$bus.$emit("save");
    },
    //寻找对应行的aspect并更新text
    findAspectAndUpdateText(row, text) {
      let index = 0;
      for (let i = 0; i < this.$bus.goalTable.aspect.length; i++) {
        if (this.$bus.goalTable.aspect[i].children.length === 0) {
          if (index === row) {
            this.$bus.goalTable.aspect[i].children = [
              {
                text: "方面",
                goal: {
                  text: "项目的一生目标",
                },
                children: [
                  {
                    text: "项目",
                    goal: {
                      text: text,
                    },
                    children: [],
                  },
                ],
              },
            ];
            return;
          }
          index += 1;
        }
        for (
          let j = 0;
          j < this.$bus.goalTable.aspect[i].children.length;
          j++
        ) {
          if (this.$bus.goalTable.aspect[i].children[j].children.length === 0) {
            if (index === row) {
              this.$bus.goalTable.aspect[i].children[j].children = [
                {
                  text: "方面",
                  goal: {
                    text: text,
                  },
                  children: [],
                },
              ];
              return;
            }
            index += 1;
          }
          for (
            let k = 0;
            k < this.$bus.goalTable.aspect[i].children[j].children.length;
            k++
          ) {
            if (index === row) {
              this.$bus.goalTable.aspect[i].children[j].children[k].goal.text =
                text;
              return;
            }
            index++;
          }
        }
      }
    },
    //更新表格宽度
    updateTableWidth() {
      if (this.needAni) return;
      let totalWidth = this.basePx;
      let tableWidth = this.$refs.table.offsetWidth;
      this.tableWidth = tableWidth / totalWidth;
      this.initHeaderStyle(this.indexList[8 - this.currentDepth]);
      for (let i = 0; i < this.$bus.goalTable.goalTree.length; i++) {
        this.initBodyStyle(i, this.indexList[8 - this.currentDepth]);
      }
      this.$refs.tableBody.scrollLeft += 0.1;
    },
    //处理Body滚动
    handleScroll() {
      if (this.$refs.tableBody.scrollTop === this.cacheNum) {
        this.handleScrollX();
      } else {
        this.$emit("scroll", this.$refs.tableBody.scrollTop);
      }
      this.cacheNum = this.$refs.tableBody.scrollTop;
    },
    //同步Body垂直方向滚动轴
    updateScroll(val) {
      this.$refs.tableBody.scrollTop = val;
    },
    //改变全局状态
    changeState(state) {
      switch (state) {
        case 5:
          {
            this.speed = 8 - this.currentDepth;
            let fun = () => {
              if (this.currentDepth !== 8) {
                this.supToAni(this.indexList[8 - this.currentDepth]);
                setTimeout(() => {
                  fun();
                }, 2000 / this.speed);
              } else {
                this.speed = 1;
              }
            };
            fun();
          }
          break;
        case 6:
          {
            if (this.currentDepth === 8) {
              this.speed = 1;
              let val = 0;
              for (let i = 0; i < this.subList.length; i++) {
                if (this.subList[i].current) {
                  val = i;
                  break;
                }
              }
              this.subToAni(val);
            } else if (this.currentDepth !== 7) {
              this.speed = 7 - this.currentDepth;
              let fun = () => {
                if (this.currentDepth !== 7) {
                  this.supToAni(this.indexList[8 - this.currentDepth]);
                  setTimeout(() => {
                    fun();
                  }, 2000 / this.speed);
                } else {
                  this.speed = 1;
                }
              };
              fun();
            }
          }
          break;
        case 8:
          {
            if (this.currentDepth > 6) {
              this.speed = this.currentDepth - 6;
              let fun = () => {
                if (this.currentDepth !== 6) {
                  let val = 0;
                  for (let i = 0; i < this.subList.length; i++) {
                    if (this.subList[i].current) {
                      val = i;
                      break;
                    }
                  }
                  this.subToAni(val);
                  setTimeout(() => {
                    fun();
                  }, 2000 / this.speed);
                } else {
                  this.speed = 1;
                }
              };
              fun();
            } else if (this.currentDepth !== 6) {
              this.speed = 6 - this.currentDepth;
              let fun = () => {
                if (this.currentDepth !== 6) {
                  this.supToAni(this.indexList[8 - this.currentDepth]);
                  setTimeout(() => {
                    fun();
                  }, 2000 / this.speed);
                } else {
                  this.speed = 1;
                }
              };
              fun();
            }
          }
          break;
        case 9:
          {
            if (this.currentDepth > 5) {
              this.speed = this.currentDepth - 5;
              let fun = () => {
                if (this.currentDepth !== 5) {
                  let val = 0;
                  for (let i = 0; i < this.subList.length; i++) {
                    if (this.subList[i].current) {
                      val = i;
                      break;
                    }
                  }
                  this.subToAni(val);
                  setTimeout(() => {
                    fun();
                  }, 2000 / this.speed);
                } else {
                  this.speed = 1;
                }
              };
              fun();
            } else if (this.currentDepth !== 5) {
              this.speed = 5 - this.currentDepth;
              let fun = () => {
                if (this.currentDepth !== 5) {
                  this.supToAni(this.indexList[8 - this.currentDepth]);
                  setTimeout(() => {
                    fun();
                  }, 2000 / this.speed);
                } else {
                  this.speed = 1;
                }
              };
              fun();
            }
          }
          break;
        case 10:
          {
            if (this.currentDepth > 4) {
              this.speed = this.currentDepth - 4;
              let fun = () => {
                if (this.currentDepth !== 4) {
                  let val = 0;
                  for (let i = 0; i < this.subList.length; i++) {
                    if (this.subList[i].current) {
                      val = i;
                      break;
                    }
                  }
                  this.subToAni(val);
                  setTimeout(() => {
                    fun();
                  }, 2000 / this.speed);
                } else {
                  this.speed = 1;
                }
              };
              fun();
            } else if (this.currentDepth !== 4) {
              this.speed = 4 - this.currentDepth;
              let fun = () => {
                if (this.currentDepth !== 4) {
                  this.supToAni(this.indexList[8 - this.currentDepth]);
                  setTimeout(() => {
                    fun();
                  }, 2000 / this.speed);
                } else {
                  this.speed = 1;
                }
              };
              fun();
            }
          }
          break;
        case 11:
          {
            if (this.currentDepth > 3) {
              this.speed = this.currentDepth - 3;
              let fun = () => {
                if (this.currentDepth !== 3) {
                  let val = 0;
                  for (let i = 0; i < this.subList.length; i++) {
                    if (this.subList[i].current) {
                      val = i;
                      break;
                    }
                  }
                  this.subToAni(val);
                  setTimeout(() => {
                    fun();
                  }, 2000 / this.speed);
                } else {
                  this.speed = 1;
                }
              };
              fun();
            }
          }
          break;

        default:
          break;
      }
    },
    //右键菜单
    onContextmenu(event, row, val, type) {
      let depth = 8 - this.currentDepth;
      if (type === "down") depth++;
      let item = [];
      if (type === "up") {
        if (this.supListBody[row][val].finish) {
          item.push({
            label: "取消完成",
            onClick: () => {
              this.supListBody[row][val].finish = false;
              this.$bus.goalTable.goalTree[row][depth][val].finish = false;
              this.$bus.$emit("save");
            },
          });
        } else {
          item.push({
            label: "完成",
            onClick: () => {
              this.supListBody[row][val].finish = true;
              this.$bus.goalTable.goalTree[row][depth][val].finish = true;
              this.$bus.$emit("save");
            },
          });
        }
        if (this.supListBody[row][val].bold) {
          item.push({
            label: "取消重点",
            onClick: () => {
              this.supListBody[row][val].bold = false;
              this.$bus.goalTable.goalTree[row][depth][val].bold = false;
              this.$bus.$emit("save");
            },
          });
        } else {
          item.push({
            label: "重点",
            onClick: () => {
              this.supListBody[row][val].bold = true;
              this.$bus.goalTable.goalTree[row][depth][val].bold = true;
              this.$bus.$emit("save");
            },
          });
        }
      } else {
        if (this.subListBody[row][val].finish) {
          item.push({
            label: "取消完成",
            onClick: () => {
              this.subListBody[row][val].finish = false;
              this.$bus.goalTable.goalTree[row][depth][val].finish = false;
              this.$bus.$emit("save");
            },
          });
        } else {
          item.push({
            label: "完成",
            onClick: () => {
              if (
                depth === 6 &&
                this.$bus.goalTable.goalTree[row][depth][val].isAssigned
              ) {
                Notification.warning({
                  title: "注意",
                  message: "该任务已经被安排",
                  showClose: false,
                  duration: 2500,
                });
                return;
              }
              this.subListBody[row][val].finish = true;
              this.$bus.goalTable.goalTree[row][depth][val].finish = true;
              this.$bus.$emit("save");
            },
          });
        }
        if (this.subListBody[row][val].bold) {
          item.push({
            label: "取消重点",
            onClick: () => {
              if (
                depth === 6 &&
                this.$bus.goalTable.goalTree[row][depth][val].isAssigned
              ) {
                Notification.warning({
                  title: "注意",
                  message: "该任务已经被安排",
                  showClose: false,
                  duration: 2500,
                });
                return;
              }
              this.subListBody[row][val].bold = false;
              this.$bus.goalTable.goalTree[row][depth][val].bold = false;
              this.$bus.$emit("save");
            },
          });
        } else {
          item.push({
            label: "重点",
            onClick: () => {
              if (
                depth === 6 &&
                this.$bus.goalTable.goalTree[row][depth][val].isAssigned
              ) {
                Notification.warning({
                  title: "注意",
                  message: "任务已经被安排",
                  showClose: false,
                  duration: 2500,
                });
                return;
              }
              this.subListBody[row][val].bold = true;
              this.$bus.goalTable.goalTree[row][depth][val].bold = true;
              this.$bus.$emit("save");
            },
          });
        }
        if (this.currentDepth === 3) {
          item.push({
            label: "Hours",
            onClick: () => {
              let dom = document.getElementById("subBody_" + row + "_" + val);
              this.$emit("showHours", val);
              if (dom) {
                let offset =
                  dom.getBoundingClientRect().x +
                  dom.getBoundingClientRect().width -
                  document.body.clientWidth +
                  34.75 * this.basePx;
                if (offset > 5) {
                  this.$refs.tableBody.scrollLeft += offset;
                }
              }
            },
          });
        }
      }
      this.$contextmenu({
        items: item,
        event,
        customClass: "custom-class",
        zIndex: 3,
        minWidth: 120,
      });
    },
  },
  watch: {
    currentDepth(val) {
      this.$emit("state", val);
    },
  },
  created() {
    this.updateBasePx();
    this.birth = new Date(this.$bus.goalTable.initialTimeStamp);
    this.birthYear = this.birth.getFullYear();
    setTimeout(() => {
      this.$nextTick(() => {
        this.initData();
      });
    }, 10);
    this.cachePx = this.basePx;
    window.addEventListener("resize", () => {
      this.updateBasePx();
      this.$refs.tableBody.scrollLeft =
        (this.$refs.tableBody.scrollLeft / this.cachePx) * this.basePx;
      this.cachePx = this.basePx;
    });
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
.current {
  background: rgb(66, 185, 131);
  color: rgb(51, 51, 51);
}
.bold {
  font-weight: 700;
}
.assigned {
  color: green;
}
.finish {
  color: rgb(170, 170, 170);
  text-decoration: line-through;
  font-weight: bold;
}
.ani,
.ani1 {
  transition: margin-left 1s cubic-bezier(0, 0.73, 0.04, 0.98),
    left 1s cubic-bezier(0, 0.73, 0.04, 0.98),
    width 1s cubic-bezier(0, 0.73, 0.04, 0.98),
    top 1s cubic-bezier(0, 0.73, 0.04, 0.98) 1s;
}
.ani2 {
  transition: margin-left 0.5s cubic-bezier(0, 0.73, 0.04, 0.98),
    left 0.5s cubic-bezier(0, 0.73, 0.04, 0.98),
    width 0.5s cubic-bezier(0, 0.73, 0.04, 0.98),
    top 0.5s cubic-bezier(0, 0.73, 0.04, 0.98) 0.5s;
}
.ani3 {
  transition: margin-left 0.33s cubic-bezier(0, 0.73, 0.04, 0.98),
    left 0.33s cubic-bezier(0, 0.73, 0.04, 0.98),
    width 0.33s cubic-bezier(0, 0.73, 0.04, 0.98),
    top 0.33s cubic-bezier(0, 0.73, 0.04, 0.98) 0.33s;
}
.ani4 {
  transition: margin-left 0.25s cubic-bezier(0, 0.73, 0.04, 0.98),
    left 0.25s cubic-bezier(0, 0.73, 0.04, 0.98),
    width 0.25s cubic-bezier(0, 0.73, 0.04, 0.98),
    top 0.25s cubic-bezier(0, 0.73, 0.04, 0.98) 0.25s;
}
.ani5 {
  transition: margin-left 0.2s cubic-bezier(0, 0.73, 0.04, 0.98),
    left 0.2s cubic-bezier(0, 0.73, 0.04, 0.98),
    width 0.2s cubic-bezier(0, 0.73, 0.04, 0.98),
    top 0.2s cubic-bezier(0, 0.73, 0.04, 0.98) 0.2s;
}
</style>
