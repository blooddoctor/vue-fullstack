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
  },
  { name: 'Patients',
    route: '/patients' , 
    path: '../views/Patients.vue', 
    component: () => import('./views/Patients.vue')
  }

]
