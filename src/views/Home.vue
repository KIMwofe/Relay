<template>
  <div class="home" ref="capture">
    <audio src="@/assets/muzic.mp3"
          autoplay="autoplay"
           loop
           ref="MusicPlay"></audio>
    <div class="home-index">
      <div class="home-index" v-show="show.first">
        <img src="@/images/title.png" alt />
        <h1>你是老年大学学员中的</h1>
        <h2>
          <span>8591</span>
          <i>位承诺者</i>
        </h2>
      </div>
      <div v-show="show.second" class="home-second">
        <h1>输入姓名</h1>
        <input type="text" placeholder="输入您的姓名" v-model="name" />
        <button @click="next">下一步</button>
      </div>
      <div v-show="show.third" class="home-third">
        <div class="third-top">
          <div class="img"></div>
          <div class="content">
            <p>
              <span>我是第</span>
              <span>8591</span>
            </p>
            <p>
              <span>老年大学的学员</span>
              <span>{{name}}</span>
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
      </div>
      <div class="home-bottom" v-show="show.first || show.second"></div>
      <img src="@/images/button.png" alt @click="next" v-show="show.first" class="netxBtn" />
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
      imageUrl: "",
      show: {
        first: true,
        second: false,
        third: false
      },
      name: "",
      username: ""
    };
  },
  components: {},
  mounted() {
    console.log(this.$refs.MusicPlay)
    this.$refs.MusicPlay.play()
},
  methods: {
    save() {
      html2canvas(this.$refs.capture, {
        backgroundColor: null
      }).then(canvas => {
        let dataURL = canvas.toDataURL("image/png");
        this.imageUrl = dataURL;
      });
    },
    next() {
      if (this.show.first) {
        this.show.first = false;
        this.show.second = true;
      } else if (this.show.second) {
        this.name.length > 6 ? this.name = this.name.slice(0,5) + '...' : ''
        this.show.second = false;
        this.show.third = true;
        setTimeout(() => {
          this.save();
        }, 500);
      }
    }
  },
  watch: {
    // "$store.state.uid"(newV) {
    //   if (newV);
    // }
    // name(val) {
    //   val.length > 8 ? this.name = val.slice(0,5) + '...' : ''
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
    .netxBtn {
      width: 15.75rem;
      height: 4.0625rem;
      position: absolute;
      bottom: 2.3125rem;
    }
    .home-second {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 3.0625rem;
      box-sizing: border-box;
      h1 {
        width: 100%;
        font-size: 1.5625rem;
        font-weight: bold;
        color: rgba(240, 182, 84, 1);
        text-align: left;
        margin-top: 5.8125rem;
      }
      input {
        background: none;
        border: none;
        outline: none;
        border-radius: 0;
        width: 100%;
        font-size: 1.1875rem;
        color: rgba(255, 255, 255, 1);
        padding: 1.125rem 0;
        box-sizing: border-box;
        border-bottom: 0.0625rem solid rgba(255, 255, 255, 1);
        margin-top: 0.78125rem;
      }
      button {
        width: 17.1875rem;
        height: 3.125rem;
        background: rgba(240, 182, 84, 1);
        border-radius: 50px;
        line-height: 3.125rem;
        text-align: center;
        font-size: 1.375rem;
        font-weight: bold;
        color: rgba(187, 41, 41, 1);
        border: 0;
        margin-top: 3.4375rem;
      }
    }
  }
  .home-third {
    width: 100%;
    padding: 3.6875rem 0 0 2.125rem;
    box-sizing: border-box;
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
        margin-top:3.75rem;
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
  ::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #ffffff;
  }
  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #ffffff;
  }
  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #ffffff;
  }
  :-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #ffffff;
  }
}
</style>

