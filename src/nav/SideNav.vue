<template>
  <v-list class="pt-0" dense>
    <v-list-tile
      value="true"
      v-for="(item, i) in items"
      :key="i"
      v-if="checkPermissions(item)"
      :to="{path: item.path}"
    >
      <v-list-tile-action>
        <v-icon v-html="item.icon"></v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title v-text="item.title"></v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      items: [{ // this will be data driven based on rolls.
        icon: 'home',
        title: 'Home',
        path: '/'
      },
      {
        icon: 'location_on',
        title: 'Locations',
        path: '/locations'
      },
      {
        icon: 'person_pin',
        title: 'Invitations Sent',
        path: '/customers'
      },
      {
        icon: 'add',
        title: 'Send Invites',
        path: '/addcustomers'
      },
      {
        icon: 'settings',
        title: 'Settings',
        path: 'settings'
      }]
    }
  },
  methods: {
    checkPermissions (item) {
      return (item.path === '/addcustomers' || item.path === '/customers') || (this.user && this.user.accttype === 'client')
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  }
}
</script>

<style>
</style>
<v-icon class="text-lg-right" ></v-icon>