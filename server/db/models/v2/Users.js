import types from '../datatypes'
module.exports = {
  name: 'Users',
  fields: {
    id: types.pk(),
    username: types.string(),
    name: types.string(),
    password: types.password(),
    roleId: types.fk('Roles'),
    email: types.email(),
    phone: types.phone()
  }
}