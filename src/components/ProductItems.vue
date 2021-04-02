<template>
  <div class="productItems">
    <slot></slot>
    <!-- 内容列表 -->
    <div class="item-box" v-for="(val, i) in buyIntemDatas" :key="i + 1">
      <div class="pay-title-box">
        <div class="pay-t">{{ val.oid }}</div>
        <div class="pay-s" v-if="val.status === 2">
          <div class="pay-text">已完成</div>
          <div class="pay-icon" @click="removeOrder(val.oid, i)">
            <van-icon name="delete-o" />
          </div>
        </div>
        <div class="pay-s" v-if="val.status === 1">
          <div class="pay-text" @click="confirmOrder(val, i)">确认订单</div>
        </div>
      </div>
      <!-- 图片 -->
      <div class="pic">
        <img :src="val.small_img" alt="" />
      </div>
      <!-- 信息 -->
      <div class="info">
        <div class="name">{{ val.name }}</div>
        <div class="enname">{{ val.enname }}</div>
        <div class="select">{{ val.rule }}</div>
        <div class="priceNum">
          <div class="price">
            &yen; <span>{{ val.price | prevMoney }}</span>
            {{ val.price | lastMoney }}
          </div>
          <div class="numbers">x{{ val.count }}</div>
        </div>
      </div>
    </div>
    <div class="orderInfo">
      <div class="numTime">
        <div class="times">{{ nowTimes }}</div>
        <div class="count">
          共 <span>{{ buyIntemDatas | numbers }}</span> 件商品
        </div>
      </div>
      <div class="price">
        <span class="total">合计：</span>&yen;
        <span class="money">{{ buyIntemDatas | prevTotal }}</span>
        {{ buyIntemDatas | lastTotal }}
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/less/productItems.less";
import { mapState } from "vuex";

export default {
  name: "ProductItems",
  props: ["buyIntemDatas"],
  data() {
    return {
      // buyIntemDatas: [],
      nowTimes: "",
    };
  },
  computed: {
    ...mapState(["buyAid"]),
  },
  created() {
      console.log(this.buyIntemDates);
    // this.loadingItems();
    this.orderTime();
  },
  methods: {
    // //一进页面就把进行结算的商品的信息加载出来
    // loadingItems() {
    //   let needToken = this.$cookies.get("loginReturnToken");

    //   this.$toast.loading({
    //     message: "加载中...",
    //     duration: 0,
    //     forbidClick: true,
    //   });

    //   this.$axios({
    //     method: "get",
    //     url: this.$axios.defaults.baseURL + "/commitShopcart",
    //     params: {
    //       appkey: this.appkey,
    //       tokenString: needToken,
    //       sids: JSON.stringify(this.buyAid)
    //     },
    //   })
    //     .then((data) => {
    //       this.$toast.clear();
    //       // console.log(data);
    //       if (data.data.code == 700) {
    //         //token无效
    //         this.$toast({
    //           message: data.data.msg,
    //           duration: "3000",
    //           forbidClick: true,
    //         });
    //         //跳转登录界面
    //         this.$router.push("Login");
    //         return;
    //       }

    //       if (data.data.code == 50000) {
    //         let dataArr = data.data.result;

    //         // let buyIntemData = [];

    //         // for (let i in dataArr) {
    //         //   for (let j in this.buyAid) {
    //         //     if (dataArr[i].sid == this.buyAid[j]) {
    //         //       buyIntemData.push(dataArr[i]);
    //         //     }
    //         //   }
    //         // }

    //         this.buyIntemDatas = dataArr;
    //         // console.log(this.buyIntemDatas);
    //       } else {
    //         this.$toast({
    //           message: data.data.msg,
    //           duration: "3000",
    //           forbidClick: true,
    //         });
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    orderTime() {
      let nowTime = new Date();
      let y = nowTime.getFullYear();
      let M = nowTime.getMonth() + 1;
      let d = nowTime.getDate();
      let h = nowTime.getHours();
      let m = nowTime.getMinutes();
      let s = nowTime.getSeconds();

      let times = `${y}-${M}-${d} ${h}:${m}:${s}`;

      this.nowTimes = times;
    },
    removeOrder(){

    },
    confirmOrder(){

    }
  },
  filters: {
    prevMoney(value) {
      return value.split(".")[0];
    },
    lastMoney(value) {
      return "." + value.split(".")[1];
    },
    numbers(val) {
      let num = 0;
      val.forEach((v) => {
        num += v.count;
      });
      return num;
    },
    prevTotal(val) {
      let allMoney = 0;
      val.forEach((v) => {
        allMoney += v.count * v.price;
      });
      allMoney = String(allMoney);
      return allMoney.split(".")[0];
    },
    lastTotal(val) {
      let allMoney = 0;
      val.forEach((v) => {
        allMoney += v.count * v.price;
      });
      allMoney = String(allMoney);
      if (allMoney.indexOf(".") <= -1) {
        allMoney = allMoney + ".00";
      }
      return "." + allMoney.split(".")[1];
    },
  },
};
</script>
<style lang='less' scoped>
  @import "../assets/less/productItems.less";

</style>
