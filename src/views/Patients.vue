<template lang="pug">

  .container.pl-4.pr-4.pt-2.pb-2
    simple-table(:data="patients" label="Patients" :cols='cols')

</template>

<script>
import SimpleTable from './../components/SimpleTable.vue'  

const request = db.model('Patients').getAll()

export default {
  data () {
    return {
      patients:[],
      cols:['name','dob','phone','email']
    }
  },
  components: {
    SimpleTable
  },
  methods: {
  },
  mounted () {
    console.log('Mounted')
    request.then(data => {
      this.patients = data.data
    })
  },
  computed: {
  }
}
</script>
<style lang="scss" scoped>
   
   
</style>