export default class Base {
  constructor(cfg) {
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
    return this.db.get(id)
  }

  // this connects to either the client side or server db conection
  client (db) {
    this.db = db
  }
  server (db) {
    this.db = db
  }
}