<template>
  <div class="home-third" ref="capture">
    <div class="third-top">
      <div class="img"></div>
      <div class="content">
        <p>
          <span>我是第</span>
          <span>8591</span>
        </p>
        <p>
          <span>老年大学的学员</span>
          <span>{{ name }}</span>
        </p>
      </div>
    </div>
    <img src="@/images/content.png" alt class="third-img" />
    <div class="third-bot">
      <div class="ercode">
        <img src="@/images/er.png" alt />
        <p>
          长按保存海报
          <br />扫码参与接力
        </p>
      </div>
    </div>
    <img :src="imageUrl" class="canvas" v-show="imageUrl.length > 0" />
  </div>
</template>

<script>
import html2canvas from "html2canvas";

export default {
  name: "canvans",
  data() {
    return {
      imageUrl: "",
      name: "",
      username: ""
    };
  },
  components: {},
  mounted() {
    this.name = this.$route.query.name;

    this.$nextTick(() => {
      this.save();
    });
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
  }
};
</script>

<style lang="scss" scoped>
.home-third {
  width: 100%;
  height: 100%;
  padding: 3.6875rem 0 0 2.125rem;
  box-sizing: border-box;
  background: url(~@/images/homeBg.png) no-repeat;
  background-size: 100% 100%;
  .third-top {
    display: flex;
    align-items: center;
    .img {
      width: 3.6875rem;
      height: 3.6875rem;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 1);
    }
    .content {
      margin-left: 0.9375rem;
      p {
        font-size: 1.1875rem;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        display: flex;
        align-items: flex-end;
        margin: 0;
        span:nth-child(2) {
          font-size: 1.25rem;
          font-weight: bold;
          color: rgba(240, 182, 84, 1);
          display: block;
          margin: 0 0 -0.0625rem 0.5rem;
        }
      }
    }
  }
  .third-img {
    width: 17.4375rem;
    height: 13.625rem;
    display: block;
    margin-top: 1.9375rem;
    position: relative;
    z-index: 5;
  }
  .third-bot {
    width: 100%;
    height: 21.40625rem;
    background: url(~@/images/bigrelay.png) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    overflow: hidden;
    z-index: 0;
    .ercode {
      position: relative;
      margin-left: 1.875rem;
      margin-top: 3.75rem;
      z-index: 5;
      img {
        width: 5.75rem;
        height: 5.6875rem;
        margin-bottom: 0.75rem;
      }
      p {
        font-size: 0.875rem;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 1.125rem;
        margin-left: 0.28125rem;
      }
    }
    .third-big {
      width: 100%;
      height: 100%;
      z-index: 0;
    }
  }
}
.canvas {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
}
</style>
