<template>
  <div class="home" ref="capture" @click.once.prevent="init">
    <img v-show="!audioFlag" src="@/images/audio.png" alt class="audio" @click="play" />
	<img v-show="audioFlag" src="@/images/stop.png" alt class="stop" @click="play" />
    <audio src="@/assets/muzic.mp3" muted="muted" autoplay="autoplay" loop="loop" id="bg-music" ref="MusicPlay" preload="auto"></audio>
    <div class="home-index">
      <div class="home-index" v-show="show.first">
        <img src="@/images/title.png" alt />
        <h1>你是老年大学学员中的</h1>
        <h2>
          <span>{{number}}</span>
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
		  <img :src="userImg" alt class="img" />
          <div class="content">
            <p>
              <span>我是第</span>
              <span>{{number}}</span>
            </p>
            <p>
              <span>老年大学的学员</span>
            </p>
			<p>
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
		  <div class="footer">
		  	<div>老年大学 助力武汉</div>
			<div>众志成城 共度难关</div>
		  </div>
        </div>
      </div>
      <div class="home-bottom" v-show="show.first || show.second"></div>
      <img src="@/images/button.png" alt @click="next" v-show="show.first" class="netxBtn" />
    </div>
    <!-- <img :src="imageUrl" class="canvas" v-show="imageUrl.length > 0" /> -->
  </div>
</template>

<script>
import api from "@/api/HomeApi.js";
import html2canvas from "html2canvas";
export default {
  name: "home",
  data() {
    return {
	  audioFlag: false,
      imageUrl: "",
      show: {
        first: true,
        second: false,
        third: false
      },
      name: "",
	  number: 1,
	  userImg: '',
    };
  },
  components: {},
  mounted() {
	  this.getSupport();
	  this.getUserInfo();
  },
  methods: {
	  init(){
		  this.$refs.MusicPlay.play();
		  this.audioFlag = false;
	  },
	getSupport(){
	  api.getSupport().then(res=>{
		  this.number = res
	  })
	},
	getUserInfo(){
	  api.getuUserinfo().then(res=>{
		  this.userImg = res.avatar
	  })
	},
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
		  if(this.name.length){
			  this.name.length > 10 ? (this.name = this.name.slice(0, 5) + "...") : "";
			  this.show.second = false;
			  this.show.third = true;
			  setTimeout(() => {
			    this.save();
			  }, 500);
		  }else{
			  this.$toast('请输入您的姓名')
		  }
      }
    },
    play() {
		let that = this;
		if(that.audioFlag){//播放
			that.$refs.MusicPlay.play();
			that.audioFlag = false;
		}else{//暂停
			this.$refs.MusicPlay.pause();
			that.audioFlag = true;
		}
    }
  },
  watch: {
    // "$store.state.uid"(newV) {
    //   if (newV);
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
  .audio {
    width: 2.3125rem;
    height: 2.3125rem;
    position: absolute;
    top: 0.78125rem;
    right: 0.9375rem;
    animation: run 2s infinite;
	z-index: 100;
  }
  .stop{
	  width: 2.3125rem;
	  height: 2.3125rem;
	  position: absolute;
	  top: 0.78125rem;
	  right: 0.9375rem;
	  z-index: 100;
  }
  .home-index {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
	z-index: 99;
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
	  z-index: 99;
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
		z-index: 99;
      }
    }
  }
  .home-third {
    width: 100%;
    padding: 3.4375rem 0 0 2.125rem;
    box-sizing: border-box;
    .third-top {
      display: flex;
      align-items: center;
      .img {
        width: 4.6875rem;
        height: 4.6875rem;
        border-radius: 50%;
		margin-top: 0;
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
            font-size: 1.3125rem;
            font-weight: bold;
            color: rgba(240, 182, 84, 1);
            display: block;
            margin: 0 0 -0.0625rem 0.5rem;
          }
        }
		p:nth-child(3){
			font-size: 1.1875rem;
			font-weight: bold;
			color: rgba(240, 182, 84, 1);
			display: block;
		}
      }
	  
    }
    .third-img {
      width: 17.4375rem;
      height: 13.625rem;
      display: block;
      margin-top: 1.5625rem;
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
		width: 102px;
		height: 140px;
        margin-left: 1.875rem;
        margin-top: 3.75rem;
		background: white;
        z-index: 5;
		text-align: center;
        img {
          // width: 5.75rem;
          // height: 5.6875rem;
		  width: 6.375rem;
		  height: 6.25rem;
          // margin-bottom: 0.75rem;
        }
        p {
          font-size: 0.875rem;
          font-weight: 500;
		  font-family:Source Han Sans CN;
          color: rgba(211,62,54,1);
          line-height: 1.125rem;
          // margin-left: 0.28125rem;
		  margin-top: 0;
		  margin-bottom: 0.375rem;
        }
      }
      .third-big {
        width: 100%;
        height: 100%;
        z-index: 0;
      }
	  .footer{
		  width: 100%;
		  position: fixed;
		  left: 8.0625rem;
		  bottom: 1.8125rem;
		  div{
			  font-size: 0.875rem;
			  font-family:Source Han Sans CN;
			  font-weight:400;
			  color:rgba(255,255,255,1);
		  }
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
  @keyframes run {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>

