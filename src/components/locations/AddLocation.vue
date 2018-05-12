
<template>
  <v-container >
    <v-layout justify-center>
    <v-flex lg4 xs6>  
<!-- Toolbar -->
    <h3 class="headline">First, search for your business</h3>
    <v-divider></v-divider>
    <br>
    <v-icon medium style="width: 4%">search</v-icon>
    <GmapAutocomplete :value="location.businessname" placeholder="Enter location..." class="input headline" @place_changed="setPlace">
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
    <div v-if="location.businessname" class="fade-in">
    <v-text-field
      label="Business Name (This will appear in text messages to customers)"
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
      label="Location Contact (Name of person appearing in text messages to customers)"
      v-model="location.sendername"

      required
    ></v-text-field>
    <v-text-field
      v-model="reviewtext"
      label="Customer Text Message"
      counter="250"
      max=250
      multi-line
      auto-grow
      rows="2"
      hide-details
    ></v-text-field>
    <h2>This messasge will appear to customers:</h2>
    <v-divider></v-divider>
    <br>
    <h3>{{reviewtext}}</h3>
    <br>
    <v-layout right row wrap>
      <v-btn @click="save" color="success">Save</v-btn>
      <small>You are charged on the same pricing/plan for each location added. 2 locations = 2 * monthly or annual cost. 
        You currently are on the {{ user.plan }} plan. After 7 free days using this location, you will be charged. </small>     
    </v-layout>
    </div>
    </v-flex>      
    </v-layout>
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
        reviewsites: '',
        reviewinvitetext: '',
        streetaddress: '',
        features: '',
        comments: ''
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
      this.location.reviewinvitetext = ''
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
      'user'
    ]),
    reviewtext () {
      if (this.place)
        return 'Hi Sally, this is ' + this.location.sendername + ' from '+ this.location.businessname +' We appreciate your business! Could you take a quick 30 seconds and give us a rating at the link below? Thanks.'
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

.input {
  width: 95%;
}
.fade-in {
	opacity: 1;
	animation-name: fadeInOpacity;
	animation-iteration-count: 1;
	animation-timing-function: ease-in;
	animation-duration: 1s;
}

@keyframes fadeInOpacity {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
</style>