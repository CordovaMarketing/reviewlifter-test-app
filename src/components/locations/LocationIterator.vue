<template>
  <v-container fluid grid-list-md>
    <v-btn
    dark
    fab
    fixed
    middle
    right
    color="red"
    @click="editLocation(null)"
    >
    <v-icon>add</v-icon>
  </v-btn>
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
        lg3
      >
        <v-card>
          <v-card-title>
            <h4>{{ props.item.businessname }}</h4>
            <v-container grid-list-md>
            <v-btn @click="editLocation(props.item)" mx-auto flat icon color="pink">
              <v-icon>edit</v-icon>
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
              <v-list-tile-content class="align-end"> <a v-bind:href="props.item.reviewlink"> Google </a></v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-data-iterator>
    <v-dialog
        v-model="showModal"
        hide-overlay
        fullscreen
        transition="dialog-bottom-transition"
        scrollable
      >
       <v-toolbar card dark color="primary">
      <v-btn icon @click.native="showModal = false" dark>
              <v-icon>close</v-icon>
            </v-btn>
       </v-toolbar>
      <v-card>
        <AddLocation
        :editLocation="location"/>
      </v-card>
      
    </v-dialog>
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
      location: null
    }
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
    }
  },
  components: {
    AddLocation
  }
}
</script>


<style>

</style>
