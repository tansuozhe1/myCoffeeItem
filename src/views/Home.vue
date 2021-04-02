<template>
  <div class="home">
    <!-- 搜索框 -->
    <div class="search-box">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        :clearable="true"
        clear-trigger="always"
        shape="round"
        @search="onSearch"
      >
        <template #left>
          <div class="search-left">
            <img src="../assets/images/location.png" alt="" />
            <div class="proCityMsg">{{ proCityMsg }}</div>
          </div>
        </template>
      </van-search>
    </div>
    <!-- 轮播图 -->
    <div class="banner">
      <van-swipe
       class="my-swipe"
       :autoplay="5000"
       indicator-color="white"
       :show-indicators="true"
       indicatorColor="#C7A76D"
       width="100px"
      >
        <van-swipe-item v-for="(val,i) in bannerData" :key="i+1" @click="clickBannerPic(val.pid)">
          <img :src="val.bannerImg" alt="">
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 热门推荐 -->
    <div class="hotRecommend">
      <!-- 标题 -->
      <div class="hot-top">
        <span>热 门 推 荐</span>
      </div>

      <!-- 产品 -->
      <div class="hot-product">
          <router-link class="items" v-for="(val,i) in hotRecommendData" :key="i+1" :to="{path:'/productDetail',query:{pid:val.pid}}">
            <img :src="val.smallImg" alt="">
            <div class="hotImg">
              <img src="../assets/images/hot-img.png" alt="">
            </div>
            <div class="productInfo">
              <div class="names">{{val.name}}</div>
              <div class="enname">{{val.enname}}</div>
              <div class="price">&yen;{{val.price}}</div>
            </div>
          </router-link>
      </div>

      <!-- 底部盒子 -->
      <div class="bottom-box">
        <span>~~没有更多了哦~~</span>
      </div>
    </div>
    
  </div>
</template>

<script>
import { location } from "../assets/js/location";
import "../assets/less/home.less";
export default {
  name: "Home",
  data() {
    return {
      value: "",
      locationInfo: {
        province: "",
        city: "",
      },
      proCityMsg: "正在获取定位",
      bannerData:[],
      hotRecommendData:[
        {
          name:"",
          enname:"",
          price:0,
          smallImg:"",
          pid:""
        }
      ]
    };
  },
  components: {},
  methods: {
    // 定位
    // getLocation() {
    //   let _that = this;
    //   let geolocation = location.initMap("map-container"); //定位
    //   AMap.event.addListener(geolocation, "complete", (result) => {
    //     console.log(result);
    //     // _that.lat = result.position.lat;
    //     // _that.lng = result.position.lng;
    //     _that.province = result.addressComponent.province;
    //     _that.city = result.addressComponent.city;
    //     // _that.district = result.addressComponent.district;
    //     if (result.info == "SUCCESS") {
    //       _that.proCityMsg = _that.province + _that.city;
    //       this.$cookies.set("location",_that.proCityMsg,"12h")
    //     }
    //   });
    // },
    //点击轮播图跳转到详情页
    clickBannerPic(pid){
      this.$router.push({
        name:"ProductDetail",
        query:{
          pid
        }
      })
    },
    onSearch() {
      console.log("删除");
    },
  },
  created(){
    // 轮播图
    this.$axios({
      method:"get",
      url:this.$axios.defaults.baseURL+"/banner",
      params:{
        appkey:this.appkey
      }
    }).then(data=>{
      this.bannerData = data.data.result;
    })

    // 热门推荐数据
    this.$axios({
      method:"get",
      url:this.$axios.defaults.baseURL+"/typeProducts",
      params:{
        appkey:this.appkey,
        key:"isHot",
        value:1
      }
    }).then(data=>{
      // console.log(data);
      this.hotRecommendData = data.data.result;
    })
    
  },
  mounted() {
    // if(this.$cookies.get("location")){
    //   this.proCityMsg = this.$cookies.get("location");
    // }else{
    //   this.getLocation();
    // }

  },
};
</script>
<style lang='less' scoped>
  @import "../assets/less/home.less";
</style>
