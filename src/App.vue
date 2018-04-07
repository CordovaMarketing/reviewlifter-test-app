<template>
  <v-app>
    
    <v-navigation-drawer persistent v-model="drawer" enable-resize-watcher fixed app>
      <UserHeader/>
      <SideNav/>
    </v-navigation-drawer>
    
    <v-toolbar app :clipped-left="clipped">
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
     <!--  <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn> -->
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
import UserHeader from './UserHeader'
import SideNav from './SideNav'
export default {
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      title: 'Review Lifter'
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
  components: {
    UserHeader,
    SideNav
  },

  name: 'App'
}
</script>
