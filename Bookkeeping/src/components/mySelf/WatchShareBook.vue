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
import apiConfig from '../../router/httpConfig'


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
          apiConfig.PersonalInfo+"?token=" +
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
          apiConfig.GetCurrentAccountBook+"?token=" +
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
          apiConfig.InviteAdditionalBookk+"?token=" +
            localStorage.token,
          qs.stringify({
            book_id: localStorage.NewbookId,
            mobile: this.message
          })
        )
        .then(res => {
          axios
            .get(
              apiConfig.AccountingMembers+"?token=" +
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
              console.log(res)
            });
          this.show = false;

          Toast(res.data.data);
        });
    },
    // clickPosition 表示关闭时点击的位置
    onClose(clickPosition, instance) {},
    getShareUser: function() {
       Toast.loading({
            mask: true,
            message: '加载中,请稍等...',
            duration:'toast'
            });
      // let params = {
      //      book_id:localStorage.NewbookId
      // }
      // console.log(localStorage.NewbookId);
      axios
        .get(
          apiConfig.AccountingMembers+"?token=" +
            localStorage.token,
          {
            params: {
              book_id: localStorage.NewbookId
            }
          }
        )
        .then(res => {
          this.listInfo = res.data.data;
             Toast.loading({
            mask: true,
            message: '加载中,请稍等...',
            duration:'1'
            });
          if(this.listInfo.length === 0){
              this.listInfo = [{
                  nickname:'暂无好友',
                  mobile:'请添加'
              }]
          }
             Toast.loading({
            mask: true,
            message: '加载中,请稍等...',
            duration:'1'
            });
          // console.log(res);
        })
        .catch((err)=>{
             Toast.loading({
            mask: true,
            message: '加载中,请稍等...',
            duration:'toast'
            });
        })
    },
    delShareUser: function(User) {
      Dialog.confirm({
        message: "确定删除吗？"
      }).then(() => {
        // console.log(User);
        axios
          .post(
            apiConfig.DeleteAccountingMemb+"?token=" +
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
                apiConfig.AccountingMembers+"?token=" +
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
  // background-color: orange;
  background-color: rgb(236, 89, 89);

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
  width: 90%;
  height: 40px;
  font-size: 20px;
  // font-weight: bold;
  color: white;
  // background-color: orange;
  background-color: rgb(236, 89, 89);

  border-radius: 30px;
}
.pushAddshare{
  width:70%;
  border-style:none;
  height:45px;
  margin-top: 10%;
  // background-color: orange;
  background-color: rgb(236, 89, 89);

  border-radius: 5px;
  color:white;
  letter-spacing:20px;
  font-size: 18px;
  padding-left: 20px;
}

</style>
