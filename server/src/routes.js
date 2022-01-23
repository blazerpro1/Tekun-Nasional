const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');
const LoanController = require("./controllers/LoanController");
const forgotPassword = require("./controllers/forgotPassword");

const {
    isAuthenticated,
    isAdminAuthenticated
} = require('./policies/isAuthenticated');

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

    app.get('/user/loans',
        isAuthenticated,
        LoanController.findAllForUser);

    app.put('/admin/loan',
        // isAdminAuthenticated,
        LoanController.update);

    app.delete('/admin/loan',
        // isAdminAuthenticated,
        LoanController.delete);

    app.post('/forgotPassword', 
        forgotPassword.sendResetLink);

    app.post('/resetPassword/:token', 
        forgotPassword.resetPassword);
    
}