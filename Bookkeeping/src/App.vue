<template>
  <div id="app"  >
    <router-view />

    <van-tabbar v-model="active" inactive-color="#999999" active-color="#orange" route v-show="lessshow">
      <van-tabbar-item icon="clock" @click="refresh">统计</van-tabbar-item>
      <div class="xianzhi">
        <van-tabbar-item icon="balance-list" v-if="balanceShow" replace to="/balance">账单</van-tabbar-item>

        <transition
          name="van-slide-up"
          leave-class="fade-in-enter"
          leave-active-class="fade-in-active"
        >
          <van-tabbar-item-son v-if="addShow"></van-tabbar-item-son>
        </transition>
      </div>
      <van-tabbar-item icon="manager" replace to="/myself">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import vanTabbarItemSon from "./components/tab/van-tabbar-item-son";
import backItem from "./components/Button/Back";

export default {
  components: {
    vanTabbarItemSon,
    backItem
  },
  name: "App",
  data() {
    return {
      active: 0,
      lessshow:true,
    };
  },
  methods: {
    refresh() {
      this.$router.push("/home");
    },
    getscoll() {
      let scrollTop;
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
      } else if (document.body) {
        scrollTop = document.body.scrollTop; // 获取 滚动条距顶部高度
      }

      var docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      // 获取文档所有数据高度
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;

      // console.log(localStorage)
    },
    show() {
      if (!localStorage.token) {
        this.$router.push("/myself");
        return false;
      }
    }
    
  },
  computed: {
    balanceShow() {
      if (this.$route.name == "balance") {
        return false;
      } else {
        return true;
      }
    },
    addShow() {
      if (this.$route.name == "balance") {
        return true;
      } else {
        return false;
      }
    },
    changeshow(msg){
      console.log(msg)
    }
  },
  mounted() {
    this.getscoll();
    // this.show();
  }
};
</script>

<style>
#app {
  font-family: Arial, "PingFang SC", "Hiragino Sans GB", STHeiti,
    "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
  margin: 0;
}
.van-tabbar-item__icon {
  font-size: 26px;
}

.fade-in-enter,
.fade-in-active {
  opacity: 0;
}
.van-tabbar-item {
  width: 33%;
}
.xianzhi {
  width: 30%;
}
.xianzhi > .van-tabbar-item {
  margin-left: 30%;
  margin-top: 3%;
}
.van-tabbar-item-son {
  position: absolute;
  margin-left: 35px;
}
.van-tabbar-item--active {
  color: #ec5959 !important;
}
</style>
