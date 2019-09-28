<template>
  <div class="myself-regester">
    <div class="header-title">
      <span>新用户注册</span>
    </div>
    <div class="myself-regester-input">
      <ressester-input>
        <ressester-lnput-item slot="mobile-title" keys="mobile">
          <span slot="md-title">请输入手机号:</span>
          <input type="text" v-model="mobileNum" class="md-input-bd" />
        </ressester-lnput-item>
      </ressester-input>
    </div>
    <div class="myself-regester-input">
      <ressester-input>
        <ressester-lnput-item slot="mobile-title" keys="pwd">
          <span slot="md-title">请输入密码:</span>
          <input type="password" v-model="pwd" class="md-input-bd" />
        </ressester-lnput-item>
      </ressester-input>
    </div>

    <div class="myself-regester-input myself-regester-input-pic">
      <ressester-input>
        <ressester-lnput-item slot="mobile-title" keys="pyz">
          <span slot="md-title">请输入图形验证码:</span>
          <input type="text" class="md-input-bd3" v-model="picyzm" />
        </ressester-lnput-item>
      </ressester-input>
    </div>
    <div class="myself-regester-input">
      <ressester-input>
        <ressester-lnput-item slot="mobile-title" keys="yzm">
          <span slot="md-title">请输入验证码:</span>
          <input type="text" class="md-input-bd" v-model="infoNum" />
        </ressester-lnput-item>
      </ressester-input>
    </div>
    <div class="myself-regester-input">
      <div class="mobile-btn">
        <img :src="src" alt @click="getSrc" />
      </div>
    </div>
    <div class="regester-button">
      <button @click="pushData" v-if="yzmshow">短信验证码</button>
      <button class="noyzmshow" @click="nopushData" v-if="noyzmshow">获取验证码({{second}})</button>
      <button @click="regester">注册</button>
      <!-- <button @click="sa"></button> -->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import qs from "qs";
const axios = require("axios");
import { Dialog } from "vant";
import { Toast } from "vant";
import regester from "../mySelf/regester";
import ressesterInput from "../mySelf/ressesterInput";
import ressesterLnputItem from "../mySelf/ressesterLnput-item";
import apiConfig from "../../router/httpConfig";

export default {
  name: "",
  data() {
    return {
      src: "",
      key: "",
      mobileNum: "",
      picyzm: "",
      infoNum: "",
      pwd: "",
      yzmshow: true,
      noyzmshow: false,
      second: 59
    };
  },
  components: {
    ressesterInput,
    ressesterLnputItem,
    regester
  },
  methods: {
    getSrc() {
      axios.get(apiConfig.PictureVerificationCode).then(res => {
        // console.log(res.data.data.key)
        this.src = res.data.data.url;
        // console.log(this.src)
        this.key = res.data.data.key;
      });
    },
    pushData() {
      if(this.mobileNum == ''){
        Toast('请输入手机号以获取验证码')
      }else if(this.picyzm == ''){
        Toast('请输入图形验证码')
        }else{

      this.noyzmshow = true;
      this.yzmshow = false;
      var k = 59;
      let timer = setInterval(() => {
        k--;
        this.second = k;
        if (this.second <= 0) {
          this.second = 59;
          clearInterval(timer);
          this.noyzmshow = false;
          this.yzmshow = true;
        }
        //    console.log(this.second)
      }, 1000);
      axios
        .post(
          apiConfig.SendSMSVerification,
          qs.stringify({
            mobile: this.mobileNum,
            captcha_code: this.picyzm,
            captcha_key: this.key
          })
        )
        .then(response => {
          // console.log(response)
          if (response.data.code == "0") {
            Toast(response.data.data);
            // console.log(response.data)
          } else {
            Toast("发送失败,请检查手机号是否正确");
          }
        })
        .catch(() => {
          Dialog({ message: "手机格式不正确" });
        });
      }
    },
    nopushData() {
      Toast("请稍等" + this.second + "秒后再次发送");
    },
    regester() {
      if(this.mobileNum == ''){
        Toast('请输入手机号')
      }else if(this.picyzm == ''){
          Toast('请输入图形验证码')
      }else if(this.pwd == ''){
        Toast('请输入密码')
      }else if(this.infoNum == ''){
        Toast('请输入短信验证码')
      }else{
      axios
        .post(
          apiConfig.MobileRegistration,
          qs.stringify({
            mobile: this.mobileNum,
            password: this.pwd,
            verify: this.infoNum
          })
        )
        .then(response => {
          // console.log(response)
          // console.log(response.data.code)

          if (
            response.data.code == "-1" &&
            response.data.data == "手机格式不正确"
          ) {
            Dialog({ message: "手机格式不正确" });
          } else if (
            response.data.code == "-1" &&
            response.data.data == "验证码不正确"
          ) {
            Dialog({ message: "验证码不正确" });
          } else if (response.data.code == "0") {
            Dialog.confirm({
              // title: '标题',
              message: "注册成功,是否前往登录?"
            })
              .then(() => {
                this.$emit("sonInfos", "change");
                // on confirm
                // console.log('yes')
              })
              .catch(() => {});
          } else {
            Dialog.confirm({
              // title: '标题',
              message: "手机号已被注册,是否前往登录?"
            })
              .then(() => {
                this.$emit("sonInfos", "change");
                // on confirm
                // console.log('yes')
              })
              .catch(() => {});
          }
        });
      }
    }

    //   sa:function(){
    //     //   console.log('触发')

    //   }
  },
  mounted() {
    this.getSrc();
  }
};
</script>

