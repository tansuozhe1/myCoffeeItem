import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import "lib-flexible/flexible"
import VueCookies from "vue-cookies"

Vue.config.productionTip = false
import {
  NavBar,
  icon,
  Field,
  Button,
  Popup,
  Toast,
  Tabbar,
  TabbarItem,
  Search,
  Swipe,
  SwipeItem,
  SwipeCell,
  Stepper ,
  GoodsAction, 
  GoodsActionIcon, 
  GoodsActionButton,
  SubmitBar,
  checkbox,
  Card,
  Tag,
  Checkbox,
  Empty,
  AddressList,
  AddressEdit,
  Uploader,
  Cell,
  CellGroup,
  Tab,
  Tabs,
  Overlay,
  Dialog,
} from "vant"
 
// 注意：购物栏那里的ActionBar, ActionBarIcon, ActionBarButton不存在，
// 要使用GoodsAction, GoodsActionIcon, GoodsActionButton,
Vue
  .use(NavBar)
  .use(icon)
  .use(Field)
  .use(Button)
  .use(Popup)
  .use(Toast)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Search)
  .use(Swipe)
  .use(SwipeCell)
  .use(Stepper)
  .use(SwipeItem)
  .use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton)
  .use(SubmitBar)
  .use(checkbox)
  .use(Card)
  .use(Tag)
  .use(Checkbox)
  .use(Empty)
  .use(AddressList)
  .use(AddressEdit)
  .use(Uploader)
  .use(Cell)
  .use(CellGroup)
  .use(Tab)
  .use(Tabs)
  .use(Overlay)
  .use(Dialog)
  
Vue.prototype.appkey = "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA="

Vue.use(VueCookies)


//定义全局过滤器
Vue.filter('formatDate', (data, format) => {
  let date = new Date(data);

  //获取年份
  let year = date.getFullYear().toString();

  if (/(y+)/.test(format)) {
    //获取匹配组的内容
    let yearContent = RegExp.$1;

    format = format.replace(yearContent, year.slice(year.length - yearContent.length));
  }

  //替换月日时分秒
  let dateObject = {
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds()
  };

  for (let key in dateObject) {
    //生成动态正则表达式
    let reg = new RegExp(`(${key}+)`);
    if (reg.test(format)) {
      //获取匹配组的内容
      let content = RegExp.$1;

      format = format.replace(content, dateObject[key] >= 10 ? dateObject[key] : content.length === 2 ? '0' + dateObject[key] : dateObject[key]);
    }
  }

  return format;
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
