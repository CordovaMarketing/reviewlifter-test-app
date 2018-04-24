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
      select: null,
      items: [
        '2324, 54 E Main St suite 2, American Fork, UT 84003',
        '5251 S Green St #150, Murray, UT 84123'
      ],
      checkbox: false
    }
  },

  methods: {
    submit () {
      // if (this.$refs.form.validate()) {
      //   // Native form submission is not yet supported
      //   axios.post('/enduser', {
      //     name: this.name,
      //     email: this.email,
      //     phone: this.email,
      //     locationid: this.select
      //     // checkbox: this.checkbox  -- this should probably stored in vuex. Purpose is to remember the location that user usually enters data for
      //   })
      // }
    },
    clear () {
      this.$refs.form.reset()
    }
  },
  computed: {
    ...mapGetters([
      'locations'
    ]),
    addresses () {
      return this.locations.map(l => l.streetaddress)
    }
  }
}
</script>

<style>

</style>
