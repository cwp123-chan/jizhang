<template>
  <div class>

    <div class="editInfo">
            <back-item></back-item>

      <div>
        <span>安全中心</span>
      </div>
    </div>
    <div class="editInfo-password-div">
      <button class="editInfo-editPassword" @click="editPassword">
        <span>
          <van-icon name="lock" color="orange" size="30px" />
          <span>修改密码</span>
        </span>
        <span>
          <van-icon name="arrow" />
        </span>
      </button>
    </div>
    <div class="editInfo-password-div">
      <button class="editInfo-editPassword" @click="editMobile">
        <span>
          <van-icon name="phone-circle" color="orange" size="30px" />
          <span>修改手机</span>
        </span>
        <span>
          <van-icon name="arrow" />
        </span>
      </button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import backItem from '../Button/Back'

export default {
  name: "",
  data() {
    return {};
  },
  components: {
      backItem
  },
  methods: {
    editPassword: function() {
      this.$router.push("/editPassword");
    },
    editMobile:function(){
        this.$router.push("/editMobile")
    }
  }
};
</script>

<style lang="less">
.editInfo {
  width: 100%;
  height: 48px;
  background-color: orange;
  color: white;
  font-size: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.editInfo-password-div {
  margin-top: 10px;
}
.editInfo-editPassword {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
  border-style: white;
  border: 1px solid transparent; //自定义边框
  // outline: none;    //消除默认点击蓝色边框效果
  background-color: rgb(250, 250, 250);
}
.editInfo-editPassword > span:nth-of-type(2) {
  margin-top: 5px;
  margin-left: 70%;
}
.editInfo-editPassword > span {
  display: flex;
  justify-content: center;
  align-items: center;
}
.editInfo .van-tag--mark{
    top:15px !important;
}
</style>
