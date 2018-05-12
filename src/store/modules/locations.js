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
  addLocation ({ getters, commit, dispatch }, place) {
    if (getters.locations.find(e => e.placeid === place.placeid)) {
      HTTP.put('location', place)
        .then(response => {
          commit(types.UPDATE_PLACE, response.data)
          commit(types.SHOW_SNACKBAR, 'Location updated!')
        })
        .catch(function (error) {
          console.log(error)
          commit(types.SHOW_SNACKBAR, 'Error Saving!')
        })
    } else {
      HTTP.post('location', place)
        .then(response => {
          commit(types.ADD_PLACE, response.data)
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
  },
  deleteLocation ({ commit }, location) {
    HTTP.post('deletelocation', location)
      .then(response => {
        commit(types.DELETE_LOCATION, location)
        commit(types.SHOW_SNACKBAR, 'Location deleted!')
      })
      .catch(function (error) {
        console.log(error)
        commit(types.SHOW_SNACKBAR, 'Error deleting!')
      })
  }
}

// MUTATIONS

const mutations = {
  ADD_PLACE (s, place) {
    s.locations.push(place)
  },
  UPDATE_PLACE (s, place) {
    s.locations = s.locations.map(
      p => (p.placeid === place.placeid ? place : p)
    )
  },
  DELETE_LOCATION (s, location) {
    s.locations = s.locations.filter(l => l.placeid !== location.placeid)
  }
}

// EXPORT

export default {
  state,
  getters,
  actions,
  mutations
}
