<template lang="pug">
.container
  .row
    h2 Tests Required
  
  .row

    test-group(v-if='dataLoaded' 
            :group="testGroups[0]" :cols='cols[0]' :tests="tests" @change="onChange" open=true)  
  .row

    test-group(v-if='dataLoaded' 
            :group="testGroups[1]" :cols='cols[1]' :tests="tests" @change="onChange")  

    test-group(v-if='dataLoaded' 
            :group="testGroups[2]" :cols='cols[2]' :tests="tests" @change="onChange")  

    test-group(v-if='dataLoaded' 
            :group="testGroups[3]" :cols='cols[3]' :tests="tests" @change="onChange")  


  .row
    test-group(v-if='dataLoaded' 
            :group="testGroups[4]" :cols='cols[4]' :tests="tests" @change="onChange")  

    test-group(v-if='dataLoaded' 
            :group="testGroups[5]" :cols='cols[5]' :tests="tests" @change="onChange")  

    test-group(v-if='dataLoaded' 
            :group="testGroups[6]" :cols='cols[6]' :tests="tests" @change="onChange")  

    //- test-group(:group="testGroups[1]" :types="testTypes" :tests="tests" @change="onChange")        
    //- test-group(:group="testGroups[2]" :types="testTypes" :tests="tests" @change="onChange")        

</template>

<script>
//- components
import TestGroup from './TestGroupCols.vue'
// import VueSingle from '../vue/VueSingle'
// VueMultiple.init('TestRequests')
const model = db.model('TestSamples')
const testGroupsReq = db.model('TestTypeGroups').getAll()
const testTypesReq = db.model('TestTypes').getAll()

export default {

  data () {
    return {
      cols: [3,1,1,1,1,1,1,1,1,1],  // cols per group
      dataLoaded: false,
      tests: [],
      testTypes: [],
      testGroups: [],
      testGroup:{},
    }
  },
  props: {
    testRequestId : {
      type: Number,
      default: 1
    }
  },
  components: {
    TestGroup
  },
  methods: {
    onChange (e) {
      const el = e.target
      // console.log('TestSample:event', el.value, el.checked)
      if(el.checked) { // add it if not already there
        const test = model.create({
          testRequestId : this.testRequestId,
          testTypeId : el.value,
        })
        // console.log('TestSamples:test.save(test)', test)
        test.save()
        .then( data =>{
          // console.log('TestSamples:object saved', data)
        })
      } else {
        const test = this.tests.find( e => e.testTypeId == el.value )
        console.log('Test found', test)
      }
    }
  },
  created () {
    model.getAll()
    .then(data => {
      // console.log('TestSamples data arrived', data.data);
      this.tests = data.data
    })
    testTypesReq.then(data => {
      // console.log('TestTypes arrived', data.tests);
      this.testTypes = data.data
    })
    testGroupsReq.then(data => {
      // console.log('TestGroups arrived', data.tests);
      this.testGroups = data.data
      this.dataLoaded = true
    })
  },
  computed: {
  }
}

</script>
<style lang="scss" scoped>

</style>