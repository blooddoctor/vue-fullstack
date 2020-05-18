<template lang="pug">
.container
  .row
    h1 Test Request
  .row

    .column
      legend Patient
      
      select(label="Doctor" :values="Doctors" :value="curr.doctorId")
        option(v-for="doctor in Doctors") {{doctor.name}}

</template>

<script>
import Select from '../components/Select.vue'
import VueSingle from '../vue/VueSingle'
VueSingle.init('TestRequests')

export default VueSingle.bind({
  data () {
    return {
      // curr: {},
      // Doctors: []
    }
  },
  components: {
    Select
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