<template lang="pug">
  .row
    .column
      .row(v-if="data.length>0") {{label}}
        .row
          table
            thead 
              tr
                <!-- th(v-for="(v,k) in data[0]") {{k}} -->
                th(v-for="(v,k) in headers") {{v}}
            tbody
              tr.clickable(v-for="(row,idx) in data"
                  :key="idx"
                  :data-key="idx"
                  @click = "click"
                )
                <!-- td(v-for="(v,k) in row" -->
                td(v-for="(col,i) in cols"
                  :key='i'
                  :data-key="idx"
                ) {{row[col]}}
      .row(v-else)
        div No data

</template>
<script>
import {capitalizeFirstLetter} from '../../common/util'


export default {
  name: 'SimpleTable',
  data () {
    return {
      key: null
    }
  },
  methods: {
    click (ev) {
      console.log('SimpleTable.click', ev)
      this.key = ev.target.dataset.key
      this.$emit('select', this.key)
      console.log('SimpleTable.key', this.key)
      this.$emit('value', this.data[this.key])
    }
  },
  props: {
    'data': {
      type: [Object, Array],
      required: true
    },
    'label': {
      type: String,
      default: 'Data Table'
    },
    cols: {
      type: Array,
    },
    headers: {
      type: Array,
    }
  },
  mounted () {
    console.log('Table mounted')
    
    if(this.data && !this.cols) {
      console.log('Setting default - all fields')
      const rec = this.data[0]
      this.cols = Object.keys(rec)
    }
    this.headers=[]
    this.cols.forEach( col => {
      console.log('col', col)
      this.headers.push(capitalizeFirstLetter(col))
    })
    console.log('table', this.data, this.cols, this.headers)
  },
  created () {
    console.log('Table created')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.clickable {
  cursor: pointer;
}
</style>
