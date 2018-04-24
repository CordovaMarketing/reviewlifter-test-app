<template>
<v-container>
  <LocationIterator/>
  <v-btn
    dark
        fab
        fixed
        bottom
        right
    color="red"
    >
    <v-icon>add</v-icon>
  </v-btn>
</v-container>
</template>

<script>
import LocationIterator from './LocationIterator'

export default {
  components: {
    LocationIterator
  }
}
</script>

<style>

</style>
