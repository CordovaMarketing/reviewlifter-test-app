<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step step="1" :complete="e1 > 1">Name of step 1</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" :complete="e1 > 2">Name of step 2</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">Name of step 3</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
          <a id="signin-button" v-on:click="signIn">
            <i class="fa fa-google-plus-official fa-3x"></i>
            Sign in with Google
          </a>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
          <v-btn color="primary" @click.native="e1 = 3">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
          <v-btn color="primary" @click.native="e1 = 1">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-dialog>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import store from '@/store/store'

export default {
  props: ['dialog'],
  data () {
    return {
      e1: 0,
      response: ''
    }
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
          this.dialog = false
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
