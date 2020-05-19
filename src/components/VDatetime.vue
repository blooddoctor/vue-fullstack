<template lang="pug">

  label(v-if='label' for='input') {{label}}

    datetime(
      v-model="input" 
      v-bind="$attrs"
      format: Datetime.DATE_MED
    )
      //- v-on:input="$emit('input', $event.target.value)" 
    //- validation errors here
  

</template>

<script>
  
export default {
  name: 'VDateTime',
  data () {
    return {
      input: this.value
    }
  },
  methods: {
  },
  created () {
    console.log(`${this.$options.name} created`)
  },
  computed: {
  },
  props: {
    label: {
      type: String,
      default: 'Name'
    },
    value: {
      // type: String,
      default: (new Date()).toISOString(),
      required: true
    }
  }

}

</script>
<style lang="scss" scoped>
   
</style>