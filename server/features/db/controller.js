const DB = require('../../db/models')

module.exports = {
  get (req) {
    const table = req.params.table
    console.log('request table', table)
    return table
  }

}

