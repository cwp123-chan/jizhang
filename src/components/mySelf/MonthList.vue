<template>
   <div class="MonthList">
            <back-item></back-item>

       <div class="MonthList-body">
            <div class="MonthList-header">
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
           <div class="MonthList-body-more">
                <div class="MonthList-body-title" v-for = "item in paidName" :key = "item.id" @click="getMoreList(item)">
                        <div class="title-style">
                            <span class="compayName" v-if = "item.company_name != ''">{{item.company_name}}</span>
                            <span class="compayName" v-else-if =  "item.company_name === ''" >暂无</span>
                            
                            <span>{{item.updated_at}}</span>
                             &nbsp;
                            &nbsp;
                            <div class="lessmonery" v-if = "item.lessMoney == '0'">
                                <span >
                                    暂无欠款
                                </span>
                            </div>
                            <div class="lessmoneryNo" v-else-if = "item.lessMoney !== '0' && item.type == '2'">
                                <span class="lessmoneryNo-span">
                                    <span>欠款</span><span>{{item.lessMoney}}</span>
                                </span>
                            </div>
                            <div class="lessmonerysuc" v-else-if = "item.lessMoney !== '0' && item.type == '1'">
                                <span class="lessmoneryNo-span">
                                    <span>待收</span><span>{{item.lessMoney}}</span>
                                </span>
                            </div>
                           
                            

                            
                        </div>
                        
                        <div class="lastMoney-span">
                            <span v-if = "item.type == '1'">
                                +{{item.total_money}}
                                <van-icon name="arrow" />
                            </span>
                            <span v-if = "item.type == '2'">
                                -{{item.total_money}}
                                <van-icon name="arrow" />
                            </span>
                    </div>
                    
                </div>
           </div>
       </div>
       <div class="changemoreis">

       </div>
   </div>
</template>

<script type="text/ecmascript-6">
import qs from 'qs';
const axios = require('axios');
import { Dialog } from 'vant';
import backItem from '../Button/Back'
import { Toast } from 'vant';
import moment from "moment"
export default {
   name: '',
   data() {
       return {
           begindata:'',
           enddata:'',
           inMoney:0,
           outMoney:0,
           morMoney:0,
           paidName:[]
       }
   },
  components: {
      backItem
  },
  methods:{
      getData:function(){
          axios.get('http://jizhang-api-dev.it266.com/api/record/account?token='+localStorage.token,{
              params:{
              }
          })
          .then((res)=>{
            //   console.log(res)
              this.inMoney = res.data.data.in
              this.outMoney = res.data.data.out
              this.morMoney = this.inMoney-this.outMoney
              var data = new Date()
              let str = moment(data).format("YYYY-MM-DD")
              this.enddata = str;
              let endstr = moment(data).format("YYYY-MM")
              this.begindata = endstr+'-01'
              this.paidName = res.data.data.list
              for(var i = 0; i<this.paidName.length; i++){
                  this.paidName[i].lessMoney = Number(res.data.data.list[i].total_money.split('.')[0]) - Number(res.data.data.list[i].paid_money.split('.')[0])
              }
            //   console.log(this.paidName)

          })
      },
      getMoreList(item){
          this.$router.push('/billDetails')
          localStorage.setItem("detailListId",item.id)
          this.$route.params.detialId = item.id
      }
  },
  mounted(){
      this.getData()
  }
}
</script>

<style lang="less">
.MonthList-header{
    margin-top: -10px;
    width:100%;
    height:130px;
    background-color: #fff;
}
.MonthList-header-title{
    width:100%;
    height:40px;
    color: #747474;
    display:flex;
    align-items: center;
}
.MonthList-header-title>span{
    margin-left: 5%;
}
.MonthList-header-bd{
    width:100%;
    height:30px;
    color: #747474;
    display:flex;
    align-items: center;
}
.MonthList-header-bd>span{
    display:block;
    display: flex;
    justify-content: center;
    align-items: center;
    height:100%;
    margin-left: 5%;
    // border: 1px solid #000;
}
.MonthList-header-bd>span:nth-of-type(2){
    margin-left: 35%;

}
.MonthList-body-title{
    margin-top: 10px;
    width:100%;
    height:50px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
}
.MonthList-body-title>div{
    display: flex;
    align-items: center;
}
.MonthList-body-title>div>span{
    display: flex;
    align-items: center;
}
.title-style>span:nth-of-type(1){
    font-weight: bold;
    // font-size: 18px;
    margin-left: 10px;
    color:#747474;
}
.title-style>span:nth-of-type(2){
    margin-top: 4px;
    color:#747474;

}
.lessmonery{
    margin-left: 30px;
    font-size: 12px;
    width: 60px;
    height:30px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    background-color: orange;
    color:white;
    justify-content: center;
    border-radius: 20px;

}
.compayName{
    display:block;
    width:60px;
}
.lessmoneryNo{
    margin-left: 30px;
    font-size: 12px;
    background-color: rgb(255, 94, 0);
    color:white; 
    width: 60px;
    height:30px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap; 
    border-radius: 20px;

}
.lessmonerysuc{
    margin-left: 30px;
    font-size: 12px;
    background-color: rgb(0, 255, 85);
    color:white; 
    width: 60px;
    height:30px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap; 
    border-radius: 20px;
}
.MonthList>.MonthList-body{
    // border: 1px solid #000;
    margin-top: 130px;
}
.lessmoneryNo-span>span{
    display: block;
}
.lastMoney-span>span{
    color: #747474;
}
.MonthList-body-title>div:nth-of-type(2){
    // border: 1px solid #000;
    width:80px;
    display: flex;
    justify-content: flex-end;
    padding-right: 10px;
}
.changemoreis{
width:100%;
  height:60px;
}

</style>
