import * as types from '../mutation-type'
import { HTTP } from '../../http-common'

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
  addLocation ({ getters, commit }, place) {
    if (getters.locations.some(e => e.placeid === place.placeid)) {
      HTTP.put('location', place)
        .then(response => {
          commit(types.UPDATE_PLACE, place)
          commit(types.SHOW_SNACKBAR, 'Location updated!')
        })
        .catch(function (error) {
          console.log(error)
          commit(types.SHOW_SNACKBAR, 'Error Saving!')
        })
    } else {
      HTTP.post('locations', [place])
        .then(response => {
          commit(types.ADD_PLACE, place)
          commit(types.SHOW_SNACKBAR, 'Location saved!')
        })
        .catch(function (error) {
          console.log(error)
          commit(types.SHOW_SNACKBAR, 'Error Saving!')
        })
    }
    // else send to server, if success, commmit
  },
  loadLocations ({ commit }) {
    return new Promise((resolve, reject) => {
      HTTP.get('locations').then(response => {
        response.data.forEach(location => commit(types.ADD_PLACE, location))
        resolve()
      })
    })
  }
}

// MUTATIONS

/* eslint no-param-reassign:
    ["error", { "props": false}] */

const mutations = {
  ADD_PLACE (s, place) {
    s.locations.push(place)
  },
  UPDATE_PLACE (s, place) {
    s.locations = s.locations.filter(p => p.placeid !== place.placeid)
    s.locations.push(place)
  }
}

// EXPORT

export default {
  state,
  getters,
  actions,
  mutations
}
