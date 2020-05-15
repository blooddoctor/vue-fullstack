const models = require('../../db/models')

module.exports = {
  get (req) {
    const tableName = req.params.table
    const id = req.params.id
    console.log('table requested', tableName )
    const model = models[tableName]
    console.log('model', model)
    return model.findByPk(id)
  }

}

