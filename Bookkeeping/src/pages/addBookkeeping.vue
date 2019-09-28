<template>
   <div class="addBookkeeping">

       <div class="topBgc">
            <!-- <back-item></back-item> -->
            <div >
                <div @click="gobackicon" class="gobackicon">
                    返回
                </div>
            </div>

           <div class="topBgc-firstDiv">
                   <div class="topBgc-firstDiv-left" :style = "leftStyle" color="#ec5959" @click="changeLeft">
               <router-link to="/inBookkeep" :style = "leftStyle">
                        <span>
                            收入
                        </span>
               </router-link>
                   </div>
                    <div class="topBgc-firstDiv-right" :style = "rightStyle" @click="changeRight">
               <router-link to="outBookkeep" :style = "rightStyle">
                        <span>支出</span>
               </router-link>

                    </div>
           </div>
            <van-button plain type="primary" size="small" color="#ec5959" @click="createBookkeep">新增</van-button>

       </div>
       <router-view></router-view>
   </div>

</template>

<script type="text/ecmascript-6">
 import backItem from "../components/Button/Back";

 import qs from 'qs';
 const axios = require('axios');
 import { Toast } from 'vant';

export default {
   name: '',
   data() {
       return {
           leftStyle:{
               color:'#ec5959',
               backgroundColor:'white'
           },
           rightStyle:{

           }
       }
   },
  components: {
      backItem
  },
  methods:{
      
      changeLeft:function(){
          this.leftStyle = {
              color:'#ec5959',
              backgroundColor:'white'
          };
          this.rightStyle = {
              // 改变样式为空
          }
      },
      changeRight:function(){
          this.leftStyle = {
            //   改变样式为空
          };
          this.rightStyle = {
              color:'#ec5959',
              backgroundColor:'white'
          }
      },
      gobackicon(){
          this.$router.go('-1')
      },
      createBookkeep:function(){
          this.$router.push('/createBookkeepingM')
      }
  }
}
</script>

<style lang="less">
.addBookkeeping{
    width: 100%;
}
.topBgc{
    width:100%;
    height:100px;
    // background-color: orange;
  background-color: rgb(236, 89, 89);

    display:flex;
    justify-content: center;
    align-items: center;
}
.topBgc-firstDiv{
    display:flex;
    width:30%;
    height: 33px;
    border-radius: 20px;
    border: 1px solid white;
    margin-left: -10%;
}

.topBgc-firstDiv-left{
    display:flex;
    justify-content: center;
    align-items: center;
    color:white ;
    font-weight: bold;
    width: 49%;
    border-right: 1px solid white;
    height: 33px;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;

}
.topBgc-firstDiv-right{
    display:flex;
    justify-content: center;
    align-items: center;
    color:white;
    font-weight: bold;
    width: 49%;
    border-left: 1px solid white;
    height: 33px;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;

}
a{
    color:white;
}
.topBgc>.van-button--primary{
    position:absolute;
    left:80%;
    border: 1px solid white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    border-radius: 30px;
}
.topBgc .van-tag--mark{
width: 11% !important;
  border-radius: 20px !important;
  height: 22px !important;
  display: flex !important;
  justify-content: center;
  align-items: center;
  top: 35px !important;
  background-color: #fff !important;
  color: #ec5959 !important;
  font-size: 14px !important;
  font-weight: bold !important;
  left: 4%;
}
.gobackicon{
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
    width:190%;
    height:25px;
    background-color: #fff;
    border: 1px solid white;
    color:#ec5959;
    font-weight: bold;
    margin-left: -400%;
}

</style>
