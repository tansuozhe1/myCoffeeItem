<template>
  <div class="productDetail">
    <!-- 顶部导航 -->
    <van-nav-bar
      title="商品详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <!-- 大图片 -->
    <div class="bigImg">
      <img :src="productData.largeImg" alt="" />
    </div>

    <!-- 购物按钮 -->
    <div class="shopBtn">
      <div class="left">
        <div class="top">{{ productData.name }}({{ productData.enname }})</div>
        <div class="bottom">&yen;{{ productData.price }}</div>
      </div>
      <!-- 加减按钮 -->
      <div class="shopping" v-show="isBtnShow" @click="btnTransform">
        <span>购买</span>
      </div>
      <div class="right" v-show="!isBtnShow">
        <div class="minusBtn" @click="addClick">-</div>
        <div class="ipt">
          <input
            type="text"
            value="1"
            @input="changeNum"
            v-model="currentNumber"
          />
        </div>
        <div class="addsBtn" @click="addClick">+</div>
      </div>
    </div>

    <!-- 商品信息 -->
    <div class="productInfo">
      <div class="title">商品信息</div>
      <div class="productDesc">{{ productData.desc[0] }}</div>
      <div class="step">{{ productData.desc[1] }}</div>
    </div>
    <!-- 免责提示 -->
    <div class="tips">
      <div class="title">友情提示</div>
      <div class="impunity">{{ productData.desc[2] }}</div>
      <div class="suggest">{{ productData.desc[3] }}</div>
    </div>

    <!-- 弹出层 -->
    <!-- <div class="popupEle"></div> -->
    <van-popup
      v-model="isPopup"
      position="bottom"
      round
      :style="{ height: '50%' }"
      closeable
      :overlay="false"
    >
      <!-- 弹出层的商品信息 -->
      <div class="content">
        <img :src="productData.smallImg" alt="" />
        <div class="shoppingMsg">
          <div class="top">
            {{ productData.name }}
          </div>
          <div class="englishName">{{ productData.enname }}</div>
          <div class="bottom">&yen;{{ productData.price }}</div>
        </div>
      </div>
      <!-- 温度选择 -->
      <div
        class="typeSelect"
        v-if="productData.temData.tem.length != 0 ? true : false"
      >
        <div class="seleHeader">{{ productData.temData.tem_desc }}</div>
        <div class="content-box">
          <div
            class="selects"
            :class="{ active: temCurrentIndex == i ? true : false }"
            @click="temEvent(i)"
            v-for="(val, i) in productData.temData.tem"
            :key="i + 1"
          >
            {{ val }}
          </div>
        </div>
      </div>
      <!-- 甜度选择 -->
      <div
        class="typeSelect"
        v-if="productData.sugarData.sugar.length != 0 ? true : false"
      >
        <div class="seleHeader">{{ productData.sugarData.sugar_desc }}</div>
        <div class="content-box">
          <div
            class="selects"
            :class="{ active: sugarCurrentIndex == i ? true : false }"
            @click="sugarEvent(i)"
            v-for="(val, i) in productData.sugarData.sugar"
            :key="i + 1"
          >
            {{ val }}
          </div>
        </div>
      </div>
      <!-- 奶油选择 -->
      <div
        class="typeSelect"
        v-if="productData.creamData.cream.length != 0 ? true : false"
      >
        <div class="seleHeader">{{ productData.creamData.cream_desc }}</div>
        <div class="content-box">
          <div
            class="selects"
            :class="{ active: creamCurrentIndex == i ? true : false }"
            @click="creamEvent(i)"
            v-for="(val, i) in productData.creamData.cream"
            :key="i + 1"
          >
            {{ val }}
          </div>
        </div>
      </div>
      <!-- 奶选择 -->
      <div
        class="typeSelect"
        v-if="productData.milkData.milk.length != 0 ? true : false"
      >
        <div class="seleHeader">{{ productData.milkData.milk_desc }}</div>
        <div class="content-box">
          <div
            class="selects"
            :class="{ active: milkCurrentIndex == i ? true : false }"
            @click="milkEvent(i)"
            v-for="(val, i) in productData.milkData.milk"
            :key="i + 1"
          >
            {{ val }}
          </div>
        </div>
      </div>

      <!-- 购买数量 -->
      <div class="buyNumber">
        <div class="left">选择数量</div>
        <!-- 加减按钮 -->
        <div class="right">
          <div class="minusBtn" @click="numberMinu">-</div>
          <div class="ipt">
            <input
              type="text"
              value="1"
              @input="changeNum"
              v-model="currentNumber"
            />
          </div>
          <div class="addsBtn" @click="numberAdd">+</div>
        </div>
      </div>

      <!-- 确定按钮 -->
      <div class="sureBtn">
        <van-button color="#ecb041" block round @click="clickSureBtn">确 定</van-button>
      </div>
    </van-popup>

    <!-- 收藏、购物车 -->
      <van-goods-action>
        <van-goods-action-icon class='img' :badge="shopbagNumbers > 0 ? shopbagNumbers:''" text="购物袋" @click="goToShopbag">
          <template #icon>
            <img :src="isPicActiveShow ? require('../assets/images/shopbag-active.png'):require('../assets/images/shopbag.png')" 
            alt="" :style="{display:'block',width:'20px',height:'20px'}">
          </template>
        </van-goods-action-icon>
        <van-goods-action-icon icon="star" :text="isCollect ? '已收藏' : '收藏'" :color="isCollect ? '#cda462':'#75613e'" @click="collectProduct"/>
        <van-goods-action-button color="#ebbd66" text="加入购物袋" @click="addShopbag"/>
        <van-goods-action-button color="#ecb041" text="立即购买" />
      </van-goods-action>
  </div>