<style lang="less">
.myself-regester {
  width: 100%;
  display: flex;
  // background: linear-gradient(rgba(238, 117, 69, 0.87),white);

  justify-content: center;
  flex-wrap: wrap;
  margin-top: -68px;
}
.header-title {
  height: 30px;
  font-size: 28px;
  color: #4d4a4a;
  font-weight: bold;
  margin-top: 100px;
}
.myself-regester-input {
  width: 120%;
  height: 30px;
  display: flex;
  font-size: 18px;
  color: rgb(129, 127, 127);
  margin-top: 50px;
}
.myself-regester .md-input-bd {
  border: none;
  width: 50%;
  margin-left: -5%;
}
.md-input-bd3 {
  width: 20%;
  padding-left: 10px;
  border: none;
  // border: 1px solid #000;

  // width: 50%;
}
.mobile-picYzm {
  display: block;
  // border: 1px solid #000;
  width: 160px;
  margin-left: 5%;

  height: 60px;
}
.mobile-btn {
  // border: 1px solid #000;
  margin-left: 67%;
  height: 40px;
  margin-top: -168px;
  width: 120px;
}
.mobile-btn > img {
  margin-top: 5px;
}
.regester-button {
  width: 78%;
  display: flex;
  // border: 1px solid #000;
  justify-content: space-between;
  margin-top: -42px;
}
.regester-button > button:nth-of-type(1) {
  width: 120px;
  border-style: none;
  // background-color: rgb(253, 169, 13);
  background-color: rgb(236, 89, 89);
  border-radius: 20px;
  color: white;
  font-weight: bold;
  letter-spacing: 3px;
  height: 40px;
}
.regester-button > button:nth-of-type(2) {
  width: 120px;
  height: 40px;
  // background-color: rgb(253, 169, 13);
  background-color: rgb(236, 89, 89);
  border-radius: 20px;

  border-style: none;
  color: white;
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 1em;
  padding-left: 10%;

  // border: 1px solid #000;
}
.myself-regester .md-input-bd {
  background-color: rgba(199, 235, 220, 0);
}

.myself-regester .md-input-bd3 {
  background-color: rgba(199, 235, 220, 0);
}
.mobile-picYzm > button {
  border-style: none;
  // background-color: orange;
  background-color: rgb(236, 89, 89);

  color: white;
  margin-left: -41%;
  height: 39px;
  font-weight: bold;
  font-size: 14px;

  letter-spacing: 3px;
  width: 150px;
  margin-top: -5px;
}
.regester-button > .noyzmshow {
  background-color: #a7a3a3 !important;
}
.moblie-header {
  color: #666;
}
.myself-regester-input-pic .md-item-header {
  justify-content: flex-start !important;
}
.myself-regester .md-item-header {
  justify-content: flex-start;
}
.myself-regester .md-item-header .md-input-bd {
  margin-left: 1%;
}
</style>
