<template>
<v-dialog v-if="!user" v-model="visible" persistent max-width="500">
    <!-- <v-btn color="primary" dark slot="activator">Open Dialog</v-btn> -->
    <v-card>
      <v-card-title class="headline">Google Sign-in</v-card-title>
      <v-card-text>Use your Google account to sign in to Review Lifter. </v-card-text>
        <v-btn id="signin-button" color="green darken-1"  v-on:click="$emit('signedIn')">Sign In</v-btn>
        <!--TODO: put this back: <v-btn id="signin-button" color="green darken-1"  v-on:click="signIn">Sign In</v-btn> -->
    </v-card>
</v-dialog>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
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
      this.resetResponse()
      axios.post('http://localhost:5000/callbackGoogle', { code: authorizationCode, redirect_uri: 'http://localhost:8080/#/' }).then(function (response) {
        if (response.body) {
          var data = response.body
          // Save to vuex
          var token = 'Bearer ' + data.token
          this.$store.commit('SET_USER', data.user_data)
          this.$store.commit('SET_TOKEN', token)
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
        var data = response.body
        this.response = data.error
        console.log('BACKEND SERVER - SIGN-IN ERROR', data)
      })
    },
    onSignInError: function (error) {
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
