// const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');
const LoanController = require("./controllers/LoanController");
const AppealController = require("./controllers/AppealController");
// const forgotPassword = require("./controllers/forgotPassword");
const AnnouncementController = require('./controllers/AnnouncementController');
const UserController = require('./controllers/UserController');

const {
    isAuthenticated,
    isAdminAuthenticated
} = require('./policies/isAuthenticated');
const NotificationController = require('./controllers/NotificationController');


module.exports = (app) => {
    // app.post('/register',
    //     AuthenticationControllerPolicy.register,
    //     AuthenticationController.register);

    app.get('/admin/loans',
        LoanController.findAllUserLoans);

    app.get('/loans',
        LoanController.findAll);

    app.get('/appealLoan/:loanId',
        LoanController.findById);
        

    app.post('/admin/loan',
        // isAuthenticated,
        LoanController.create);

    app.post('/user/loan',
        isAuthenticated,
        LoanController.apply);

    app.get('/user/loans',
        isAuthenticated,
        LoanController.findAllForUser);

    app.get('/user/userLoans',
        isAuthenticated,
        LoanController.findUserLoan);

    app.put('/loan',
        // isAdminAuthenticated,
        LoanController.update);

    app.put('/admin/loan',
        LoanController.loanUpdate);

    app.delete('/admin/loan',
        // isAdminAuthenticated,
        LoanController.delete);

    // app.post('/forgotPassword', 
    //     forgotPassword.sendResetLink);

    // app.post('/resetPassword', 
    //     forgotPassword.resetPassword);

    app.get('/admin/appeal',
        AppealController.findAll);
        
    app.get('/user/appeal',
        isAuthenticated,
        AppealController.findAllForUser);

    app.post('/appealLoan/:loanId',
        isAuthenticated,
        AppealController.create);

    app.put('/admin/appeal',
        AppealController.update);

    app.get('/admin/announcement',
        AnnouncementController.findAll);

    app.get('/announcement',
        AnnouncementController.findAll);

    app.post('/admin/announcement',
        AnnouncementController.create);
    
    app.delete('/admin/announcement',
        AnnouncementController.delete);

    app.put('/admin/announcement',
        AnnouncementController.update);
        
    app.put('/user/profile',
        AuthenticationControllerPolicy.updateProfile,
        UserController.update);
    
    app.get('/user/profile',
        isAuthenticated,
        UserController.show);

    app.get('/user/notification',
        NotificationController.findAllForUser);
    
}