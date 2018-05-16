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
    if (getters.customers.find(e => e.public_id === customer.public_id)) {
      HTTP.put('/enduser', customer)
        .then(response => {
          commit(types.UPDATE_CUSTOMER, response.data)
          commit(types.SHOW_SNACKBAR, 'Customer updated!')
        })
        .catch(function (error) {
          console.log(error)
          commit(types.SHOW_SNACKBAR, 'Error Saving!')
        })
    } else {
      HTTP.post('/enduser', customer)
        .then(response => {
          commit(types.ADD_CUSTOMER, response.data)
          commit(types.SHOW_SNACKBAR, 'Customer saved!')
        })
        .catch(function (error) {
          console.log(error)
          commit(types.SHOW_SNACKBAR, 'Error Saving!')
        })
    }
  },
  loadCustomers ({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      HTTP.get('/locationusers').then(response => {
        response.data.forEach(customer => commit(types.ADD_CUSTOMER, customer))
        resolve()
      })
    })
  },
  deleteCustomer ({ commit }, customer) {
    HTTP.post('/deletecustomer', customer)
      .then(response => {
        commit(types.DELETE_CUSTOMER, customer)
        commit(types.SHOW_SNACKBAR, 'Customer deleted!')
      })
      .catch(function (error) {
        console.log(error)
        commit(types.SHOW_SNACKBAR, 'Error deleting!')
      })
  }
}

// MUTATIONS

const mutations = {
  ADD_CUSTOMER (s, customer) {
    s.customers.push(customer)
  },
  DELETE_CUSTOMER (s, customer) {
    s.customers = s.customers.filter(c => c.public_id !== customer.public_id)
  },
  UPDATE_CUSTOMER (s, customer) {
    s.customers = s.customers.map(
      p => (p.public_id === customer.public_id ? customer : p)
    )
  }
}

// EXPORT

export default {
  state,
  getters,
  actions,
  mutations
}
