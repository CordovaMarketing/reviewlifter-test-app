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
          <v-card-title><h2>Basic</h2>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-switch class='mt-3' v-model="basicannual" :label='getBasicInfo().label'></v-switch>
          </v-card-title>
          
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
            <v-btn @click="planDialog('basic')" block color="primary" dark> {{ getBasicInfo().price }} </v-btn>
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
          <v-card-title><h2>Standard</h2>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-switch class='mt-3' v-model="standardannual" :label='getStandardInfo().label'></v-switch>
          </v-card-title>

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
                <v-btn @click="planDialog('standard')" block color="primary" dark>{{ getStandardInfo().price }} </v-btn>
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
          <v-card-title><h2>Premium</h2>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-switch class='mt-3' v-model="premiumannual" :label='getPremiumInfo().label'></v-switch>
          </v-card-title>

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
                <v-btn @click="planDialog('premium')" block color="primary" dark> {{ getPremiumInfo().price }} </v-btn>
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
          <v-card-title><h2>Super</h2>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-switch class='mt-3' v-model="superannual" :label='getSuperInfo().label'></v-switch>
          </v-card-title>

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
                <v-btn @click="planDialog('super')" block color="primary" dark>{{ getSuperInfo().price }}</v-btn>
            </v-list-tile>
            
            
          </v-list>
        </v-card>
    </v-flex>
    </v-layout>


    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ planNameDisplay }}</span>
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
            basicannual: false,
            standardannual: false,
            premiumannual: false,
            superannual: false,
            planNameDisplay: '',
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
            if (planName === 'super'){
              this.planName = this.getSuperInfo().label + planName
            } 
            else if (planName === 'premium'){
              this.planName = this.getPremiumInfo().label + planName
            }
            else if (planName === 'standard'){
              this.planName = this.getStandardInfo().label + planName
            }
            else if (planName === 'basic'){
              this.planName = this.getBasicInfo().label + planName
            }
            this.planNameDisplay = planName.toUpperCase()
            this.$store.dispatch('setStripeKey')
        },
        submitPlan () {
            createToken().then(data => this.$store.dispatch('addPlan', {'plan':this.planName, 'stripeToken':data.token.id } ))
            this.dialog = false
        },
        getSuperInfo(){
          if(this.superannual){
            return {label: 'Annual', price:'$2130'}
          }else{
            return {label: 'Monthly', price:'$127'}
          }
        },
        getPremiumInfo(){
          if(this.premiumannual){
            return {label: 'Annual', price:'$1370'}
          }else{
            return {label: 'Monthly', price:'$197'}
          }
        },
        getStandardInfo(){
          if(this.standardannual){
            return {label: 'Annual', price:'$940'}
          }else{
            return {label: 'Monthly', price:'$87'}
          }
        },
        getBasicInfo(){
          if(this.basicannual){
            return {label: 'Annual', price:'$505'}
          }else{
            return {label: 'Monthly', price:'$47'}
          }
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

