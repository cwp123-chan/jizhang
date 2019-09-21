<template>
   <div class="Subsequent">
            <back-item></back-item>
       <div class="Subsequent-header">
           <div class="Subsequent-header-title">
               <span>
                   后续缴费
               </span>
           </div>
       </div>
       <div class="Subsequent-body">
           <van-cell-group>
                <van-field
                    v-model="message"
                    label="付款金额"
                    type="textarea"
                    placeholder="请输入付款金额"
                    rows="1"
                    autosize
                />
            </van-cell-group>
            <div>
                <div class="Subsequent-body-select-title">
                    <span>付款账户</span>
                </div>
                <div class="Subsequent-body-select">            
                    <van-dropdown-menu>
                        <van-dropdown-item v-model="value1" :options="option1" title="" />
                    </van-dropdown-menu>
                </div>                            
            </div>
            <div class="Suseequent-body-voucher-div">
                <div class="Suseequent-body-voucher">
                    <span>支出凭证</span>
                </div>
                <div class="Subsequent-body-voycher-pic">
                    <van-uploader v-model="fileList" multiple :after-read="afterRead" @delete= "todelete"/>
                </div>
            </div>
            <div @click="listShow">
                <div class="Subsequent-body-select-title">
                    <span>付款日期</span>
                </div>
                <div class="Subsequent-body-select">            
                    <div class="Subsequent-body-select-date">
                        <span>{{dateData}}</span>
                    </div>
                </div> 
            </div>
       </div>
       <div>
           <button class="Subsequent-body-button" @click = "pushTheData">提交缴费</button>
       </div>
       <van-popup
        v-model="show"
        position="bottom"
        :style="{ height: '40%' }"
        >
            <van-datetime-picker
            v-model="currentDate"
            type="date"
            @cancel = "cancelpush"
            @confirm = "clickSucc(currentDate)"
            />        
        </van-popup>
   </div>
</template>
<!-- @change = "getColumnValue(currentDate)" -->
            <!-- @cancel = "disSucc" -->

<script type="text/ecmascript-6">
import qs from 'qs';
const axios = require('axios');
import { Dialog } from 'vant';
import { Toast } from 'vant';
import moment from "moment"
import backItem from '../Button/Back'

export default {
   name: '',
   data() {
       return {
            message:'',
            value1: 0,
            value2: 'a',
            option1: [],
            fileList: [
                // { url: 'https://img.yzcdn.cn/vant/cat.jpeg' },
                // Uploader 根据文件后缀来判断是否为图片文件
            ],
            PicKey:[],
            j:0,
            currentDate:new Date(),
            show:false,
            dateData:moment(new Date()).format('YYYY-MM-DD'),
       }
   },
   components:{
        backItem
   },
   methods:{
       getAlldata:function(){
            var ListAccount = [];
           axios.get('http://jizhang-api-dev.it266.com/api/account?token='+localStorage.token)
           .then((res)=>{
            //    console.log(res)
               for(var i = 0; i< res.data.data.length; i++){
                   ListAccount[i] = {text:res.data.data[i].name,value:i,accId:res.data.data[i].id}
                //    
               }
               console.log(ListAccount)
               this.option1 = ListAccount
           })
       },
       afterRead(file) {
      // 此时可以自行将文件上传至服务器
           console.log(file)
        let params = new FormData();
        params.append("file",file.file)
        // console.log(params.get('file'));
        // console.log(file.file);
        let config = {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }
        axios.post('http://jizhang-api-dev.it266.com/api/upload/image?token='+localStorage.token,params,config)
        .then((res)=>{
            console.log(res)
            if(res.data.data.file){
                Toast('图片上传成功')
                this.PicKey[this.j] = {key:res.data.data.file.fileKey}
                this.j++
                console.log(this.PicKey)
            }else{
                Toast(res.data.data)
            }

        })
       },
       todelete:function(file,detail){
           console.log(file,detail)
       },
       listShow:function(){
           this.show = true
       },
       getColumnValue(index){
           console.log(index)
       },
    clickSucc(index){
        //  console.log(index)
         let strData = moment(index).format("YYYY-MM-DD")
        //  let newData = strData.split('')
        this.dateData = strData
         console.log(this.dateData)
         this.show = false;
     },
     cancelpush(){
         this.show = false;
     },
     pushTheData(){
         console.log(localStorage)
        //  账户id
        //  console.log(this.option1[this.value1].accId)   
        let imagesKey = ""
        for(let k = 0 ; k < this.PicKey.length ; k++){
            imagesKey += this.PicKey[k].key +","
        }         
        console.log(imagesKey)
         axios.post('http://jizhang-api-dev.it266.com/api/record/sequel?token='+localStorage.token,qs.stringify({
              record_id:localStorage.detailListId,
                money:this.message,
                account_id:this.option1[this.value1].accId,
                date:this.dateData,
                image_keys:imagesKey
         }))
         .then((res)=>{
             console.log(res)
             Toast(res.data.data)
             this.$router.go(-1)
         })
     }
   },
  mounted(){
      this.getAlldata()
  }
}
</script>

<style lang="less">
.Subsequent-header{
    display:flex;
    justify-content: center;
    // align-items: center;
    padding-top: 20px;
    font-size: 18px;
    color:white;
    width:100%;
    height:30px;
    background-color: orange;
}
.Subsequent-header-title>span{
    font-size: 22px;

}
.Subsequent-header-title{
    margin-top: -10px;
}
.Subsequent-body-select{
    width:70%;
    margin-left: 30%;
}
.Subsequent-body-select-title{
    width:30%;
    background-color: #fff;
    position:absolute;
    height:49px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.Suseequent-body-voucher-div{
    width: 100%;

    background-color: #fff;
    display: flex;
    align-items: center;
    padding-top: 7px;
    justify-content: space-between;

}
.Suseequent-body-voucher-div>div{
    float: left;
    height:100%;

}
.Suseequent-body-voucher{
    width:30%;
    display: flex;
    height:100%;
    justify-content: center;
    align-items: center;
    margin-left: 3%;
}
.Subsequent-body-voycher-pic{
    height: 100%;
    margin-left: 5%;
}
.Subsequent-body-voycher-pic>.van-uploader>.van-uploader__wrapper{
    // margin-left:5%;
    width: 275px;
}
.Subsequent-body-select-date{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width:100%;
    background-color: #fff;
    height: 49px;
}
.Subsequent-body-select-date>span{
    display: block;
    margin-right: 9%;
}
.Subsequent-body-button{
    width: 60%;
    height: 40px;
    border-style:none;
    background-color: rgb(135, 241, 188);
    border-radius: 20px;
    font-size: 18px;
    font-weight: bold;
    color:white;
    margin-top: 30px;
}
.van-uploader__preview-delete{
    display:none;
}
.Subsequent .van-tag--mark{
    top:15px;
}
</style>
