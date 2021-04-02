<template>
  <div class="shopbag">
    <div class="topNav">
      <van-nav-bar
        title="购物袋"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <template #right>
          <van-icon size="16" @click="isEdit = !isEdit">{{isEdit ? '完成':'编辑'}}</van-icon>
        </template>
      </van-nav-bar>
    </div>

    <!-- 购物袋数据 -->
    <div class="shopbagItems" v-for="(val,i) in shopbagItems" :key="val.sid" v-show = "!isEmty">
      <van-swipe-cell>
        <template #right>
          <van-button square text="删 除" class="delete-button" @click="rightSideRemove(val.sid,i)"/>
        </template>
        <template #default>
          <div class="customBox">
            <div class="checkBox">
              <van-checkbox
                v-model="val.singleChecked"
                @change="changeStatus"
              ></van-checkbox>
            </div>
            <div class="picBox">
              <img :src="val.small_img" />
            </div>
            <div class="contentBox">
              <ul>
                <li>{{ val.name }}</li>
                <li>{{ val.enname }}</li>
                <li>{{ val.rule }}</li>
                <li>
                  <div class="priceBox">
                    <span class="bigSpan"
                      >&yen;<span class="price">{{
                        val.price | prevMoney
                      }}</span
                      >{{ val.price | lastMoney }}</span
                    >
                  </div>
                  <div class="addMinuBox">
                    <van-stepper
                      v-model="val.count"
                      integer
                      button-size="28px"
                      theme="round"
                      min="1"
                      max="999"
                      @plus = "addNumber(i)"
                      @minus = "minuNumber(i)"
                      @change = "iptChangeNum(i)"
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </template>
      </van-swipe-cell>
    </div>
    <div class="tips" v-show="!isEmty">~ ~没有更多了哦~ ~</div>
    <div v-show="isEmty">
      <van-empty
      description="购物袋空空的，还没有商品哦！"
      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
      >
        <van-button round color="#ecb041" class="bottom-button" @click="goago">快去逛逛吧！</van-button>
      </van-empty>
    </div>
    
    <!-- 结算列表 -->
    <div class="settlementList" v-if="!isEdit">
      <van-submit-bar :price="totalAmount" button-text="提交订单" @submit="onSubmit">
        <van-checkbox v-model="isAllChecked" @click="allSelect"
          >全选</van-checkbox
        >
      </van-submit-bar>
    </div>
    <!-- 删除列表 -->
    <div class="removeList" v-if="isEdit">
      <van-submit-bar button-text="删除订单" @submit="removeOrder">
        <van-checkbox v-model="isAllChecked" @click="allSelect">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import "../assets/less/shopbag.less";
