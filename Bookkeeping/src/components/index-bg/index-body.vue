<template>
  <div class="MonthList">
    <div class="MonthList-body" id="scrollWrap" v-if="changeisshow">
      <div class="MonthList-body-more">
        <div
          :class="['MonthList-body-title',{ 'list-active' : item.id === listactive}]"
          v-for="item in paidName"
          :key="item.id"
          @click="getMoreList(item)"
        >
          <all-list-item :item="item">
            <slot name="allListItem"></slot>
          </all-list-item>
          <all-list-item-type :item="item">
            <slot name="allListItemType"></slot>
          </all-list-item-type>
        </div>
      </div>
      <div v-if="nextshow">
        <span class="loadnext">加载下一页</span>
      </div>
      <div>
        <van-loading type="spinner" v-if="loadshow" />
      </div>
      <div v-if="nonextshow">
        <span class="loadnext">没有更多数据</span>
      </div>
    </div>
    <div>
        <button class="gotupush" v-if="changeshow" @click = "gotupush">
          暂无内容 记一笔
        </button>
      </div>
    <div class="nopagein" v-if="changeshow">
      
      <div>
        <img src="../../assets/123.png" alt />
      </div>
    </div>

    <div class="changemoreis"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import qs from "qs";
const axios = require("axios");
import { Dialog } from "vant";
import { Toast } from "vant";
import moment from "moment";
import apiConfig from "../../router/httpConfig";
import allListItem from "../Balance/allListItem";
import allListItemType from "../Balance/allListItemType";

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
      currentPage: 1,
      itemsPerPage: 8,
      totalItems: "",
      newPaidName: [],
      showpages: 3,
      pageArr: [],
      nextshow: true,
      nonextshow: false,
      loadshow: false,
      changeshow: false,
      changeisshow: true,
      y: 1
    };
  },
  components: {
        allListItem,
    allListItemType
  },
  methods: {
    handleScroll(e) {
      let scrollTop;
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
      } else if (document.body) {
        scrollTop = document.body.scrollTop; // 获取 滚动条距顶部高度
      }

      var docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      // 获取文档所有数据高度
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      // 获取不同设备页面可视高度
      // console.log(scrollTop,clientHeight,docHeight,scrollTop+ clientHeight)

      if (scrollTop + clientHeight - docHeight >-10 && scrollTop + clientHeight - docHeight<10) {
        // Toast.loading({
        //   mask: true,
        //   message: "加载中,请稍等..."
        // });

        this.nextshow = false;
        this.nonextshow = false;
        this.loadshow = true;
        this.y++;
        var data = new Date();
        let endstr = moment(data).format("YYYY-MM");
        let theYear = moment(data).format("YYYY");
        this.begindata = theYear + "-01-01";
        this.enddata = theYear + "-12-31";

        axios
          .get(
            apiConfig.AccountingDetailList + "?token=" + localStorage.token,
            {
              params: {
                begin_date: this.begindata,
                end_date: this.enddata,
                page: this.y
              }
            }
          )
          .then(res => {
            if (res.data.data.list.length == 0) {
              // Toast.loading({
              //   mask: true,
              //   message: "暂无更多数据",
              //   duration: "1"
              // });
              this.nextshow = false;
              this.nonextshow = true;
              this.loadshow = false;
              return false;
            } else {
              //   console.log(res)
              this.inMoney = res.data.data.in;
              this.outMoney = res.data.data.out;
              this.morMoney = this.inMoney - this.outMoney;
              let leng = this.paidName.length;
              this.paidName = this.paidName.concat(res.data.data.list);
              // console.log(res.data.data.list)

              for (var i = leng; i < this.paidName.length; i++) {
                this.paidName[i].lessMoney =
                  Number(this.paidName[i].total_money.split(".")[0]) -
                  Number(this.paidName[i].paid_money.split(".")[0]);
                // console.log(i,this.paidName[i].total_money-this.paidName[i].paid_money)
              }

              this.nextshow = true;
              this.nonextshow = false;
              this.loadshow = false;
            }
          });
      }
    },
    gotupush(){
      this.$router.push('/createBookkeepingM')
    },

    getData: function() {
      Toast.loading({
        mask: false,
        message: "加载中,请稍等...",
        duration: "toast"
      });

      var data = new Date();
      let endstr = moment(data).format("YYYY-MM");
      let theYear = moment(data).format("YYYY");
      this.begindata = theYear + "-01-01";
      this.enddata = theYear + "-12-31";

      axios
        .get(apiConfig.AccountingDetailList + "?token=" + localStorage.token, {
          params: {
            begin_date: this.begindata,
            end_date: this.enddata
          }
        })
        .then(res => {
          // console.log(res);
          if (res.data.data.list.length == 0) {
            this.changeshow = true;
            this.changeisshow = false;
            Toast.loading({
              mask: false,
              message: "加载中,请稍等...",
              duration: "1"
            });
            return false;
          } else {
            this.inMoney = res.data.data.in;
            this.outMoney = res.data.data.out;
            this.morMoney = this.inMoney - this.outMoney;
            this.paidName = res.data.data.list;
            for (var i = 0; i < this.paidName.length; i++) {
              this.paidName[i].lessMoney =
                Number(this.paidName[i].total_money.split(".")[0]) -
                Number(this.paidName[i].paid_money.split(".")[0]);
            }
            Toast.loading({
              mask: false,
              message: "加载中,请稍等...",
              duration: "1"
            });
          }
        })
        .catch((res)=>{
          Toast.loading({
              mask: false,
              message: "加载中,请稍等...",
              duration: "1"
            });
        })
    },
    getMoreList(item) {
      // console.log(localStorage.detialId)
    localStorage.setItem("detailListId", item.id);
      this.$route.params.detialId = item.id;
      this.listactive = item.id
      setTimeout(()=>{
      this.$router.push("/billDetails");
      },20)
    },
    changePage() {
      this.newPaidName = this.pageArr[this.currentPage - 1];
    }
  },
  mounted() {
    this.getData();
    window.addEventListener("scroll", this.handleScroll, true);
  }
};
</script>

<style lang="less">
.MonthList-header {
  margin-top: -10px;
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
  // display: block;
  overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
  width: 100px;
  font-size: 15px;
  font-weight: bold;
  color: #747474;

  // border: 1px solid #000;
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
.lessdivsuc {
  background-color: rgb(153, 153, 102) !important;
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
.nopagein{
  margin-top: 40px;
  margin-left: 10%;
}
.gotupush{
  margin-left: -10%;
  margin-top: 190px;
  margin-left: 0%;
  width:200px;
  color:white;
  height:30px;
  border-style: none;
  background-color: #ec5959;
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

