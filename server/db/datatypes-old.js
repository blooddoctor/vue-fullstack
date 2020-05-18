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
class Field {
  constructor (cfg) {
    Object.assign(this,cfg)
  }
  static type (cfg) {
    return new Field(cfg)
  }
}
class String extends Field {
  type = 'VARCHAR'
  len = 50
  constructor (cfg) {
    super(cfg)
  }

}
class Int extends Field {
  type = 'INTEGER'
}
class ForeignKey extends Int {

  index = true

  constructor (tableName, cfg) {
    super(cfg)
  }
}

class PrimaryKey extends Int {
  primaryKey = true
  autoIncrement = true
  allowNulls = false
  index = true

  constructor (cfg) {
    super(cfg)

  }  
}

const F = Field
const FK = ForeignKey

const types = {
  string: (len=50, cfg={}) => F.type(Object.assign({type: `varchar(${len})` , len: len}, cfg)),  // ({{len}})
  password: () => { return types.string(50, {extended: 'password'}) },
  address: () => { return types.string(255) }, // might add geoloc
  pk: () => { return {type: 'INTEGER' , primaryKey: true, unique: true, autoIncrement: true, allowNulls: false, index: true} },
  fk: entityName => { return {type: 'int', entityName: entityName } },
  email: () => { return types.string(50,{extended: 'email' }) },
  phone: () => { return types.string(50,{extended: 'phone' }) },
  date: () => { return {type: 'date' , extended: 'date'} },
  datetime: () => { return {type: 'datetime' , extended: 'datetime'} },
  int: (len=10) => { return {type: `int(${len})` , len: len, extended: 'number'} }, // ({{len}})
  double: () => { return {type: 'double'} },
  colour: () => { return types.string(50,{extended: "color" }) },  // RGB model - override get/set
  path: () => { return types.string(255) },  // RGB model - override get/set

  lookup: (tableName, cfg) => { // a standard lookup table
    return Object.assign({
      keys: {
        pk: types.pk()
      },
      fields: {
        // id: types.pk(),
        name: types.string()        
      }
    },
    cfg)
  },
} 

// export default types
module.exports = types