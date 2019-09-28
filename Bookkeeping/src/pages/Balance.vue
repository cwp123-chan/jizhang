<template>
  <div class="Balance">
    <Balance-index></Balance-index>   
    <div class="Balance-body">
      <div>
        <balance-body :data="data">
            <slot name="balanceTop" ></slot>
        </balance-body>
        <div class="Balance-body-data-div" @click="inMoneyfunc">
          <balance-body-data-div icon="bill" :mark = "mark.text1" :inMoney = "inMoney">
            <slot name="balanceInmoney"></slot>
          </balance-body-data-div>          
        </div>
        <van-divider />
         <div class="Balance-body-data-div" @click="outMoneyfunc">
          <balance-body-data-div icon="balance-list" :mark = "mark.text2" :inMoney = "outMoney">
            <slot name="balanceInmoney"></slot>
          </balance-body-data-div>          
        </div>
        <van-divider />
        <div class="Balance-body-data-div" @click="morMoneyfunc">
          <balance-body-data-div icon="medel" :mark = "mark.text3" :inMoney = "morMoney">
            <slot name="balanceInmoney"></slot>
          </balance-body-data-div>          
        </div>
        <van-divider />
      </div>
    </div>
    <div class="Balance-body">
      <div>
        <div class="Balance-body-div">
          <div class="Balance-body-data">
            <span>待收/待付</span>
          </div>
        </div>
         <div class="Balance-body-data-div">
          <balance-body-data-div icon="card" :mark = "mark.text4" :inMoney = "loginMoney">
            <slot name="balanceInmoney"></slot>
          </balance-body-data-div>          
        </div>
        <van-divider />
        <div class="Balance-body-data-div">
          <balance-body-data-div icon="gold-coin" :mark = "mark.text5" :inMoney = "paidMoney">
            <slot name="balanceInmoney"></slot>
          </balance-body-data-div>          
        </div>
        <van-divider />
      </div>
    </div>
    <back-item></back-item>

    <!-- <button class="Balance-footer-btn-list">记一笔</button> -->
  </div>
</template>

<script type="text/ecmascript-6">
import BalanceIndex from "../components/Balance/Balance-index";
import balanceIndexItem from "../components/Balance/balance-index-item";
import backItem from "../components/Button/Back";
import apiConfig from "../router/httpConfig.js";
import balanceBody from "../components/Balance/balance-body"
import balanceBodyDataDiv from "../components/Balance/balanceBodyDataDiv"
import { Dialog } from "vant";

import qs from "qs";
const axios = require("axios");
import { Toast } from "vant";
export default {
  name: "",
  data() {
    return {
      activeName: "1",
      beginData: "",
      endData: "",
      inMoney: 0,
      outMoney: 0,
      morMoney: 0,
      data: "",
      paidMoney: 0,
      loginMoney: 0,
      mark:{
        text1:'账面收入',
        text2:'账面支出',
        text3:'账面利润',
        text4:'待收款',
        text5:'待付款'
      }
      
    };
  },
  components: {
    BalanceIndex,
    backItem,
    balanceBody,
    balanceBodyDataDiv
  },
  methods: {
    getData() {
       Toast.loading({
        mask: true,
        message: "加载中,请稍等...",
        duration: "toast"
      });
      // console.log(this.$route)
      // if (!localStorage.token && this.$route.path == '/balance') {
      //   // Dialog.confirm({
      //   //   message: "暂无内容,请登录后查看"
      //   // })
      //   //   .then(() => {
      //   //     this.$router.push("/myself");
      //   //   })
      //   //   .catch(() => {
      //   //     this.$router.push("/balance");
      //   //   });
      // }
     
      axios
        .get(apiConfig.AccountingDetailList + "?token=" + localStorage.token, {
          params: {}
        })
        .then(res => {
          //   console.log(res)
          var newdata = res.data.data.list[0].date.split("-");
          this.data = newdata[0] + "-" + newdata[1];
          //   type为1
          // console.log(res.data.data.list[i].type)
          // 获取收入
          var indata = res.data.data.in;
          this.inMoney = indata;
          var outdata = res.data.data.out;
          this.outMoney = outdata;
          this.morMoney = this.inMoney - this.outMoney;
        });

      axios
        .get(apiConfig.receivedOrPaid + "?token=" + localStorage.token, {
          params: {
            type: "1"
          }
        })
        .then(res => {
          this.paidMoney = res.data.data.total;
        });

      axios
        .get(apiConfig.receivedOrPaid + "?token=" + localStorage.token, {
          params: {
            type: "2"
          }
        })
        .then(res => {
          this.loginMoney = res.data.data.total;
          Toast.loading({
            mask: true,
            message: "加载中,请稍等...",
            duration: "1"
          });
        });
    },
    inMoneyfunc: function() {
      this.$router.push("/inMoneyList");
    },
    outMoneyfunc: function() {
      this.$router.push("/inMoneyList");
    },
    morMoneyfunc: function() {
      this.$router.push("/inMoneyList");
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style lang="less">
.Balance-body-data {
  display: flex;
  justify-content: space-between;
  width: 90%;
  color: #747474;
  font-size: 12px;
  margin-top: 3px;
}
.Balance-body-div {
  display: flex;
  justify-content: center;
  height: 25px;
}
.Balance-body-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  color: #747474;
  font-weight: bold;
  // font-family: '黑体';
  // border-top: 1px solid #000;
  height: 45px;
}
.van-divider {
  margin: 0px !important;
}
.Balance-body-data-div {
  display: flex;
  justify-content: center;
  background-color: #fff;
}
.Balance-body-icon {
  display: flex;
  align-items: center;
}
.Balance-footer-btn-list {
  width: 70%;
  height: 40px;
  border-style: none;
  background-color: rgb(103, 185, 103);
  border-radius: 10px;
  margin-top: 30px;
  color: white;
  font-size: 20px;
  font-weight: bold;
}
.Balance-index .van-popup{
  height:300px !important;
}
.createNewBookBtn{
  margin-top: 16% !important;
}
</style>
