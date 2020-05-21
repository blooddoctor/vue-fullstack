// import * as utils from './util';
const Base = require('./entities/Base')

function lowerCaseFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

module.exports = class Table extends Base{

  // need to harmonize the cs and ss 
  db = null // I'll set this for the client model -
  _sql = null // used on SS to issue raw queries when sequelize has problems
  constructor (name,table) {
    super()
      
    // Object.assign(this,cfg)

    this.name = name

    // process the pk & fk's
    this.fields = {} // build the object anew
    this.indexes = []
    this.keys = table.keys

    // pk
    if(this.keys && this.keys.pk) {
      
      this.pk = this.keys.pk
      this.pk.name = 'id'    // use a naming protocol object
      // this seems to cause a circ ref
      // pk.this = this  // this pointer

      // fields.unshift(this.keys.pk)
      
      // add the field
      this.fields.id = this.pk

      this.indexes.push( {unique: true, fields: [this.pk.name]} ) 
    }


    // create the foreign keys
    if(this.keys && this.keys.fks) {
      this.keys.fks.forEach(fk => {
        const plural = fk.entityName + 's'  // simplistic
        const tableName = plural
        const fkName = lowerCaseFirstLetter(fk.entityName) + 'Id'
        
        fk.name = fkName
        // fk.this = this

        // this is the remote/foreign this
        fk.tableName = tableName

        this.fields[fkName] = fk  
        // prob create an index!!
        this.indexes.push( {unique: false, fields: [fk.name]} ) 

        // constraints??
      })
    }
    
    // process the normal fields
    if(table.fields) {
      for( const [name,field] of Object.entries(table.fields) ) {
        field.name = name

        // field.this = this
        // we prob should do some processing here
        this.fields[name] = field
        // index it?
        // use either unique or isUnique type attr name
        if(field.indexed || field.isIndexed || field.isUnique || field.unique) {
          this.indexes.push( {unique: field.isUnique || field.unique, fields: [field.name]} ) 
        }
      }

    }

  }

    // setup the associations
    // this needs to work CS & SS (using Sequelize)
  associate () {
    // my one
    if (this.keys && this.keys.fks) {
      // need to link tables
      this.keys.fks.forEach(fk => {
        // look for the N side in 1:N
        const tableName = fk.tableName
        if(!this.db.tables[tableName]) {
          console.error('No foreign table', tableName)
        } else{
          // the foreign model
          fk.table = this.db.tables[tableName]
        }

      })
    }
  }

  associate_ss () {
    // console.log('associate_ss', this)
    // my one
    if (this.keys && this.keys.fks) {
      // need to link tables
      this.keys.fks.forEach(fk => {
        // look for the N side in 1:N
        const modelName = fk.tableName
        console.log('setting link to ', modelName)
        if(!this.db.models[modelName]) {
          console.error('No foreign model', modelName)
        } else{
          // the foreign model
          fk.model = this.db.models[modelName]
          // all my models are N:1 - ie I define the key in the
          console.log(`** Associaton: ${this.name}.hasOne(${fk.model.name})`) 
          this.model.hasOne(fk.model)
          console.log(`** Associaton: ${fk.model.name}.hasMany(${this.name})`) 
          fk.model.hasMany(this.model)

        }

      })
    }
  }

  // need to be careful - SS has its own version
  // we have no "model" for a record!!
  // should create a Record/Entity class
  create(init) {  // initial values
    const rec = {
      table: this,
      model: this,
      save: function() {
        console.log('common/Table:save(this)', this)
        return this.model.save(this)
      }
    }
    for(const [name, field] of Object.entries(this.fields)) {
      // console.log('name, field', name, field)
      rec[name] = field.default;
    }
    Object.assign(rec, init)  // merge initial values
    // console.log('New record', rec)
    // and we should save it!!
    return rec
  }



}