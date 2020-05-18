<template lang="pug">
  label(v-if='label' for='select') {{label}}
    select#select(v-model="value" placeholder='Patient doctor')
      option(v-for='option in values' :key='option.id') {{option.name}}

</template>

<script>
  
export default {
  data () {
    return {
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
    values: {
      type: Array,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  }

}

</script>
<style lang="scss" scoped>
   
</style>