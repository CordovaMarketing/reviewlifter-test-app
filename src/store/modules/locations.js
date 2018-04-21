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
    if (getters.locations.some(e => e.placeid === place.place_id)) {
      // maybe just update the existing one call the mutator
      commit(types.SHOW_SNACKBAR, 'Location already exists.')
    } else {
      const formatedPlace = {
        public_id: 'a4db5eed-12ee-414f-b4f6-78b5c77886f0',
        clientid: getters.user.id,
        placeid: place.place_id,
        subcripstionid: '',
        sendername: place.manager,
        phone: place.international_phone_number,
        gitpagelink: '',
        businessname: place.name,
        reviewlink: '',
        reviewinvitetext: '',
        streetaddress: place.formatted_address,
        features: '',
        comments: '',
        reviewsites: ''
      }
      HTTP.post('http://localhost:5000/location', [formatedPlace])
        .then(response => {
          console.log(response)
          commit(types.ADD_PLACE, formatedPlace)
          commit(types.SHOW_SNACKBAR, 'Location saved!')
        })
        .catch(function (error) {
          console.log(error)
          commit(types.SHOW_SNACKBAR, 'Error Saving!')
        })
    }
    // else send to server, if success, commmit
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
