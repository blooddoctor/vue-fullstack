const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../database.json')[env];

let sequelize;


if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

/* eslint global-require: off */
const modules = [
  require('./content.model.js'),
  require('./contenttext.model.js'),
  require('./language.model.js'),
  require('./role.model.js'),
  require('./user-images.model.js'),
  require('./user.model.js')
];

// these are the new models
// import v2 from 'v2' // not allowed outside module
// server/db/models/index.js
const _tables = require('../../../common/models')
const Table = require('../../../common/Table')

// import Table from '../../../common/Table'

// console.log('v2 models', v2)
// need to create sequelize models
// Object.keys(v2).forEach( (name,table) => {
const tables = {}
const models = {sql:sequelize}  // make avail for raw queries etc
// pseudo db object for foreign key resolution
const db = {
  tables: tables,
  models: models,
}

for( const [name, _table] of Object.entries(_tables) ) {
  console.log('server/models/index:model', name)

  const table = new Table(name, _table)
  tables[name] = table
  table.sql = sequelize
  table.db = db

  // assuming a pk
  const cfg = {timestamps: true, indexes: table.indexes}
  let model
  try {
    model = sequelize.define(name, table.fields, cfg)

  } catch(err){
    console.log('Error', err)
  }
  // console.log('*** ADD MODEL ***', model)
  models[name] = model // this line wan't executing!!
  table.model = model
  // I think sequelize returns a function!!
  model.table = table // this is the json
  model.sql = table.sql // for direct db access
  model.query = function(sql) {
    try{
      console.log('query', sql)
      return this.sql.query(sql)  // raw queries
    } catch(e) {
      console.log('Error', e)
    }
  }

  model.afterCreate( x => { // that's the insert not the create table!!
    console.log(`new record event `, model.name, x)
  })
  // need to read these from a file - and offload the seed data to a separate 
  // JSON file which can be read by the server code
  const sync = config.sync
  const force = config.force
  const seed = force // if force, you need to seed!!
  console.log('sync', name, sync)
  if(sync && model.sync({force : force})
  .then( () => {

    // table has been dropped!!
    if(seed && _table.seed) {
      console.log('seeding', name)
      _table.seed.forEach( (rec,i) => {
        console.log('rec', rec)
        model.create(rec)
        .then( o => {
          // console.log('o', o.toJSON())
        })
        .catch(err => { // not always throwing erros
          console.error('err', err)
        })

      })
    }


  }) ); // force modi structure - NEEDS ;
  

}// end for loop

// Initialize models
modules.forEach(module => {
  const model = module(sequelize, Sequelize, config);
  models[model.name] = model;
});

// Apply associations - make each Model and property on the object??
// invoke the associate method if defined on the Model
Object.keys(models).forEach(key => {
  const model = models[key]
  if ('associate' in model) {
    model.associate(models);
  }

  // my models - ONLY!
  if(tables[key]) {
    console.log('setting my foreign keys', key)
    const table = tables[key]
    table.associate()
    // this doesn't work!!
    // table.associate_ss() // SS specific using sequelize
  }

});
// console.log('models' , models)
// models.sequelize = sequelize;
// models.Sequelize = Sequelize;
// console.log('Finished models/index')
module.exports = models;
