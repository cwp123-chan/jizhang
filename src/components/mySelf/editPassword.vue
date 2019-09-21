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
    <button class="pushNewPass" @click="pushNewPass">提交修改</button>
  </div>
</template>

<script type="text/ecmascript-6">
import qs from "qs";
const axios = require("axios");
import { Dialog } from "vant";
import { Toast } from "vant";
import backItem from '../Button/Back'
import moment from "moment";
export default {
  name: "",
  data() {
    return {
      message1: "",
      message2: "",
      message3: ""
    };
  },
  components: {
      backItem
  },
  methods: {
    pushNewPass: function() {
      if (this.message2 !== this.message3) {
        Toast("两次密码输入不正确,请重试");
      } else if (this.message2 === this.message3) {
        axios
          .post(
            "http://jizhang-api-dev.it266.com/api/user/password?token=" +
              localStorage.token,
            qs.stringify({
              password: this.message1,
              new_password: this.message2
            })
          )
          .then(res => {
            if ((res.data.code == 0)) {
              Dialog.confirm({
                message: res.data.data 
                }).then(() => {
                    this.$router.go(-1)
                }).catch(() => {
                // on cancel
                });
            } else {
              console.log(res.data.data);
            }
          });
      }
    }
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
</style>
