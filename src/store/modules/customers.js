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
  addCustomer ({ commit, getters }, customer) {
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
  loadCustomers ({ commit }) {
    return new Promise((resolve, reject) => {
      HTTP.get('/locationusers').then(response => {
        response.data.forEach(customer => commit(types.ADD_CUSTOMER, customer))
        resolve()
      })
    })
  },
  deteleCustomer ({ commit }, customer) {}
}

// MUTATIONS

/* eslint no-param-reassign:
    ["error", { "props": false}] */

const mutations = {
  ADD_CUSTOMER (s, customer) {
    s.customers.push(customer)
  },
  DELETE_CUSTOMER (s, customer) {
    s.customer = s.customer.filter(c => c.userid !== customer.userid)
  }
}

// EXPORT

export default {
  state,
  getters,
  actions,
  mutations
}
