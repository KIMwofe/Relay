<template>
  <div class="start">
    <div class="home-start">
      <div class="start-btn" @click="init">
        <img src="../images/go.png" alt />
        <div class="start-hand">
          <img src="../images/hand.png" alt />
        </div>
      </div>
      <div class="start-text">点击开始</div>
      <div class="start-text">承诺接力</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {};
  },
  methods: {
    init() {
      //播放音乐并且跳转到首页
      this.$router.push({ path: "home" });
	  // this.$refs.MusicPlay.play();
	  // this.$refs.MusicPlay.play();
	  // Vue.$data.audioFlag = false;
    }
  }
};
</script>

<style lang="scss">
.start {
  width: 100%;
  height: 100%;
  background: url(~@/images/start-bg.png) no-repeat;
  background-size: 100% 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .home-start {
    width: 8.75rem;
    height: 13.125rem;
	margin-top: -1.25rem;
    .start-btn {
      width: 8.75rem;
      height: 8.75rem;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .start-hand {
        width: 3.125rem;
        height: 2.8125rem;
        position: absolute;
        bottom: 0;
        right: -1.25rem;
        animation: handle 0.7s ease infinite both;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .start-text {
      width: 100%;
      text-align: center;
      font-size: 1.5625rem;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
    }
  }
  @keyframes handle {
    0% {
      transform: none;
    }
    50% {
      transform: scale3d(0.8, 0.8, 0.8);
    }
    100% {
      transform: none;
    }
  }
  @keyframes btn {
    0% {
      transform: none;
    }
    50% {
      transform: scale3d(0.8, 0.8, 0.8);
    }
    100% {
      transform: none;
    }
  }
}
</style>
