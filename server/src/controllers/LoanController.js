const models = require("../models");

module.exports = {
    findAll: async (req, res) => {
        // const { offset, limit } = req.query;
        // const user = req.user;

        const loans = await models.Loan.findAll({});
        return res.send({loans});
    },

    create: async (req, res) => {
        const { userId, loan } = req.body;
        const { name, details, amount} = loan;
        if (!name || !details || amount == undefined || (amount < 0.0) || userId == undefined) {
            return res.status(400).send({error: ""});
        }

        const user = await models.User.findOne({where: {id: userId}});
        if (!user) {
            return res.status(400).send({error: ""});
        }

        const createdLoan = await models.Loan.create({name, details, amount});

        const createJoins = await user.addLoan(createdLoan);
        return res.status(201).send({loan: createdLoan});
    },
}