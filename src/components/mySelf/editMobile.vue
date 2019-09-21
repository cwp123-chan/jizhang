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
        <button class="getInfoYzm" @click="getInfoYzm">获取验证码</button>
      </van-cell-group>
    </div>
    <button class="pushNewPass" @click="pushChange">提交修改</button>
  </div>
</template>

<script type="text/ecmascript-6">
import qs from "qs";
const axios = require("axios");
import { Dialog } from "vant";
import backItem from '../Button/Back'
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
      PicUrl:'',
      PicKey:''
    };
  },
  components: {
      backItem
  },
  methods: {
    getPicYzm: function() {
        axios.get('http://jizhang-api-dev.it266.com/api/captcha')
        .then((res)=>{
            this.PicUrl = res.data.data.url
            this.PicKey = res.data.data.key
        })
    },
    getInfoYzm: function() {
      axios
        .post(
          "http://jizhang-api-dev.it266.com/api/sms/verify",
          qs.stringify({
            mobile: this.message2,
            captcha_code: this.message4,
            captcha_key: this.PicKey
          })
        )
        .then(res => {
          console.log(res);
        });
    },
    pushChange: function() {
        axios.post('http://jizhang-api-dev.it266.com/api/user/mobile?token='+localStorage.token,qs.stringify({
            password:this.message1,
            mobile:this.message2,
            verify:this.message3
        }))
        .then((res)=>{
            if(res.data.code == 0){
                Toast(res.data.data)
                this.$router.go(-1)
            }else{
                Toast(res.data.data)
            }
        })
    },
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
  background-color: orange;
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
  background-color: orange;
  color: white;
  font-size: 18px;
  border-radius: 20px;
}
.getInfoYzm {
  position: absolute;
  top: 10px;
  right: 10px;
  border-style: none;
  background-color: orange;
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
