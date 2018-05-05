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
            lg5
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
    SubUsers,
  },
}
</script>


<style>

</style>