import {mapState,mapMutations} from "vuex"
export default {
  name: "Shopbag",
  data() {
    return {
      buyNumber: 1,
      shopbagItems: [],
      totalAmount:0,
      isAllChecked: false,
      isEdit: false,
      isEmty:true
    };
  },
  computed:{
    ...mapState(['shopbagNumbers']),
  },
  created() {
    this.loadingItems();
  },
  methods: {
    ...mapMutations(['changeShopbagNum','changeIsPicActiveShow','changeBuyAid']),
    //一进入购物袋页面就把加入购物车的商品显示出来
    loadingItems() {
      let needToken = this.$cookies.get("loginReturnToken");

      this.$toast.loading({
        message: "加载中...",
        duration: 0,
        forbidClick: true,
      });

      this.$axios({
        method: "get",
        url: this.$axios.defaults.baseURL + "/findAllShopcart",
        params: {
          appkey: this.appkey,
          tokenString: needToken,
        },
      })
        .then((data) => {
          this.$toast.clear();
          // console.log(data);
          if (data.data.code == 700) {
            //token无效
            this.$toast({
              message: data.data.msg,
              duration: "3000",
              forbidClick: true,
            });
            //跳转登录界面
            this.$router.push("Login");
            return;
          }

          if (data.data.code == 5000) {
            let dataArr = data.data.result;
            dataArr.forEach((v) => {
              v.singleChecked = false;
            });
            //注意要先修改数据，然后再把数据同步到data那里，否则勾选无效
            this.shopbagItems = dataArr;
            if(this.shopbagItems.length > 0){
              this.isEmty = false;
            }
            this.changeShopbagNum(this.shopbagItems.length);
          } else {
            this.$toast({
              message: data.data.msg,
              duration: "3000",
              forbidClick: true,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onClickLeft() {
      if(this.$route.query.isFromDetail){
        this.$router.go(-1);
      }else{
        this.$router.push("/")
      }
    },
    //点击右上角的编辑
    onClickRight() {
      // console.log("点击右按钮");
    },
    //逛一逛
    goago(){
      this.changeIsPicActiveShow(false);
      //注意：这里用"/home"或者name:'Home'都会导致首页的图标和字体不能高亮显示，要用别名
      this.$router.push("/")
    },
    //提交订单
    onSubmit() {
      let sids = [];
      for(let i=0;i<this.shopbagItems.length;i++){
        if(this.shopbagItems[i].singleChecked){
          sids.push(this.shopbagItems[i].sid);
        }
      }

      if(sids.length === 0 ){
        this.$toast({
          message:"请先选择商品",
          duration:"2000",
          forbidClick:true
        })
        return;
      }

      this.changeBuyAid(sids);
      this.$router.push({name:"SubmitOrder"})
    },

    //点击增加按钮
    addNumber(curIndex){
      //注意，vant的stepper步进器第一次点击加减按钮是无效的，总价不变
      //这是因为第一次点击的时候，数量还未更新，用的是上一次的数量，因而导致价格出错
      //因此要先加一再调用加上总价的方法
      this.shopbagItems[curIndex].count++;
      this.calculateAmounte();
      this.modifyNumber(this.shopbagItems[curIndex].sid,this.shopbagItems[curIndex].count);
    },

    //点击减少按钮
    minuNumber(curIndex){
      this.shopbagItems[curIndex].count--;
      this.calculateAmounte();
      this.modifyNumber(this.shopbagItems[curIndex].sid,this.shopbagItems[curIndex].count);
    },

    //点击输入框修改数量
    iptChangeNum(curIndex){
      this.calculateAmounte();
      this.modifyNumber(this.shopbagItems[curIndex].sid,this.shopbagItems[curIndex].count);
    },

    //上传后台修改数量
    modifyNumber(itemSid,count){
      let needToken = this.$cookies.get("loginReturnToken"); 
      if(!needToken){
        this.$toast({
          message:data.data.msg,
          duration:'3000',
          forbidClick:true
        })

        return this.$router.push("Login");
      }

      this.$toast({
        message:"加载中...",
        duration:0,
        forbidClick:true
      })

      this.$axios({
        method:"post",
        url:this.$axios.defaults.baseURL+"/modifyShopcartCount",
        data:{
          appkey:this.appkey,
          tokenString:needToken,
          sid:itemSid,
          count
        }
      }).then(data=>{
        this.$toast.clear();
        if(data.data.code != 6000){
          this.$toast({
            message:data.data.msg,
            duration:"1000",
            forbidClick:true
          })
        }
      }).catch(err=>{
        console.log(err);
      })
    },

    //计算金额
    calculateAmounte(){
      
      let totalMoney = 0;

      this.shopbagItems.forEach(v=>{
        if(v.singleChecked){
          totalMoney += v.count * v.price;
        }
      })

      this.totalAmount = totalMoney * 100;
    },
    // 单选
    changeStatus() {
      //实现checkbox状态改变的步骤
      //1、给shopbagItems里的每个对象添加一个判断属性
      //2、v-model关联该属性
      //点击自动修改该属性
      //绑定的change事件的参数就是那个判断属性的值
      this.calculateAmounte();
      for (let i = 0; i < this.shopbagItems.length; i++) {
        if (!this.shopbagItems[i].singleChecked) {
          this.isAllChecked = false;
          return;
        }
      }
      this.isAllChecked = true;
    },

    // 全选
    allSelect() {
      this.calculateAmounte();
      this.shopbagItems.forEach((v) => {
        v.singleChecked = this.isAllChecked;
      });
    },

    // 删除订单
    removeOrder() {
      let needToken = this.$cookies.get("loginReturnToken"); 
      if(!needToken){
        this.$toast({
          message:data.data.msg,
          duration:'3000',
          forbidClick:true
        })

        return this.$router.push("Login");
      }

      // 处理数据得到sids参数
      let sids = [];
      for(let i=0;i<this.shopbagItems.length;i++){
        if(this.shopbagItems[i].singleChecked){
          sids.push(this.shopbagItems[i].sid);
          this.shopbagItems.splice(i,1);
          i--;
        }
      }

      if(sids.length === 0 ){
        this.$toast({
          message:"请选择要删除的商品",
          duration:"2000",
          forbidClick:true
        })
        return;
      }
      
      if(this.shopbagNumbers == sids.length){
        this.isAllChecked = false;
        this.isEmty = true;
      }

      this.changeShopbagNum(this.shopbagNumbers - sids.length);

      sids = JSON.stringify(sids);

      this.$toast({
        message:"加载中...",
        duration:0,
        forbidClick:true
      })

      this.$axios({
        method:"post",
        url:this.$axios.defaults.baseURL+"/deleteShopcart",
        data:{
          appkey:this.appkey,
          tokenString:needToken,
          sids
        }
      }).then(data=>{
        this.$toast.clear();
        console.log(data);
        if(data.data.code == 700){
          this.$toast({
            message:data.data.msg,
            duration:"3000",
            forbidClick:true
          })
          return this.$router.push("Login");
        }

        if(data.data.code == 7000){
          this.$toast({
            message:data.data.msg,
            duration:"800",
            forbidClick:true
          })
          // this.loadingItems();
        }
      }).catch(err=>{
        console.log(err);
      })
    },

    //点击右侧边栏的删除
    rightSideRemove(itemSid,index){
      let needToken = this.$cookies.get("loginReturnToken"); 
      if(!needToken){
        this.$toast({
          message:data.data.msg,
          duration:'3000',
          forbidClick:true
        })

        return this.$router.push("Login");
      }

      let sids = [];
      sids.push(itemSid);
      sids = JSON.stringify(sids);

      if(this.shopbagItems.length == 1){
        this.isAllChecked = false;
        this.isEmty = true;
      }

      this.shopbagItems.splice(index,1);
      this.changeShopbagNum(this.shopbagNumbers - 1);
      this.calculateAmounte();

      this.$toast({
        message:"加载中...",
        duration:0,
        forbidClick:true
      })

      this.$axios({
        method:"post",
        url:this.$axios.defaults.baseURL+"/deleteShopcart",
        data:{
          appkey:this.appkey,
          tokenString:needToken,
          sids
        }
      }).then(data=>{
        this.$toast.clear();
        if(data.data.code == 700){
          this.$toast({
            message:data.data.msg,
            duration:"3000",
            forbidClick:true
          })
          return this.$router.push("Login");
        }

        if(data.data.code == 7000){
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

  filters: {
    prevMoney(value) {
      return value.split(".")[0];
    },
    lastMoney(value) {
      return "." + value.split(".")[1];
    },
  },
};
</script>
<style lang='less' scoped>
  @import "../assets/less/shopbag.less";

</style>
