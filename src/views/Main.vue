<template>
  <div class="main">
    <div>
      <router-view></router-view>
    </div>

    <van-tabbar active-color="#cda462" inactive-color="#75613e" route >
      <van-tabbar-item
        v-for="(val, i) in bottomNavInfo"
        :key="i + 1"
        :to="val.to"
        :badge="val.shopbagNum > 0 ? val.shopbagNum:''"
      >
        <span>{{ val.title }}</span>
        <template #icon="props">
          <img :src="props.active ? val.icon.active : val.icon.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import "../assets/less/main.less";
import {mapState,mapMutations} from "vuex"

export default {
  name: "Main",
  data() {
    return {
    };
  },
  created() {
    this.firstEnterShopbagStatus();
  },
  methods: {
    aa(v){
      console.log(v);
    },
    // 首次进入该页面时，判断购物袋是否有商品，如果有图标高亮和显示个数
    firstEnterShopbagStatus() {
      let needToken = this.$cookies.get("loginReturnToken");
      if (!needToken) {
        return;
      }

      this.$toast.loading({
        message: "加载中...",
        duration: 0,
        forbidClick: true,
      });

      this.$axios({
        method: "get",
        url: this.$axios.defaults.baseURL + "/shopcartRows",
        params: {
          appkey: this.appkey,
          tokenString: needToken,
        },
      })
        .then((data) => {
          this.$toast.clear();
          if (data.data.code == 8000) {
            this.changeShopbagNum(data.data.result);
          } else {
            this.$toast({
              message: data.data.msg,
              forbidClick: true,
              duration: "3000",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    ...mapMutations(['changeShopbagNum','changeIsPicActiveShow']),
  },
  computed:{
    ...mapState(['shopbagNumbers','isPicActiveShow']),
    bottomNavInfo(){
        return [
        {
          title: "首页",
          icon: {
            active: require("../assets/images/home-active.png"),
            inactive: require("../assets/images/home.png"),
          },
          to: "/",
        },
        {
          title: "分类",
          icon: {
            active: require("../assets/images/class-active.png"),
            inactive: require("../assets/images/class.png"),
          },
          to: "/class",
        },
        {
          title: "购物袋",
          icon: {
            active: require("../assets/images/shopbag-active.png"),
            // inactive: this.isPicActiveShow ? require("../assets/images/shopbag-active.png"):require("../assets/images/shopbag.png"),
            inactive: require("../assets/images/shopbag.png"),
          },
          to: "/shopbag",
          shopbagNum:this.shopbagNumbers
        },
        {
          title: "我的",
          icon: {
            active: require("../assets/images/me-active.png"),
            inactive: require("../assets/images/me.png"),
          },
          to: "/me",
        },
      ]
    } 
  },
 
};
</script>
<style lang='less' scoped>
  @import "../assets/less/main.less";
</style>
