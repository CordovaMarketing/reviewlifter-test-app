<template>
<v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout>
        <v-flex  xs10 offset-xs1>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-text-field
            label="First Name"
            v-model="customer.firstname"
            :rules="firstNameRules"
            :counter="10"
            required
          ></v-text-field>
          <v-text-field
            label="Last Name"
            v-model="customer.lastname"
            :rules="customer.lastname ? lastNameRules : [true]"
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
            :rules="customer.email ? emailRules : [true]"
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
            color="success"
          >
            Send Invite
          </v-btn>
          <v-btn @click="clear">clear</v-btn>
        </v-form>

        <div v-if="upload">
          <v-divider class="mt-2"></v-divider>
          <h5 class="title mt-2" v-text="uploadMessage()"></h5>
          <v-dialog
          v-model="showModal"
          hide-overlay
          fullscreen
          transition="dialog-bottom-transition"
          >
              <v-btn
              :disabled="!location"
              fixed
              middle
              color="primary"
              slot="activator"
              @click.native="showModal = false"
              >
              <v-icon class="mr-2">cloud_upload</v-icon>
              Upload CSV
              </v-btn>
              <v-card scrollable>
              <v-toolbar :height="48" card color="white">
                <v-card color="red" dark tile>
                  <v-btn flat icon @click.native="showModal = false">
                    <v-icon>close</v-icon>
                  </v-btn>
                </v-card>        
              </v-toolbar>
                <UploadCustomers :locationid="location ? location.public_id : null"/>
              </v-card>

            </v-dialog>
          </div>
        </v-flex>
    </v-layout>
  </v-slide-y-transition>
</v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import UploadCustomers from './UploadCustomers'

export default {
  props: ['editCustomer', 'upload'],
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
      firstNameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      lastNameRules: [
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      emailRules: [
        // v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      phoneRules: [
        v => !!v || 'Phone is required',
        v => /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(v) || 'Please enter a valid mobile number'
      ],
      checkbox: false,
      select: [],
    }
  },
  mounted () {
    this.editWithCustomer()
    this.fillPreflocation()
  },
  methods: {
    uploadMessage () {
      return this.location ? 'Send multiple invites' : 'Select location to send multiple invites'
    },
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
    fillPreflocation () {
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
