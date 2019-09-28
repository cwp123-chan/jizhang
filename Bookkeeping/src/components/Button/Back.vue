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
      this.$router.go('-1');
    }
  }
};
</script>

<style lang="less">
.backitem > .van-tag--mark {
  border-radius: 0.8em 0 0 0.8em;
  position: fixed;
  top: 4.5%;
  left: 20px;
  width: 40px;
  // background-color: orange;
  // background-color: rgb(236, 210, 137);
  background-color: rgb(236, 89, 89);

  border: .5px solid white;
  // z-index: 99;
}
</style>
