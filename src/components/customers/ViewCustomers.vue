<template>
  <v-container fluid grid-list-md>
    <v-dialog v-model="dialog" lazy max-width="500px">
      <v-btn
      dark
      fab
      fixed
      middle
      right
      color="red"
      slot="activator"
      @click.native="editItem(null)"      
      >
      <v-icon>add</v-icon>
    </v-btn>
    <v-card v-if="dialog">
        <AddCustomers
        v-bind:editCustomer="customer"/>
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
  </v-container>
</template>

<script>
import AddCustomers from './AddCustomers'
import { mapGetters } from 'vuex'
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
    }
  },
  components: {
    AddCustomers
  }
}
</script>