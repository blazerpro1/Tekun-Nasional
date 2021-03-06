const models = require("../models");

module.exports = {


    update: async (req, res) => {
        const id = req.auth.id;
        const {name, password, ic_number, phone_number} = req.body;

        // validation
        if (!name || !ic_number || !phone_number || !password) 
            return res.status(400).send({error: "Please insert all appropriate details."});

        // make sure it exists
        const user = await models.User.findOne({where: {id}});
        if (!user) return res.status(400).send({error: "The user doesn't exist."});
        
        user
            .update({name, password, ic_number, phone_number})
            .then((user) => {
                return res.status(200).send({user});
            })
            .catch((err) => {return res.status(500).send({error: err})});
    },

    show: async (req, res) => {
        // const { offset, limit } = req.query;
        // const user = req.user;
        const userId = req.auth.id;
        const user = await models.User.findOne({where: {
            id: userId
        }});
        if (!user) return res.status(400).send({error: "The user doesn't exist."});
        return res.send(user);
    },
}