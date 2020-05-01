<template lang="pug">
.row
  .column
    h1 {{ appData.content.app_title }}
    |       {{ appData.content.app_description }}
    br

    div
      router-link.button.button-outline.float-right(to='about') More info

    div This is some sample pug

    ul This is a kinda menu markup
      li Option 1
      li option 2

    ul Some interpreted stuff
    for el in ['One','Two','Three']
      li #{el}

    p A paragraph

    p.
      A multi line 
      paragraph
      over several lines.
      Pug will strip white space

    router-link(to='about') This uses the vue router-link tag

    .button This is a div tag. div not required, just the class name

    .button#some-button Another button, with an ID


</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['appData'])
  }
};
</script>
