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
  getAll (model, cfg) { // cfg could be WHERE clauses etc
    if(cfg) {
      return this.dataService.post(`/db/${model.name}/getAll`, cfg)
    } else {
      return this.dataService.get(`/db/${model.name}/getAll`, {params: cfg} )
    }
  }
  save (model, rec) {
    // need to remove cyclic references
    rec.model = null
    rec.table = null
    return this.dataService.post(`/db/${model.name}/save`, rec)
  }
  delete (model, id) {
    return this.dataService.delete(`/db/${model.name}/delete/${id}`)
  }

  query (sql) {
    if(this.currQuery){
      return this.deferQuery(sql)
    } else {
      return this.sendQuery(sql)
    }


  }

  sendQuery (sql) {
    // I think we need a pipeline here
    const p = new Promise((resolve,reject) => {

      this.currQuery = this.dataService.post(`/db/query/`, {sql: sql} )
      this.currQuery
      .then( data => {
        this.currQuery = null
        resolve(data)
        // now need to service the queue
      })
      .catch(e=> {
        reject(e)
      })
    

    })
    return p
  }

  deferQuery (sql) {
    const p = new Promise((resolve,reject) => {
      console.log('waiting for last query to finish')
      setTimeout(() => {
        console.log('waited 2 secs')
        if(this.currQuery) {
          console.error('previous query still pending')
        } else {
          console.log('previous query finished - safe to proceed')
          this.sendQuery(sql)
          .then(data => {
            resolve(data)
          })
          .catch(e=>{
            reject(e)
          })
        }
      }, 2000)   


    })
    return p
  }


}

export default Db


