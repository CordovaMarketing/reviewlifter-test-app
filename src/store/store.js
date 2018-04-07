import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex)

/* eslint no-param-reassign:
    ["error", { "props": true, "ignorePropertyModificationsFor": ["state"] }] */

export default new Vuex.Store({
  modules: {
    user
  }
})
