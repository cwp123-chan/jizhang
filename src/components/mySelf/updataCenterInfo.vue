<template>
  <div class="updataCenterInfo">
    <back-item></back-item>
    <div class="updataCenterInfo-header">
      <span>信息设置</span>
    </div>
    <div class="PicBgColor">
      <van-image round width="10rem" height="10rem" :src="PicUrl" />
      <van-uploader :after-read="afterRead" @click="changePic" />
    </div>
    <div>
      <van-cell-group>
        <van-field
          v-model="message1"
          label="昵称"
          type="textarea"
          placeholder="请输入新的昵称"
          rows="1"
          autosize
        />
      </van-cell-group>
    </div>
    <div>
      <button class="pushUp" @click="pushUp">提交修改</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import backItem from "../Button/Back";
const axios = require("axios");
import qs from "qs";
import { Dialog } from "vant";
import { Toast } from "vant";
import moment from "moment";
export default {
  name: "",
  data() {
    return {
      message1: "",
      PicUrl: "",
      PicKey: ""
    };
  },
  methods: {
    getCenterInfo: function() {
      axios
        .get(
          "http://jizhang-api-dev.it266.com/api/user/profile?token=" +
            localStorage.token
        )
        .then(res => {
          this.PicUrl = res.data.data.avatar_url;
        });
    },
    changePic: function() {
      console.log("sads");
    },
    afterRead(file) {
      let params = new FormData();
      params.append("file", file.file);
      let config = {
        header: {
          "Content-Type": "multipart/form-data"
        }
      };
      axios
        .post(
          "http://jizhang-api-dev.it266.com/api/upload/image?token=" +
            localStorage.token,
          params,
          config
        )
        .then(res => {
        //   console.log(res);
          this.PicKey = res.data.data.file.fileKey;
          this.PicUrl = res.data.data.file.thumbnailUrl._temp;
        });
    },
    pushUp: function() {
      axios
        .post(
          "http://jizhang-api-dev.it266.com/api/user/profile/update?token=" +
            localStorage.token,
          qs.stringify({
            nickname: this.message1,
            avatar: this.PicKey
          })
        )
        .then(res => {
          if (res.data.code == 0) {
            Toast(res.data.data);
            axios
              .get(
                "http://jizhang-api-dev.it266.com/api/user/profile?token=" +
                  localStorage.token
              )
              .then(res => {
                this.PicUrl = res.data.data.avatar_url;
              });
          } else {
            Toast("修改失败,请重试");
          }
        });
    }
  },
  components: {
    backItem
  },
  mounted() {
    this.getCenterInfo();
  }
};
</script>

<style lang="less">
.updataCenterInfo-header {
  width: 100%;
  height: 48px;
  background-color: orange;
}
.updataCenterInfo .van-tag--mark {
  top: 15px !important;
}
.updataCenterInfo-header {
  width: 100%;
  height: 48px;
  background-color: orange;
  color: white;
  font-size: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.PicBgColor {
  width: 100%;
  background-color: #fff;
}
.PicBgColor > .van-image--round {
  margin-left: 103px;
  margin-top: 30px;
}
.PicBgColor > .van-uploader {
  top: -30px !important;
  left: -134px !important;
  // visibility: hidden;
}
.PicBgColor .van-uploader__upload {
  background-color: rgba(0, 0, 0, 0) !important;
  border: 0px solid #000;
  width: 100px;
  height: 100px;
}
.PicBgColor .van-icon {
  display: none;
}
.pushUp {
  margin-top: 40px;
  width: 70%;
  height: 35px;
  border-style: none;
  background-color: orange;
  color: white;
  font-size: 18px;
  border-radius: 20px;
}
</style>
