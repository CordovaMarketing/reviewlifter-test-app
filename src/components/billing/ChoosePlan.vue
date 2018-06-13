<template>
<v-container  fluid grid-list-md>
  <h2>All plans start with a 7 day free trial.</h2>
    <v-layout row wrap>
          <v-flex
        xs12
        sm6
        md4
        lg3
      >
        <v-card>
          <v-card-title>
            <h2>Basic</h2>
            <v-spacer></v-spacer>
            <h3>{{ getBasicInfo().price }}</h3>
          </v-card-title>
          <div>
          <v-switch class="ml-3" v-model="basicannual" :label='getBasicInfo().label'></v-switch>
          </div>
          <v-divider></v-divider>
          <v-list subheader dense>
            <v-card-text>
              <v-list-tile-content><h4>Automated Review Requests to Customers</h4></v-list-tile-content>
            </v-card-text>
            <v-list-tile>
              <v-list-tile-content><h4>Send Bulk Review Requests</h4></v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content><h4>Multiple Location Management</h4></v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content><h4>Review Requests for Google</h4></v-list-tile-content>
            </v-list-tile>
          </v-list>
        <div>
            <v-btn @click="planDialog('basic')" block color="primary" dark> Get started with basic free trial</v-btn>
        </div>
        </v-card>
    </v-flex>

    <v-flex
        xs12
        sm6
        md4
        lg3
      >
        <v-card>
          <v-card-title>
            <h2>Standard</h2>
            <v-spacer></v-spacer>
            <h3>{{ getStandardInfo().price }}</h3>
          </v-card-title>
          <div>
          <v-switch class='ml-3' v-model="standardannual" :label='getStandardInfo().label'></v-switch>
          </div>
          <v-divider></v-divider>

          <v-divider></v-divider>
          <v-list subheader dense>
            <v-card-text>
              <v-list-tile-content><h4>All of Basic</h4></v-list-tile-content>
            </v-card-text>
            <v-list-tile>
              <v-list-tile-content><h4>Send Review Requests for Any Review Site</h4></v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content><h4>Access to Your Customers' Data</h4></v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content><h4>Review Management Dashboard</h4></v-list-tile-content>
            </v-list-tile>
          </v-list>
            <div>
                <v-btn @click="planDialog('standard')" block color="primary" dark>Get started with Standard free trial</v-btn>
            </div>
        </v-card>
    </v-flex>

        <v-flex
        xs12
        sm6
        md4
        lg3
      >
        <v-card>
        <v-card-title>
          <h2>Premium</h2>
          <v-spacer></v-spacer>
          <h3>{{ getPremiumInfo().price }}</h3>
        </v-card-title>
        <div>
        <v-switch class="ml-3" v-model="premiumannual" :label='getPremiumInfo().label'></v-switch>
        </div>
        <v-divider></v-divider>

          <v-divider></v-divider>
          <v-list subheader dense>
            <v-card-text>
              <v-list-tile-content><h4>All of Standard</h4></v-list-tile-content>
            </v-card-text>
            <v-list-tile>
              <v-list-tile-content><h4>White Label the App for Customer Use</h4></v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content><h4>Negative Review Screener</h4></v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content><h4></h4></v-list-tile-content>
            </v-list-tile>
          </v-list>
            <div>
                <v-btn @click="planDialog('premium')" block color="primary" dark> Get started with Premium free trial</v-btn>
            </div>
        </v-card>
    </v-flex>

        <v-flex
        xs12
        sm6
        md4
        lg3
      >
        <v-card>
        <v-card-title>
          <h2>Super</h2>
          <v-spacer></v-spacer>
          <h3>{{ getSuperInfo().price }}</h3>
        </v-card-title>
        <div>
        <v-switch class="ml-3" v-model="superannual" :label='getSuperInfo().label'></v-switch>
        </div>
        <v-divider></v-divider>

          <v-divider></v-divider>
          <v-list subheader dense>
            <v-card-text>
              <v-list-tile-content><h4>All of Premium</h4></v-list-tile-content>
            </v-card-text>
            <v-list-tile>
              <v-list-tile-content><h4>Embedded Reviews on Your Website</h4></v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content><h4>Text Messaging Service on Google My Business Mobile</h4></v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content><h4>CRM Integration</h4></v-list-tile-content>
            </v-list-tile>
          </v-list>
          <div>
              <v-btn @click="planDialog('super')" block color="primary" dark>Get started with Super free trial</v-btn>
          </div>
        </v-card>
    </v-flex>
    </v-layout> 


    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ planNameDisplay }}</span>
          <v-spacer></v-spacer>
          <span class="headline">{{ price }}</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
            <h3>Please give us your payment details:</h3>
            <card class='stripe-card'
            :class='{ complete }'
            :stripe='cardToken'
            :options='stripeOptions'
            @change='complete = $event.complete'
            />
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" :disabled='!complete' flat @click="submitPlan">Get Started!</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar.show">
        {{snackbar.text}}
        <v-btn flat color="pink" @click.native="hideSnackbar()">Close</v-btn>
    </v-snackbar>

</v-container>
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
      price: '',
      plan: {},
      complete: false,
      stripeOptions: {
      }
    }
  },
  methods: {
    planDialog (planName) {
      this.dialog = true
      var info
      if (planName === 'super') {
        info = this.getSuperInfo()
        this.plan = { 'duration': info.label, 'name': planName }
        this.price = this.superannual ? info.annual : info.price
      } else if (planName === 'premium') {
        info = this.getPremiumInfo()
        this.plan = { 'duration': info.label, 'name': planName }
        this.price = this.premiumannual ? info.annual : info.price
      } else if (planName === 'standard') {
        info = this.getStandardInfo()
        this.plan = { 'duration': info.label, 'name': planName }
        this.price = this.standardannual ? info.annual : info.price
      } else if (planName === 'basic') {
        info = this.getBasicInfo()
        this.plan = { 'duration': info.label, 'name': planName }
        this.price = this.basicannual ? info.annual : info.price
      }
      this.planNameDisplay = planName.toUpperCase()
    },
    submitPlan () {
      createToken().then(data => this.$store.dispatch('addPlan', { 'plan': this.plan, 'stripeToken': data.token.id }))
      this.dialog = false
    },
    getSuperInfo () {
      if (this.superannual) {
        return { label: 'Annual', price: '$270', annual: '$3240' }
      } else {
        return { label: 'Monthly', price: '$300' }
      }
    },
    getPremiumInfo () {
      if (this.premiumannual) {
        return { label: 'Annual', price: '$200', annual: '$2400' }
      } else {
        return { label: 'Monthly', price: '$225' }
      }
    },
    getStandardInfo () {
      if (this.standardannual) {
        return { label: 'Annual', price: '$150', annual: '$1800' }
      } else {
        return { label: 'Monthly', price: '$175' }
      }
    },
    getBasicInfo () {
      if (this.basicannual) {
        return { label: 'Annual', price: '$100', annual: '$1200' }
      } else {
        return { label: 'Monthly', price: '$125' }
      }
    }
  },
  components: { Card },
  computed: {
    ...mapGetters([
      'user',
      'cardToken',
      'snackbar'
    ])
  },
  beforeCreate () {

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

