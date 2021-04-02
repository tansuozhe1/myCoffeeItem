<template>
    <div class="background">
        <div class="backgroundBox"></div>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import "../assets/less/background.less"
    export default {
        name:"Background",
    }
</script>
<style lang='less' scoped>
  @import "../assets/less/background.less";

</style>
