<template>
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
        <v-btn color="blue darken-1" flat @click.native="saveReviewSite">Save</v-btn>
        </v-card-actions>
    </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: ['location'],
  data () {
    return {
      dialog: false,
      item: {
        label: '',
        url: ''
      }
    }
  },
  methods: {
    saveReviewSite () {
      var updated = this.location
      if (updated.reviewsites) {
        updated.reviewsites.push(this.item)
      } else {
        updated.reviewsites = [this.item]
      }
      this.$store.dispatch('addLocation', updated)
      this.close()
    },
    removeReviewSite () {
      var updated = this.location
      if (updated.reviewsites) {
        if (this.item.select) {
          updated.reviewsites = updated.reviewsites.filter(site => site.label !== this.item.select)
        }
        this.$store.dispatch('addLocation', updated)
      }
    },
    close () {
      this.dialog = false
    }
  }
}
</script>


<style>

</style>
