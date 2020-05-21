<template>
  <footer class="footer">
    <span>
      <!-- {{ appData.content.app_description }} -->
    </span>
  </footer>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['appData'])
  }
};
</script>
<style scoped>
  /* footer covering data */
  footer {  
    z-index: -1;
  }
</style>
