const passport = require('passport');
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
    passport.authenticate('jwt', (err, user) => {
      // const userRole = user.role;
      if (err || !user) {
        res.status(403).send({
          error: 'you do not have access to this resource'
        })
      } else if (user.role.indexOf('normal-user') === -1){ //Not sure if this is the correct way
        res.status(403).send({
          error: 'you do not have access to this resource'
        })
      } else {
        req.user = user
        next()
      }
    })(req, res, next)
  },

  isAdminAuthenticated: async (req, res, next) => {
    passport.authenticate('jwt', (err, user) => {
      // const userRole = user.role;
      console.log(user)
      console.log(user)
      console.log(user)

      if (err || !user) {
        res.status(403).send({
          error: 'you do not have access to this resource1'
        })
      } else if (user.role.indexOf('admin-user') === -1){
        res.status(403).send({
          error: 'you do not have access to this resource2'
        })
      } else {
        req.user = user
        next()
      }
    })(req, res, next)
  }
}

