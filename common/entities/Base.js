export default class Base {
  db = null
  name = ''
  constructor(db, name, cfg) {
    this.db = db
    this.name = name
    // this = {...cfg} // spread - can't assign to this
    Object.assign(this, cfg)
  }
  model() {

  }
  /*
    need crud methods
    neeed to be async
  */
  getOne (id) {
    console.log('Base:getOne')
    return this.db.get( {model:this.name , id} )
  }

  static getFirst () {

  }

  // this connects to either the client side or server db conection
  static client (db) {
    this.db = db
  }
  static server (db) {
    this.db = db
  }
}