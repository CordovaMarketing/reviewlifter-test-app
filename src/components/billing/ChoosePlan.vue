<template>
<v-container fluid grid-list-md>
    <v-layout row wrap>
    <v-flex
        xs12
        sm6
        md4
        lg3
      >
        <v-card>
          <v-card-title><h2>Basic</h2></v-card-title>
          <v-switch v-model="switch1"></v-switch>
          <v-divider></v-divider>
          <v-list subheader dense>
            <v-card-text>
              <v-list-tile-content><h4>SMS texting</h4></v-list-tile-content>
            </v-card-text>
            <v-list-tile>
              <v-list-tile-content><h4>One Location</h4></v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content><h4>One Review site</h4></v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content><h4>Upload CSV of past customers</h4></v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content><h4>Email</h4></v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content><h4>300 text limit per month</h4></v-list-tile-content>
            </v-list-tile>
          </v-list>
        <v-list-tile>
            <v-btn @click="planDialog('basic')" block color="primary" dark>$47</v-btn>
        </v-list-tile>
        </v-card>
    </v-flex>

    <v-flex
        xs12
        sm6
        md4
        lg3
      >
        <v-card>
          <v-card-title><h2>Standard</h2></v-card-title>

          <v-divider></v-divider>
          <v-list subheader dense>
            <v-card-text>
              <v-list-tile-content><h4>All of Basic</h4></v-list-tile-content>
            </v-card-text>
            <v-list-tile>
              <v-list-tile-content><h4>Multiple Locations</h4></v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content><h4>Multiple Review Sites</h4></v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content><h4>500 text limit per month</h4></v-list-tile-content>
            </v-list-tile>
                        <v-list-tile>
                <v-btn @click="planDialog('standard')" block color="primary" dark>$87</v-btn>
            </v-list-tile>
          </v-list>
        </v-card>
    </v-flex>

        <v-flex
        xs12
        sm6
        md4
        lg3
      >
        <v-card>
          <v-card-title><h2>Premium</h2></v-card-title>

          <v-divider></v-divider>
          <v-list subheader dense>
            <v-card-text>
              <v-list-tile-content><h4>All of Standard</h4></v-list-tile-content>
            </v-card-text>
            <v-list-tile>
              <v-list-tile-content><h4>Bad Review Blocker</h4></v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content><h4>Download all data entered</h4></v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content><h4>700 Text limit</h4></v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
                <v-btn @click="planDialog('premium')" block color="primary" dark>$127</v-btn>
            </v-list-tile>
          </v-list>
        </v-card>
    </v-flex>

        <v-flex
        xs12
        sm6
        md4
        lg3
      >
        <v-card>
          <v-card-title><h2>Super</h2></v-card-title>

          <v-divider></v-divider>
          <v-list subheader dense>
            <v-card-text>
              <v-list-tile-content><h4>All of Premium</h4></v-list-tile-content>
            </v-card-text>
            <v-list-tile>
              <v-list-tile-content><h4>Custom integration with CRM</h4></v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content><h4>Google my business text integration</h4></v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content><h4>1000 text limit per month</h4></v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
                <v-btn @click="planDialog('super')" block color="primary" dark>$197</v-btn>
            </v-list-tile>
            
            
          </v-list>
        </v-card>
    </v-flex>
    </v-layout>


    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ planName }}</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
            <h3>Please give us your payment details:</h3>
            <card class='stripe-card'
            :class='{ complete }'
            stripe='pk_test_FWt0YuMpM9UbFRyaChHMAM83'
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
          <v-btn color="blue darken-1" flat @click="submitPlan">Start Getting Reviews!</v-btn>
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
import { Card, createToken } from 'vue-stripe-elements-plus'

export default {
    data() {
        return{
            dialog: false,
            switch1: true,
            planName: '',
            complete: false,
            stripeOptions: {
                "complete":"color: red"
            }
        }
    },
    methods: {
        planDialog (planName) {
            this.dialog = true
            this.planName = planName.toUpperCase()
            this.$store.dispatch('setStripeKey')
        },
        submitPlan () {
            createToken().then(data => this.$store.dispatch('addPlan', {'plan':this.planName.toLowerCase(), 'stripeToken':data.token.id } ))
            this.dialog = false
        }
    },
    components: { Card },
    computed: {
    ...mapGetters([
      'user',
      'snackbar'
    ])
  }
}
</script>

<style>
.stripe-card {
  width: 300px;
  border: 1px solid grey;
}
.stripe-card.complete {
  border-color: green;
}
</style>

