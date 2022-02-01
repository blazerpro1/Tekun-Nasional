const Joi = require('joi')

module.exports = {
    register(req, res, next) {
        const schema = Joi.object({
            name: Joi.string().min(3).max(50).required(),
            ic_number: Joi.string().length(12).pattern(/^[0-9]+$/).required(),
            phone_number: Joi.string().min(12).max(13).regex(/^(\+?6?01)[0-46-9]-*[0-9]{7,8}$/).required(),
            email: Joi.string().email(),
            password: Joi.string().pattern(
                new RegExp('^[a-zA-Z0-9]{8,32}$')
            ).required(),
            confirmPassword: Joi.ref('password'),
    })
        const {error} = schema.validate(req.body)


        if (error) {
            switch (error.details[0].context.key) {
                case 'name':
                    res.status(400).send({
                        error: 'You must provide a name'
                    })
                    break
                case 'ic_number':
                    res.status(400).send({
                        error: 'You must provide a valid IC number'
                    })
                    break
                case 'phone_number':
                    res.status(400).send({
                        error: 'You must provide a valid phone number'
                    })
                    break
                case 'email':
                    res.status(400).send({
                        error: 'You must provide a valid email address'
                    })
                    break
                case 'password':
                    res.status(400).send({
                        error: `The password provided failed to match the following rules:
                <br>
                1. It must contain ONLY the following characters: lower case, upper case, numerics.
                <br>
                2. It must be at least 8 characters in length and not greater than 32 characters in length.
              `
                    })
                    break
                // case 'confirmPassword':
                //     res.status(400).send({
                //         error: 'Password and Confirm Password must be the same'
                //     })
                //     break
                default:
                    res.status(400).send({
                        error: 'Invalid registration information'
                    })
            }
        } else {
            next()
        }
    },

    updateProfile(req, res, next) {
        const schema = Joi.object({
            name: Joi.string().min(3).max(50).required(),
            password: Joi.string().pattern(
                new RegExp('^[a-zA-Z0-9]{8,32}$')
            ).required(),
            ic_number: Joi.string().length(12).pattern(/^[0-9]+$/).required(),
            phone_number: Joi.string().min(12).max(13).regex(/^(\+?6?01)[0-46-9]-*[0-9]{7,8}$/).required(),
    }).unknown(true)

        const {error} = schema.validate(req.body.user)

        if (error) {
            switch (error.details[0].context.key) {
                case 'name':
                    res.status(400).send({
                        error: 'You must provide a name'
                    })
                    break
                case 'ic_number':
                    res.status(400).send({
                        error: 'You must provide a valid IC number'
                    })
                    break
                case 'phone_number':
                    res.status(400).send({
                        error: 'You must provide a valid phone number'
                    })
                    break
                case 'password':
                    res.status(400).send({
                        error: `The password provided failed to match the following rules:
                <br>
                1. It must contain ONLY the following characters: lower case, upper case, numerics.
                <br>
                2. It must be at least 8 characters in length and not greater than 32 characters in length.
              `
                    })
                    break
                default:
                    res.status(400).send({
                        error: 'Invalid update information'
                    })
            }
        } else {
            next()
        }
    }
}