// const policy = require('./policy');

const ctrl = require('./controller');

// select all
module.exports = app => {
  // Application data route
  // app.route('/api/db/:table/post').post(ctrl.setLanguage);

  // app.route('/db/:table/get/:id')
  //   // .all(policy.isAllowed)
  //   .get(ctrl.get);
  app.get('/db/:table/:id' , (req,res) => {
    console.log('req', req.method, req.url)
    ctrl.get(req)  // ask the controller
    .then( data => {
      res.send(data)
    })
    .catch( err => {
      console.error('err' , err)  // send an error response
    })

  })

  // app.route('/db')
  //   .get( () => {console.log('Hello')})
  //   // .all(policy.isAllowed)

}



