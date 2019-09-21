<template>
  <div class="Balance-index">
    <div class="Balance-tixed">
      <div class="balance-username" @click="showPopup">
        <van-icon name="records" />
        <span class="username-span">账薄:{{thisAccount}}</span>
      </div>
    </div>
    <slot></slot>
    <van-popup v-model="show" position="top" :style="{ height: '30%' }">
      <van-swipe-cell :on-close="onClose" v-for="book in accountBook" :key="book.id">
        <template slot="left">
          <van-button square type="primary" text="修改" @click=" updataAccount(book) " />
        </template>

        <van-cell
          :border="false"
          :value="book.name"
          @click="changeAccountBook(book)"
          :style="changeStyle"
        />

        <template slot="right">
          <van-button square type="danger" text="删除" @click=" delAccount(book) " />
        </template>
      </van-swipe-cell>
      <div class="createNewBookBtn">
        <van-button type="primary" size="normal" @click="CreateAccountBook">创建新的账簿</van-button>
      </div>
    </van-popup>
    <div class="popup-div">
      <van-popup v-model="letShow">
        <van-cell-group>
          <van-field
            v-model="messageInfo"
            label="修改账簿名称"
            type="text"
            placeholder="请输入账簿名称"
            rows="1"
            autosize
          />
        </van-cell-group>

        <div class="popup-div-btn">
          <van-button type="primary" size="small" @click="pushUpdata">提交修改</van-button>
          <van-button type="primary" size="small" @click="passUpdata">放弃修改</van-button>
        </div>
      </van-popup>
    </div>
    <div class="popup-div2">
      <van-popup v-model="CreateShow">
        <van-cell-group>
          <van-field
            v-model="CreateInfo"
            label="添加新账簿"
            type="text"
            placeholder="请输入新账簿名称"
            rows="1"
            autosize
          />
        </van-cell-group>

        <div class="popup-div-btn">
          <van-button type="primary" size="small" @click="pushCreate">开始创建</van-button>
          <van-button type="primary" size="small" @click="passCreate">放弃创建</van-button>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import qs from "qs";
