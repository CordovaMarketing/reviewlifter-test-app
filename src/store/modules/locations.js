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
          if (response.data.hasOwnProperty('status')) {
            commit(types.SHOW_SNACKBAR, response.data.status)
          } else {
            commit(types.ADD_PLACE, response.data)
            commit(types.SHOW_SNACKBAR, 'Location saved!')
          }
        })
        .catch(function (error) {
          console.log(error)
          commit(types.SHOW_SNACKBAR, 'Error Saving!')
        })
    }
    // else send to server, if success, commmit
  },
  loadLocations ({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      if (getters.locations.length > 0) {
        commit(types.CLEAR_LOCATIONS)
      }
      HTTP.get('locations').then(response => {
        response.data.forEach(location => commit(types.ADD_PLACE, location))
        resolve()
      })
    })
  },
  deleteLocation ({ commit, dispatch }, location) {
    HTTP.post('deletelocation', location)
      .then(response => {
        dispatch('loadLocations')
        dispatch('loadUser')
        dispatch('loadCustomers')
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
  },
  CLEAR_LOCATIONS (s) {
    s.locations = []
  }
}

// EXPORT

export default {
  state,
  getters,
  actions,
  mutations
}
