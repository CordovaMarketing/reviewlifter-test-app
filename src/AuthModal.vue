<template>
<v-dialog fullscreen v-model="visible" persistent max-width="500">
<!-- <v-btn color="primary" dark slot="activator">Open Dialog</v-btn> -->
  <v-card>
    <v-container fill-height>
      <v-layout justify-center>
        <v-card>
          <v-flex class="text-xs-center">
            <v-card-title class="headline">Review Lifter</v-card-title>
              <v-card-text>Use your Google account to sign up or login to Review Lifter.</v-card-text>
            <v-btn class="signin-button" color="deep-orange" dark  v-on:click="authenticate('google')">
              <v-icon dark left>fab fa-google</v-icon>
              Sign in with Google
            </v-btn>
          </v-flex>
          <v-card-text>
          <p class="text-xs-center">Don't have an account? <a v-on:click="authenticate('google')"><strong>Sign up</strong> </a></p>
          </v-card-text>
          <br>
        </v-card>
      </v-layout>
    </v-container>
  </v-card>
</v-dialog>
</template>

<script>
// import Vue from 'vue'
import { HTTP } from './http-common'
import store from '@/store/store'
import { mapGetters } from 'vuex'

export default {
  props: ['visible'],
  data () {
    return {
      // response: ''
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    authenticate: function (provider) {
      this.$auth.authenticate(provider).then(function (response) {
        console.log(response)
        if (response.data) {
          var data = response.data
          HTTP.defaults.headers.common['x-access-token'] = data.token
          store.dispatch('setUser', data.user_data)
          store.dispatch('setToken', data.token)
          // this.$router.push({ name: 'home' })
        }
      })
    }
  }
}
</script>

<style>
</style>
