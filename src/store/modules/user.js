import * as types from '../mutation-type'
import { HTTP } from '../../http-common'

// STATE

const state = {
  user: null,
  token: {},
  snackbar: { show: false, text: '' },
  stripeKey: ''
}

// GETTERS

const getters = {
  user: s => s.user,
  token: s => s.token,
  snackbar: s => s.snackbar,
  stripeKey: s => s.stripeKey
}

// ACTIONS

const actions = {
  setUser ({ commit, dispatch }, userToAdd) {
    dispatch('loadLocations').then(() => {
      commit(types.SET_USER, userToAdd)
    })
  },
  setToken ({ commit }, tokenToAdd) {
    commit(types.SET_TOKEN, tokenToAdd)
  },
  showSnackbar ({ commit }, text) {
    // send to server, if success, commmit
    commit(types.SHOW_SNACKBAR, text)
  },
  hideSnackbar ({ commit }) {
    // send to server, if success, commmit
    commit(types.HIDE_SNACKBAR)
  },
  addPlan ({ commit }, info) {
    HTTP.post('pay', info)
      .then(response => {
        commit(types.UPDATE_PLAN, name)
        commit(types.SHOW_SNACKBAR, 'Billing setup!')
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  setStripeKey({ commit }){
    HTTP.get('cardtoken')
    .then(response => {
      commit(types.SET_STRIPEKEY,response.data.stripekey)
    })
    .catch(function (error) {
      console.log(error)
    })
  }
}

// MUTATIONS

/* eslint no-param-reassign:
    ["error", { "props": false}] */

const mutations = {
  SET_USER (s, userToAdd) {
    s.user = userToAdd
  },
  SET_TOKEN (s, tokenToAdd) {
    s.token = tokenToAdd
  },
  SHOW_SNACKBAR (s, text) {
    s.snackbar.text = text
    s.snackbar.show = true
  },
  HIDE_SNACKBAR (s) {
    s.snackbar.text = ''
    s.snackbar.show = false
  },
  SET_STRIPEKEY (s, key) {
    s.stripeKey = key
  },
  UPDATE_PLAN (s, plan){
    s.user.plan = plan
  },
}

// EXPORT

export default {
  state,
  getters,
  actions,
  mutations
}
