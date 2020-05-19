// const policy = require('./policy');

const ctrl = require('./controller');

// select all
module.exports = app => {
  // Application data route
  // app.route('/api/db/:table/post').post(ctrl.setLanguage);

  // by putting POST first - finds the route!!!
  app.post('/db/:table/save', (req,res) => {
    ctrl.dispatch('save', req, res)
  })

  app.get('/db/:table/getFirst', (req,res) => {
    ctrl.dispatch('getFirst', req, res)
  })

  app.get('/db/:table/getAll', (req,res) => {
    ctrl.dispatch('getAll', req, res)
  })

  app.get('/db/:table/getModel', (req,res) => {
    ctrl.dispatch('getModel', req, res)
  })


  // app.route('/db/:table/get/:id')
  //   // .all(policy.isAllowed)
  //   .get(ctrl.get);
  // app.get('/db/:table/:id' , (req,res) => {
  //   console.log('req', req.method, req.url)
  //   ctrl.get(req)  // ask the controller
  //   .then( data => {
  //     res.send(data)
  //   })
  //   .catch( err => {
  //     console.error('err' , err)  // send an error response
  //   })
  // })

  // app.get('/db/:table/getFirst' , (req,res) => {

  //   console.log('req', req.method, req.url)
  //   ctrl.getFirst(req)  // ask the controller
  //   .then( data => {
  //     res.send(data)
  //   })
  //   .catch( err => {
  //     console.error('err' , err)  // send an error response
  //     res.send(err) // to report to user
  //   })
  // })


  // app.route('/db')
  //   .get( () => {console.log('Hello')})
  //   // .all(policy.isAllowed)

}



