import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    shopbagNumbers:0,
    isPicActiveShow:false,
    aid:"",
    buyAid:[],
    // isGoHome:false
  },
  mutations: {
    changeShopbagNum(state,num){
      state.shopbagNumbers = num;
    },
    changeIsPicActiveShow(state,isBoolean){
      state.isPicActiveShow = isBoolean;
    },
    changeAid(state,aids){
      state.aid = aids;
    },
    changeBuyAid(state,aids){
      state.buyAid = aids;
    }
    
  },
  actions: {
  },
  modules: {
  },
  plugins:[createPersistedState()],
})
