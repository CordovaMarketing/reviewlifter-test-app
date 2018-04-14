
<template>
	<div class="simple-map demo">
		<!-- Toolbar -->
		
		<!-- Map -->
		<googlemaps-map
      xs12
			ref="map"
			class="map"
			:center.sync="center"
			:zoom.sync="zoom"
		>
			<!-- User Position -->
			<googlemaps-user-position
				@update:position="setUserPosition" />
			
			<!-- Marker -->
			<googlemaps-marker
				title="Paris"
				:position="{ lat: 48.8735, lng: 2.2951 }" />
		</googlemaps-map>
	</div>
</template>

<script>
// https://github.com/olefirenko/vue-google-autocomplete
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      center: {
        lat: 48.853,
        lng: 2.298
      },
      userPosition: null,
      zoom: 12
    }
  },
  methods: {
    ...mapActions('layout', [
      'toggleSideNav'
    ]),
    centerOnUser () {
      if (this.userPosition) {
        this.center = this.userPosition
      }
    },
    setUserPosition (position) {
      this.userPosition = position
    }
  }
}
</script>

<style lang="stylus" scoped>

.demo {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.map {
  height: 500px;
  width: 500px;
}
</style>