<template>
  <div class="submitOrder">
    <div class="topNav">
      <van-nav-bar
        title="订单结算"
        left-text="返回"
        left-arrow
        @click-left="clickBack"
      />
    </div>
    <div class="selectAddress">
      <div class="select">
        <div class="s-address" @click="clickSelect">选择地址</div>
        <van-icon name="arrow" />
      </div>
      <div class="address-box">
        <div class="user-info">
          <div class="user-name">{{ AdressList.name }}</div>
          <div class="phone">{{ AdressList.tel }}</div>
          <div class="default" v-if="isShowDefault">默认</div>
        </div>
        <div class="address-detail">{{ AdressList.address }}</div>
      </div>
    </div>
    <ProductItems :buyIntemDatas="buyIntemDatas">
      <div class="shopMsg">订单信息</div>
    </ProductItems>
    <div class="accountOrder">
      <van-button color="#C7A76D" block round @click="accountOrder"
        >结 算 订 单</van-button
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import "../assets/less/submitOrder.less";
import ProductItems from "../components/ProductItems";

export default {
  name: "SubmitOrder",
  data() {
    return {
      chosenAddressId: 0,
      AdressList: {},
      loadingAdressAid: "",
      isShowDefault: false,
      buyIntemDatas: [],
    };
  },
  components: {
    ProductItems,
  },
  computed: {
    ...mapState(["aid", "buyAid", "shopbagNumbers"]),
  },
  created() {
    //一进入页面判断this.$route.query.selectAdress是否为空
    //如果为空说明没有选择地址，是从购物袋进入订单页面，否则是选择完地址再返回订单页面
    if (!this.$route.query.selectAdress) {
      this.loadingAdressAid = this.aid;
    } else {
      this.loadingAdressAid = this.$route.query.selectAdress;
    }
    this.loadingAddress();
    this.loadingItems();
  },
  methods: {
    ...mapMutations(["changeShopbagNum"]),
    //返回上一级
    clickBack() {
      this.$router.push({ name: "Shopbag" });
    },

    //进来就加载地址
    loadingAddress() {
      let needToken = this.$cookies.get("loginReturnToken");

      this.$axios({
        method: "get",
        url: this.$axios.defaults.baseURL + "/findAddressByAid",
        params: {
          appkey: this.appkey,
          tokenString: needToken,
          aid: this.loadingAdressAid,
        },
      })
        .then((val) => {
          // console.log(val);
          let data = val.data.result[0];
          if (val.data.code == 40000) {
            if (!data) {
              this.isShowDefault = false;
            } else {
              this.isShowDefault = true;
            }

            this.AdressList = {
              id: data.aid,
              name: data.name,
              tel: data.tel,
              address:
                data.province + data.city + data.county + data.addressDetail,
              isDefault: Boolean(data.isDefault),
            };
            // console.log(this.AdressList);
          } else {
            this.$toast({
              message: val.data.msg,
              duration: 2000,
              forbidClick: true,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //点击选择地址
    clickSelect() {
      this.$router.push({
        name: "AddressList",
        query: { isFromSubmitOrder: true },
      });
    },
    //点击跳转到地址管理列表
    editAddAddress() {
      console.log("编辑地址");
    },
    //结算页面
    accountOrder() {
      //判断是否选择地址
      if (!this.loadingAdressAid) {
        return this.$toast({
          message: "请选择收货地址",
          forbidClick: true,
          duration: 3000,
        });
      }

      let needToken = this.$cookies.get("loginReturnToken");

      if (!needToken) {
        return this.$router.push({ name: "Login" });
      }

      //获取参数
      let data = {
        appkey: this.appkey,
        tokenString: needToken,
        sids: JSON.stringify(this.buyAid),
        phone: this.AdressList.tel,
        address: this.AdressList.address,
        receiver: this.AdressList.name,
      };

      this.axios({
        //请求方式
        method: "POST",
        url: this.$axios.defaults.baseURL + "/pay",
        data,
      })
        .then((res) => {
          this.$toast.clear();

          if (res.data.code == 700) {
            this.$toast({
              message: res.data.msg,
              forbidClick: true,
              duration: 3000,
            });
            return this.$router.push({ name: "Login" });
          }

          if (res.data.code === 60000) {
            //修改vuex的购物袋数量
            this.changeShopbagNum(this.shopbagNumbers - this.buyAid.length);

            //跳转到订单组件
            this.$router.push({ name: "AccountOrder" });
          } else {
            this.$toast({
              message: res.data.msg,
              forbidClick: true,
              duration: 3000,
            });
          }
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("err ==> ", err);
        });
    },

    //一进页面就把进行结算的商品的信息加载出来
    loadingItems() {
      let needToken = this.$cookies.get("loginReturnToken");

      this.$toast.loading({
        message: "加载中...",
        duration: 0,
        forbidClick: true,
      });

      this.$axios({
        method: "get",
        url: this.$axios.defaults.baseURL + "/commitShopcart",
        params: {
          appkey: this.appkey,
          tokenString: needToken,
          sids: JSON.stringify(this.buyAid),
        },
      })
        .then((data) => {
          this.$toast.clear();
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

          if (data.data.code == 50000) {
            let dataArr = data.data.result;
            this.buyIntemDatas = dataArr;
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
  },
};
</script>
<style lang='less' scoped>
  @import "../assets/less/submitOrder.less";
</style>
