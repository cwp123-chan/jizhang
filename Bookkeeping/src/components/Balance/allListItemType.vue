<template>
  <div class="lastMoney-span" slot="allListItemType">
    <span v-if="item.type == '1'">
      +{{item.total_money}}
      <!-- <van-icon name="arrow" /> -->
    </span>
    <span v-if="item.type == '2'">
      -{{item.total_money}}
      <!-- <van-icon name="arrow" /> -->
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
    props:{
        item:Object
    },
  name: "",
  data() {
    return {};
  },
  components: {}
};
</script>

<style lang="less">
</style>

