import Table from './Table'
import models from './models'
// hardwired for models

export default new class Db {
  
  tables = []

  constructor () {

    for( const [name, _table] of Object.entries(models) ) {
      console.log('Common/Db:model:', name)
      
      const table = new Table(name, _table)
      table.db = this
      this.tables[name] = table

    }

  }


}



