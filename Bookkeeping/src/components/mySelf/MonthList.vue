<template>
  <div class="MonthList">
    <back-item></back-item>

    <div class="MonthList-body" id="div" @scroll="handleScroll">
      <div class="MonthList-header">
        <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
</van-pull-refresh> -->
        <div class="MonthList-header-title">
          <span>当月:&nbsp;{{begindata}} 至 {{enddata}}</span>
        </div>
        <div class="MonthList-header-bd">
          <span>账面收入:{{inMoney}}</span>
          <span>账面利润:{{morMoney}}</span>
        </div>
        <div class="MonthList-header-bd">
          <span>账面支出:{{outMoney}}</span>
        </div>
      </div>
          <!-- class = "[{list-active : item.id === listactive}]" -->

      <div class="MonthList-body-more">
        <div
          :class="['MonthList-body-title',{ 'list-active' : item.id === listactive}]"
          v-for="item in newPaidName"
          :key="item.id"
          @click="getMoreList(item)"
          


        >
          <all-list-item :item = "item">
            <slot name="allListItem"></slot>
          </all-list-item>
           <all-list-item-type :item = "item">
            <slot name="allListItemType"></slot>
           </all-list-item-type>
          
        </div>
      </div>
      <div class="clickload" @click="clickload" v-if="nextshow">
        <span class="loadnext">点击加载下一页</span>
      </div>
      <div class="clickload" v-if="nonextshow">
        <span class="loadnext">没有更多数据</span>
      </div>
    </div>
    <!-- <van-pagination
      v-model="currentPage"
      :page-count="showpages"
      mode="simple"
      @change="changePage"
    />-->
    <div class="changemoreis"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import qs from "qs";
const axios = require("axios");
import { Dialog } from "vant";
import backItem from "../Button/Back";
import { Toast } from "vant";
import moment from "moment";
import apiConfig from "../../router/httpConfig";
import allListItem from "../Balance/allListItem";
import allListItemType from "../Balance/allListItemType"

