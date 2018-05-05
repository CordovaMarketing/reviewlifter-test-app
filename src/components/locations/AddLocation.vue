
<template>
  <v-container >
    <v-layout justify-center>
    <v-flex xs6>  
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

    <v-text-field
      label="Business Name"
      v-model="location.businessname"

      :counter="10"
      required
    ></v-text-field>
    <v-text-field
      label="Phone number"
      v-model="location.phone"

      required
    ></v-text-field>
    <v-text-field
      label="Address"
      v-model="location.streetaddress"

      required
    ></v-text-field>
    <v-text-field
      label="Location Manager"
      v-model="location.sendername"

      required
    ></v-text-field>
    <v-text-field
      v-model="location.reviewinvitetext"
      label="Customer Text Message"
      counter="250"
      max=250
      multi-line
      auto-grow
      rows="1"
      hide-details
    ></v-text-field>
    <v-layout right row wrap>
      <v-btn @click="save" color="success">Save</v-btn>     
    </v-layout>
    </v-flex>      
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

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
        reviewinvitetext: 'We appreciate your business! Could you take a quick 30 seconds and give us a rating at the link below? Thanks.',
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