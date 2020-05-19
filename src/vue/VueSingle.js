/*
  This is a single record view support for Vue
*/

class VueSingle {
  primaryModelName = '' // this provides the records for the view
  primaryModel = null
  foreignKeyDataRequests = {}
  
  // this is the Vue data object
  data = { 
    curr: {}
  }

  init(primaryModelName) {
    // console.log('*** DB', db)
    this.primaryModelName = primaryModelName
    this.primaryModel = db.model(this.primaryModelName)

    console.log('VueSingle.init() - get primary data', this.primaryModelName)
    this.primaryModel.getFirst()
    .then( data => {
      console.log('VueSingle:init() - primaryModel data RX', data.data[0])
      if(data.data[0]){
        this.data.curr = data.data[0]
      } else {
        console.error('No prinary data', thus.primaryModelName, data.data)
      }


    })

    console.log('VueSingle:getting foreign key data')
    if(this.primaryModel.keys && this.primaryModel.keys.fks) {
      this.primaryModel.keys.fks.forEach(fk => {

        // set up the data holder
        this.data[fk.tableName] = []
        
        const fkReq = { 
          name: fk.tableName,
          fk: fk,
          req: db.model(fk.tableName).getAll(),
          data : []
        }
        // store the request by table/model name
        this.foreignKeyDataRequests[fk.tableName] = fkReq 
        
        // this shpuldfire AFTER the model received
        // this.onModelReceived()

        // wait for the data to arrive
        fkReq.req.then((data)=> {
          console.log('FK data received', data, this.primaryModel, fkReq)
          // will this be bound/closure
          this.data[fkReq.name] = data.data
          fkReq.data = data.data // store the data on the model!!
        })

      })
    } // if
  }

  /*
    refactored to load models from common - not DB request
  */
  init_old(primaryModelName) {

    this.primaryModelName = primaryModelName
    this.primaryModel = db.model(this.primaryModelName)
    this.primaryModel.getModel()
    .then( () => {
      console.log('VueSingle:getting foreign key data')
      if(this.primaryModel.keys && this.primaryModel.keys.fks) {
        this.primaryModel.keys.fks.forEach(fk => {

          // set up the data holder
          this.data[fk.tableName] = []
          
          const fkReq = { 
            name: fk.tableName,
            fk: fk,
            req: db.model(fk.tableName).getAll(),
            data : []
          }
          // store the request by table/model name
          this.foreignKeyDataRequests[fk.tableName] = fkReq 
          
          // this shpuldfire AFTER the model received
          // this.onModelReceived()

          // wait for the data to arrive
          fkReq.req.then((data)=> {
            console.log('FK data received', data, this.primaryModel, fkReq)
            // will this be bound/closure
            this.data[fkReq.name] = data.data
            fkReq.data = data.data // store the data on the model!!
          })

        })
      } // if
    })
  }

  // onModelReceived () {
  //   const fks = this.foreignKeyDataRequests
  //   console.log('VueSingle.bind():FK data requests', fks.Doctors )
  //   console.log('VueSingle.bind():FK data requests', fks )
  //   // add the table names for the FK data
  //   for(const [name,req] of Object.entries(fks)) {
  //     console.log('VueSingle.bind():create FK Data entry',name)
  //     this.data[name] = []
  //   } 

  // }
  /*
    take the vue definition and wrap it

  */
  bind (vue) {
    // have to wait for Model received before setting the FKs
    const vueData = vue.data ? vue.data : {}
    if(vueData instanceof Function) {
      vue.data = () => {
        console.log('Vue firing data latch - function')
        return Object.assign(this.data, vueData()) // merge the object & function
      }
    } else {
      vue.data = () => {
        console.log('Vue firing data latch - array')
        return Object.assign(this.data, vueData)  // merge the objects
      }      
    }
    const vueCreated = vue.created
    vue.created = () => {
      // console.log(`${this.$options.name} created`)
      console.log('VueSingle:created()')
      // this.primaryModel.getFirst()
      // .then( data => {
      //   console.log('VueSingle:created() - primaryModel data RX', data.data)
      //   this.data.curr = data.data 
      // })
      if(vueCreated) vueCreated() // call the original if it exists
    }

    return vue
  }



} 

export default new VueSingle()