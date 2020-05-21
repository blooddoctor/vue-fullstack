<template lang="pug">
  .column
    h3 Test Samples
    .row
      span(v-for='type in sampleTypes')
        span {{type.name}}
        span(:style='style(type.hex)') {{type.colour}}

    .row
      span(v-for='group in groups') {{group.name}} 
        span {{group.count}}

</template>

<script>
/*

  we need 1 sample per group (except 3) - allocate all samples in the group to the 


*/

const model = db.model('TestRequestSamples')
const sampleTypesReq = db.model('SampleTypes').getAll()
const groupsReq = db.model('TestTypeGroups').getAll()

export default {
  data () {
    return {
      samples: [],      // samples required
      sampleTypes: {},  //  
      groups: {},       // testgroups - 1 sample per group
    }
  },
  props: {
    testRequestId : {
      type: Number,
      default: 1
    },
    tests : {
      type: Array
    }
  },
  methods: {
    style (hex) {
      return `background-color:${hex}`
    },
    processTests() {
      this.groupsReset()
      // if tests change
      console.log('Tests', this.tests)
      this.tests.forEach( test => {
        // test.group
        this.groups[test.testGroupId]++
      })
    },
    groupsReset() {
      console.log('groups', this.groups)
      for(const [key,group] of Object.entries(this.groups)) {
        console.log('key,value', key, group)
        group.count=0 // number of tests in group
      }
    },
    processGroups() {
      for(const [key,group] of Object.entries(this.groups)) {
        if(group.count > 0) {
          this.sampleTypes[group.sampleTypeId]=1          
        } else {
          this.sampleTypes[group.sampleTypeId]=0
        }
      }

    }

  },
  watch: {
    tests () {
      this.processTests()
    },
    groups() {
      this.processGroups()
    }
  },
  mounted () {
    console.log('Mounted')
    model.getAll({
      where: {
        testRequestId: this.testRequestId
      },
      include: ['SampleTypes']
    })  // need to filter to related
    .then( data => {
      console.log('TestSamples', data.data)
      this.samples = data.data
      // data.data.forEach( (sample, idx) => {

      // })
      this.groupsReset()

    })

    sampleTypesReq.then(data => {
      console.log('SampleTypes', data.data)
      // this.sampleTypes = data.data
      data.data.forEach( (type, idx) => {
        this.sampleTypes[type.id] = type
      })
    })

    groupsReq.then(data => {
      console.log('Groups', data.data)
      data.data.forEach( (group, idx) => {
        // console.log('group, key', group, idx)
        this.groups[group.id] = group
      })
      console.log('Groups*', this.groups)
    })

  },
  computed: {
  }
}
</script>
<style lang="scss" scoped>
   span {
      margin-right:20px;
   }
   
</style>