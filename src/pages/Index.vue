<template>
   <div class="index">
       <index-top-bgc>
           <index-top-btn>
              <a  slot="bintu" :style = "recColor"><van-icon name="clock-o" @click="changeRec"></van-icon></a>
              <a  slot="xianz" :style = "redColor"><van-icon name="chart-trending-o" @click="changeRed"></van-icon></a>
           </index-top-btn>
       </index-top-bgc>
        <div class="index-rad-bgc-div" v-if="redChange">
            <index-rad-bgc >  
                <!-- 总数消费为0时 -->
                <v-chart :forceFit="true" height="320" :data="data" v-if = "change">
                    <v-tooltip :showTitle="false"></v-tooltip>
                    <!-- <v-legend dataKey="type"></v-legend> -->
                    <v-coord type="theta" innerRadius="0.75"></v-coord>
                    <v-pie position="value" color="type" shape="sliceShape"></v-pie>
                </v-chart>
                <rad-bgc-doub v-if = "changeDoub" >
                    
                </rad-bgc-doub> 
                <div class="all-count">
                    <span v-if = "change">支出: &yen; {{total}}</span>
                </div>
                    <button class="all-refresh" @click = 'changeFr'>
                        <van-icon name="exchange" />
                    </button>

                <!-- 消费为有时 -->
                               
            </index-rad-bgc>        
        </div>
        <div class="index-rec-bgc-div" v-if="recChange">
        <index-rec-bgc>
            <div class="index-rec-list">
            <index-rec-bgc-list>

            </index-rec-bgc-list>
            </div>
        </index-rec-bgc>
        </div>
        <div class="index-max-body">
            <index-body></index-body>
        </div>
        
   </div>
</template>

<script type="text/ecmascript-6">
import indexTopBgc from '../components/index-bg/index-top-bgc'
import indexRadBgc from '../components/index-bg/index-rad-bgc'
import indexTopBtn from '../components/index-bg/index-top-btn'
import indexRecBgc from '../components/index-bg/index-rec-bgc'
import indexRecBgcList from '../components/index-bg/index-rec-bgc-list'
import radBgcDoub from '../components/index-bg/rad-bgc-doub'
import qs from 'qs';
const axios = require('axios');
import { Dialog } from 'vant';
import { Toast } from 'vant';
import moment from "moment"
import indexBody from '../components/index-bg/index-body'


const data = [];

// 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值
const sliceNumber = 0.01;
var i = 0;
export default {
   components: {
    indexTopBgc,
    indexRadBgc,
    indexTopBtn,
    indexRecBgc,
    indexRecBgcList,
    radBgcDoub,
    indexBody

  },       
   data() {
    return {
        data: data,
        total:10,
        recChange:false,
        redChange:true,
        recColor:{
            
        },
        redColor:{

        },
        change:true,
        changeDoub:false,
        i:0
    };
  },
  methods:{
      changeRed(){
          this.recChange = true;
          this.redChange = false;
          this.recColor = {
              color:'white',
              backgroundColor:'orange'
          }
          this.redColor = {
                color:'orange',
                backgroundColor:'white'
            }
        //  console.log(this);
      },
      changeRec(){
          this.recChange = false;
          this.redChange = true;
          this.recColor = {
                color:'orange',
                backgroundColor:'white'
            }
            this.redColor = {
                color:'white',
                backgroundColor:'orange'
            }
      },
      changeFr(){
          if(i%2 == 0){
            this.change = false     
            this.changeDoub = true  
            // console.log('第一'+i) 
            i++
          }else if(i%2 == 1){
              this.change = true     
            this.changeDoub = false 
            // console.log('第二'+i) 
            i++

          }
               
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
                    this.total = res.data.data.out
            for(var i = 0;i<res.data.data.list.length;i++){
                if(res.data.data.list[i].type == '2'){
                    // console.log(res.data.data.list[i])
                    var lessmoney = Number(res.data.data.list[i].total_money.split('.')[0])
                    resData[j] = {type:res.data.data.list[i].company_name,value:lessmoney}
                    j++;
                }
            }
                    this.data = Array.prototype.slice.call(resData)   
                    // console.log(this.data)  
                    // for(var k = 0; k<this.data.length;k++){
                        // this.total += Number(this.data[k].value)
                    // }       
        })
      }
      
  },
  mounted(){
      this.getTheAllData()
  }
};


  
</script>

<style lang="less">
.generate-columns(30);
.generate-columns(@n, @i: 1) when (@i =< @n) {
  #canvas_@{i} {
    margin-top: -35px;
    position:absolute;
    left:0%;
  }
  .generate-columns(@n, (@i + 1));
}
.g2-tooltip{
    z-index:10000 !important;
}

.index-rec-list{
    .generate-columns(30);
    .generate-columns(@n, @i: 1) when (@i =< @n) {
    #canvas_@{i} {
        margin-top: -130px;
        // border: 1px solid #000;
        position:absolute;
        left:0%;
    }
    .generate-columns(@n, (@i + 1));
}
}

.index-rad-bgc-div{
    display:flex;
    justify-content: center;
    width:90%;
}

.index-rec-bgc-div{
    display:flex;
    justify-content: center;
    // border: 1px solid #000;
    margin-top: -30px;
    width:92%;
}
.all-count{
    position:absolute;
    left:50%;
    z-index:1000;
    width: 40%;
    // display: flex;
    // border: 1px solid #000;
    height: 100px;
    font-size: 20px;
    font-weight: bold;
    color:rgb(187, 181, 181);
    
}
.all-count>span{
    display: block;
    margin-top: 0% !important;
}
.all-refresh{
    position: absolute;
    z-index: 9999;
    color:orange;
    margin-top: 29%;
    margin-left: -4%;
    border-style:none;
    background-color: #fff;
    font-size: 25px;
    // border: 1px solid #000;
}
.index-max-body{
    position:absolute;
    width:100%;
    margin-top: -10px;
}


</style>
