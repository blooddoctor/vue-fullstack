import Vue from 'vue';
import App from './App.vue';
import { store } from './store';
import { router } from './router';
import { sync } from 'vuex-router-sync';
import { decode, sessionService } from './services';
import { ACCESS_TOKEN } from './constants';



import { Datetime } from 'vue-datetime'
// You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css'
 
Vue.component('datetime', Datetime)
global.Datetime = Datetime


import dataService from './services/data.service'  // comms
import Db from '../common/Db'   // new ClientSide models
// merge the comms and models
global.db = new Db(dataService)
global.db.models = global.db.tables // harmonize

// bootstrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

// import LogRocket from 'logrocket';
// LogRocket.init('kqv2le/blooddoctor');

// import vuetify from './plugins/vuetify'

import titleMixin from './util/title';
// mixin for handling title
Vue.mixin(titleMixin);


import { createValidation } from './forms';
// plugins
createValidation();

import * as filters from './util/filters';
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});



// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export function createApp() {
  // sync the router with the vuex store.
  // this registers `store.state.route`
  sync(store, router);

  // create the app instance.
  // here we inject the router, store and ssr context to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = new Vue({
    router,
    store,
    // vuetify,  // add in vuetify
    render: h => h(App)
  });

  // Initial check for user being logged in or not
  if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function(event) {
      if (  // logged in
        window.__PRELOADEDSTATE__ &&
        window.__PRELOADEDSTATE__[ACCESS_TOKEN]
      ) {
        sessionService.set(
          ACCESS_TOKEN,
          window.__PRELOADEDSTATE__[ACCESS_TOKEN]
        );
        router.push('/');
      } // not logged in, get token
      let token = sessionService.get(ACCESS_TOKEN);
      if (token) {
        var decoded = decode(token);
        var expiration = decoded.exp;
        var unixTimestamp = new Date().getTime() / 1000;
        if (expiration !== null && parseInt(expiration) - unixTimestamp > 0) {
          store.state.isAuthenticated = true;
          store.state.user = decoded;
        }
      }
    });
  }

  // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return { app, router, store };
}
