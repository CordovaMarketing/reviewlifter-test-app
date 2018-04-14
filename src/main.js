// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import GoogleAuth from 'vue-google-auth'
import Vuex from 'vuex'
import 'vue-googlemaps/dist/vue-googlemaps.css'
import VueGoogleMaps from 'vue-googlemaps'
import AddLocation from '@/components/locations/AddLocation'

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

Vue.use(VueGoogleMaps, {
  load: {
    apiKey: 'AIzaSyDe-2Yxn9TgT9fWBc3b_8V8b6tm3-kH-88',
    libraries: ['places']
  }
})

Vue.use(GoogleAuth, {
  client_id:
    '548156398963-gmpe9plbplamq59nlov1d9u0kuuh3q01.apps.googleusercontent.com'
})
Vue.googleAuth().load()

Vue.use(Vuex)

Vue.config.productionTip = false

Vue.component('AddLocation', AddLocation)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
