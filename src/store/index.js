import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    email: '',
  },
  mutations: {
    setUser(state, data){
      state.user = data;
    },

    async setEmail( state, data ){
      state.email = data;
    }
  },
  actions: {
    setUserData(context, data){
      context.commit("setUser", data);
    },

    setMail(context, data){
      context.commit("setEmail", data);
    },
  },
  modules: {
  }
})
