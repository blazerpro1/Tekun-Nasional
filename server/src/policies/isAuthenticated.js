module.exports = {
  isAuthenticated: async (req, res, next) => {
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