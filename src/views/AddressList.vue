<template>
  <div class="addressList">
    <div class="topNav">
      <van-nav-bar
        title="地址管理"
        left-text="返回"
        right-text="删除地址"
        left-arrow
        @click-left="clickBack"
        @click-right="removeAddress"
      />
    </div>

    <Background>
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        v-if="!isEmpty"
        @add="clickAddAddress"
        @edit="clickEdit"
      />
      <van-empty v-if="isEmpty" description="地址栏空荡荡的，还没有地址哦！">
        <van-button round type="danger" class="bottom-button" @click="clickBtn">快去添加新地址吧！</van-button>
      </van-empty>
    </Background>
  </div>
</template>

<script>
import "../assets/less/addressList.less";
import Background from "../components/Background";
import {mapMutations} from "vuex"
export default {
  name: "AddressList",
  data() {
    return {
      chosenAddressId:"",
      list: [],
      isEmpty:false,
    };
  },
  components: {
    Background,
  },
  created(){
    this.loadAddressList();
    if(this.list.length == 0){
      this.isEmpty = true;
    }
  },
  methods: {
    ...mapMutations(['changeAid']),
    //点击返回
    clickBack() {
      console.log();
      if(this.$route.query.isFromSubmitOrder){
        this.$router.push({name:"SubmitOrder",query:{selectAdress:this.chosenAddressId}})
      }else{
        this.$router.go(-1);
      }
    },

    //点击右上角删除按钮删除地址
    removeAddress(){
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
          url:this.$axios.defaults.baseURL+"/deleteAddress",
          data:{
            appkey:this.appkey,
            aid:this.chosenAddressId,
            tokenString:needToken
          }
        }).then(data=>{
          this.$toast.clear();

          if (data.data.code == 700) {
            this.$toast({
              message: res.data.msg,
              forbidClick: true,
              duration: 2000,
            });
            return this.$router.push({ name: "Login" });
          }

          if(data.data.code == 10000){
            this.$toast({
              message: data.data.msg,
              forbidClick: true,
              duration: "800",
            });

            //删完最后一条，显示空盒子
            if(this.list.length == 1){
              this.isEmpty = true;
            }

            for(let i=0;i<this.list.length;i++){
              if(this.list[i].id == this.chosenAddressId){
                this.list.splice(i,1);
              }
            }
          }else{
            this.$toast({
              message: res.data.msg,
              forbidClick: true,
              duration: "2000",
            });
          }
        }).catch(err=>{
          console.log(err);
        })
      }
    },
    //删光地址后，点击逛一逛按钮添加新地址
    clickBtn(){
      this.$router.push({path:"/editAddress",query:{show:false}});
    },
    //添加新地址
    clickAddAddress() {
      this.$router.push({path:"/editAddress",query:{show:false}});
    },

    //进入地址列表页面时加载所有地址
    loadAddressList(){
      let needToken = this.$cookies.get("loginReturnToken");
      this.$axios({
        method:"get",
        url:this.$axios.defaults.baseURL+"/findAddress",
        params:{
          appkey:this.appkey,
          tokenString:needToken
        }
      }).then(data=>{
        // console.log(data);
        let addressArr = data.data.result;
        //整理地址信息
        let addressData = [];

        addressArr.forEach(v=>{
          addressData.push({
            id:v.aid,
            name:v.name,
            tel:v.tel,
            address:v.province+v.city+v.county+v.addressDetail,
            isDefault:Boolean(v.isDefault)
          })
        })

        this.list = addressData;

        this.list.forEach(v=>{
          if(v.isDefault){
            this.changeAid(v.id);
          }
        })
        
        if(this.list != 0 ){
          this.isEmpty = false;
        }
      }).catch(err=>{
        console.log(err);
      })
    },

    //点击编辑地址
    clickEdit(val){
      this.$router.push({name:"EditAddress",query:{show:true,aids:val.id}});
    }
  },
};
</script>
<style lang='less' scoped>
  @import "../assets/less/addressList.less";

</style>
