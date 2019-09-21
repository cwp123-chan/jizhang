<template>
   <div class="inMoneyList">
       <div class="inMoneyList-fixed">
            <div class="inMoneyList-title">
                <span>收支明细</span>
                
            </div>
            <div class="inMoneyList-title-btn">
                <van-button plain type="primary" color="orange" @click="MonthList">当月账面</van-button>
                <van-button plain type="primary" color="orange" @click="QuarterList">季度账面</van-button>
                <van-button plain type="primary" color="orange" @click="YearList">年度账面</van-button>
            </div>
       </div>
       <div>
           <router-view></router-view>
       </div>
   </div>
</template>

<script type="text/ecmascript-6">
export default {
   name: '',
   data() {
       return {}
   },
  components: {},
  methods:{
      MonthList:function(){
          this.$router.push('/MonthList')
      },
      QuarterList:function(){
          this.$router.push('/QuarterList')
      },
      YearList:function(){
          this.$router.push('/YearList')

      }
  }
}
</script>

<style lang="less">
.inMoneyList-title{
    display:flex;

    justify-content: center;
    // align-items: center;
    padding-top: 20px;
    font-size: 18px;
    color:white;
    width:100%;
    height:100px;
    background-color: orange;
}
.inMoneyList-title>span{
    display:block;
    display: flex;
    justify-content:center;
    align-items: center;
    width:30%;
    border-radius: 20px;
    height:35px;
    // border: 1px solid white;
}
.inMoneyList-title-btn{
    // position:absolute;
    display: flex;
    margin-top: -50px;
    justify-content: space-between;
    width:100%;
    height:60px;
    // align-items: center;
}
.inMoneyList-fixed{
    position:fixed;
    top:0px;
    width:100%;
}
</style>
