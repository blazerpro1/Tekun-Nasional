const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');
const LoanController = require("./controllers/LoanController");

const {isAuthenticated, isAdminAuthenticated} = require('./policies/isAuthenticated');

module.exports = (app) => {
    app.post('/register',
        AuthenticationControllerPolicy.register,
        AuthenticationController.register);

    app.post('/login',
        AuthenticationController.login);

    app.get('/admin/loans', 
        isAdminAuthenticated,
        LoanController.findAll);

    app.post('/admin/loan',
        isAuthenticated, 
        LoanController.create);
}