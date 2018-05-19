<template>
  <v-container fluid grid-list-md>
    
    <v-dialog
        v-model="showModal"
        hide-overlay
        fullscreen
        transition="dialog-bottom-transition"
      >
       <v-btn
    dark
    fab
    fixed
    middle
    right
    color="red"
    slot="activator"
    @click.native="editLocation(null)"
    >
    <v-icon>add</v-icon>    
  </v-btn>   
      <v-toolbar card color="white">
        <v-card color="red" dark tile>
          <v-btn flat icon @click.native="showModal = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card>        
      </v-toolbar>
      <v-card scrollable>
        <AddLocation
        v-if="showModal"
        :editLocation="location"/>
      </v-card>
    </v-dialog>
   
  <h2 class="text-md-center headline">Locations</h2>
  <br>
    <v-data-iterator
      content-tag="v-layout"
      :items="locations"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
    >
      <v-flex
        slot="item"
        slot-scope="props"
        xs12
        sm6
        md4
      >
        <v-card>
          <v-card-title>
            <v-container fill-height>
                <h4 class="title">{{ props.item.businessname }}</h4>
              <v-spacer></v-spacer>
              <v-btn @click="editLocation(props.item)" flat icon color="blue">
                  <v-icon >edit</v-icon>
              </v-btn>
              <v-btn @click="deleteLocation(props.item)" flat icon color="red">
                  <v-icon >delete</v-icon>
              </v-btn>
            </v-container>
          </v-card-title>

          <v-divider></v-divider>
          <v-list three-line subheader dense>
            <v-list-tile>
              <v-list-tile-content>Manager:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.sendername }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>
                  <v-list-tile-title>Address:</v-list-tile-title>                  
                  <v-list-tile-sub-title>{{ props.item.streetaddress }}</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Phone Number:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.phone }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>              
                <v-list-tile-content>
                  <v-list-tile-title>Review Text: </v-list-tile-title>
                  <v-list-tile-action-text>{{ props.item.reviewinvitetext }}</v-list-tile-action-text>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile class="mt-4">
              <v-list-tile-content>Review Link:</v-list-tile-content>
              <v-list-tile-content class="align-end">
                  <SelectReviewSite :location="props.item"/>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content class="align-end">
                <AddReviewSites :location="props.item"/>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-data-iterator>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import AddLocation from './AddLocation'
import SelectReviewSite from './SelectReviewSite'
import AddReviewSites from './AddReviewSites'
export default {
  data () {
    return {
      rowsPerPageItems: [3],
      pagination: {
        rowsPerPage: 3
      },
      showModal: false,
      location: null,
      dialog: false
    }
  },
  created () {
  },
  computed: {
    ...mapGetters([
      'locations'
    ])
  },
  methods: {
    editLocation (item) {
      this.location = item
      this.showModal = true
    },
    deleteLocation (location) {
      this.$store.dispatch('deleteLocation', location)
      this.location = null
    }
  },
  components: {
    AddLocation,
    SelectReviewSite,
    AddReviewSites
  },
  watch: {
    'locations': function (newState, oldState) {
      this.showModal = false
    }
  }
}
</script>


<style>
</style>
