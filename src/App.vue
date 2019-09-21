<template>
  <div id="app">
    <router-view/>
    
    <van-tabbar v-model="active" active-color="#07c160" inactive-color="#999999" route  >
            <van-tabbar-item icon="clock" @click = "refresh">统计</van-tabbar-item>
            <div class="xianzhi">
            <van-tabbar-item icon="balance-list" v-if = "balanceShow" replace to="/balance">
            账单
            </van-tabbar-item>
            
            <transition name="van-slide-up" leave-class="fade-in-enter" leave-active-class="fade-in-active">
                  <van-tabbar-item-son v-if = "addShow" ></van-tabbar-item-son>
            </transition>
            </div>
            <van-tabbar-item icon="manager" replace to="/myself">我的</van-tabbar-item>
    </van-tabbar>
   
  </div>
</template>

<script>
import vanTabbarItemSon from './components/tab/van-tabbar-item-son'
import backItem from './components/Button/Back'

export default {
  components:{
    vanTabbarItemSon,
    backItem

  },
  name: 'App',
  data(){
    return{
        active:0
    }
  },
  methods:{
    refresh(){
      this.$router.push('/home')
    }
  },
  computed:{
    balanceShow(){
      if(this.$route.name == "balance"){
        return false
      }else{
        return true
      }
    },
    addShow(){
      if(this.$route.name == "balance"){
        return true
      }else{
        return false
      }
    }
    
    
  }
  
}
</script>

<style>
#app {
  font-family:Arial,"PingFang SC","Hiragino Sans GB",STHeiti,"Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
  margin: 0;
}
.van-tabbar-item__icon{
    font-size: 26px;
}

.fade-in-enter, .fade-in-active {
  opacity: 0
}
.van-tabbar-item{
  width:33%;
}
.xianzhi{
  width:33%;
  
}
.xianzhi>.van-tabbar-item{
  margin-left: 30%;
  margin-top: 6%;
}
.van-tabbar-item-son{
  position:absolute;
  margin-left: 35px;

}



</style>
