import * as types from '../mutation-type'

// STATE

const state = {
  user: null,
  token: {}
}

// GETTERS

const getters = {
  user: s => s.user,
  token: s => s.token
}

// ACTIONS

const actions = {
  setUser ({ commit }, userToAdd) {
    commit(types.SET_USER, userToAdd)
  },
  setToken ({ commit }, tokenToAdd) {
    commit(types.SET_TOKEN, tokenToAdd)
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
  }
}

// EXPORT

export default {
  state,
  getters,
  actions,
  mutations
}
