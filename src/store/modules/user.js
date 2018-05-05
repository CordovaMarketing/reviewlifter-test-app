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
  updateUser ({ commit, dispatch }, user) {
    const userUpdate = {
      stripeid: user.stripeid,
      preflocation: user.preflocation,
      accttype: user.accttype,
      email: user.email,
      personalphone: user.personalphone,
      firstname: user.firstname,
      lastname: user.lastname,
      website: user.website,
      salesperson: user.salseperson,
      monthlyrate: user.monthlyrate
    }
    HTTP.put('clientuser', userUpdate)
      .then(response => {
        commit(types.SET_USER, userUpdate)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  setToken ({ commit }, tokenToAdd) {
    commit(types.SET_TOKEN, tokenToAdd)
  },
  addSubUser ({ commit, getters }, subuserToAdd) {
    HTTP.post('addsubuser', subuserToAdd)
      .then(response => {
        if (getters.user.subusers) {
          var subusers = JSON.parse(getters.user.subusers)
          subusers.push(subuserToAdd)
          getters.user.subusers = JSON.stringify(subusers)
        } else {
          getters.user.subusers = JSON.stringify([subuserToAdd])
        }
        commit(types.SET_USER, getters.user)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  removeSubUser ({ commit, getters }, subuserToRemove) {
    HTTP.post('removesubuser', { email: subuserToRemove.email })
      .then(response => {
        if (getters.user.subusers) {
          var subusers = JSON.parse(getters.user.subusers)
          subusers = subusers.filter(
            item => item.email !== subuserToRemove.email
          )
          getters.user.subusers = JSON.stringify(subusers)
        }
        commit(types.SET_USER, getters.user)
      })
      .catch(function (error) {
        console.log(error)
      })
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
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  setStripeKey ({ commit }) {
    HTTP.get('cardtoken')
      .then(response => {
        commit(types.SET_STRIPEKEY, response.data.stripekey)
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
  UPDATE_PLAN (s, plan) {
    s.user.plan = plan
  }
}

// EXPORT

export default {
  state,
  getters,
  actions,
  mutations
}
