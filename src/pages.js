export default [
  { name: 'Patient' , 
    route: '/patient' , 
    path: '../views/Patient.vue', 
    component: () => import('./views/Patient.vue')
  },

  { name: 'Test Request',
    route: '/testrequest' , 
    path: '../views/TestRequest.vue', 
    component: () => import('./views/TestRequest.vue')
  }

]
