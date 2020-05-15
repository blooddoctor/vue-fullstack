/*
  might include a basic field class. use a static factory.
  pass the literals below as a constructor param
  merge basic field object with param
  Ideally would like access to the table definition itself!! 
  - eg more than one field per field def!!
  perhaps the method could be invoked with the table as this!!
  actually, binding the field to the table is vital for runtime 
  validation and error handling etc.

*/
const types = {
  string: (len=50) => { return {type: `varchar(${len})` , len: len} },  // ({{len}})
  password: () => { return {type: 'varchar'} },
  address: () => { return types.string(255) }, // might add geoloc
  pk: () => { return {type: 'INTEGER' , primaryKey: true, unique: true, autoIncrement: true, allowNulls: false, index: true} },
  fk: tableName => { return {type: 'int', tableName: tableName } },
  email: () => { return {type: 'string', extended: 'email' } },
  phone: () => { return {type: 'string', extended: 'phone' } },
  date: () => { return {type: 'date' , extended: 'date'} },
  datetime: () => { return {type: 'datetime' , extended: 'datetime'} },
  int: (len=10) => { return {type: `int(${len})` , len: len, extended: 'number'} }, // ({{len}})
  double: () => { return {type: 'double'} },
  colour: () => { return { type: 'varchar' , extended: "color" } },  // RGB model - override get/set
  path: () => { return types.string(255) },  // RGB model - override get/set

  lookup: (tableName, cfg) => { // a standard lookup table
    return Object.assign({
      fields: {
        id: types.pk(),
        name: types.string()        
      }
    },
    cfg)
  },
} 

// export default types
module.exports = types