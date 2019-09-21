<template>
  <div class="WatchShareBook">
    <back-item></back-item>

    <div class="WatchShareBook-header">
      <div>
        <span>共享成员信息</span>
      </div>
    </div>
    <div class="WatchShareBook-body" v-for="User in listInfo" :key="User.id">
      <van-swipe-cell :on-close="onClose">
        <van-cell :border="false" :title="User.nickname" :value="User.mobile" />
        <template slot="right">
          <van-button square type="danger" text="删除" @click="delShareUser(User)" />
        </template>
      </van-swipe-cell>
     
    </div>
    <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
      <van-cell-group>
        <van-field v-model="message" label="好友手机号" type="textarea" placeholder="请输入好友手机号"  autosize />
      </van-cell-group>
      <button class="pushAddshare" @click="pushAddshare">提交</button>
    </van-popup>

    <button slot="changeLoginUser" @click="addShareBook" class="changeLoginUserDiv2">添加共享成员</button>
  </div>
</template>

<script type="text/ecmascript-6">
const axios = require("axios");
import qs from "qs";
import { Dialog } from "vant";
import { Toast } from "vant";
import moment from "moment";
import backItem from "../Button/Back";

export default {
  name: "",
  data() {
    return {
      nickname: "",
      mobile: "",
      listInfo: [],
      show: false,
      message: ""
    };
  },
  components: {
    backItem
  },
  methods: {
    getUserInfo: function() {
      axios
        .get(
          "http://jizhang-api-dev.it266.com/api/user/profile?token=" +
            localStorage.token
        )
        .then(res => {
          this.Username = res.data.data.nickname;
          // console.log(res);
          this.UserPic = res.data.data.avatar_url;
        });
    },
    addShareBook: function() {
      this.show = true;
    },
    getAddbook: function() {
      axios
        .get(
          "http://jizhang-api-dev.it266.com/api/book/get-default?token=" +
            localStorage.token
        )
        .then(res => {
          console.log(localStorage)
          // 获取当前账簿id
          localStorage.setItem("NewbookId", res.data.data.id);
        });
    },
    pushAddshare: function() {
      axios
        .post(
          "http://jizhang-api-dev.it266.com/api/member/add?token=" +
            localStorage.token,
          qs.stringify({
            book_id: localStorage.NewbookId,
            mobile: this.message
          })
        )
        .then(res => {
          axios
            .get(
              "http://jizhang-api-dev.it266.com/api/member?token=" +
                localStorage.token,
              {
                params: {
                  book_id: localStorage.NewbookId
                }
              }
            )
            .then(res => {
              this.listInfo = res.data.data;
              this.show = false;
              // console.log(res);
            });
          this.show = false;

          Toast(res.data.data);
        });
    },
    // clickPosition 表示关闭时点击的位置
    onClose(clickPosition, instance) {},
    getShareUser: function() {
      // let params = {
      //      book_id:localStorage.NewbookId
      // }
      // console.log(localStorage.NewbookId);
      axios
        .get(
          "http://jizhang-api-dev.it266.com/api/member?token=" +
            localStorage.token,
          {
            params: {
              book_id: localStorage.NewbookId
            }
          }
        )
        .then(res => {
          this.listInfo = res.data.data;
          if(this.listInfo.length === 0){
              this.listInfo = [{
                  nickname:'暂无好友',
                  mobile:'请添加'
              }]
          }
          // console.log(res);
        });
    },
    delShareUser: function(User) {
      Dialog.confirm({
        message: "确定删除吗？"
      }).then(() => {
        // console.log(User);
        axios
          .post(
            "http://jizhang-api-dev.it266.com/api/member/delete?token=" +
              localStorage.token,
            qs.stringify({
              book_id: localStorage.NewbookId,
              user_id: User.id
            })
          )
          .then(res => {
            // console.log(res);
            axios
              .get(
                "http://jizhang-api-dev.it266.com/api/member?token=" +
                  localStorage.token,
                {
                  params: {
                    book_id: localStorage.NewbookId
                  }
                }
              )
              .then(res => {
                this.listInfo = res.data.data;
                this.show = false;
                 if(this.listInfo.length === 0){
              this.listInfo = [{
                  nickname:'暂无好友',
                  mobile:'请添加'
              }]
          }
                // console.log(res);
              });
            Toast(res.data.data);
          });
      });
    }
  },
  mounted() {
    this.getShareUser();
    this.getUserInfo();
  }
};
</script>

<style lang="less">
.WatchShareBook-header {
  width: 100%;
  height: 45px;
  background-color: orange;
  display: flex;
  justify-content: center;
  align-items: center;
}
.WatchShareBook-header span {
  color: white;
  font-size: 18px;
}
.WatchShareBook-body .van-cell__title {
  margin-left: -25%;
}
.WatchShareBook .van-tag--mark {
  top: 13px !important;
}
.WatchShareBook .changeLoginUserDiv2 {
  border-style: none;
  margin-top: 30px;
  width: 360px;
  height: 40px;
  font-size: 20px;
  // font-weight: bold;
  color: white;
  background-color: orange;
  border-radius: 30px;
}
.pushAddshare{
  width:100%;
  border-style:none;
  height:45px;
  background-color: orange;
  border-radius: 5px;
  color:white;
  letter-spacing:20px;
  font-size: 18px;
  padding-left: 20px;
}
</style>
