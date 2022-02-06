const models = require("../models");

module.exports = {

    findAllForUser: async (req, res) => {
        const userId = req.auth.id;
        // const test = req.body;
        // const userId = test.userId;
        const user = await models.User.findOne({
            where: {
                id: userId
            }
        });

        if (!user) {
            return res.status(403).send({
              error: 'Unable to retrieve user.'
            })
        }
        
        const relatedLoans = await models.User_Loans.findAll({
            where: {
                UserId: user.id
            }
        });

        if (!relatedLoans) {
            return res.status(403).send({
              error: 'Unable to find loan for the user.'
            })
        }

        const userNotification = [];
        new Promise((resolve, reject) => {
            relatedLoans.forEach((relatedLoansRow, index) => {
                models.Reminders.findAll({
                    where: {
                        UserLoanId: relatedLoansRow.id
                    },
                    
                }).then((userLoan) => {
                    userLoan.forEach((userLoanRow)=>{
                        userNotification.push(userLoanRow);
                    })
                    if (index === relatedLoans.length - 1) resolve();
                })
            });
            
        }).then(() => {
            return res.status(200).send(
                userNotification
            );
        })
    },

}