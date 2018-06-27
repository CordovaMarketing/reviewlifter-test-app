<template>
<v-container fluid grid-list-md>
    <v-layout row wrap>
        <v-flex
            xs12
            sm6
            md4
            lg4
        >
        <EditCard/>
        </v-flex>

                <v-flex
            xs12
            sm6
            md4
            lg4
        >
        <div>
            <v-card>
                <v-container fluid grid-list-lg>
                    <v-card-title><h2>Invitation Form Options</h2></v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <h3></h3>
                    </v-card-text>
                    <v-list>
                        <v-list-tile v-for="(item, index) in items" :key="index">
                            <v-switch
                            :label=item.title
                            v-model=item.model
                            ></v-switch>
                        </v-list-tile>
                    </v-list>
                </v-container>   
            </v-card>
        </div>
        </v-flex>
        <v-flex
            xs12
            sm6
            md4
            lg6
        >
        <SubUsers/>
        </v-flex>
    </v-layout> 
</v-container>
</template>

<script>
import EditCard from '../billing/EditCard'
import SubUsers from '../subusers/SubUsers'

export default {
  components: {
    EditCard,
    SubUsers
  },
  data () {
      return {
        items: [
            { title: 'Show Last Name', model: this.showLastName },
            { title: 'Show Email', model: this.showEmail },
        ],
        showLastName: false,
        showEmail: false,
      }

  }
}
</script>


<style>

</style>
