import {dataService} from './data.service'
import Base from '../../common/entities/Base'
// store on window
export default class Db {
  models = {}
  apiPath = ''
  constructor (apiPath) {
    this.apiPath = apiPath
  }
  model (name) {
    if(!this.models[name]) {
      this.models[name] = new Base(this, name)
    }
    console.log('db.model', this.models[name])
    return this.models[name]
  }
  get(query) {
    return dataService.get(`/db/${query.model}/${query.id}`)
  }

}