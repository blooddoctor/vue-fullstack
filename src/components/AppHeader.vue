<template lang="pug">
  header.header
    nav.inner
      router-link(to='/' exact='')
        img.logo(src='~public/images/favicon-32x32.png' alt='logo')
      router-link(exact='' to='/') {{ appData.content.app_nav_home }}
      
      router-link(
        v-for='page in pages' 
        exact='' 
        :to='page.route' 
        :key='page.name'
        ) {{page.name}}
      
      router-link(exact='' to='/about') {{ appData.content.app_nav_about }}
      router-link(exact='' to='/examples') {{ appData.content.app_nav_examples }}
      router-link(v-if='isAuthenticated' to='/profile') {{ user.username }}
      a(v-if='isAuthenticated' href='javascript:void(0)' @click='logout()') {{ appData.content.app_nav_logout }}
      router-link(v-if='!isAuthenticated' to='/register') {{ appData.content.app_nav_register }}
      router-link(v-if='!isAuthenticated' to='/login') {{ appData.content.app_nav_login }}
      a.github(:href='appData.content.app_repo_url' target='_blank' rel='noopener')
        | {{ appData.content.app_title }}

</template>
<script>
import pages from '../pages'
console.log('pages', pages)

import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      isOpen: false,
      pages: pages
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'user', 'appData'])
  },
  methods: {
    ...mapActions({
      logout: 'logout'
    }),
    toggle() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>
