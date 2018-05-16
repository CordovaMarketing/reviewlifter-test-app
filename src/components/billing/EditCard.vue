<template>
<div>
    <v-card>
    <v-container fluid grid-list-lg v-if="cardInfo">
        <v-card-title><h2>Current Card</h2></v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <h3><img :src="cardImg()" class="mr-2" style="width:30px;"/>{{ cardInfo.brand }} ending in {{ cardInfo.last4 }}. Expires in {{cardInfo.exp_year}}</h3>
        </v-card-text>
        <div>
            <v-card-text><h3>Change card info below:</h3></v-card-text>
        </div>
        <div>
            <card class='stripe-card'
            :class='{ complete }'
            stripe='pk_live_h3cANxNnHs9grgvUEc80E8MZ'
            :options='stripeOptions'
            @change='complete = $event.complete'
            />
        </div>
        
        <v-card-actions>
            <v-btn @click="updateCard()" class="mt-3"  color="primary" dark> Update Card </v-btn>
            <v-btn class="mt-3">Upgrade plan</v-btn>
        </v-card-actions>
    </v-container>
    <v-container fluid grid-list-lg v-else>
      <h1>No Card Added yet</h1>
    </v-container>
    
    </v-card>
    <v-snackbar v-model="snackbar.show">
        {{snackbar.text}}
        <v-btn flat color="pink" @click.native="hideSnackbar()">Close</v-btn>
    </v-snackbar>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Card, createToken } from 'vue-stripe-elements'

export default {
  data () {
    return {
      dialog: false,
      basicannual: false,
      standardannual: false,
      premiumannual: false,
      superannual: false,
      planNameDisplay: '',
      planName: '',
      complete: false,
      stripeOptions: {
      }
    }
  },
  methods: {
    updateCard () {
      createToken().then(data => this.$store.dispatch('updateCard', { 'stripeToken': data.token.id }))
      this.dialog = false
    },
    cardImg () {
      return this.cardInfo ? require('../../assets/cards/' + this.cardInfo.brand + '.png') : ''
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'snackbar',
      'cardInfo'
    ])
  },
  components: {
    Card
  }
}
</script>

<style>
.stripe-card {
  position: relative;
  font-size: 16px;
  display: inline-block;
  box-sizing: border-box;
  width: 300px;
  max-width: 100%;
  margin: 0;
  padding: 15px 0;
  border-bottom: 1px solid #1976d2;
}
.stripe-card.complete {
  border-color: green;
}
</style>

