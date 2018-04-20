import * as types from '../mutation-type'

// STATE

const state = {
  locations: []
}

// GETTERS

const getters = {
  locations: s => s.locations
}

// ACTIONS

const actions = {
  addLocation ({ commit }, place) {
    // if it is already in the the store, send and update message
    // else send to server, if success, commmit
    const formatedPlace = place
    commit(types.ADD_PLACE, formatedPlace)
    commit(types.SHOW_SNACKBAR, 'Location saved!')
  }
}

// MUTATIONS

/* eslint no-param-reassign:
    ["error", { "props": false}] */

const mutations = {
  ADD_PLACE (s, formatedPlace) {
    s.locations.push(formatedPlace)
  }
}

// EXPORT

export default {
  state,
  getters,
  actions,
  mutations
}
