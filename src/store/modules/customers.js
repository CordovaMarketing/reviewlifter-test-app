import * as types from '../mutation-type'
import { HTTP } from '../../http-common'

// STATE

const state = {
  customers: []
}

// GETTERS

const getters = {
  customers: s => s.customers
}

// ACTIONS

const actions = {
  addCustomer ({ commit }, customer) {
    HTTP.post('/enduser', customer)
      .then(response => {
        commit(types.ADD_CUSTOMER, customer)
        commit(types.SHOW_SNACKBAR, 'Customer saved!')
      })
      .catch(function (error) {
        console.log(error)
        commit(types.SHOW_SNACKBAR, 'Error Saving!')
      })
  },
  loadCustomer ({ commit }) {
    return new Promise((resolve, reject) => {
      HTTP.get('cutomers').then(response => {
        response.data.forEach(customer => commit(types.ADD_CUSTOMER, customer))
        resolve()
      })
    })
  }
}

// MUTATIONS

/* eslint no-param-reassign:
    ["error", { "props": false}] */

const mutations = {
  ADD_CUSTOMER (s, customer) {
    s.customers.push(customer)
  }
}

// EXPORT

export default {
  state,
  getters,
  actions,
  mutations
}
