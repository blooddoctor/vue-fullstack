import Vue from 'vue';
import Router from 'vue-router';
import pages from '../pages'

Vue.use(Router);

// route-level code splitting
const HomeView = () => import('../views/HomeView.vue');
const PatientView = () => import('../views/Patient.vue');
const AboutView = () => import('../views/AboutView.vue');
const LoginView = () => import('../views/LoginView.vue');
const RegisterView = () => import('../views/RegisterView.vue');
const ProfileView = () => import('../views/profile/ProfileView.vue');
const ProfileUserInfoView = () =>
  import('../views/profile/ProfileUserInfoView.vue');
const ProfilePasswordView = () =>
  import('../views/profile/ProfilePasswordView.vue');
const NotFoundView = () => import('../views/NotFoundView.vue');
// All examples
const ExamplesView = () => import('../views/examples/ExamplesView.vue');

function createRouter() {
  const pageRoutes = []
  pages.forEach( page => {
    // note the import is warpped ina function for load on demand
    pageRoutes.push( {path: page.route , component: page.component})
  })
  const appRoutes = [
      { path: '/', component: HomeView },
      // { path: '/patient', component: PatientView },
      { path: '/about', component: AboutView },
      {
        path: '/examples',
        component: ExamplesView
      },
      { path: '/login', component: LoginView },
      { path: '/register', component: RegisterView },
      {
        path: '/profile',
        component: ProfileView,
        children: [
          { path: 'userinfo', component: ProfileUserInfoView },
          { path: 'userpassword', component: ProfilePasswordView }
        ]
      },
      { path: '*', component: NotFoundView }  // can't add routes after this!!
    ]
  // the order is important, as anything after the */404 won't be found!
  const routes = pageRoutes.concat(appRoutes)
  console.log('routes', routes)
  return new Router({
    mode: 'history',
    linkActiveClass: 'active',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: routes
  });
}

export const router = createRouter();
