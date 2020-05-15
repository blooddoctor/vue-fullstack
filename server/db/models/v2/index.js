// import T from '../datatypes'
const T = require('../../datatypes')
// T reduces typing!! coulda used 'types' or 'datatypes'
module.exports = {
  Users: {
    fields: {
      id: T.pk(),
      username: T.string(),
      name: T.string(),
      password: T.password(),
      roleId: T.fk('Roles'),
      email: T.email(),
      phone: T.phone()
    }
  },
  Roles: T.lookup('Roles'),
  Doctors: {
    fields: {
      id: T.pk(),
      name: T.string(),
      userId: T.fk('Users'),
      hospitalId: T.fk('Hospitals'),
      practiceId: T.fk('Practices'),  // only if Pratices defined
      address: T.address(),
      phone: T.phone(),
      email: T.email(),
    },
    seed: [
      { name: 'Dr Mengele' , hospitalId: 1, address: 'Auschwitz', phone: '08612345', email: 'butcher@aschwitz.com'}
    ]
  },
  Hospitals: T.lookup('Hospitals', {seed: [{ id:1 , name: 'St James'}]}),
  Patients: {
    fields: {
      id: T.pk(),
      name: T.string(),
      userId: T.fk('Users'),  // only if Patients can login
      doctorId: T.fk('Doctors'),
      dob: T.date(),
      weight: T.double(),
      height: T.double(),
      cholesterol: T.double(),
      bp: T.string(),
      phone: T.phone(),
      email: T.email(),
      address: T.address()
    }
  },
  Colours: {
    fields: {
      id: T.pk(),
      name: T.string(),
      hex: T.colour(), // on colors table
    },
    seed: [
      {id: 1, name: 'Purple' , hex: '#6a0dad'},
      {id: 2, name: 'Red' , hex: '#ff0000'},
      {id: 3, name: 'Grey', hex: '#a9a9a9'},
      {id: 4, name: 'Light Blue', hex: '#add8e6'}
    ]
  },
  SampleTypes: {
    fields: {
      id: T.pk(),
      name: T.string(),
      colour: T.string(), // FK to colours!!
      hex: T.colour(), // on colors table
      colourId: T.fk('Colours'),
      img: T.path()
    },
    seed: [
      {id: 1, name: 'EDTA' , colour: 'Purple' , hex: '#6a0dad', colourId: 1},
      {id: 2, name: 'CLOTTED' , colour: 'Red' , hex: '#ff0000', colourId: 2},
      {id: 3, name: 'FLU OXAL' , colour: 'Grey', hex: '#a9a9a9', colourId: 3},
      {id: 4, name: 'CITRATE' , colour: 'Light Blue', hex: '#add8e6', colourId: 4}
    ]
  },
  // note only 4 Groups, with RhD factor as binary/boolean on each
  BloodGroups: T.lookup('BloodGroups', {seed: [
      {name:'A'},
      {name:'B'},
      {name:'O'},
      {name:'AB'}
    ]}
  ),
  // ony one sample required per group - except 3
  TestTypeGroups: {
    fields: {
      id: T.pk(),
      name: T.string(),
      departmentId: T.fk('Departments'), // each group goes to a single dept
      sampleTypeId: T.fk('SampleTypes') // single type per group
    },
    seed: [
      {name: 'Group 1: (Blood) CLOTTED (Red)' , sampleTypeId: 2}, // needs to know last dose of x,y,z
      {name: 'Group 2: (Blood) EDTA (Purple)' , sampleTypeId: 1},
      {name: 'Group 3: (Blood) FLU OXAL (Grey)' , sampleTypeId: 3},
      {name: 'Group 4: (Blood) CITRATE (Light Blue)' , sampleTypeId: 4},
      {name: 'Group 5: (Blood) CLOTTED (Red) IgE Sensitization Tests' , sampleTypeId: 2},
      {name: 'Group 6: (Blood) EDTA (Purple)' , sampleTypeId: 1},
      {name: 'Group 7: (Blood) CLOTTED (Red)' , sampleTypeId: 2}
    ]
  },
  Departments: T.lookup(),
  TestTypes: {
    fields: {
      id: T.pk(),
      name: T.string(),
      testTypeGroupId: T.fk('TestTypeGroups'),
      turnAround: T.double(),
      info: T.string(255),
      extra: T.string(255),
      departmentId: T.fk('Departments'),  // each group goes to a single dept
      sampleTypeId: T.fk('SampleTypes')  // prob unnec - single typeper group?
    },
    seed: [
      {name: 'Renal Profile', testTypeGroupId: 1 },
      {name: 'Liver Profile', testTypeGroupId: 1 },
      {name: 'Bone Profile', testTypeGroupId: 1 },
      {name: 'Amylase', testTypeGroupId: 1 },
      {name: 'Magnesium', testTypeGroupId: 1 },
      {name: 'Urate', testTypeGroupId: 1 },
      {name: 'CRP', testTypeGroupId: 1 },
      {name: 'Lipid Profile', testTypeGroupId: 1 },
      {name: 'Iron Studies', testTypeGroupId: 1 },
      {name: 'Iron Studies', testTypeGroupId: 1 },
      {name: 'LH & FSH', testTypeGroupId: 1 },
      {name: 'Creatine Kinase', testTypeGroupId: 1 },
      {name: 'Lactate Dehydrongenase', testTypeGroupId: 1 },
      {name: 'PSA', testTypeGroupId: 1 },
      {name: 'Prolactin', testTypeGroupId: 1 },
      {name: 'SHBH', testTypeGroupId: 1 },
      {name: 'Progesterone', testTypeGroupId: 1 },
      {name: 'Oestradiol', testTypeGroupId: 1 },
      {name: 'Cortisol', testTypeGroupId: 1 },
      {name: 'HCG', testTypeGroupId: 1 },
      {name: 'TFTs (FT4 & TSH)', testTypeGroupId: 1 },
      {name: 'AFP', testTypeGroupId: 1 },
      {name: 'CEA', testTypeGroupId: 1 },
      {name: 'CA 125', testTypeGroupId: 1 },
      {name: 'CA 15.3', testTypeGroupId: 1 },
      {name: 'CA 19.9', testTypeGroupId: 1 },
      
      {name: 'Haemoglobin A1c', testTypeGroupId: 2 },
      // need 1 sample for each
      {name: 'Glucose (Random)', testTypeGroupId: 3 },
      {name: 'Glucose (Fasting)', testTypeGroupId: 3 }, 
      
      {name: 'Coagulation Screen', testTypeGroupId: 4 }, 
      {name: 'INR (Warfarin Yes/No)', testTypeGroupId: 4 , info: 'Warfarin Yes/No'}, // needs a question

      {name: 'Connective Tissue Disease screen', testTypeGroupId: 5 }, 
      {name: 'Rheumatoid Factor', testTypeGroupId: 5 },
      {name: 'IgG, A, M & Protein Electrophoresis', testTypeGroupId: 5 }, 
      {name: 'Thyroid Microsomal Ab (TPO)', testTypeGroupId: 5 }, 
      {name: 'Tissue Transglutaminase (Ab)', testTypeGroupId: 5 },

      {name: 'FBC', testTypeGroupId: 6 }, 
      {name: 'ESR', testTypeGroupId: 6 }, 
      {name: 'Infectious Mononucleosis Screen', testTypeGroupId: 6 }, 
      {name: 'Malaria Screen', testTypeGroupId: 6, info: 'alarm bells - ring ahead' },  // 
      
      {name: 'Vitamin B12/Serum Folate', testTypeGroupId: 7, info: 'fasting sample rquired' }, //  
      {name: 'Ferritin', testTypeGroupId: 7 } 

    ]
  },
  // header for a batch of test - per patient
  TestRequests: {
    fields: {
      id: T.pk(),
      created: T.datetime(),
      collected: T.datetime(),
      resultsExpected: T.datetime(),
      resultsActual: T.datetime(),
      patientId: T.fk('Patients'),
      doctorId: T.fk('Doctors'),
      hospitalId: T.fk('Hospitals'),  // only one - this should be the test centre
    }
  },
  // one per patient/test requests - correspond to each selected test type
  TestSamples: {
    fields: {
      id: T.pk(),
      testRequestId: T.fk('TestRequests'),  // header
      testTypeId: T.fk('TestTypeId'),
      created: T.datetime(),
      collected: T.datetime(),
      resultsExpected: T.datetime(),
      resultsActual: T.datetime(),
      results: T.string(255)      
    }

  }
  


}
