<template lang="pug">
  .column
    h3 Test Samples
    
    .button(@click='test') Test
    //- for some reason if collapsed, doesn't update the rest of the  numbers!!
    h6() Tests By Group
    div(v-if='els.g2').row#g2
      span(v-for='sample in sampleGroups')
        <!-- div {{sample.testGroupName}} -->
        div(:style='style(sample.hex)') {{sample.sampleTypeName}}
        div Tests: {{sample.testCount}}
        div Samples: {{sample.sampleCount}}

    h6(@click="toggle('g1')") Groups
    div(v-if='els.g1').row#g1
      div(v-for='group in groups') {{group.name}} 
        div Tests: {{group.testCount}}
        div Samples: {{group.sampleCount}}



    h6(@click="toggle('g3')") Samples by Type
    div(v-if='els.g3').row#g3
      span(v-for='type in sampleTypes')
        span {{type.name}}
        span(:style='style(type.hex)') {{type.colour}}
        div()
          span Tests : 
          span {{type.testCount}}

        div()
          span Samples : 
          span {{type.sampleCount}}

    h6(@click="toggle('g4')") Samples
    div(v-if='els.g4').row#g4
      span(v-for='sample in samples')
        div(:style='style(sample.hex)') 
          span {{sample.name}} 
          span {{sample.colour}}
        div Tests: {{sample.testCount}}
        div Samples: {{sample.sampleCount}}

      .button(@click='generate') Generate Samples


</template>

<script>
/*

  we need 1 sample per group (except 3) - allocate all samples in the group to the 


*/

const model = db.model('TestRequestSamples')
const sampleTypesReq = db.model('SampleTypes').getAll()
const groupsReq = db.model('TestTypeGroups').getAll()
const $ = (id) => document.getElementById(id)


export default {
  data () {
    return {
      sampleGroups: [],      // samples required
      sampleTypes: [],  //  
      groups: [],       // testgroups - 1 sample per group
      samples: [],
      els: {},
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
    test () {
      db.query(`SELECT sql FROM sqlite_master WHERE type='index';`)
      .then(data => {
        console.log('query 2', data.data)
      })
      db.query(`SELECT name FROM sqlite_master WHERE type='table';`)
      .then(data => {
        console.log('query 1', data.data)
      })

    },
    style (hex) {
      // console.log('bg',`background-color:${hex};color:black;`, hex )
      return `background-color:${hex};color:black;`
    },
    toggle (id) {
      // const el = $(id)
      this.els[id] = !this.els[id]
    },
    generate () {
      // need to check that each sampleTypes entry has a samples entry
      const idx = this.index(this.samples, 'sampleTypeId')
      this.sampleTypes.forEach( type => {
        // console.log('type', type)
        let sample = idx[type.id]
        if(!sample) {
          // no entry for this type
          sample = model.create({
            testRequestId: this.testRequestId,
            sampleTypeId:type.id,
            testCount: type.testCount,
            sampleCount: type.sampleCount
          })
          console.log('new sample', sample)
          model.save(sample)
          .then( data => {
            data = data.data[0] // query returns the query as well as the data
            console.log('data', data)  // this seems to be called 3 times!!
            Object.assign(sample, data)
            this.samples.push(sample)
          })
        }

      })

    },
    async getCounts () {
      // should be a RIGHT JOIN - SQLite doens't support!!
      console.log('issue counts request')
      const q = db.query(`
      SELECT 
          Count(*) as testCount, 
          TestTypeGroups.id AS testGroupId,
          TestTypeGroups.name AS testGroupName,
          SampleTypes.id AS sampleTypeId,
          SampleTypes.name AS sampleTypeName, 
          SampleTypes.colour AS colour,
          SampleTypes.hex AS hex
        FROM TestRequestTests 
        JOIN TestTypes ON TestRequestTests.testTypeId = TestTypes.id
        JOIN TestTypeGroups ON TestTypes.testTypeGroupId = TestTypeGroups.id
        JOIN SampleTypes ON TestTypeGroups.sampleTypeId = SampleTypes.id
        WHERE TestRequestTests.testRequestId = ${this.testRequestId}
        GROUP BY TestTypeGroups.id;
      `)
      console.log('q', q)

      q.then(data => {
        /*
          2 element array = 1st element is data, 2nd element is the query
        */
        console.log('Counts request', data.data)
        // data = data.data[0]  // this caused some funny erros!! wrong data!!
        this.sampleGroups = data.data[0]
        this.sampleGroups.forEach(sample => {
          // console.log('sample', sample)
          if(sample.testCount>0){
            sample.sampleCount = 1
          } else {
            sample.sampleCount = 0
          }
          if(sample.testGroupId == 3 && sample.testCount == 2) {
            sample.sampleCount = 2
          }

        })

        // can't just query again with different GROUP BY SampleTypeId
        // need to know the test groups for group 3!!
        this.sampleTypes.forEach( type => {
          // console.log('type', type)
          type.testCount = 0
          type.sampleCount = 0
        })
        let idx = this.index(this.sampleTypes)
        this.sampleGroups.forEach(group => {
          // console.log('group', group)

          let type = idx[group.sampleTypeId];

          type.testCount += group.testCount
          type.sampleCount += group.sampleCount
        })

        // now handle the groups - including empty groups
        this.groups.forEach(group => {
          group.testCount = 0
          group.sampleCount = 0
        })

        idx = this.index(this.groups)
        this.sampleGroups.forEach(group => {
          // console.log('group', group)

          let grp = idx[group.testGroupId];
          if(!grp) console.error('Cannot find TestTypeGroup', group.testGroupId, group)
          grp.testCount += group.testCount
          grp.sampleCount += group.sampleCount
        })


          
      })




    },
    index (arr, key='id') {
      const idx = {}
      arr.forEach(el => {
        idx[el[key]] = el
      })
      return idx
    },

  },
  watch: {
    tests () {
      this.getCounts()
    },
  },
  mounted () {
    console.log('Mounted')
    
    this.els = { g1:false, g2:true, g3:false, g4:false}

    // model.getAll({
    //   where: {
    //     testRequestId: this.testRequestId // this not working!!
    //   },
    //   // include: ['SampleTypes']
    // })  // need to filter to related
    console.log('issue test samples request')
    const q = db.query(`
      SELECT * FROM TestRequestSamples
        JOIN SampleTypes
        ON TestRequestSamples.sampleTypeId = SampleTypes.id
        WHERE TestRequestSamples.testRequestId = ${this.testRequestId}
    `)
    console.log('q', q)
    q.then( data => {
      console.log('TestSamples', data.data)
      // data = data.data[0]
      this.samples = data.data[0]
      // data.data.forEach( (sample, idx) => {

      // })
      // this.groupsReset()

    })

    sampleTypesReq.then(data => {
      // console.log('SampleTypes', data.data)
      this.sampleTypes = data.data
      // data.data.forEach( (type, idx) => {
      //   this.sampleTypes[type.id] = type
      // })
    })

    groupsReq.then(data => {
      // console.log('Groups', data.data)
      // data.data.forEach( (group, idx) => {
      //   // console.log('group, key', group, idx)
      //   this.groups[group.id] = group
      // })
      this.groups = data.data
      // console.log('Groups*', this.groups)
    })

    this.getCounts()

  },
  computed: {
  }
}
</script>
<style lang="scss" scoped>
   span {
      margin-right:20px;
   }
   h6 {
    background-color: lightgrey;
    @extend .clickable
   }
   .clickable {
    cursor: pointer;
   }
   
</style>