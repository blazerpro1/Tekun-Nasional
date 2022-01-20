const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}


module.exports = {
    async register (req, res) {
        try {
          const body = {...req.body, 'roles': ['normal-user']};
          const user = await User.create(body)
          const userJson = user.toJSON()
          res.send({
            user: userJson,
            token: jwtSignUser(userJson)
          })
        } catch (err) { 
          //   error: `This ${err.errors[0].path} is already in use.`
          // })
          if(err.errors[0].path == "ic_number"){
            res.status(400).send({
              error: `This IC number is already in use.`
            })
          } else if(err.errors[0].path == "email"){
            res.status(400).send({
              error: `This Email is already in use.`
            })
          } else if(err.errors[0].path == "phone_number"){
            res.status(400).send({
              error: `This Phone Number is already in use.`
            })
          } else {
            res.status(400).send({
              error: `Registration error.`
            })
          }
        }
    },

    async login (req, res) {
      try {
        const {email, password} = req.body
        const user = await User.findOne({
          where: {
            email: email
          }
        })

        if (!user) {
          return res.status(403).send({
            error: 'The login information was incorrectaa'
          })
        }
  
        const isPasswordValid = await user.comparePassword(password)
        if (!isPasswordValid) {
          return res.status(403).send({
            error: 'The login information was incorrect'
          })
        }

        const userJson = user.toJSON()
        res.send({
          user: userJson,
          token: jwtSignUser(userJson)
        })
  
      } catch (err) {
        res.status(500).send({
          error: 'An error has occured trying to log in'
        })
      }
    }
}