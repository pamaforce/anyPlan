import Vue from "vue";
import App from "./App.vue";
import "./utils/rem";
import "splitpanes/dist/splitpanes.css";
import Contextmenu from "vue-contextmenujs";
import { Dialog, Button } from "element-ui";
Vue.use(Dialog);
Vue.use(Button);
Vue.use(Contextmenu);
Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();
if (Vue.prototype.$websocket) Vue.prototype.$websocket.close();
Vue.prototype.$websocket = new WebSocket(`ws://101.43.190.196:9090/ws`);
let demo = null;
Vue.prototype.$websocket.onmessage = (evt) => {
    if (evt.data === JSON.stringify(Vue.prototype.$bus.goalTable)) return;
    Vue.prototype.$bus.goalTable = JSON.parse(
        evt.data ||
        JSON.stringify({
            initialTimeStamp: 536428800000,
            state: 0,
            aspect: [],
            goalTree: [],
            hoursInfo: {},
        })
    );
    console.log("---接受到更新，最新数据如下---");
    console.log(Vue.prototype.$bus.goalTable);
    if (!demo) {
        demo = new Vue({
            render: (h) => h(App),
        }).$mount("#app");
    } else {
        let mainTable = demo.$children[0].$refs.mainTable;
        if (mainTable) mainTable.updateData();
        let aspectTable = demo.$children[0].$refs.aspectTable;
        if (aspectTable) aspectTable.$forceUpdate();
        demo.$children[0].tempInfo = {
            ...Vue.prototype.$bus.goalTable.hoursInfo[demo.$children[0].tempDay],
        };
        demo.$children[0].$refs.hoursPanel.$forceUpdate();
    }
};
Vue.prototype.$bus.$on("save", () => {
    console.log("已保存");
    if (Vue.prototype.$websocket.readyState === 1) {
        Vue.prototype.$websocket.send(JSON.stringify(Vue.prototype.$bus.goalTable));
    }
});