<template>
  <v-toolbar flat class="transparent"> 
    <v-list class="pa-0">
      <v-list-tile :to="{path: '/settings'}" avatar>
        <v-list-tile-avatar>
          <img src="https://randomuser.me/api/portraits/men/85.jpg" >
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>John Leider</v-list-tile-title>
        </v-list-tile-content>
          <v-icon class="text-lg-right" >settings</v-icon>
      </v-list-tile>
    </v-list>
  </v-toolbar>
</template>

<script>
export default {

}
</script>

<style>

</style>
