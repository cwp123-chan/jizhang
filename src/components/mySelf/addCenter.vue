<template>
  <div class="addCenter">
    <!-- <button @click="test">检测</button> -->
    <img :src="UserPic" alt class="addImg" @click="changeCenterInfo" />
    <add-center-input>
      <add-center-input-item>
        <!-- <span slot="addCenter-title">尊敬的:</span> -->
        <span slot="addCenter-input">{{Username}}</span>
        <span slot="addCenter-icon" @click="edit">
          <van-icon name="edit" dot />
        </span>
        <div slot="my-create">新增账户</div>
      </add-center-input-item>
      <button slot="changeLoginUser" @click="WatchShareBook" class="changeLoginUserDiv">查看共享成员</button>
      
      <router-link to="/myAccount" slot="changeLoginUser">
        <button @click="createAccount" class="changeLoginUserDiv">我的账户</button>
      </router-link>
      <button slot="changeLoginUser" @click="exchangeUser" class="changeLoginUserDiv">切换用户</button>
      <router-view></router-view>
    </add-center-input>
    
  </div>
</template>

<script type="text/ecmascript-6">
import addCenterInput from "../mySelf/addCenterInput";
import addCenterInputItem from "../mySelf/addCenterInput-item";
const axios = require("axios");
import qs from "qs";
import { Dialog } from "vant";
import { Toast } from "vant";
import moment from "moment";
export default {
  name: "",
  data() {
    return {
      Username: "",
      UserPic: "",
      show:false,
      message:''

    };
  },
  components: {
    addCenterInputItem,
    addCenterInput
  },
  methods: {
    exchangeUser: function() {
      Dialog.confirm({
        message: "确认切换用户?"
      })
        .then(() => {
          axios
            .get(
              "http://jizhang-api-dev.it266.com/api/user/logout?token=" +
                localStorage.token
            )
            .then(res => {
              console.log(res);
            });
          localStorage.setItem("token", "");

          this.$emit("backLogin", "change");
        })
        .catch(() => {});
    },
    edit: function() {
      //   this.$emit('edit','change')
      this.$router.push("/editInfo");
    },
    createAccount: function() {
      this.$emit("func", "changes");
    },
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
    changeCenterInfo: function() {
      this.$router.push("/updataCenterInfo");
    },
    addShareBook: function() {
      this.show = true
    },
    WatchShareBook:function(){
      this.$router.push('/WatchShareBook')
    },
    getAddbook:function(){
      axios.get('http://jizhang-api-dev.it266.com/api/book/get-default?token='+localStorage.token)
      .then((res)=>{
        // console.log(localStorage)
        // 获取当前账簿id
        localStorage.setItem("NewbookId",res.data.data.id)
      })
    },
    pushAddshare:function(){
      axios.post('http://jizhang-api-dev.it266.com/api/member/add?token='+localStorage.token,qs.stringify({
          book_id:localStorage.NewbookId,
          mobile:this.message
      }))
      .then((res)=>{
        Toast(res.data.data)
      })
    }
  },
  mounted() {
    this.getUserInfo();
    this.getAddbook()
  }
};
</script>

<style lang="less">
.addCenter {
  width: 100%;
  // height:100%;
  // border: 1px solid #000;
}
.addImg {
  width: 120px;
  height: 120px;
  margin-top: 100px;
  border-radius: 100%;
  border: 1px solid rgb(158, 153, 153);
}
.changeLoginUserDiv {
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
.my-create {
  border: 1px solid #000;
}

</style>
