<template>
  <div class="inBookkeep">
    <!-- <back-item></back-item> -->
    <div>
      <van-row gutter="20">
        <!-- 传入参数 点击获取值 -->
        <div v-for="item in inBookVal" :key="item.id" @click="getInBookId(item)">
          <van-col span="8">
            <div class="inBookkeep-list" :name="item.id">
              <span>{{item.name}}</span>
            </div>
          </van-col>
        </div>
        <van-col span="8">
          <div class="inBookkeep-list" @click="addBookkeepList">
            <span>
              <van-icon name="plus" />
            </span>
          </div>
        </van-col>
      </van-row>
    </div>
    <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
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
              placeholder="收入"
              rows="1"
              autosize
              disabled
            />
          </van-cell-group>
        </div>
        <div class="inBook-foot-title">
          <van-button plain type="primary" size="normal" @click="togetInBook" v-if="pushshow">提交</van-button>
          <van-button plain type="primary" size="normal" @click="notogetInBook" v-if="btnshow">
            <van-loading type="spinner"></van-loading>
          </van-button>
        </div>
      </div>
    </van-popup>

    <van-popup v-model="fatcherId" position="bottom" :style="{ height: '50%' }">
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
              placeholder="收入"
              rows="1"
              autosize
              disabled
            />
          </van-cell-group>
          <!-- <van-cell-group>
            <van-field
              v-model="parentMsg3"
              label="子级分类"
              type="textarea"
              placeholder="请填写子级分类名称"
              rows="1"
              autosize
            />
          </van-cell-group> -->
        </div>
        <div class="inBook-foot-title">
          <!-- <van-button plain type="primary" size="normal" @click="togetSonInBook">提交子类</van-button> -->
          <van-button plain type="primary" size="normal" @click="todelSonInBook" v-if = "delshow">删除该类</van-button>
          <van-button plain type="primary" size="normal" @click="notodelSonInBook" v-if = "nodelshow">
            <van-loading type="spinner"></van-loading>
          </van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script type="text/ecmascript-6">
import qs from "qs";
const axios = require("axios");
import backItem from "../components/Button/Back";
import apiConfig from "../router/httpConfig.js";
import { Toast } from "vant";
export default {
  name: "",
  data() {
    return {
      inBookVal: [],
      show: false,
      fatcherId: false,
      message: "",
      message2: "",
      parentMsg: "",
      parentMsg2: "",
      parentMsg3: "",
      parentId: "",
      btnshow: false,
      pushshow: true,
      delshow:true,
      nodelshow:false
    };
  },
  components: {
    backItem
  },
  methods: {
    getBookeepClass: function() {
      Toast.loading({
            mask: true,
            message: '加载中,请稍等...',
            duration: "toast"
            });
            //asdasd
      axios
        .get(apiConfig.ExpenditureCategory + "?token=" + localStorage.token, {
          params: {
            type: "1",
            dataType: "1"
          }
        })
        .then(resp => {
          // console.log(res.data.data); // hell
          for (var i = 0; i < resp.data.data.length; i++) {
            if (resp.data.data[i].parent_id == 0) {
              this.inBookVal.push(resp.data.data[i]);
            }
          }
           Toast.loading({
            mask: true,
            message: "加载中,请稍等...",
            duration: "1"
          });
        });
    },
    getInBookId: function(msg) {
      //   console.log(msg)
      this.fatcherId = true;
      this.parentMsg = msg.name;
      this.parentId = msg.id;
    },
    addBookkeepList: function() {
      this.show = true;
    },
    togetInBook: function() {
      this.btnshow = true;
      this.pushshow = false;
      axios
        .post(
          apiConfig.NewExpenditureCategory + "?token=" + localStorage.token,
          qs.stringify({
            parent_id: 0,
            type: 1,
            name: this.message,
            sort: 10
          })
        )
        .then(res => {
          if (res.data.code === "0") {
            Toast("添加成功");
          } else {
            Toast(res.data.data);
          }
          axios
            .get(
              apiConfig.ExpenditureCategory + "?token=" + localStorage.token,
              {
                params: {
                  type: "1",
                  dataType: "1"
                }
              }
            )
            .then(res => {
              this.inBookVal = res.data.data;
              this.show = false;
              this.message = "";

              this.btnshow = false;
              this.pushshow = true;
            });
        });
    },
    notogetInBook() {
      Toast.loading({
        mask: true,
        message: "网速较慢,请稍等..."
      });
    },
    togetSonInBook: function() {
      // console.log(this.parentId);
      axios
        .post(
          apiConfig.NewExpenditureCategory + "?token=" + localStorage.token,
          qs.stringify({
            parent_id: this.parentId,
            type: 1,
            name: this.parentMsg3,
            sort: 10
          })
        )
        .then(res => {
          // console.log(res);
          this.fatcherId = false;
        });
    },
    todelSonInBook: function() {
        this.nodelshow = true
        this.delshow = false
    //   console.log(this.parentId);
      axios
        .post(
          apiConfig.DelExpenditureCategory +
            "?id=" +
            this.parentId +
            "&token=" +
            localStorage.token
        )
        .then(res => {
        //   console.log(res);
        Toast(res.data.data)
          if (res.data.code == 0) {
            axios
              .get(
                apiConfig.ExpenditureCategory + "?token=" + localStorage.token,
                {
                  params: {
                    type: "1",
                    dataType: "1"
                  }
                }
              )
              .then(res => {
                this.inBookVal = res.data.data;
                this.fatcherId = false;
                this.nodelshow = false
                this.delshow = true
              });
          }
        });
    },
    notodelSonInBook(){
         Toast.loading({
        mask: true,
        message: "网速较慢,请稍等...",
      });
    }
  },
  mounted() {
    this.getBookeepClass();
  }
};
</script>

<style lang="less">
.inBookkeep {
  width: 100%;
  height: 300px;
}
.inBookkeep-list {
  border-radius: 20px;
  height: 30px;
  margin-top: 30px;
  color:#747474;
  border: 1px solid #e8e8e8;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  // color: #747474;
}
.van-row {
  margin-left: 10px !important;
  margin-right: 10px !important;
}
.inBook-top-title {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: #646262;
  // border: 1px solid #000;
}
.inBook-body-title {
  width: 100%;
  // border: 1px solid #000;
}
.inBook-foot-title {
  margin-top: 30px;
}
.inBook-foot-title .van-button--primary{
  width:100px;
  border: 1px solid #ec5959;
  color:#ec5959;
}
.addBookkeeping .van-tag--mark {
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
</style>
