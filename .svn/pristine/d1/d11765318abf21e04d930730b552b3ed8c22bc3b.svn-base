import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    traverInfo: [],
    traverStatus: false,
    contactInfo: {},
    contactStatus: false,
    viaCheck: false
  },
  getters: { // 添加getters

  },
  mutations: { // 添加mutations
    setTraverInfo (state, info) {
      state.traverInfo = info;
      state.traverStatus = true;
    },
    setContactInfo (state, info) {
      state.contactInfo = info;
      state.contactStatus = true;
    },
    setViaCheck (state, flag) {
      state.viaCheck = flag;
      console.log(state.viaCheck);
    }
  }
})

export default store;
