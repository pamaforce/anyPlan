import { Notification } from "element-ui";
export const dragTaskMixin = {
    data() {
        return {
            hourInfo: {}, // 当前Hours信息
            curRightClickTd: null, // 当前被右击的单元格Dom
            curRightTdConfig: {}, // 当前被右击的单元格信息
            curDragTdDom: null, // 当前被拖拽的单元格
            curDragInfo: {}, // 当前被拖拽的单元格数据
            curMoveDom: null, // 当前拖拽的效果元素
            dragOverConfig: {}, // 拖拽悬停所在元素的信息
            dragTaskInfo: {}, // 被拖拽元素的信息
            isDragBlockMove: false,
            isHourShow: false,
            showMenu: false,
            tempVal: -1,
        };
    },
    mounted() {
        this.curMoveDom = this.$refs.hoursPanel.$refs.to_move_dom;
    },
    methods: {
        dragTaskStart(event, row, val) {
            this.tempVal = val;
            // 锁定被拖拽的元素
            if (event.target.tagName == "INPUT") {
                this.curDragTdDom = event.target.parentNode;
            } else if (event.target.tagName == "P") {
                this.curDragTdDom = event.target.parentNode;
            } else {
                this.curDragTdDom = event.target;
            }
            this.curDragInfo = this.$refs.mainTable.subListBody[row][val];
            // // 组装被拖拽任务的信息
            let isMain = this.curDragInfo.bold;
            if (isMain) {
                this.dragTaskInfo.taskLevel = "level1";
            } else {
                this.dragTaskInfo.taskLevel = "level2";
            }
            this.dragTaskInfo.taskDay = val;
            this.dragTaskInfo.taskId = row;
            this.dragTaskInfo.text = this.curDragInfo.text;
            this.dragTaskInfo = JSON.parse(JSON.stringify(this.dragTaskInfo));
            this.isDragBlockMove = true;
            document.addEventListener("mousemove", this.documentMove);
            document.addEventListener("mouseup", this.documentUp);
        },
        documentMove(event) {
            // 已安排任务检测
            let isAssigned = this.curDragInfo.isAssigned;
            if (isAssigned) {
                this.isDragBlockMove = false;
                document.removeEventListener("mousemove", this.documentMove);
                document.removeEventListener("mouseup", this.documentUp);
                Notification.warning({
                    title: "注意",
                    message: "无法安排已安排的任务！",
                    showClose: false,
                    duration: 2500,
                });
                return;
            }
            // 已完成任务检测
            let hasDone = this.curDragInfo.finish;
            if (hasDone) {
                this.isDragBlockMove = false;
                document.removeEventListener("mousemove", this.documentMove);
                document.removeEventListener("mouseup", this.documentUp);
                Notification.warning({
                    title: "注意",
                    message: "无法安排已完成的任务！",
                    showClose: false,
                    duration: 2500,
                });
                return;
            }
            // 日期检测
            if (this.tempVal !== this.tempDay) {
                this.isDragBlockMove = false;
                document.removeEventListener("mousemove", this.documentMove);
                document.removeEventListener("mouseup", this.documentUp);
                Notification.warning({
                    title: "注意",
                    message: "无法安排不同日的任务！",
                    showClose: false,
                    duration: 2500,
                });
                return;
            }
            this.moveAreaChange({ event, type: "body" });
        },
        documentUp() {
            this.moveAreaChange({ type: "hidden" });
            this.isDragBlockMove = false;
            document.removeEventListener("mousemove", this.documentMove);
            document.removeEventListener("mouseup", this.documentUp);
        },
        dragTaskEnd() {
            this.moveAreaChange({ type: "hidden" });
            this.isDragBlockMove = false;
        },
        moveAreaChange(config) {
            if (!this.curMoveDom) {
                return;
            }
            this.dragOverConfig.type = config.type;
            this.dragOverConfig.timeLeft = config.timeLeft;
            this.dragOverConfig.startTime = config.startTime;
            this.dragOverConfig.endTime = config.endTime;
            this.dragOverConfig = JSON.parse(JSON.stringify(this.dragOverConfig));
            switch (config.type) {
                // 隐藏状态
                case "hidden":
                    this.curMoveDom.style.display = "none";
                    break;
                case "body":
                    {
                        let width = this.curDragTdDom.offsetWidth;
                        let height = this.curDragTdDom.offsetHeight;
                        this.curMoveDom.style.top = config.event.y - height / 2 + "px";
                        this.curMoveDom.style.left = config.event.x - width / 2 + "px";
                        this.curMoveDom.style.width = width + "px";
                        this.curMoveDom.style.height = height + "px";
                        this.curMoveDom.style.display = "flex";
                        this.curMoveDom.style.background = "#eee";
                    }
                    break;
                case "level":
                    config.event.stopPropagation();
                    this.curMoveDom.style.background = "#ccc";
                    this.curMoveDom.style.top = config.event.y - config.height / 2 + "px";
                    this.curMoveDom.style.left = config.leftLimit1 + "px";
                    this.curMoveDom.style.width = config.width + "px";
                    this.curMoveDom.style.height = config.height + "px";
                    break;
                default:
                    this.curMoveDom.style.display = "none";
                    break;
            }
        },
        changeTaskInfo(changeInfo) {
            let row = changeInfo.detail.taskId,
                val = changeInfo.detail.taskDay;
            if (!this.$bus.goalTable.goalTree[row][6])
                this.$bus.goalTable.goalTree[row][6] = {};
            if (!this.$bus.goalTable.goalTree[row][6][val])
                this.$bus.goalTable.goalTree[row][6][val] = {};
            if (changeInfo.type === "addPlan") {
                this.$refs.mainTable.subListBody[row][val].isAssigned = true;
                this.$bus.goalTable.goalTree[row][6][val].isAssigned = true;
            }
            if (changeInfo.type === "cancelPlan") {
                this.$refs.mainTable.subListBody[row][val].isAssigned = false;
                this.$bus.goalTable.goalTree[row][6][val].isAssigned = false;
            }
            if (changeInfo.type === "changeDone") {
                this.$refs.mainTable.subListBody[row][val].finish = changeInfo.hasDone;
                this.$bus.goalTable.goalTree[row][6][val].finish = changeInfo.hasDone;
            }
            if (changeInfo.type === "changeText") {
                this.$refs.mainTable.subListBody[row][val].text = changeInfo.text;
                this.$bus.goalTable.goalTree[row][6][val].desc = changeInfo.text;
            }
            this.$bus.goalTable.hoursInfo[val].columns = [
                this.$refs.hoursPanel.level1Tabs,
                this.$refs.hoursPanel.level2Tabs,
                this.$refs.hoursPanel.level3Tabs,
            ];
            console.log([...this.$refs.hoursPanel.level2Tabs]);
            this.$bus.$emit("save");
            this.$refs.mainTable.$forceUpdate();
        },
        // 右键菜单
        rightClick(event) {
            this.showMenu = true;
            this.curRightClickTd = event.target;
            this.curRightTdConfig.hasDone = JSON.parse(
                this.curRightClickTd.getAttribute("data-is-done")
            );
            this.curRightTdConfig.isMain = JSON.parse(
                this.curRightClickTd.getAttribute("data-is-main")
            );
            this.$nextTick(() => {
                this.$refs.days_right_menu.style.top = event.clientY + "px";
                this.$refs.days_right_menu.style.left = event.clientX + "px";
            });
        },
        setHasDone(config) {
            // 发送后台请求
            this.curRightClickTd.setAttribute("data-is-done", !config.hasDone);
            this.showMenu = false;
        },
        setMain(config) {
            // 发送后台请求
            this.curRightClickTd.setAttribute("data-is-main", !config.isMain);
            this.showMenu = false;
        },
        openHours() {
            this.showMenu = false;
            this.isHourShow = true;
            this.$refs.hours_panel.$refs.plan_panel_div.style.transition =
                "right 0.4s";
            this.$refs.hours_panel.$refs.plan_panel_div.style.right = "0px";
            var year = this.curRightClickTd.getAttribute("data-year");
            var month = this.curRightClickTd.getAttribute("data-month");
            var date = this.curRightClickTd.getAttribute("data-date");
            this.hourInfo.title = `${year}-${month}-${date}`;
            // this.hourInfo.start = 7
            // this.hourInfo.end = 24
            this.hourInfo = JSON.parse(JSON.stringify(this.hourInfo));
        },
    },
};