<template>
  <div class="home" ref="capture">
    <div class="home-index">
      <div class="home-index">
        <img src="@/images/title.png" alt />
        <h1>你是老年大学学员中的</h1>
        <h2>
          <span>8591</span>
          <i>位承诺者</i>
        </h2>
      </div>
      <div class="home-bottom"></div>
      <img src="@/images/button.png" alt />
    </div>
    <img :src="imageUrl" class="canvas" v-show="imageUrl.length > 0" />
  </div>
</template>

<script>
// import api from "@/api/LotteryApi.js";
import html2canvas from "html2canvas";

export default {
  name: "home",
  data() {
    return {
      imageUrl: ""
    };
  },
  components: {},
  mounted() {
    // this.$store.state.uid && this.getGoods();
    // this.save();
  },
  methods: {
    save() {
      // const el = this.$refs.capture;
      // const options = {
      //   backgroundColor: null
      // };
      // const canvas = html2canvas(el, options);
      // this.imageUrl = canvas.toDataURL("image/png");
      html2canvas(this.$refs.capture, {
        backgroundColor: null
      }).then(canvas => {
        let dataURL = canvas.toDataURL("image/png");
        this.imageUrl = dataURL;
      });
    }
  },
  watch: {
    // "$store.state.uid"(newV) {
    //   if (newV) this.getGoods();
    // }
  }
};
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  background: url(~@/images/homeBg.png) no-repeat;
  background-size: 100% 100%;
  position: relative;
  .home-index {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    img:nth-child(1) {
      width: 15.375rem;
      height: 12.25rem;
      display: block;
      margin-top: 3.5rem;
    }
    h1 {
      text-align: center;
      font-size: 1.1875rem;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      margin: 0;
      margin-top: 1.875rem;
    }
    h2 {
      font-size: 1.1875rem;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      margin: 0;
      display: flex;
      align-items: center;
      span {
        font-size: 1.875rem;
        font-weight: bold;
        color: rgba(240, 182, 84, 1);
      }
      i {
        display: block;
        font-style: normal;
        margin-left: 0.75rem;
      }
    }
    .home-bottom {
      width: 100%;
      height: 20.21875rem;
      background: url(~@/images/relay.png) no-repeat;
      background-size: 100% 100%;
      position: absolute;
      bottom: 0;
    }
    img:nth-child(3) {
      width: 18.625rem;
      height: 4.5625rem;
      position: absolute;
      bottom: 2.3125rem;
    }
  }
  .canvas {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
  }
}
</style>

