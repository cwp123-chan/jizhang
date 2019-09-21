<template>
   <div class="inBookkeep">
    <div>
            <back-item></back-item>

        <van-row gutter="20">
            <!-- 传入参数 点击获取值 -->
            <div v-for = 'item in inBookVal' :key="item.id"  @click="getInBookId(item)">
                <van-col span="8">
                    <div class="inBookkeep-list" :name="item.id">
                        <span>{{item.name}}</span>
                    </div>
                </van-col>
            </div>            
            <van-col span="8">
                    <div class="inBookkeep-list" @click="addBookkeepList">
                        <span><van-icon name="plus" /></span>
                    </div>
            </van-col>
        </van-row>
    </div>
    <van-popup
        v-model="show"
        position="bottom"
        :style="{ height: '50%' }"
    >
    <!-- 弹出层内容 -->
    <div>
        <div class="inBook-top-title">
            <span>请输入添加内容</span>
        </div>
        <div class="inBook-body-title">
            <van-cell-group>
                <van-field
                    v-model="message"
                    label="分类名"
                    type="textarea"
                    placeholder="请输入所需分类"
                    rows="1"
                    autosize
                />
            </van-cell-group>
            <van-cell-group>
                <van-field
                    v-model="message2"
                    label="收入/支出"
                    type="textarea"
                    placeholder="支出"
                    rows="1"
                    autosize
                    disabled
                />
            </van-cell-group>
        </div>
        <div class="inBook-foot-title">
            <van-button plain type="primary" size="normal" @click="togetInBook">提交</van-button>
        </div>
    </div>
    </van-popup>

    <van-popup
        v-model="fatcherId"
        position="bottom"
        :style="{ height: '50%' }"
    >
    <!-- 弹出层内容 -->
    <div>
        <div class="inBook-top-title">
            <span>请输入添加内容</span>
        </div>
        <div class="inBook-body-title">
            <van-cell-group>
                <van-field
                    v-model="parentMsg"
                    label="父级分类"
                    type="textarea"
                    placeholder="请输入所需分类"
                    rows="1"
                    autosize
                />
            </van-cell-group>
            <van-cell-group>
                <van-field
                    v-model="parentMsg2"
                    label="收入/支出"
                    type="textarea"
                    placeholder="支出"
                    rows="1"
                    autosize
                    disabled
                />
            </van-cell-group>
            <van-cell-group>
                <van-field
                    v-model="parentMsg3"
                    label="子级分类"
                    type="textarea"
                    placeholder="请填写子级分类名称"
                    rows="1"
                    autosize
                />
            </van-cell-group>
        </div>
        <div class="inBook-foot-title">
            <van-button plain type="primary" size="normal" @click="togetSonInBook">提交子类</van-button>
            <van-button plain type="primary" size="normal" @click="todelSonInBook">删除该类</van-button>
        </div>
    </div>
    </van-popup>
   </div>
</template>

<script type="text/ecmascript-6">
 import qs from 'qs';
 const axios = require('axios');
import backItem from '../components/Button/Back'
 import { Toast } from 'vant';
export default {
   name: '',
   data() {
       return {
           inBookVal:[],
           show: false,
           fatcherId:false,
           message:'',
           message2:'',
           parentMsg:'',
           parentMsg2:'',
           parentMsg3:'',
           parentId:''
       }
   },
  components: {
      backItem
  },
  methods:{
      getBookeepClass:function(){
          axios.get('http://jizhang-api-dev.it266.com/api/category?token='+localStorage.token,{
                        params:{
                            type:'2',
                        dataType:'1'
                        }                      
                    })
          .then((res)=>{
            //   console.log(res.data.data)
              for(var i = 0 ; i< res.data.data.length ; i++){
                  if(res.data.data[i].parent_id == 0){
                    this.inBookVal.push(res.data.data[i])  ;
                  }
              }
          })
      },
      getInBookId:function(msg){
        //   console.log(msg)
                  this.fatcherId = true
                  this.parentMsg = msg.name
                  this.parentId = msg.id
                  
      },
      addBookkeepList:function(){
        this.show = true;
      },
      togetInBook:function(){
          axios.post('http://jizhang-api-dev.it266.com/api/category/create?token='+localStorage.token,qs.stringify({
                parent_id:0,
                type :2,
                name:this.message,
                sort:10 
            }))
            .then((res)=>{                       
                axios.get('http://jizhang-api-dev.it266.com/api/category?token='+localStorage.token,{
                    params:{
                        type:'2',
                    dataType:'1'
                    }                      
                })
                .then((res)=>{
                    this.inBookVal = res.data.data;
                    this.show = false;
                })

            })
      },
      togetSonInBook:function(){
        //   console.log(this.parentId)
          axios.post('http://jizhang-api-dev.it266.com/api/category/create?token='+localStorage.token,qs.stringify({
                parent_id:this.parentId,
                type :2,
                name:this.parentMsg3,
                sort:10 
            }))
            .then((res)=>{
                // console.log(res)
                this.fatcherId = false;

            })
      },
      todelSonInBook:function(){
        //   console.log(this.parentId)
        axios.post('http://jizhang-api-dev.it266.com/api/category/delete?id='+this.parentId+'&token='+localStorage.token)
        .then((res)=>{
            // console.log(res)
            if(res.data.code == 0){
                axios.get('http://jizhang-api-dev.it266.com/api/category?token='+localStorage.token,{
                    params:{
                        type:'2',
                    dataType:'1'
                    }                      
                })
                .then((res)=>{
                    this.inBookVal = res.data.data;
                    this.fatcherId = false;
                })

            }
        })
      }
    
  },
  mounted(){
      this.getBookeepClass()
  }
}
</script>

<style lang="less">
.inBookkeep{
    width: 100%;
    height:300px;

}
.inBookkeep-list{
    border-radius: 20px;
    height:30px;
    margin-top: 30px;
    background-color: #fbf5f5;
    display:flex;
    justify-content: center;
    align-items: center;
    color:#747474;
}
.van-row{
    margin-left: 10px !important;
    margin-right: 10px !important;
}
.inBook-top-title{
    width:100%;
    height:40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    color:#747474;
    // border: 1px solid #000;

}
.inBook-body-title{
    width:100%;
    // border: 1px solid #000;
}
.inBook-foot-title{
    margin-top: 30px;
}
.inBookkeep .van-tag--mark{
    width:60px !important;
    border-radius: 20px !important;
    height:22px !important;
    display: flex !important;
    justify-content: center;
    align-items: center;
    top:35px !important;
    background-color: #fff !important;
    color:orange !important;
    font-size: 14px !important;
    font-weight: bold !important;
    left:5px;
}
</style>
