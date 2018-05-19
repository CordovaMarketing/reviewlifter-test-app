
<template>
  <v-container >
    <v-layout justify-center>
    <v-flex xs6>  
<!-- Toolbar -->
    <v-icon large class="search-icon">search</v-icon>
    <GmapAutocomplete :value="location.businessname" placeholder="search for your business" class="input display-1" @place_changed="setPlace">
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

    
    <v-form  v-if="location.businessname" class="fade-in" v-model="valid" ref="form" lazy-validation>
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
      label="Location Contact (Name appearing in text messages to customers)"
      v-model="location.sendername"
      required
    ></v-text-field>
    <v-layout>
      <v-flex><v-text-field
      v-model="reviewtext"
      label="Text message to customers"
      counter="500"
      max=500
      multi-line
      auto-grow
      rows="2"
      hide-details
    ></v-text-field>
    <small>Please ensure that you include [customerName] which will be replaced with the customers name upon texting</small>
    <br>
    </v-flex>
    <!-- <v-flex xs-1></v-flex>
      <v-flex> 
        <v-card  color="grey darken-3">
          <v-text-field
          v-model="reviewtext"
          label="Text message to customers"
          dark
          textarea
          multi-line
          auto-grow
          rows="2"
          hide-details
        ></v-text-field>
        </v-card>
        
      </v-flex> -->
    </v-layout>
    
    
    <v-layout class="mt-3" right row wrap>
      <v-btn @click="save" color="success">Save</v-btn>
      <small class="mt-2">You are charged on the same pricing/plan for each location added. 2 locations = 2 * monthly or annual cost. 
        You currently are on the {{ user.plan }} plan. After 7 free days using this location, you will be charged. </small>     
    </v-layout>
    </v-form>        
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
      valid: true,
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
        sendername: '',
        phone: '',
        businessname: '',
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
      this.location.sendername = this.user.firstname
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
    },
    clear () {
      this.$refs.form.reset()
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
        this.location = Object.assign({}, this.editLocation)
      } else {
        this.clear()
      }
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ]),
    reviewtext: {
      get () {
        if (!this.location.reviewinvitetext) {
          this.location.reviewinvitetext = 'Hi [customerName], this is ' + this.location.sendername + ' from ' + this.location.businessname + '. We appreciate your business! Could you take a quick 30 seconds and give us a rating at the link below? Thanks.'
          return 'Hi [customerName], this is ' + this.location.sendername + ' from ' + this.location.businessname + '. We appreciate your business! Could you take a quick 30 seconds and give us a rating at the link below? Thanks.'
        } else {
          return this.location.reviewinvitetext
        }
      },
      set (newValue) {
        this.location.reviewinvitetext = newValue
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

.search-icon {
  width: 4%;
  margin-bottom: 12px;
}

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