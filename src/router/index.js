/*
 * @Date: 2020-01-09 10:53:54
 * @LastEditors  : hxz
 * @LastEditTime : 2020-01-15 15:51:18
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Start from "../views/start.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "start",
    component: Start,
    meta: {
      title: "老年大学助力武汉"
    }
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: {
      title: "老年大学助力武汉"
    }
  },
  {
    path: "/canvans",
    name: "canvans",
    component: () =>
      import(/* webpackChunkName: "share" */ "../views/Canvans.vue"),
    meta: {
      title: "老年大学助力武汉"
    }
  },
  {
    path: "/client",
    name: "client",
    component: () =>
      import(/* webpackChunkName: "share" */ "../views/Client.vue"),
    meta: {
      title: "终端错误"
    }
  }
];

/**
 * 判断是否是微信环境
 */
function getIsWxClient() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  }
  return false;
}

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  if (!getIsWxClient()) {
    /* next({ path: "/client" }); */
  }

  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
