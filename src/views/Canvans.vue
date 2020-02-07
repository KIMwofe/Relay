<template>
  <div class="cv-pg">
    <div class="home-third" ref="capture" :style="!system ? 'left: -1500px;' : 'left: 1500px;'">
      <div class="third-top">
        <img
          :src="userImg ? userImg : require('@/images/defultImg.png')"
          class="img"
          :onerror="defaultAvatar"
          :style="userImg ? 'border: 2px solid rgba(255, 255, 255, 1);' : ''"
        />
        <div class="content">
          <p>
            <span>我是第</span>
            <span>{{ number }}</span>
          </p>
          <p>
            <span>老年大学的学员</span>
          </p>
          <p class="username">{{ name }}</p>
        </div>
      </div>
      <img src="@/images/content.png" alt class="third-img" />
      <div class="ercode">
        <img src="@/images/er.png" alt />
        <p>长按保存海报</p>
        <p>扫码参与接力</p>
      </div>
      <div class="footer">
        <div>老年大学 助力武汉</div>
        <div>众志成城 共度难关</div>
      </div>
    </div>
    <template v-if="imageUrl">
      <img :src="imageUrl" class="canvas" />
    </template>
    <van-loading class="loading" size="24px" vertical v-else>生成图片中...</van-loading>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import { Toast } from "vant";
export default {
  name: "canvans",
  data() {
    return {
      imageUrl: "",
      name: "",
      number: "",
      userImg: "",
      defaultAvatar: 'this.src="' + require("@/images/defultImg.png") + '"',
      system: false
    };
  },
  components: {},
  mounted() {
    this.name = this.$route.query.name;
    this.number = this.$route.query.number;
    this.userImg = this.$route.params.userImg || false;
    // this.save();
    this.appSource();
    setTimeout(() => {
      this.save();
    }, 1000);
    // this.$nextTick(() => {});
  },
  methods: {
    save() {
      html2canvas(this.$refs.capture, {
        backgroundColor: null
      }).then(canvas => {
        let dataURL = canvas.toDataURL("image/png");
        this.imageUrl = dataURL;
        Toast("长按图片保存海报");
      });
    },
    appSource() {
      const u = navigator.userAgent;
      const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isiOS) {
        this.system = true;
      } else {
        this.system = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.cv-pg {
  position: relative;
  height: 100%;
  box-sizing: border-box;
}

.home-third {
  position: absolute;
  /* left: -1500px; */
  width: 100%;
  height: 100%;
  padding: 3.6875rem 0 0 2.125rem;
  box-sizing: border-box;
  background: url(~@/images/bigrelay.png), url(~@/images/canBg.png);
  background-repeat: no-repeat, no-repeat;
  background-position: bottom center, center center;
  background-size: 100% 56.22%, 100% 100%;
  z-index: 0;
  .third-top {
    display: flex;
    align-items: center;
    .img {
      width: 4.7875rem;
      height: 100%;
      border-radius: 50%;
      display: block;
    }
    .content {
      margin-left: 0.9375rem;
      p {
        font-size: 1.125rem;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        display: flex;
        align-items: flex-end;
        margin: 0;
        span:nth-child(2) {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffd259;
          display: block;
          margin: 0 0 -0.0625rem 0.5rem;
        }
      }
      .username {
        font-size: 1.5rem;
        font-weight: 700;
        color: #ffd259;
        display: block;
      }
    }
  }
  .third-img {
    width: 17.4375rem;
    height: 32.23%;
    display: block;
    margin-top: 1.9375rem;
    position: relative;
    z-index: 5;
  }
  .ercode {
    position: relative;
    width: 6.375rem;
    height: 20.98%;
    margin-top: 1.78125rem;
    background: #fff;
    z-index: 5;
    img {
      width: 100%;
      height: 78.85%;
      /* margin-bottom: 0.375rem; */
    }
    p {
      text-align: center;
      font-size: 0.9375rem;
      font-weight: 500;
      color: rgba(211, 62, 54, 1);
      line-height: 1.125rem;
      margin: -0.28125rem 0 0 0;
    }
    p:nth-child(3) {
      background: #fff;
      margin: 0 0 0.375rem 0;
      padding-bottom: 0.1875rem;
    }
  }
  .third-big {
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  .footer {
    width: 100%;
    position: absolute;
    left: 8.0625rem;
    bottom: 1.8125rem;
    div {
      font-size: 0.875rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
}
.canvas {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 6;
}

.loading {
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
