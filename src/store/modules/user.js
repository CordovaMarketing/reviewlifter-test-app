import * as types from '../mutation-type'
import { HTTP } from '../../http-common'

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
