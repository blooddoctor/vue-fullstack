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

console.log('v2 models', v2)

// Initialize models
modules.forEach(module => {
  const model = module(sequelize, Sequelize, config);
  models[model.name] = model;
});

// Apply associations - make each Model and property on the object??
// invoke the assovate method if defined on the Model
Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;
// console.log('Finished models/index')
module.exports = models;
