// require('../passport')(passport);

//DEFAULT FROM THE VIDEO:

// module.exports = function (req, res, next) {
//   passport.authenticate('jwt', (err, user) => {
//       if (err || !user) {
//         res.status(403).send({
//           error: 'you do not have access to this resource' 
//         })
//       } else {
//         req.user = user
//         next()
//       }
//     })(req, res, next)
// }

module.exports = {
  isAuthenticated: async (req, res, next) => {
   
    console.log('===')
    console.log(req.auth)

    if (!req.auth) {
       res.status(403).send({
         error: 'You do not have access to this resource'
       });
    } else if (req.auth.roles.indexOf('normal-user') === -1) {
       res.status(403).send({
         error: 'You do not have access to this resource: 1'
       });
    } else {
      next();
    }
   
  },

  isAdminAuthenticated: async (req, res, next) => {
    // const userRole = user.role;
    console.log('===')
    console.log(req.auth)

    if (!req.auth) {
       res.status(403).send({
         error: 'You do not have access to this resource'
       });
    } else if (req.auth.roles.indexOf('admin-user') === -1) {
       res.status(403).send({
         error: 'You do not have access to this resource: 1'
       });
    } else {
      next();
    }
  }
}