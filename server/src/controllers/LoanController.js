const models = require("../models");

module.exports = {
    findAll: async (req, res) => {
        // const { offset, limit } = req.query;
        // const user = req.user;

        const loans = await models.Loan.findAll({});
        return res.send({
            loans
        });
    },

    findAllForUser: async (req, res) => {
        const userId = req.auth.id;
        const user = await models.User.findOne({
            where: {
                id: userId
            }
        });
        // TODO: check user exist

        if (!user) {
            return res.status(403).send({
              error: 'Unable to retrieve loan.'
            })
        }

        const relatedUserLoans = await models.User_Loans.findAll({
            where: {
                UserId: user.id
            }
        });
        const userLoans = [];
        new Promise((resolve, reject) => {
            relatedUserLoans.forEach((relatedUserLoanRow, index) => {
                models.Loan.findOne({
                    where: {
                        id: relatedUserLoanRow.LoanId
                    }
                }).then((userLoan) => {
                    userLoans.push(userLoan);
                    if (index === relatedUserLoans.length - 1) resolve();
                })
            });
        }).then(() => {
            return res.status(200).send({
                loans: userLoans
            });
        })
    },

    create: async (req, res) => {
        const {
            userId,
            loan
        } = req.body;
        const {
            name,
            details,
            amount
        } = loan;
        if (!name || !details || amount == undefined || (amount < 0.0) || userId == undefined) {
            return res.status(400).send({
                error: ""
            });
        }

        const user = await models.User.findOne({
            where: {
                id: userId
            }
        });
        if (!user) {
            return res.status(400).send({
                error: ""
            });
        }

        const createdLoan = await models.Loan.create({
            name,
            details,
            amount
        });

        const createJoins = await user.addLoan(createdLoan);
        return res.status(201).send({
            loan: createdLoan
        });
    },

    delete: async (req, res) => {
        const { id } = req.body.loan;

        if (!id) 
            return res.status(400).send({error: "xxx"});

        // make sure it exists
        const loan = await models.Loan.findOne({where: {id}});
        if (!loan) return res.status(400).send({error: "The loan doesn't exist."});
        
        loan
            .destroy()
            .then((loan) => {
                return res.status(200).send({loan});
            })
            .catch((err) => {return res.status(500).send({error: err})});
    },

    update: async (req, res) => {
        const {id, name, details, amount} = req.body.loan;

        // validation
        if (!id || !name || !details || !amount) 
            return res.status(400).send({error: "xxx"});

        // make sure it exists
        const loan = await models.Loan.findOne({where: {id}});
        if (!loan) return res.status(400).send({error: "The loan doesn't exist."});
        
        loan
            .update({name, details, amount})
            .then((loan) => {
                return res.status(200).send({loan});
            })
            .catch((err) => {return res.status(500).send({error: err})});
    }
}