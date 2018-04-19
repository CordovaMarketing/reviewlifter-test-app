<template>
<v-dialog v-if="!user" fullscreen v-model="visible" persistent max-width="500">
    <!-- <v-btn color="primary" dark slot="activator">Open Dialog</v-btn> -->
    <v-card>
      <v-card-title class="headline">Google Sign-in</v-card-title>
      <v-card-text>Use your Google account to sign in to Review Lifter. </v-card-text>
        <!-- <v-btn id="signin-button" color="green darken-1"  v-on:click="$emit('signedIn')">Sign In</v-btn> -->
        <v-btn id="signin-button" color="green darken-1"  v-on:click="signIn">Sign In</v-btn>
    </v-card>
</v-dialog>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
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
      Vue.googleAuth().signIn(this.onSignInSuccess, this.onSignInError)
    },
    onSignInSuccess: function (authorizationCode) {
      // this.toggleLoading()
      // this.resetResponse()
      console.log(authorizationCode)
      axios.post('http://localhost:5000/jsGoogle', { code: authorizationCode, redirect_uri: 'http://localhost:8080' }).then(function (response) {
        if (response.data) {
          var data = response.data
          // Save to vuex
          store.commit('SET_USER', data.user_data)
          store.commit('SET_TOKEN', data.token)
          // NOTE: This token is the one created for my server's authentication flow, not Google. The user_data is a pass through of what Google sent me.
          // You should be able to pre-load the form with that data for signup.
          //
          //
          // Save to local storage as well
          // ( or you can install the vuex-persistedstate plugin so that you won't have to do this step, only store to Vuex is sufficient )
          // if (window.localStorage) {
          //   window.localStorage.setItem('user', JSON.stringify(data.user_data))
          //   window.localStorage.setItem('token', token)
          // }
          // redirect to the dashboard
          this.visible = false
          this.$router.push({ name: 'dashboard' })
        }
      }, function (response) {
        alert(response)
        var data = response.body
        this.response = data.error
        console.log('BACKEND SERVER - SIGN-IN ERROR', data)
      })
    },
    onSignInError: function (error) {
      alert(error)
      this.response = 'Failed to sign-in'
      console.log('GOOGLE SERVER - SIGN-IN ERROR', error)
    },
    // toggleLoading: function () {
    //   this.loading = (this.loading === '') ? 'loading' : ''
    // },
    resetResponse: function () {
      this.response = ''
    }
  }
}
</script>

<style>

</style>
