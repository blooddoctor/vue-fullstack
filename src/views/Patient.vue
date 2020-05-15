<template lang="pug">
.container
  .row
    h1 Patient Details
  .row

    .column
      legend Patient
    
      label(for='name') Name
        input#name(v-model="curr.name" placeholder='Patient name')

      label(for='dob') DOB
        //- need to parse the date value 
        input#dob(v-model="curr.dob" type="date" placeholder='Patient Date of Birth')

      //- this is a FK lookup
      label(for='doctor') Doctor
        select#doctor(v-model="curr.doctor" placeholder='Patient doctor')

    .column

        legend Statistics

        label(for='weight') Weight
          input#weight(v-model="curr.weight" placeholder='Patient weight')
        
        label(for='height') Height
          input#height(v-model="curr.height" type="tel" placeholder='Patient height')

        label(for='cholesterol') Cholesterol
          input#cholesterol(v-model="curr.cholesterol" type="cholesterol" placeholder='Patient cholesterol')

        label(for='bp') BP
          input#bp(v-model="curr.bp" type="bp" placeholder='Patient blood pressure')

    .column
        legend Contact Details

        label(for='address') Address
          input#address(v-model="curr.address" placeholder='Patient address')
        
        label(for='phone') Phone
          input#phone(v-model="curr.phone" type="tel" placeholder='Patient phone #')

        label(for='email') Email
          input#email(v-model="curr.email" type="email" placeholder='Patient email')

    .button(@click='getOne')

</template>

<script>
import { mapGetters } from 'vuex';
// console.log('before')
// import {dataService} from '../services/data.service'
// console.log('after' , dataService)
// i need to go out of the project - perhaps an internal entity folder linking out?
// import Patient from './../../common/entities/Patient'

// Patient.client(dataService)

// const curr = Patient.dummy()
// const curr = db.model('Patients').getOne(1)
// it looks like I might have to do this INSIDE vue, to give me access
// .then(
//   console.log('curr', curr)
// )

export default {
  data () {
    return {
      curr: {}
    }
  },
  methods: {
    // Don't use an arrow function when defining a mothod - no this!! 
    getUsers () {
      console.log('this', this.data.get('/api/db'))

    },
    getOne () {

    }

  },
  created () {
    db.model('Patients').getOne(1)
    .then( res => {
      console.log('*** data ***', res.data)
      this.curr = res.data
    })
  },
  computed: {
    ...mapGetters(['appData'])
  }
}
</script>
<style lang="scss" scoped>
   
   legend {
      color: red;
      display: block; 
      margin-before: 0.5em; 
      margin-after: 0.5em; 
      margin-start: auto; 
      margin-end: auto; 
      overflow: hidden; 
      border-style: inset; 
      border-width: 1px;
      border-radius: 5px;
   }
</style>