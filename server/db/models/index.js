const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../database.json')[env];
const models = {};
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
const v2 = require('./v2')
// console.log('v2 models', v2)
// need to create sequelize models
// Object.keys(v2).forEach( (name,table) => {

for( const [name,table] of Object.entries(v2) ) {
  console.log('model:', name)
  console.log('table:', table)
  // console.log('fields:', table.fields)
  const cfg = {timestamps: false, indexes: [ {unique: true, fields: ['id']}]}
  let model
  try {
    model = sequelize.define(name, table.fields, cfg)

  } catch(err){
    console.log('Error', err)
  }
  model.afterCreate( x => { // that's the insert not the create table!!
    console.log('new record event', x.name)
  })
  console.log('sync', name)
  model.sync({force : true})
  .then( () => {

    // table has been dropped!!
    if(table.seed) {
      console.log('seed', name)
      table.seed.forEach( (rec,i) => {
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


  }) // force modi structure
  models[name] = model
}

// Initialize models
modules.forEach(module => {
  const model = module(sequelize, Sequelize, config);
  models[model.name] = model;
});

// Apply associations - make each Model and property on the object??
// invoke the associate method if defined on the Model
Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});
// console.log('models' , models)
models.sequelize = sequelize;
models.Sequelize = Sequelize;
// console.log('Finished models/index')
module.exports = models;
