<template>
  <v-app>
    <!-- <AuthModal @signedIn="loggedIn = true" :visible="!loggedIn" />
    <RegisterModal @register="registered = true" :visible="loggedIn && !registered"/> -->

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

    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>

  </v-app>
</template>

<script>
import axios from 'axios'
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
      registered: false, // TODO - make computed
      // loggedIn: false, // TODO - make computed
      title: 'Review Lifter',
      response: ''
    }
  },
  mounted () {
    axios.get(`http://localhost:5000`)
      .then(response => {
        // JSON responses are automatically parsed.
        console.log(response.data)
      })
      .catch(e => {
        this.errors.push(e)
      })

    // async / await version (created() becomes async created())
    //
    // try {
    //   const response = await axios.get(`http://jsonplaceholder.typicode.com/posts`)
    //   this.posts = response.data
    // } catch (e) {
    //   this.errors.push(e)
    // }
  },
  computed: {
    ...mapGetters([
      'user'
    ]),
    loggedIn () {
      console.log(this.user)
      return this.user
    }
    // registered () {
    //   TODO - make registered computed
    // }
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
