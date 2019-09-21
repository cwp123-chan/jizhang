<template>
   <div class="myAccounts">
        <div class="top-total">
            <div><span>净资产</span></div>
            <div><span>{{cleanMoney}}</span></div>
            <div><span>负债:</span><span>{{outMoney}}</span><span>总资产:</span><span>{{totalMoney}}</span></div>
        </div>
        <div class="body-total">
            <span>账户</span>
        </div>
        <div class="list-total">
                <div >
                    <van-swipe-cell :on-close="onClose" v-for = "item in items"  :key = 'item.id' class="div-key" :name="item.id">
                        
                        <van-cell :border="false" :title="item.name" :value="item.balance"  />

                        <template slot="right">
                            <van-button square type="danger" text="删除" />                            
                        </template>
                        <template slot="left">
                            <van-button square type="primary" text="修改" />
                        </template>
                    </van-swipe-cell>
                </div>

        </div>            
        <router-link to="/addAccount"><button class="addCreate" @click="addNewAccount" >添加新的账户类型</button></router-link>
        <router-view></router-view>

   </div>
</template>

<script type="text/ecmascript-6">
import  swipeCell from '../mySelf/swipe-cell'
 const axios = require('axios');
 import { Dialog } from 'vant';
 import qs from 'qs';

export default {
   name: '',
   data() {
       return {
           items:{},
           cleanMoney:0,
           outMoney:0,
           totalMoney:0
       }
   },
  components: {
      swipeCell
  },
  methods:{
      addNewAccount:function(){
      },
      localAccount:function(){
        //   console.log(localStorage,localStorage.token)
          axios.post('http://jizhang-api-dev.it266.com/api/account?token='+localStorage.token)
          .then((res)=>{
              this.items = res.data.data
              for(var i = 0 ; i<this.items.length;i++){
                var data = res.data.data[i].balance.split('.')[0]
                parseFloat(data);
                this.totalMoney += parseFloat(data)
              }
              this.totalMoney = this.totalMoney+'.00'

          })
      },
      // clickPosition 表示关闭时点击的位置
        onClose(clickPosition, instance) {
        switch (clickPosition) {
            case 'left':
            case 'cell':
                Dialog.confirm({
                message: '修改?'
            }).then(()=>{
                localStorage.setItem('AccountItemId',instance._props.name)
                console.log(localStorage.AccountItemId)
                this.$router.push('/editAccount')
            }).catch(()=>{

            });
            break;
            case 'outside':
            instance.close();
            break;
            case 'right':
            Dialog.confirm({
                message: '确定删除吗？'
            }).then(() => {
                console.log(instance._props.name)
                axios.post('http://jizhang-api-dev.it266.com/api/account/delete?id='+instance._props.name+'&token='+localStorage.token)
                .then((res)=>{
                    console.log(res)
                    if(res.data.code == 0){
                        axios.post('http://jizhang-api-dev.it266.com/api/account?token='+localStorage.token)
                            .then((res)=>{
                                this.items = res.data.data
                                for(var i = 0 ; i<this.items.length;i++){
                                    var data = res.data.data[i].balance.split('.')[0]
                                    parseFloat(data);
                                    this.totalMoney += parseFloat(data)
                                }
                                this.totalMoney = this.totalMoney+'.00'
                                 Toast('删除成功');
                            })
                    }
                })
                instance.close();


            }).catch(()=>{
                
            });
            break;
        }
        }
  },
  mounted(){
      this.localAccount()
  }
      
      
      
  }

</script>

<style lang="less">
.myAccounts{
    position:absolute;
    top:50px;
    width:100%;
    height:140px;
    margin-top:-50px;
    background-color: rgb(251, 227, 183);
}
.top-total{
    width:100%;
}
.top-total{
    
    color:#747474;
    font-size: 16px;
    margin-left: -35%;
}
.top-total>div:nth-of-type(1){
    margin-top: 50px;
    margin-left: -5%;

}
.top-total>div:nth-of-type(2){
    margin-top: 10px;
    margin-left: -10%;

}
.top-total>div:nth-of-type(3){
    display:flex;
    margin-top: 10px;
    justify-content: flex-end;
    align-items: center;
    margin-left: -50%;
}
.top-total>div:nth-of-type(3)>span{
    margin-left: 3%;
}
.body-total{
    display:flex;
    padding-left: 10px;
    align-items: center;
    color:#747474;
    width:97.5%;
    height:30px;
    margin-top: 10px;
    background-color: #e8e8e8;
}

.van-cell--borderless>.van-cell__title{
    margin-left: -90px;
}
.van-cell{
    border-bottom: .5px solid #e8e8e8;
}
.addCreate{
    width: 200px;
    height: 50px;
    border-radius: 25px;
    color: white;
    font-size: 20px;
    border-style: none;
    background-color: orange;
    margin-top: 40px;
}
</style>

