// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import GoogleAuth from 'vue-google-auth'
import Vuex from 'vuex'

import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  transitions,
  VCard,
  VSubheader,
  VDialog,
  VSelect,
  VStepper,
  VDivider
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    transitions,
    VCard,
    VSubheader,
    VDialog,
    VSelect,
    VStepper,
    VDivider
  }
})

Vue.use(GoogleAuth, {
  client_id:
    '951992347356-doa0sc977nupoknfgat93elqv53si6n0.apps.googleusercontent.com'
})
Vue.googleAuth().load()

Vue.use(Vuex)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
