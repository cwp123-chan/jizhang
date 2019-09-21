<template>
   <div class="van-tabbar-item-son" @click="activeAddBook">
       <van-icon name="add" />
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
  components: {},
  methods:{
    activeAddBook:function(){
      console.log('asasas')
      this.$router.push('/addBookkeeping')
    }
  }
}
</script>

<style lang="less">
.van-tabbar-item-son{

    color:orange;
    // width: 33%;
    display:flex;
    align-items:center;
    z-index:999;
    margin-top: -15px;
    justify-content: center;
    font-size: 50px;

}
</style>
