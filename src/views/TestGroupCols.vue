<template lang="pug">
  
  <!-- div.column.group.panel( :openLabel='group.name' :closedLabel='group.name' :isOpen='open')  -->
  .column.group

    span.panel-header(href='header' @click='toggleOpen') {{group.name}}

    div.row(v-if='isOpen' href='content')

      div.column(v-for='col in cols') 

        div(
          v-for="(type, idx) in types"
        )
          div(
            v-if="showInCol(idx,col)"
          )

            input(type='checkbox'
                v-model="inner" 
                :key="type.id"
                :id="type.id"
                :value="type.id"
                @change="onChange"
               ) 
            label(:for='type.id') {{type.name}} 
                //- :checked="isChecked(type.id)"
        //- div(v-else) Exclude {{test.name}} {{test.testTypeGroupId}}

</template>

<script>
import 'vue-collapsible-component/lib/vue-collapsible.css';
import Collapsible from 'vue-collapsible-component';

const testTypesReq = db.model('TestTypes').getAll()

const sampleTypes = db.model('SampleTypes').getAll()

export default {
  data () {
    return {
      isOpen: this.open,
      inner:[],
      types: [],
    }
  },
  components: {
    Collapsible
  },
  methods: {
    numberInCol() {
      const n = Math.floor(this.types.length/this.cols)
      // console.log('numberInCol', n)
      return n
    },
    showInCol(idx,col) {
      const colNum = 1 + Math.floor(idx / this.numberInCol())
      // console.log('idx,col,show' , idx,col,colNum,colNum == col )
      return colNum == col
    },
    isChecked (typeId) {
      // console.log('isChecked', typeId, this.tests.includes(typeId))
      return this.tests.includes(typeId)
    },
    onChange (e) {
      // console.log('event', e)
      this.$emit('change', e)
      this.$emit('input', e) // NBB to work with v-model outside
    },
    onDataArrived () {
      // console.log('Test data has arrived - create inner list of IDs')
      this.tests.forEach(test => {
        // console.log('initial', test.testTypeId)
        this.inner.push(test.testTypeId)
      })

    },
    toggleOpen() {
      console.log('clicked')
      this.isOpen = !this.isOpen
    }

  },
  mounted () {
    // console.log('TestGroup:Mounted', this.tests)
    this.isOpen = this.open
    testTypesReq.then(data => {
      // console.log('TestTypes.data', data.data)
      this.types = data.data.filter(type => type.testTypeGroupId == this.group.id )

    })
  },
  computed: {

  },
  watch : {
    // this is responding to any change to tests!! beong called 7 times!!
    tests () { // this value is the result of an sync fetch outside
      console.log('Tests have arrived')
      this.onDataArrived()
    }

  },
  props: {
    group: {
      type: Object,
      required: true
    },
    // types: { // testTypes
    //   type: Array,
    //   required: true
    // },
    tests: {
      type: Array,
      required: true
    },
    cols: {
      type: Number,
      default: 1
    },
    open: { // whether the collapsed data
      type: Boolean,
      default: false
    },


  }
}
</script>
<style lang="scss" scoped>
  .column {
    border-right: solid 1px gray;
  } 
  label, input {
    display: inline-block;
    flex-wrap: wrap;
    line-height: 1;
    /*width: 40%;*/
    /*border: solid 1px red;*/
    vertical-align: middle;
    /*margin-bottom: 5px;*/
   }
   input {
    /*margin-top: 5px;*/
    margin-bottom: 5px;
    height: auto;
    width: 10%;
    /*float: right;*/
   }
   label {
    width: 80%;
   }
   .group {
      border: solid 2px gray;

   }
   .panel-header {
      padding-top: 3px;
      display: block;
      background-color: lightgrey;
      cursor:pointer;
   }


</style>