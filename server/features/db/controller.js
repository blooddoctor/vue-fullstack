const models = require('../../db/models')
// console.log('>>>>>> Models', models)
module.exports = {
  model: null,
  id: null,

  dispatch (methodName,req,res) {
    this.tableName = req.params.table
    if(!models[this.tableName]) {
      console.error('Server:db.controller:Cannot find model',this.tableName, models)
      return res.send(`Error: Cannot find model [${this.tableName}]`)
    }
    this.model = models[this.tableName]
    console.log('model', this.model)
    this.method = this[methodName]
    console.log(`db.controller.dispatch(${this.tableName}.${methodName}, req)`)
    
    this.method.call(this,req)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.error('Error:', err)
      res.send(err)
    })

  },
  getModel (req) {
    console.log(`Server:Controller:${this.tableName}.getModel()`)
    console.log('Server:Model?', this.model.table)
    return Promise.resolve(this.model.table)
  },
  getOne (req) {
    this.id = req.params.id
    console.log(`Server:Controller:${this.tableName}.getOne(${this.id})`)
    // console.log('model', model)
    return this.model.findByPk(this.id)
  },
  getFirst (req) {
    console.log(`Server:Controller:${this.tableName}.getFirst()`)
    // console.log('model', model)
    return this.model.findAll({
        limit: 1,
        where: {
          //your where conditions, or without them if you need ANY entry
        },
        order: [ [ 'ID', 'ASC' ]] // tables MUST have ID
      })
  },
  getAll (req) {
    console.log(`Server:Controller:${this.tableName}.getAll()`)
    // console.log('model', model)
    return this.model.findAll({
        // limit: 1,
        where: {
          //your where conditions, or without them if you need ANY entry
        },
        order: [ [ 'ID', 'ASC' ]] // tables MUST have ID
      })
  }

}

