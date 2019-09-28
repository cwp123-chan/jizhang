<template>
  <div class="createBookkeepingM">
    <div class="createBookkeepingM-top"></div>
    <div class="createBookkeepingM-body">
      <van-cell-group>
        <van-field
          v-model="message1"
          label="记账金额:"
          type="textarea"
          placeholder="请输入记账金额"
          rows="1"
          autosize
        />
        <van-field
          v-model="message2"
          label="全付(分期):"
          type="textarea"
          placeholder="全额只需填写全部金额"
          rows="1"
          autosize
        />
        <van-field
          v-model="message3"
          label="交易对象:"
          type="textarea"
          placeholder="请输入交易对象"
          rows="1"
          autosize
        />
        <van-field
          v-model="message4"
          label="备注:"
          type="textarea"
          placeholder="输入需要备注内容"
          rows="1"
          autosize
        />
        <div class="payBook">
          <span>支付凭证:</span>
        </div>
        <div class="payBook">
          <div>
            <van-uploader v-model="fileList" :after-read="afterRead" multiple />
          </div>
        </div>
        <button @click="showPopup" class="createBookTime">
          {{data}}
          <span>
            <van-icon name="arrow-down" />
          </span>
        </button>
      </van-cell-group>

      <van-popup v-model="show" position="bottom" :style="{ height: '60%' }">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          @change="getColumnValue(currentDate)"
          @confirm="clickSucc(currentDate)"
          @cancel="disSucc"
        />
      </van-popup>
      <van-dropdown-menu>
        <van-dropdown-item v-model="value2" :options="option2" title-class="sasa" />
        <van-dropdown-item v-model="value1" :options="option1" />
        <van-dropdown-item v-model="value3" :options="option3" />
      </van-dropdown-menu>
    </div>
    <div class="createBookkeepingM-footer">
      <van-button type="primary" @click="addPushBook" v-if="pushshow">提交记账</van-button>
      <van-button type="primary" @click="noAddPushBook" v-if="btnshow">
        <van-loading type="spinner"></van-loading>
      </van-button>
    </div>
    <div class="jixiaqu">

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import qs from "qs";
const axios = require("axios");
import { Toast } from "vant";
import apiConfig from "../router/httpConfig.js";

import moment from "moment";
export default {
  name: "",
  data() {
    return {
      currentDate: new Date(),
      data: "选择时间",
      show: false,
      message1: "",
      message2: "",
      message3: "",
      message4: "",
      value1: "1",
      value2: 3,
      value3: "1",
      btnshow: false,
      pushshow: true,
      option1: [],
      option2: [{ text: "收入", value: 1 }, { text: "支出", value: 2 },{text:"请选择",value:3}],
      option3: [],
      fileList: [],
      PicKey: [],
      j: 0
    };
  },
  components: {},
  methods: {
    showPopup() {
      this.show = true;
    },

    addPushBook: function() {
      this.btnshow = true;
      this.pushshow = false;
      // console.log(this.value1, this.value2, this.value3);
      let imagesKey = "";
      for (let k = 0; k < this.PicKey.length; k++) {
        imagesKey += this.PicKey[k].key + ",";
      }
      axios
        .post(
          apiConfig.Newbookkeeping + "?token=" + localStorage.token,
          qs.stringify({
            total_money: this.message1,
            money: this.message2,
            account_id: this.value3,
            category_id: this.value1,
            date: this.data,
            company_name: this.message3,
            remark: this.message4,
            image_keys: imagesKey
          })
        )
        .then(res => {
          // console.log(res);
          if (res.data.code == 0) {
            Toast("添加成功");
            this.message1 = ''
            this.message2 = ''
            this.message3 = ''
            this.message4 = ''
            this.fileList = []
            this.btnshow = false;
            this.pushshow = true;
          } else {
            Toast(res.data.data);
            this.btnshow = false;
            this.pushshow = true;
          }
        })
        .catch((err)=>{
            Toast("添加失败");
            this.message1 = ''
            this.message2 = ''
            this.message3 = ''
            this.message4 = ''
            this.fileList = []
            this.btnshow = false;
            this.pushshow = true;          
        });
    },
    getColumnValue(index) {
      //  console.log(index)
      let strData = moment(index).format("YYYY-MM-DD");
      //  let newData = strData.split('')
      this.data = strData;
      // console.log(this.data);
    },
    clickSucc(index) {
      //  console.log(index)
      let strData = moment(index).format("YYYY-MM-DD");
      //  let newData = strData.split('')
      this.data = strData;
      // console.log(this.data);
      this.show = false;
    },
    disSucc() {
      this.show = false;
      this.data = "选择时间";
    },
    noAddPushBook() {
      Toast.loading({
        mask: true,
        message: '加载中...'
      });
    },
    afterRead(file) {
      // console.log(file);
      let params = new FormData();
      params.append("file", file.file);
      // console.log(params.get('file'));
      // console.log(file.file);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      axios
        .post(
          apiConfig.Pictureupload + "?token=" + localStorage.token,
          params,
          config
        )
        .then(res => {
          // console.log(res);
          if (res.data.data.file) {
            Toast("图片上传成功");
            this.PicKey[this.j] = { key: res.data.data.file.fileKey };
            this.j++;
            // console.log(this.PicKey);
          } else {
            Toast(res.data.data);
          }
        });
    }
  },
  watch: {
    value2: function(watchVal) {
      //   获取类别
      this.option1 = [];
      this.option3 = [];
      //   console.log(watchVal)
      axios
        .get(apiConfig.ExpenditureCategory + "?token=" + localStorage.token, {
          params: {
            type: watchVal,
            dataType: "1"
          }
        })
        .then(res => {
          // console.log(res);
          if (res.data.code == 0) {
            for (var i = 0; i < res.data.data.length; i++) {
              this.option1.push({
                text: res.data.data[i].name,
                value: res.data.data[i].id
              });
            }
            this.option1.push({ text: "请选择类别", value: "1" });
            //    console.log(this.option1)
          }
        });

      //   获取账户信息

      axios
        .get(apiConfig.AccessAccountInfo + "?token=" + localStorage.token)
        .then(response => {
          // console.log(response)
          for (var i = 0; i < response.data.data.length; i++) {
            this.option3.push({
              text: response.data.data[i].name,
              value: response.data.data[i].id
            });
          }
          this.option3.push({ text: "请选择账户", value: "1" });
          // console.log(this.option3)
        });
    }
  }
};
</script>

<style lang="less">
.createBookkeepingM-top {
  width: 100%;
}
.createBookkeepingM-body {
  width: 100%;
  // border: 1px solid #000;
}
// .createDiv{
//     // border-bottom: 1px solid #e8e8e8;
// }
.createBookkeepingM-footer {

  margin-top: 50px;
}
.createBookkeepingM .van-button--primary{
  color:rgb(236,89,89)
}
.createBookTime {
  display: flex;
  align-items: center;
  height: 45px;
  background-color: #fff;
  padding-left: 30px;
  width: 100%;
  border-style: none;
}
.createBookTime > span {
  margin-left: 70%;
}
.payBook {
  width: 100%;
  display: flex;
  align-items: center;
}
.payBook > div {
  margin-top: 10px;
  margin-left: 9%;
}
.payBook > span {
  margin-left: 7%;
}
.payBook .van-uploader__preview-delete {
  display: none;
}
.createBookkeepingM-footer .van-button--primary {
  width: 100px;
  background-color: white;
  border: 1px solid rgb(236,89,89);
}
.jixiaqu{
  width:100%;
  height:80px;
}
</style>
