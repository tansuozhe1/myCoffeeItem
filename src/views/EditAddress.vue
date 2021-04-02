<template>
  <div class="editAdress">
    <div class="topNav">
      <van-nav-bar
        :title="isShowDelete ? '修改地址' : '新增地址'"
        left-text="返回"
        left-arrow
        @click-left="clickBack"
      />
    </div>
    <Background>
      <van-address-edit
        :area-list="areaList"
        show-postal
        show-set-default
        show-search-result
        :is-saving="false"
        detail-maxlength="50"
        :address-info="addressInfo"
        :show-delete="isShowDelete"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="saveAddress"
        @delete="onDelete"
      />
    </Background>
  </div>
</template>

<script>
import "../assets/less/editAddress.less";
import areaList from "../assets/js/area";
import Background from "../components/Background.vue";
export default {
  name: "EditAdress",
  data() {
    return {
      addressInfo: {},
      isShowDelete: false,
      areaList,
      addressId: 0,
    };
  },
  components: {
    Background,
  },
  created() {
    let needToken = this.$cookies.get("loginReturnToken");

    if (this.$route.query.show == "true" || this.$route.query.show == true) {
      this.isShowDelete = true;
    } else {
      this.isShowDelete = false;
    }

    if(this.isShowDelete){
        this.addressId = this.$route.query.aids;

        this.$axios({
        method: "get",
        url: this.$axios.defaults.baseURL + "/findAddressByAid",
        params: {
            appkey: this.appkey,
            tokenString: needToken,
            aid: this.$route.query.aids,
        },
        }).then((val) => {
            let data = val.data.result[0];
            if(val.data.code == 40000){
                //注意要在addresInfo里面添加areaCode,不然一进修改地址页面的时候地区那里为空
                this.addressInfo = {
                    name: data.name,
                    tel: data.tel,
                    areaCode: data.areaCode,
                    province: data.province,
                    city: data.city,
                    county: data.county,
                    addressDetail: data.addressDetail,
                    postalCode: data.postalCode,
                    isDefault: Boolean(data.isDefault),
                };

            }else{
                this.$toast({
                    message:val.data.msg,
                    duration:2000,
                    forbidClick:true
                })
            }
        }).catch(err=>{
            console.log(err);
        });
    }
  },
  methods: {
    //点击返回，返回上一级
    clickBack() {
      this.$router.go(-1);
    },

    //点击删除按钮删除
    onDelete() {
      let needToken = this.$cookies.get("loginReturnToken");
    },

    //保存地址
    saveAddress(val) {
      let needToken = this.$cookies.get("loginReturnToken");
      if (!needToken) {
        this.$toast({
          message: "请先登录",
          duration: "2000",
          forbidClick: true,
        });
        return this.$router.push("Login");
      }

      if (this.isShowDelete) {
        //判断是否修改地址，如果没有则返回上一级，否则上传后台修改
        let isModify = false;
        delete val.country;

        for (let key in val) {
          if (val[key] !== this.addressInfo[key]) {
            isModify = true;
          }
        }

        //修改地址的时候格式化地址信息，增加了aid
        let addressData = {
          aid:this.addressId,
          name: val.name,
          tel: val.tel,
          province: val.province,
          city: val.city,
          county: val.county,
          addressDetail: val.addressDetail,
          areaCode: val.areaCode,
          postalCode: val.postalCode,
          isDefault: Number(val.isDefault),
        };


        if (!isModify) {
          this.$router.go(-1);
        } else {
          this.$toast.loading({
            message: "加载中...",
            duration: 0,
            forbidClick: true,
          });

          this.$axios({
            method: "post",
            url: this.$axios.defaults.baseURL + "/editAddress",
            data: {
              appkey: this.appkey,
              tokenString: needToken,
              ...addressData,
            },
          })
            .then((data) => {
              this.$toast.clear();
                if (data.data.code === 30000) {
                  this.$toast({
                    message: data.data.msg,
                    duration: "800",
                    forbidClick: true,
                  });

                  this.$router.go(-1);
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
        }
      } else {
        //格式化地址信息
        let addressData = {
          name: val.name,
          tel: val.tel,
          province: val.province,
          city: val.city,
          county: val.county,
          addressDetail: val.addressDetail,
          areaCode: val.areaCode,
          postalCode: val.postalCode,
          isDefault: Number(val.isDefault),
        };
        //   console.log(addressData);

        this.$toast.loading({
          message: "加载中...",
          duration: 0,
          forbidClick: true,
        });

        this.$axios({
          method: "post",
          url: this.$axios.defaults.baseURL + "/addAddress",
          data: {
            appkey: this.appkey,
            tokenString: needToken,
            ...addressData,
          },
        })
          .then((data) => {
            this.$toast.clear();
            //   console.log(data);
            if (data.data.code === 9000) {
              this.$toast({
                message: data.data.msg,
                duration: "800",
                forbidClick: true,
              });

              this.$router.go(-1);
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
      }
    },
  },
};
</script>
<style lang='less' scoped>
  @import "../assets/less/editAddress.less";
</style>