const axios = require("axios");
import { Dialog } from "vant";
import { Toast } from "vant";
import moment from "moment";
export default {
  name: "",
  data() {
    return {
      letShow: false,
      show: false,
      CreateShow: false,
      changeStyle: {
        borderBottom: "1px solid #e8e8e8"
      },
      accountBook: [],
      thisAccount: "",
      messageInfo: "",
      CreateInfo: ""
    };
  },
  components: {},
  methods: {
    showPopup() {
      this.show = true;
      axios
        .get(
          "http://jizhang-api-dev.it266.com/api/book?token=" +
            localStorage.token
        )
        .then(res => {
          this.accountBook = res.data.data;
        });
      axios
        .get(
          "http://jizhang-api-dev.it266.com/api/book/get-default?token=" +
            localStorage.token
        )
        .then(response => {
          //   console.log(response)
          this.thisAccount = response.data.data.name;
        });
    },
    changeAccountBook: function(book) {
      //    console.log(book)
      Dialog.confirm({
        message: "确认切换到该账簿?"
      })
        .then(() => {
          axios
            .post(
              "http://jizhang-api-dev.it266.com/api/book/set-default?token=" +
                localStorage.token,
              qs.stringify({
                book_id: book.id
              })
            )
            .then(res => {
              Toast(res.data.data);
              this.$router.go(0);
              this.show = false;
            });
          this.show = false;
        })
        .catch(() => {
          this.show = false;
        });
    },
    //   获取所有漳浦
    getAccountBook: function() {
      axios
        .get(
          "http://jizhang-api-dev.it266.com/api/book?token=" +
            localStorage.token
        )
        .then(res => {
          this.accountBook = res.data.data;
        });
      axios
        .get(
          "http://jizhang-api-dev.it266.com/api/book/get-default?token=" +
            localStorage.token
        )
        .then(response => {
          //   console.log(response)
          this.thisAccount = response.data.data.name;
        });
    },
    //   删除账簿
    delAccount: function(delbook) {
      Dialog.confirm({
        message: "确认删除该账簿?"
      })
        .then(() => {
          axios
            .post(
              "http://jizhang-api-dev.it266.com/api/book/delete?token=" +
                localStorage.token,
              qs.stringify({
                book_id: delbook.id
              })
            )
            .then(res => {
              if (res.data.data == null) {
                Toast("删除成功");
              } else {
                Toast(res.data.data);
              }
              // 重新刷新页面
              axios
                .get(
                  "http://jizhang-api-dev.it266.com/api/book/get-default?token=" +
                    localStorage.token
                )
                .then(response => {
                  //   console.log(response)
                  this.thisAccount = response.data.data.name;
                });
            });
          this.show = false;
        })
        .catch(() => {
          this.show = false;
        });
    },
    //   修改账簿
    updataAccount: function(upbook) {
      this.letShow = true;
      this.show = false;
      //    console.log(upbook)
      localStorage.setItem("upBookId", upbook.id);
      //    console.log(localStorage)
    },
    pushUpdata: function() {
      axios
        .post(
          "http://jizhang-api-dev.it266.com/api/book/update?token=" +
            localStorage.token,
          qs.stringify({
            book_id: localStorage.upBookId,
            book_name: this.messageInfo
          })
        )
        .then(res => {
          // console.log(res)
          if (res.data.data == null) {
            Toast("修改成功");
          } else {
            Toast(res.data.data);
          }
          // 重新刷新页面
          axios
            .get(
              "http://jizhang-api-dev.it266.com/api/book/get-default?token=" +
                localStorage.token
            )
            .then(response => {
              //   console.log(response)
              this.thisAccount = response.data.data.name;
            });
          this.letShow = false;
        })
        .catch(() => {
          Toast("修改失败");
          this.letShow = false;
        });
      this.letShow = false;
    },
    passUpdata: function() {
      this.letShow = false;
    },
    //   创建漳浦
    CreateAccountBook: function() {
      this.CreateShow = true;
    },
    pushCreate: function() {
      console.log(this.CreateInfo);
      axios
        .post(
          "http://jizhang-api-dev.it266.com/api/book/create?token=" +
            localStorage.token,
          qs.stringify({
            name: this.CreateInfo
          })
        )
        .then(res => {
          if (res.data.code == 0) {
            Toast("创建成功");
            this.CreateShow = false;
            this.show = false;
          } else {
            Toast(res.data.data);
            this.CreateShow = false;
            this.show = false;
          }
          // console.log(res)
          // 重新刷新页面
          axios
            .get(
              "http://jizhang-api-dev.it266.com/api/book/get-default?token=" +
                localStorage.token
            )
            .then(response => {
              //   console.log(response)
              this.thisAccount = response.data.data.name;
            });
        })
        .catch(() => {
          Toast("服务器响应失败,请稍后重试");
          this.CreateShow = false;
          this.show = false;
        });
    },
    passCreate: function() {
      this.CreateShow = false;
    },
    onClose(clickPosition, instance) {}
  },
  mounted() {
    this.getAccountBook();
  }
};
</script>

<style lang="less">
.Balance-tixed {
  // position:fixed;
  // top:0px;
  margin-top: -41px;
  width: 100%;
  height: 100px;
  background-color: orange;
}
.balance-username {
  display: flex;
  color: white;
  font-size: 18px;
  // font-weight: bold;
  margin-top: 5%;
  padding-top: 10%;
  border-radius: 10px;
  align-items: center;
  height: 40px;
  margin-left: -20%;
  padding-left: 10%;
  justify-content: center;
}

.balance-outfo-info {
  margin-left: 30%;

  // margin-left:-43%;
  // margin-top: 10%;
}
.balance-outfo-info > span:nth-of-type(1) {
  position: absolute;
  display: block;
  display: flex;
  align-items: center;
  font-size: 36px;
  color: white;
  // border: 1px solid #000;
  // font-weight: bold;
  margin-left: -95px;
}
.balance-outfo-info > span:nth-of-type(2) {
  position: absolute;
  font-size: 18px;
  margin-left: -95px;
  color: white;
  margin-top: 40px;

  // margin-left:-75%;
}
.balance-outfo-down {
  color: white;
  font-size: 18px;
  margin-left: -35%;
  margin-top: 33%;
}
.balance-username > .van-icon {
  margin-left: 10%;
}
.popup-div > .van-popup--center {
  width: 300px;
  height: 100px;
}
.popup-div-btn {
  margin-top: 20px;
}
.createNewBookBtn {
  margin-top: 50px;
}

.popup-div2 > .van-popup--center {
  width: 300px;
  height: 100px;
}
.popup-div2 > .van-field__label {
  width: 144px !important;
}
</style>
