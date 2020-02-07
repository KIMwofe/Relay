/*
 * @Date: 2020-01-09 10:39:39
 * @LastEditors  : hxz
 * @LastEditTime : 2020-02-07 14:26:36
 */
import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import utils from "@/utils/utils.js";
import wx from "jweixin-module";
Vue.prototype.$wx = wx;
Vue.prototype.$utils = utils;

import { Loading, Toast } from "vant";
Vue.use(Loading).use(Toast);

import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);

Vue.config.productionTip = false;
Vue.prototype.$toast = Toast;

/* 手机查看console */
if (process.env.NODE_ENV !== "development") {
  var VConsole = require("vconsole/dist/vconsole.min.js");
  new VConsole();
}

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
