<template>
  <div class="mySelf">
    <div v-if="changeR" class="back-to-login" @click="backToLogin">
      <van-icon name="arrow-left" class="icon-login" dot />
      <span>返回登录</span>
    </div>
    <regester v-if="changeR" @sonInfos="changeInfo">
      <button slot="tologin" @click="tologin"></button>
    </regester>
    <login v-if="changeL" @loginOk="loginOks">
      <div slot="tologin">
        <button class="toRegester" @click="toRegester">注册</button>
      </div>
    </login>
    <add-center v-if="changeC" @backLogin="backLoginT" @edit="editInfo" @func="myexchangeAcc"></add-center>
    <updata-add v-if="editAdd"></updata-add>
    <my-account v-if="myAccount"></my-account>
  </div>
</template>

<script type="text/ecmascript-6">
import qs from "qs";
import { Toast } from "vant";
import regester from "../components/mySelf/regester";
import login from "../components/mySelf/login";
import addCenter from "../components/mySelf/addCenter";
import updataAdd from "../components/mySelf/updataAdd";
import myAccount from "../components/mySelf/myAccount";
const axios = require("axios");

export default {
  name: "",
  data() {
    return {
      changeR: false,
      changeL: true,
      changeC: false,
      editAdd: false,
      myAccount: false
    };
  },
  components: {
    regester,
    login,
    addCenter,
    updataAdd,
    myAccount
  },
  methods: {
    toRegester: function() {
      this.changeL = false;
      this.changeR = true;
      this.changeC = false;
      this.editAdd = false;
    },
    tologin: function() {},
    changeInfo: function(msg) {
      this.changeL = true;
      this.changeR = false;
      this.changeC = false;
      this.editAdd = false;
    },
    backLoginT: function(res) {
      //   console.log('撒打算打算的')

      Toast({ message: "退出成功" });
      this.changeL = true;
      this.changeR = false;
      this.changeC = false;
      this.editAdd = false;
    },
    backToLogin: function() {
      this.changeL = true;
      this.changeR = false;
      this.editAdd = false;
      this.changeC = false;
    },
    loginOks: function() {
      this.changeL = false;
      this.changeR = false;
      this.editAdd = false;
      this.changeC = true;
    },
    editInfo: function() {
      this.changeL = false;
      this.changeR = false;
      this.changeC = false;
      this.editAdd = true;
    },
    myexchangeAcc: function() {
      this.changeL = false;
      this.changeR = false;
      this.changeC = false;
      this.editAdd = false;
      this.myAccount = true;
    },
    TestLogin() {
      if (localStorage.token) {
        this.changeL = false;
        this.changeR = false;
        this.editAdd = false;
        this.changeC = true;
      }
    }
  },
  mounted() {
    this.TestLogin();
  }
};
</script>

<style lang="less">
.mySelf {
  width: 100%;
  display: flex;
  justify-content: center;
  // border: 1px solid #000;
}
.toRegester {
  width: 150px;
  height: 40px;
  background-color: rgb(253, 169, 13);
  border-style: none;
  color: white;
  font-weight: bold;
  font-size: 20px;
  letter-spacing: 1em;
  padding-left: 10%;

  // border: 1px solid #000;
}
.back-to-login {
  position: absolute;
  left: 5%;
  top: 40px;
  font-weight: bold;
  color: #747474;
  display: flex;
  align-items: center;
}
.md-input-bd,
.md-input-bd3 {
  background-color: rgb(246, 237, 237);
}
</style>
