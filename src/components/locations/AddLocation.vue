
<template>
  <v-container  grid-list-md>
      <v-flex xs6 mx-auto >    
    
<!-- Toolbar -->
      <v-icon large style="width: 4%">search</v-icon>
      <GmapAutocomplete :value="location.businessname" placeholder="Enter a location..." class="input headline" @place_changed="setPlace">
      </GmapAutocomplete>
    <br/>

    <GmapMap class="map" :zoom="16" :center="center">
      <!-- <GmapMarker v-for="(marker, index) in markers"
        :key="index"
        :position="marker.position"
        /> -->
      <GmapMarker
        v-if="this.place"
        :position="{
          lat: this.place.geometry.location.lat(),
          lng: this.place.geometry.location.lng(),
        }"
        />
    </GmapMap>

		
	</v-flex>

    <v-flex xs6 mx-auto >
    <v-layout row wrap>
      <v-flex xs4>
        <v-subheader>Business Name</v-subheader>
      </v-flex>
      <v-flex xs12 sm8>
        <v-text-field
          v-model="location.businessname"
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
          v-model="location.phone"
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
          v-model="location.streetaddress"
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
          v-model="location.sendername"
          name="input-1-3"
          single-line
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
     <v-btn @click="save" color="success">Save</v-btn>
    </v-layout>
    </v-flex>
      <v-snackbar v-model="snackbar.show">
        {{snackbar.text}}
        <v-btn flat color="pink" @click.native="hideSnackbar()">Close</v-btn>
      </v-snackbar>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: ['editLocation'],
  data () {
    return {
      place: null,
      places: [],
      center: {
        lat: 48.853,
        lng: 2.298
      },
      userPosition: null,
      zoom: 12,
      location: {
        placeid: '',
        subcripstionid: '',
        sendername: '',
        phone: '',
        gitpagelink: '',
        businessname: '',
        reviewlink: '',
        reviewinvitetext: '',
        streetaddress: '',
        features: '',
        comments: '',
        reviewsites: ''
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
    },
    setPlace (place) {
      this.place = place
      this.location.placeid = place.place_id
      this.location.phone = place.international_phone_number
      this.location.businessname = place.name
      this.location.streetaddress = place.formatted_address
      this.center = {
        lat: this.place.geometry.location.lat(),
        lng: this.place.geometry.location.lng()
      }
    },
    save () {
      this.$store.dispatch('addLocation', this.location)
    },
    hideSnackbar () {
      this.$store.dispatch('hideSnackbar')
    }
    // usePlace (place) {
    //   if (this.place) {
    //     this.places.push(this.place)
    //     this.markers.push({
    //       position: {
    //         lat: this.place.geometry.location.lat(),
    //         lng: this.place.geometry.location.lng()
    //       }
    //     })
    //     this.place = null
    //   }
    // }
  },
  watch: {
    place: function () { // set text fields
      if (this.place) {
        this.businessName = this.place.name
        this.phoneNumber = this.place.international_phone_number
        this.address = this.place.formatted_address
      }
    },
    editLocation: function () {
      if (this.editLocation) {
        this.location = this.editLocation
      }
    }
  },
  computed: {
    ...mapGetters([
      'snackbar'
    ])
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

.input {
  width: 95%;
}
</style>