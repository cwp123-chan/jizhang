<template>
   <div class="Balance">
      <Balance-index>

      </Balance-index>
      <div class="Balance-body">
         <div >
            <div class="Balance-body-div">
               <div class="Balance-body-data">
                  <span>账面收支 {{data}} 月</span>
                  <span>金额</span>
               </div>
            </div>
            <div class="Balance-body-data-div" @click="inMoneyfunc">
               <div class="Balance-body-list">
                  <div>账面收入</div>
                  <div class="Balance-body-icon">{{inMoney}} 
                  <van-icon name="arrow" />
                  </div>
               </div>
            </div>
            <van-divider />
            <div class="Balance-body-data-div"  @click="outMoneyfunc">
               <div class="Balance-body-list">
                  <div>账面支出</div>
                  <div class="Balance-body-icon">{{outMoney}} 
                  <van-icon name="arrow" />
                  </div>
               </div>
            </div>
            <van-divider />
            <div class="Balance-body-data-div"  @click="morMoneyfunc">
               <div class="Balance-body-list">
                  <div>账面利润</div>
                  <div class="Balance-body-icon">{{morMoney}} 
                  <van-icon name="arrow" />
                  </div>
               </div>
            </div>
            <van-divider />
         </div>         
      </div>   
       <div class="Balance-body">
         <div >
            <div class="Balance-body-div">
               <div class="Balance-body-data">
                  <span>待收/待付</span>
               </div>
            </div>
            <div class="Balance-body-data-div">
               <div class="Balance-body-list">
                  <div class="Balance-body-icon">
                  <van-icon name="card" size="25px" color="green" />                    
                     &nbsp;代收款
                  </div>
                  <div class="Balance-body-icon">{{loginMoney}} 
                  <van-icon name="arrow" />
                  </div>
               </div>
            </div>
            <van-divider />
            <div class="Balance-body-data-div">
               <div class="Balance-body-list">
                  <div class="Balance-body-icon" >
                  <van-icon name="gold-coin" size="25px" color="green" />
                     &nbsp;待付款
                  </div>
                  <div class="Balance-body-icon">{{paidMoney}} 
                  <van-icon name="arrow" />
                  </div>
               </div>
            </div>
            <van-divider />
         </div>            
      </div>  
            <back-item></back-item>

      <!-- <button class="Balance-footer-btn-list">记一笔</button> -->
   </div>
</template>

<script type="text/ecmascript-6">
import BalanceIndex from '../components/Balance/Balance-index'
import balanceIndexItem from '../components/Balance/balance-index-item'
import backItem from '../components/Button/Back'
 import qs from 'qs';
 const axios = require('axios');
 import { Toast } from 'vant';
export default {
   name: '',
   data() {
       return {
          activeName: '1',
          beginData:'',
          endData:'',
          inMoney:0,
          outMoney:0,
          morMoney:0,
          data:'',
          paidMoney:0,
          loginMoney:0
       }
   },
  components: {
     BalanceIndex,
     backItem
  },
  methods:{
     getData(){
         axios.get('http://jizhang-api-dev.it266.com/api/record/account?token='+localStorage.token,{
              params:{
              }
          })
        .then((res)=>{
         //   console.log(res)
           var newdata = res.data.data.list[0].date.split('-')
           this.data = newdata[0]+'-'+newdata[1]
         //   type为1
            // console.log(res.data.data.list[i].type)
               // 获取收入
               var indata = res.data.data.in
               this.inMoney = indata
               var outdata = res.data.data.out
               this.outMoney = outdata
               this.morMoney = this.inMoney-this.outMoney
        })

         axios.get('http://jizhang-api-dev.it266.com/api/record/account/waiting?token='+localStorage.token,{
              params:{
                 type:'1'
              }
          })
          .then((res)=>{
               this.paidMoney = res.data.data.total             
          })

          axios.get('http://jizhang-api-dev.it266.com/api/record/account/waiting?token='+localStorage.token,{
              params:{
                 type:'2'
              }
          })
          .then((res)=>{
             this.loginMoney = res.data.data.total 
          })

     },
     inMoneyfunc:function(){
        this.$router.push('/inMoneyList')
     },
     outMoneyfunc:function(){
        this.$router.push('/inMoneyList')
     },
     morMoneyfunc:function(){
        this.$router.push('/inMoneyList')
     }
  },
  mounted(){
     this.getData()
  }
}
</script>

<style lang="less">

.Balance-body-data{   
   display:flex;
   justify-content: space-between;
   width:90%;
   color:#747474;
   font-size: 12px;
   margin-top: 3px;

}
.Balance-body-div{
   display: flex;
   justify-content: center;
   height:25px;
}
.Balance-body-list{
   display:flex;
   justify-content: space-between;
   align-items: center;
   width:90%;
   color: #747474;
   font-weight: bold;
   // font-family: '黑体';
   // border-top: 1px solid #000;
   height:45px;
}
.van-divider{
   margin:0px !important;
}
.Balance-body-data-div{
   display:flex;
   justify-content: center;
   background-color: #fff;
}
.Balance-body-icon{
   display:flex;

}
.Balance-footer-btn-list{
   width:70%;
   height:40px;
   border-style:none;
   background-color: rgb(103, 185, 103);
   border-radius: 10px;
   margin-top: 30px;
   color:white;
   font-size: 20px;
   font-weight: bold;
}

</style>
