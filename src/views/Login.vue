<template>
  <div class="login">
    <TopNav></TopNav>

    <!-- 登录界面 -->
    <div class="login-contents">
      <!-- logo图 -->
      <div class="logo">
        <img src="../assets/images/logo.png" alt="" />
      </div>
      <!-- 欢迎信息 -->
      <div class="info">
        <div class="top">欢迎来到<span>&nbsp;闲时&nbsp;</span>咖啡</div>
        <div class="bottom">Welcome to leisure coffee</div>
      </div>
      <!-- 手机号和密码 -->
      <div class="msg">
        <van-field
          v-model="state.tel"
          type="tel"
          label="手机号"
          size="large"
          placeholder="请输入手机号"
        />
        <van-field
          size="large"
          v-model="state.password"
          :type="eyeState ? 'text' : 'password'"
          label="密码"
          :right-icon="eyeState ? 'eye-o' : 'closed-eye'"
          placeholder="请输入密码"
          @click-right-icon="openEye"
        />
      </div>
      <!-- 忘记密码 -->
      <div class="forget">
        <span>忘记密码</span><span @click="showPopup">注册</span>
      </div>
      <!-- 登录按钮 -->
      <div class="login-btn">
        <van-button round block color="#c7a76d" type="default" @click="login"
          >登 录</van-button
        >
      </div>
    </div>

    <!-- 注册层弹出 -->
    <van-popup
      v-model="show"
      position="bottom"
      round
      :style="{ height: '42%' }"
      closeable
    >
      <div class="register">
        <div class="register-title">注册</div>
        <div class="register-msg">
          <van-field
            v-model="userRegisterInfo.nickName"
            label="昵称"
            placeholder="输入昵称(1-10位)"
          />
          <van-field
            v-model="userRegisterInfo.phone"
            type="tel"
            label="手机号"
            size="large"
            placeholder="请输入手机号"
          />
          <van-field
            size="large"
            v-model="userRegisterInfo.password"
            :type="eyeState ? 'text' : 'password'"
            label="密码"
            :right-icon="eyeState ? 'eye-o' : 'closed-eye'"
            placeholder="请输入密码(6-16位)"
            @click-right-icon="openEye"
          />
          <!-- 注册按钮 -->
          <div class="btn-box">
            <van-button @click = "register" round block color="#c7a76d" type="default"
              >注 册</van-button
            >
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import TopNav from "../components/Top_nav";
import "../assets/less/login.less";
import {utils} from '../assets/js/utils';
import { Toast } from 'vant'

export default {
  name: "Login",
  data() {
    return {
      state: {
        tel: "",
        password: "",
      },
      userRegisterInfo: {
        phone: "",
        password: "",
        nickName: "",
      },
      eyeState: false,
      show: false,
    };
  },
  components: {
    TopNav,
  },
  methods: {
    // 切换眼睛
    openEye() {
      this.eyeState = !this.eyeState;
      // console.log(this.appkey);
    },
    // 点击注册显示弹出层
    showPopup() {
      this.show = true;
      this.state.tel = "";
      this.state.password = "";
    },
    // 注册触发
    register() {

      let o = {
        nickName: {
          value: this.userRegisterInfo.nickName,
          reg: /^[\u4e00-\u9fa5A-Za-z0-9]{1,10}$/,
          errorMsg: '昵称支持汉字字母数字组合'
        },
        phone: {
          value: this.userRegisterInfo.phone,
          reg: /^1[3-9]\d{9}$/,
          errorMsg: '手机号格式不正确'
        },

        password: {
          value: this.userRegisterInfo.password,
          reg: /^[A-Za-z]\w{5,15}$/,
          errorMsg: '密码支持字母数字_组合且首字符必须为字母'
        },
      };

      // 验证不通过结束
      if (!utils.validForm(o)) {
        return;
      }

      // 验证成功交互后台
      this.$axios({
        method:"post",
        url:this.$axios.defaults.baseURL+"/register",
        data:{
          appkey:this.appkey,
          userName:this.userRegisterInfo.nickName,
          phone:this.userRegisterInfo.phone,
          password:this.userRegisterInfo.password
        }
      }).then(data=>{
        // console.log(data);
        if(data.data.code == 100){
          this.show = false;
          for(let key in this.userRegisterInfo){
            this.userRegisterInfo[key] = "";
          }
          this.$toast({
            message:data.data.msg,
            duration:2000,
            forbidClick:true,
          })
        }else{
          this.$toast({
            message:data.data.msg,
            duration:2000,
            forbidClick:true,
            position:"bottom"
          })
        }
      })

    },
    // 登录触发
    login(){
      let o = {
        phone: {
          value: this.state.tel,
          reg: /^1[3-9]\d{9}$/,
          errorMsg: '手机号格式不正确'
        },
        password: {
          value: this.state.password,
          reg: /^[A-Za-z]\w{5,15}$/,
          errorMsg: '密码支持字母数字_组合且首字符必须为字母'
        },
      };

      if(!utils.validForm(o)){
        return ;
      }

      // 加载提示
      this.$toast({
        message:"加载中...",
        duration:0,
        forbidClick:true
      })

      this.$axios({
        method:"post",
        url:this.$axios.defaults.baseURL+"/login",
        data:{
          appkey:this.appkey,
          phone:this.state.tel,
          password:this.state.password
        }
      }).then(data=>{
        // console.log(data,data.data.token);
        if(data.data.code == 200){
          this.$toast.clear();
          this.$cookies.set("loginReturnToken",data.data.token,"1d");

          //跳转页面
          this.$router.go(-1);
        }else{
          this.$toast({
            message:data.data.msg,
            duration:3000,
            forbidClick:true
          })
        }
      }).catch(err=>{
        console.log(err);
      })
    }

  }
}
// 13528374198
</script>
<style lang='less' scoped>
  @import "../assets/less/login.less";
</style>

