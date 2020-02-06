import Vue from "vue";

export default {
  /**
   * @description: 获取用户参与数量
   * @return: promise
   */
  getSupport() {
    return Vue.axios.get("/yiqing/support");
  },
  /**
   * @description: 获取用户信息
   * @param {int}goods_id
   * @return: promise
   */
  getuUserinfo() {
    return Vue.axios.get("/yiqing/userInfo");
  }
};
