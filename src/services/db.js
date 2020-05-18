import {dataService} from './data.service'
// import Base from '../../common/entities/Base'
// store on window
export default class Db {
  models = {}
  apiPath = ''
  constructor (apiPath) {
    this.apiPath = apiPath
  }
  // I should make this async on rx the model
  // no longer really needed
  model (name) {
    // models autocreated
    // if(!this.models[name]) {
    //   this.models[name] = new Base(this, name)
    // }
    console.log('db.model', this.models[name])
    return this.models[name]
  }
  getOne(query) {
    return dataService.get(`/db/${query.model}/getOne/${query.id}`)
  }
  getFirst(query) {
    return dataService.get(`/db/${query.model}/getFirst`)
  }
  getAll(query) {
    return dataService.get(`/db/${query.model}/getAll`)
  }

}