
// this is CS only!! - need to put this in CS extension
// this should not be here!! access via the Db object
// import dataService from '../../src/services/data.service'

module.exports = class BaseModel {
  db = null
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
    console.log('Base:getOne')
    return this.db.getOne(this, id)
  }

  getFirst () {
    console.log('Base:getFirst')
    return this.db.getFirst(this)
  }

  getAll () {
    console.log('Base:getAll')
    return this.db.getAll(this)
  }

  save (rec) {
    console.log('Base:save')
    return this.db.save(this, rec)
  }

}