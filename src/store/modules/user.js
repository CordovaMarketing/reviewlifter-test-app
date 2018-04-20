import * as types from '../mutation-type'

// STATE

const state = {
  user: null,
  token: {},
  snackbar: { show: false, text: '' }
}

// GETTERS

const getters = {
  user: s => s.user,
  token: s => s.token,
  snackbar: s => s.snackbar
}

// ACTIONS

const actions = {
  setUser ({ commit }, userToAdd) {
    commit(types.SET_USER, userToAdd)
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
  }
}

// EXPORT

export default {
  state,
  getters,
  actions,
  mutations
}
