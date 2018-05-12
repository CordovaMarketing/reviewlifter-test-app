<template>
    <v-select
    label="Select Review Site"
    v-model="select"
    :items="reviewsites"
    required
    @change="selectReviewLink">
    </v-select>
</template>

<script>
export default {
  props: ['location'],
  data () {
    return {
      select: this.location.reviewlink.label
    }
  },
  methods: {
    selectReviewLink (newSite) {
      if (this.location.reviewsites) {
        var updated = this.location
        updated.reviewlink = this.location.reviewsites.find(s => s.label === newSite)
        this.$store.dispatch('addLocation', updated)
      }
    }
  },
  computed: {
    reviewsites () {
      return this.location.reviewsites ? this.location.reviewsites.map(item => item.label) : []
    }
  }
}
</script>


<style>

</style>
