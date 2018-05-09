<template>
    <v-select
    label="Select Review Site"
    v-model="select"
    :items="reviewsites()"
    required
    @change="selectReviewLink()">
    </v-select>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['location'],
  data () {
    return {
      select: []
    }
  },
  created(){
    this.select = this.location.reviewlink ? JSON.parse(this.location.reviewlink).label: []
  },
  methods: {
    reviewsites () {
      return this.location.reviewsites ? JSON.parse(this.location.reviewsites).map(item => item.label) : []
    },
    selectReviewLink() {
      if (this.location.reviewsites) {
        var sites = JSON.parse(this.location.reviewsites)
        var site = sites.find(site => site.label === this.select)
        this.location.reviewlink = JSON.stringify(site)
        this.$store.dispatch('addLocation', this.location)
        this.select = this.location.reviewlink ? JSON.parse(this.location.reviewlink).label: []
      }
        
    }
  }
}
</script>


<style>

</style>
