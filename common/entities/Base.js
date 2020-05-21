
// this is CS only!! - need to put this in CS extension
// this should not be here!! access via the Db object
// import dataService from '../../src/services/data.service'

module.exports = class BaseModel {
  db = null // only set on CS
  _sql = null // used SS to issue raw queries when sequelize has problems
  name = ''
  isModelLoaded = false
  modelRequest = null

  constructor(name, cfg) {
    // this.db = db
    this.name = name
    // this = {...cfg} // spread - can't assign to this
    Object.assign(this, cfg)
  }

  getModel() {
    console.log('common/entities/Base:getModel')
    if(this.isModelLoaded) {
      return Promise.resolve(this)
    }
    return db.getModel(this)  // a promise
  }
  /*
    need crud methods
    neeed to be async
  */
  getOne (id) {
    console.log('common/entities/Base:getOne')
    return this.db.getOne(this, id)
  }

  getFirst () {
    console.log('common/entities/Base:getFirst')
    return this.db.getFirst(this)
  }

  getAll (cfg) {  // 
    console.log('common/entities/Base:getAll', cfg)
    if(cfg) console.log('=========== cfg:', cfg)
    return this.db.getAll(this, cfg)
  }

  save (rec) {
    console.log('common/entities/Base:save')
    return this.db.save(this, rec)
  }

  delete (rec) {  // accept an object or an id
    if(rec.id) rec=rec.id
    console.log('common/entities/Base:delete')
    return this.db.delete(this, rec)    
  }

}