// import Table from './Table'
const Table = require('./Table')
const models = require('./models')
// hardwired for models


class Db {  // should extends 
  models = {}
  tables = {}
  apiPath = ''
  dataService = null  // this is the transport layout - axios
  /*
    need to bind in the data service for the tables
  */  
  constructor (dataService, apiPath) {
    this.apiPath = apiPath
    this.dataService = dataService
    // Object.assign(this, dataService)
    // console.log('common/Db:db:', this)
    for( const [name, _table] of Object.entries(models) ) {
      // console.log('common/Db:model:', name)
      
      const table = new Table(name, _table)
      
      // Db needs data access methods
      table.db = this
      this.tables[name] = table

    }

  }
  // I should make this async on rx the model
  // no longer really needed
  model (name) {
    // models autocreated
    // if(!this.models[name]) {
    //   this.models[name] = new Base(this, name)
    // }
    // console.log('db.model', this.models[name])
    return this.models[name]
  }
  /*
    this isn't used any more - I think!!
  */
  getModel(table) {
    // else - get the model from the server
    // console.log(`common/Db:getModel(${table.name})`)
    // should stop multiple requests for the same model
    table.modelRequest = dataService.get(`/db/${table.name}/getModel/`)
    .then( data => {
      table.isModelLoaded = true
      // console.log(`common/Db.getModel(${table.name}).then()` , data.data)
      // populate the Base model
      Object.assign(table, data.data)
    })
    return table.modelRequest  // a promise
  } 

  // these paths need to be defined in common/api/routes - share with server
  // server defines the end points. These objects offer proxies to those
  // end points
  // the Model objects offer the same api proxy methods!!
  getOne (model, id=1) {
    return this.dataService.get(`/db/${model.name}/getOne/${id}`)
  }
  getFirst (model) {
    return this.dataService.get(`/db/${model.name}/getFirst`)
  }
  getAll (model) {
    return this.dataService.get(`/db/${model.name}/getAll`)
  }
  save (model, rec) {
    // need to remove cyclic references
    rec.model = null
    rec.table = null
    return this.dataService.post(`/db/${model.name}/save`, rec)
  }


}

export default Db


