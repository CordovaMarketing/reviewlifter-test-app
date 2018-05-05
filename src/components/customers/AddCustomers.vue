<template>
<v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout>
        <v-flex xs10 offset-xs1>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-text-field
            label="First Name"
            v-model="firstName"
            :rules="nameRules"
            :counter="10"
            required
          ></v-text-field>
          <v-text-field
            label="Last Name"
            v-model="lastName"
            :rules="nameRules"
            :counter="10"
          ></v-text-field>
          <v-text-field
            label="Phone"
            v-model="phone"
            :rules="phoneRules"
            required
          ></v-text-field>
          <v-text-field
            label="E-mail"
            v-model="email"
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
  data () {
    return {
      valid: true,
      firstName: '',
      lastName: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      phone: '',
      phoneRules: [
        v => !!v || 'Phone is required',
        v => /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(v) || 'Please enter a valid mobile number'
      ],
      select: [],
      checkbox: false
    }
  },

  methods: {
    submit () {
      console.log('here')
      if (this.$refs.form.validate()) {
        console.log('inside')

        // Native form submission is not yet supported
        this.$store.dispatch('addCustomer', {
          locationid: this.locationid,
          firstname: this.firstName,
          lastname: this.lastName,
          email: this.email,
          phone: this.phone
        })
      }
    },
    savePrefferedLocation () {
      // this will have to be sent to the server to maintain and sent with user message
      // Update user
      // store.dispatch('setUser', data.user_data)
      // locationid: this.select
    },
    clear () {
      this.$refs.form.reset()
    }
  },
  computed: {
    ...mapGetters([
      'locations',
      'snackbar'
    ]),
    addresses () {
      return this.locations.map(l => l.streetaddress).filter(l => l != null)
    },
    locationid () {
      return this.locations.find(l => l.streetaddress === this.select).public_id
    }
  }
}
</script>

<style>

</style>
