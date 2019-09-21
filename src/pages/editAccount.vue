<template>
   <div class="addAccountPage">
      <div class="addAccountPage-title">
            <span>修改账户</span>
      </div>
      <van-cell-group>
         <van-field
            v-model="message"
            label="账户昵称"
            type="textarea"
            placeholder="请输入账户昵称"
            rows="1"
            autosize
         />
      </van-cell-group>
      
      <van-dropdown-menu>
         <van-dropdown-item v-model="value1" :options="option1" />
         <van-dropdown-item v-model="value2" :options="option2" />
      </van-dropdown-menu>
      <button class="addAccountPage-btn" @click="addAccountPage">
         提交修改
      </button>
   </div>
</template>

<script type="text/ecmascript-6">
 import qs from 'qs';
 const axios = require('axios');
 import { Toast } from 'vant';
export default {
   name: '',
   data() {
       return {
          value:'',
           value1: 1,
            value2: 'a',
            option1: [
            { text: '现金', value: 1 },
            { text: '银行', value: 2 },
            { text: '支付平台', value: 3 },
            { text: '其他', value: 4 }
            ],
            option2: [
            { text: '升序', value: 'a' },
            { text: '降序', value: 'b' },
            ],
            message:'',
            init:''
       }
   },
  components: {},
  methods:{
     addAccountPage:function(){
        console.log(localStorage.AccountItemId,localStorage.token)
        console.log(this.message)
         axios.post('http://jizhang-api-dev.it266.com/api/account/update?id='+localStorage.AccountItemId+'&token='+localStorage.token,qs.stringify({
                        name:this.message,
                        type:this.value1,
                        remark:'新增',
                        sort:10                        
                    }))
                    .then((res)=>{
                       console.log(res)
                     if(res.data.status === true){
                        this.$router.push('/myAccount')
                        Toast('创建成功');
                     }

                    })
     }
  }

  }

</script>

<style lang="less">
.addAccountPage-title{
   width:100%;
   color:#747474;
   font-size: 24px;
   margin-top: 100px;
   font-weight: bold;
   height:30px;
}

.van-cell-group{
   margin-top: 30px;
}
.addAccountPage-btn{
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
