<template>
  <v-dialog  full-width fullscreen  hide-overlay v-model="visible" persistent>  
  <v-stepper v-model="step">
    <v-stepper-header>
      <v-stepper-step step="1" class="headline" :complete="step > 1">Find Your Business</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="2" class="headline" :complete="step > 2">Video Tutorial</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step class="headline" step="3">Free Trial - You're Done!</v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
        <AddLocation :button="{'text':'Continue','class':'primary'}"/>
        
        <!--<v-btn color="primary" @click.native="step = 2">Continue</v-btn>-->
        <!-- <v-btn flat>Cancel</v-btn> -->
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-card color="grey lighten-1" class="mb-5" height="200px">
          <iframe width="520" height="379" src="https://www.youtube.com/embed/FN2BGs6b_rQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </v-card>
        <v-btn color="primary" @click.native="step = 3">Continue</v-btn>
        <v-btn @click.native='step= 1' color="primary" flat>Back</v-btn>
      </v-stepper-content>
      <v-stepper-content step="3">
          <ChoosePlan/>
          <v-btn color="primary" @click.native='step= 2' flat>Back</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</v-dialog>
</template>

<script>
import ChoosePlan from './components/billing/ChoosePlan'
import { mapGetters } from 'vuex'
export default {
  props: ['visible'],
  data () {
    return {
      step: 0
    }
  },
  components: {
    ChoosePlan
  },
  computed: {
    ...mapGetters([
      'locations'
    ])
  },
  watch: {
    locations: function () {
      this.step = 2
    }
  }
}
</script>

<style>

</style>
