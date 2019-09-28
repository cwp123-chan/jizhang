<template>
  <div class="addCenter">
    <!-- <button @click="test">检测</button> -->
    <img :src="UserPic" alt class="addImg" @click="changeCenterInfo" v-if="picshow" />
    <img
      src="../../assets/missPic.png"
      alt
      class="addImgs"
      @click="changeCenterInfo"
      v-if="nopicshow"
    />
    <add-center-input>
      <add-center-input-item>
        <span slot="addCenter-input" @click="showUsername">HI: <span>{{Username}}</span> </span>
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
import apiConfig from "../../router/httpConfig";
import moment from "moment";
import qs from "qs";
import { Dialog } from "vant";
import { Toast } from "vant";
import { Notify } from 'vant';
// import { moment } from "../../../node_modules/moment";
export default {
  name: "",
  data() {
    return {
      Username: "",
      UserPic: "",
      show: false,
      message: "",
      picshow: true,
      nopicshow: false,
      theshowName:'',
      nameMsg:''
    };
  },
  components: {
    addCenterInputItem,
    addCenterInput,
    moment
  },
  methods: {
    exchangeUser: function() {
      Dialog.confirm({
        message: "确认切换用户?"
      })
        .then(() => {
          axios
            .get(apiConfig.Cancellation + "?token=" + localStorage.token)
            .then(res => {
              // console.log(res);
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
      this.picshow = false;
      this.nopicshow = true;
      axios
        .get(apiConfig.PersonalInfo + "?token=" + localStorage.token)
        .then(res => {
          this.Username = res.data.data.nickname;
          // console.log(res);
          this.UserPic = res.data.data.avatar_url;
          this.picshow = true;
          this.nopicshow = false;
        });
    },
    changeCenterInfo: function() {
      this.$router.push("/updataCenterInfo");
    },
    addShareBook: function() {
      this.show = true;
    },
    WatchShareBook: function() {
      this.$router.push("/WatchShareBook");
    },
    getAddbook: function() {
      axios
        .get(apiConfig.GetCurrentAccountBook + "?token=" + localStorage.token)
        .then(res => {
          // console.log(localStorage)
          // 获取当前账簿id
          localStorage.setItem("NewbookId", res.data.data.id);
        });
    },
    pushAddshare: function() {
      axios
        .post(
          apiConfig.InviteAdditionalBookk + "?token=" + localStorage.token,
          qs.stringify({
            book_id: localStorage.NewbookId,
            mobile: this.message
          })
        )
        .then(res => {
          Toast(res.data.data);
        });
    },
    showUsername:function(){
      let data = new Date()
      let localtimes = moment(data).format('HH')
      // console.log(localtimes)
      if(localtimes>=7 && localtimes <= 11){
        this.nameMsg = '上午好!'+this.Username
        // console.log('上午好!'+this.Username)
      }else if(localtimes > 11 && localtimes <=13){
        this.nameMsg = '午餐时间到了,快去吧!'+this.Username

        // console.log('午餐时间到了,快去吧!'+this.Username)
      }else if(localtimes > 13 && localtimes <=18){
        this.nameMsg = '下午好!'+this.Username
        // console.log('下午好!'+this.Username)
      }else if(localtimes > 18 && localtimes <=20){
         this.nameMsg = '晚餐时间到了,慢慢享用吧!'+this.Username
        // console.log('晚餐时间到了,慢慢享用吧!'+this.Username)
      }else if(localtimes >20 && localtimes <= 23){
        this.nameMsg = '忙碌了一天,也该好好休息了!'+this.Username
        // console.log('忙碌了一天,也该好好休息了!'+this.Username)
      }else if(localtimes >23 || localtimes >= 0 && localtimes < 6){
        this.nameMsg = '夜深了,晚安!'+this.Username
        // console.log('夜深了,晚安!'+this.Username)
      }else if(localtimes >=6 && localtimes < 7){
        this.nameMsg = '早安!'+ this.Username
        // console.log('早安!'+ this.Username)
      }

      Notify({ type: 'danger', message: this.nameMsg });
    }
  },
  mounted() {
    this.getUserInfo();
    this.getAddbook();
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
  width: 100px;
  height: 100px;
  margin-top: 15%;
  border-radius: 100%;
  border: 2px solid #ec5959;
  box-shadow: 0px 0px 1px 1px #ec5959;
}
.addImgs {
  width: 100px;
  height: 100px;
  margin-top: 100px;
  border-radius: 100%;
  border: 1px solid rgb(158, 153, 153);
}
.changeLoginUserDiv {
  border-style: none;
  margin-top: 30px;
  width: 90%;
  height: 40px;
  font-size: 20px;
  // font-weight: bold;
  color: white;
  // background-color: orange;
  // background-color: rgba(238, 117, 69, 0.87);
  background-color: rgb(236, 89, 89);

  border-radius: 30px;
}
.my-create {
  border: 1px solid #000;
}
</style>
