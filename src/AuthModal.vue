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
            <v-btn class="signin-button" color="blue" dark  v-on:click="signIn">
              <v-icon dark left>fab fa-google</v-icon>
              Create account
            </v-btn>
            <v-btn class="signin-button" color="deep-orange" dark  v-on:click="signIn">
              <v-icon dark left>fab fa-google</v-icon>
              Sign in with Google
            </v-btn>
          </v-flex>
          <br>
        </v-card>
      </v-layout>
    </v-container>
  </v-card>
</v-dialog>
</template>

<script>
import Vue from 'vue'
import { HTTP } from './http-common'
import store from '@/store/store'
import { mapGetters } from 'vuex'

export default {
  props: ['visible'],
  data () {
    return {
      response: ''
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    signIn: function () {
      // Vue.googleAuth().directAccess()
      // we will want to use direct access which will give back an object
      Vue.googleAuth().signIn(this.onSignInSuccess, this.onSignInError)
    },
    // https://druo0vibxg7ct.cloudfront.net
    onSignInSuccess: function (authorizationCode) {
      HTTP.post('jsGoogle', { code: authorizationCode, redirect_uri: 'https://druo0vibxg7ct.cloudfront.net' }).then(function (response) {
        if (response.data) {
          var data = response.data
          HTTP.defaults.headers.common['x-access-token'] = data.token
          store.dispatch('setUser', data.user_data)
          store.dispatch('setToken', data.token)
          // this.$router.push({ name: 'home' })
        }
      }, function (response) {
        alert('SIGN IN ERROR, TRY AGAIN')
        var data = response.body
        this.response = data.error
        console.log(response, data)
      })
    },
    onSignInError: function (error) {
      this.response = 'Failed to sign-in'
      console.log('GOOGLE SERVER - SIGN-IN ERROR', error)
    },
    resetResponse: function () {
      this.response = ''
    }
  }
}
</script>

<style>
</style>
