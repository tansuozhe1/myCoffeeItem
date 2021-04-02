<template>
  <div class="order-item">
    <div class="pro-img">
      <img class="auto-img" :src="product.small_img" alt="">
    </div>
    <div class="pro-info">
      <div class="pro-top">
        <div class="pro-name">
          <div class="p-name">{{product.name}}</div>
          <div class="p-rule">{{product.rule}}</div>
        </div>
        <div class="p-enname">{{product.enname}}</div>
      </div>
      <div class="pro-bottom">
        <div class="p-price">&yen;{{product.price}}</div>
        <div class="p-count">x{{product.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import '../assets/less/orderitem.less';
  export default {
    name: 'OrderItem',
    props: {
      product: {
        type: Object,
        default() {
          return {};
        }
      }
    }
  }
</script>
<style lang='less' scoped>
  @import '../assets/less/orderitem.less';

</style>