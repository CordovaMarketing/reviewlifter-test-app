<template>
  <div>

  <v-card>
    <v-container fluid grid-list-lg>
        <v-card-title>
          <h2 class="text-md-center">Employees</h2>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-data-table
            :headers="headers"
            :items="items()"
            hide-actions
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.firstname }}</td>
              <td>{{ props.item.lastname }}</td>
              <td class="justify-center">{{ props.item.email }}</td>
              <td class="justify-center">
                <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                  <v-icon color="pink">delete</v-icon>
                </v-btn>
              </td>
            </template>
            <template slot="no-data">
              <h3 class="headline text-md-center grey--text grey--lighten-1">No registered employees.</h3>
            </template>
          </v-data-table>
        </v-card-text>

        
        <v-card-actions>
          <v-dialog v-model="dialog" max-width="500px">
              <v-btn color="primary" dark slot="activator">Invite Employee</v-btn>
            <v-card>
              <v-card-title>
                <span class="headline">Invite Employee</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                      <v-text-field label="First Name" v-model="editedItem.firstname"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field label="Last Name" v-model="editedItem.lastname"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field label="Email" v-model="editedItem.email"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                <v-btn color="blue darken-1" flat @click.native="save">Send Invite</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-actions>
    </v-container>
    </v-card>
  </div>
</template>



<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: 'First Name',
        align: 'left',
        value: 'firstname'
      },
      { text: 'Last Name', value: 'lastname' },
      { text: 'Email', value: 'email' },
      { text: 'Actions', value: 'name', sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      firstname: '',
      lastname: '',
      email: ''
    },
    defaultItem: {
      firstname: '',
      lastname: '',
      email: ''
    }
  }),
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  methods: {
    items () {
      return this.user.subusers ? this.user.subusers : []
    },
    deleteItem (item) {
      console.log(item)
      confirm('Are you sure you want to remove this subuser?') && this.$store.dispatch('removeSubUser', item)
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      var subusers = this.items()
      subusers.push(this.editedItem)
      this.$store.dispatch('addSubUser', { 'newSubusers': subusers, 'newSubuser': this.editedItem })
      this.close()
    }
  }
}
</script>

