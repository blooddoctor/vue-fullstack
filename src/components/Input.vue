<template lang="pug">

  label(v-if='label' for='input') {{label}}

    input(
      v-bind:value="value" 
      v-on:input="$emit('input', $event.target.value)"
      v-bind="$attrs"
    )
    //- validation errors here
  

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
    value: {
      required: true
    }
  }

}

</script>
<style lang="scss" scoped>
   
</style>