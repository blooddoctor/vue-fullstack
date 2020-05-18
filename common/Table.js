// import * as utils from './util';
const Base = require('./entities/Base')

function lowerCaseFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

module.exports = class Table extends Base{

  // need to harmonize the cs and ss 
  db = null // I'll set this for the client model -
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
  associate () {
    // my one
    if (this.keys && this.keys.fk) {
      // need to link tables
      this.keys.fk.forEach(fk => {
        // look for the N side in 1:N
        const tableName = fk.tableName
        if(!db.tables[tableName]) {
          console.error('No foreign table', tableName)
        } else{
          // the foreign model
          fk.table = db.tables[tableName]
        }

      })
    }

  }



}