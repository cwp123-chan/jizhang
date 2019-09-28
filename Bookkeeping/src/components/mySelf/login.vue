<template>
   <div class="login-bgcolor" :style = "style">
       
       <div class="login-top">
           <div class="loginspan-flex">
                <!-- <van-icon size = "36px" color="rgb(236, 89, 89)" name="arrow-left" /> -->
                <span class="loginspan">
                    登录
                </span>
           </div>
       </div>
       <div class="login-body">
           <div class="login-body-div">
               <div class="login-body-icon">
                   <van-icon name="user-o" color = "rgb(236, 89, 89)" size="28px" />
                </div>
                <div class="login-body-input">
                <input type="text" v-model="mobileNum" class="md-input-bd" placeholder="请输入手机号" >
                </div>
           </div>
           <div class="login-body-div">
               <div class="login-body-icon">
                   <van-icon name="bag-o" color = "rgb(236, 89, 89)" size="28px" />
                </div>
                <div class="login-body-input">
                <input type="password" v-model="pwd" class="md-input-bd" placeholder="请输入密码" >
                </div>
           </div>
           <div class="login-body-div login-body-div-pics">
               <div class="login-body-icon">
                   <van-icon name="coupon-o" color = "rgb(236, 89, 89)" size="28px" />
                </div>
                <div class="login-body-input-2">
                    <input type="text" v-model="pic" class="md-input-bd" placeholder="请输入图形验证码" >
                </div>
                <div class="picyzm">
                    <div class="mobile-btns" @click = 'getpicYzms'><img :src = 'picYzms' alt=""></div>
                </div>
           </div>
           <div class="login-body-div">
               <button @click = "toLogin"  class="btn-doLogin2">登录</button>

           </div>
           <div class="tologinshe">
                <slot name="tologin"></slot>

           </div>

       </div>
   </div>
</template>

<script type="text/ecmascript-6">
import qs from 'qs';
const axios = require('axios');
import { Dialog } from 'vant';
import { Toast } from 'vant';
import apiConfig from '../../router/httpConfig'

import loginInput from '../mySelf/loginInput'
import loginInputItem from '../mySelf/loginInput-item'
export default {
   name: '',
   data() {
       return {
          mobileNum:'',
          pwd:'',
          picYzms:'',
          pic:'',
          key:'',
          style:{}
       }
   },
  components: {
     loginInputItem,
     loginInput
  },
  methods:{
     getpicYzms:function(){
      let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        this.style = {
            height:clientHeight+'px'
        }
          axios.get(apiConfig.PictureVerificationCode)
                .then((res)=>{
                    // console.log(res.data.data.url)
                        // this.picYzms = res.data.data.url
                        this.picYzms = res.data.data.url
                        this.key = res.data.data.key
                        
                        // this.key = res.data.data.key
            })

     },
     
     toRegester:function(){
        // this.$router.push({
        //    path:this.$route.path,
        //    query: {demo:'regester'}
        // })
        // console.log(this.$router)
     },
      toLogin:function(){
          // 判断用户是否写入数据
          if(this.mobileNum == ''){
              Toast('请输入手机号')
          }else if(this.pwd == ''){
              Toast('请输入密码')
        }else if(this.key == ''){
                Toast('请输入短信验证码')
        }else if(this.pic == ''){
                Toast('请输入图形验证码')
            }else{

          // 获取tab的显示或者隐藏
          let tabbar = document.getElementsByClassName('van-hairline--top-bottom')
        //   console.log(tabbar)
        //   进行登录并且存储数据到 localstore
            axios.post(apiConfig.GettingTokenAndCell,qs.stringify({
                  mobile:this.mobileNum,
                  password:this.pwd,
                  captcha_code:this.key,
                  captcha_key:this.pic

            }))
            .then((res)=>{
               if(res.data.code == '0'){
                     Toast.success('登录成功!');
                     localStorage.setItem('token',res.data.data.token);
                     localStorage.setItem('expire',res.data.data.expire);
                     localStorage.setItem('id',res.data.data.id);
                     localStorage.setItem('islogin','true')
                    //  console.log(localStorage)
                    //  this.$emit('loginOk','1')
                    this.$router.push('/home')

               }else{
                     Toast.fail('登录失败,请检查账户密码是否正确!');
               }
            })
            .catch((err)=>{
                  Toast.fail('登录失败,请检查账户密码是否正确!');
            })
     }
          }

  },
  mounted(){
     this.getpicYzms()
  }

}
</script>

<style lang="less">
.login-bgcolor{
    width:100%;
    position:absolute;
    z-index:9;
    background-color: #faf7f7;
    // background: linear-gradient(70% rgba(241, 82, 8, 0.87) , 30% rgb(255, 255, 255) ); 
}
.loginspan-flex{
    display: flex;
    width:100%;
}
.loginspan{
    width:100%;
    font-size: 28px;
    font-weight: bold;
}
.login-bgcolor .login-top{
    width:100%;
    height:60px;
    margin-top: 19px;
    display:flex;
    align-items: center;

}
.login-body{
    width:100%;
    height:50px;
    display:flex;
    justify-content: center;
    align-items: center;
    margin-top: -8px;
    flex-wrap: wrap;

}
.login-body >div{
    margin-top: 25px;
}
.login-body-div{
    width:75%;
    height:45px;
    border: 1px solid rgb(236, 89, 89);
    border-radius:50px;
    display:flex;
    align-items: center;
    padding-left:6%;
}
.login-bgcolor .login-body-input{
    width:70%;
    // height:30px;
    // margin-left: 15% !important;
    // border-style:none;
    // outline-color: white;
    
    // border: 1px solid #000;

}
.login-body-input>input{
    width:100%;
    // height:30px;
    font-size: 16px;
    border: 1px solid rgba(250, 247, 247,0);
    // border: 1px solid #000;
    background-color: rgba(0,0,0,0);
    padding-left:10px;

}
.login-body-input-2{
    width:50%;
    // height:30px;
}
.login-body-input-2>input{
    margin-left: 5%;
    // height:30px;
    width:100%;
    font-size: 16px;
    margin-top: -3px;
    border: 1px solid rgba(250, 247, 247,0);

    background-color: rgba(1,1,1,0);

}
.picyzm{
    width:10%;
}
.login-bgcolor .mobile-btns{
    // width:30px;
    margin-left: 80%;
    margin-top: 20%;
}
.mobile-btns>img{
    width:60px;
    margin-top: -30%;
    // border: 1px solid rgb(236, 89, 89);
}
.login-body-div:nth-of-type(4){
    background-color: rgb(236, 89, 89);
    border: 1px solid rgba(1,1,1,0);

}
.login-bgcolor .btn-doLogin2{
    width:100%;
    height:100%;
    margin-left: -4%;
    border-style:none;
    background-color:rgba(1,1,1,0);
    color:white;
    font-size: 24px;
    // font-weight: bold;
    letter-spacing: 1em;
    padding-left: 1em;
}
// .login-body-div:nth-of-type(4){
//     width:270px !important;
// }
.login-bgcolor .toRegester{
    width:100%;
    // margin-left: 8%;
    border-radius: 20px;
    height:45px;
    font-size: 24px;
    padding-left: 8%;
    background-color: rgb(236, 89, 89);

}
.tologinshe{
    width:81%;
}
.login-body-div-pics{
    align-items: center;
}
</style>
