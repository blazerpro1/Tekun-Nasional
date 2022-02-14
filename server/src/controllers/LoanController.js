const models = require("../models");

module.exports = {
    //Find all loans for user to see
    findAll: async (req, res) => {
        // const { offset, limit } = req.query;
        // const user = req.user;

        const loans = await models.Loan.findAll({});
        return res.send(loans);
    },

    //Find all loans for admin
    findAllUserLoans: async (req, res) => {

        const loans = await models.User_Loans.findAll({});

        const userLoans = [];
        new Promise((resolve, reject) => {
            loans.forEach((relatedUserLoans, index) => {
                models.Loan.findOne({
                    where: {
                        id: relatedUserLoans.LoanId
                    }
                }).then((userLoan) => {
                    userLoan.dataValues.approval = relatedUserLoans.approval;
                    userLoan.dataValues.userLoanId = relatedUserLoans.id;
                    userLoan.dataValues.createdAtNew = relatedUserLoans.createdAt;
                    userLoans.push(userLoan);
                    if (index === loans.length - 1) resolve();
                })
            });
        }).then(() => {
            return res.status(200).send(userLoans
            );
        })
    },

    findById: async (req, res) => {
        // const { offset, limit } = req.query;
        // const user = req.user;
        const id = req.params.loanId;


        const loans = await models.Loan.findOne({
            where: {
                id: id,
            }
        });

        if (!loans) {
            return res.status(403).send({
                error: 'Unable to retrieve loan.'
            })
        }

        return res.send(loans);
    },

    findUserLoan: async (req, res) => {
        // const { offset, limit } = req.query;
        // const user = req.user;
        const userId = req.auth.id;
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

        const userLoans = await models.User_Loans.findAll({
            where: {
                UserId: userId,
            }
        });

        if (!userLoans) {
            return res.status(403).send({
                error: 'Unable to retrieve user_loans.'
            })
        }

        return res.send(userLoans);
    },

    findAllForUser: async (req, res) => {
        const userId = req.auth.id;
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
                    },

                }).then((userLoan) => {
                    userLoan.dataValues.approval = relatedUserLoanRow.approval;
                    userLoan.dataValues.createdAtNew = relatedUserLoanRow.createdAt;
                    userLoans.push(userLoan);
                    if (index === relatedUserLoans.length - 1) resolve();
                })
            });
        }).then(() => {
            return res.status(200).send(
                userLoans
            );
        })
    },

    //create loans //Working
    create: async (req, res) => {
        const {
            name,
            details,
            amount
        } = req.body;
        if (!name || !details || amount == undefined || (amount < 0.0)) {
            return res.status(400).send({
                error: "Please enter a valid information."
            });
        }

        const createdLoan = await models.Loan.create({
            name,
            details,
            amount
        });

        return res.status(201).send({
            loan: createdLoan
        });
    },

    //user applying loans //Working
    apply: async (req, res) => {

        //get userId from req.auth.userId later
        const userId = req.auth.id;
        const {
            loanId
        } = req.body;


        if (loanId == undefined || userId == undefined) {
            return res.status(400).send({
                error: "Please enter a valid information."
            });
        }

        const user = await models.User.findOne({
            where: {
                id: userId
            }
        });
        if (!user) {
            return res.status(400).send({
                error: "Unable to find user."
            });
        }

        const loan = await models.Loan.findOne({
            where: {
                id: loanId
            }
        });
        if (!loan) {
            return res.status(400).send({
                error: "Unable to find user."
            });
        }

        //Prevent them from applying same loan
        const userLoan = await models.User_Loans.findAll({
            where: {
                UserId: userId,
                LoanId: loanId
            }
        });

        if (userLoan === undefined || userLoan.length == 0) {

            const createJoins = await user.addLoan(loan);
            return res.status(201).send({
                userLoans: createJoins
            });
        } else {
            return res.status(400).send({
                error: "You cannot apply the same loan."
            });
        }


    },

    delete: async (req, res) => {
        const {
            loanId
        } = req.body;


        if (!loanId)
            return res.status(400).send({
                error: "xxx"
            });

        // make sure it exists
        const loan = await models.Loan.findOne({
            where: {
                id: loanId
            }
        });
        if (!loan) return res.status(400).send({
            error: "The loan doesn't exist."
        });

        loan
            .destroy()
            .then((loan) => {
                return res.status(200).send({
                    loan
                });
            })
            .catch((err) => {
                return res.status(500).send({
                    error: err
                })
            });
    },

    //update loan details
    update: async (req, res) => {
        const {
            id,
            name,
            details,
            amount
        } = req.body.loan;

        // validation
        if (!id || !name || !details || !amount)
            return res.status(400).send({
                error: "xxx"
            });

        // make sure it exists
        const loan = await models.Loan.findOne({
            where: {
                id
            }
        });
        if (!loan) return res.status(400).send({
            error: "The loan doesn't exist."
        });

        loan
            .update({
                name,
                details,
                amount
            })
            .then((loan) => {
                return res.status(200).send({
                    loan
                });
            })
            .catch((err) => {
                return res.status(500).send({
                    error: err
                })
            });
    },

    //Working
    //Allow admin to approve/reject pending loans
    loanUpdate: async (req, res) => {
        const {
            id,
            approval
        } = req.body.data;

        // validation
        if (!id || !approval)
            return res.status(400).send({
                error: "Please pass in every details."
            });

        // make sure it exists
        const userLoans = await models.User_Loans.findOne({
            where: {
                id
            }
        });
        if (!userLoans) return res.status(400).send({
            error: "The user loan doesn't exist."
        });

        userLoans
            .update({
                approval: approval
            })
            .then((userLoans) => {
                return res.status(200).send({
                    userLoans
                });
            })
            .catch((err) => {
                return res.status(500).send({
                    error: err
                })
            });
    },
}