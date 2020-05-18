
// this is CS only!! - need to put this in CS extension
import {dataService} from '../../src/services/data.service'

export default class Base {
  db = null
  name = ''
  isModelLoaded = false
  modelRequest = null
  constructor(db, name, cfg) {
    this.db = db
    this.name = name
    // this = {...cfg} // spread - can't assign to this
    Object.assign(this, cfg)
  }
  getModel() {
    if(this.isModelLoaded) {
      return Promise.resolve(this)
    }
    // else - get the model from the server
    console.log(`Client:getModel(${this.name})`)
    // should stop multiple requests for the same model
    this.modelRequest = dataService.get(`/db/${this.name}/getModel/`)
    .then( data => {
      this.isModelLoaded = true
      console.log(`common/entities:Base.getModel(${this.name}).then()` , data.data)
      // populate the Base model
      Object.assign(this, data.data)
    })
    return this.modelRequest  // a promise
  }
  /*
    need crud methods
    neeed to be async
  */
  getOne (id) {
    console.log('Base:getOne')
    return this.db.getOne( {model:this.name , id} )
  }

  getFirst () {
    console.log('Base:getFirst')
    return this.db.getFirst( {model:this.name} )
  }

  getAll () {
    console.log('Base:getAll')
    return this.db.getAll( {model:this.name} )
  }

  // this connects to either the client side or server db conection
  static client (db) {
    this.db = db
  }
  static server (db) {
    this.db = db
  }
}