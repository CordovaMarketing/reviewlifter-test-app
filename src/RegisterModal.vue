<template>
  <v-dialog v-model="visible" persistent max-width="500px">
  <v-stepper v-model="step">
    <v-stepper-header>
      <v-stepper-step step="1" :complete="step > 1">Sign Up</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="2" :complete="step > 2">Review Sites</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3">Locations</v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
        <v-btn color="primary" @click.native="step = 2">Continue</v-btn>
        <v-btn flat>Cancel</v-btn>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
        <v-btn color="primary" @click.native="step = 3">Continue</v-btn>
        <v-btn flat>Cancel</v-btn>
      </v-stepper-content>
      <v-stepper-content step="3">
        <!-- <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card> -->
        <AddLocation/>
        <v-btn color="primary" @click="$emit('register')">Finish</v-btn>
        <!-- TODO: either send and receive registration info from server here and then emit it back up, 
                   or just emit that finish was clicked, and in root module handle registration -->
        <v-btn flat>Cancel</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</v-dialog>
</template>

<script>
export default {
  props: ['visible'],
  data () {
    return {
      step: 0
    }
  }
}
</script>

<style>

</style>
