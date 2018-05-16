<template>
  <v-dialog  full-width fullscreen  hide-overlay v-model="visible" persistent>  
  <v-stepper v-model="step">
    <v-stepper-header>
      <v-stepper-step step="1" class="headline" :complete="step > 1">Locations</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="2" class="headline" :complete="step > 2">Video Tutorial</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step class="headline" step="3">Free Trial - You're Done!</v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
        <AddLocation/>
        
        <v-btn color="primary" @click.native="step = 2">Continue</v-btn>
        <v-btn flat>Cancel</v-btn>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
        <v-btn color="primary" @click.native="step = 3">Continue</v-btn>
        <v-btn flat>Cancel</v-btn>
      </v-stepper-content>
      <v-stepper-content step="3">
          <ChoosePlan/>
          <!-- <v-btn color="primary" @click="$emit('register')">Finish</v-btn>
        <v-btn flat>Cancel</v-btn> -->

        <!-- TODO: either send and receive registration info from server here and then emit it back up, 
        or just emit that finish was clicked, and in root module handle registration -->
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</v-dialog>
</template>

<script>
import ChoosePlan from './components/billing/ChoosePlan'
export default {
  props: ['visible'],
  data () {
    return {
      step: 0
    }
  },
  components: {
    ChoosePlan
  }
}
</script>

<style>

</style>
