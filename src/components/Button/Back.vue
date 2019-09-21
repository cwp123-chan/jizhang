<template>
  <div class="backitem">
    <van-tag mark type="danger" @click="goback" :style="styles">返回</van-tag>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "",
  data() {
    return {
      styles: {}
    };
  },
  components: {},
  methods: {
    goback: function() {
      this.styles = {
        // border: "1px solid red"
      };
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less">
.backitem > .van-tag--mark {
  border-radius: 0.8em 0 0 0.8em;
  position: fixed;
  top: 25px;
  left: 20px;
  width: 40px;
  background-color: rgb(114, 221, 81);
  border: 1px solid #fff;
  z-index: 999;
}
</style>
