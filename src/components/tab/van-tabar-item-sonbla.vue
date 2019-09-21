<template>
   <div class="van-tabbar-item-sonbla">
       <a><van-icon name="balance-list"></van-icon></a>
       <slot></slot>
   </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue';
import { Icon } from 'vant';

Vue.use(Icon);
export default {
   name: '',
   data() {
       return {}
   },
  components: {}
}
</script>

<style lang="less">
.van-tabbar-item-sonbla{
    line-height:1;
    margin-top: -20%;
}
.van-tabbar-item-sonbla a{
    display:block;
    color: #7d7e80;
    font-size: 26px;
}
.van-tabbar-item-sonbla span{
    color: #7d7e80;
    font-size: 14px;
}
</style>
