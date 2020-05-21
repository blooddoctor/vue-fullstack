const models = require('../../db/models')
// console.log('>>>>>> Models', models)
module.exports = {
  model: null,
  id: null,
  sql: null,  // for raw queries

  // assumes a table/model
  dispatch (methodName,req,res) {
    this.tableName = req.params.table
    if(!models[this.tableName]) {
      console.error('server/db/controller:Cannot find model',this.tableName, models)
      return res.send(`Error: Cannot find model [${this.tableName}]`)
    }
    this.model = models[this.tableName]
    this.sql = this.model.sql // this is a patch sql ison models but not here on controller
    // console.log('model', this.model)
    
    this.dispatch2(methodName, req, res)
  },
  dispatch2 (methodName, req, res) {

    this.method = this[methodName]
    console.log(`server/db/controller.dispatch2(${methodName}, req)`)

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
    console.log(`server/db/controller:${this.tableName}.getModel()`)
    // console.log('Server:Model?', this.model.table)
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
    this.body = req.body
    if(this.body) console.log('**** Query clause ', this.body)
    let queryParams = Object.assign(this.body , {
        // limit: 1,
        where: {
          //your where conditions, or without them if you need ANY entry
        },
        order: [ [ 'ID', 'ASC' ]] // tables MUST have ID
      })

    return this.model.findAll(queryParams)
  },
  save (req) {
    this.body = req.body
    console.log(`Server:Controller:${this.tableName}.save()`, this.body)
    // console.log('model', model)
    this.instance = this.model.build(this.body)
    return this.instance.save()
  },
  delete (req) {
    this.id = req.params.id
    console.log(`Server:Controller:${this.tableName}.delete(${this.id})`)
    // console.log('model', model)
    // this is causing a problem with sequelize
    // return this.model.destroy({where: {id: this.id}})
    return this.model.query(`DELETE FROM ${this.tableName} WHERE id = ${this.id};`)
  },

  async query (req) {
    try {
      const sql = req.body.sql
      console.log(`Server:Controller:query()`, sql)
      // console.log('model',this.model.query )
      const res = await models.sql.query(sql)
      return res          
    } catch(e) {
      console.error(e)
    }
  }

}