export default {
  name: "",
  data() {
    return {
      listactive:0,
      begindata: "",
      enddata: "",
      inMoney: 0,
      outMoney: 0,
      morMoney: 0,
      paidName: [],
      miss: true,
      missing: false,
      currentPage: 0,
      itemsPerPage: 7,
      totalItems: "",
      newPaidName: [],
      showpages: 3,
      y: 0,
      nextshow: true,
      nonextshow: false,
      count: 0,
      isLoading: true
    };
  },
  components: {
    backItem,
    allListItem,
    allListItemType
  },
  methods: {
    handleScroll(e) {
     let scrollTop
      if(document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if(document.body) {
        scrollTop = document.body.scrollTop;   // 获取 滚动条距顶部高度
    }

    var docHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
    // 获取文档所有数据高度
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;

      if (scrollTop + clientHeight - docHeight >-10 && scrollTop + clientHeight - docHeight<10) {
        this.y++;
        //   console.log(this.y)
        if (
          this.itemsPerPage + this.y * this.itemsPerPage >=
          this.paidName.length
        ) {
          let length =
            this.paidName.length -
            this.itemsPerPage +
            (this.y - 1) * this.itemsPerPage;
          for (var k = this.y * this.itemsPerPage; k < length; k++) {
            // console.log(this.paidName[k])
            if(this.paidName[k] == null){
              return false
            }else{
            this.newPaidName.push(this.paidName[k]);

            }

          }
          this.nextshow = false;
          this.nonextshow = true;
        } else {
          for (
            var k = this.y * this.itemsPerPage;
            k < this.itemsPerPage + this.y * this.itemsPerPage;
            k++
          ) {
            this.newPaidName.push(this.paidName[k]);
          }
        }

        this.newPaidName = this.newPaidName;

      }

    },
    clickload() {
      this.y++;
      //   console.log(this.y)
      if (
        this.itemsPerPage + this.y * this.itemsPerPage >=
        this.paidName.length
      ) {
        let length =
          this.paidName.length -
          this.itemsPerPage +
          (this.y - 1) * this.itemsPerPage;
        for (var k = this.y * this.itemsPerPage; k < length; k++) {
          this.newPaidName.push(this.paidName[k]);
        }
        this.nextshow = false;
        this.nonextshow = true;
      } else {
        for (
          var k = this.y * this.itemsPerPage;
          k < this.itemsPerPage + this.y * this.itemsPerPage;
          k++
        ) {
          this.newPaidName.push(this.paidName[k]);
        }
      }

      this.newPaidName = this.newPaidName;
      // console.log(this.newPaidName)
      // console.log(this.paidName)

    },
    getData: function() {
      Toast.loading({
        mask: false,
        message: "加载中,请稍等...",
        duration: "toast"
      });
      axios
        .get(apiConfig.AccountingDetailList + "?token=" + localStorage.token, {
          params: {
              page:1
          }
        })
        .then(res => {
          //   console.log(res)
          this.inMoney = res.data.data.in;
          this.outMoney = res.data.data.out;
          this.morMoney = this.inMoney - this.outMoney;
          var data = new Date();
          let str = moment(data).format("YYYY-MM-DD");
          this.enddata = str;
          let endstr = moment(data).format("YYYY-MM");
          this.begindata = endstr + "-01";
          this.paidName = res.data.data.list;
          for (var k = 0; k < this.itemsPerPage; k++) {
            this.newPaidName[k] = this.paidName[k];
          }
           for(var i = 0; i<this.paidName.length; i++){
                  this.paidName[i].lessMoney = Number(res.data.data.list[i].total_money.split('.')[0]) - Number(res.data.data.list[i].paid_money.split('.')[0])
            }
          console.log(this.newPaidName);

          Toast.loading({
            mask: false,
            message: "加载中,请稍等...",
            duration: "1"
          });
        });
    },
    getMoreList(item) {
      localStorage.setItem("detailListId", item.id);
      this.$route.params.detialId = item.id;
      this.listactive = item.id
      setTimeout(()=>{
      this.$router.push("/billDetails");

      },20)



    },
    // onRefresh() {
    //   setTimeout(() => {
    //     this.$toast('刷新成功');
    //     this.isLoading = false;
    //     this.count++;
    //   }, 500);
    // }
  },
  mounted() {
    this.getData();
    window.addEventListener("scroll", this.handleScroll, true);
  }
};
</script>

<style lang="less">
.MonthList-header {
  // margin-top: -10px;
  width: 100%;
  height: 130px;
  background-color: #fff;
}
.MonthList-header-title {
  width: 100%;
  height: 40px;
  color: #747474;
  display: flex;
  align-items: center;
}
.MonthList-header-title > span {
  margin-left: 5%;
}
.MonthList-header-bd {
  width: 100%;
  height: 30px;
  color: #747474;
  display: flex;
  align-items: center;
}
.MonthList-header-bd > span {
  display: block;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-left: 5%;
  // border: 1px solid #000;
}
.MonthList-header-bd > span:nth-of-type(2) {
  margin-left: 35%;
}
.MonthList-body-title {
  
  margin-top: 10px;
  width: 100%;
  height: 50px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
}
.MonthList-body-title > div {
  display: flex;
  align-items: center;
}
.MonthList-body-title > div > span {
  display: flex;
  align-items: center;
}
.title-style > span:nth-of-type(1) {
  font-weight: bold;
  // font-size: 18px;
  margin-left: 10px;
  color: #747474;
}
.title-style > span:nth-of-type(2) {
  margin-top: 4px;
  color: #747474;
}
.lessmonery {
  margin-left: 30px;
  font-size: 12px;
  width: 60px;
  height: 30px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  background-color: orange;
  color: white;
  justify-content: center;
  border-radius: 20px;
}
.compayName {
  margin-left: 4%;
   overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
  width: 100px;
  font-size: 14px;
  font-weight: bold;
  color: #747474;
}
.lessmoneryNo {
  margin-left: 30px;
  font-size: 12px;
  background-color: rgb(255, 94, 0);
  color: white;
  width: 60px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 20px;
}
.lessmonerysuc {
  margin-left: 30px;
  font-size: 12px;
  // background-color: rgb(0, 255, 85);
  color: white;
  width: 60px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 20px;
}
.lessdivsuc{
  background-color:#999966 !important;
}
.MonthList > .MonthList-body {
  // border: 1px solid #000;
  margin-top: 130px;
}
.lessmoneryNo-span > span {
  display: block;
}
.lastMoney-span > span {
  color: #747474;
}
.MonthList-body-title > div:nth-of-type(2) {
  // border: 1px solid #000;
  width: 80px;
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
}
.changemoreis {
  width: 100%;
  height: 60px;
}
.clickload {
  width: 100%;
  height: 30px;
  color: #747474;
}
.loadnext{
  color:#afa7a7;
  display:block;
  margin-top: 10px;
}
.list-active{
  background-color: #e8e8e8;
}
</style>
