const models = require("../models");

module.exports = {
    //Working!
    findAll: async (req, res) => {
        // const { offset, limit } = req.query;
        // const user = req.user;

        const announcements = await models.Announcement.findAll({attributes: ['id', 'name', 'details']});
        return res.send({
            announcements
        });
    },

    //working
    create: async (req, res) => {
        const {
            name,
            details
        } = req.body;
        if (!name || !details) {
            return res.status(400).send({
                error: "Please insert all the necessary details."
            });
        }

        const announcementCreated = await models.Announcement.create({
            name,
            details,
        });
        return res.status(201).send({
            announcement: announcementCreated
        });
    },

    //working
    delete: async (req, res) => {
        const { id } = req.body.announcement;

        if (!id) 
            return res.status(400).send({error: "Error in selecting announcement."});

        // make sure it exists
        const announcement = await models.Announcement.findOne({where: {id}});
        if (!announcement) return res.status(400).send({error: "The announcement doesn't exist."});
        
        announcement
            .destroy()
            .then((anouncement) => {
                return res.status(200).send({announcement});
            })
            .catch((err) => {return res.status(500).send({error: err})});
    },

    //working
    update: async (req, res) => {
        const {id, name, details} = req.body.announcement;

        // validation
        if (!id || !name || !details) 
            return res.status(400).send({error: "Error in selecting announcement"});

        // make sure it exists
        const announcement = await models.Announcement.findOne({where: {id}});
        if (!announcement) return res.status(400).send({error: "The announcement doesn't exist."});
        
        announcement
            .update({name, details})
            .then((announcement) => {
                return res.status(200).send({announcement});
            })
            .catch((err) => {return res.status(500).send({error: err})});
    }
}