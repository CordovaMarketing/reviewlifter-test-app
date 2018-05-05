<template>
  <v-app>
    <AuthModal @signedIn="loggedIn = true" :visible="!loggedIn" />
    <RegisterModal @register="registered = true" :visible="loggedIn && !registered"/>

    <v-navigation-drawer persistent v-model="drawer" enable-resize-watcher fixed app>
      <UserHeader/>
      <SideNav/>
    </v-navigation-drawer>
    
    <v-toolbar app :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>

    <!-- <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer> -->

    <v-snackbar v-model="snackbar.show">
        {{snackbar.text}}
        <v-btn flat color="pink" @click.native="hideSnackbar()">Close</v-btn>
    </v-snackbar>

  </v-app>
</template>

<script>
import UserHeader from './nav/UserHeader'
import SideNav from './nav/SideNav'
import AuthModal from './AuthModal'
import RegisterModal from './RegisterModal'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      title: 'Review Lifter',
      response: ''
    }
  },
  mounted () {
  },
  methods: {
    hideSnackbar () {
      this.$store.dispatch('hideSnackbar')
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'locations',
      'snackbar'
    ]),
    loggedIn () {
      // console.log(this.user)
      return this.user
    },
    registered () {
      return this.locations.length > 0
    }
  },
  components: {
    UserHeader,
    SideNav,
    AuthModal,
    RegisterModal
  },

  name: 'App'
}
</script>
