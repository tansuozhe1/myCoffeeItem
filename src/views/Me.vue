<template>
  <div class="mine">
    <div class="bakcgroundImg">
      <img src="../assets/images/backgroundImg.jpg" alt="" />
      <van-uploader />
    </div>
    <div class="item-box">
      <!-- 登录后的头像、个性签名 -->
      <div class="introduce" v-if="isLogin">
        <div class="img-box">
          <img src="../assets/images/coffeeshop.jpg" alt="" />
          <div class="fileLoader">
            <van-uploader />
          </div>
        </div>
        <div class="descInfo">
          <div class="name">sdbuis</div>
          <div class="msg">
            <span>个性签名：</span>
            这个家伙很懒，什么也没有留下!
          </div>
        </div>
      </div>

      <!-- 未登录的时候显示的头像 -->
      <div class="unLogin" v-if="!isLogin">
        <div class="img-box">
          <img src="../assets/images/logo.png" alt="" />
        </div>
        <div class="descInfo" @click="clickLogin">
          请先<span>登录</span> / <span>注册</span>
          <van-icon name="arrow" />
        </div>
      </div>

      <!-- 列表 -->
      <div class="itemList" v-if="isLogin">
        <van-cell-group>
          <van-cell title="个人资料" is-link />
          <van-cell title="我的订单" is-link to="AccountOrder"/>
          <van-cell title="我的收藏" is-link />
          <van-cell title="地址管理" is-link to="AddressList"/>
          <van-cell title="安全中心" is-link to="SecurityCenter"/>
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/less/mine.less";
export default {
  name: "Mine",
  data() {
    return {
      isLogin: false,
      imgSrc: "../assets/images/coffeeshop.jpg",
    };
  },
  components: {},
  created(){
      this.judgeIsLogin();
  },
  methods:{
      judgeIsLogin(){
        let needToken = this.$cookies.get("loginReturnToken");
        if(needToken){
            this.isLogin = true;
        }else{
            this.isLogin = false;
        }
      },

    //点击进入登录页面
    clickLogin(){
        this.$router.push({name:"Login"});
    },
    
  }
};
</script>
<style lang='less' scoped>
  @import "../assets/less/mine.less";
</style>
