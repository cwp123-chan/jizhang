<template>
   <div class="myself-regester">
        <div class="header-title">
            <span>新用户注册</span>
        </div>
        <div class="myself-regester-input">
        <ressester-input>
            <ressester-lnput-item slot="mobile-title" keys="mobile">   
                <span slot="md-title" >请输入手机号:</span>
                <input type="text" v-model="mobileNum" class="md-input-bd" >
            </ressester-lnput-item>
        </ressester-input>
        </div>
        <div class="myself-regester-input">
        <ressester-input>
            <ressester-lnput-item slot="mobile-title" keys="pwd">   
                <span slot="md-title" >请输入密码:</span>
                <input type="password" v-model="pwd" class="md-input-bd" >
            </ressester-lnput-item>
        </ressester-input>
        </div>
        <div class="myself-regester-input">
        <ressester-input>
            <ressester-lnput-item slot="mobile-title" keys="yzm">   
                <span slot="md-title">请输入验证码:</span>
                <input type="text" class="md-input-bd" v-model = "infoNum">
            </ressester-lnput-item>
        </ressester-input>
        </div>
        <div class="myself-regester-input">
        <ressester-input>
            <ressester-lnput-item slot="mobile-title" keys="pyz">   
                <span slot="md-title">请输入图形验证码:</span>
                <input type="text" class="md-input-bd3" v-model = "picyzm">
            </ressester-lnput-item>
        </ressester-input>
        </div>
        <div class="myself-regester-input">
        <ressester-input>
            <ressester-lnput-item slot="mobile-title" keys="pic"> 
                <div class="mobile-picYzm" slot="md-title"><button @click="getSrc">获取验证码</button></div>
                <div class="mobile-btn" ><img :src="src" alt=""></div>
            </ressester-lnput-item>
        </ressester-input>
        </div>
        <div class="regester-button">
            <button @click="pushData">获取短信验证码</button>
            <button @click="regester">注册</button>
            <!-- <button @click="sa"></button> -->
        </div>
   </div>
</template>

<script type="text/ecmascript-6">
 import qs from 'qs';
 const axios = require('axios');
 import { Dialog } from 'vant';
 import regester from '../mySelf/regester'
import ressesterInput from '../mySelf/ressesterInput'
import ressesterLnputItem from '../mySelf/ressesterLnput-item'
export default {
   name: '',
   data() {
       return {
           src:'',
           key:'',
           mobileNum:'',
           picyzm:'',
           infoNum:'',
           pwd:''
       }
   },
  components: {
      ressesterInput,
      ressesterLnputItem,
      regester
  },methods:{
      getSrc(){
            axios.get('http://jizhang-api-dev.it266.com/api/captcha')
                .then((res)=>{
                    // console.log(res.data.data.key)
                        this.src = res.data.data.url
                        // console.log(this.src)
                        this.key = res.data.data.key
            })
          
      },
       pushData(){

                axios.post('http://jizhang-api-dev.it266.com/api/sms/verify',qs.stringify({
                        mobile:this.mobileNum,
                        captcha_code:this.picyzm,
                        captcha_key:this.key
                    }))
                    .then((response)=>{
                        console.log(response)
                        if(response.data.code == '0'){
                            Dialog({ message: '发送成功,验证码为'+response.data.data });
                            
                            // console.log(response.data)
                        }else{
                            Dialog({ message: '发送失败,请检查手机号是否正确' });

                        }
                    })
                    .catch(()=>{
                        Dialog({ message: '手机格式不正确' });
                    });

            
         
      },
      regester(){
          axios.post('http://jizhang-api-dev.it266.com/api/user/register',qs.stringify({
              mobile:this.mobileNum,
              password:this.pwd,
              verify :this.infoNum
              
          }))
          .then((response)=>{
                // console.log(response)
                    // console.log(response.data.code)

                if(response.data.code == '-1' && response.data.data == '手机格式不正确'){
                        Dialog({ message: '手机格式不正确' });    
                }else if(response.data.code == '-1' && response.data.data == '验证码不正确'){
                        Dialog({ message: '验证码不正确' });
                    
                }else if(response.data.code == '0'){
                    Dialog.confirm({
                        // title: '标题',
                        message: '注册成功,是否前往登录?'
                        }).then(() => {
                        this.$emit('sonInfos','change')
                        // on confirm
                        // console.log('yes')
                        }).catch(() => {
                       
                        });
                }else{
                    Dialog.confirm({
                        // title: '标题',
                        message: '手机号已被注册,是否前往登录?'
                        }).then(() => {
                        this.$emit('sonInfos','change')
                        // on confirm
                        // console.log('yes')
                        }).catch(() => {
                        
                        });
                }
            });

               
      }
      
    //   sa:function(){
    //     //   console.log('触发')
         
    //   }
  },
  mounted(){
      this.getSrc()
  }
}
</script>

<style lang="less">
.myself-regester{
    width:100%;
    display:flex;
    justify-content: center;
    flex-wrap: wrap;
}
.header-title{
    height: 30px;
    font-size: 32px;
    color:#4d4a4a;
    font-weight: bold;
    margin-top: 100px;
}
.myself-regester-input{
    width:120%;
    height: 30px;
    display:flex;
    font-size: 18px;
    color:rgb(129, 127, 127);
    margin-top: 50px;
}
.md-input-bd{
    border: none;
    width:50%;
    margin-left: -84px;
}
.md-input-bd3{
    border: none;
    margin-left: -30px;
    width:50%;
}
.mobile-picYzm{
    display:block;
    // border: 1px solid #000;
    width: 160px;
    margin-left:5%;
    
    height:60px;
}
.mobile-btn{
    // border: 1px solid #000;
    margin-left: 40px;
    height:40px;
    margin-top: -10px;
    width: 120px;


}
.mobile-btn>img{
    margin-top: 5px;
}
.regester-button{
    width:350px;
    display:flex;
    // border: 1px solid #000;
    justify-content: space-between;
    margin-top: 40px;
}
.regester-button>button:nth-of-type(1){
    width:150px;
    border-style:none;
    background-color:rgb(253, 169, 13);
    color: white;
    font-weight: bold;
    letter-spacing:3px;
    height:40px;
}
.regester-button>button:nth-of-type(2){
    width:150px;
    height:40px;
    background-color:rgb(253, 169, 13);
    border-style:none;
    color: white;
    font-weight: bold;
    font-size: 20px;
    letter-spacing:1em;
    padding-left: 10%;
    
    // border: 1px solid #000;

}
.myself-regester .md-input-bd{
    background-color:rgba(199, 235, 220, 0);
}

.myself-regester .md-input-bd3{
    background-color:rgba(199, 235, 220, 0);
}
</style>
