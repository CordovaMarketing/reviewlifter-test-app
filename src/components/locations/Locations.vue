<template>
  <v-container fluid grid-list-md>
    <v-dialog
        v-model="showModal"
        hide-overlay
        fullscreen
        transition="dialog-bottom-transition"
        scrollable
      >
    <v-btn
    dark
    fab
    fixed
    middle
    right
    color="red"
      slot="activator"
    
    @click="editLocation(null)"
    >
    <v-icon>add</v-icon>
  </v-btn>
      <v-toolbar card color="white">
        <v-card color="red" dark tile>
          <v-btn flat icon @click.native="showModal = false">
            <v-icon >close</v-icon>
          </v-btn>
        </v-card>        
      </v-toolbar>
      <v-card>
        <AddLocation
        :editLocation="location"/>
      </v-card>
    </v-dialog>
   
  <br><br>
  <br><br>
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
              <v-layout >
                <h4>{{ props.item.businessname }}</h4>
              </v-layout>
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
                  <v-list-tile-sub-title>{{ props.item.reviewinvitetext }}</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Review Link:</v-list-tile-content>
              <v-list-tile-content class="align-end">   
                <v-select
                label="Select Review Site"
                v-model="select"
                :items="items(props.item)"
                required
                @change="saveReviewLink(props.item)">
                </v-select>
            </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content class="align-end">
                <v-dialog v-model="dialog" max-width="500px">
                  <v-btn color="primary" dark slot="activator">Add Review Site</v-btn>
                <v-card>
                  <v-card-title>
                    <span class="headline">Add Review Site</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 sm6 md4>
                          <v-text-field label="Site Name" v-model="item.label"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field label="URL" v-model="item.url"></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="saveReviewLink(props.item)">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
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
export default {
  data () {
    return {
      rowsPerPageItems: [3],
      pagination: {
        rowsPerPage: 3
      },
      showModal: false,
      location: null,
      dialog: false,
      item: {
        label: '',
        url: '',
      },
      select: []
    }
  },
  created() {

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
    },
    items (location) {
      this.location = this.locations.find(l => l.public_key === location.public_key)
      return location.reviewsites ? JSON.parse(location.reviewsites).map(item => item.label) : []
    },
    saveReviewLink (location) {
     if (location.reviewsites){
        var sites = JSON.parse(location.reviewsites)
        if (this.item.label){
          sites.push(this.item)
          location.reviewsites = JSON.stringify(sites)
        } else if (this.select){
          var site = sites.find(item => item.label === this.select)
          console.log(sites)
          location.reviewlink = site.url
        }
        this.$store.dispatch('addLocation', location)
     } else if (this.item.label) {
       location.reviewsites = JSON.stringify([this.item])
       this.$store.dispatch('addLocation', location)
     }
     this.items(location)
    }
  },
  components: {
    AddLocation
  }
}
</script>


<style>

</style>
