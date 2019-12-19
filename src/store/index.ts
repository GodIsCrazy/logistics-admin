import Vue from 'vue'
import Vuex from 'vuex'
import myModule from './modules'
import myGetters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    ...myModule
  },
  getters: {
    ...myGetters
  }
})
