<template lang="pug">

  label(v-if='label' for='select') {{label}}

    select#select(
      v-bind:value="value" 
      v-on:input="$emit('input', $event.target.value)"
      v-bind="$attrs"
    )
      //- placeholder='Patient doctor'

      option(
        v-for='option in options' 
        :value='option[id]' 
        :key='option[id]'
      ) {{option[display]}}

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
    options: {
      type: Array,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    id: {
      type: String,
      default: 'id'
    },
    display: {
      type: String,
      default: 'name'
    }

  }

}

</script>
<style lang="scss" scoped>
   
</style>