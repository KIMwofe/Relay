<!--
 * @Date: 2020-01-09 10:39:39
 * @LastEditors  : hxz
 * @LastEditTime : 2020-02-07 14:34:35
 -->
<template>
  <div id="app" @click.once.prevent="muzic">
    <audio :src="audioUrl" loop="loop" id="bg-music" ref="MusicPlay" preload="auto"></audio>
    <img v-show="!audioFlag" src="@/images/audio.png" alt class="audio" @click="play" />
    <img v-show="audioFlag" src="@/images/stop.png" alt class="stop" @click="play" />
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      audioFlag: false,
      audioUrl: require("@/assets/muzic.mp3")
    };
  },
  mounted() {
    if (process.env.NODE_ENV) {
      this.init();
      this.autoplay();
    } else {
      this.$wx.miniProgram.getEnv(res => {
        if (res.miniprogram) {
          this.init();
          this.autoplay();
        }
      });
    }
  },
  methods: {
    init() {
      /* 用户id */
      const uid = this.$utils.getQueryString("uid");
      /* 商品id */
      const goodsId = this.$utils.getQueryString("id");
      console.log(uid, goodsId);
      this.$store.commit("setAuth", { uid, goodsId });
    },
    muzic() {
      this.$refs.MusicPlay.play();
      this.audioFlag = false;
    },
    autoplay() {
      let audio = this.$refs.MusicPlay;
      this.$wx.miniProgram.getEnv(res => {
        if (res.miniprogram) {
          audio.play();
          audio.volume = 0.8;
        }
      });

      document.addEventListener("visibilitychange", () => {
        console.log(document.hidden);
        if (document.hidden) {
          audio.pause();
        } else {
          setTimeout(() => {
            audio.play();
          }, 2000);
        }
      });
    },
    play() {
      let that = this;
      if (that.audioFlag) {
        //播放
        that.$refs.MusicPlay.play();
        that.audioFlag = false;
      } else {
        //暂停
        this.$refs.MusicPlay.pause();
        that.audioFlag = true;
      }
    }
  }
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}

html {
  font-size: 16px;
}
.audio {
  width: 2.3125rem;
  height: 2.3125rem;
  position: absolute;
  top: 0.78125rem;
  right: 0.9375rem;
  animation: run 2s infinite;
  z-index: 100;
}
.stop {
  width: 2.3125rem;
  height: 2.3125rem;
  position: absolute;
  top: 0.78125rem;
  right: 0.9375rem;
  z-index: 100;
}
@media screen and (max-width: 359px) {
  html {
    font-size: 12px;
  }
}
@keyframes run {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.van-toast {
  font-size: 18px;
}
</style>
