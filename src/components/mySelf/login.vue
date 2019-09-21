<template>
   <div class="myself-login">
      <div class="header-title-login">
            <span>登录</span>
      </div>
      <div class="myself-login-input">
        <login-input>
            <login-input-item slot="mobile-title-login" keys="mobile">   
                <span slot="md-title-input" >请输入手机号:</span>
                <input type="text" v-model="mobileNum" class="md-input-bd" >
            </login-input-item>
        </login-input>
      </div>
      <div class="myself-login-input">
        <login-input>
            <login-input-item slot="mobile-title-login" keys="mobile">   
                <span slot="md-title-input" >请输入密码:</span>
                <input type="password" v-model="pwd" class="md-input-bd" >
            </login-input-item>
        </login-input>
      </div>
      <div class="myself-login-input">
        <login-input>
            <login-input-item slot="mobile-title-login" keys="mobile">   
                <span slot="md-title-input" >图形验证码:</span>
                <input type="text" v-model="pic" class="md-input-bd" >
            </login-input-item>
        </login-input>
      </div>
      
       <div class="myself-login-input">
        <login-input>
            <login-input-item slot="mobile-title-login" keys="pic"> 
                <!-- <div class="mobile-picYzm" slot="md-title"><button>获取验证码</button></div> -->
                <div class="mobile-btns" @click = 'getpicYzms'><img :src = 'picYzms' alt=""></div>
            </login-input-item>
        </login-input>
        </div>
        <div class="login-button" slot="tologin">
                <button @click = "toLogin" class="btn-doLogin">登录</button>
         <slot name="tologin"></slot>
         </div> 
   </div>
</template>

<script type="text/ecmascript-6">
import qs from 'qs';
const axios = require('axios');
import { Dialog } from 'vant';
import { Toast } from 'vant';
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
          key:''
       }
   },
  components: {
     loginInputItem,
     loginInput
  },
  methods:{
     getpicYzms:function(){
          axios.get('http://jizhang-api-dev.it266.com/api/captcha')
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
        //   进行登录并且存储数据到 localstore
            axios.post('http://jizhang-api-dev.it266.com/api/user/token/mobile',qs.stringify({
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
                     console.log(localStorage)
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
  },
  mounted(){
     this.getpicYzms()
  }

}
</script>

<style lang="less">
.myself-login{
    width:100%;
    display:flex;
    justify-content: center;
    flex-wrap: wrap;
}
.header-title-login{
    height: 30px;
    font-size: 32px;
    color:#4d4a4a;
    font-weight: bold;
    margin-top: 100px;
}
.myself-login-input{
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
.login-button{
    width:350px;
    display:flex;
    // border: 1px solid #000;
    justify-content: space-between;
    margin-top: 40px;
}
.btn-doLogin{
    width:150px;
    border-style:none;
    background-color:rgb(253, 169, 13);
    color: white;
    font-weight: bold;
    letter-spacing:3px;
    font-size: 20px;
   //  border: 1px solid #000;
    height:40px;
}

.mobile-btns{
   //  border: 1px solid #000;
    margin-left: 55px;
    height:40px;
    margin-top: -10px;
    width: 240px;


}
.myself-login .md-input-bd{
    background-color:rgba(199, 235, 220, 0);
}
</style>
