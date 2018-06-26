import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import locations from './modules/locations'
import customers from './modules/customers'

Vue.use(Vuex)

/* eslint no-param-reassign:
    ["error", { "props": true, "ignorePropertyModificationsFor": ["state"] }] */

export default new Vuex.Store({
  modules: {
    user,
    locations,
    customers
  }
})
