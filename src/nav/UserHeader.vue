<template>
  <v-toolbar flat class="transparent"> 
    <v-list class="pa-0">
      <v-list-tile v-if="user" avatar>
        <v-list-tile-avatar>
          <img :src="user.picture">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{user.given_name}} {{user.family_name}}</v-list-tile-title>
        </v-list-tile-content>
          <v-icon class="text-lg-right" >settings</v-icon>
      </v-list-tile>
      <v-list-tile v-else avatar>
        <v-list-tile-avatar>
          <v-icon>account_circle</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>John Doe</v-list-tile-title>
        </v-list-tile-content>
          <v-icon class="text-lg-right" >do_not_disturb_alt</v-icon>
      </v-list-tile>
    </v-list>
  </v-toolbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'user'
    ])
  }
}
</script>

<style>

</style>
