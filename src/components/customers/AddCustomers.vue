<template>
<v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout>
        <v-flex xs10 offset-xs1>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-text-field
            label="First Name"
            v-model="customer.firstname"
            :rules="nameRules"
            :counter="10"
            required
          ></v-text-field>
          <v-text-field
            label="Last Name"
            v-model="customer.lastname"
            :rules="nameRules"
            :counter="10"
          ></v-text-field>
          <v-text-field
            label="Phone"
            v-model="customer.phone"
            :rules="phoneRules"
            required
          ></v-text-field>
          <v-text-field
            label="E-mail"
            v-model="customer.email"
            :rules="emailRules"
          ></v-text-field>
          <v-select
            label="Location"
            v-model="select"
            :items="addresses"
            :rules="[v => !!v || 'Location is required']"
            required
          ></v-select>
          <v-checkbox
          v-if="editCustomer === null"
            label="Set location to default to this value"
            v-model="checkbox"
          ></v-checkbox>

          <v-btn
            @click="submit"
            :disabled="!valid"
          >
            submit
          </v-btn>
          <v-btn @click="clear">clear</v-btn>
        </v-form>
        </v-flex>
    </v-layout>
  </v-slide-y-transition>
</v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['editCustomer'],
  data () {
    return {
      valid: true,
      customer: {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        locationid: this.location ? this.location.public_id : null
      },
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      phoneRules: [
        v => !!v || 'Phone is required',
        v => /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(v) || 'Please enter a valid mobile number'
      ],
      select: [],
      checkbox: false
    }
  },
  created () {
    // if (this.user.preflocation) {
    //   this.select = this.locations.find(l => l.public_id === this.user.preflocation).streetaddress
    //   this.checkbox = true
    // } else {
    //   this.select = []
    // }
  },
  mounted () {
    this.editWithCustomer()
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        this.customer.locationid = this.location.public_id
        this.$store.dispatch('addCustomer', this.customer)
        this.savePrefferedLocation()
      }
    },
    savePrefferedLocation () {
      // This is being sent every time I submit a customer

      // if (this.checkbox) {
      //   this.user.preflocation = this.location.public_id
      //   this.$store.dispatch('updateUser', this.user)
      // } else {
      //   this.user.preflocation = null
      //   this.$store.dispatch('updateUser', this.user)
      // }
    },
    clear () {
      this.$refs.form.reset()
    },
    editWithCustomer () {
      if (this.editCustomer) {
        this.customer = Object.assign({}, this.editCustomer)
        this.select = this.locations.find(l => l.public_id === this.editCustomer.locationid).streetaddress
      } else {
        this.clear()
      }
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'locations',
      'snackbar'
    ]),
    addresses () {
      return this.locations.map(l => l.streetaddress).filter(l => l != null)
    },
    location () {
      return this.locations.find(l => l.streetaddress === this.select)
    }
  },
  watch: {
    editCustomer: function () {
      this.editWithCustomer()
    }
  }
}
</script>

<style>

</style>
