import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/AppStore";

Vue.config.productionTip = false;

import "./assets/css/common.scss";
import "./assets/css/vant-override.scss";

import Vant from "vant";
import "vant/lib/index.css";
Vue.use(Vant);

import Common from "./common/com";
Vue.use(Common);

import * as filters from "./common/filter";
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

// 全局注册 暂无数据 缺省页
import noDataView from "./component/noDataView";
Vue.component("no-data-view", noDataView);
// 拖拽指令
import './directive/drag';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
