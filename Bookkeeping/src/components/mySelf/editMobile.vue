<template>
  <div class>
    <div class="editInfo">
      <back-item></back-item>

      <div>
        <span>安全中心</span>
      </div>
    </div>
    <div class="editInfo-password-div">
      <van-cell-group>
        <van-field v-model="message1" type="password" placeholder="请输入登录密码" rows="1" autosize />
      </van-cell-group>
    </div>
    <div class="editInfo-password-div">
      <van-cell-group>
        <van-field v-model="message2" type="textarea" placeholder="请输入新手机号" rows="1" autosize />
      </van-cell-group>
    </div>
    <div class="editInfo-password-div">
      <van-cell-group>
        <van-field v-model="message4" type="textarea" placeholder="请输入图形验证码" rows="1" autosize />
        <img :src="PicUrl" alt class="getpicYzm" @click="getPicYzm" />
      </van-cell-group>
    </div>
    <div class="editInfo-password-div">
      <van-cell-group>
        <van-field v-model="message3" type="textarea" placeholder="请输入短信验证码" rows="1" autosize />
        <button class="getInfoYzm" @click="getInfoYzm" v-if="yzmshow">获取验证码</button>
        <button class="nogetInfoYzm" @click="nogetInfoYzm" v-if="noyzmshow">获取验证码({{second}})</button>
      </van-cell-group>
    </div>
    <button class="pushNewPass" @click="pushChange" v-if="accShow">提交修改</button>
    <button class="pushNewPass" @click="nopushChange" v-if="noaccShow">
      <van-loading type="spinner"></van-loading>
    </button>
  </div>
</template>

<script type="text/ecmascript-6">
import qs from "qs";
const axios = require("axios");
import { Dialog } from "vant";
import backItem from "../Button/Back";
import apiConfig from "../../router/httpConfig";

import { Toast } from "vant";
import moment from "moment";
export default {
  name: "",
  data() {
    return {
      message1: "",
      message2: "",
      message3: "",
      message4: "",
      PicUrl: "",
      PicKey: "",
      second: 59,
      yzmshow: true,
      noyzmshow: false,
      accShow: true,
      noaccShow: false
    };
  },
  components: {
    backItem
  },
  methods: {
    getPicYzm: function() {
      axios.get(apiConfig.PictureVerificationCode).then(res => {
        this.PicUrl = res.data.data.url;
        this.PicKey = res.data.data.key;
      });
    },
    getInfoYzm: function() {
      this.yzmshow = false;
      this.noyzmshow = true;
      var k = 59;
      if (this.message2 == "") {
        Toast("请输入手机号以获取验证码");
        this.yzmshow = true;
        this.noyzmshow = false;
      } else {
        let timer = setInterval(() => {
          k--;
          this.second = k;
          if (this.second <= 0) {
            this.second = 59;
            clearInterval(timer);
            this.yzmshow = true;
            this.noyzmshow = false;
          }
        }, 1000);

        axios
          .post(
            apiConfig.SendSMSVerification,
            qs.stringify({
              mobile: this.message2,
              captcha_code: this.message4,
              captcha_key: this.PicKey
            })
          )
          .then(res => {
            Toast(res.data.data);
          });
      }
    },
    nogetInfoYzm() {
      Toast("请稍等" + this.second + "秒后再次发送");
    },
    pushChange: function() {
      this.accShow = false;
      this.noaccShow = true;
      if (this.message1 == "") {
        Toast("密码不得为空");
        this.accShow = true;
        this.noaccShow = false;
      } else if (this.message2 == "") {
        Toast("新手机号不得为空");
        this.accShow = true;
        this.noaccShow = false;
      } else if (this.message4 == "") {
        Toast("图形验证码不得为空");
        this.accShow = true;
        this.noaccShow = false;
      } else if (this.message3 == "") {
        Toast("短信验证码不得为空");
        this.accShow = true;
        this.noaccShow = false;
      } else {
        axios
          .post(
            apiConfig.ModifyMobileNum + "?token=" + localStorage.token,
            qs.stringify({
              password: this.message1,
              mobile: this.message2,
              verify: this.message3
            })
          )
          .then(res => {
            if (res.data.code == 0) {
              Toast(res.data.data);
              this.$router.go(-1);
              this.accShow = true;
              this.noaccShow = false;
            } else {
              Toast(res.data.data);
              this.accShow = true;
              this.noaccShow = false;
            }
          });
      }
    },
    nopushChange() {
      Toast.loading({
        mask: true,
        message: "网速较慢,请稍等..."
      });
    }
  },
  mounted() {
    this.getPicYzm();
  }
};
</script>

<style lang="less">
.editInfo {
  width: 100%;
  height: 48px;
  // background-color: orange;
  // background-color: rgba(238, 117, 69, 0.87);
  background-color: rgb(236, 89, 89);

  color: white;
  font-size: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.editInfo-password-div {
  margin-top: 10px;
}
.pushNewPass {
  margin-top: 40px;
  width: 70%;
  height: 35px;
  border-style: none;
  // background-color: orange;
  // background-color: rgba(238, 117, 69, 0.87);
  background-color: rgb(236, 89, 89);

  color: white;
  font-size: 18px;
  border-radius: 20px;
}
.getInfoYzm {
  position: absolute;
  top: 10px;
  right: 10px;
  border-style: none;
  // background-color: orange;
  background-color: rgb(236, 89, 89);

  border-radius: 10px;
  color: white;
  height: 25px;
}
.nogetInfoYzm {
  position: absolute;
  top: 10px;
  right: 10px;
  border-style: none;
  background-color: #e8e8e8;
  border-radius: 10px;
  color: white;
  height: 25px;
}
.getpicYzm {
  position: absolute;
  top: 10px;
  right: 10px;
  border-style: none;
  color: white;
  width: 80px;
  height: 30px;
}
</style>
