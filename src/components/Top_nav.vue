<template>
    <div class="topNav">
         <van-nav-bar left-arrow>
            <template #left>
                <div class="leftTxt" @click="goBack">
                    <div class="logo">
                        <img src="../assets/images/logo.png" alt="">
                    </div>
                    <div class="text">Leisure Coffee</div>
                </div>
                
            </template>
            <template #right>
                <div class="rightText" @click="goForAWalk">
                    先逛一逛
                </div>
            </template>
        </van-nav-bar>
    </div>
</template>

<script>
    import "../assets/less/topNav.less"
    export default {
        name:"TopNav",
        methods:{
            goBack(){
                this.$router.go(-1);
            },
            goForAWalk(){
                this.$router.push('/');
            }
        }
    }
</script>
<style lang='less' scoped>
  @import "../assets/less/topNav.less";

</style>