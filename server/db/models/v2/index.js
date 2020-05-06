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
    }
  },
  Hospitals: T.lookup(),
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
  SampleTypes: {
    fields: {
      id: T.pk(),
      name: T.string(),
      colour: T.colour()
    }
  },
  TestTypeGroups: {
    fields: {
      id: T.pk(),
      name: T.string(),
      departmentId: T.fk('Departments'),
      sampleTypeId: T.fk('SampleTypes')
    }
  }
}
