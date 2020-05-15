<template lang="pug">
.row
  .column
    h1 {{ appData.content.app_title }}
    |       {{ appData.content.app_description }}
    br
      
    .button(v-on:click='this.getUsers') Get Users

    router-link(to='/api/db/Users/get/1') Get Users

    div
      router-link.button.button-outline.float-right(to='about') More info


</template>

<script>
import { mapGetters } from 'vuex';
import {dataService} from '../services/data.service'

export default {
  data () {
    return {
      data:dataService
    }
  },
  methods: {
    // Don't use an arrow function when defining a mothod - no this!! 
    getUsers () {
      console.log('issuing request')
      this.data.get('/db/Users/1')  // should be async
      .then( data => {
        console.log('response', data)
      })
      .catch( err => {
        console.error('err' , err)
      })      

    }
  },
  computed: {
    ...mapGetters(['appData'])
  }
}
</script>
