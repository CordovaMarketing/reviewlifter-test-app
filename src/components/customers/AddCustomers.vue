<template>
<v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout>
        <v-flex  xs10 offset-xs1>
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
          <div v-if="user">
          <v-select
            label="Location"
            v-model="select"
            :items="addresses"
            :rules="[v => !!v || 'Location is required']"
            required
          ></v-select>
          <v-checkbox
            label="Set location to default to this value"
            v-model="checkbox"
          ></v-checkbox>
          </div>
          <v-btn
            @click="submit"
            :disabled="!valid"
          >
            submit
          </v-btn>
          <v-btn @click="clear">clear</v-btn>
        </v-form>
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
            @click.native="uploadCustomers"
            >
            <v-icon>cloud_upload</v-icon>
            </v-btn>
            <v-toolbar card color="white">
              <v-card color="red" dark tile>
                <v-btn flat icon @click.native="showModal = false">
                  <v-icon>close</v-icon>
                </v-btn>
              </v-card>        
            </v-toolbar>
            <v-card v-if="location" scrollable>
              <UploadCustomers :locationid="location.public_id"/>
            </v-card>
          </v-dialog>
        </v-flex>
    </v-layout>
  </v-slide-y-transition>
</v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import UploadCustomers from './UploadCustomers'

export default {
  props: ['editCustomer'],
  data () {
    return {
      valid: true,
      showModal: false,
      customer: {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        locationid: this.location ? this.location.public_id : null,
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
       checkbox: false,
       select: []
    }
  },
  mounted () {
    this.editWithCustomer()
    this.fillPreflocation()

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
    uploadCustomers () {
      this.showModal = true
    },
    savePrefferedLocation () {
      // This is being sent every time I submit a customer
      var updated = this.user
      if (this.checkbox) {
        updated.preflocation = this.location.public_id
        this.$store.dispatch('updateUser', updated)
      } else {
        updated.preflocation = null
        this.$store.dispatch('updateUser', updated)
      }
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
    },
    fillPreflocation() {
      if (this.user.preflocation) {
        this.checkbox = true
        this.select = this.locations.find(l => l.public_id === this.user.preflocation).streetaddress
      } else {
        this.select = []
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
    },
    addresses: function () {
      this.fillPreflocation()
    }
  },
  components: {
    UploadCustomers
  }
}
</script>

<style>

</style>
