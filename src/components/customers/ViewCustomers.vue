<template>
  <v-container fluid grid-list-md>
    <v-dialog v-model="dialog" lazy max-width="500px">
      <v-btn
      dark
      fixed
      middle
      right
      color="red"
      slot="activator"
      @click.native="editItem(null)"      
      >
      <v-icon class="mr-1">add</v-icon>
      Send Invite
    </v-btn>
    <v-card v-if="dialog">
      <v-toolbar :height="48" card color="white">
        <v-card color="red" dark tile>
          <v-btn flat icon @click.native="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card>        
      </v-toolbar>

        <AddCustomers
        :editCustomer="customer"
        :upload="false"/>
        <!-- :editLocation="location"/> -->
      </v-card>
    </v-dialog>
    <h2 class="text-md-center headline">Customers</h2>
    <br><br>
    <v-data-table
      :headers="headers"
      :items="customers"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.firstname + ' ' + props.item.lastname }}</td>
        <td>{{ getLocation(props.item.locationid).businessname }}</td>
        <td>{{ props.item.email }}</td>
        <td>{{ props.item.phone }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="no-data">
        <h3 class="headline text-md-center grey--text grey--lighten-1">No customers to display.</h3>
      </template>
    </v-data-table>
    <div class="text-xs-center">
     <v-btn  color="primary" :href="downloadData()" download="customers.csv">Download CSV</v-btn>
    </div>
  </v-container>
</template>

<script>
import AddCustomers from './AddCustomers'
import { mapGetters } from 'vuex'
import { HTTP } from '../../http-common'
export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: 'Name',
        align: 'left',
        sortable: false,
        value: 'name'
      },
      { text: 'Location', value: 'calories' },
      { text: 'Email', value: 'fat' },
      { text: 'Phone #', value: 'carbs' },
      { text: 'Actions', value: 'name', sortable: false }
    ],
    customerData: null,
    customer: null
  }),

  computed: {
    ...mapGetters([
      'customers',
      'locations'
    ]),
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  methods: {
    getLocation (id) {
      return this.locations.filter(l => l.public_id === id)[0]
    },
    editItem (item) {
      this.customer = item
      this.dialog = true
    },

    deleteItem (item) {
      confirm('Are you sure you want to delete this item?') && this.$store.dispatch('deleteCustomer', item)
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },

    downloadData () {
      var lineArray = ['data:text/csv;charset=utf-8,', 'Name, Location, Email, Phone, Attempted to send, Successfully sent']
      this.customers.forEach((customer, index) => {
        var infoArray = [customer.firstname + ' ' + customer.lastname, this.getLocation(customer.locationid).businessname, customer.email, customer.phone, customer.attempted, customer.success]
        var line = infoArray.join(',')
        lineArray.push(line)
      })
      return lineArray.join('\n')
    }
  },
  components: {
    AddCustomers
  }
}
</script>