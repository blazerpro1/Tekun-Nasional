const models = require("../models");

module.exports = {
    //Working!
    findAll: async (req, res) => {
        // const { offset, limit } = req.query;
        // const user = req.user;

        const appeals = await models.Appeal.findAll({});
        return res.send({
            appeals
        });
    },

    // ASK Soh, before completing this part :<
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
              error: 'Unable to retrieve user.'
            })
        }

        const relatedAppeal = await models.Appeal.findAll({
            where: {
                UserId: user.id
            }
        });
        const userAppeals = [];
        new Promise((resolve, reject) => {
            relatedAppeal.forEach((relatedUserAppeal, index) => {
                models.Appeal.findOne({
                    where: {
                        id: relatedUserAppeal.LoanId
                    }
                }).then((userLoan) => {
                    userAppeals.push(userLoan);
                    if (index === relatedAppeal.length - 1) resolve();
                })
            });
        }).then(() => {
            return res.status(200).send({
                loans: userAppeals
            });
        })
    },

    //Working!
    create: async (req, res) => {
        const {
            userId,
            loanId,
            appeal
        } = req.body;
        const {
            details,
            document
        } = appeal;
        if (!details || !document || userId == undefined || loanId == undefined) {
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
                error: "Unable to find loan."
            });
        }

        const createdAppeal = await models.Appeal.create({
            details,
            document
        });


        const createJoins = await user.addAppeal(createdAppeal);
        const createJoins2 = await loan.addAppeal(createdAppeal);
        return res.status(201).send({
            appeal: createdAppeal
        });
    },


    //Working!
    //TODO: ALLOW ADMIN TO UPDATE THE APPROVAL TO (REJECTED,APPROVED,PENDING)
    update: async (req, res) => {
        const {id, approval} = req.body.appeal;

        // validation
        if (!id || !approval) 
            return res.status(400).send({error: "Please pass in every details."});

        // make sure it exists
        const appeal = await models.Appeal.findOne({where: {id}});
        if (!appeal) return res.status(400).send({error: "The appeal doesn't exist."});
        
        appeal
            .update({approval: approval})
            .then((appeal) => {
                return res.status(200).send({appeal});
            })
            .catch((err) => {return res.status(500).send({error: err})});
    },

}