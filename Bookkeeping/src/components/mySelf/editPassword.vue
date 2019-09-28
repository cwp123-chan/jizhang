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
        <van-field
          v-model="message1"
          label="旧密码"
          type="password"
          placeholder="请输入旧密码"
          rows="1"
          autosize
        />
      </van-cell-group>
    </div>
    <div class="editInfo-password-div">
      <van-cell-group>
        <van-field
          v-model="message2"
          label="新密码"
          type="password"
          placeholder="请输入旧密码"
          rows="1"
          autosize
        />
      </van-cell-group>
    </div>
    <div class="editInfo-password-div">
      <van-cell-group>
        <van-field
          v-model="message3"
          label="确认密码"
          type="password"
          placeholder="请再次确认密码"
          rows="1"
          autosize
        />
      </van-cell-group>
    </div>
    <button class="pushNewPass" @click="pushNewPass" v-if="accShow">提交修改</button>
    <button class="pushNewPass" @click="nopushNewPass" v-if="noaccShow">
      <van-loading type="spinner"></van-loading>
    </button>
  </div>
</template>

<script type="text/ecmascript-6">
import qs from "qs";
const axios = require("axios");
import { Dialog } from "vant";
import { Toast } from "vant";
import backItem from "../Button/Back";
import moment from "moment";
import apiConfig from "../../router/httpConfig";

export default {
  name: "",
  data() {
    return {
      message1: "",
      message2: "",
      message3: "",
      accShow: true,
      noaccShow: false
    };
  },
  components: {
    backItem
  },
  methods: {
    pushNewPass: function() {
      this.accShow = false;
      this.noaccShow = true;
      if(this.message1 == ''){
          Toast('原始密码不得为空')
          this.accShow = true;
      this.noaccShow = false;
      }else if(this.message2 == ''){
          Toast('新密码不得为空')
           this.accShow = true;
      this.noaccShow = false;
      }else if(this.message3 == ''){
        Toast('确认密码不得为空')
         this.accShow = true;
      this.noaccShow = false;
      }else{
      if (this.message2 !== this.message3) {
        Toast("两次密码输入不正确,请重试");
        this.accShow = true;
        this.noaccShow = false;
      } else if (this.message2 === this.message3) {
        axios
          .post(
            apiConfig.ChangePassword + "?token=" + localStorage.token,
            qs.stringify({
              password: this.message1,
              new_password: this.message2
            })
          )
          .then(res => {
            if (res.data.code == 0) {
              Toast(res.data.data);
              this.$router.go(-1);
              this.accShow = true;
              this.noaccShow = false;
            } else {
              // console.log(res.data.data);
              this.accShow = true;
              this.noaccShow = false;
            }
          });
      }
      }
    },
    nopushNewPass() {
      Toast.loading({
        mask: true,
        message: "网速较慢,请稍等..."
      });
    }
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
</style>
