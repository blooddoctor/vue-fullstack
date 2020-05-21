<template lang="pug">
.container
  
  .row
      
      test-request-samples(v-if='dataLoaded' :testRequestId='testRequestId', :tests='tests')

  .row
    h3 Test Request - Tests/Groups
  
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

// depends totally on the tests selected
import TestRequestSamples from './TestRequestSamples.vue'

// import VueSingle from '../vue/VueSingle'
// VueMultiple.init('TestRequests')
const model = db.model('TestRequestTests')
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
    TestGroup,
    TestRequestSamples,
  },
  methods: {
    onChange (e) {
      const el = e.target
      // console.log('TestSample:event', el.value, el.checked, this.testRequestId)
      if(el.checked) { // add it if not already there
        const test = model.create({
          testRequestId : this.testRequestId,
          testTypeId : el.value,
        })
        // console.log('TestSamples:test.save(test)', test)
        test.save()
        .then( data =>{
          // console.log('TestSamples:object saved', data.data )
          this.tests.push(data.data)  // add to data - transparent in model? 
        })
      } else {
        let offset=-1
        // console.log('tests', this.tests)
        const test = this.tests.find( (o,idx) => {
            offset=idx; 
            return o.testTypeId == el.value
        })

        if(!test) {
          console.error('Test not found - Cannot be deleted', el.value)
        } else {
          if(!test.id) {
            console.error('Test Object has no ID. Cannot delete', test)
          } else {
            console.log('TestSamples.vue: model.delete()', test)
            model.delete(test)
            .then( data => {
              // console.log('TestSamples:object deleted', offset)
              this.tests.splice(offset,1)  // add to data - transparent in model?               
            })
          }

        }
      }
    }
  },
  created () {
    model.getAll({where: {
      testRequestId: this.testRequestId
    }})  // need to filter to related
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