<template lang="pug">
  
  div
    legend {{group.name}}
      div(
        v-for="type in types"
      )
        div(
          v-if="type.testTypeGroupId == group.id"
        )

          input(type='checkbox'
              v-model="inner" 
              :key="type.id"
              :value="type.id"
              :checked="isChecked(type.id)"
              @change="onChange"
             ) 
          label {{type.name}} 
        //- div(v-else) Exclude {{test.name}} {{test.testTypeGroupId}}

</template>

<script>
  
export default {
  data () {
    return {
      inner:[]
    }
  },
  methods: {
    isChecked (typeId) {
      console.log('isChecked', typeId, this.tests.includes(typeId))
      return this.tests.includes(typeId)
    },
    onChange (e) {
      console.log('event', e)
      this.$emit('change', e)
      this.$emit('input', e) // NBB to work with v-model outside
    },
    onDataArrived () {
      console.log('Test data has arrived - create inner list of IDs')
      this.tests.forEach(test => {
        console.log('initial', test.testTypeId)
        this.inner.push(test.testTypeId)
      })

    }

  },
  mounted () {
    console.log('TestGroup:Mounted', this.tests)
  },
  computed: {
  },
  watch : {
    
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
    types: { // testTypes
      type: Array,
      required: true
    },
    tests: {
      type: Array,
      required: true
    }

  }
}
</script>
<style lang="scss" scoped>
   
  label, input {
    display: inline-block;
    flex-wrap: wrap;
    line-height: 1;
    /*width: 40%;*/
    border: solid 1px red;
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


</style>