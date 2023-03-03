import Vue from "vue";
import App from "./App.vue";
import "./utils/rem";
import "splitpanes/dist/splitpanes.css";
import Contextmenu from "vue-contextmenujs";
import { Dialog, Button } from "element-ui";
Vue.use(Dialog);
Vue.use(Button);
Vue.use(Contextmenu);
Vue.prototype.$bus = new Vue();
Vue.prototype.$bus.goalTable = JSON.parse(
    window.localStorage.getItem("anyPlanUserData_1") ||
    JSON.stringify({
        initialTimeStamp: 536428800000,
        state: 0,
        aspect: [],
        goalTree: [],
        hoursInfo: {},
    })
);
Vue.config.productionTip = false;
new Vue({
    render: (h) => h(App),
}).$mount("#app");