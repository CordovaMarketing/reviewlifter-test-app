
<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs4>
        <v-subheader>Search Locations</v-subheader>
      </v-flex>
      <v-flex xs12 sm8>
	    	<input placeholder="Search" class="headline" v-model=vm.searchPlace v-gmaps-searchbox=vm />
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs4>
        <v-subheader>Business Name</v-subheader>
      </v-flex>
      <v-flex xs12 sm8>
        <v-text-field
          v-model="businessName"
          name="input-1-3"
          single-line
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs4>
        <v-subheader>Phone number</v-subheader>
      </v-flex>
      <v-flex xs12 sm8>
        <v-text-field
          v-model="phoneNumber"
          name="input-2-3"
          single-line
        ></v-text-field>
      </v-flex>
      <v-layout row wrap>
      <v-flex xs4>
        <v-subheader>Address</v-subheader>
      </v-flex>
      <v-flex xs12 sm8>
        <v-text-field
          v-model="address"
          name="input-1-3"
          single-line
        ></v-text-field>
      </v-flex>
    </v-layout>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs4>
        <v-subheader>Location Manager</v-subheader>
      </v-flex>
      <v-flex xs12 sm8>
        <v-text-field
          v-model="manager"
          name="input-1-3"
          single-line
        ></v-text-field>
      </v-flex>
    </v-layout>
    	<div class="simple-map demo">
		<!-- Toolbar -->
		<!-- Map -->
		<!-- <googlemaps-map
      xs12
			ref="map"
			class="map"
      v-if="vm.place"
			:center.sync="center"
			:zoom.sync="zoom"> -->
			<!-- User Position -->
			<!-- <googlemaps-user-position
				@update:position="setUserPosition" /> -->
			
			<!-- Marker -->
			 <!-- <googlemaps-marker
        v-if="vm.place"       
				title="Location"
				:position="{ lat: vm.place.geometry.location.lat, lng: vm.place.geometry.location.lng }" /> 
		</googlemaps-map> -->
	</div>
  </v-container>
</template>

<script>
// https://github.com/olefirenko/vue-google-autocomplete
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      businessName: '',
      phoneNumber: '',
      address: '',
      manager: '',
      center: {
        lat: 48.853,
        lng: 2.298
      },
      userPosition: null,
      zoom: 12,
      vm: {
        searchPlace: '',
        location: {}
      }
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
  },
  watch: {
    vm: function () {
      if (this.vm.place) {
        this.businessName = this.vm.place.name
        this.phoneNumber = this.vm.place.international_phone_number
        this.address = this.vm.place.formatted_address
      }
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