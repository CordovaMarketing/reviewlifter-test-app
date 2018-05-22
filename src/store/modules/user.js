import * as types from '../mutation-type'
import { HTTP } from '../../http-common'
import Vue from 'vue'

// STATE

const state = {
  user: null,
  token: {},
  snackbar: { show: false, text: '' },
  cardInfo: {}
}

// GETTERS

const getters = {
  user: s => s.user,
  token: s => s.token,
  snackbar: s => s.snackbar,
  cardInfo: s => s.cardInfo
}

// ACTIONS

const actions = {
  setUser ({ commit, dispatch }, userToAdd) {
    dispatch('getCardInfo')
    dispatch('loadLocations').then(() => {
      commit(types.SET_USER, userToAdd)
    })
    dispatch('loadCustomers')
  },
  loadUser ({ commit }, user) {
    HTTP.get('clientuser')
      .then(response => {
        commit(types.SET_USER, response.data)
      })
      .catch(function (error) {
        console.log(error)
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
        commit(types.SET_USER, response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  setToken ({ commit }, tokenToAdd) {
    commit(types.SET_TOKEN, tokenToAdd)
  },
  signOut ({ commit, dispatch }) {
    Vue.googleAuth().signOut(function () {
      location.reload()
    }, function (error) {
      console.log(error)
    })
  },
  addSubUser ({ commit, getters }, subuser) {
    HTTP.post('addsubuser', subuser)
      .then(response => {
        getters.user.subusers = subuser.newSubusers
        commit(types.SET_USER, getters.user)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  removeSubUser ({ commit, getters }, subuserToRemove) {
    HTTP.post('removesubuser', { email: subuserToRemove.email })
      .then(response => {
        var user = getters.user
        if (getters.user.subusers) {
          var subusers = user.subusers
          subusers = subusers.filter(
            item => item.email !== subuserToRemove.email
          )
          user.subusers = subusers
        }
        commit(types.SET_USER, user)
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
        commit(types.UPDATE_PLAN, response.data)
        commit(types.SHOW_SNACKBAR, 'Billing setup!')
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  updateCard ({ commit, dispatch }, info) {
    HTTP.post('changecard', info)
      .then(response => {
        dispatch('getCardInfo')
        commit(types.SHOW_SNACKBAR, 'Card changed!')
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  getCardInfo ({ commit }) {
    HTTP.get('card')
      .then(response => {
        commit(types.SET_CARDINFO, {
          exp_year: response.data.exp_year,
          brand: response.data.brand,
          last4: response.data.last4
        })
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
  UPDATE_PLAN (s, data) {
    s.user.plan = data.plan
    s.user.stripeid = data.stripeid
  },
  SET_CARDINFO (s, info) {
    s.cardInfo = info
  }
}

// EXPORT

export default {
  state,
  getters,
  actions,
  mutations
}
