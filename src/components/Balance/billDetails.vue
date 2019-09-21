<template>
  <div class="billDetails">
    <back-item></back-item>
    <div class="billDetails-fixed">
      <div class="billDetails-title">
        <span>收支明细</span>
      </div>
    </div>
    <div>
      <div class="billDetails-body">
        <ul v-if="allIn">
          <li class="billDetails-body-list" v-if="typeLess">
            <van-col span="8">账面支出:</van-col>
            <van-col span="8"></van-col>
            <van-col span="8">{{totalTomoney}}</van-col>
          </li>
          <li class="billDetails-body-list" v-if="typeGet">
            <van-col span="8">账面收入:</van-col>
            <van-col span="8"></van-col>
            <van-col span="8">{{totalTomoney}}</van-col>
          </li>
          <li class="billDetails-body-list">
            <van-col span="8">交易对象:</van-col>
            <van-col span="8"></van-col>
            <van-col span="8">{{companyToname}}</van-col>
          </li>
          <li class="billDetails-body-list">
            <van-col span="8">付款方式:</van-col>
            <van-col span="8"></van-col>
            <van-col span="8">分期付款</van-col>
          </li>
          <li class="billDetails-body-list">
            <van-col span="8">支出类别:</van-col>
            <van-col span="8"></van-col>
            <van-col span="8">{{categoryToname}}</van-col>
          </li>
          <li class="billDetails-body-list" v-if="typeLess">
            <van-col span="8">结清状态:</van-col>
            <van-col span="8"></van-col>
            <van-col span="8">未结清({{lessmoney}})</van-col>
          </li>
          <li class="billDetails-body-list" v-if="typeGet">
            <van-col span="8">结清状态:</van-col>
            <van-col span="8"></van-col>
            <van-col span="8">待收款({{lessmoney}})</van-col>
          </li>
          <div v-for="money in lissMoney" :key="money.id">
            <li class="billDetails-body-middle-li" v-if="typeLess">
              <span class="billDetails-body-middle">第{{money.num}}笔付款</span>
            </li>
            <li class="billDetails-body-middle-li" v-if="typeGet">
              <span class="billDetails-body-middle">第{{money.num}}笔付款</span>
            </li>
            <li class="billDetails-body-list" v-if="typeLess" @click = "updataTheMoney(money)">
              <van-col span="8">付款金额:</van-col>
              <van-col span="8"></van-col>
              <van-col span="8">{{money.money}}</van-col>
            </li>
            <li class="billDetails-body-list" v-if="typeGet" @click = "updataTheMoney(money)">
              <van-col span="8">收款金额:</van-col>
              <van-col span="8"></van-col>
              <van-col span="8">{{money.money}}</van-col>
            </li>
            <li class="billDetails-body-list" @click = "updataTheAccount(money)">
              <van-col span="8">付款账户:</van-col>
              <van-col span="8"></van-col>
              <van-col span="8">{{money.account_name}}</van-col>
            </li>
            <li
              class="billDetails-body-list billDetails-body-list-img"
              v-if="money.images.length !== 0"
            >
              <van-col span="8">支付凭证:</van-col>
              <van-col span="8"></van-col>
                <div class="billDetails-body-list-img-img-div">

              <van-col span="8" v-for="pic in money.images" :key="pic.id">
                <img
                  class="billDetails-body-list-img-img"
                  :src="pic.thumbnail"
                  alt
                  v-if="money.images.length !== 0 "
                />
                <!-- <img class="billDetails-body-list-img-img" src="../../assets/logo.png" alt v-else /> -->
              </van-col>
                </div>

            </li>
            <li
              class="billDetails-body-list billDetails-body-list-img"
              v-else-if="money.images.length == 0"
            >
              <van-col span="8">支付凭证:</van-col>
              <van-col span="8"></van-col>
              <van-col span="8">
                <!-- <div class="billDetails-body-list-img-img-div"> -->
                <img class="billDetails-body-list-img-img" src="../../assets/u=634121950,3985757767&fm=214&gp=0.jpg" alt />
                <!-- </div> -->
              </van-col>
            </li>
            <li class="billDetails-body-list" v-if="typeLess" @click = "dateTheMoney(money)">
              <van-col span="8">付款日期:</van-col>
              <van-col span="8"></van-col>
              <van-col span="8">{{money.updated_at}}</van-col>
            </li>
            <li class="billDetails-body-list" v-if="typeGet" @click = "dateTheMoney(money)">
              <van-col span="8">收款日期:</van-col>
              <van-col span="8"></van-col>
              <van-col span="8">{{money.updated_at}}</van-col>
            </li>
            <li class="billDetails-body-list billDetails-body-list-bz">
              <van-col span="8">备注:</van-col>
              <van-col span="8"></van-col>
              <van-col span="8">{{remark}}</van-col>
            </li>
            <li class="billDetails-body-list">
              <van-col span="8">记账人:</van-col>
              <van-col span="8"></van-col>
              <van-col span="8">{{userTonickname}}</van-col>
            </li>
          </div>
          <li>
            <button class="billDetails-foot-btn" @click="Subsequent">后续缴费</button>
            <button class="billDetails-foot-btn-del" @click="delDetails">删除记账</button>
          </li>
          <li class="changeBig"></li>
        </ul>

        <ul v-if="doubIn">
          <li class="billDetails-body-list" v-if="typeLess">
            <van-col span="8">账面支出:</van-col>
            <van-col span="8"></van-col>
            <van-col span="8">{{totalTomoney}}</van-col>
          </li>
          <li class="billDetails-body-list" v-if="typeGet">
            <van-col span="8">账面收入:</van-col>
            <van-col span="8"></van-col>
            <van-col span="8">{{totalTomoney}}</van-col>
          </li>
          <li class="billDetails-body-list">
            <van-col span="8">交易对象:</van-col>
            <van-col span="8"></van-col>
            <van-col span="8">{{companyToname}}</van-col>
          </li>
          <li class="billDetails-body-list">
            <van-col span="8">付款方式:</van-col>
            <van-col span="8"></van-col>
            <van-col span="8">全额付款</van-col>
          </li>
          <li class="billDetails-body-list">
            <van-col span="8">支出类别:</van-col>
            <van-col span="8"></van-col>
            <van-col span="8">{{categoryToname}}</van-col>
          </li>
          <li class="billDetails-body-list">
            <van-col span="8">结清状态:</van-col>
            <van-col span="8"></van-col>
            <van-col span="8">已结清</van-col>
          </li>
          <li class="billDetails-body-list billDetails-body-list-img">
            <van-col span="8">支付凭证:</van-col>
            <van-col span="8"></van-col>
                <div class="billDetails-body-list-img-img-div2">
            <div v-for = "item in lissMoney" :key = "item.index">
              <van-col span="8" v-for= "zfpz in item.images" :key="zfpz.id">                  
                <img class="billDetails-body-list-img-img" :src="zfpz.thumbnail" alt />
              </van-col>
            </div>
                </div>
          </li>
          <li class="billDetails-body-list">
            <van-col span="8">记账日期:</van-col>
            <van-col span="8"></van-col>
            <van-col span="8">{{createdWidat}}</van-col>
          </li>
          <li class="billDetails-body-list">
            <van-col span="8">更新日期:</van-col>
            <van-col span="8"></van-col>
            <van-col span="8">{{updatedAt}}</van-col>
          </li>
          <li class="billDetails-body-list billDetails-body-list-bz">
            <van-col span="8">备注:</van-col>
            <van-col span="8"></van-col>
            <van-col span="8">{{remark}}</van-col>
          </li>
          <li class="billDetails-body-list">
            <van-col span="8">记账人:</van-col>
            <van-col span="8"></van-col>
            <van-col span="8">{{userTonickname}}</van-col>
          </li>
          <li>
            <button class="billDetails-foot-btn-del" @click="delDetails">删除记账</button>
          </li>
        </ul>
        <!-- <ul v-if = "noMore">
          
        </ul>-->
      </div>
      <van-popup v-model="moneyshow">
        <van-cell-group>
          <van-field
            v-model="moneyMsg"
            label="实付金额"
            type="textarea"
            placeholder="请输入实付金额"
            rows="1"
            autosize
          />
        </van-cell-group>
        <div class="moneyShow-div">
        <button class="moneyShow-btn" @click="pushMoneyshow">提交修改</button>
        <button class="moneyShow-btn" @click = "disMoneyshow">放弃修改</button>
        </div>
      </van-popup>
      <van-popup v-model="dateshow">
        <van-cell-group>
          <van-field
            v-model="dateMsg"
            label="修改日期"
            type="textarea"
            :placeholder= "dateMsg"
            rows="1"
            autosize
          />
        </van-cell-group>
        <div class="moneyShow-div">
        <button class="moneyShow-btn" @click="pushDateshow">提交修改</button>
        <button class="moneyShow-btn" @click = "disDateshow">放弃修改</button>
        </div>
      </van-popup>

      <van-popup v-model="Accountshow">
        <van-cell-group>
          <van-field
            v-model="AccountMsg"
            label="对不起"
            type="textarea"
            placeholder="您无权限修改此内容"
            rows="1"
            disabled
            autosize
          />
        </van-cell-group>
        <div class="moneyShow-div">
        <!-- <button class="moneyShow-btn" @click="pushAccountshow">提交修改</button>
        <button class="moneyShow-btn" @click = "disAccountshow">放弃修改</button> -->
        </div>
      </van-popup>
    </div>
    <div class="bigcahng">

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from "vue";
import qs from "qs";
const axios = require("axios");
import { Dialog } from "vant";
import { Toast } from "vant";
import moment from "moment";
import backItem from "../Button/Back";

