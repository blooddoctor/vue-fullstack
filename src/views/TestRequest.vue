<template lang="pug">
.container
  .row
    h1 Test Request
  .row

    .column
      //- legend Patient

      //- v-select(label="Patient" 
      //-   :options="Patients" 
      //-   v-model="curr.patientId"
      //- )
      //- v-select(label="Doctor" :options="Doctors" v-model="curr.doctorId" placeholder='The Doc')
      //- v-select(label="Hospital" :options="Hospitals" v-model="curr.hospitalId")

    
    .colunn

      //- legend Patient
      //- label Created
      //- v-datetime(label='Created'
      //-     v-model="curr.createdAt"
      //-     placeholder="Date/Time sample created at"
      //-     :type="dt"
      //-    )

      //- v-datetime(label='Collected'
      //-   v-model="curr.collected"
      //-   placeholder="Date/Time sample collected at"
      //-   :type="dt"
      //-  )
      //- v-datetime(label='Expected'
      //-   v-model="curr.resultsExpected"
      //-   placeholder="Date/Time results expected at"
      //-   :type="dt"
      //-  )
      //- v-datetime(label='Actual'
      //-   v-model="curr.resultsActual"
      //-   placeholder="Date/Time results expected at"
      //-   :type="dt"
      //-  )
  .row
    .column
      test-samples(:testRequestId='curr.id')


</template>

<script>
//- components
import VSelect from '../components/Select.vue'
import VInput from '../components/Input.vue'
import VDatetime from '../components/VDatetime.vue'

import TestSamples from './TestSamples.vue'

import VueSingle from '../vue/VueSingle'
VueSingle.init('TestRequests')

export default VueSingle.bind({
  data () {
    return {
      curr: {
        doctorId: 0,
        patientId: 0,
        hospitalId: 0
      },
      dt: 'datetime-local'
      // Doctors: []
    }
  },
  components: {
    VSelect, 
    VInput, 
    VDatetime,
    TestSamples,
  },
  methods: {

  },
  created () {
  },
  computed: {
  }
})

</script>
<style lang="scss" scoped>
   
</style>