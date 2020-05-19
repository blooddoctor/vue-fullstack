<template lang="pug">
.container
  .row
    h2 Tests Required
  .row

    //- group by test group
    div.column(v-for="testGroup in testGroups")
      legend {{testGroup.name}}
      div(
        v-for='testType in testTypes'
        ) 
          div(v-if="testType.testGroupId=testGroup.id")
            label {{testType.name}} 
            input(type='checkbox' v-model="testType.id") 
        

</template>

<script>
//- components

// import VueSingle from '../vue/VueSingle'
// VueMultiple.init('TestRequests')
const model = db.model('TestSamples')
const testGroupsReq = db.model('TestTypeGroups').getAll()
const testTypesReq = db.model('TestTypes').getAll()

export default {

  data () {
    return {
      data: [],
      testTypes: [],
      testGroups: [],
    }
  },
  components: {
  },
  methods: {

  },
  created () {
    model.getAll()
    .then(data => {
      console.log('TestSamples data arrived', data.data);
      this.data = data.data
    })
    testTypesReq.then(data => {
      console.log('TestTypes arrived', data.data);
      this.testTypes = data.data
    })
    testGroupsReq.then(data => {
      console.log('TestGroups arrived', data.data);
      this.testGroups = data.data
    })
  },
  computed: {
  }
}

</script>
<style lang="scss" scoped>
   label, input {
    display:inline;
    line-height: 1;
    width:40%;
   }
</style>