const policy = require('./policy');

const ctrl = require('./controller');

// select all
module.exports = app => {
  // Application data route
  // app.route('/api/db/:table/post').post(ctrl.setLanguage);

  app.route('/api/db/:table/get/:id')
    .all(policy.isAllowed)
    .get(ctrl.get);
}


