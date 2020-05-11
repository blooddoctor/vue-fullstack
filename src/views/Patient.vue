<template lang="pug">
.row
  .column
    h1 Patient Details



</template>

<script>
import { mapGetters } from 'vuex';
console.log('before')
import {dataService} from '../services/data.service'
console.log('after' , dataService)

class Patient {

}
const curr = new Patient({
      name: 'Eamonn Coghlan',
      address: 'Here, there and everywhere',
      phone: '02142168',
      email: 'eamole@hotmail.com'

    })


export default {
  data () {
    return {
      curr: curr
    }
  },
  methods: {
    // Don't use an arrow function when defining a mothod - no this!! 
    getUsers () {
      console.log('this', this.data.get('/api/db'))

    }
  },
  computed: {
    ...mapGetters(['appData'])
  }
}
</script>
