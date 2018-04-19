
<template>
  <v-container fluid grid-list-md>
    <v-layout v-bind="binding">
      <v-flex xs6 >    
    
<!-- Toolbar -->
<label>
      AutoComplete
      <GmapAutocomplete @place_changed="setPlace">
      </GmapAutocomplete>
      <button @click="usePlace">Add</button>
    </label>
    <br/>

    <GmapMap style="width: 600px; height: 300px;" :zoom="1" :center="{lat: 0, lng: 0}">
      <GmapMarker v-for="(marker, index) in markers"
        :key="index"
        :position="marker.position"
        />
      <GmapMarker
        v-if="this.place"
        label="★"
        :position="{
          lat: this.place.geometry.location.lat(),
          lng: this.place.geometry.location.lng(),
        }"
        />
    </GmapMap>

		
	</v-flex>
  
    <v-flex xs6 >
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
    </v-flex>
    </v-layout>  
  </v-container>
</template>

<script>
// https://github.com/olefirenko/vue-google-autocomplete
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      markers: [],
      place: null,
      places: [],
      businessName: '',
      phoneNumber: '',
      address: '',
      manager: '',
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
    },
    setPlace (place) {
      this.place = place
    },
    usePlace (place) {
      if (this.place) {
        this.places.push(this.place)
        this.markers.push({
          position: {
            lat: this.place.geometry.location.lat(),
            lng: this.place.geometry.location.lng()
          }
        })
        this.place = null
      }
    }
  },
  watch: {
    places: function () {
      if (this.places.length > 0) {
        var last = this.places[this.places.length - 1]
        this.businessName = last.name
        this.phoneNumber = last.international_phone_number
        this.address = last.formatted_address
      }
    }
  },
  computed: {
    binding () {
      const binding = {}
      if (!this.$vuetify.breakpoint.mdAndUp) binding.column = true
      return binding
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
  height: 300px;
  width: flex;
}
</style>