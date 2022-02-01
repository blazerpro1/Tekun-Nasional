const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/config').authentication;

module.exports = {
    verify: (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401).send({
            error: 'Unable to find token'
        })
    
        jwt.verify(token, jwtSecret, (err, user) => {
            if (err) return res.sendStatus(403)
            req.auth = user
            return next()
        })
    }
}