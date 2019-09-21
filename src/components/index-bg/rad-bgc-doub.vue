<template>
   <div class="rad-bgc-doub" v-if = 'show'>
        <v-chart :forceFit="true" height="320" :data="data" >
            <v-tooltip :showTitle="false"></v-tooltip>
            <!-- <v-legend dataKey="type"></v-legend> -->
            <v-coord type="theta" innerRadius="0.75"></v-coord>
            <v-pie position="value" color="type" shape="sliceShape"></v-pie>
        </v-chart>
        <div class="double-count">
            <span>收入: &yen; {{total}}</span>
            <!-- <div class="double-refresh" @click="changedouRefresh">icon</div> -->
        </div>
   </div>
</template>

<script type="text/ecmascript-6">
import qs from 'qs';
const axios = require('axios');
import { Dialog } from 'vant';
import { Toast } from 'vant';
import moment from "moment"
const data = [];
export default {
   name: '',
   data() {
       return {
        data: data,
        total:0,  
        show:true,
        num:0 
       }
   },
  components: {},
  methods:{
      changedouRefresh(){
        //   this.show = false;
      },
      getTheAllData(){
          var date = new Date();
          var theDate = moment(date).format('YYYY-MM-DD')
        axios.get('http://jizhang-api-dev.it266.com/api/record/account?token='+localStorage.token,{
                    params:{
                        begin_date:"2019-01-01",
                        end_date:theDate
                    }
                })
        .then((res)=>{
            // console.log(res)
                    var resData = [];
                    var j = 0;
            for(var i = 0;i<res.data.data.list.length;i++){
                if(res.data.data.list[i].type == '1'){
                    // console.log(res.data.data.list[i])
                    var lessmoney = Number(res.data.data.list[i].total_money.split('.')[0])
                    resData[j] = {type:res.data.data.list[i].company_name,value:lessmoney}
                    j++;
                }
            }
                    this.data = Array.prototype.slice.call(resData)   
                    // console.log(this.data)  
                    for(var k = 0; k<this.data.length;k++){
                        this.total += Number(this.data[k].value)
                    }       
        })
      }
  },
  mounted(){
      this.getTheAllData()
  }
}
</script>

<style lang="less">

.double-count{
    position:absolute;
    left:50%;
    z-index:1000;
    width: 40%;
    // display: flex;
    height: 100px;
    font-size: 20px;
    font-weight: bold;
    color:rgb(187, 181, 181);
    
}
.double-count>span{
    display: block;
    margin-top: 50% !important;
    margin-left: -100%;

}

.double-refresh{
    color:blue;
    margin-left: -100%;

}
</style>