</template>
<script>
import "../assets/less/product-detail.less";
import {mapState,mapMutations} from "vuex"
export default {
  name: "ProductDetail",
  data() {
    return {
      currentNumber: 1,
      pid: "",
      temCurrentIndex: 0,
      sugarCurrentIndex: 0,
      milkCurrentIndex: 0,
      creamCurrentIndex: 0,
      productData: {
        name: "",
        enname: "",
        price:0,
        type: "",
        type_desc: "",
        desc: [],
        largeImg: "",
        smallImg: "",
        sugarData: {
          sugar_desc: "",
          sugar: [],
        },
        temData: {
          tem_desc: "",
          tem: [],
        },
        milkData: {
          milk_desc: "",
          milk: [],
        },
        creamData: {
          cream_desc: "",
          cream: [],
        },
      },
      isBtnShow: true,
      isPopup: false,
      isCollect:false,
    };
  },
  created() {
    this.pid = this.$route.query.pid;

    this.$axios({
      method: "get",
      url: this.$axios.defaults.baseURL + "/productDetail",
      params: {
        appkey: this.appkey,
        pid: this.pid,
      },
    }).then((data) => {
      // console.log(data);
      let dataInfo = data.data.result[0];
      let formatDesc = dataInfo.desc.split("。");
      formatDesc.pop();

      //调用方法格式化糖的描述数据
      let sugarReturn = this.formatProductDesc(
        dataInfo.sugar,
        dataInfo.sugar_desc,
        "sugarData",
        "sugar",
        "sugar_desc"
      );

      //调用方法格式化温度的描述数据
      let temReturn = this.formatProductDesc(
        dataInfo.tem,
        dataInfo.tem_desc,
        "temData",
        "tem",
        "tem_desc"
      );

      //调用方法格式化奶油的描述数据
      let creamReturn = this.formatProductDesc(
        dataInfo.cream,
        dataInfo.cream_desc,
        "creamData",
        "cream",
        "cream_desc"
      );

      //调用方法格式化奶的描述数据
      let milkReturn = this.formatProductDesc(
        dataInfo.milk,
        dataInfo.milk_desc,
        "milkData",
        "milk",
        "milk_desc"
      );

      this.productData = {
        name: dataInfo.name,
        enname: dataInfo.enname,
        price:dataInfo.price,
        type: dataInfo.type,
        type_desc: dataInfo.type_desc,
        desc: formatDesc,
        largeImg: dataInfo.large_img,
        smallImg: dataInfo.small_img,
        sugarData: sugarReturn,
        temData: temReturn,
        milkData: milkReturn,
        creamData: creamReturn,
      };
      //   console.log(this.productData);
    });

    //进入页面是判断是否登录，从而决定是否点亮收藏图标
    this.checkIsCollect();

    //进入页面是判断是否登录，从而决定是否点亮购物袋图标
    this.firstEnterShopbagStatus();
  },
  methods: {
    //点击返回图标返回上一级
    onClickLeft() {
      this.changeIsPicActiveShow(false);
      this.$router.go(-1);
    },
    temEvent(num) {
      if (this.temCurrentIndex == num) {
        return;
      } else {
        this.temCurrentIndex = num;
      }
    },
    milkEvent(num) {
      if (this.milkCurrentIndex == num) {
        return;
      } else {
        this.milkCurrentIndex = num;
      }
    },
    sugarEvent(num) {
      if (this.sugarCurrentIndex == num) {
        return;
      } else {
        this.sugarCurrentIndex = num;
      }
    },
    creamEvent(num) {
      if (this.creamCurrentIndex == num) {
        return;
      } else {
        this.creamCurrentIndex = num;
      }
    },
    formatProductDesc(sele, sele_desc, a, b, c) {
      let names = a;
      let propertyOne = b;
      let propertyTwo = c;
      names = {};
      names[propertyTwo] = sele_desc;
      if (!sele) {
        names[propertyOne] = [];
      } else {
        names[propertyOne] = sele.split("/");
      }
      return names;
    },
    btnTransform() {
      this.isBtnShow = false;
      this.isPopup = true;
    },
    addClick() {
      this.isPopup = true;
    },
    numberAdd() {
      this.currentNumber++;
    },
    numberMinu() {
      if (this.currentNumber <= 1) {
        return;
      }
      this.currentNumber--;
    },
    changeNum(e) {
      let values = e.target.value;
      let reg = /^[1-9]\d*$/;
      console.log();
      if (reg.test(values)) {
        this.currentNumber = values;
      } else {
        this.currentNumber = 1;
      }
    },
    //判断是否已经收藏
    collectProduct(){
      if(this.isCollect){
        this.uncollect();
      }else{
        this.collected();
      }
    },
    // 点击收藏
    collected(){
      let needToken = this.$cookies.get("loginReturnToken");
      if(!needToken){
        this.$router.push("Login");
        return;
      }else{
        this.$toast.loading({
          message:"加载中...",
          forbidClick:true
        })
        

        this.$axios({
          method:"post",
          url:this.$axios.defaults.baseURL+"/like",
          data:{
            appkey:this.appkey,
            pid:this.pid,
            tokenString:needToken
          }
        }).then(data=>{
          this.$toast.clear();
          // console.log(data);
          if(data.data.code == 700){
            //token无效
            this.$toast({
              message:data.data.msg,
              duration:"3000",
              forbidClick:true
            })
            //跳转登录界面
            this.$router.push("Login");
            return;
          }

          if(data.data.code == 800){
            this.isCollect = true;
            this.$toast({
              message:data.data.msg,
              duration:"800",
              forbidClick:true
            })
          }
        }).catch(err=>{
          console.log(err);
        })
      }

    },

    //取消收藏
    uncollect(){
      let needToken = this.$cookies.get("loginReturnToken");
      this.$toast.loading({
        message:"加载中...",
        forbidClick:true,
        duration:0
      })

      this.$axios({
        method:"post",
        url:this.$axios.defaults.baseURL+"/notlike",
        data:{
          appkey:this.appkey,
          pid:this.pid,
          tokenString:needToken
        }
      }).then(data=>{
        // console.log(data);
        this.$toast.clear();
        if(data.data.code == 700){
          //token无效
          this.$toast({
            message:data.data.msg,
            duration:"3000",
            forbidClick:true
          })
          //跳转登录界面
          this.$router.push("Login");
          return;
        }

        if(data.data.code == 900){
          this.isCollect = false;
          this.$toast({
            message:data.data.msg,
            duration:"800",
            forbidClick:true
          })
        }
      })

    },

    //查看是否已经收藏，如果已经收藏那么进入该页面是created里调用该方法可以防止刷新页面影响收藏图标显示
    checkIsCollect(){
      let needToken = this.$cookies.get("loginReturnToken");
      //判断是否登录，没有token就是没有登录，没有登录就不需要显示是否收藏
      if(!needToken){
        return;
      }

      this.$toast.loading({
        message:"加载中...",
        forbidClick:true,
        duration:0
      })
      // 查询是否已经收藏该商品
      this.$axios({
        method:"get",
        url:this.$axios.defaults.baseURL+"/findlike",
        params:{
          appkey:this.appkey,
          pid:this.pid,
          tokenString:needToken
        }
      }).then(data=>{
        this.$toast.clear();
        if(data.data.result.length > 0){
          this.isCollect = true;
        }
      })

    },

    //点击加入购物袋弹出popup层
    addShopbag(){
      if(this.isPopup){
        return;
      }
      this.isPopup = true;
    },

    //选择规格数量后加入购物车
    clickSureBtn(){
      let needToken = this.$cookies.get("loginReturnToken");
      //处理规格数据
      let formatData = [];
      let rule = [];
      formatData.push(this.productData.sugarData.sugar[this.sugarCurrentIndex]);
      formatData.push(this.productData.temData.tem[this.temCurrentIndex]);
      formatData.push(this.productData.creamData.cream[this.creamCurrentIndex]);
      formatData.push(this.productData.milkData.milk[this.milkCurrentIndex]);
      for(let v of formatData){
        if(!v){
          continue;
        }else{
          rule.push(v)
        }
      }
      rule = rule.join("/");
      this.$toast.loading({
        message:"加载中...",
        forbidClick:true,
        duration:0
      })
      //选择完毕，加入购物袋
      this.$axios({
        method:"post",
        url:this.$axios.defaults.baseURL+"/addShopcart",
        data:{
          pid:this.pid,
          appkey:this.appkey,
          tokenString:needToken,
          count:this.currentNumber,
          rule:rule,
        }
      }).then(data=>{
        this.$toast.clear();
        if(data.data.code == 700){
          this.$toast({
            message:data.data.msg,
            forbidClick:true,
            duration:"3000"
          })
          return this.$router.push("Login");
        }

        if(data.data.code == 3000){
          this.isAddShopbag = true;
          this.$toast({
            message:data.data.msg,
            forbidClick:true,
            duration:"800"
          })

          if(data.data.status == 1){
            this.changeShopbagNum(this.shopbagNumbers + 1)
          }

          if(this.shopbagNumbers != 0){
            this.changeIsPicActiveShow(true);
          }else{
            this.changeIsPicActiveShow(false);
          }
        }
      }).catch(err=>{
        console.log(err);
      })
    },

    //首次进入该页面时，判断购物袋是否有商品，如果有图标高亮和显示个数
    firstEnterShopbagStatus(){
      //判断是否登录，已登录就显示收藏和加入购物车信息，否则不显示
      let needToken = this.$cookies.get("loginReturnToken");
      if(!needToken){
        return;
      }

      this.$toast.loading({
        message:"加载中...",
        duration:0,
        forbidClick:true
      })

      this.$axios({
        method:"get",
        url:this.$axios.defaults.baseURL+"/shopcartRows",
        params:{
          appkey:this.appkey,
          tokenString:needToken
        }
      }).then(data=>{
        this.$toast.clear();
        if(data.data.code == 8000){
          if(data.data.result == 0){
            this.changeIsPicActiveShow(false);
          }else{
            this.changeIsPicActiveShow(true)
          }
          this.changeShopbagNum(data.data.result);
        }else{
          this.$toast({
            message:data.data.msg,
            forbidClick:true,
            duration:'3000'
          })
        }
      }).catch(err=>{
        console.log(err);
      })
    },

    //点击左下角购物袋图标跳转购物袋页面
    goToShopbag(){
      this.$router.push({name:"Shopbag",query:{isFromDetail:true}});
    },
    ...mapMutations(['changeShopbagNum','changeIsPicActiveShow']),

  },
  computed:{
    ...mapState(['shopbagNumbers','isPicActiveShow'])
  },
  components: {},
};
</script>
<style lang='less' scoped>
  @import "../assets/less/product-detail.less";

</style>

