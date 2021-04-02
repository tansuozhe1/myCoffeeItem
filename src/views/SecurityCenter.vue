<template>
  <div class="securityCenter">
    <div class="topNav">
      <van-nav-bar
        title="地址管理"
        left-text="返回"
        left-arrow
        @click-left="clickBack"
      />
    </div>
    <Background>
      <van-cell title="修改密码" is-link />
      <van-cell title="注销账户" is-link @click="logOut" />
    </Background>
    <div class="backLogin">
      <van-button block round color="#C7A76D">退出登录</van-button>
    </div>
  </div>
</template>

<script>
import "../assets/less/securityCenter.less";
import Background from "../components/Background";

export default {
  name: "SecurityCenter",
  data() {
    return {};
  },
  components: {
    Background,
  },
  methods: {
    //返回上一级
    clickBack() {
      this.$router.push({ name: "Me" });
    },
    //注销账号
    logOut() {
      let needToken = this.$cookies.get("loginReturnToken");
      if(!needToken){
          this.$toast({
              message:"请先登录",
              forbidClick:true,
              duration:800
          })

          return this.$router.push("Login");
      }


      this.$dialog
        .confirm({
          title: "注销账户",
          message: "是否注销账号，注销后无法恢复。",
          theme: "round-button",
        })
        .then(() => {
            this.$axios({
                method:"post",
                url:this.$axios.defaults.baseURL+"/destroyAccount",
                data:{
                    appkey:this.appkey,
                    tokenString:needToken
                }
            }).then(data=>{
                console.log(data);
                if(data.data.code == 700){
                    this.$toast({
                        message:data.data.msg,
                        duration:1000,
                        forbidClick:true
                    })

                    return this.$router.push("Login");
                }
                if(data.data.code == "G001"){
                    this.$toast({
                        message:"注销成功",
                        forbidClick:true,
                        duration:1000
                    })

                    this.$router.push("Login");
                }else{
                    this.$toast({
                        message:data.data.msg,
                        forbidClick:true,
                        duration:1000
                    })
                }
            }).catch(err=>{
                console.log(err);
            })
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang='less' scoped>
  @import "../assets/less/securityCenter.less";
</style>
