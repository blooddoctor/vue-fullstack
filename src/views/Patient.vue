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
        select#doctor(v-model="curr.doctorId" placeholder='Patient doctor')
          option(v-for='doc in Doctors' :value='doc.id' :key='doc.id') {{doc.name}} 

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

const model = db.model('Patients')
const req = model.getModel()

// store the fk requests, and responses here
const fks = {}
req.then( () => { // the model has responded
  // this is lower on the chain - no data!!
  console.log('Get the FKs')
  if(model.keys && model.keys.fks) {
    model.keys.fks.forEach(fk =>{
      const fkReq = { 
        req: db.model(fk.tableName).getAll(),
        data : []
      }
      fks[fk.tableName] = fkReq 
      // wait for the data to arrive
      fkReq.req.then((data)=> {
        console.log('** received', data, model, fkReq)
        // will this be bound/closure
        fkReq.data = data.data// store the data on the model!!
      })
    })
  }
})

export default {
  data () {
    return {
      curr: {},
      Doctors: [] // {id:1,name:'Test',x:'X'} 
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
    console.log('Created')
    req.then( data => {
      console.log('The model has arrived', data)
      console.log('Vue', this)
      for(const [name, fkReq] of Object.entries(fks)) {
        console.log('Vue:Patient:Set receiver for FK ', name)
        fkReq.req.then( () => {
          console.log('FK Data Received', name, fkReq, this[name], fks[name].data)
          this[name] = fkReq.data
        })
      }
    })
    model.getFirst() // returns an array!
    .then( res => {
      console.log('*** data RX ***', res.data)
      if(res.data[0]) {
        this.curr = res.data[0]
      } else {
        console.log('*** No data ***')
      }
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