export default {
  name: "",
  data() {
    return {
      allIn: false,
      doubIn: false,
      totalTomoney: "",
      companyToname: "",
      categoryToname: "",
      lessmoney: "",
      paidTomoney: "",
      accountToname: "",
      updatedAt: "",
      remark: "",
      userTonickname: "",
      createdWidat: "",
      typeGet: false,
      typeLess: true,
      lissMoney: [],
      moneyshow:false,
      moneyMsg:'',
      moneyLocalId:'',
      AccountMsg:'',
      Accountshow:false,
      dateshow:false,
      dateMsg:''
    };
  },
  components: {
    backItem,
    Vue
  },
  methods: {
    getDetailList: function() {
      this.dateMsg = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      var data = new Date();
      var detailListId = localStorage.detailListId;
      axios
        .get(
          "http://jizhang-api-dev.it266.com/api/record/detail?id=" +
            detailListId +
            "&token=" +
            localStorage.token
        )
        .then(res => {
          var totalMoney = Number(res.data.data.total_money.split(".")[0]);
          var paidMoney = Number(res.data.data.paid_money.split(".")[0]);
          // console.log(res)
          this.totalTomoney = res.data.data.total_money;
          this.companyToname = res.data.data.company_name;
          this.categoryToname = res.data.data.category_name;
          this.lessmoney = totalMoney - paidMoney;
          this.paidTomoney = res.data.data.paid_money;
          this.userTonickname = res.data.data.user_nickname;
          if (res.data.data.remark == "") {
            this.remark = "暂无备注";
          } else {
            this.remark = res.data.data.remark;
          }
          if (res.data.data.type == "2") {
            this.typeLess = true;
            this.typeGet = false;
          } else if (res.data.data.type == "1") {
            this.typeLess = false;
            this.typeGet = true;
          }
          let endstr = res.data.data.updated_at;
          this.updatedAt = moment(endstr).format("YYYY-MM-DD");
          let creatStr = res.data.data.created_at;
          this.createdWidat = moment(creatStr).format("YYYY-MM-DD");

          this.accountToname = res.data.data.items[0].account_name;
          if (totalMoney - paidMoney == 0) {
            this.allIn = false;
            this.doubIn = true;
            // console.log(res)
          } else if (totalMoney - paidMoney !== 0) {
            this.allIn = true;
            this.doubIn = false;
          }
          // console.log(res.data.data.items)
          this.lissMoney = res.data.data.items;
          let k = 1;
          for (var i = 0; i < this.lissMoney.length; i++) {
            // this.lissMoney[i].append("num" , k);
            Vue.set(this.lissMoney[i], "num", k);
            k++;
          }
          // console.log(this.lissMoney);
        });
    },
    delDetails: function() {
      // console.log(this.$route.params.detialId);
      Dialog.confirm({
        message: "确认删除此账单吗?"
      })
        .then(() => {
          axios
            .post(
              "http://jizhang-api-dev.it266.com/api/record/delete?id=" +
                this.$route.params.detialId +
                "&token=" +
                localStorage.token
            )
            .then(res => {
              Toast(res.data.data);
              this.$router.go(-1);
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    Subsequent: function() {
      this.$router.push("/Subsequent");
    },
    // 以下为单条修改
    updataTheMoney(money){
      // console.log(money)
      this.moneyshow = true
      this.moneyLocalId = money.id
    },
    disMoneyshow(){
      this.moneyshow = false      
    },
    pushMoneyshow(){
      axios.post('http://jizhang-api-dev.it266.com/api/record/item/update?itemId='+this.moneyLocalId+'&token='+localStorage.token,qs.stringify({
        money:this.moneyMsg
      }))
      .then((res)=>{
          if(res.data.code==0){
            Toast(res.data.data)
      this.$router.go(0)

          }else{
            Toast('修改失败')
          }
      this.moneyshow = false      
      })
    },
    // 以下为修改账户(功能待完善)
    updataTheAccount(money){
      this.Accountshow = true
      this.moneyLocalId = money.id
      axios.get('http://jizhang-api-dev.it266.com/api/account?token='+localStorage.token)
      .then((res)=>{
        // console.log(res)
      })

    },
    disAccountshow(){
      this.Accountshow = true

    },
    pushAccountshow(){
      // 功能待完善
      // console.log(this.AccountMsg)
      //   axios.post('http://jizhang-api-dev.it266.com/api/record/item/update?itemId='+this.moneyLocalId+'&token='+localStorage.token,qs.stringify({
      //     // money:this.moneyMsg
      //   }))
      //   .then((res)=>{
      //       if(res.data.code==0){
      //         Toast(res.data.data)
      //       this.$router.go(0)

      //       }else{
      //         Toast('修改失败')
      //       }
      //       this.Accountshow = false      
      // })
    },
    // 修改日期
    dateTheMoney(date){
      // console.log(date)
      this.moneyLocalId = date.id

      this.dateshow = true
    },
    pushDateshow(){
      let date = moment(this.dateMsg).format('YYYY-MM-DD')
       axios.post('http://jizhang-api-dev.it266.com/api/record/item/update?itemId='+this.moneyLocalId+'&token='+localStorage.token,qs.stringify({
        date:date
      }))
      .then((res)=>{
        // console.log(res)
        // console.log(this.moneyLocalId)
          if(res.data.code==0){
            Toast(res.data.data)
          this.$router.go(0)

          }else{
            Toast('修改失败')
          }
      this.dateshow = false      
      })
    },
    disDateshow(){
      this.dateshow = false

    }
  },
  mounted() {
    this.getDetailList();

  }
};
</script>

<style lang="less">
.billDetails {
  width: 100%;
}

.billDetails-title {
  display: flex;
  justify-content: center;
  // align-items: center;
  padding-top: 20px;
  font-size: 18px;
  color: white;
  width: 100%;
  height: 30px;
  background-color: orange;
}
.billDetails-title > span {
  display: block;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  font-size: 22px;
  border-radius: 20px;
  height: 35px;
  margin-top: -13px;
  // border: 1px solid white;
}
.billDetails-title-btn {
  // position:fixed;
  bottom: 0px;
  display: flex;
  margin-top: -50px;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  // align-items: center;
}
.billDetails-fixed {
  position: fixed;
  top: 0px;
  width: 100%;
}
.billDetails-body {
  width: 100%;
  margin-top: 50px;
}
.billDetails-body-list {
  padding-top: 20px;
  width: 100%;
  height: 30px;
  background-color: #fff;
  margin-top: 1px;
}
.billDetails-body-list-img {
  height: 100%;
}
.billDetails-body-list-img-img {
  width: 60px;
}
.billDetails-body-list-img {
  display: flex;
  align-items: center;
}
.billDetails-body-list-bz {
  height: 80px;
  display: flex;
  align-items: center;
}
.billDetails-foot-btn {
  // position:fixed;
  // bottom:50px;
  // left:0px;
  width: 150px;
  height: 30px;
  background-color: orange;
  margin-top: 20px;
  border-style: none;
  border-radius: 10px;
  // border-bottom-right-radius: 10px;
  font-weight: bold;
  color: white;
}
.billDetails-body-list > div:nth-of-type(3) {
  color: #747474;
}
.billDetails-body-middle {
  margin-left: 10%;
  font-size: 14px;
}
.billDetails-body-middle-li {
  height: 30px;
  display: flex;
  align-items: center;
}
.billDetails-foot-btn-del {
  // position:fixed;
  // right:0px;
  // bottom:50px;
  width: 150px;
  height: 30px;
  background-color: rgb(245, 108, 29);
  margin-top: 20px;
  border-style: none;
  border-radius: 10px;
  // border-bottom-left-radius: 10px;
  font-weight: bold;
  color: white;
}
// .billDetails {
//   // min-height:5000px;
// }
.billDetails .van-tag--mark {
  top: 15px !important;
}
.changeBig {
  width: 100%;
  height: 85px;
}


.billDetails-body-list-img-img-div{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    // border: 1px solid #000;
    width:60%;
    margin-top: -13px;
    margin-left: -5%;
}
.billDetails-body-list-img-img-div .billDetails-body-list-img-img{
    width:60px;
    height:60px;

}
.billDetails-body-list-img>div:nth-of-type(1){
    margin-left: 3%;
}
.billDetails-body-list-img-img-div2{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    // border: 1px solid #000;
    width:60%;
    margin-top: -13px;
    margin-left: 5%;
}
.billDetails-body-list-img-img-div2 .billDetails-body-list-img-img{
    width:60px;
    height:60px;
    margin-left:-20%;


}
.moneyShow-btn{
  border-style:none;
  background-color: orange;
  color:white;
  margin: 10px auto;
}
.moneyShow-div{
  width:100%;
  height:60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.billDetails .van-cell{
  width:300px;
}
.billDetails .van-popup{
  border-radius: 10px;
}
.bigcahng{
  width:100%;
  height:60px;
}
</style>
