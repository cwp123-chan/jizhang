<template>
  <div class="balance-body">
    <div class="Balance-body-div">
        <div class="Balance-body-data"  slot="balanceTop">
        <span>账面收支 {{data}} 月</span>
        <span>金额</span>
        </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
    props:['data','inMoney'],
  name: "",
  data() {
    return {
    };
  },
  created() {
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
