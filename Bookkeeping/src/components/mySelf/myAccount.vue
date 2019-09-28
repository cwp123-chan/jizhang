<template>
  <div class="myAccounts">
    <div class="top-total">
      <div>
        <span>净资产</span>
      </div>
      <div>
        <span>{{cleanMoney}}</span>
      </div>
      <div>
        <span v-if="leshow">盈余:</span>
        <span v-if="leshow">{{outMoney}}</span>
        <span v-if="noleshow">亏本:</span>
        <span v-if="noleshow">{{outMoney}}</span>
        <span>总资产:</span>
        <span>{{totalMoney}}</span>
      </div>
    </div>
    <div class="body-total">
      <span>账户</span>
    </div>
    <div class="list-total">
      <div>
        <van-swipe-cell
          :on-close="onClose"
          v-for="item in items"
          :key="item.id"
          class="div-key"
          :name="item.id"
        >
          <van-cell :border="false" :title="item.name" :value="item.balance" />

          <template slot="right">
            <van-button square type="danger" text="删除" />
          </template>
          <template slot="left">
            <van-button square type="primary" text="修改" />
          </template>
        </van-swipe-cell>
      </div>
    </div>
    <router-link to="/addAccount">
      <button class="addCreate" @click="addNewAccount">添加新的账户类型</button>
    </router-link>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import swipeCell from "../mySelf/swipe-cell";
const axios = require("axios");
import { Dialog } from "vant";
import { Toast } from "vant";
import apiConfig from "../../router/httpConfig";

import qs from "qs";

export default {
  name: "",
  data() {
    return {
      items: {},
      cleanMoney: 0,
      outMoney: 0,
      totalMoney: 0,
      leshow: true,
      noleshow: false
    };
  },
  components: {
    swipeCell
  },
  methods: {
    addNewAccount: function() {},
    localAccount: function() {
      Toast.loading({
        mask: true,
        message: "加载中,请稍等...",
        duration: "toast"
      });
      //   console.log(localStorage,localStorage.token)
      axios
        .post(apiConfig.AccessAccountInfo + "?token=" + localStorage.token)
        .then(res => {
          console.log(res);
          this.items = res.data.data;
          for (var i = 0; i < this.items.length; i++) {
            var data = res.data.data[i].balance.split(".")[0];
            parseFloat(data);
            this.cleanMoney += parseFloat(data);
          }
          for (var k = 0; k < this.items.length; k++) {
            var data = res.data.data[k].initial_balance.split(".")[0];
            parseFloat(data);
            this.totalMoney += parseFloat(data);
          }
          if (this.cleanMoney - this.totalMoney > 0) {
            this.leshow = true;
            this.noleshow = false;
            this.outMoney = this.cleanMoney - this.totalMoney + ".00";
          } else if (this.cleanMoney - this.totalMoney < 0) {
            this.leshow = false;
            this.noleshow = true;
            this.outMoney = 0 - (this.cleanMoney - this.totalMoney) + ".00";
          }
          this.totalMoney = this.totalMoney + ".00";
          this.cleanMoney = this.cleanMoney + ".00";
          Toast.loading({
            mask: true,
            message: "加载中,请稍等...",
            duration: "1"
          });
        });
    },
    // clickPosition 表示关闭时点击的位置
    onClose(clickPosition, instance) {
      switch (clickPosition) {
        case "left":
        case "cell":
          Dialog.confirm({
            message: "修改?"
          })
            .then(() => {
              localStorage.setItem("AccountItemId", instance._props.name);
              console.log(localStorage.AccountItemId);
              this.$router.push("/editAccount");
            })
            .catch(() => {});
          break;
        case "outside":
          instance.close();
          break;
        case "right":
          Dialog.confirm({
            message: "确定删除吗？"
          })
            .then(() => {
              console.log(instance._props.name);
              axios
                .post(
                  apiConfig.DeleteAccount +
                    "?id=" +
                    instance._props.name +
                    "&token=" +
                    localStorage.token
                )
                .then(res => {
                  console.log(res);
                  if (res.data.code == 0) {
                    axios
                      .post(AccessAccountInfo + "?token=" + localStorage.token)
                      .then(res => {
                        this.items = res.data.data;
                        for (var i = 0; i < this.items.length; i++) {
                          var data = res.data.data[i].balance.split(".")[0];
                          parseFloat(data);
                          this.totalMoney += parseFloat(data);
                        }
                        this.totalMoney = this.totalMoney + ".00";
                        Toast("删除成功");
                      });
                  }
                });
              instance.close();
            })
            .catch(() => {});
          break;
      }
    }
  },
  mounted() {
    this.localAccount();
  }
};
</script>

<style lang="less">
.myAccounts {
  position: absolute;
  top: 50px;
  width: 100%;
  height: 120px;
  margin-top: -50px;
  // background-color: rgb(251, 227, 183);
  background-color: rgb(236, 89, 89);
}
.top-total {
  width: 112%;
}
.top-total div {
  color: white;
}
.top-total {
  width:90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  color: #747474;
  font-size: 16px;
  padding-left: 5%;
  // margin-left: -41%;
}
.top-total > div:nth-of-type(1) {
  width:100%;
  display: flex;
  justify-content: flex-start;

  margin-top: 14px;
}
.top-total > div:nth-of-type(2) {
  width:100%;
    display: flex;
  justify-content: flex-start;

  margin-top: 10px;
}
.top-total > div:nth-of-type(3) {
  width:100%;
  display: flex;
  margin-top: 10px;
  justify-content: flex-start;
  align-items: center;
}
.top-total > div:nth-of-type(3) span:nth-of-type(2){
  margin-left: 3%;
}
.top-total > div:nth-of-type(3) span:nth-of-type(3){
  margin-left: 3%;
}

.body-total {
  display: flex;
  align-items: center;
  color: #747474;
  width: 100%;
  height: 30px;
  margin-top: 10px;
  background-color: #e8e8e8;
}
.body-total span{
  margin-left: 10%;
}

.van-cell--borderless > .van-cell__title {
  margin-left: -70px;
}
.van-cell {
  border-bottom: 0.5px solid #e8e8e8;
}
.addCreate {
  width: 200px;
  height: 50px;
  border-radius: 25px;
  color: white;
  font-size: 17px;
  border-style: none;
  // background-color: orange;
  background-color: rgb(236, 89, 89);

  margin-top: 40px;
}
</style>

