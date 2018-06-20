// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import GoogleAuth from 'vue-google-auth'
import Vuex from 'vuex'
import * as VueGoogleMaps from 'vue2-google-maps'
import AddLocation from '@/components/locations/AddLocation'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios'

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
  VDivider,
  VTextField,
  VSnackbar,
  VForm,
  VCheckbox,
  VDataIterator,
  VSwitch,
  VDataTable
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'
import colors from 'vuetify/es5/util/colors'

Vue.use(VueAxios, axios)

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
    VDivider,
    VTextField,
    VSnackbar,
    VForm,
    VCheckbox,
    VDataIterator,
    VSwitch,
    VDataTable
  },
  theme: {
    primary: colors.blue.darken1, // #E53935
    secondary: colors.blue.lighten4, // #FFCDD2
    accent: colors.indigo.base // #3F51B5
  }
})

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCD85AAKkEHyTKM6MH12SLJJz1zOf_fKHI',
    libraries: 'places'
  },
  installComponents: true
})

// Vue.component('GmapAutocomplete', GmapAutocomplete)

Vue.use(GoogleAuth, {
  client_id:
    '548156398963-gmpe9plbplamq59nlov1d9u0kuuh3q01.apps.googleusercontent.com'
})
Vue.googleAuth().load()

Vue.use(VueAuthenticate, {
  baseUrl: 'https://review-lifter-prod-api.herokuapp.com/', // Your API domain

  providers: {
    google: {
      clientId:
        '548156398963-gmpe9plbplamq59nlov1d9u0kuuh3q01.apps.googleusercontent.com',
      redirectUri: 'https://druo0vibxg7ct.cloudfront.net' // Your client app URL
    }
  }
})

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
