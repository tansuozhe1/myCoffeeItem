(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0816c96a"],{"01e5":function(t,e,n){"use strict";var i=n("1f04"),s=n("f14a"),r=n("902e"),a=n("941f"),o=n("8fe5"),c=n("177b"),u=n("34c7"),l=n("7ce6"),d=n("2ccf"),f=n("0914"),h=n("97f5"),v=n("baa9"),p=n("f8d3"),b=n("b7d9"),g=n("3de9"),m=n("1f88"),y=n("a447"),O=n("e505"),_=n("a34a"),w=n("d085"),C=n("4b7d"),k=n("38e3"),S=n("d320"),A=n("9f6b"),j=n("28e6"),x=n("bbee"),$=n("afb0"),D=n("6484"),I=n("555d"),P=n("4f83"),E=n("3086"),T=n("ca66"),L=n("bd91"),N=n("d1d6"),R=n("28d0"),M=n("59bf").forEach,J=D("hidden"),F="Symbol",B="prototype",q=E("toPrimitive"),U=R.set,H=R.getterFor(F),Q=Object[B],W=s.Symbol,Y=r("JSON","stringify"),z=k.f,G=S.f,K=w.f,V=A.f,X=$("symbols"),Z=$("op-symbols"),tt=$("string-to-symbol-registry"),et=$("symbol-to-string-registry"),nt=$("wks"),it=s.QObject,st=!it||!it[B]||!it[B].findChild,rt=o&&l((function(){return 7!=y(G({},"a",{get:function(){return G(this,"a",{value:7}).a}})).a}))?function(t,e,n){var i=z(Q,e);i&&delete Q[e],G(t,e,n),i&&t!==Q&&G(Q,e,i)}:G,at=function(t,e){var n=X[t]=y(W[B]);return U(n,{type:F,tag:t,description:e}),o||(n.description=e),n},ot=u?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof W},ct=function(t,e,n){t===Q&&ct(Z,e,n),v(t);var i=g(e,!0);return v(n),d(X,i)?(n.enumerable?(d(t,J)&&t[J][i]&&(t[J][i]=!1),n=y(n,{enumerable:m(0,!1)})):(d(t,J)||G(t,J,m(1,{})),t[J][i]=!0),rt(t,i,n)):G(t,i,n)},ut=function(t,e){v(t);var n=b(e),i=O(n).concat(vt(n));return M(i,(function(e){o&&!dt.call(n,e)||ct(t,e,n[e])})),t},lt=function(t,e){return void 0===e?y(t):ut(y(t),e)},dt=function(t){var e=g(t,!0),n=V.call(this,e);return!(this===Q&&d(X,e)&&!d(Z,e))&&(!(n||!d(this,e)||!d(X,e)||d(this,J)&&this[J][e])||n)},ft=function(t,e){var n=b(t),i=g(e,!0);if(n!==Q||!d(X,i)||d(Z,i)){var s=z(n,i);return!s||!d(X,i)||d(n,J)&&n[J][i]||(s.enumerable=!0),s}},ht=function(t){var e=K(b(t)),n=[];return M(e,(function(t){d(X,t)||d(I,t)||n.push(t)})),n},vt=function(t){var e=t===Q,n=K(e?Z:b(t)),i=[];return M(n,(function(t){!d(X,t)||e&&!d(Q,t)||i.push(X[t])})),i};if(c||(W=function(){if(this instanceof W)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=P(t),n=function(t){this===Q&&n.call(Z,t),d(this,J)&&d(this[J],e)&&(this[J][e]=!1),rt(this,e,m(1,t))};return o&&st&&rt(Q,e,{configurable:!0,set:n}),at(e,t)},x(W[B],"toString",(function(){return H(this).tag})),x(W,"withoutSetter",(function(t){return at(P(t),t)})),A.f=dt,S.f=ct,k.f=ft,_.f=w.f=ht,C.f=vt,T.f=function(t){return at(E(t),t)},o&&(G(W[B],"description",{configurable:!0,get:function(){return H(this).description}}),a||x(Q,"propertyIsEnumerable",dt,{unsafe:!0}))),i({global:!0,wrap:!0,forced:!c,sham:!c},{Symbol:W}),M(O(nt),(function(t){L(t)})),i({target:F,stat:!0,forced:!c},{for:function(t){var e=String(t);if(d(tt,e))return tt[e];var n=W(e);return tt[e]=n,et[n]=e,n},keyFor:function(t){if(!ot(t))throw TypeError(t+" is not a symbol");if(d(et,t))return et[t]},useSetter:function(){st=!0},useSimple:function(){st=!1}}),i({target:"Object",stat:!0,forced:!c,sham:!o},{create:lt,defineProperty:ct,defineProperties:ut,getOwnPropertyDescriptor:ft}),i({target:"Object",stat:!0,forced:!c},{getOwnPropertyNames:ht,getOwnPropertySymbols:vt}),i({target:"Object",stat:!0,forced:l((function(){C.f(1)}))},{getOwnPropertySymbols:function(t){return C.f(p(t))}}),Y){var pt=!c||l((function(){var t=W();return"[null]"!=Y([t])||"{}"!=Y({a:t})||"{}"!=Y(Object(t))}));i({target:"JSON",stat:!0,forced:pt},{stringify:function(t,e,n){var i,s=[t],r=1;while(arguments.length>r)s.push(arguments[r++]);if(i=e,(h(e)||void 0!==t)&&!ot(t))return f(e)||(e=function(t,e){if("function"==typeof i&&(e=i.call(this,t,e)),!ot(e))return e}),s[1]=e,Y.apply(null,s)}})}W[B][q]||j(W[B],q,W[B].valueOf),N(W,F),I[J]=!0},"0897":function(t,e,n){},1724:function(t,e,n){},"1d43":function(t,e,n){var i=n("8fe5"),s=n("d320").f,r=Function.prototype,a=r.toString,o=/^\s*function ([^ (]*)/,c="name";i&&!(c in r)&&s(r,c,{configurable:!0,get:function(){try{return a.call(this).match(o)[1]}catch(t){return""}}})},"3bae":function(t,e,n){var i=n("f14a"),s=n("8c0f"),r=n("d0fa"),a=n("28e6");for(var o in s){var c=i[o],u=c&&c.prototype;if(u&&u.forEach!==r)try{a(u,"forEach",r)}catch(l){u.forEach=r}}},"3bed":function(t,e,n){},"5b12":function(t,e,n){"use strict";var i=n("9194"),s=n("d192"),r=n("baa9"),a=n("4023"),o=n("b418"),c=n("c11d"),u=n("a187"),l=n("1a58"),d=n("5a62"),f=n("7ce6"),h=[].push,v=Math.min,p=4294967295,b=!f((function(){return!RegExp(p,"y")}));i("split",2,(function(t,e,n){var i;return i="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,n){var i=String(a(this)),r=void 0===n?p:n>>>0;if(0===r)return[];if(void 0===t)return[i];if(!s(t))return e.call(i,t,r);var o,c,u,l=[],f=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),v=0,b=new RegExp(t.source,f+"g");while(o=d.call(b,i)){if(c=b.lastIndex,c>v&&(l.push(i.slice(v,o.index)),o.length>1&&o.index<i.length&&h.apply(l,o.slice(1)),u=o[0].length,v=c,l.length>=r))break;b.lastIndex===o.index&&b.lastIndex++}return v===i.length?!u&&b.test("")||l.push(""):l.push(i.slice(v)),l.length>r?l.slice(0,r):l}:"0".split(void 0,0).length?function(t,n){return void 0===t&&0===n?[]:e.call(this,t,n)}:e,[function(e,n){var s=a(this),r=void 0==e?void 0:e[t];return void 0!==r?r.call(e,s,n):i.call(String(s),e,n)},function(t,s){var a=n(i,t,this,s,i!==e);if(a.done)return a.value;var d=r(t),f=String(this),h=o(d,RegExp),g=d.unicode,m=(d.ignoreCase?"i":"")+(d.multiline?"m":"")+(d.unicode?"u":"")+(b?"y":"g"),y=new h(b?d:"^(?:"+d.source+")",m),O=void 0===s?p:s>>>0;if(0===O)return[];if(0===f.length)return null===l(y,f)?[f]:[];var _=0,w=0,C=[];while(w<f.length){y.lastIndex=b?w:0;var k,S=l(y,b?f:f.slice(w));if(null===S||(k=v(u(y.lastIndex+(b?0:w)),f.length))===_)w=c(f,w,g);else{if(C.push(f.slice(_,w)),C.length===O)return C;for(var A=1;A<=S.length-1;A++)if(C.push(S[A]),C.length===O)return C;w=_=k}}return C.push(f.slice(_)),C}]}),!b)},"62f9":function(t,e,n){var i=n("1f04"),s=n("f8d3"),r=n("e505"),a=n("7ce6"),o=a((function(){r(1)}));i({target:"Object",stat:!0,forced:o},{keys:function(t){return r(s(t))}})},"6abc":function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));n("62f9"),n("01e5"),n("e3b5"),n("9996"),n("3bae"),n("b126");function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function s(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function r(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?s(Object(n),!0).forEach((function(e){i(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}},"71db":function(t,e,n){},9996:function(t,e,n){var i=n("1f04"),s=n("7ce6"),r=n("b7d9"),a=n("38e3").f,o=n("8fe5"),c=s((function(){a(1)})),u=!o||c;i({target:"Object",stat:!0,forced:u,sham:!o},{getOwnPropertyDescriptor:function(t,e){return a(r(t),e)}})},b126:function(t,e,n){var i=n("1f04"),s=n("8fe5"),r=n("f725"),a=n("b7d9"),o=n("38e3"),c=n("98a5");i({target:"Object",stat:!0,sham:!s},{getOwnPropertyDescriptors:function(t){var e,n,i=a(t),s=o.f,u=r(i),l={},d=0;while(u.length>d)n=s(i,e=u[d++]),void 0!==n&&c(l,e,n);return l}})},bd91:function(t,e,n){var i=n("1188"),s=n("2ccf"),r=n("ca66"),a=n("d320").f;t.exports=function(t){var e=i.Symbol||(i.Symbol={});s(e,t)||a(e,t,{value:r.f(t)})}},bde7:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"submitOrder"},[n("div",{staticClass:"topNav"},[n("van-nav-bar",{attrs:{title:"订单结算","left-text":"返回","left-arrow":""},on:{"click-left":t.clickBack}})],1),n("div",{staticClass:"selectAddress"},[n("div",{staticClass:"select"},[n("div",{staticClass:"s-address",on:{click:t.clickSelect}},[t._v("选择地址")]),n("van-icon",{attrs:{name:"arrow"}})],1),n("div",{staticClass:"address-box"},[n("div",{staticClass:"user-info"},[n("div",{staticClass:"user-name"},[t._v(t._s(t.AdressList.name))]),n("div",{staticClass:"phone"},[t._v(t._s(t.AdressList.tel))]),t.isShowDefault?n("div",{staticClass:"default"},[t._v("默认")]):t._e()]),n("div",{staticClass:"address-detail"},[t._v(t._s(t.AdressList.address))])])]),n("ProductItems",{attrs:{buyIntemDatas:t.buyIntemDatas}},[n("div",{staticClass:"shopMsg"},[t._v("订单信息")])]),n("div",{staticClass:"accountOrder"},[n("van-button",{attrs:{color:"#C7A76D",block:"",round:""},on:{click:t.accountOrder}},[t._v("结 算 订 单")])],1)],1)},s=[],r=n("6abc"),a=(n("1d43"),n("7736")),o=(n("1724"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"productItems"},[t._t("default"),t._l(t.buyIntemDatas,(function(e,i){return n("div",{key:i+1,staticClass:"item-box"},[n("div",{staticClass:"pay-title-box"},[n("div",{staticClass:"pay-t"},[t._v(t._s(e.oid))]),2===e.status?n("div",{staticClass:"pay-s"},[n("div",{staticClass:"pay-text"},[t._v("已完成")]),n("div",{staticClass:"pay-icon",on:{click:function(n){return t.removeOrder(e.oid,i)}}},[n("van-icon",{attrs:{name:"delete-o"}})],1)]):t._e(),1===e.status?n("div",{staticClass:"pay-s"},[n("div",{staticClass:"pay-text",on:{click:function(n){return t.confirmOrder(e,i)}}},[t._v("确认订单")])]):t._e()]),n("div",{staticClass:"pic"},[n("img",{attrs:{src:e.small_img,alt:""}})]),n("div",{staticClass:"info"},[n("div",{staticClass:"name"},[t._v(t._s(e.name))]),n("div",{staticClass:"enname"},[t._v(t._s(e.enname))]),n("div",{staticClass:"select"},[t._v(t._s(e.rule))]),n("div",{staticClass:"priceNum"},[n("div",{staticClass:"price"},[t._v(" ¥ "),n("span",[t._v(t._s(t._f("prevMoney")(e.price)))]),t._v(" "+t._s(t._f("lastMoney")(e.price))+" ")]),n("div",{staticClass:"numbers"},[t._v("x"+t._s(e.count))])])])])})),n("div",{staticClass:"orderInfo"},[n("div",{staticClass:"numTime"},[n("div",{staticClass:"times"},[t._v(t._s(t.nowTimes))]),n("div",{staticClass:"count"},[t._v(" 共 "),n("span",[t._v(t._s(t._f("numbers")(t.buyIntemDatas)))]),t._v(" 件商品 ")])]),n("div",{staticClass:"price"},[n("span",{staticClass:"total"},[t._v("合计：")]),t._v("¥ "),n("span",{staticClass:"money"},[t._v(t._s(t._f("prevTotal")(t.buyIntemDatas)))]),t._v(" "+t._s(t._f("lastTotal")(t.buyIntemDatas))+" ")])])],2)}),c=[],u=(n("16ca"),n("5b12"),n("9b5f"),n("3bae"),n("3bed"),{name:"ProductItems",props:["buyIntemDatas"],data:function(){return{nowTimes:""}},computed:Object(r["a"])({},Object(a["c"])(["buyAid"])),created:function(){console.log(this.buyIntemDates),this.orderTime()},methods:{orderTime:function(){var t=new Date,e=t.getFullYear(),n=t.getMonth()+1,i=t.getDate(),s=t.getHours(),r=t.getMinutes(),a=t.getSeconds(),o="".concat(e,"-").concat(n,"-").concat(i," ").concat(s,":").concat(r,":").concat(a);this.nowTimes=o},removeOrder:function(){},confirmOrder:function(){}},filters:{prevMoney:function(t){return t.split(".")[0]},lastMoney:function(t){return"."+t.split(".")[1]},numbers:function(t){var e=0;return t.forEach((function(t){e+=t.count})),e},prevTotal:function(t){var e=0;return t.forEach((function(t){e+=t.count*t.price})),e=String(e),e.split(".")[0]},lastTotal:function(t){var e=0;return t.forEach((function(t){e+=t.count*t.price})),e=String(e),e.indexOf(".")<=-1&&(e+=".00"),"."+e.split(".")[1]}}}),l=u,d=(n("d261"),n("5d22")),f=Object(d["a"])(l,o,c,!1,null,"6c82278c",null),h=f.exports,v={name:"SubmitOrder",data:function(){return{chosenAddressId:0,AdressList:{},loadingAdressAid:"",isShowDefault:!1,buyIntemDatas:[]}},components:{ProductItems:h},computed:Object(r["a"])({},Object(a["c"])(["aid","buyAid","shopbagNumbers"])),created:function(){this.$route.query.selectAdress?this.loadingAdressAid=this.$route.query.selectAdress:this.loadingAdressAid=this.aid,this.loadingAddress(),this.loadingItems()},methods:Object(r["a"])(Object(r["a"])({},Object(a["b"])(["changeShopbagNum"])),{},{clickBack:function(){this.$router.push({name:"Shopbag"})},loadingAddress:function(){var t=this,e=this.$cookies.get("loginReturnToken");this.$axios({method:"get",url:this.$axios.defaults.baseURL+"/findAddressByAid",params:{appkey:this.appkey,tokenString:e,aid:this.loadingAdressAid}}).then((function(e){var n=e.data.result[0];4e4==e.data.code?(t.isShowDefault=!!n,t.AdressList={id:n.aid,name:n.name,tel:n.tel,address:n.province+n.city+n.county+n.addressDetail,isDefault:Boolean(n.isDefault)}):t.$toast({message:e.data.msg,duration:2e3,forbidClick:!0})})).catch((function(t){console.log(t)}))},clickSelect:function(){this.$router.push({name:"AddressList",query:{isFromSubmitOrder:!0}})},editAddAddress:function(){console.log("编辑地址")},accountOrder:function(){var t=this;if(!this.loadingAdressAid)return this.$toast({message:"请选择收货地址",forbidClick:!0,duration:3e3});var e=this.$cookies.get("loginReturnToken");if(!e)return this.$router.push({name:"Login"});var n={appkey:this.appkey,tokenString:e,sids:JSON.stringify(this.buyAid),phone:this.AdressList.tel,address:this.AdressList.address,receiver:this.AdressList.name};this.axios({method:"POST",url:this.$axios.defaults.baseURL+"/pay",data:n}).then((function(e){if(t.$toast.clear(),700==e.data.code)return t.$toast({message:e.data.msg,forbidClick:!0,duration:3e3}),t.$router.push({name:"Login"});6e4===e.data.code?(t.changeShopbagNum(t.shopbagNumbers-t.buyAid.length),t.$router.push({name:"AccountOrder"})):t.$toast({message:e.data.msg,forbidClick:!0,duration:3e3})})).catch((function(e){t.$toast.clear(),console.log("err ==> ",e)}))},loadingItems:function(){var t=this,e=this.$cookies.get("loginReturnToken");this.$toast.loading({message:"加载中...",duration:0,forbidClick:!0}),this.$axios({method:"get",url:this.$axios.defaults.baseURL+"/commitShopcart",params:{appkey:this.appkey,tokenString:e,sids:JSON.stringify(this.buyAid)}}).then((function(e){if(t.$toast.clear(),700==e.data.code)return t.$toast({message:e.data.msg,duration:"3000",forbidClick:!0}),void t.$router.push("Login");if(5e4==e.data.code){var n=e.data.result;t.buyIntemDatas=n}else t.$toast({message:e.data.msg,duration:"3000",forbidClick:!0})})).catch((function(t){console.log(t)}))}})},p=v,b=(n("c45c"),Object(d["a"])(p,i,s,!1,null,"4f1136ba",null));e["default"]=b.exports},c45c:function(t,e,n){"use strict";n("71db")},ca66:function(t,e,n){var i=n("3086");e.f=i},d085:function(t,e,n){var i=n("b7d9"),s=n("a34a").f,r={}.toString,a="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],o=function(t){try{return s(t)}catch(e){return a.slice()}};t.exports.f=function(t){return a&&"[object Window]"==r.call(t)?o(t):s(i(t))}},d0fa:function(t,e,n){"use strict";var i=n("59bf").forEach,s=n("d714"),r=s("forEach");t.exports=r?[].forEach:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}},d261:function(t,e,n){"use strict";n("0897")},d714:function(t,e,n){"use strict";var i=n("7ce6");t.exports=function(t,e){var n=[][t];return!!n&&i((function(){n.call(null,e||function(){throw 1},1)}))}}}]);
//# sourceMappingURL=chunk-0816c96a.4fc29c58.js.map